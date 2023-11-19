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
import { isActiveLinkToken } from "./link";
import useUrlChange from "../hooks/useUrlChange";

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

  const _isActive = (url: string, token?: Tokens.Link) =>
    token && isActiveLinkToken(token, url);
  const _hasActive = (url: string, token?: Tokens.List) =>
    token && getActiveLinkToken(token, url) !== undefined;

  const [hasActive, setHasActive] = useState(
    _hasActive(window.location.href, listToken)
  );
  const [isActive, setIsActive] = useState(
    _isActive(window.location.href, linkToken)
  );
  const [show, setShow] = useState(hasActive || isActive);
  const toggleShow = () => setShow((prev) => !prev);

  useUrlChange((url) => {
    const ia = _isActive(url, linkToken);
    const ha = _hasActive(url, listToken);
    setIsActive(ia);
    setHasActive((prev) => {
      if (prev && !ha) {
        setShow(false);
      }
      return ha;
    });
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
