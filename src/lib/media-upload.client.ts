export type MediaUploadKind = "image" | "video";

export async function requestMediaUpload({
  kind,
  extension,
  contentType,
  accessToken,
}: {
  kind: MediaUploadKind;
  extension: string;
  contentType: string;
  accessToken: string;
}): Promise<{ path: string; token: string }> {
  const response = await fetch("/api/admin/media-upload", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ kind, extension, contentType }),
  });

  let payload: { path?: string; token?: string; error?: string } = {};
  try {
    payload = (await response.json()) as typeof payload;
  } catch {
    // Keep the fallback message below when a proxy/server returns non-JSON.
  }

  if (!response.ok) {
    throw new Error(payload.error || `Could not prepare upload (${response.status}).`);
  }
  if (!payload.path || !payload.token) {
    throw new Error("Upload could not be prepared. Please refresh Admin and try again.");
  }

  return { path: payload.path, token: payload.token };
}
