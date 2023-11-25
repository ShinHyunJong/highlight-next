import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';

import { globalAtom } from '@/atoms';
import authAtom from '@/atoms/auth';
import uploadAtom from '@/atoms/upload';
import { useToast } from '@/components/ui/use-toast';

import {
  deleteFavSong,
  getMeApi,
  getMeFavApi,
  registerGoogleApi,
  signInApi,
  updateCoverImgApi,
  updateFavSong,
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
  const [deleteingSongList, setDeleteingSongList] = useAtom(
    uploadAtom.deletingSongList,
  );
  const afterLoginUrl = useAtomValue(globalAtom.afterLoginUrlAtom);
  const { toast } = useToast();

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
      setUser({
        ...result,
        name: result.name || `user${result.id}`,
      });
      const favResult = await getMeFavApi();
      setUserFav(favResult);
      setUserLoading(false);
    } catch (error) {
      setUserLoading(false);
    }
  };

  const postSignInEmail = async (email: string, password: string) => {
    setSignInLoading(true);
    try {
      const result = await signInApi(email, password);
      setAccessToken(result);
      getUser();
      setSignInLoading(false);
      router.replace('/profile');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Account does not exsit!.',
      });
      setSignInLoading(false);
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
      getUser();
      // setUser(result.user);
      setPickedSongList([]);
      setSignInLoading(false);
      if (afterLoginUrl) {
        router.replace(afterLoginUrl);
      } else {
        router.replace('/profile');
      }
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
      const orderedSongList = pickedSongList.map((x, i) => {
        return {
          ...x,
          order: i + 1,
        };
      });
      await updateFavSong(orderedSongList);
      const filteredDeleteingSongList = deleteingSongList.filter((x) => x.id);
      await Promise.all(
        filteredDeleteingSongList.map(async (x) => {
          await deleteFavSong(x.id!);
        }),
      );

      setUploadingProfileImg(null);
      setUploadingCoverImg(null);

      if (callback) callback();
      await getUser();
      setProfileLoading(false);
    } catch (error) {
      setProfileLoading(false);
    }
  };

  const updateProfileImg = async (file: Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await updateProfileImgApi(formData);
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
    postSignInEmail,
  };
};
