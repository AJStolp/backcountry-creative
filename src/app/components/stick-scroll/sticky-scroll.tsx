"use client";

import { useSpring, animated, useScroll } from "@react-spring/web";

export default function MyStickyScroll() {
  const { scrollYProgress } = useScroll();

  const stickyStyle = useSpring({
    opacity: scrollYProgress.to([0, 0.3, 0.7, 1], [1, 1, 0, 0]),
    transform: scrollYProgress.to(
      [0, 0.3, 0.7, 1],
      [
        "translateY(0%)",
        "translateY(0%)",
        "translateY(-50%)",
        "translateY(-50%)",
      ]
    ),
  });

  return (
    <div style={{ height: "200vh", padding: "50px" }}>
      <animated.div
        style={{
          ...stickyStyle,
          position: "sticky",
          top: "20px",
          background: "lightblue",
          padding: "20px",
        }}
      >
        <h1>I'm a sticky layer</h1>
      </animated.div>
      <div
        style={{
          marginTop: "150vh",
          background: "lightcoral",
          padding: "20px",
        }}
      >
        <h1>I'm not sticky</h1>
      </div>
    </div>
  );
}
