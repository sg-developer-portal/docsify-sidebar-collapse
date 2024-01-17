import { Tokens } from "marked";
import { ComponentProps, JSX } from "preact";
import { useMemo } from "preact/hooks";
import Token from "./token";
import { useConfig } from "../context/config";
import { parseUrl } from "../lib/url";

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
