import { useAtom } from 'jotai';
import Image from 'next/image';
import whiteLogo from 'public/assets/images/highlight_white.png';

import { globalAtom } from '@/atoms';
import { useHighlightList } from '@/hooks/highlight';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Highlight } from '@/types/server.type';

import CategorySelector from '../global/CategorySelector';
import HighlightItem from '../global/HighlightItem/HighlightItem';
import Greeting from '../header/Gretting';
import { Skeleton } from '../ui/skeleton';

function HomeScreen(props: { highlightList: Highlight[] }) {
  const { highlightList, isLoading, isRefetching } = useHighlightList(
    props.highlightList,
  );
  const [category, setCategory] = useAtom(globalAtom.selectedCategoryAtom);
  const isAll = !category || category === 'all';
  const renderContent = () => {
    if (!isAll && isRefetching) {
      const list = Array.from({ length: 4 }).map((_, i) => i);
      return list.map((x) => (
        <Skeleton className="aspect-[4/5]" key={`skeleton-${x}`} />
      ));
    }
    return highlightList?.map((h) => {
      const firstImage = h.highlightImage[0];
      if (!firstImage) return null;
      return (
        <HighlightItem
          key={`highlight-${h.id}`}
          highlight={h}
          highlightImage={firstImage}
        />
      );
    });
  };

  return (
    <HeaderTemplate title="">
      <section className="w-full p-4">
        <Image unoptimized src={whiteLogo} width={60} height={60} alt="logo" />
        <Greeting textList={['Discover', 'Real Music']} />
        <div className="pt-8 text-gray-500">
          <h1>
            What your favorite{' '}
            <b className="text-gray-200">cafes, brands, friends</b> actually
            listen to!
          </h1>
        </div>
        <div className="my-4">
          <CategorySelector hasAll value={category} onChange={setCategory} />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">{renderContent()}</div>
      </section>
    </HeaderTemplate>
  );
}

export default HomeScreen;
