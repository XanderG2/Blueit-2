export const getCookieValue = (name: string) => {
  if (typeof document !== "undefined") {
    return (
      document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ||
      ""
    );
  }
};
