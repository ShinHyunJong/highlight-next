import { useSetAtom } from 'jotai';
import type { ReactNode } from 'react';
import { createContext, useRef } from 'react';

import audioAtom from '@/atoms/audio';

const AudioContext = createContext({
  audioRef: null,
  play: () => {},
  pause: () => {},
  changeAudio: (src: string) => {},
});

function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const setPlayingAudio = useSetAtom(audioAtom.playingAudio);

  // useEffect(() => {
  //   if (!audioRef.current) return;
  //   audioRef.current.volume = 0.3;
  //   audioRef.current.addEventListener('progress', function () {
  //     // Check if the audio has been buffered completely
  //     if (
  //       audioRef.current.buffered.length > 0 &&
  //       audioRef.current.buffered.end(0) === audioRef.current.duration
  //     ) {
  //       console.log('Audio has been buffered completely.');
  //     }
  //   });
  // }, []);

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
        audioRef: audioRef.current || null,
        play,
        pause,
        changeAudio,
      }}
    >
      <audio onEnded={handleEnd} ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioProvider };
