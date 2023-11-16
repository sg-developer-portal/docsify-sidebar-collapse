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
      return (
        <LinkNode text={node.text} link={node.link} children={node.children} />
      );
    } else if (isTextNode(node)) {
      return <TextNode text={node.text} children={node.children} />;
    } else if (isSectionNode(node)) {
      return <SectionNode section={node.section} children={node.children} />;
    } else {
      console.error(JSON.stringify(node), "incorrect node format.");
      return <p>Error Node</p>;
    }
  });
  return <>{tree}</>;
}
