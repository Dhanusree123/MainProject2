import { EmblaOptionsType } from "embla-carousel";
import AutoScrollCarousel from "../sections/auto-scroll/AutoScrollCarousel";
import Header from "../sections/auto-scroll/Header";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES = [0, 1, 2, 3, 4, 5, 6, 7];
const AutoScrollPage = () => {
  return (
    <>
      <Header />
      <AutoScrollCarousel slides={SLIDES} options={OPTIONS} />
    </>
  );
};

export default AutoScrollPage;
