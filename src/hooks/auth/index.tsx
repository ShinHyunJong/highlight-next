import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import authAtom from '@/atoms/auth';
import storage from '@/storages';

import { getMeApi, registerApi, registerSongsApi } from './api';

export const useAuth = () => {
  const router = useRouter();
  const [pickedSongList, setPickedSongList] = useAtom(
    authAtom.selectedPickSong,
  );

  const { data, isLoading, refetch } = useQuery('me', () => getMeApi());

  const postRegister = async (
    email: string,
    appleId?: string,
    googleId?: string,
  ) => {
    try {
      const result = await registerApi(email, appleId, googleId);
      storage.tokenStorage.setAccessToken(result.access_token);
      await registerSongsApi(pickedSongList);
      setPickedSongList([]);
      router.replace('/?tab=profile');
      refetch();
    } catch (error) {}
  };

  return {
    data,
    isLoading,
    refetch,
    postRegister,
  };
};
