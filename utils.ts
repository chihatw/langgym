export const isValidEmail = (input: string) => {
  const pattern =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return pattern.test(input);
};

// https://qiita.com/mimoe/items/855c112625d39b066c9a
export const kana2Hira = (str: string): string => {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    var chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
};

// https://qiita.com/mimoe/items/855c112625d39b066c9a
export const hira2Kana = (str: string): string => {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
};
