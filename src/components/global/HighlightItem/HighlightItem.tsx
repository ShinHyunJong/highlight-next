import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaRegHeart } from 'react-icons/fa6';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { imageConfig } from '@/configs/image.config';
import { useAudio } from '@/hooks/audio';
import { useAuth } from '@/hooks/auth';
import { useMyHighlight } from '@/hooks/highlight';
import { useTabParam } from '@/hooks/utils/route.utils';
import type { Highlight, HighlightImage } from '@/types/server.type';

import HighlightText from './components/HighlightText';
import ItemSetting from './ItemSetting';

type HighlightItesmProps = {
  highlightImage: HighlightImage;
  highlight: Highlight;
  isProfile?: boolean;
};

function HighlightItem({
  highlightImage,
  highlight,
  isProfile = false,
}: HighlightItesmProps) {
  const { user } = useAuth();
  const isMine = user?.id === highlight.userId;
  const router = useRouter();
  const { getTabParam } = useTabParam();
  const firstRoute = router.route;
  const { tab } = router.query;
  const { handleDelete } = useMyHighlight();
  const { handlePlay, setPlayingAudioList, setPlayingHighlight } = useAudio();

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
    setPlayingHighlight(highlight);
  };

  return (
    <div className="space-y-4">
      <Link
        href={`/highlight/${highlight.id}${getTabParam()}`}
        onClick={handleHighlight}
        className="space-y-2"
      >
        <div
          key={`my-highlight-${highlight.id}`}
          style={{ aspectRatio: 0.57 }}
          className="relative overflow-hidden rounded-lg"
        >
          <div className="highlightGradient absolute inset-0 z-[10] h-full w-full" />
          {isMine && (
            <ItemSetting
              onClickEdit={handleEdit}
              onClickRemove={handleRemove}
            />
          )}
          <Image
            unoptimized
            fill
            alt={highlightImage.url}
            src={highlightImage.url}
            sizes={imageConfig.sizes}
            className="rounded-lg object-cover"
          />
          <HighlightText title={highlight.title} desc={highlight.desc || ''} />
        </div>
      </Link>
      {!isProfile && (
        <div className="mt-4 flex items-center justify-between">
          <Link href={`/@${highlight.user?.alias}${getTabParam()}`}>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 bg-white">
                <AvatarImage src={highlight?.user?.profileImgUrl || ''} />
              </Avatar>
              <p className="text-gray-300">
                {highlight?.user?.name || `user${highlight.user?.id}`}
              </p>
            </div>
          </Link>
          {highlight?._count?.highlightLike !== undefined &&
            highlight?._count?.highlightLike > 0 && (
              <Link
                href={`/highlight/${highlight.id}${getTabParam()}`}
                onClick={handleHighlight}
              >
                <div className="flex items-center gap-1">
                  <FaRegHeart />
                  <p>{highlight?._count?.highlightLike}</p>
                </div>
              </Link>
            )}
        </div>
      )}
    </div>
  );
}

export default HighlightItem;
