import type { Token as Tkn, Tokens } from "marked";
import { ComponentProps } from "preact";
import RootListItem from "./root-list-item";
import LeafListItem from "./leaf-list-item";
import { isActiveLinkToken } from "../lib/url";

type ListItemProps = {
  token: Tokens.ListItem;
} & ComponentProps<"li">;

// List Item can be: Leaf, Root, Both
// List Item is "Leaf" if list item has a link
// List Item is "Root" if list item has child List
// List Item is Both if list item has a link and has a child list

export default function ListItem({ token, ...props }: ListItemProps) {
  const root = isRoot(token);

  if (root) {
    return <RootListItem token={token} {...props} />;
  } else {
    return <LeafListItem token={token} {...props} />;
  }
}

function isRoot(token: Tokens.ListItem): boolean {
  return token.tokens.some((t) => t.type === "list");
}

export function getTextToken(token: Tokens.ListItem): Tokens.Text | undefined {
  return token.tokens.find((t) => t.type === "text") as Tokens.Text | undefined;
}

export function getListToken(token: Tokens.ListItem): Tokens.List | undefined {
  return token.tokens.find((t) => t.type === "list") as Tokens.List | undefined;
}

export function getLinkToken(token: Tkn): Tokens.Link | undefined {
  return find(token, (t) => t.type === "link") as Tokens.Link | undefined;
}

export function getActiveLinkToken(
  token: Tkn,
  url: string
): Tokens.Link | undefined {
  return find(
    token,
    (t) => t.type === "link" && isActiveLinkToken(t as Tokens.Link, url)
  ) as Tokens.Link | undefined;
}

function find(token: Tkn, predicate: (t: Tkn) => boolean): Tkn | undefined {
  if (predicate(token)) {
    return token;
  }

  const t: any = token;

  if (t.hasOwnProperty("tokens")) {
    for (const _t of t.tokens) {
      const res = find(_t, predicate);
      if (res) return res;
    }
  }

  if (t.hasOwnProperty("items")) {
    for (const _t of t.items) {
      const res = find(_t, predicate);
      if (res) return res;
    }
  }

  return undefined;
}
