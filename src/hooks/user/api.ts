import { api } from '@/requests';
import type { Highlight, User } from '@/types/server.type';

export async function getUserListApi(): Promise<User[]> {
  const { data } = await api.get(`/user`);
  return data;
}

export async function getUserDetailApi(alias: string): Promise<User> {
  const { data } = await api.get(`/user/profile/${alias}`);
  return data;
}

export async function getUserHighlightApi(alias: string): Promise<Highlight[]> {
  const { data } = await api.get(`/user/highlight/${alias}`);
  return data;
}
