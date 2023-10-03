'use client';

import { useRouter } from 'next/router';

import AddMusicHighlight from '@/components/post/AddMusicHighlight';
import PhotoController from '@/components/post/PhotoController';
import UploadHighlight from '@/components/post/UploadHighlight';

function PostHighlight() {
  const router = useRouter();
  const { step } = router.query;

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

  return <>{renderContent()}</>;
}

export default PostHighlight;
