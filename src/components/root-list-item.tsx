import type { Tokens } from "marked";
import { ComponentProps } from "preact";
import Text from "./text";
import List from "./list";
import { useState } from "preact/hooks";
import clsx from "clsx";
import { getTextToken, getListToken, getLinkToken } from "./list-item";
import chevron from "../assets/chevron.png";

type RootListItemProps = {
  token: Tokens.ListItem;
} & ComponentProps<"li">;

export default function RootListItem({
  token,
  className,
  ...props
}: RootListItemProps) {
  const [show, setShow] = useState(false);

  const textToken = getTextToken(token);
  const listToken = getListToken(token);

  const toggleShow = () => setShow((prev) => !prev);

  if (textToken === undefined) {
    console.error(
      "text token not found while rendering root list item.",
      token
    );
    return null;
  }

  if (listToken === undefined) {
    console.error(
      "list token not found while rendering root list item.",
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
        <div className="chevron" onClick={toggleShow}>
          <img
            src={chevron}
            alt="chevron"
            width={16}
            height={16}
            className={clsx("chevron-icon", show && "show")}
          />
        </div>
      </div>
      <div className={clsx("children", show && "show")}>
        <List token={listToken} />
      </div>
    </li>
  );
}
