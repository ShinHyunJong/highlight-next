'use client';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { createContext, useEffect, useRef } from 'react';

import audioAtom from '@/atoms/audio';

const DynamicMedida = dynamic(() => import('../components/global/MediaApp'), {
  ssr: false,
});

type AudioContextType = {
  audio: HTMLAudioElement | null;
  play: () => void;
  pause: () => void;
  changeAudio: (src: string) => void;
};

const AudioContext = createContext<AudioContextType>({
  audio: null,
  play: () => {},
  pause: () => {},
  changeAudio: (src: string) => {},
});

function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingAudio, setPlayingAudio] = useAtom(audioAtom.playingAudio);
  const setAudioBuffering = useSetAtom(audioAtom.audioBuffering);
  const playingAudioList = useAtomValue(audioAtom.playingAudioList);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.3;
  }, []);

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
  };

  const pause = () => {
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
      }
      const nextAudio = playingAudioList[targetAudioIndex + 1];
      if (nextAudio) {
        setPlayingAudio(nextAudio);
        changeAudio(nextAudio?.previewUrl);
      } else {
        setPlayingAudio(null);
      }
    } else {
      setPlayingAudio(null);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        audio: audioRef.current,
        play,
        pause,
        changeAudio,
      }}
    >
      <DynamicMedida
        playingAudio={playingAudio}
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
      {children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioProvider };
