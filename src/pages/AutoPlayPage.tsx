import { EmblaOptionsType } from "embla-carousel";

import AutoPlayCarousel from "../sections/auto-play/AutoPlayCarousel";
import Header from "../sections/auto-play/Header";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES = [0, 1, 2, 3, 4];

const AutoPlayPage = () => {
  return (
    <>
      <Header />
      <AutoPlayCarousel slides={SLIDES} options={OPTIONS} />
    </>
  );
};

export default AutoPlayPage;
