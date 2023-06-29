export const toBinary = (objectString: string) => {
  const codeUnits = Uint16Array.from(
    { length: objectString.length },
    (element, index) => objectString.charCodeAt(index)
  );
  const charCodes = new Uint8Array(codeUnits.buffer);

  let result = "";
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
};

export const fromBinary = (binary: string) => {
  const bytes = Uint8Array.from({ length: binary.length }, (element, index) =>
    binary.charCodeAt(index)
  );
  const charCodes = new Uint16Array(bytes.buffer);

  let result = "";
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
};
