import { useEffect, useState } from "react";
import { fetchGalleryData, type GalleryData } from "@/services/googleDrive";

type GalleryState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; data: GalleryData };

// Module-level cache so Gallery and the Home teaser share one Drive fetch
// per page load instead of hitting the API twice.
let cachedRequest: Promise<GalleryData> | null = null;

function loadGalleryData(): Promise<GalleryData> {
  if (!cachedRequest) {
    cachedRequest = fetchGalleryData().catch((error) => {
      cachedRequest = null; // allow retrying on the next mount after a failure
      throw error;
    });
  }
  return cachedRequest;
}

export function useGalleryData() {
  const [state, setState] = useState<GalleryState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    setState({ status: "loading" });
    loadGalleryData()
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            error: error instanceof Error ? error.message : "Failed to load gallery images.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
