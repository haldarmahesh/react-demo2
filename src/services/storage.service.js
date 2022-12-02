function getItem(key) {
  return localStorage.getItem(key);
}

function setItem(key, value) {
  return localStorage.setItem(key, value);
}
function removeItem(key) {
  return localStorage.removeItem(key);
}
function getAll() {
  const res = [];
  for (const [key, value] of Object.entries(localStorage)) {
    if (key.indexOf(", ")) {
      res.push([key, value]);
    }
  }
  return res;
}
export const storageService = {
  getItem,
  setItem,
  getAll,
  removeItem,
};
