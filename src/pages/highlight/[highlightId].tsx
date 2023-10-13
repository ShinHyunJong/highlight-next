import dayjs from 'dayjs';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import AddMusicItem from '@/components/global/AddMusicItem';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useAudio } from '@/hooks/audio';
import { useHighlightDetail } from '@/hooks/highlight';
import {
  getHighlightDetailApi,
  getHighlightListApi,
} from '@/hooks/highlight/api';
import { foramtName } from '@/hooks/utils/format.utils';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Highlight } from '@/types/server.type';

type HighlightDetailProps = {
  highlightDetail: Highlight;
};

function HighlightDetail(props: HighlightDetailProps) {
  const { handlePlay } = useAudio();
  const { highlightDetail } = useHighlightDetail(props.highlightDetail);

  const title = `Discover Real Music - ${props.highlightDetail?.title}`;
  const description = props.highlightDetail?.desc || '';
  const url = `https://discoverrealmusic.com/highlight/${props.highlightDetail?.id}`;
  const images = props.highlightDetail?.highlightImage.map((x) => {
    return {
      url: x.url,
    };
  });

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
          {highlightDetail?.highlightImage.map((x) => {
            return (
              <SwiperSlide key={`highlight-image-${x.id}`} className="w-full">
                <div className="relative aspect-4/5 w-full">
                  <Image
                    unoptimized
                    className="object-contain"
                    src={x.url}
                    fill
                    priority
                    alt={x.key}
                  />
                  <div className="lightBottomGradient absolute bottom-0 h-full w-full" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <section className="w-full p-4">
        <div className="flex flex-col">
          <h1 className="mb-4 text-2xl font-bold">{highlightDetail?.title}</h1>
          <div className="space-y-1">
            {highlightDetail?.highlightSong.map((x, i) => {
              return (
                <AddMusicItem
                  onClick={handlePlay}
                  index={i}
                  key={`higlight-song-${x.id}`}
                  song={x.song!}
                />
              );
            })}
          </div>
        </div>
        <div className="px-2 py-4">
          <p className="text-gray-300">{highlightDetail?.desc}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Avatar className="bg-white">
            <AvatarImage src={highlightDetail?.user?.profileImgUrl || ''} />
          </Avatar>
          <p>By {foramtName(highlightDetail?.user)}</p>
          <p>|</p>
          <p>{dayjs(highlightDetail?.createdAt).format('DD MMM YYYY')}</p>
        </div>
      </section>
    </HeaderTemplate>
  );
}

export async function getStaticPaths() {
  const highlightList = await getHighlightListApi();
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
