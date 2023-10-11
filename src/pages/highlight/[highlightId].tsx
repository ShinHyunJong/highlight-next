import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import AddMusicItem from '@/components/global/AddMusicItem';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useAudio } from '@/hooks/audio';
import {
  getHighlightDetailApi,
  getHighlightListApi,
} from '@/hooks/highlight/api';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Highlight } from '@/types/server.type';

type HighlightDetailProps = {
  highlightDetail: Highlight;
};

function HighlightDetail({ highlightDetail }: HighlightDetailProps) {
  const { handlePlay } = useAudio();
  console.log(highlightDetail);

  return (
    <HeaderTemplate transparent title="">
      <section className="w-full">
        <Swiper className="w-full" spaceBetween={0} slidesPerView={1}>
          {highlightDetail.highlightImage.map((x) => {
            return (
              <SwiperSlide key={`highlight-image-${x.id}`} className="w-full">
                <div className="relative aspect-4/5 w-full">
                  <Image
                    className="object-contain"
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
      <section className="w-full p-4">
        <div className="flex flex-col">
          <h1 className="mb-4 text-2xl font-bold">{highlightDetail.title}</h1>
          <div className="space-y-1">
            {highlightDetail.highlightSong.map((x, i) => {
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
        <div className="py-4">
          <p className="text-gray-300">{highlightDetail?.desc}</p>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="bg-white">
            <AvatarImage src={highlightDetail?.user?.profileImgUrl || ''} />
          </Avatar>
          <p>By {highlightDetail?.user?.name}</p>
          <p>|</p>
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
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const highlightDetail = await getHighlightDetailApi(params.highlightId);
  return {
    props: {
      highlightDetail,
    },
    revalidate: 60,
  };
}

export default HighlightDetail;