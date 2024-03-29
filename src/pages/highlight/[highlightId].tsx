import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import AddMusicItem from '@/components/global/AddMusicItem';
import HighlightPosterText from '@/components/global/HighlightItem/components/HighlightPosterText';
import HighlightItem from '@/components/global/HighlightItem/HighlightItem';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAudio } from '@/hooks/audio';
import { useHighlightDetail, useRelatedHighlight } from '@/hooks/highlight';
import {
  getHighlightDetailApi,
  getHighlightListApi,
} from '@/hooks/highlight/api';
import { foramtName } from '@/hooks/utils/format.utils';
import { useTabParam } from '@/hooks/utils/route.utils';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Highlight, Song } from '@/types/server.type';
import { getImageData } from '@/utils/image.util';

type HighlightDetailProps = {
  highlightDetail: Highlight;
};

function HighlightDetail(props: HighlightDetailProps) {
  const {
    handlePlay,
    setPlayingHighlight,
    setPlayingAudioList,
    playingHighlight,
  } = useAudio();
  const { getTabParam } = useTabParam();
  const { highlightDetail } = useHighlightDetail(props.highlightDetail);
  const { relatedHighlightList, isLoading } = useRelatedHighlight();
  const title = `Discover Real Music - ${props.highlightDetail?.title}`;
  const description = props.highlightDetail?.desc || '';
  const url = `https://discoverrealmusic.com/highlight/${props.highlightDetail?.id}`;
  const images = props.highlightDetail?.highlightImage.map((x) => {
    return {
      url: x.url,
    };
  });
  const [imageRatio, setImageRatio] = useState(0.8);
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    props.highlightDetail?.highlightImage[0]?.url || '',
  );

  const getFirstImageRatio = async (url: string) => {
    const { ratio } = await getImageData(url);
    setImageRatio(ratio);
  };

  useEffect(() => {
    if (!props.highlightDetail) return;
    const firstImage = props.highlightDetail.highlightImage[0];
    if (!firstImage) return;
    setMainImageUrl(firstImage.url);
    getFirstImageRatio(firstImage.url);
  }, [props.highlightDetail]);

  const renderRelated = () => {
    if (isLoading) {
      const list = Array.from({ length: 4 }).map((_, i) => i);
      return list.map((x) => (
        <Skeleton className="aspect-[4/5]" key={`skeleton-${x}`} />
      ));
    }
    return relatedHighlightList.map((x) => {
      const firstImage = x.highlightImage[0];
      if (!firstImage) return null;
      return (
        <HighlightItem
          key={`related-highlight-${x.id}`}
          highlight={x}
          highlightImage={firstImage}
        />
      );
    });
  };

  const onPlay = (s: Song) => {
    if (!highlightDetail) return;
    handlePlay(s);
    if (!playingHighlight) {
      setPlayingAudioList(
        highlightDetail?.highlightSong.map((x) => x.song!) || [],
      );
      setPlayingHighlight(highlightDetail);
    }
  };

  return (
    <HeaderTemplate transparent title="">
      <NextSeo
        title={title}
        description={description}
        canonical={`https://discoverrealmusic.com/highlight/${props.highlightDetail?.id}`}
        openGraph={{
          type: 'website',
          url,
          title,
          description,
          images,
          siteName: 'Discover Real Music',
        }}
      />
      <section className="w-full">
        <Swiper
          modules={[Pagination]}
          className="w-full"
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
        >
          <SwiperSlide className="w-full">
            <div
              className="relative w-full"
              style={{ aspectRatio: imageRatio }}
            >
              <div className="highlightGradient absolute inset-0 z-[10] h-full w-full" />
              <Image
                unoptimized
                className="object-cover"
                src={mainImageUrl || ''}
                fill
                priority
                alt="mainImage"
              />

              <HighlightPosterText
                title={highlightDetail?.title || ''}
                count={highlightDetail?._count?.highlightLike!}
              />
            </div>
          </SwiperSlide>
          {highlightDetail?.highlightImage.slice(1).map((x) => {
            return (
              <SwiperSlide key={`highlight-image-${x.id}`} className="w-full">
                <div
                  style={{ aspectRatio: imageRatio }}
                  className="relative w-full"
                >
                  <Image
                    unoptimized
                    className="object-cover"
                    src={x.url}
                    fill
                    priority
                    alt={x.key}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <section className="flex flex-col px-4 pt-8">
        <Link href={`/@${highlightDetail?.user?.alias}${getTabParam()}`}>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Avatar className="bg-white">
              <AvatarImage src={highlightDetail?.user?.profileImgUrl || ''} />
            </Avatar>
            <p>By {foramtName(highlightDetail?.user)}</p>
            <p>|</p>
            <p>{dayjs(highlightDetail?.createdAt).format('DD MMM YYYY')}</p>
          </div>
        </Link>

        <div className="px-2 py-4">
          <p className="text-gray-300">{highlightDetail?.desc}</p>
        </div>
      </section>
      <section className="w-full p-4">
        <div className="flex flex-col">
          <p className="mb-4 text-lg font-bold">Related Songs</p>
          <div className="space-y-1">
            {highlightDetail?.highlightSong.map((x, i) => {
              return (
                <AddMusicItem
                  onClick={onPlay}
                  index={i}
                  key={`higlight-song-${x.id}`}
                  song={x.song!}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section className="w-full p-4">
        <div className="flex flex-col">
          <p className="mb-4 text-lg font-bold">Similar Vibe</p>
          <div className="mb-4 grid grid-cols-2 gap-x-2 gap-y-4">
            {renderRelated()}
          </div>
        </div>
      </section>
    </HeaderTemplate>
  );
}

export async function getStaticPaths() {
  const { highlightList } = await getHighlightListApi(undefined, 0, true);
  const paths = highlightList.map((x) => {
    return {
      params: { highlightId: x.id.toString() },
    };
  });
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: any) {
  const highlightDetail = await getHighlightDetailApi(params.highlightId);
  return {
    props: {
      highlightDetail,
    },
  };
}

export default HighlightDetail;
