import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import { FaApple, FaGoogle } from 'react-icons/fa';

import authAtom from '@/atoms/auth';
import { useAuth } from '@/hooks/auth';
import { api } from '@/requests';
import HeaderTemplate from '@/templates/HeaderTemplate';

import Greeting from '../header/Gretting';
import Stepper from '../header/Stepper';

function Auth() {
  const router = useRouter();
  const [appleLoading, setAppleLoading] = useState(false);
  const [accessToken, setAccessToken] = useAtom(authAtom.accessToken);
  const { signInLoading, postRegisterGoogle, setUser } = useAuth();
  const [selectedPickSong, setSelectedPickSong] = useAtom(
    authAtom.selectedPickSong,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!router.query.accessToken || !router.query.user) return;
    console.log('auth');
    setSelectedPickSong([]);
    setAccessToken(router.query.accessToken.toString());
    setUser(JSON.parse(router.query.user.toString()));
    router.replace('/profile');
  }, [router]);

  const handleApple = () => {
    setAppleLoading(true);
    const config = {
      client_id: 'com.signin.highlight', // This is the service ID we created.
      redirect_uri: 'https://api-dev.discoverrealmusic.com/auth/apple/verify', // As registered along with our service ID
      response_type: 'code id_token',
      state: JSON.stringify(selectedPickSong), // Any string of your choice that you may use for some logic. It's optional and you may omit it.
      scope: 'name email', // To tell apple we want the user name and emails fields in the response it sends us.
      response_mode: 'form_post',
      m: 11,
      v: '1.5.4',
    };
    const queryString = Object.entries(config)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    window.location.href = `https://appleid.apple.com/auth/authorize?${queryString}`;
  };
  const handleAppleMusic = async () => {
    if (typeof window === 'undefined') return;
    const { data } = await api.get('/apple/token');
    console.log(data);
    window.MusicKit.configure({
      affiliateToken: undefined,
      campaignToken: undefined,
      declarativeMarkup: true,
      developerToken: data,
      debug: true,
      features: [
        'player-accurate-timing',
        'api-data-store',
        'api-session-storage',
        'api-artist-include',
      ],
      storefrontId: 'us',
      suppressErrorDialog: false,
    });
    const music = window.MusicKit.getInstance();
    const auth = await music.authorize();
    console.log(auth);
    // music.api
    //   .recentPlayed({ limit: 10, offset: 0 })
    //   .then(function (results) {
    //     console.log(results);
    //   })
    //   .catch(function (error) {
    //     window.alert(error);
    //   });
  };

  const handleGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`,
      );
      await postRegisterGoogle(data.email, data.sub);
    },
  });

  const handleSpotify = () => {
    if (typeof window === 'undefined') return;
    const scope = 'user-read-private user-read-email';
    const client_id = '';
    const redirect_uri = 'http://localhost:3001/auth';
    window.location.href = `https://accounts.spotify.com/authorize?${queryString.stringify(
      {
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
      },
    )}`;
  };

  return (
    <HeaderTemplate title="로그인">
      <section className="flex h-full w-full flex-col p-4">
        <Stepper count={3} step={3} />
        <Greeting textList={['Join us.!']} />
        {signInLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size={20} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-8">
            <button
              type="button"
              onClick={handleApple}
              className="fullBtnShadow relative flex w-full items-center justify-center rounded-lg bg-black px-4 py-2 text-white"
            >
              <div className="absolute left-4">
                <FaApple color="#ffffff" />
              </div>
              {appleLoading ? <Spinner size={14} /> : 'Sign with Apple'}
            </button>
            <button
              type="button"
              onClick={() => handleGoogle()}
              className="fullBtnShadow relative flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-gray-900 shadow-md"
            >
              <div className="absolute left-4">
                <FaGoogle />
              </div>
              Sign with Google
            </button>
          </div>
        )}
      </section>
    </HeaderTemplate>
  );
}

export default Auth;
