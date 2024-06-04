import { Tokens } from "marked";
import Token from "./token";
import { JSX, ComponentProps } from "preact";

type TextProps = {
  token: Tokens.Text;
} & ComponentProps<"span">;

export default function Text({ token, ...props }: TextProps) {
  let el: JSX.Element[] | undefined = undefined;
  if (token.tokens) {
    el = token.tokens.map((t, idx) => (
      <Token token={t} key={`token-${token.type}-${token.text}-${idx}`} />
    ));
  }
  if (token.raw === "&nbsp;") {
    return <>&nbsp;</>;
  }
  return (
    <span class="title" {...props}>
      {el || token.raw}
    </span>
  );
}
