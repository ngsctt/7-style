const lockedURLs = {};

export function lock (url, use) {
  if (!lockedURLs[url]) lockedURLs[url] = new Set();
  lockedURLs[url].add(use);
  pruneLocks();
  return url;
}

export function release (url, use) {
  if (!lockedURLs[url]) return;
  lockedURLs[url].delete(use);
  pruneLocks();
}

function pruneLocks () {
  for (const url of Object.keys(lockedURLs)) {
    if (lockedURLs[url].size < 1) {
      URL.revokeObjectURL(url);
      delete lockedURLs[url];
    }
  }
}
