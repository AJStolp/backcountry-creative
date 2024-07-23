"use client";

import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function TransitionSection() {
  const [showNextSection, setShowNextSection] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition > lastScrollY) {
        // Scrolling down
        if (scrollPosition + windowHeight >= documentHeight - 50) {
          setShowNextSection(true);
        }
      } else {
        // Scrolling up
        if (scrollPosition + windowHeight < documentHeight - windowHeight / 2) {
          setShowNextSection(false);
        }
      }

      setLastScrollY(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const transitionSpring = useSpring({
    clipPath: showNextSection
      ? "circle(150% at 50% 100%)"
      : "circle(0% at 50% 100%)",
    config: { duration: 1000 },
  });

  return (
    <animated.section
      style={transitionSpring}
      className="h-screen bg-light-background dark:bg-dark-background flex items-center justify-center"
    >
      <h2 className="text-4xl font-bold text-dark-primary dark:text-light-primary">
        Next Section
      </h2>
    </animated.section>
  );
}
