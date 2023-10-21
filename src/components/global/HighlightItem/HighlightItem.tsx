import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { imageConfig } from '@/configs/image.config';
import { useAudio } from '@/hooks/audio';
import { useAuth } from '@/hooks/auth';
import { useMyHighlight } from '@/hooks/highlight';
import type { Highlight, HighlightImage } from '@/types/server.type';

import ItemSetting from './ItemSetting';

type HighlightItesmProps = {
  highlightImage: HighlightImage;
  highlight: Highlight;
};

function HighlightItem({ highlightImage, highlight }: HighlightItesmProps) {
  const { user } = useAuth();
  const isMine = user?.id === highlight.userId;
  const router = useRouter();
  const { handleDelete } = useMyHighlight();
  const { handlePlay, setPlayingAudioList } = useAudio();

  const handleEdit = () => {
    router.push(`/edit?highlightId=${highlight.id}`);
  };
  const handleRemove = () => {
    if (window.confirm('Are you sure to delete?')) {
      handleDelete(highlight.id);
    }
  };

  const handleHighlight = () => {
    const highlightSong = highlight.highlightSong[0];
    if (!highlightSong) return;
    handlePlay(highlightSong.song!);
    setPlayingAudioList(highlight.highlightSong.map((x) => x.song!));
  };

  return (
    <Link
      href={`/highlight/${highlight.id}`}
      onClick={handleHighlight}
      className="space-y-2"
    >
      <div
        key={`my-highlight-${highlight.id}`}
        className="relative aspect-[4/5] overflow-hidden"
      >
        {isMine && (
          <ItemSetting onClickEdit={handleEdit} onClickRemove={handleRemove} />
        )}
        <div className="h-full w-full animate-pulse rounded-md bg-gray-600" />
        <Image
          unoptimized
          fill
          alt={highlightImage.key}
          src={highlightImage.url}
          sizes={imageConfig.sizes}
          className="rounded-md object-cover"
        />
      </div>
      <p>{highlight.title}</p>
    </Link>
  );
}

export default HighlightItem;
