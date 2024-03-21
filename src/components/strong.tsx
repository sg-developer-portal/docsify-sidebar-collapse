import { Tokens } from "marked";
import { ComponentProps } from "preact";

type StrongProps = {
  token: Tokens.Strong;
} & ComponentProps<"strong">;

export default function Strong({ token, ...props }: StrongProps) {
  return <strong {...props}>{token.text}</strong>;
}
