/* eslint-disable jsx-a11y/label-has-associated-control */

import Image from 'next/image';
import { NextSeo } from 'next-seo';

import AddMusicItem from '@/components/global/AddMusicItem';
import HighlightItem from '@/components/global/HighlightItem/HighlightItem';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAudio } from '@/hooks/audio';
import { useUser, useUserHighlightList } from '@/hooks/user';
import {
  getUserDetailApi,
  getUserHighlightApi,
  getUserListApi,
} from '@/hooks/user/api';
import AppTemplate from '@/templates/AppTemplate';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Highlight, Song, User } from '@/types/server.type';

type UserPageProps = {
  userProfile: User;
  userHighlightList: Highlight[];
};

function UserPage(props: UserPageProps) {
  const { user } = useUser(props.userProfile);
  const { highlightList, isLoading } = useUserHighlightList(
    props.userHighlightList,
  );
  const {
    handlePlay,
    setPlayingAudioList,
    setPlayingHighlight,
    setPlayingProfile,
    playingProfile,
  } = useAudio();

  const title = `Discover Real Music - ${
    props.userProfile?.name || `user.${user.id}`
  }`;
  const description = props.userProfile?.bio || '';
  const url = `https://discoverrealmusic.com/@${props.userProfile?.alias}`;

  const renderHighlight = () => {
    if (isLoading) {
      return (
        <div className="relative aspect-[4/5] overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
      );
    }
    return (
      <>
        {highlightList.map((h) => {
          const firstImage = h.highlightImage[0];
          if (!firstImage) return null;
          return (
            <HighlightItem
              isProfile
              key={`user-highlight-${h.id}`}
              highlight={h}
              highlightImage={firstImage}
            />
          );
        })}
      </>
    );
  };

  const handlePlayFavorite = (s: Song) => {
    handlePlay(s);
    if (!playingProfile || playingProfile?.id !== user?.id) {
      setPlayingProfile(user);
      setPlayingAudioList(user.userFavSong.map((x) => x.song));
    }
    setPlayingHighlight(null);
  };

  return (
    <HeaderTemplate title="" transparent>
      <NextSeo
        title={title}
        description={description}
        canonical={`https://discoverrealmusic.com/highlight/${props.highlightDetail?.id}`}
        openGraph={{
          type: 'website',
          url,
          title,
          description,
          images: [{ url: props.userProfile?.profileImgUrl || '' }],
          siteName: 'Discover Real Music',
        }}
      />
      <section className="flex w-full flex-col">
        <div className="relative w-full">
          <div
            className="relative w-full bg-gray-600"
            style={{ aspectRatio: 0.7 }}
          >
            {user?.coverImgUrl && (
              <Image
                alt="coverImg"
                unoptimized
                priority
                className="object-cover"
                src={user?.coverImgUrl || ''}
                fill
              />
            )}
            <div className="bottomGradient absolute bottom-0 flex h-full w-full flex-col-reverse px-4">
              {user?.bio && (
                <div className="whitespace-pre-line break-keep py-4">
                  <p className="text-sm text-gray-200">{user?.bio}</p>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded-full bg-white">
                    {user?.profileImgUrl && (
                      <Avatar className="bg-white">
                        <AvatarImage src={user?.profileImgUrl || ''} />
                      </Avatar>
                    )}
                  </button>
                  <p className="font-bold text-white">
                    {user?.name ? user?.name : `user ${user?.id}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-4">
                <p>Favorite Top 3</p>
                <div className="space-y-0 border-y border-white px-2 py-3">
                  {user?.userFavSong?.map((x, i) => {
                    return (
                      <AddMusicItem
                        index={i}
                        key={`usefr-fav-${x.id}`}
                        song={x.song}
                        onClick={handlePlayFavorite}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-t-xl bg-gray-900 p-4 pb-8">
          <div className="grid grid-cols-2 gap-4">{renderHighlight()}</div>
        </div>
      </section>
    </HeaderTemplate>
  );
}

export async function getStaticPaths() {
  const userList = await getUserListApi();
  const paths = userList.map((x) => {
    return {
      params: { alias: x.alias.toString() },
    };
  });
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: any) {
  const userProfile = await getUserDetailApi(params.alias);
  const userHighlightList = await getUserHighlightApi(params.alias);
  return {
    props: {
      userProfile,
      userHighlightList,
    },
  };
}

UserPage.Template = AppTemplate;

export default UserPage;
