import clsx from 'clsx';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const { playingAudio, playingHighlight, audioBuffering } = useAudio();
  const [isPlaying, setIsPlaying] = useAtom(audioAtom.isPlaying);
  const router = useRouter();
  const playStatus = useMemo(() => {
    let hasNext = false;
    let hasPrev = false;
    const currentPlaying = playingHighlight?.highlightSong.find(
      (x) => x.song?.isrc === playingAudio?.isrc,
    );
    const currentOrder = currentPlaying?.order || 0;
    if (currentOrder === undefined) {
      hasNext = false;
      hasPrev = false;
    }

    const higherSongIndex = playingHighlight?.highlightSong?.findIndex(
      (x) => x.order > currentOrder,
    );

    const lowerSongList = playingHighlight?.highlightSong?.filter(
      (x) => x.order < currentOrder,
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

  const PlayerDiv = playingHighlight ? Link : Wrapper;

  return (
    <PlayerDiv
      href={playingHighlight ? `/highlight/${playingHighlight.id}` : ''}
      className="fixed z-30 flex w-full justify-center bg-transparent"
      style={{
        height: `${layoutConfig.bottomPlayerHeight}px`,
        bottom: `${layoutConfig.footerHeight}px`,
      }}
    >
      <div
        style={{ background: 'rgba(57, 57, 57, 0.74)' }}
        className="flex h-full w-full max-w-[600px] items-center justify-between rounded-lg px-4 backdrop-blur-lg"
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
