import clsx from "clsx";
import { type SectionNode } from "../core/node";
import TreeNode from "./tree";

type SectionNodeProps = SectionNode;

export default function SectionNode({
  section,
  children,
  style,
}: SectionNodeProps) {
  return (
    <section>
      <div className="section-node">
        <strong className={clsx("section", style)}>{section}</strong>
      </div>
      <hr />
      {children && (
        <div className="children show">
          <TreeNode node={children} />
        </div>
      )}
    </section>
  );
}
