export type TextNode = {
  text: string;
  children?: Array<Node>;
};

export type LinkNode = {
  text: string;
  link: string;
  children?: Array<Node>;
};

export type SectionNode = {
  section: string;
  children?: Array<Node>;
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

export type Node = TextNode | LinkNode | SectionNode;

export type Nodes = Node[];
