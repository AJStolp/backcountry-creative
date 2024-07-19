"use client";

import { useSpring, animated, useScroll } from "@react-spring/web";
import { useRef, useEffect, useState } from "react";

export default function MyStickyScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      scrollContainerRef.current = ref.current;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef as React.MutableRefObject<HTMLElement>,
  });

  const section1Style = useSpring({
    opacity: scrollYProgress.to([0, 0.25], [1, 0]),
    transform: scrollYProgress.to(
      [0, 0.25],
      ["translateY(0%)", "translateY(-20%)"]
    ),
  });

  const section2Style = useSpring({
    opacity: scrollYProgress.to([0.25, 0.5], [0, 1]),
    transform: scrollYProgress.to(
      [0.25, 0.5],
      ["translateY(20%)", "translateY(0%)"]
    ),
  });

  const section3Style = useSpring({
    opacity: scrollYProgress.to([0.5, 0.75], [0, 1]),
    transform: scrollYProgress.to(
      [0.5, 0.75],
      ["translateY(20%)", "translateY(0%)"]
    ),
  });

  return (
    <div className="h-screen overflow-hidden">
      <div ref={ref} className="h-full overflow-y-scroll">
        <div className="relative h-[400vh]">
          <animated.div
            style={section1Style}
            className="sticky top-0 h-screen flex items-center justify-center"
          >
            <h1 className="text-3xl">Web Development Done Right</h1>
          </animated.div>
          <animated.div
            style={section2Style}
            className="sticky top-0 h-screen flex items-center justify-center"
          >
            <h1 className="text-3xl">Creative Services Done Right</h1>
          </animated.div>
        </div>
      </div>
    </div>
  );
}
