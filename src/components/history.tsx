import { ComponentChildren } from "preact";

type HistoryProps = {
  children: ComponentChildren;
};

export default function History({ children }: HistoryProps) {
  const event = new Event("pushstate");
  let pushState = history.pushState;
  history.pushState = function (...args) {
    pushState.apply(history, args);
    window.dispatchEvent(event);
  };
  return <>{children}</>;
}
