"use client";
import { useEffect, useRef, useState } from "react";

const useResize = () => {
  const parentDivRef = useRef(null);
  const childDivRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    if (parentDivRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === parentDivRef.current) {
            setParentWidth(entry.contentRect.width);
          }
        }
      });

      resizeObserver.observe(parentDivRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (childDivRef.current) {
      childDivRef.current.style.width = `${parentWidth}px`;
    }
  }, [parentWidth]);

  return {
    parentDivRef,
    childDivRef,
    parentWidth,
  };
};
export default useResize;
