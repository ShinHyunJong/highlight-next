import clsx from 'clsx';
import { useAtom } from 'jotai';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Spinner } from 'react-activity';
import {
  FaBackwardStep,
  FaForwardStep,
  FaPause,
  FaPlay,
} from 'react-icons/fa6';

import audioAtom from '@/atoms/audio';
import { layoutConfig } from '@/configs/layout.config';
import { useAudio } from '@/hooks/audio';
import { useTabParam } from '@/hooks/utils/route.utils';

const Wrapper = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className: string;
  style: React.CSSProperties;
}) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

type BottomPlayerProps = {
  handlePlay: () => void;
  handlePause: () => void;
  handleNext: () => void;
  handlePrev: () => void;
};

function BottomPlayer({
  handlePlay,
  handlePause,
  handleNext,
  handlePrev,
}: BottomPlayerProps) {
  const {
    playingAudio,
    playingHighlight,
    audioBuffering,
    playingProfile,
    playingAudioList,
  } = useAudio();
  const [isPlaying, setIsPlaying] = useAtom(audioAtom.isPlaying);
  const { getTabParam } = useTabParam();
  const playStatus = useMemo(() => {
    let hasNext = false;
    let hasPrev = false;

    const currentPlayingIndex = playingAudioList.findIndex(
      (x) => x.isrc === playingAudio?.isrc,
    );

    if (currentPlayingIndex === -1) {
      hasNext = false;
      hasPrev = false;
    }

    const higherSongIndex = playingAudioList?.findIndex(
      (x, i) => i > currentPlayingIndex,
    );

    const lowerSongList = playingAudioList?.filter(
      (x, i) => i < currentPlayingIndex,
    );

    if (higherSongIndex === undefined) {
      hasNext = false;
    }
    if (higherSongIndex && higherSongIndex > -1) {
      hasNext = true;
    }

    if (lowerSongList && lowerSongList?.length > 0) {
      hasPrev = true;
    }
    return {
      hasPrev,
      hasNext,
    };
  }, [playingHighlight, playingAudio]);

  const { hasNext, hasPrev } = playStatus;

  const renderPlay = () => {
    if (audioBuffering) {
      return <Spinner />;
    }
    if (isPlaying) {
      return (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handlePause();
          }}
        >
          <FaPause size={24} />
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handlePlay();
        }}
      >
        <FaPlay size={24} />
      </button>
    );
  };

  const PlayerDiv = playingHighlight || playingProfile ? Link : Wrapper;
  const getHref = () => {
    if (playingHighlight) {
      return `/highlight/${playingHighlight.id}${getTabParam()}`;
    }
    if (playingAudio) {
      return `/@${playingProfile?.alias}${getTabParam()}`;
    }
    return '';
  };

  return (
    <PlayerDiv
      href={getHref()}
      className="fixed z-30 flex w-full justify-center bg-transparent"
      style={{
        height: `${layoutConfig.bottomPlayerHeight}px`,
        bottom: `${layoutConfig.footerHeight}px`,
      }}
    >
      <div
        style={{ background: 'rgba(57, 57, 57, 0.74)' }}
        className="flex h-full w-full max-w-[412px] items-center justify-between rounded-lg px-4 backdrop-blur-lg"
      >
        <div className="flex items-center gap-2">
          <img
            alt="playerThumb"
            className="h-[30px] w-[30px] rounded-md shadow-md"
            src={playingAudio?.thumbUrl}
          />
          <p>{playingAudio?.title}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={clsx(hasPrev ? 'opacity-100' : 'opacity-20')}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
          >
            <FaBackwardStep size={24} />
          </button>
          {renderPlay()}
          <button
            className={clsx(hasNext ? 'opacity-100' : 'opacity-20')}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <FaForwardStep size={24} />
          </button>
        </div>
      </div>
    </PlayerDiv>
  );
}

export default BottomPlayer;
