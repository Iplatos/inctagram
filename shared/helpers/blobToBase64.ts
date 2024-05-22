export const blobToBase64 = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const file64 = reader.result as string;

      resolve(file64);
    };
    reader.onerror = e => {
      const error = e.target?.error || new Error(`An error occurred while reading the file`);

      reject(error);
    };
    reader.readAsDataURL(blob);
  });
};
