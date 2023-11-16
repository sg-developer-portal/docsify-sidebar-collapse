import { marked, Tokens } from "marked";
import type { LinkNode, Nodes, SectionNode, TextNode } from "./node";

type Token =
  | "text"
  | "list"
  | "list_item"
  | "em"
  | "strong"
  | "space"
  | "paragraph";

export default function parse(markdown: string) {
  const lexer = new marked.Lexer();
  const tokens = lexer.lex(markdown);
  console.log(tokens);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    // At level 1, node can only be a Section or a Tree
    switch (token.type as Token) {
      case "paragraph":
        const nxtIdx = tokens.findIndex(
          (t, idx) => t.type === "list" && idx > i
        );
        if (nxtIdx === -1) {
          console.log("section, no children", token);
          continue;
        }
        console.log("section", token);
        console.log("children", tokens[nxtIdx]);
        const sectionNode = getSectionNode(
          token as Tokens.Paragraph,
          tokens[nxtIdx] as Tokens.List
        );
        console.log("section node", sectionNode);
        i = nxtIdx;
        break;
      case "list":
        console.log("tree", token);
        break;
    }
  }
}

// Trees don't include section nodes.
export function getTree(listToken: Tokens.List): Nodes {
  const result: Nodes = [];
  for (const token of listToken.items) {
    // Is the node text or a link?
    if (isLinkNode(token)) {
      result.push(getLinkNode(token));
    } else if (isTextNode(token)) {
      result.push(getTextNode(token));
    } else {
      console.log("unrecognised node");
    }
  }
  return result;
}

function isLinkNode(token: Tokens.ListItem): boolean {
  return false;
}

function getLinkNode(token: Tokens.ListItem): LinkNode {
  return { link: "", text: "", children: [], style: [] };
}

function isTextNode(token: Tokens.ListItem): boolean {
  return false;
}

function getTextNode(token: Tokens.ListItem): TextNode {
  return { text: "", children: [], style: [] };
}

function getSectionNode(
  sectionToken: Tokens.Paragraph,
  listToken: Tokens.List
): SectionNode {
  for (const token of sectionToken.tokens) {
    switch (token.type) {
      case "text":
        break;
      case "link":
        break;
      case "em":
        break;
      case "strong":
        break;
    }
  }
  return { section: "", style: [], children: [] };
}
