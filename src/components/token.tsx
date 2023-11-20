import type { Token, Tokens } from "marked";
import Text from "./text";
import Em from "./em";
import Strong from "./strong";
import Link from "./link";
import Paragraph from "./paragraph";
import List from "./list";
import ListItem from "./list-item";
import Space from "./space";
import Hr from "./hr";

type TokenProps = {
  token: Token;
};

export default function Token({ token }: TokenProps) {
  switch (token.type) {
    case "text":
      return <Text token={token as Tokens.Text} />;
    case "em":
      return <Em token={token as Tokens.Em} />;
    case "strong":
      return <Strong token={token as Tokens.Strong} />;
    case "link":
      return <Link token={token as Tokens.Link} />;
    case "paragraph":
      return <Paragraph token={token as Tokens.Paragraph} />;
    case "list":
      return <List token={token as Tokens.List} />;
    case "list_item":
      return <ListItem token={token as Tokens.ListItem} />;
    case "space":
      return <Space />;
    case "hr":
      return <Hr />;

    default:
      console.error("unhandled token type", token.type, "for token", token);
      return null;
  }
}
