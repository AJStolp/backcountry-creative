"use client";

import { useSpring, animated, useScroll } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import { SectionProps } from "../interfaces/section";

export default function MyStickyScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState<SectionProps[]>([]);

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
  }, []);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = container.clientHeight;
      const newSection = Math.round(scrollPosition / windowHeight);
      setCurrentSection(newSection);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollIndicatorStyle = useSpring({
    opacity: scrollYProgress.to(
      [(sections.length - 1) / sections.length, 1],
      [1, 0]
    ),
  });

  const ctaStyle = useSpring({
    opacity: scrollYProgress.to([0.9, 1], [0, 1]),
  });

  return (
    <div className="h-screen overflow-hidden relative pt-8">
      <div
        ref={ref}
        className="h-full w-full overflow-y-scroll scroll-smooth"
        style={{
          scrollSnapType: "y mandatory",
        }}
      >
        <div className="min-h-[300vh] w-full">
          {sections.map((section, index) => (
            <animated.div
              key={index}
              style={{
                opacity: index === currentSection ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
              className="min-h-screen flex items-center justify-center p-8 sticky top-0"
            >
              <div
                className="max-w-2xl text-center"
                style={{
                  scrollSnapAlign: "start",
                  scrollSnapStop: "always",
                }}
              >
                <h2
                  className={`text-3xl font-semibold mb-4 text-dark-primary ${
                    index === 0 ? "text-4xl" : ""
                  }`}
                >
                  {section.title}
                </h2>
                <p className="text-xl">{section.content}</p>
              </div>
            </animated.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center justify-center p-4 space-y-4">
        <animated.div style={scrollIndicatorStyle} className="mb-4">
          <div className="arrow-down"></div>
        </animated.div>
      </div>
      <div className="absolute bottom-[4rem] left-0 right-0 flex flex-col items-center justify-center p-4 space-y-4">
        <animated.div style={ctaStyle}>
          <button
            className="bg-dark-background dark:bg-light-background hover:bg-blue-700 text-dark-text dark:text-light-text font-bold py-2 px-4 rounded"
            onClick={() => {
              // Add navigation logic here
              console.log("Navigate to next section");
            }}
          >
            Next Section
          </button>
        </animated.div>
      </div>
    </div>
  );
}
