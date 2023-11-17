import type { Tokens } from "marked";
import { ComponentProps } from "preact";
import Text from "./text";
import clsx from "clsx";
import { getTextToken, getLinkToken } from "./list-item";

type LeafListItemProps = {
  token: Tokens.ListItem;
} & ComponentProps<"li">;

export default function LeafListItem({
  token,
  className,
  ...props
}: LeafListItemProps) {
  const textToken = getTextToken(token);

  if (textToken === undefined) {
    console.error(
      "text token not found while rendering Leaf list item.",
      token
    );
    return null;
  }

  const linkToken = getLinkToken(textToken);

  return (
    <li className={clsx("node", className)} {...props}>
      <div className="head">
        <Text
          className="text link"
          token={textToken}
          onClick={() =>
            linkToken && window.location.assign(`#/${linkToken.href}`)
          }
        />
      </div>
    </li>
  );
}
