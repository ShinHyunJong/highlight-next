import { api } from '@/requests';
import type { Song } from '@/types/server.type';

export async function getMeApi() {
  const { data } = await api.post('/auth/me');
  return data;
}

export async function registerApi(
  email: string,
  googleId?: string,
  code?: string,
  id_token?: string,
) {
  const { data } = await api.post('/auth/register', {
    email,
    googleId,
    code,
    id_token,
  });
  return data;
}

export async function registerSongsApi(songList: Song[]) {
  const { data } = await api.post('/auth/register/songs', {
    songList,
  });
  return data;
}
