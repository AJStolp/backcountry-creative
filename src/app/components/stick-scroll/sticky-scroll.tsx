"use client";

import { useSpring, animated, useScroll, useSprings } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import { HeroProps } from "../../interfaces/hero";

export default function MyStickyScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<HeroProps[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    container: ref as React.MutableRefObject<HTMLElement>,
  });

  const [sectionSprings, setSectionSprings] = useSprings(
    sections.length,
    (index) => ({
      opacity: index === 0 ? 1 : 0,
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hero-data");
        const data: HeroProps[] = await response.json();
        setSections(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoaded && ref.current) {
      ref.current.scrollTop = 0;
      window.scrollTo(0, 0);

      const handleScroll = () => {
        const container = ref.current;
        if (container) {
          const scrollPosition = container.scrollTop;
          const windowHeight = container.clientHeight;
          const currentSection = Math.floor(scrollPosition / windowHeight);

          setSectionSprings.start((index) => {
            const distanceFromCurrent = Math.abs(index - currentSection);
            const opacity = 1 - Math.min(distanceFromCurrent, 1);
            return {
              opacity,
              config: { tension: 280, friction: 60 },
            };
          });
        }
      };

      ref.current.addEventListener("scroll", handleScroll);
      return () => ref.current?.removeEventListener("scroll", handleScroll);
    }
  }, [isLoaded, setSectionSprings]);

  const scrollIndicatorStyle = useSpring({
    opacity: scrollYProgress.to([0, 0.9, 1], [1, 1, 0]),
  });

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`h-screen overflow-hidden relative ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div
        ref={ref}
        className="h-full w-full overflow-y-scroll scroll-smooth sticky-scroll-container scrollbar-hide"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <div className="w-full">
          {sections.map((section, index) => (
            <animated.div
              key={section.key}
              style={sectionSprings[index]}
              className="h-screen flex items-center justify-center p-8 sticky top-0"
            >
              <div
                className="max-w-2xl"
                style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
              >
                <div className="mt-[-15rem]">
                  <h2
                    className={`text-3xl font-semibold mb-4 text-light-text dark:text-dark-primary text-center ${
                      index === 0 ? "text-4xl" : ""
                    }`}
                  >
                    {section.title}
                  </h2>
                  <p className="text-left text-xl text-light-text dark:text-dark-text">
                    {section.content}
                  </p>
                  {section.additionalServices && (
                    <ul className="text-left list-disc list-inside mt-4 text-light-text dark:text-dark-text">
                      <li>{section.additionalServices.one}</li>
                      <li className="pt-2">{section.additionalServices.two}</li>
                    </ul>
                  )}
                </div>
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
