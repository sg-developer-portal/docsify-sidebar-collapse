import TextNode from "./text";
import LinkNode from "./link";
import { Nodes, isLinkNode, isTextNode } from "../core/node";

type TreeNodeProps = {
  node: Nodes;
};

export default function TreeNode({ node }: TreeNodeProps) {
  const tree = node.map((node) => {
    if (isLinkNode(node)) {
      return (
        <LinkNode text={node.text} link={node.link} children={node.children} />
      );
    } else if (isTextNode(node)) {
      return <TextNode text={node.text} children={node.children} />;
    } else {
      console.error(JSON.stringify(node), "incorrect node format.");
      return <p>Error Node</p>;
    }
  });
  return <>{tree}</>;
}
