export type TextNode = {
  text: string;
  children?: Array<Node>;
};

export type LinkNode = {
  text: string;
  link: string;
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

export type Node = TextNode | LinkNode;

export type Nodes = Node[];
