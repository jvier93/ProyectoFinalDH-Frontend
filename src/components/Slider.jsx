import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Category from "./Category";

const Slider = ({ data }) => {
  const slider = useRef();
  const [width, setWidth] = useState(
    window.innerWidth <= 1366 ? window.innerWidth : 1366,
  );
  const [scrolling, setScrolling] = useState(true);
  const scrollInterval = 3000; // Interval between slides in milliseconds

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1366) {
        setWidth(window.innerWidth);
      } else {
        setWidth(1366);
      }
    }
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrolling) {
        const scrollLeft = slider.current.scrollLeft;
        const clientWidth = slider.current.clientWidth;
        const scrollWidth = slider.current.scrollWidth;

        if (scrollLeft + clientWidth >= scrollWidth - width / 2) {
          slider.current.scrollLeft = 0; // Reset to the beginning
        } else {
          slider.current.scrollLeft += width; // Scroll to the next category
        }
      }
    }, scrollInterval); // Change the slide every 3 seconds

    return () => clearInterval(interval);
  }, [scrolling, width]);

  const slideLeft = () => {
    slider.current.scrollLeft = Math.max(0, slider.current.scrollLeft - width);
  };

  const slideRight = () => {
    slider.current.scrollLeft = Math.min(
      slider.current.scrollWidth - slider.current.clientWidth,
      slider.current.scrollLeft + width,
    );
  };

  return (
    <div className="relative w-full">
      <div
        ref={slider}
        className="overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
      >
        {data?.map((item, index) => (
          <Category width={width} key={index} category={item} />
        ))}
      </div>
      <div className="bottom-0 right-0 flex gap-4 px-6 pt-6 md:absolute">
        <div
          onClick={slideLeft}
          className="group flex h-12 w-12 cursor-pointer flex-col justify-center rounded-full border border-gray-400 text-gray-500 group-hover:text-primary hover:border-primary"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="cursor-pointer text-gray-500 group-hover:text-primary"
            size="xl"
          />
        </div>

        <div
          onClick={slideRight}
          className="group flex h-12 w-12 cursor-pointer flex-col justify-center rounded-full border border-gray-400 text-gray-500 group-hover:text-primary hover:border-primary"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="cursor-pointer text-gray-500 group-hover:text-primary"
            size="xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
