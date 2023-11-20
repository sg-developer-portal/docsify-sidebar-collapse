import { Tokens } from "marked";
import { ComponentProps, JSX } from "preact";
import Token from "./token";
import { useConfig } from "../context/config";

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
  const { basePath } = useConfig();
  return (
    <a {...props} href={parseLink(token.href, basePath)}>
      {el || token.text}
    </a>
  );
}

export function isActiveLinkToken(token: Tokens.Link, url: string): boolean {
  return url.endsWith(token.href);
}

function parseLink(url: string, basePath: string) {
  if (url === "/") {
    return basePath;
  }
  return url;
}
