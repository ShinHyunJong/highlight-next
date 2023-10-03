import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import authAtom from '@/atoms/auth';

import { getMeApi, getMeFavApi, registerGoogleApi } from './api';

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
  const [user, setUser] = useAtom(authAtom.user);
  const [userFav, setUserFav] = useAtom(authAtom.userFav);
  const [userLoading, setUserLoading] = useAtom(authAtom.userLoading);

  const getUser = async () => {
    try {
      setUserLoading(true);
      const result = await getMeApi();
      const favResult = await getMeFavApi();
      setUser(result);
      setUserFav(favResult);
      setUserLoading(false);
    } catch (error) {
      setUserLoading(false);
    }
  };

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
      setUser(result.user);
      setPickedSongList([]);
      setSignInLoading(false);
      router.replace('/?tab=profile');
    } catch (error) {
      setSignInLoading(false);
    }
  };

  const logout = async () => {
    router.replace('/');
    setAccessToken(null);
    setUser(null);
  };

  return {
    user,
    userFav,
    userLoading,
    logout,
    getUser,
    setUser,
    postRegisterGoogle,
    signInLoading,
    registerSongLoading,
  };
};
