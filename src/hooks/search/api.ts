import { api } from '@/requests';
import type { Highlight, User } from '@/types/server.type';

type SearchRes = {
  userList: User[];
  highlightList: Highlight[];
};

export async function unionSearchApi(query: string): Promise<SearchRes> {
  const { data } = await api.get(`/search?query=${query}`);
  return data;
}
