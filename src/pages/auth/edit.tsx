'use client';

import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import authAtom from '@/atoms/auth';
import EditCoverImgModal from '@/components/auth/EditCoverImgModal';
import EditProfileImgModal from '@/components/auth/EditProfileImgModal';
import AddMusicButton from '@/components/global/AddMusicButton';
import AddMusicModal from '@/components/global/AddMusicModal';
import SongController from '@/components/post/components/SongController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/auth';
import HeaderTemplate from '@/templates/HeaderTemplate';

type FormValues = {
  name: string;
  bio: string;
};

function AuthEdit({}) {
  const { user, userFav, profileLoading, updateProfile } = useAuth();
  const [song, setSong] = useAtom(authAtom.selectedPickSong);
  const coverImgUrl = useAtomValue(authAtom.uploadingCoverImgUrl);
  const router = useRouter();

  const { getValues, control, setValue } = useForm<FormValues>({
    defaultValues: {
      name: '',
      bio: '',
    },
  });

  const handleDone = async () => {
    await updateProfile(getValues().name, getValues().bio, () =>
      router.replace('/profile'),
    );
  };

  useEffect(() => {
    if (!user) return;
    setSong(
      userFav.map((x) => {
        return {
          ...x.song,
          id: x.id,
        };
      }),
    );
  }, [userFav]);

  useEffect(() => {
    if (!user) return;
    setValue('name', user?.name || '');
    setValue('bio', user?.bio || '');
  }, [user]);

  return (
    <HeaderTemplate
      title="Edit Profile"
      rightNode={
        <Button
          isDisabled={song.length < 3}
          isLoading={profileLoading}
          onClick={handleDone}
          variant="ghost"
        >
          DONE
        </Button>
      }
    >
      <AddMusicModal />
      <section className="w-full pb-8">
        <div className="relative aspect-4/5 w-full bg-gray-600">
          {(coverImgUrl || user?.coverImgUrl) && (
            <div className="absolute inset-0 z-10">
              <Image
                unoptimized
                alt="coverImg"
                src={coverImgUrl || user?.coverImgUrl || ''}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="bottomGradient absolute bottom-0 z-20 flex h-full w-full flex-col-reverse px-4 pb-8">
            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <EditCoverImgModal />
                <p className="text-sm">Change Cover</p>
              </div>
              <div className="flex flex-1 items-start gap-4">
                <div className="flex">
                  <EditProfileImgModal />
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <div className="space-y-2">
                    <p className="text-sm">Username</p>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Input
                            placeholder="username"
                            className="w-full"
                            {...field}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">Bio</p>
                    <Controller
                      name="bio"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Textarea
                            placeholder="Bio"
                            className="w-full"
                            {...field}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-t-xl bg-gray-900 p-4">
          <p className="mb-4">Top 3 Songs</p>
          <SongController />
          {song.length < 3 && <AddMusicButton />}
        </div>
        <div />
      </section>
    </HeaderTemplate>
  );
}

export default AuthEdit;
