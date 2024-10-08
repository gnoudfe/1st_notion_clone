import  { useEffect, useState } from "react";

const useScrollTop = (threshhold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > threshhold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshhold]);
  return scrolled;
};

export default useScrollTop;
