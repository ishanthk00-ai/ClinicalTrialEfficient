import type { Trial } from "./clinicaltrials";

const KEY = "trialfind_bookmarks";

export function getBookmarks(): Trial[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function isBookmarked(nctId: string): boolean {
  return getBookmarks().some((t) => t.nctId === nctId);
}

export function addBookmark(trial: Trial): void {
  const current = getBookmarks().filter((t) => t.nctId !== trial.nctId);
  localStorage.setItem(KEY, JSON.stringify([trial, ...current]));
}

export function removeBookmark(nctId: string): void {
  const current = getBookmarks().filter((t) => t.nctId !== nctId);
  localStorage.setItem(KEY, JSON.stringify(current));
}

export function toggleBookmark(trial: Trial): boolean {
  if (isBookmarked(trial.nctId)) {
    removeBookmark(trial.nctId);
    return false;
  } else {
    addBookmark(trial);
    return true;
  }
}
