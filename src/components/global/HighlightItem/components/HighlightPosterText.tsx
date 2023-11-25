import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import LinesEllipsis from 'react-lines-ellipsis';

import { globalAtom } from '@/atoms';
import { useAuth } from '@/hooks/auth';
import { useHighlightLike } from '@/hooks/highlight';
import {
  deleteHighlightLikeApi,
  postHighlightLikeApi,
} from '@/hooks/highlight/api';

type HighlightPosterTextProps = {
  title: string;
  count: number;
};

function HighlightPosterText({ title, count }: HighlightPosterTextProps) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const highlightId = Number(router.query.highlightId);
  const { user } = useAuth();
  const setAfterLoginUrl = useSetAtom(globalAtom.afterLoginUrlAtom);
  const [_count, setCount] = useState(count);

  const { highlightLike, isLoading } = useHighlightLike();

  useEffect(() => {
    if (highlightLike) {
      setLiked(true);
    }
  }, [highlightLike]);

  useEffect(() => {
    setCount(count);
  }, [count]);

  const handleLike = async () => {
    if (!highlightId || isLoading) return;
    if (!user) {
      router.push('/auth?tab=before-pick');
      setAfterLoginUrl(router.asPath);
    } else {
      setLiked(true);
      setCount(_count + 1);
      await postHighlightLikeApi(highlightId);
    }
  };

  const handleDislike = async () => {
    if (!highlightLike || isLoading) return;
    setLiked(false);
    setCount(_count - 1);
    await deleteHighlightLikeApi(highlightLike.id);
  };

  const renderLike = () => {
    return (
      <div className="flex items-center gap-2">
        {liked ? (
          <button onClick={handleDislike} type="button">
            <FaHeart />
          </button>
        ) : (
          <button onClick={handleLike} type="button">
            <FaRegHeart />
          </button>
        )}
        <p>{_count}</p>
      </div>
    );
  };

  return (
    <div className="absolute bottom-0 z-[20] w-full px-4 pb-4 text-lg">
      {renderLike()}
      <div className="text-3xl font-bold">
        <LinesEllipsis
          text={title}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>
    </div>
  );
}

export default HighlightPosterText;
