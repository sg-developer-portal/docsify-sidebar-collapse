import type { LinkNode } from "../core/node";
import TreeNode from "./tree";

type LinkNodeProps = LinkNode;
export default function LinkNode({ link, text, children }: LinkNodeProps) {
  return (
    <>
      <a href={link}>{text}</a>
      {children && <TreeNode node={children} />}
    </>
  );
}
