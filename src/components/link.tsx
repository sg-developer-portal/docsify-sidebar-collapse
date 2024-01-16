import { Tokens } from "marked";
import { ComponentProps, JSX } from "preact";
import { useMemo } from "preact/hooks";
import Token from "./token";
import { useConfig } from "../context/config";

type LinkProps = {
  token: Tokens.Link;
} & ComponentProps<"a">;

export default function Link({ token, ...props }: LinkProps) {
  const { basePath } = useConfig();

  let el: JSX.Element[] | undefined = undefined;
  if (token.tokens) {
    el = token.tokens.map((t, idx) => (
      <Token token={t} key={`token-${token.type}-${token.text}-${idx}`} />
    ));
  }

  const href = useMemo(
    () => parseUrl(token.href, basePath),
    [token.href, basePath]
  );

  if (href === null) {
    console.error("improperly formatted href:", token.href);
    return null;
  }

  return (
    <a {...props} href={href}>
      {el || token.text}
    </a>
  );
}

export function isActiveLinkToken(token: Tokens.Link, url: string): boolean {
  const relativePathRegex = /^\.\.?/;
  return url.endsWith(token.href.replace(relativePathRegex, ""));
}

function parseUrl(href: string, basePath: string): string | null {
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
  return new URL(href, window.location.href).pathname;
}

function parseAbsolutePath(href: string, basePath: string): string {
  if (basePath.endsWith("/")) {
    basePath = basePath.slice(0, basePath.length - 1);
  }

  return basePath + href;
}
