import { Tokens } from "marked";
import { ComponentProps } from "preact";

type EmProps = {
  token: Tokens.Em;
} & ComponentProps<"em">;

export default function Em({ token, ...props }: EmProps) {
  return <em {...props}>{token.text}</em>;
}
