import { api } from '@/requests';
import type { Song } from '@/types/server.type';

export async function searchSongApi(term: string): Promise<Song[]> {
  const { data } = await api.get(`/song/search/apple?term=${term}`);
  return data.songList;
}
