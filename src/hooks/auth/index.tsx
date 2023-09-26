import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import authAtom from '@/atoms/auth';
import storage from '@/storages';

import {
  getMeApi,
  registerApi,
  registerAppleApi,
  registerSongsApi,
} from './api';

export const useAuth = () => {
  const router = useRouter();
  const [pickedSongList, setPickedSongList] = useAtom(
    authAtom.selectedPickSong,
  );

  const { data, isLoading, refetch } = useQuery('me', () => getMeApi());

  const afterLogin = async () => {
    await registerSongsApi(pickedSongList);
    setPickedSongList([]);
    router.replace('/?tab=profile');
    refetch();
  };

  const postRegisterApple = async (code: string, id_token: string) => {
    try {
      const result = await registerAppleApi(code, id_token);
      storage.tokenStorage.setAccessToken(result.accessToken);
      await afterLogin();
    } catch (error) {}
  };

  const postRegisterGoogle = async (email: string, googleId: string) => {
    try {
      const result = await registerApi(email, googleId);
      storage.tokenStorage.setAccessToken(result.accessToken);
      refetch();
    } catch (error) {}
  };

  return {
    data,
    isLoading,
    refetch,
    postRegisterApple,
    postRegisterGoogle,
  };
};
