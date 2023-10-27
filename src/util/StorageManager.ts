export function entryIsVisited(entryID: string) : boolean {
  return localStorage.getItem(`entry-visits.${entryID}`) === true.toString();
}

export function setEntryIsVisited(entryID: string, visited: boolean) {
  localStorage.setItem(`entry-visits.${entryID}`, visited.toString());
}