import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';
import { SlSettings } from 'react-icons/sl';

import { useUpload } from '@/hooks/upload';
import AppTemplate from '@/templates/AppTemplate';
import HeaderTemplate from '@/templates/HeaderTemplate';

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
    <HeaderTemplate
      title="My Profile"
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
          <div className="absolute top-[90%] h-full w-full rounded-t-xl bg-gray-900 p-4">
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
            </div>{' '}
          </div>
        </div>
      </section>
    </HeaderTemplate>
  );
}

ProfileScreen.Template = AppTemplate;

export default ProfileScreen;
