import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { onboardAtom } from '@/atoms';

import { Button } from '../ui/button';
import OnboardingItem from './OnboardingItem';

function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [onboarded, setOnboard] = useAtom(onboardAtom);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const sliderIndexCx = (index: number) =>
    clsx(
      'h-1 w-[50%] rounded-full',
      activeIndex === index ? 'bg-gray-600' : 'bg-gray-300',
    );
  if (!loaded || onboarded) return null;
  return (
    <div
      className={`deviceHeight absolute inset-0 z-[40] w-full ${
        onboarded ? 'opacity-0' : 'opacity-100'
      } bg-gray-900 transition-all duration-200 ease-out`}
    >
      <Swiper
        className="h-full w-full"
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(x) => setActiveIndex(x.activeIndex)}
      >
        <SwiperSlide className="h-full w-full">
          <OnboardingItem index={0} />
        </SwiperSlide>
        <SwiperSlide className="h-full w-full">
          <OnboardingItem index={1} />
        </SwiperSlide>
      </Swiper>
      <div className="absolute bottom-[20px] z-10 flex w-full flex-col justify-center px-8 pb-8">
        <div className="mb-8 flex w-full flex-row gap-2">
          <div className={sliderIndexCx(0)} />
          <div className={sliderIndexCx(1)} />
        </div>
        <Button onClick={() => setOnboard(true)} variant="ghost">
          SKIP
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
