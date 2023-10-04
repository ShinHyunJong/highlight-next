import Image from 'next/image';

import { imageConfig } from '@/configs/image.config';
import type { Highlight, HighlightImage } from '@/types/server.type';

type HighlightItesmProps = {
  highlightImage: HighlightImage;
  highlight: Highlight;
};

function HighlightItem({ highlightImage, highlight }: HighlightItesmProps) {
  return (
    <div className="space-y-2">
      <div
        key={`my-highlight-${highlight.id}`}
        className="relative aspect-[4/5] overflow-hidden"
      >
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
