import LinkNode from "./link-node";
import TextNode from "./text-node";
import SectionNode from "./section-node";
import { Nodes, isLinkNode, isSectionNode, isTextNode } from "../core/node";

type TreeNodeProps = {
  node: Nodes;
};

export default function TreeNode({ node }: TreeNodeProps) {
  const tree = node.map((node) => {
    if (isLinkNode(node)) {
      return <LinkNode {...node} />;
    } else if (isTextNode(node)) {
      return <TextNode {...node} />;
    } else if (isSectionNode(node)) {
      return <SectionNode {...node} />;
    } else {
      console.error(JSON.stringify(node), "incorrect node format.");
      return <p>Error Node</p>;
    }
  });
  return <>{tree}</>;
}
