type style = "bold" | "italic";

export type TextNode = {
  text: string;
  style?: style[];
  children?: Array<Node>;
};

export type LinkNode = {
  text: string;
  link: string;
  style?: style[];
  children?: Array<Node>;
};

export type SectionNode = {
  section: string;
  children?: Array<Node>;
  style?: style[];
};

export const isLinkNode = (obj: any): obj is LinkNode => {
  if (typeof obj.link === "string" && typeof obj.text === "string") return true;
  return false;
};

export const isTextNode = (obj: any): obj is TextNode => {
  if (typeof obj.text === "string") return true;
  return false;
};

export const isSectionNode = (obj: any): obj is SectionNode => {
  if (typeof obj.section === "string") return true;
  return false;
};

export function hasActiveChild(url: string, children: Nodes): boolean {
  for (const node of children) {
    if (isLinkNode(node)) {
      if (url.endsWith(`/${node.link}`)) {
        return true;
      }
      if (node.children) {
        if (hasActiveChild(url, node.children)) return true;
      }
    } else if (isTextNode(node)) {
      if (node.children) {
        if (hasActiveChild(url, node.children)) return true;
      }
    }
  }
  return false;
}

export type Node = TextNode | LinkNode | SectionNode;

export type Nodes = Node[];
