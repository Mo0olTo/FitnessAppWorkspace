export function createUrl(apiUrl: string, endpoint: string): string {
  return `${apiUrl.replace(/\/+$/, '')}${endpoint}`;
}
