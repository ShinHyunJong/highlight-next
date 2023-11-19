import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dots } from 'react-activity';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';

import HighlightItem from '@/components/global/HighlightItem/HighlightItem';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/search';
import HeaderTemplate from '@/templates/HeaderTemplate';

type FormValues = {
  term: string;
};

function SearchPage() {
  const router = useRouter();
  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      term: router.query.term?.toString() || '',
    },
  });
  const term = watch('term');

  const debouncedValue = useDebounce<string>(term, 500);
  const { userList, highlightList, isLoading } = useSearch(debouncedValue);

  const renderResults = () => {
    if (term.length === 0) return null;
    if (isLoading) {
      return (
        <div className="flex justify-center pt-8">
          <Dots />
        </div>
      );
    }
    if (userList.length === 0 && highlightList.length === 0) {
      return (
        <div className="pt-8">
          <p className="text-gray-300">no search results</p>
        </div>
      );
    }
    return (
      <div className="mt-4 space-y-6">
        <div className="space-y-2">
          <p>Account</p>
          <ul className="flex flex-col gap-4">
            {userList.slice(0, 3).map((u) => {
              return (
                <Link href={`/@${u.alias}`} key={`user-${u.id}`}>
                  <li>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10 bg-white">
                        <AvatarImage src={u.profileImgUrl || ''} />
                      </Avatar>
                      <p>{u.name}</p>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="space-y-2">
          <p>Post</p>
          <ul className="mb-4 grid grid-cols-2 gap-x-2 gap-y-4">
            {highlightList.map((h) => {
              const firstImage = h.highlightImage[0];
              return (
                <HighlightItem
                  key={`highlight-${h.id}`}
                  highlight={h}
                  highlightImage={firstImage!}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <HeaderTemplate title="Search">
      <section className="w-full p-4">
        <Controller
          name="term"
          control={control}
          rules={{ required: true, min: 2, max: 50 }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  router.replace(`/search?term=${e.target.value}`);
                }}
                value={field.value}
                type="text"
                placeholder="Search"
              />
            );
          }}
        />
        {renderResults()}
      </section>
    </HeaderTemplate>
  );
}

export default SearchPage;
