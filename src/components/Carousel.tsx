import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useDotButton } from "./useDotButton";
import { usePrevNextButtons } from "./usePrevNextButtons";
import { PrevBtn } from "./PrevBtn";
import { NextBtn } from "./NextBtn";
import { DotButton } from "./DotBtn";

import "../styles/slides-per-view.css";

type Props = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = (props: Props) => {
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
              className={"embla-dot".concat(
                index === selectedIndex ? "embla-dot-selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
