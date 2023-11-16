import { type TextNode } from "../core/node";
import { useState } from "preact/hooks";
import clsx from "clsx";
import TreeNode from "./tree";
import chevron from "../assets/chevron.png";

type TextNodeProps = TextNode;
export default function TextNode({ text, children }: TextNodeProps) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);
  return (
    <div>
      <div className="node">
        <p className="text" onClick={toggleShow}>
          {text}
        </p>
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
