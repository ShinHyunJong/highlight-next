'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';

import Auth from '@/components/auth/Auth';
import AuthAddMusic from '@/components/auth/AuthAddMusic';
import AuthGreeting from '@/components/auth/AuthGreeting';

function AuthRoot() {
  const router = useRouter();
  const { tab } = router.query;

  const renderRoutes = () => {
    switch (tab) {
      case 'before-pick':
        return <AuthGreeting />;
      case 'pick':
        return <AuthAddMusic />;

      default:
        return (
          <GoogleOAuthProvider clientId="924733757125-uom43l9ir4pipd61b248q975benop8u9.apps.googleusercontent.com">
            <Auth />
          </GoogleOAuthProvider>
        );
    }
  };

  return <>{renderRoutes()}</>;
}

export default AuthRoot;
