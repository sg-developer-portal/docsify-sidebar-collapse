import { Tokens } from "marked";

export function isActiveLinkToken(token: Tokens.Link, url: string): boolean {
  const relativePathRegex = /^\.\.?/;
  return url.endsWith(token.href.replace(relativePathRegex, ""));
}

export function parseUrl(href: string, basePath: string): string | null {
  if (href.endsWith(".md")) {
    href = href.slice(0, href.length - 3);
  }

  if (isAbsolute(href)) {
    return parseAbsolutePath(href, basePath);
  } else if (isRelative(href)) {
    return parseRelativePath(href);
  } else if (isExternal(href)) {
    return href;
  }

  return null;
}

function isAbsolute(href: string): boolean {
  return /^\/(w+)?/.test(href);
}

function isRelative(href: string): boolean {
  return /^(\.\/)?\w+/.test(href) || /^\.\.\/(\w+)?/.test(href);
}

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

function parseRelativePath(href: string): string {
  if (!href.startsWith("./")) {
    href = "./" + href;
  }

  let currentHref = window.location.href;

  // Ensure current href is handled with a trailing "/"
  // `child` relative to `/base/` is `/base/child`.
  // `child` relative to `/base` is `/child`.
  if (!currentHref.endsWith("/")) {
    currentHref = currentHref + "/";
  }

  const resolved = new URL(href, currentHref).pathname;

  return resolved;
}

function parseAbsolutePath(href: string, basePath: string): string {
  if (basePath.endsWith("/")) {
    basePath = basePath.slice(0, basePath.length - 1);
  }

  const resolved = basePath + href;

  return resolved;
}
