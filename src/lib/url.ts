import { Tokens } from "marked";

export function isActiveLinkToken(token: Tokens.Link, url: URL): boolean {
  const href = token.href
    .replace("../", "/")
    .replace("./", "/")
    .replace(".md", "");

  const docsPath = href.startsWith("/") ? href : `/${href}`;

  return url.pathname.endsWith(docsPath);
}

export function parseUrl(href: string, basePath: string): string {
  // Return base path is href is root
  if (href === "/") {
    return basePath;
  }

  // Remove trailing extension
  if (href.endsWith(".md")) {
    href = href.slice(0, href.length - 3);
  }

  const basePathURL = new URL(basePath, window.location.origin);
  const resolvedURL = new URL(href, basePathURL);

  // Absolute paths need to be prefixed with the basepath
  if (href.startsWith("/")) {
    return basePath + resolvedURL.pathname.slice(1);
  }

  return resolvedURL.pathname;
}

export function isExternalURL(url: URL): boolean {
  const regex = /\/docs\/([\w\d-]+)/;

  const originPathname = regex.exec(url.pathname);
  const nextPathname = regex.exec(window.location.pathname);
  const diffDocument = originPathname?.at(1) !== nextPathname?.at(1);

  const diffOrigin = url.origin !== window.location.origin;

  return diffDocument || diffOrigin;
}
