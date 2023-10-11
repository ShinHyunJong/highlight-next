/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { SlSettings } from 'react-icons/sl';

import { useAudio } from '@/hooks/audio';
import { useAuth } from '@/hooks/auth';
import { useMyHighlight } from '@/hooks/highlight';
import { useUpload } from '@/hooks/upload';
import AppTemplate from '@/templates/AppTemplate';
import HeaderTemplate from '@/templates/HeaderTemplate';

import AddMusicItem from '../global/AddMusicItem';
import HighlightItem from '../global/HighlightItem/HighlightItem';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

function ProfileScreen() {
  const router = useRouter();
  const { processFileList, initialize } = useUpload();
  const { user, userFav, initilizeUploadingAsessts } = useAuth();
  const { myHighlightList, isLoading } = useMyHighlight();
  const { handlePlay } = useAudio();
  const handleFile = async (e: any) => {
    try {
      const { files } = e.target;
      router.push('/post');
      await processFileList(files);
    } catch (error) {}
  };

  useEffect(() => {
    initialize();
    initilizeUploadingAsessts();
  }, []);

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
        {myHighlightList.map((h) => {
          const firstImage = h.highlightImage[0];
          if (!firstImage) return null;
          return (
            <HighlightItem
              key={`my-highlight-${h.id}`}
              highlight={h}
              highlightImage={firstImage}
            />
          );
        })}
      </>
    );
  };

  // useEffect(() => {
  //   if (!error) return;
  //   if (isAxiosError(error)) {
  //     const { response } = error;
  //     if (response?.status === 401) {
  //       router.push('/?tab=home');
  //     }
  //   }
  // }, [error]);

  return (
    <HeaderTemplate
      title=""
      transparent
      rightNode={
        <div>
          <button
            onClick={() => router.push('/profile?tab=settings')}
            type="button"
            className="clearButton"
          >
            <SlSettings />
          </button>
        </div>
      }
    >
      <section className="flex h-full w-full flex-col">
        <div className="relative w-full">
          <div className="relative aspect-4/5 w-full bg-gray-600">
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
          </div>
          <div className="bottomGradient absolute bottom-0 flex h-full w-full flex-col-reverse px-4 pb-8">
            {user?.bio && (
              <div className="whitespace-pre-line break-keep py-4">
                <p className="text-sm text-gray-200">{user?.bio}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
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
              <Button
                onClick={() => router.push('/auth/edit')}
                size="sm"
                variant="outline"
              >
                Edit
              </Button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4">
              <p>Favorite Top 3</p>
              <div className="space-y-0 border-y border-white px-2 py-3">
                {userFav?.map((x, i) => {
                  return (
                    <AddMusicItem
                      index={i}
                      key={`usefr-fav-${x.id}`}
                      song={x.song}
                      onClick={handlePlay}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute top-[95%] w-full rounded-t-xl bg-gray-900 p-4 pb-8">
            <div className="grid grid-cols-2 gap-4">
              {renderHighlight()}
              <label
                className="relative flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200"
                htmlFor="upload"
              >
                <FaPlus />
              </label>
              <input
                onChange={handleFile}
                multiple
                accept="image/*"
                type="file"
                id="upload"
                className="hidden"
              />
            </div>
          </div>
        </div>
      </section>
    </HeaderTemplate>
  );
}

ProfileScreen.Template = AppTemplate;

export default ProfileScreen;
