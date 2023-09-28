import { api } from '@/requests';
import type { Song, User } from '@/types/server.type';

export async function getMeApi(): Promise<User> {
  const { data } = await api.get('/auth/me');
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
