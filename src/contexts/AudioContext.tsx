import type { ReactNode } from 'react';
import { createContext, useEffect, useRef } from 'react';

const AudioContext = createContext({
  audioRef: null,
  play: () => {},
  pause: () => {},
  changeAudio: (src: string) => {},
});

function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.3;
  }, []);

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

  return (
    <AudioContext.Provider
      value={{
        audioRef: audioRef.current || null,
        play,
        pause,
        changeAudio,
      }}
    >
      <audio ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioProvider };
