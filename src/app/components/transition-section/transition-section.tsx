"use client";

import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function TransitionSection() {
  const [showNextSection, setShowNextSection] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hero-data");
        const data: HeroProps[] = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > lastScrollY) {
        // Scrolling down
        if (scrollPosition + windowHeight >= document.body.offsetHeight - 50) {
          setShowNextSection(true);
        }
      } else {
        // Scrolling up
        if (
          scrollPosition + windowHeight <
          document.body.offsetHeight - windowHeight / 2
        ) {
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
      ? "circle(150% at 50% 50%)"
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
