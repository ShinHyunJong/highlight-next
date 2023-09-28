import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import authAtom from '@/atoms/auth';
import storage from '@/storages';

import { getMeApi, registerGoogleApi } from './api';

export const useAuth = () => {
  const router = useRouter();
  const [pickedSongList, setPickedSongList] = useAtom(
    authAtom.selectedPickSong,
  );
  const [signInLoading, setSignInLoading] = useAtom(authAtom.signInLoading);
  const [registerSongLoading, setRegisterSongLoading] = useAtom(
    authAtom.registerSongLoading,
  );
  const [accessToken, setAccessToken] = useAtom(authAtom.accessToken);

  const { data, isLoading, refetch, error } = useQuery('me', () => getMeApi());

  const postRegisterGoogle = async (email: string, googleId: string) => {
    setSignInLoading(true);
    try {
      const orderInserted = pickedSongList.map((song, index) => {
        return {
          ...song,
          order: index + 1,
        };
      });

      const result = await registerGoogleApi(email, googleId, orderInserted);
      setAccessToken(result.accessToken);
      refetch();
      setPickedSongList([]);
      setSignInLoading(false);
    } catch (error) {
      setSignInLoading(false);
    }
  };

  const logout = async () => {
    router.replace('/');
    storage.tokenStorage.deleteAccessToken();
    refetch();
  };

  return {
    user: data || null,
    isLoading,
    logout,
    refetch,
    postRegisterGoogle,
    signInLoading,
    registerSongLoading,
    error,
  };
};
