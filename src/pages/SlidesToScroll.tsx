import { EmblaOptionsType } from "embla-carousel";
// import EmblaCarousel from "../sections/slides-to-scroll/EmblaCarousel";
import Header from "../sections/slides-to-scroll/Header";
import SlidesToScrollCarousel from "../sections/slides-to-scroll/SlidesToScrollCarousel";

const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };
// const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto", loop: false };

const SLIDES = [0, 1, 2, 3, 4, 5];

const SlidesToScrollPage = () => {
  return (
    <>
      <Header />
      <SlidesToScrollCarousel slides={SLIDES} options={OPTIONS} />
    </>
  );
};

export default SlidesToScrollPage;
