import TextNode from "./components/text";
import LinkNode from "./components/link";
import { SidebarNode, isLinkNode, isTextNode } from "./core/node";

type SidebarProps = {
  sidebar: SidebarNode;
};

export default function Sidebar({ sidebar }: SidebarProps) {
  return sidebar.map((node) => {
    if (isLinkNode(node)) {
      return <LinkNode text={node.text} link={node.link} />;
    } else if (isTextNode(node)) {
      return <TextNode text={node.text} />;
    } else {
      console.error(JSON.stringify(node), "incorrect node format.");
      return <p>Error Node</p>;
    }
  });
}
