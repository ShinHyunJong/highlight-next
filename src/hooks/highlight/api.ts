import { api } from '@/requests';
import type { Highlight } from '@/types/server.type';

export async function getHighlightListApi(): Promise<Highlight[]> {
  const { data } = await api.get(`/highlight/list`);
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
