import Node from "./node";
import { Nodes, isLinkNode, isTextNode } from "../core/node";

type TreeNodeProps = {
  node: Nodes;
};

export default function TreeNode({ node }: TreeNodeProps) {
  const tree = node.map((node) => {
    if (isLinkNode(node)) {
      return (
        <Node text={node.text} link={node.link} children={node.children} />
      );
    } else if (isTextNode(node)) {
      return <Node text={node.text} children={node.children} />;
    } else {
      console.error(JSON.stringify(node), "incorrect node format.");
      return <p>Error Node</p>;
    }
  });
  return <>{tree}</>;
}
