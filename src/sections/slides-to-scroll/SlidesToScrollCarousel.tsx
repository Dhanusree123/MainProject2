import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useDotButton } from "../../components/useDotButton";
import { usePrevNextButtons } from "../../components/usePrevNextButtons";
import { NextBtn } from "../../components/NextBtn";
import { PrevBtn } from "../../components/PrevBtn";
import { DotButton } from "../../components/DotBtn";

import "../../styles/slides-to-scroll.css";
type Props = {
  slides: number[];
  options?: EmblaOptionsType;
};

const SlidesToScrollCarousel = (props: Props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevBtnClick, onNextBtnClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla-viewport" ref={emblaRef}>
        <div className="embla-container">
          {slides.map((index) => (
            <div className="embla-slide" key={index}>
              <div className="embla-slide-number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-controls">
        <div className="embla-buttons">
          <PrevBtn onClick={onPrevBtnClick} disabled={prevBtnDisabled} />
          <NextBtn onClick={onNextBtnClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla-dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla-dot ".concat(
                index === selectedIndex ? "embla-dot-selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlidesToScrollCarousel;
