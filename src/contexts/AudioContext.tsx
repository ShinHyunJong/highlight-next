import { useSetAtom } from 'jotai';
import type { ReactNode } from 'react';
import { createContext, useEffect, useRef } from 'react';

import audioAtom from '@/atoms/audio';

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
  const setPlayingAudio = useSetAtom(audioAtom.playingAudio);
  const setAudioBuffering = useSetAtom(audioAtom.audioBuffering);

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

  const handleEnd = () => {
    setPlayingAudio(null);
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
