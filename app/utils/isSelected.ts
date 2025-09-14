// SSR-safe version, but requires passing location from useLocation hook
export function isSelected(currentPath: string, targetPath: string): boolean {
  return currentPath === targetPath;
}

// Client-only version (not recommended for SSR apps)
export function isSelectedClient(path: string): boolean {
  if (typeof window === "undefined") return false;
  return window.location.pathname === path;
}
