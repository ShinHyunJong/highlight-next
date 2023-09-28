import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import authAtom from '@/atoms/auth';
import storage from '@/storages';

import {
  getMeApi,
  registerAppleApi,
  registerGoogleApi,
  registerSongsApi,
} from './api';

export const useToken = () => {
  const [accessToken, setAccessToken] = useAtom(authAtom.accessToken);
  const [hasLogout, setHasLogout] = useAtom(authAtom.hasLogout);

  const getHasLogout = async () => {
    const result = await storage.tokenStorage.getHasLogout();
    setHasLogout(result);
  };

  const getToken = async () => {
    const result = await storage.tokenStorage.getAccessToken();
    setAccessToken(result);
    getHasLogout();
  };

  const deleteToken = async () => {
    await storage.tokenStorage.deleteAccessToken();
    setAccessToken(null);
  };

  return {
    getToken,
    hasLogout,
    accessToken,
    deleteToken,
    getHasLogout,
  };
};

export const useAuth = () => {
  const router = useRouter();
  const [pickedSongList, setPickedSongList] = useAtom(
    authAtom.selectedPickSong,
  );
  const [signInLoading, setSignInLoading] = useAtom(authAtom.signInLoading);
  const [registerSongLoading, setRegisterSongLoading] = useAtom(
    authAtom.registerSongLoading,
  );
  const { deleteToken } = useToken();
  const { data, isLoading, refetch, error } = useQuery('me', () => getMeApi(), {
    retry: false,
  });

  const postRegisterSong = async () => {
    if (pickedSongList.length === 0) return;
    setRegisterSongLoading(true);
    const orderInserted = pickedSongList.map((song, index) => {
      return {
        ...song,
        order: index + 1,
      };
    });
    try {
      await registerSongsApi(orderInserted);
      setPickedSongList([]);
      setRegisterSongLoading(false);
    } catch (error) {
      setPickedSongList([]);
      setRegisterSongLoading(false);
    }
  };

  const afterLogin = async () => {
    router.replace('/?tab=profile');
    refetch();
    setSignInLoading(false);
  };

  const postRegisterApple = async (
    code: string,
    id_token: string,
    callback: () => void,
  ) => {
    setSignInLoading(true);
    try {
      const result = await registerAppleApi(code, id_token);
      await storage.tokenStorage.setAccessToken(result.accessToken);
      callback();
      await afterLogin();
    } catch (error) {}
  };

  const postRegisterGoogle = async (
    email: string,
    googleId: string,
    callback: () => void,
  ) => {
    setSignInLoading(true);
    try {
      const result = await registerGoogleApi(email, googleId);
      await storage.tokenStorage.setAccessToken(result.accessToken);
      callback();
      await afterLogin();
    } catch (error) {}
  };

  const logout = async () => {
    router.replace('/');
    await deleteToken();
    await storage.tokenStorage.setHasLogout(true);
    refetch();
  };

  return {
    user: data || null,
    isLoading,
    logout,
    refetch,
    postRegisterApple,
    postRegisterGoogle,
    signInLoading,
    postRegisterSong,
    registerSongLoading,
    error,
  };
};
