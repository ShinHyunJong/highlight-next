import { useAtom } from 'jotai';
import { useContext } from 'react';

import audioAtom from '@/atoms/audio';
import { AudioContext } from '@/contexts/AudioContext';
import type { Song } from '@/types/server.type';

export function useAudio() {
  const [playingAudio, setPlayingAudio] = useAtom(audioAtom.playingAudio);
  const [isPlaying, setIsPlaying] = useAtom(audioAtom.isPlaying);
  const [audioBuffering, setAudioBuffering] = useAtom(audioAtom.audioBuffering);
  const { pause, changeAudio, audio, seek, play } = useContext(AudioContext);
  const [playingAudioList, setPlayingAudioList] = useAtom(
    audioAtom.playingAudioList,
  );
  const [playingHighlight, setPlayingHighlight] = useAtom(
    audioAtom.playingHighlight,
  );
  const [playingProfile, setPlayingProfile] = useAtom(audioAtom.playingProfile);

  const handlePlay = (song: Song) => {
    setAudioBuffering(true);
    if (!song.previewUrl) {
      setAudioBuffering(false);
      window.alert("This song doesn't have a preview.");
    } else {
      setPlayingAudio((prev) => {
        if (prev?.isrc !== song.isrc) {
          setIsPlaying(true);
          changeAudio(song.previewUrl);
          return song;
        }
        setIsPlaying(true);
        seek();
        play();
        return prev;
      });
    }
  };

  const resetPlayingAudioList = () => {
    setPlayingAudioList([]);
  };

  return {
    playingAudio,
    isPlaying,
    playingAudioList,
    setPlayingAudioList,
    resetPlayingAudioList,
    handlePlay,
    pause,
    playingHighlight,
    setPlayingHighlight,
    audioBuffering,
    playingProfile,
    setPlayingProfile,
  };
}
