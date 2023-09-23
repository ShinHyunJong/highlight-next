import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';

import { onboardAtom } from '@/atoms';
import { layoutConfig } from '@/configs/layout.config';

const routes = [
  { value: 'home', text: 'HIGHLIGHT', link: '/', Icon: MdSpaceDashboard },
  { value: 'profile', text: 'PROFILE', link: '/profile', Icon: FaUserAlt },
];

function BottomNav() {
  const [onboarded, setOnboard] = useAtom(onboardAtom);
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const { tab } = router.query;

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded || !onboarded) return null;
  return (
    <footer
      style={{ height: layoutConfig.footerHeight }}
      className="footer absolute bottom-0 z-10 flex w-full"
    >
      {routes.map((x) => {
        const active =
          x.value === 'home' ? !tab || tab === x.value : tab === x.value;
        return (
          <div
            key={x.value}
            className="flex flex-1 items-center justify-center"
          >
            <button
              type="button"
              onClick={() =>
                router.push(`?tab=${x.value}`, undefined, { shallow: true })
              }
              className="flex flex-col items-center justify-center gap-1"
            >
              <x.Icon
                size={20}
                className={!active ? 'text-slate-600' : 'text-slate-200'}
              />
              <p
                className={clsx(
                  'text-sm',
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
