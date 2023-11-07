export function chapterIsVisited(entryID: string): boolean {
  return localStorage.getItem(`entry-visits.${entryID}`) === true.toString();
}

export function setChapterIsVisited(entryID: string, visited: boolean) {
  localStorage.setItem(`entry-visits.${entryID}`, visited.toString());
}
