import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Category from "./Category";

const Slider = ({ data }) => {
  const slider = useRef();

  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 330;
  };

  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 330;
  };

  return (
    <div className="  px-1 md:px-8 h-60 my-2 flex  items-center md:mx-4">
      <FontAwesomeIcon
        icon={faCaretLeft}
        className="text-secondary"
        size="4x"
        onClick={slideLeft}
      />
      <div
        ref={slider}
        className=" h-full w-full xl:px-20 xl:space-x-20 space-x-10 md:px-10  overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
      >
        {data?.map((item, index) => {
          return <Category key={index} title={item.name} image={item.image} />;
        })}
      </div>
      <FontAwesomeIcon
        icon={faCaretRight}
        className="text-secondary"
        onClick={slideRight}
        size="4x"
      />
    </div>
  );
};

export default Slider;
