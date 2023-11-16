import { isLinkNode, type Node } from "../core/node";
import { useState } from "preact/hooks";
import clsx from "clsx";
import TreeNode from "./tree";
import chevron from "../assets/chevron.png";

type NodeProps = Node;
export default function Node(props: NodeProps) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);
  return (
    <div>
      <div className="node">
        {isLinkNode(props) ? (
          <a className="link" href={props.link} onClick={toggleShow}>
            {props.text}
          </a>
        ) : (
          <span className="text" onClick={toggleShow}>
            {props.text}
          </span>
        )}
        {props.children && (
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
      {props.children && (
        <div className={clsx("children", show && "show")}>
          <TreeNode node={props.children} />
        </div>
      )}
    </div>
  );
}
