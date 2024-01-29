import { useEffect } from "preact/hooks";

export default function useHistory(callback: (url: URL) => void) {
  const cb = () => {
    callback(new URL(window.location.href));
  };
  useEffect(() => {
    window.addEventListener("pushstate" as any, cb);
    window.addEventListener("popstate" as any, cb);

    return () => {
      window.removeEventListener("pushstate" as any, cb);
      window.removeEventListener("popstate" as any, cb);
    };
  }, []);
  return window.location.href;
}
