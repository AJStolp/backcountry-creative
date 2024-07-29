"use client";

import { useState, useEffect, useCallback } from "react";
import { useSpring, animated } from "@react-spring/web";
import { ServiceProps } from "@/app/interfaces/services";

export default function TransitionSection() {
  const [showNextSection, setShowNextSection] = useState(false);
  const [serviceData, setServicesData] = useState<ServiceProps[]>([]);
  const [transitionComplete, setTransitionComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        const data: ServiceProps[] = await response.json();
        setServicesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition + windowHeight >= documentHeight - 50) {
      setShowNextSection(true);
    } else if (
      scrollPosition + windowHeight <
      documentHeight - windowHeight / 2
    ) {
      setShowNextSection(false);
      setTransitionComplete(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const transitionSpring = useSpring({
    clipPath: showNextSection
      ? "circle(150% at 50% 50%)"
      : "circle(0% at 50% 100%)",
    config: { duration: 1000 },
    onRest: () => {
      if (showNextSection) {
        setTransitionComplete(true);
      }
    },
  });

  return (
    <div className="relative h-screen">
      <animated.div
        style={transitionSpring}
        className="absolute inset-0 bg-[#164e63] z-10"
      />
      <animated.section
        style={{
          ...transitionSpring,
          opacity: transitionComplete ? 1 : 0,
        }}
        className="absolute inset-0 bg-light-background dark:bg-[#083344] flex items-center justify-center z-20 transition-opacity duration-300"
      >
        {serviceData.map((value) => (
          <section key={value.key}>
            <h2 className="text-light-text dark:text-dark-text">
              {value.title}
            </h2>
          </section>
        ))}
      </animated.section>
    </div>
  );
}
