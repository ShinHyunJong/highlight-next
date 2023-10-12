import { useAtom } from 'jotai';
import { useContext } from 'react';

import audioAtom from '@/atoms/audio';
import { AudioContext } from '@/contexts/AudioContext';
import type { Song } from '@/types/server.type';

export function useAudio() {
  const [playingAudio, setPlayingAudio] = useAtom(audioAtom.playingAudio);
  const [audioBuffering, setAudioBuffering] = useAtom(audioAtom.audioBuffering);
  const { pause, changeAudio, audio } = useContext(AudioContext);

  const handlePlay = (song: Song) => {
    setAudioBuffering(true);
    if (!song.previewUrl) {
      setAudioBuffering(false);
      window.alert("This song doesn't have a preview.");
    } else {
      setPlayingAudio((prev) => {
        if (prev?.isrc !== song.isrc) {
          changeAudio(song.previewUrl);
          return song;
        }
        pause();
        return null;
      });
    }
  };
  return {
    handlePlay,
    pause,
  };
}
