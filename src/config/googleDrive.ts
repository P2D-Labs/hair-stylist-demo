/**
 * ============================================================================
 *  GOOGLE DRIVE GALLERY CONFIG — reads the API key and root folder id from
 *  Vite env vars. Never hardcode these values in components or services.
 *
 *  Set them in a local .env file (see .env.example):
 *    VITE_GOOGLE_DRIVE_API_KEY=your-api-key
 *    VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID=your-salon-gallery-folder-id
 * ============================================================================
 */

export const googleDriveConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_DRIVE_API_KEY ?? "",
  rootFolderId: import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID ?? "",
};
