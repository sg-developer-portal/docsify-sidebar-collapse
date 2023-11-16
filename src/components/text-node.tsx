import { hasActiveChild, type TextNode } from "../core/node";
import { useState } from "preact/hooks";
import clsx from "clsx";
import TreeNode from "./tree";
import chevron from "../assets/chevron.png";
import useUrlChange from "../hooks/useUrlChange";

type TextNodeProps = TextNode;

export default function TextNode({ text, children, style }: TextNodeProps) {
  const _hasActive = (url: string) =>
    children ? hasActiveChild(url, children) : false;
  const [hasActive, setHasActive] = useState(_hasActive(window.location.href));
  const [show, setShow] = useState(hasActive);
  const toggleShow = () => setShow((prev) => !prev);

  useUrlChange((url) => {
    setHasActive((prev) => {
      const ha = _hasActive(url);
      if (ha !== prev && !ha) {
        setShow(false);
      }
      return ha;
    });
  });

  return (
    <div>
      <div className={clsx("node", hasActive && "has-active")}>
        <p className={clsx("text", style)} onClick={toggleShow}>
          {text}
        </p>
        {children && (
          <div className="chevron" onClick={toggleShow}>
            <img
              src={chevron}
              alt="chevron"
              width={16}
              height={16}
              className={clsx("chevron-icon", show && "show")}
            />
          </div>
        )}
      </div>
      {children && (
        <div className={clsx("children", show && "show")}>
          <TreeNode node={children} />
        </div>
      )}
    </div>
  );
}
