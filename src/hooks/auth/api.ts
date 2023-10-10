import { api } from '@/requests';
import type { Highlight, Song, User, UserFav } from '@/types/server.type';

export async function getMeApi(): Promise<User> {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function getMeFavApi(): Promise<UserFav[]> {
  const { data } = await api.get('/auth/me/fav');
  return data;
}

export async function getMyHighlightApi(): Promise<Highlight[]> {
  const { data } = await api.get(`/auth/list/me`);
  return data;
}

export async function registerAppleApi(
  code: string,
  id_token: string,
  songList?: Song[],
) {
  const { data } = await api.post('/auth/register/apple', {
    code,
    id_token,
    songList,
  });
  return data;
}

export async function registerGoogleApi(
  email: string,
  googleId: string,
  songList?: Song[],
) {
  const { data } = await api.post('/auth/register/google', {
    email,
    googleId,
    songList,
  });
  return data;
}

export async function registerSongsApi(songList: Song[]) {
  const { data } = await api.post('/auth/register/songs', {
    songList,
  });
  return data;
}

export async function updateProfileApi(name: string, bio?: string) {
  const { data } = await api.put('/auth/me/profile', {
    name,
    bio,
  });
  return data;
}

export async function updateCoverImgApi(body: FormData) {
  const { data } = await api.put('/auth/me/coverImg', body, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return data;
}

export async function updateProfileImgApi(body: FormData) {
  const { data } = await api.put('/auth/me/profileImg', body, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return data;
}

export async function updateFavSong(songList: Song[]) {
  const { data } = await api.put('/auth/me/profile/favSong', {
    songList,
  });
  return data;
}

export async function deleteFavSong(favId: number) {
  const { data } = await api.delete(`/auth/me/profile/favSong/${favId}`);
  return data;
}
