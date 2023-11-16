import { useState } from "preact/hooks";
import type { TextNode } from "../core/node";
import clsx from "clsx";
import TreeNode from "./tree";
import chevronUp from "../assets/chevronUp.png";
import chevronDown from "../assets/chevronDown.png";

type TextNodeProps = TextNode;
export default function TextNode({ text, children }: TextNodeProps) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);
  return (
    <div className="node">
      <div className="text" onClick={toggleShow}>
        <span>{text}</span>
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
