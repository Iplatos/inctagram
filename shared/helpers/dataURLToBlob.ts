// data:[<media type>][;charset=<character set>][;base64],<data>
const regex = /^data:([\w/+-]*)(;charset=[\w-]+|;base64){0,1},(.*)$/i;

export const dataURLToBlob = (dataURL: string) => {
  const match = dataURL.match(regex);

  if (!match) {
    throw new Error(`The string does not match the DataURL type.\nPassed string: ${dataURL}`);
  }

  const [_, mediaType, optionalToken, encodedData] = match;
  let binaryString: string;

  if (optionalToken === ';base64') {
    binaryString = atob(encodedData);
  } else {
    binaryString = decodeURIComponent(encodedData);
  }

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    ia[i] = binaryString.charCodeAt(i);
  }

  return new Blob([ia], { type: mediaType });
};
