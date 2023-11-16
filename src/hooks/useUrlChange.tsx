import { useEffect } from "preact/hooks";

const useUrlChange = (callback?: (url: string) => void) => {
  const handleUrlChange = () => {
    if (callback && typeof callback === "function") {
      callback(window.location.href);
    }
  };

  useEffect(() => {
    // Initial setup
    handleUrlChange();

    // Event listener for changes in the URL
    const handlePopState = () => {
      handleUrlChange();
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [callback]);

  // Optionally, you can return the current URL if needed
  const currentUrl = window.location.href;

  return currentUrl;
};

export default useUrlChange;
