import { api } from '@/requests';
import type { Highlight, HighlightLike } from '@/types/server.type';

export async function getHighlightListApi(
  category?: string,
  skip?: number,
  isAll?: boolean,
): Promise<{ totalCount: number; highlightList: Highlight[] }> {
  const params = category ? `&category=${category}` : ``;
  const skipParam = skip ? `&skip=${skip}` : ``;
  const { data } = await api.get(
    `/highlight/list?isAll=${isAll || false}${skipParam}${params}`,
  );
  return data;
}

export async function getHighlightApi(userId: string): Promise<Highlight[]> {
  const { data } = await api.get(`/highlight/list/${userId}`);
  return data;
}

export async function getHighlightDetailApi(
  highlightId: number,
): Promise<Highlight> {
  const { data } = await api.get(`/highlight/detail/${highlightId}`);
  return data;
}

export async function getRelatedHighlightApi(
  highlightId: number,
): Promise<Highlight[]> {
  const { data } = await api.get(`/highlight/related/${highlightId}`);
  return data;
}

export async function getHighlightLikeApi(
  highlightId: number,
): Promise<HighlightLike> {
  const { data } = await api.get(`/highlight/like/${highlightId}`);
  return data.highlightLike;
}

export async function postHighlightLikeApi(
  highlightId: number,
): Promise<string> {
  const { data } = await api.post(`/highlight/like`, { highlightId });
  return data;
}

export async function deleteHighlightLikeApi(likeId: number): Promise<string> {
  const { data } = await api.delete(`/highlight/dislike/${likeId}`);
  return data;
}
