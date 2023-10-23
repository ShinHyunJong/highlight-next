import { api } from '@/requests';
import type { Song } from '@/types/server.type';

export async function postHighlightApi(body: FormData) {
  const { data } = await api.post('/highlight', body, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return data;
}

export async function updateHighlightApi(
  highlightId: number,
  title: string,
  desc: string,
  category: string,
  songList: Song[],
) {
  const { data } = await api.put(`/highlight/${highlightId}`, {
    id: highlightId,
    title,
    desc,
    songList,
    category,
  });
}

export async function deleteHighlightApi(highlightId: number) {
  await api.delete(`/highlight/${highlightId}`);
}

export async function deleteHighlightSongApi(id: number) {
  await api.delete(`/highlight/song/${id}`);
}
