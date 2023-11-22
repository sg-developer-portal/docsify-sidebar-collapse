import { Tokens } from "marked";

type HtmlProps = {
  token: Tokens.HTML;
};
export default function Html({ token }: HtmlProps) {
  return <div dangerouslySetInnerHTML={{ __html: token.raw }}></div>;
}
