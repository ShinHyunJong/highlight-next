import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import whiteLogo from 'public/assets/images/highlight_white.png';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

import { globalAtom } from '@/atoms';
import { useHighlightList } from '@/hooks/highlight';
import HeaderTemplate from '@/templates/HeaderTemplate';
import type { Highlight } from '@/types/server.type';

import CategorySelector from '../global/CategorySelector';
import HighlightItem from '../global/HighlightItem/HighlightItem';
import Greeting from '../header/Gretting';
import { Skeleton } from '../ui/skeleton';

type FormValues = {
  term: string;
};

function HomeScreen(props: { highlightList: Highlight[]; totalCount: number }) {
  const {
    highlightList,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useHighlightList(props.highlightList, props.totalCount);
  const [category, setCategory] = useAtom(globalAtom.selectedCategoryAtom);
  const isAll = !category || category === 'all';

  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      term: '',
    },
  });

  const renderContent = () => {
    if (!isAll && isRefetching) {
      const list = Array.from({ length: 4 }).map((_, i) => i);
      return list.map((x) => (
        <Skeleton style={{ aspectRatio: 0.57 }} key={`skeleton-${x}`} />
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

  const renderNextLoading = () => {
    if (isFetchingNextPage) {
      const list = Array.from({ length: 2 }).map((_, i) => i);
      return list.map((x) => (
        <Skeleton style={{ aspectRatio: 0.57 }} key={`skeleton-${x}`} />
      ));
    }
    return null;
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useBottomScrollListener(handleNextPage);

  return (
    <HeaderTemplate transparent title="">
      <section className="w-full p-4">
        <div className="flex flex-row items-center gap-4">
          <Image
            unoptimized
            src={whiteLogo}
            width={60}
            height={60}
            alt="logo"
          />
          <Link
            href="/search"
            className="w-full flex-1 rounded-lg bg-gray-700 px-4 py-3 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <FaSearch />
              <p>Search Songs...</p>
            </div>
          </Link>
        </div>
        <Greeting textList={['Discover', 'Real Music']} />
        <div className="pt-8 text-gray-400">
          <h1>
            What your favorite{' '}
            <b className="text-gray-200">cafes, brands, friends</b> actually
            listen to!
          </h1>
        </div>
        <div className="sticky top-0 z-50 bg-gray-900 py-4">
          <CategorySelector hasAll value={category} onChange={setCategory} />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-x-2 gap-y-4">
          {renderContent()}
          {renderNextLoading()}
        </div>
      </section>
    </HeaderTemplate>
  );
}

export default HomeScreen;
