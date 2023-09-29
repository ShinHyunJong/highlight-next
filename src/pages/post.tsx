'use client';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';

import authAtom from '@/atoms/auth';
import AddMusicHighlight from '@/components/post/AddMusicHighlight';
import PhotoController from '@/components/post/PhotoController';
import UploadHighlight from '@/components/post/UploadHighlight';
import { Button } from '@/components/ui/button';
import { useUpload } from '@/hooks/upload';
import HeaderTemplate from '@/templates/HeaderTemplate';

const routeList = [
  { title: 'Select Photo', value: 'photo' },
  { title: 'Add Music', value: 'music' },
  { title: 'Upload Highlight', value: 'upload' },
];

function PostHighlight() {
  const router = useRouter();
  const { step } = router.query;
  const { postHighlight, uploading } = useUpload();
  const selectedPickSong = useAtomValue(authAtom.selectedPickSong);

  const renderContent = () => {
    switch (step) {
      case 'photo':
        return <PhotoController />;

      case 'music':
        return <AddMusicHighlight />;

      case 'upload':
        return <UploadHighlight />;

      default:
        return <PhotoController />;
    }
  };

  const renderRightNode = () => {
    switch (step) {
      case 'photo':
        return (
          <button
            type="button"
            // onClick={postHighlight}
            onClick={() => router.push('/post?step=music')}
            className="clearButton"
          >
            <p>NEXT</p>
          </button>
        );

      case 'music':
        return (
          <Button
            isDisabled={selectedPickSong.length < 3}
            onClick={() => router.push('/post?step=upload')}
            variant="ghost"
          >
            <p className="mr-1 text-sm text-blue-500">
              {selectedPickSong.length}
            </p>
            NEXT
          </Button>
        );

      case 'upload':
        return (
          <Button isLoading={uploading} variant="ghost" onClick={postHighlight}>
            DONE
          </Button>
        );

      default:
        return (
          <button
            type="button"
            onClick={() => router.push('/post?step=music')}
            className="clearButton"
          >
            <p>NEXT</p>
          </button>
        );
    }
  };

  const title =
    routeList.find((x) => x.value === step)?.title || 'Select Photo';
  return (
    <HeaderTemplate rightNode={renderRightNode()} title={title}>
      {renderContent()}
    </HeaderTemplate>
  );
}

export default PostHighlight;
