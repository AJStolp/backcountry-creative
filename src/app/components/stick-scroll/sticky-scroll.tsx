"use client";

import { useSpring, animated, useScroll } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import { SectionProps } from "../interfaces/section";

export default function MyStickyScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState<SectionProps[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { scrollYProgress } = useScroll({
    container: ref as React.MutableRefObject<HTMLElement>,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sections");
        const data: SectionProps[] = await response.json();
        setSections(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleColorSchemeChange = (e: MediaQueryListEvent) =>
      setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleColorSchemeChange);

    return () =>
      darkModeMediaQuery.removeEventListener("change", handleColorSchemeChange);
  }, []);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Ensure we start at the top with a small delay
    const timer = setTimeout(() => {
      container.scrollTop = 0;
      setCurrentSection(0);
    }, 100);

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = container.clientHeight;
      const newSection = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(newSection);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [sections.length]);

  const scrollIndicatorStyle = useSpring({
    opacity: scrollYProgress.to(
      [0, (sections.length - 1) / sections.length, 2],
      [1, 1, 0]
    ),
  });

  return (
    <div
      className={`h-screen overflow-hidden relative ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div
        ref={ref}
        className="h-full w-full overflow-y-scroll scroll-smooth sticky-scroll-container"
        style={{
          scrollSnapType: "y mandatory",
        }}
      >
        <div className="w-full">
          {sections.map((section, index) => (
            <animated.div
              key={index}
              style={{
                opacity: index === currentSection ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
              className="h-screen flex items-center justify-center p-8 sticky top-0"
            >
              <div
                className="max-w-2xl text-center"
                style={{
                  scrollSnapAlign: "start",
                  scrollSnapStop: "always",
                }}
              >
                <h2
                  className={`text-3xl font-semibold mb-4 text-light-text dark:text-dark-primary ${
                    index === 0 ? "text-4xl" : ""
                  }`}
                >
                  {section.title}
                </h2>
                <p className="text-xl text-light-text dark:text-dark-text">
                  {section.content}
                </p>
                {section.additionalServices && (
                  <ul className="list-disc list-inside mt-4 text-dark-text dark:text-light-text">
                    <li>{section.additionalServices.one}</li>
                    <li>{section.additionalServices.two}</li>
                  </ul>
                )}
              </div>
            </animated.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[13rem] left-0 right-0 flex flex-col items-center justify-center p-4 space-y-4">
        <animated.div style={scrollIndicatorStyle} className="mb-4">
          <div className="arrow-down border-dark-text dark:border-dark-text"></div>
        </animated.div>
      </div>
    </div>
  );
}
