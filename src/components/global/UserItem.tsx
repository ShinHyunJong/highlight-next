import type { User } from '@/types/server.type';

import { Avatar, AvatarImage } from '../ui/avatar';

function UserItem({ user }: { user: User }) {
  return (
    <div className="w-full p-4">
      <div>
        <Avatar>
          <AvatarImage src={user.profileImgUrl || ''} />
        </Avatar>
        <p className="text-white">{user?.name}</p>
      </div>
    </div>
  );
}

export default UserItem;
