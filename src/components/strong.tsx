import { Tokens } from "marked";
import { ComponentProps, JSX } from "preact";
import Token from "./token";

type StrongProps = {
  token: Tokens.Strong;
} & ComponentProps<"strong">;

export default function Strong({ token, ...props }: StrongProps) {
  let el: JSX.Element[] | undefined = undefined;
  if (token.tokens) {
    el = token.tokens.map((t, idx) => (
      <Token token={t} key={`token-${token.type}-${token.text}-${idx}`} />
    ));
  }
  return <strong {...props}>{el || token.text}</strong>;
}
