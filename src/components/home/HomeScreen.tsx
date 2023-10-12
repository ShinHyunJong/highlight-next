import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';

import authAtom from '@/atoms/auth';
import { useHighlightList } from '@/hooks/highlight';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Highlight } from '@/types/server.type';

import HighlightItem from '../global/HighlightItem/HighlightItem';
import Greeting from '../header/Gretting';

function HomeScreen(props: { highlightList: Highlight[] }) {
  const router = useRouter();
  const accessToken = useAtomValue(authAtom.accessToken);
  const { highlightList } = useHighlightList(props.highlightList);

  return (
    <HeaderTemplate title="">
      <section className="w-full p-4">
        <Greeting textList={['Discover', 'New Places', 'with Music']} />
        <div className="pt-8 text-gray-500">
          <h1>
            Get Help from{' '}
            <b className="text-gray-200">brands, cafes, friends</b> and more.!
          </h1>
        </div>
        <div className="my-4 grid grid-cols-2 gap-4">
          {highlightList?.map((h) => {
            const firstImage = h.highlightImage[0];
            if (!firstImage) return null;
            return (
              <HighlightItem
                key={`highlight-${h.id}`}
                highlight={h}
                highlightImage={firstImage}
              />
            );
          })}
        </div>
      </section>
    </HeaderTemplate>
  );
}

export default HomeScreen;
