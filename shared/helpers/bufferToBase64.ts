export const bufferToBase64 = (buffer: ArrayBuffer) => {
  const binaryString = new Uint8Array(buffer).reduce(
    (binary, byte) => (binary += String.fromCharCode(byte)),
    ''
  );

  return btoa(binaryString);
};
