import Image from 'next/image';
import { useRouter } from 'next/router';

import { imageConfig } from '@/configs/image.config';
import { useAuth } from '@/hooks/auth';
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

  const handleEdit = () => {
    router.push(`/edit?highlightId=${highlight.id}`);
  };
  const handleRemove = () => {};

  return (
    <div className="space-y-2">
      <div
        key={`my-highlight-${highlight.id}`}
        className="relative aspect-[4/5] overflow-hidden"
      >
        {isMine && (
          <ItemSetting onClickEdit={handleEdit} onClickRemove={handleRemove} />
        )}
        <Image
          fill
          alt={highlightImage.key}
          src={highlightImage.url}
          sizes={imageConfig.sizes}
          className="rounded-md object-cover"
        />
      </div>
      <p>{highlight.title}</p>
    </div>
  );
}

export default HighlightItem;
