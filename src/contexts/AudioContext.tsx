'use client';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { createContext, useEffect, useRef } from 'react';

import audioAtom from '@/atoms/audio';
import BottomPlayer from '@/components/bottomPlayer';
import { playerRouteWhiteList } from '@/configs/player.config';

const DynamicMedida = dynamic(() => import('../components/global/MediaApp'), {
  ssr: false,
});

type AudioContextType = {
  audio: HTMLAudioElement | null;
  play: () => void;
  pause: () => void;
  seek: () => void;
  changeAudio: (src: string) => void;
};

const AudioContext = createContext<AudioContextType>({
  audio: null,
  play: () => {},
  pause: () => {},
  seek: () => {},
  changeAudio: (src: string) => {},
});

function AudioProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingAudio, setPlayingAudio] = useAtom(audioAtom.playingAudio);
  const [isPlaying, setIsPlaying] = useAtom(audioAtom.isPlaying);
  const setAudioBuffering = useSetAtom(audioAtom.audioBuffering);

  const playingAudioList = useAtomValue(audioAtom.playingAudioList);
  const playingHighlight = useAtomValue(audioAtom.playingHighlight);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.3;
  }, []);

  const hide = playerRouteWhiteList.includes(router.route);

  // useEffect(() => {
  //   if (!audioRef.current) return;
  //   audioRef.current.addEventListener('progress', () => {
  //     if (!audioRef.current) return;
  //     if (
  //       audioRef.current.buffered.length > 0 &&
  //       audioRef.current.buffered.end(0) <= audioRef.current.duration
  //     ) {
  //       setAudioBuffering(false);
  //     }
  //   });
  // }, [audioRef.current]);

  const play = () => {
    audioRef?.current?.play();
    setIsPlaying(true);
  };

  const seek = () => {
    if (!audioRef?.current) return;
    audioRef.current.currentTime = 0;
  };

  const pause = () => {
    setIsPlaying(false);
    audioRef?.current?.pause();
  };

  const changeAudio = (src: string) => {
    if (!audioRef.current) return;
    audioRef.current.src = src || '';
    play();
  };

  const playNext = () => {
    if (playingAudioList.length > 0) {
      const targetAudioIndex = playingAudioList.findIndex(
        (x) => x.isrc === playingAudio?.isrc,
      );
      const nextAudio = playingAudioList[targetAudioIndex + 1];
      if (nextAudio) {
        setAudioBuffering(true);
        setIsPlaying(true);
        setPlayingAudio(nextAudio);
        changeAudio(nextAudio?.previewUrl);
      }
      return null;
    }
    return null;
  };

  const playPrevious = () => {
    if (playingAudioList.length > 0) {
      const targetAudioIndex = playingAudioList.findIndex(
        (x) => x.isrc === playingAudio?.isrc,
      );
      const nextAudio = playingAudioList[targetAudioIndex - 1];
      if (nextAudio) {
        setAudioBuffering(true);
        setIsPlaying(true);
        setPlayingAudio(nextAudio);
        changeAudio(nextAudio?.previewUrl);
      }
      return null;
    }
    return null;
  };

  const handleEnd = () => {
    if (playingAudioList.length > 0) {
      const targetAudioIndex = playingAudioList.findIndex(
        (x) => x.isrc === playingAudio?.isrc,
      );
      if (targetAudioIndex === -1) {
        setPlayingAudio(null);
        setIsPlaying(false);
      }
      const nextAudio = playingAudioList[targetAudioIndex + 1];
      if (nextAudio) {
        setPlayingAudio(nextAudio);
        changeAudio(nextAudio?.previewUrl);
      } else {
        setPlayingAudio(null);
        setIsPlaying(false);
      }
    } else {
      setPlayingAudio(null);
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        audio: audioRef.current,
        seek,
        play,
        pause,
        changeAudio,
      }}
    >
      <DynamicMedida
        playingAudio={playingAudio}
        playingHighlight={playingHighlight}
        play={play}
        pause={pause}
        playNext={playNext}
        playPrevious={playPrevious}
      />
      <audio
        onCanPlay={() => setAudioBuffering(false)}
        onEnded={handleEnd}
        ref={audioRef}
      />
      {playingAudio && !hide && (
        <BottomPlayer
          handlePlay={play}
          handlePause={pause}
          handleNext={playNext}
          handlePrev={playPrevious}
        />
      )}

      {children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioProvider };
