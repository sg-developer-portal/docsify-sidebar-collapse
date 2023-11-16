import { type LinkNode, hasActiveChild } from "../core/node";
import { useState } from "preact/hooks";
import clsx from "clsx";
import TreeNode from "./tree";
import chevron from "../assets/chevron.png";

type LinkNodeProps = LinkNode;

export default function LinkNode({
  link,
  text,
  style,
  children,
}: LinkNodeProps) {
  const hasActive = children
    ? hasActiveChild(window.location.pathname, children)
    : false;
  const isActive = window.location.pathname.endsWith(`/${link}`);

  const [show, setShow] = useState(hasActive || isActive);
  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div>
      <div
        className={clsx(
          "node",
          isActive && "active",
          hasActive && "has-active"
        )}
      >
        <a
          className={clsx("link", style)}
          href={`/${link}`}
          onClick={toggleShow}
        >
          {text}
        </a>
        {children && (
          <div className="chevron" onClick={toggleShow}>
            <img
              src={chevron}
              alt="chevron"
              width={16}
              height={16}
              className={clsx("chevron-icon", show && "show")}
            />
          </div>
        )}
      </div>
      {children && (
        <div className={clsx("children", show && "show")}>
          <TreeNode node={children} />
        </div>
      )}
    </div>
  );
}
