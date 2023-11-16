import { type SectionNode } from "../core/node";
import TreeNode from "./tree";

type SectionNodeProps = SectionNode;

export default function SectionNode({ section, children }: SectionNodeProps) {
  return (
    <section>
      <div className="section-node">
        <strong className="section">{section}</strong>
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
