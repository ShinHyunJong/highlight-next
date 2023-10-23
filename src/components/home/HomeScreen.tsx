import Image from 'next/image';

import { useHighlightList } from '@/hooks/highlight';
import whiteLogo from '@/public/assets/images/highlight_white.png';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Highlight } from '@/types/server.type';

import HighlightItem from '../global/HighlightItem/HighlightItem';
import Greeting from '../header/Gretting';

function HomeScreen(props: { highlightList: Highlight[] }) {
  const { highlightList } = useHighlightList(props.highlightList);

  return (
    <HeaderTemplate title="">
      <section className="w-full p-4">
        <Image src={whiteLogo} width={60} height={60} alt="logo" />
        <Greeting textList={['Discover', 'Real Music']} />
        <div className="pt-8 text-gray-500">
          <h1>
            What your favorite{' '}
            <b className="text-gray-200">cafes, brands, friends</b> actually
            listen to!
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
