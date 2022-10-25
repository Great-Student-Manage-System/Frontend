export function getLocalStorageValue(key: string) {
  return localStorage.getItem(key);
}

export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}
