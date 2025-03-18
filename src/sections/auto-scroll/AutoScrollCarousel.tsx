import { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "../../components/usePrevNextButtons";
import { PrevBtn } from "../../components/PrevBtn";
import { NextBtn } from "../../components/NextBtn";
import AutoScroll from "embla-carousel-auto-scroll";

import "../../styles/auto-scroll.css";
type Props = {
  slides: number[];
  options?: EmblaOptionsType;
};

const AutoScrollCarousel = (props: Props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: false }),
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const { prevBtnDisabled, nextBtnDisabled, onPrevBtnClick, onNextBtnClick } =
    usePrevNextButtons(emblaApi);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

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
            onClick={() => onButtonAutoplayClick(onPrevBtnClick)}
            disabled={prevBtnDisabled}
          />
          <NextBtn
            onClick={() => onButtonAutoplayClick(onNextBtnClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <button className="embla-play" onClick={toggleAutoplay} type="button">
          {isPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
