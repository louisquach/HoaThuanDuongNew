/**
 * Convert a string to Title Case (handles Vietnamese + all-uppercase input).
 * "HẠ MEN GAN" → "Hạ Men Gan"
 * "THÔNG TIỂU HOÀN" → "Thông Tiểu Hoàn"
 */
export function toTitleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}
