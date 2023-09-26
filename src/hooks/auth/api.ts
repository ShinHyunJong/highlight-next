import { api } from '@/requests';
import type { Song } from '@/types/server.type';

export async function getMeApi() {
  const { data } = await api.post('/auth/me');
  return data;
}

export async function registerAppleApi(code: string, id_token: string) {
  const { data } = await api.post('/auth/register/apple', {
    code,
    id_token,
  });
  return data;
}

export async function registerGoogleApi(email: string, googleId: string) {
  const { data } = await api.post('/auth/register/google', {
    email,
    googleId,
  });
  return data;
}

export async function registerSongsApi(songList: Song[]) {
  const { data } = await api.post('/auth/register/songs', {
    songList,
  });
  return data;
}
