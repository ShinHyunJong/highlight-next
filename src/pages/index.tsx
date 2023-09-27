import 'swiper/css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';

import HomeScreen from '@/components/home/HomeScreen';
import Onboarding from '@/components/onboarding/Onboarding';
import AddMusic from '@/components/post/AddMusic';
import PhotoController from '@/components/post/PhotoController';
import PostGreeting from '@/components/post/PostGreeting';
import Auth from '@/components/profile/Auth';
import ProfileScreen from '@/components/profile/ProfileScreen';
import SettingScreen from '@/components/profile/SettingScreen';

const firebaseConfig = {
  apiKey: 'AIzaSyC_tZM-TJ9NvcfE810vCuMLNXPMR3ebkYA',
  authDomain: 'highlight-bb870.firebaseapp.com',
  projectId: 'highlight-bb870',
  storageBucket: 'highlight-bb870.appspot.com',
  messagingSenderId: '32939626982',
  appId: '1:32939626982:web:970f55afde3ed554cc8627',
  measurementId: 'G-QRRSYR1FT9',
};

const Index = () => {
  const router = useRouter();
  const { tab } = router.query;

  // const onMessageFCM = async () => {
  //   const isSupported = () =>
  //     'Notification' in window &&
  //     'serviceWorker' in navigator &&
  //     'PushManager' in window;
  //   if (!isSupported()) return;
  //   const permission = await Notification.requestPermission();
  //   if (permission !== 'granted') return;
  //   const firebaseApp = initializeApp(firebaseConfig);

  //   const messaging = getMessaging(firebaseApp);

  //   // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
  //   getToken(messaging, {
  //     vapidKey:
  //       'BHl0dBD_4BjyYGuJG-eAg5nGh3TPs2-HQ9KiV6hvcp889XtMCRsXz0rMUBNfZsNY43lTkRQfyAjVBKUz6TDxiNo',
  //   })
  //     .then((currentToken) => {
  //       if (currentToken) {
  //         // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
  //         console.log(currentToken);
  //       } else {
  //         console.log(
  //           'No registration token available. Request permission to generate one.',
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('An error occurred while retrieving token. ', err);
  //     });

  //   // 메세지가 수신되면 역시 콘솔에 출력합니다.
  //   onMessage(messaging, (payload) => {
  //     window.alert(payload);
  //     console.log('Message received. ', payload);
  //   });
  // };

  const renderRoutes = () => {
    switch (tab) {
      case 'home':
        return <HomeScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'upload':
        return <PhotoController />;
      case 'before-pick':
        return <PostGreeting />;
      case 'pick':
        return <AddMusic />;
      case 'settings':
        return <SettingScreen />;
      case 'auth':
        return (
          <GoogleOAuthProvider clientId="924733757125-uom43l9ir4pipd61b248q975benop8u9.apps.googleusercontent.com">
            <Auth />
          </GoogleOAuthProvider>
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <section className="relative flex h-full w-full flex-col">
      <Onboarding />
      {renderRoutes()}
    </section>
  );
};

export default Index;
