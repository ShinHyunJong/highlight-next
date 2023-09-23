import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';

import { useUpload } from '@/hooks/upload';
import AppTemplate from '@/templates/AppTemplate';

import Auth from '../profile/Auth';

function ProfileScreen() {
  const router = useRouter();
  const { processFileList, processing } = useUpload();
  const handleFile = async (e: any) => {
    try {
      const { files } = e.target;
      router.push('/?tab=upload');
      await processFileList(files);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="flex">
        <GoogleOAuthProvider clientId="295809402799-qau23032p9iou8bpgp67j9r1q1gqf89e.apps.googleusercontent.com">
          <Auth />
        </GoogleOAuthProvider>
      </div>
      <div className="mt-4 flex">
        <label className="cursor-pointer" htmlFor="upload">
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
    </section>
  );
}

ProfileScreen.Template = AppTemplate;

export default ProfileScreen;
