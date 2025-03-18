import { useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { usePrevNextButtons } from "../../components/usePrevNextButtons";
import { NextBtn } from "../../components/NextBtn";
import { PrevBtn } from "../../components/PrevBtn";
import { useAutoplay } from "./AutoPlay";
import { useAutoplayProgress } from "./AutoPlayProgress";

import "../../styles/auto-play.css";

type Props = {
  slides: number[];
  options?: EmblaOptionsType;
};

const AutoPlayCarousel = (props: Props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null!);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 }),
  ]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevBtnClick, onNextBtnClick } =
    usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  return (
    <div className="embla">
      <div className="embla-viewport" ref={emblaRef}>
        <div className="embla-container">
          {slides.map((index) => (
            <div className="embla-slide" key={index}>
              <div className="embla-slide-number">
                <span>{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-controls">
        <div className="embla-buttons">
          <PrevBtn
            onClick={() => onAutoplayButtonClick(onPrevBtnClick)}
            disabled={prevBtnDisabled}
          />
          <NextBtn
            onClick={() => onAutoplayButtonClick(onNextBtnClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <div
          className={`embla-progress`.concat(
            showAutoplayProgress ? "" : " embla-progress-hidden"
          )}
        >
          <div className="embla-progress-bar" ref={progressNode} />
        </div>

        <button className="embla-play" onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default AutoPlayCarousel;
