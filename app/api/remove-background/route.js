import { NextResponse } from "next/server";
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_UPLOAD_BYTES,
} from "../../../lib/image-upload-limits";

export const runtime = "nodejs";

const REMOVE_BG_URL = "https://api.remove.bg/v1.0/removebg";

const FOREGROUND_TIPS =
  "Use a photo with a clear subject (person, product, or object) against a contrasting background. Avoid empty landscapes, plain textures, or images that are already cut out.";

function parseRemoveBgError(status, bodyText) {
  let message = "";
  let code = "";

  try {
    const data = JSON.parse(bodyText);
    if (typeof data?.error === "string") {
      message = data.error;
    }
    const errors = data?.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      const first = errors[0];
      code = first?.code || "";
      message =
        message ||
        errors.map((e) => e.title || e.detail || String(e)).join(" ");
    }
  } catch {
    // ignore JSON parse errors
  }

  const lower = message.toLowerCase();
  if (
    code === "foreground_detection_failed" ||
    lower.includes("could not identify foreground") ||
    lower.includes("foreground")
  ) {
    return `Could not detect a subject in this image. ${FOREGROUND_TIPS}`;
  }

  if (message) return message;

  if (status === 402) {
    return "Background removal quota exceeded. Try again later.";
  }
  if (status === 403) {
    return "Background removal is not configured on the server.";
  }
  return "Background removal failed. Please try another image.";
}

function errorStatusForUpstream(upstreamStatus, bodyText) {
  const lower = bodyText.toLowerCase();
  if (
    lower.includes("foreground") ||
    lower.includes("could not identify")
  ) {
    return 422;
  }
  return upstreamStatus >= 500 ? 502 : upstreamStatus;
}

export async function POST(request) {
  const apiKey = process.env.REMOVE_BG_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Background removal is not configured. Set REMOVE_BG_API_KEY." },
      { status: 503 },
    );
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("image");
  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "No image file provided." }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported format. Use JPEG, PNG, or WEBP." },
      { status: 400 },
    );
  }

  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    return NextResponse.json(
      {
        error: `Image is too large. Maximum size is ${MAX_IMAGE_UPLOAD_BYTES / (1024 * 1024)} MB.`,
      },
      { status: 400 },
    );
  }

  const upstream = new FormData();
  const uploadName =
    file.name && /\.(jpe?g|png|webp)$/i.test(file.name)
      ? file.name
      : "upload.jpg";
  upstream.append("image_file", file, uploadName);
  upstream.append("size", "auto");
  upstream.append("type", "auto");
  upstream.append("format", "png");
  upstream.append("channels", "rgba");

  let response;
  try {
    response = await fetch(REMOVE_BG_URL, {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: upstream,
    });
  } catch (err) {
    console.error("[remove-background]", err);
    return NextResponse.json(
      { error: "Could not reach the background removal service." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const bodyText = await response.text();
    console.error("[remove-background]", response.status, bodyText.slice(0, 500));
    return NextResponse.json(
      { error: parseRemoveBgError(response.status, bodyText) },
      { status: errorStatusForUpstream(response.status, bodyText) },
    );
  }

  const buffer = await response.arrayBuffer();
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}
