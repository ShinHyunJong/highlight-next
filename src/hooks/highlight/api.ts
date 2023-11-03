import { api } from '@/requests';
import type { Highlight } from '@/types/server.type';

export async function getHighlightListApi(
  category?: string,
): Promise<Highlight[]> {
  const params = category ? `?category=${category}` : ``;
  const { data } = await api.get(`/highlight/list${params}`);
  return data.highlightList;
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
