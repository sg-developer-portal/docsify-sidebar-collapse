import type { Tokens } from "marked";
import { ComponentProps } from "preact";
import Text from "./text";
import List from "./list";
import { useState } from "preact/hooks";
import clsx from "clsx";
import {
  getTextToken,
  getListToken,
  getLinkToken,
  getActiveLinkToken,
} from "./list-item";
import chevron from "../assets/chevron.png";
import Link, { isActiveLinkToken } from "./link";
import useHistory from "../hooks/useHistory";

type RootListItemProps = {
  token: Tokens.ListItem;
} & ComponentProps<"li">;

export default function RootListItem({
  token,
  className,
  ...props
}: RootListItemProps) {
  const textToken = getTextToken(token);
  const listToken = getListToken(token);

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

  const _ha = (url: string, token: Tokens.List) =>
    getActiveLinkToken(token, url);
  const _ia = (url: string, token?: Tokens.Link) =>
    (token && isActiveLinkToken(token, url)) || false;

  const [hasActive, setHasActive] = useState(
    _ha(window.location.href, listToken)
  );
  const [isActive, setIsActive] = useState(
    _ia(window.location.href, linkToken)
  );
  const [show, setShow] = useState(hasActive || isActive);
  const toggleShow = () => setShow((prev) => !prev);

  useHistory((url) => {
    const ha = _ha(url, listToken);
    const ia = _ia(url, linkToken);
    setHasActive(ha);
    setIsActive(ia);
    setShow(ha || ia);
  });

  return (
    <li
      className={clsx(
        "node",
        hasActive && "has-active",
        isActive && "active",
        className
      )}
      {...props}
    >
      <div className="head">
        {linkToken ? (
          <Link onClick={toggleShow} className="text link" token={linkToken} />
        ) : (
          <Text onClick={toggleShow} className="text link" token={textToken} />
        )}
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
