import { type LinkNode, hasActiveChild } from "../core/node";
import { useState } from "preact/hooks";
import clsx from "clsx";
import TreeNode from "./tree";
import chevron from "../assets/chevron.png";
import useUrlChange from "../hooks/useUrlChange";

type LinkNodeProps = LinkNode;

export default function LinkNode({
  link,
  text,
  style,
  children,
}: LinkNodeProps) {
  const _hasActive = (url: string) =>
    children ? hasActiveChild(url, children) : false;
  const _isActive = (url: string) => url.endsWith(`${link}`);
  const [hasActive, setHasActive] = useState(_hasActive(window.location.href));
  const [isActive, setIsActive] = useState(_isActive(window.location.href));
  const [show, setShow] = useState(hasActive || isActive);
  const toggleShow = () => setShow((prev) => !prev);

  useUrlChange((url) => {
    setHasActive((prev) => {
      const ha = _hasActive(url);
      if (ha !== prev && !ha) {
        setShow(false);
      }
      return ha;
    });
    setIsActive(_isActive(url));
  });

  return (
    <div>
      <div
        className={clsx(
          "node",
          isActive && "active",
          hasActive && "has-active"
        )}
      >
        <a
          className={clsx("link", style)}
          href={`${link}`}
          onClick={toggleShow}
        >
          {text}
        </a>
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
