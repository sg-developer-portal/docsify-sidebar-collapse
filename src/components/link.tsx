import { Tokens } from "marked";
import { ComponentProps, JSX } from "preact";
import Token from "./token";

type LinkProps = {
  token: Tokens.Link;
} & ComponentProps<"a">;

export default function Link({ token, ...props }: LinkProps) {
  let el: JSX.Element[] | undefined = undefined;
  if (token.tokens) {
    el = token.tokens.map((t, idx) => (
      <Token token={t} key={`token-${token.type}-${token.text}-${idx}`} />
    ));
  }
  return (
    <a {...props} href={parseLink(token.href)}>
      {el || token.text}
    </a>
  );
}

export function isActiveLinkToken(token: Tokens.Link, url: string): boolean {
  return url.endsWith(token.href);
}

function parseLink(url: string): string {
  if (url === "/") {
    return window.location.pathname;
  }
  return url;
}
