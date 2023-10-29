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
  const artwork = playingHighlight?.highlightImage[0];
  if (!artwork) return null;
  return (
    <MediaSession
      title={playingHighlight?.title || ''}
      artist={playingHighlight?.user?.name || ''}
      album={playingAudio?.albumName}
      artwork={[
        {
          src: artwork.url,
          sizes: '96x96,128x128,192x192,256x256,384x384,512x512',
          type: 'image/png',
        },
      ]}
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
