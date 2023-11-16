import { type LinkNode } from "../core/node";
import { useState } from "preact/hooks";
import clsx from "clsx";
import TreeNode from "./tree";
import chevron from "../assets/chevron.png";

type LinkNodeProps = LinkNode;
export default function LinkNode({ link, text, children }: LinkNodeProps) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);
  return (
    <div>
      <div className="node">
        <a className="link" href={link} onClick={toggleShow}>
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
