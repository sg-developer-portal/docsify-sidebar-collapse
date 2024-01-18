import { Tokens } from "marked";

export function isActiveLinkToken(token: Tokens.Link, url: string): boolean {
  const relativePathRegex = /^\.\.?/;
  return url.endsWith(token.href.replace(relativePathRegex, ""));
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
