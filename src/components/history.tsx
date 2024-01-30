import { ComponentChildren } from "preact";
import { isExternalURL } from "../lib/url";

type HistoryProps = {
  children: ComponentChildren;
};

export default function History({ children }: HistoryProps) {
  const event = new Event("pushstate");
  let pushState = history.pushState;
  history.pushState = function (...args) {
    const url = args[2];
    if (typeof url !== "string") return;

    // Check if url is external or internal
    if (isExternalURL(url)) {
      window.open(url, "_blank")?.focus();
    } else {
      pushState.apply(history, args);
    }
    window.dispatchEvent(event);
  };
  return <>{children}</>;
}
