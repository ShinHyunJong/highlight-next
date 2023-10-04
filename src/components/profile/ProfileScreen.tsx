import { useRouter } from 'next/router';
import { FaPlus, FaUser } from 'react-icons/fa';
import { SlSettings } from 'react-icons/sl';

import { useAuth } from '@/hooks/auth';
import { useMyHighlight } from '@/hooks/highlight';
import { useUpload } from '@/hooks/upload';
import AppTemplate from '@/templates/AppTemplate';
import HeaderTemplate from '@/templates/HeaderTemplate';

import AddMusicItem from '../global/AddMusicItem';
import HighlightItem from '../global/HighlightItem';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

function ProfileScreen() {
  const router = useRouter();
  const { processFileList, processing } = useUpload();
  const { user, userFav } = useAuth();
  const { myHighlightList, isLoading } = useMyHighlight();
  const handleFile = async (e: any) => {
    try {
      const { files } = e.target;
      router.push('/post');
      await processFileList(files);
    } catch (error) {}
  };

  const renderHighlight = () => {
    if (isLoading) {
      return (
        <div className="relative aspect-[4/5] overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
      );
    }
    return (
      <>
        {myHighlightList.map((h) => {
          const firstImage = h.highlightImage[0];
          if (!firstImage) return null;
          return (
            <HighlightItem
              key={`my-highlight-${h.id}`}
              highlight={h}
              highlightImage={firstImage}
            />
          );
        })}
      </>
    );
  };

  // useEffect(() => {
  //   if (!error) return;
  //   if (isAxiosError(error)) {
  //     const { response } = error;
  //     if (response?.status === 401) {
  //       router.push('/?tab=home');
  //     }
  //   }
  // }, [error]);

  return (
    <HeaderTemplate
      title=""
      transparent
      rightNode={
        <div>
          <button
            onClick={() => router.push('/?tab=settings')}
            type="button"
            className="clearButton"
          >
            <SlSettings />
          </button>
        </div>
      }
    >
      <section className="flex h-full w-full flex-col">
        <div className="relative w-full">
          <img
            alt="bg"
            className="h-auto w-full"
            src="https://images.unsplash.com/photo-1695455784661-fcc66aa04be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80"
          />
          <div className="bottomGradient absolute bottom-0 flex h-full w-full flex-col-reverse px-4 pb-[20%]">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button type="button" className="rounded-full bg-white p-1">
                  <FaUser color="#000000" />
                </button>
                <p className="font-bold text-white">user {user?.id}</p>
              </div>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4">
              <p>Favorite Top 3</p>
              <div className="space-y-0 border-y border-white px-2 py-3">
                {userFav.map((x) => {
                  return (
                    <AddMusicItem key={`user-fav-${x.id}`} song={x.song} />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute top-[90%] h-full w-full rounded-t-xl bg-gray-900 p-4">
            <div className="grid grid-cols-2 gap-4">
              {renderHighlight()}
              <label
                className="relative flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200"
                htmlFor="upload"
              >
                <FaPlus />
              </label>
              <input
                onChange={handleFile}
                multiple
                accept="image/*"
                type="file"
                id="upload"
                className="hidden"
              />
            </div>
          </div>
        </div>
      </section>
    </HeaderTemplate>
  );
}

ProfileScreen.Template = AppTemplate;

export default ProfileScreen;
