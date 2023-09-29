import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

import authAtom from '@/atoms/auth';
import { useAuth } from '@/hooks/auth';
import HeaderTemplate from '@/templates/HeaderTemplate';

import Greeting from '../header/Gretting';

function HomeScreen() {
  const router = useRouter();
  const accessToken = useAtomValue(authAtom.accessToken);
  const { getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  const handleLogin = () => {
    if (accessToken) {
      router.push('/?tab=profile');
    } else {
      router.push(`/?tab=before-pick`);
    }
  };
  return (
    <HeaderTemplate title="">
      <section className="h-full w-full p-4">
        <Greeting textList={['Discover', 'New Places', 'with Music']} />
        <div className="pt-8 text-gray-500">
          Get Help from <b className="text-gray-200">brands, cafes, friends</b>{' '}
          and more.!
        </div>
        <div className="pt-8">
          <button
            onClick={handleLogin}
            type="button"
            className="rounded-full bg-white p-1"
          >
            <FaUser color="#000000" />
          </button>
        </div>
      </section>
    </HeaderTemplate>
  );
}

export default HomeScreen;
