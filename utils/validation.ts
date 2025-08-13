export const isValidFile = (file: any): { valid: boolean; error?: string } => {
  if (!file) return { valid: false, error: "No file selected." };

  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file?.mimeType)) {
    return { valid: false, error: "Only PNG/JPG/PDF allowed." };
  }

  if (file.size > maxSize) {
    return { valid: false, error: "File size must be under 5 MB." };
  }

  return { valid: true };
};
