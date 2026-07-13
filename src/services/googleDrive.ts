/**
 * ============================================================================
 *  GOOGLE DRIVE GALLERY SERVICE — frontend-only client for Google Drive API
 *  v3. Treats every subfolder inside the configured root ("Salon Gallery")
 *  folder as a gallery category, and every image file inside a subfolder as
 *  a gallery item. Adding a folder in Drive adds a category on the site
 *  automatically, no code changes required.
 *
 *  Requires the root folder (and everything inside it) to be shared as
 *  "Anyone with the link" — an API key alone cannot read private files.
 * ============================================================================
 */

import { googleDriveConfig } from "@/config/googleDrive";

const DRIVE_FILES_ENDPOINT = "https://www.googleapis.com/drive/v3/files";

// Pixel width requested for grid thumbnails — small enough to load fast,
// large enough to stay sharp on retina at the grid's actual display size.
const THUMBNAIL_SIZE = 800;

export interface GalleryImage {
  id: string;
  caption: string;
  category: string;
  /** Small, fast-loading preview — use this for the grid. */
  thumbnail: string;
  /** Full-resolution original — only fetch this when the lightbox opens. */
  image: string;
}

export interface GalleryData {
  items: GalleryImage[];
  categories: string[];
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
}

interface DriveFilesListResponse {
  files?: DriveFile[];
  nextPageToken?: string;
  error?: { message?: string };
}

/** Paginates through files.list for a given query, following nextPageToken. */
async function listAllFiles(query: string): Promise<DriveFile[]> {
  const { apiKey } = googleDriveConfig;
  if (!apiKey) {
    throw new Error(
      "Missing Google Drive API key. Set VITE_GOOGLE_DRIVE_API_KEY in your .env file."
    );
  }

  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q: query,
      key: apiKey,
      fields: "nextPageToken, files(id, name, mimeType, thumbnailLink)",
      pageSize: "1000",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const response = await fetch(`${DRIVE_FILES_ENDPOINT}?${params.toString()}`);
    const data: DriveFilesListResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        `Google Drive API request failed (${response.status}): ${
          data.error?.message ?? response.statusText
        }`
      );
    }

    files.push(...(data.files ?? []));
    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

/**
 * files.list's thumbnailLink is a signed, quota-backed preview URL (unlike
 * the public drive.google.com/thumbnail hotlink pattern, which Google's
 * abuse detection rate-limits almost immediately). It comes back sized
 * `=s220` by default; swapping the size suffix resizes it server-side.
 */
function resizedThumbnail(thumbnailLink: string, size: number): string {
  return thumbnailLink.replace(/=s\d+$/, `=s${size}`);
}

function driveFullImageUrl(fileId: string): string {
  const { apiKey } = googleDriveConfig;
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
}

async function getCategoryFolders(rootFolderId: string): Promise<DriveFile[]> {
  const query = `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  return listAllFiles(query);
}

async function getImagesInFolder(folderId: string): Promise<DriveFile[]> {
  const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
  return listAllFiles(query);
}

/**
 * Fetches every category folder under the configured root, then every image
 * inside each of those folders, and returns them in the shape the Gallery
 * page renders directly.
 */
export async function fetchGalleryData(): Promise<GalleryData> {
  const { rootFolderId } = googleDriveConfig;
  if (!rootFolderId) {
    throw new Error(
      "Missing Google Drive root folder id. Set VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID in your .env file."
    );
  }

  const folders = await getCategoryFolders(rootFolderId);

  const itemsByFolder = await Promise.all(
    folders.map(async (folder) => {
      const images = await getImagesInFolder(folder.id);
      return images.map((file): GalleryImage => {
        const thumbnail = file.thumbnailLink
          ? resizedThumbnail(file.thumbnailLink, THUMBNAIL_SIZE)
          : driveFullImageUrl(file.id);
        return {
          id: file.id,
          caption: file.name,
          category: folder.name,
          thumbnail,
          image: driveFullImageUrl(file.id),
        };
      });
    })
  );

  return {
    items: itemsByFolder.flat(),
    categories: folders.map((folder) => folder.name).sort((a, b) => a.localeCompare(b)),
  };
}
