/**
 * Build a resized, format- and quality-optimized Cloudinary delivery URL.
 * Non-Cloudinary URLs are returned unchanged. Original database URLs remain
 * untouched; transformations apply only when images are rendered.
 */
export function getCloudinaryImageUrl(source, { width, height, crop = "limit" }) {
  if (!source || !/^https?:\/\/res\.cloudinary\.com\//i.test(source)) {
    return source;
  }

  try {
    const url = new URL(source);
    const uploadPath = "/image/upload/";
    const uploadIndex = url.pathname.indexOf(uploadPath);
    if (uploadIndex === -1) return source;

    const dimensions = `w_${width}${height ? `,h_${height}` : ""}`;
    const framing = crop === "fill" ? ",c_fill,g_auto" : ",c_limit";
    const transformation = `${dimensions}${framing},f_auto,q_auto`;
    const insertAt = uploadIndex + uploadPath.length;
    url.pathname = `${url.pathname.slice(0, insertAt)}${transformation}/${url.pathname.slice(insertAt)}`;
    return url.toString();
  } catch {
    return source;
  }
}
