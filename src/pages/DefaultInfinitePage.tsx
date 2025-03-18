import { EmblaOptionsType } from "embla-carousel";

import InfiniteCarousel from "../sections/infinite/InfiniteCarousel";
import Header from "../sections/infinite/Header";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES = [0, 1, 2, 3, 4];

const DefaultInfinitePage = () => {
  return (
    <>
      <Header />
      <InfiniteCarousel slides={SLIDES} options={OPTIONS} />
    </>
  );
};
export default DefaultInfinitePage;
