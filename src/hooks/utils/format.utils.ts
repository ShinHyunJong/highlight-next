import type { User } from '@/types/server.type';

export function foramtName(user: User | undefined | null) {
  return user?.name ? user?.name : `user${user?.id}`;
}
