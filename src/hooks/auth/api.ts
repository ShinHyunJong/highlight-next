import { api } from '@/requests';
import type { Song } from '@/types/server.type';

export async function getMeApi() {
  const { data } = await api.post('/auth/me');
  return data;
}

export async function registerApi(
  email: string,
  appleId?: string,
  googleId?: string,
) {
  const { data } = await api.post('/auth/register', {
    email,
    appleId,
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
