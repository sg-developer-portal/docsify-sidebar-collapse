import { Tokens } from "marked";
import { ComponentProps, JSX } from "preact";
import Token from "./token";

type EmProps = {
  token: Tokens.Em;
} & ComponentProps<"em">;

export default function Em({ token, ...props }: EmProps) {
  let el: JSX.Element[] | undefined = undefined;
  if (token.tokens) {
    el = token.tokens.map((t, idx) => (
      <Token token={t} key={`token-${token.type}-${token.text}-${idx}`} />
    ));
  }
  return <em {...props}>{el || token.text}</em>;
}
