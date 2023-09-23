'use client';

import { useRouter } from 'next/router';

import AddMusic from '@/components/post/AddMusic';
import PhotoController from '@/components/post/PhotoController';
import { useUpload } from '@/hooks/upload';
import HeaderTemplate from '@/templates/HeaderTemplate';

const routeList = [
  { title: 'Select Photo', value: 'photo' },
  { title: 'Add Music', value: 'music' },
  { title: 'Upload Highlight', value: 'highlight' },
];

function PostHighlight() {
  const router = useRouter();
  const { step } = router.query;
  const { postHighlight } = useUpload();

  const renderContent = () => {
    switch (step) {
      case 'photo':
        return <PhotoController />;

      case 'music':
        return <AddMusic />;

      default:
        return <PhotoController />;
    }
  };

  const title =
    routeList.find((x) => x.value === step)?.title || 'Select Photo';
  return (
    <HeaderTemplate
      rightNode={
        <button type="button" onClick={postHighlight} className="clearButton">
          <p>upload</p>
        </button>
      }
      title={title}
    >
      {renderContent()}
    </HeaderTemplate>
  );
}

export default PostHighlight;
