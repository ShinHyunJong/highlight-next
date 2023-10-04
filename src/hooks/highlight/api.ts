import { api } from '@/requests';
import type { Highlight } from '@/types/server.type';

export async function getHighlightApi(userId: string): Promise<Highlight[]> {
  const { data } = await api.get(`/highlight/list/${userId}`);
  return data;
}
