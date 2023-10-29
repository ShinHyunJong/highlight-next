import MediaSession from '@mebtte/react-media-session';

import type { Highlight, Song } from '@/types/server.type';

type MediaAppProps = {
  playingAudio: Song | null;
  playingHighlight: Highlight | null;
  play: () => void;
  playNext: () => void;
  playPrevious: () => void;
  pause: () => void;
};

function MediaApp({
  playingAudio,
  play,
  pause,
  playNext,
  playPrevious,
  playingHighlight,
}: MediaAppProps) {
  const artwork = playingHighlight?.highlightImage.map((x) => {
    return {
      src: x.url,
      sizes: '512x512',
      type: 'image/jpeg',
    };
  });
  return (
    <MediaSession
      title={playingHighlight?.title || ''}
      artist={playingHighlight?.user?.name || ''}
      album={playingAudio?.albumName}
      artwork={artwork || []}
      onPlay={play}
      onPause={pause}
      // onSeekBackward={onSeekBackward}
      // onSeekForward={onSeekForward}
      onPreviousTrack={playPrevious}
      onNextTrack={playNext}
    />
  );
}

export default MediaApp;
