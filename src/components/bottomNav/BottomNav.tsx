import clsx from 'clsx';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';

import { onboardAtom } from '@/atoms';
import authAtom from '@/atoms/auth';
import { layoutConfig } from '@/configs/layout.config';

const routes = [
  { value: 'discover', text: 'DISCOVER', link: '/', Icon: MdSpaceDashboard },
  { value: 'profile', text: 'PROFILE', link: '/profile', Icon: FaUserAlt },
];

function BottomNav() {
  const accessToken = useAtomValue(authAtom.accessToken);

  const [onboarded, setOnboard] = useAtom(onboardAtom);
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const path = router.asPath;
  const { tabFrom } = router.query;

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleTab = (link: string) => {
    if (link === '/') {
      router.push('/');
    } else if (accessToken) {
      router.push('/profile');
    } else {
      router.push(`/auth?tab=before-pick`);
    }
  };

  if (!loaded) return null;
  return (
    <footer
      style={{ height: layoutConfig.footerHeight }}
      className="footer fixed bottom-0 z-50 mx-auto flex w-full max-w-[412px] bg-gray-900"
    >
      {routes.map((x) => {
        const active = x.link === path || x.value === tabFrom;
        return (
          <div
            key={x.value}
            className="flex flex-1 items-center justify-center"
          >
            <button
              type="button"
              onClick={() => handleTab(x.link)}
              className="flex flex-col items-center justify-center gap-1"
            >
              <x.Icon
                size={20}
                className={!active ? 'text-slate-600' : 'text-slate-200'}
              />
              <p
                className={clsx(
                  'text-xs',
                  !active ? 'text-slate-600' : 'text-slate-200',
                )}
              >
                {x.text}
              </p>
            </button>
          </div>
        );
      })}
    </footer>
  );
}

export default BottomNav;
