import MediaSession from '@mebtte/react-media-session';

import type { Song } from '@/types/server.type';

type MediaAppProps = {
  playingAudio: Song | null;
  play: () => void;
  pause: () => void;
};

function MediaApp({ playingAudio, play, pause }: MediaAppProps) {
  return (
    <MediaSession
      title={playingAudio?.title}
      artist={playingAudio?.artistName}
      album={playingAudio?.albumName}
      artwork={[
        {
          src: playingAudio?.thumbUrl || '',
          sizes: '50x50',
          type: 'image/jpg',
        },
      ]}
      onPlay={play}
      onPause={pause}
      // onSeekBackward={onSeekBackward}
      // onSeekForward={onSeekForward}
      // onPreviousTrack={playPreviousMusic}
      // onNextTrack={playNextMusic}
    />
  );
}

export default MediaApp;
