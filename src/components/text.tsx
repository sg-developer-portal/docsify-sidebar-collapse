import type { TextNode } from "../core/node";
import TreeNode from "./tree";

type TextNodeProps = TextNode;
export default function TextNode({ text, children }: TextNodeProps) {
  return (
    <>
      <p>{text}</p>
      {children && <TreeNode node={children} />}
    </>
  );
}
