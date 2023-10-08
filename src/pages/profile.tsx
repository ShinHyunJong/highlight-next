'use client';

import { useRouter } from 'next/router';

import ProfileScreen from '@/components/profile/ProfileScreen';
import SettingScreen from '@/components/profile/SettingScreen';

function ProfileRoot() {
  const router = useRouter();
  const { tab } = router.query;

  const renderRoutes = () => {
    switch (tab) {
      case 'settings':
        return <SettingScreen />;

      default:
        return <ProfileScreen />;
    }
  };
  return <>{renderRoutes()}</>;
}

export default ProfileRoot;
