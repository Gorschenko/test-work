export const isJson = (string: string): boolean => {
  try {
    JSON.parse(string);
    return true;
  } catch (e) {
    return false;
  }
};
