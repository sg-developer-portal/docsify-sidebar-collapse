import { Tokens } from "marked";
import { ComponentProps, JSX } from "preact";
import Token from "./token";

type ParagraphProps = {
  token: Tokens.Paragraph;
} & ComponentProps<"p">;

export default function Paragraph({ token, ...props }: ParagraphProps) {
  let el: JSX.Element[] | undefined = undefined;
  if (token.tokens) {
    el = token.tokens.map((t, idx) => (
      <Token token={t} key={`token-${token.type}-${token.text}-${idx}`} />
    ));
  }
  return <p {...props}>{el || token.text}</p>;
}
