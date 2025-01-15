"use client";
import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
  children: React.ReactNode;
  wrapperId: string;
}

const createWrapper = (wrapperId: string) => {
  if (!document) return null;
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement)
  return wrapperElement;
}


export default function ReactPortal({children, wrapperId}: ReactPortalProps) {
  const [wrapperElement, setwrapperElement] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapper(wrapperId);
    }
    setwrapperElement(element!);

    return () => {
      // cleanup
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [wrapperId]);

  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
}