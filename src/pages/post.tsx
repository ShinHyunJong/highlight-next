'use client';

import { useRouter } from 'next/router';

import AddMusicHighlight from '@/components/post/AddMusicHighlight';
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
        return <AddMusicHighlight />;

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
            onClick={postHighlight}
            // onClick={() => router.push('/post?step=music')}
            className="clearButton"
          >
            <p>NEXT</p>
          </button>
        );

      case 'music':
        return (
          <button
            type="button"
            onClick={() => router.push('/post?step=edit')}
            className="clearButton"
          >
            <p>NEXT</p>
          </button>
        );

      case 'edit':
        return (
          <button type="button" onClick={postHighlight} className="clearButton">
            <p>DONE</p>
          </button>
        );

      default:
        return (
          <button
            type="button"
            // onClick={() => router.push('/post?step=music')}
            onClick={postHighlight}
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
