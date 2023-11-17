import { Tokens } from "marked";
import ListItem from "./list-item";
import { ComponentProps } from "preact";

type ListProps = {
  token: Tokens.List;
  listItemProps?: ComponentProps<"li">;
} & ComponentProps<"ul">;

export default function List({ token, listItemProps, ...props }: ListProps) {
  const el = token.items.map((lit, idx) => (
    <ListItem
      {...listItemProps}
      token={lit}
      key={`token-list_item-${lit.text}-${idx}`}
    />
  ));
  return <ul {...props}>{el}</ul>;
}
