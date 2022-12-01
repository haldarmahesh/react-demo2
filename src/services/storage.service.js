function getItem(key) {
  return localStorage.getItem(key);
}

function setItem(key, value) {
  return localStorage.setItem(key, value);
}
export const storageService = {
  getItem,
  setItem,
};
