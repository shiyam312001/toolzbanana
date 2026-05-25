/** Shared limits for image upload tools (background remover uses remove.bg API). */
export const MAX_IMAGE_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB — within typical remove.bg limits
export const MIN_IMAGE_DIMENSION_PX = 50;
export const RECOMMENDED_MIN_DIMENSION_PX = 400;

export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export function validateImageUpload(file) {
  if (!file || typeof file.size !== "number") {
    return { ok: false, error: "No image file provided." };
  }
  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    return {
      ok: false,
      error: "Unsupported format. Use JPEG, PNG, or WEBP.",
    };
  }
  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    return {
      ok: false,
      error: `Image is too large. Maximum size is ${MAX_IMAGE_UPLOAD_BYTES / (1024 * 1024)} MB.`,
    };
  }
  return { ok: true };
}

export function validateImageDimensions(width, height) {
  if (!width || !height) {
    return { ok: false, error: "Could not read image dimensions." };
  }
  if (width < MIN_IMAGE_DIMENSION_PX || height < MIN_IMAGE_DIMENSION_PX) {
    return {
      ok: false,
      error: `Image is too small (${width}×${height}). Minimum size is ${MIN_IMAGE_DIMENSION_PX}×${MIN_IMAGE_DIMENSION_PX} pixels.`,
    };
  }
  return { ok: true };
}
