import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import authAtom from '@/atoms/auth';

import {
  getMeApi,
  getMeFavApi,
  registerGoogleApi,
  updateCoverImgApi,
  updateProfileApi,
  updateProfileImgApi,
} from './api';

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
  const [uploadingProfileImg, setUploadingProfileImg] = useAtom(
    authAtom.uploadingProfileImg,
  );
  const [uploadingProfileImgUrl, setUploadingProfileImgUrl] = useAtom(
    authAtom.uploadingProfileImgUrl,
  );
  const [uploadingCoverImg, setUploadingCoverImg] = useAtom(
    authAtom.uploadingCoverImg,
  );
  const [uploadingCoverImgUrl, setUploadingCoverImgUrl] = useAtom(
    authAtom.uploadingCoverImgUrl,
  );
  const [userLoading, setUserLoading] = useAtom(authAtom.userLoading);
  const [profileLoading, setProfileLoading] = useAtom(authAtom.profileLoading);

  const initilizeUploadingAsessts = () => {
    setUploadingProfileImg(null);
    setUploadingProfileImgUrl(null);
    setUploadingCoverImg(null);
    setUploadingCoverImgUrl(null);
  };

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
      router.replace('/profile');
    } catch (error) {
      setSignInLoading(false);
    }
  };

  const updateProfile = async (
    name: string,
    bio: string,
    callback?: () => void,
  ) => {
    try {
      setProfileLoading(true);
      await updateProfileApi(name, bio);
      if (uploadingProfileImg) {
        const formData = new FormData();
        formData.append('file', uploadingProfileImg);
        await updateProfileImgApi(formData);
      }
      if (uploadingCoverImg) {
        const formData = new FormData();
        formData.append('file', uploadingCoverImg);
        await updateCoverImgApi(formData);
      }
      setProfileLoading(false);
      setUploadingProfileImg(null);
      setUploadingCoverImg(null);
      if (callback) callback();
      await getUser();
    } catch (error) {}
  };

  const updateProfileImg = async (file: Blob, callback?: () => void) => {
    try {
      setProfileLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      await updateProfileImgApi(formData);
      setProfileLoading(false);
      if (callback) callback();
      await getUser();
    } catch (error) {}
  };

  const logout = async () => {
    router.replace('/');
    setAccessToken(null);
    setUser(null);
    setUserFav([]);
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
    updateProfileImg,
    profileLoading,
    updateProfile,
    initilizeUploadingAsessts,
  };
};
