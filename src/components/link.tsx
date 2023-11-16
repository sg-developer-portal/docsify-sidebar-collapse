import type { LinkNode } from "../core/node";
import { useState } from "preact/hooks";
import clsx from "clsx";
import TreeNode from "./tree";
import chevronUp from "../assets/chevronUp.png";
import chevronDown from "../assets/chevronDown.png";

type LinkNodeProps = LinkNode;
export default function LinkNode({ link, text, children }: LinkNodeProps) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);
  return (
    <div className="node">
      <div className="link" onClick={toggleShow}>
        <a href={link}>{text}</a>
        {children && (
          <img
            src={show ? chevronUp : chevronDown}
            alt="chevron"
            width={24}
            height={24}
          />
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
