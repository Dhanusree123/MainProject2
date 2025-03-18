import Header from "../sections/slides-per-view/Header";

import { EmblaOptionsType } from "embla-carousel";
import SlidesPerViewCarousel from "../sections/slides-per-view/SlidesPerViewCarousel";

const OPTIONS: EmblaOptionsType = { align: "start" };
const SLIDES = [0, 1, 2, 3, 4, 5];

const SlidesPerViewPage = () => {
  return (
    <>
      <Header />
      <SlidesPerViewCarousel slides={SLIDES} options={OPTIONS} />
    </>
  );
};

export default SlidesPerViewPage;
