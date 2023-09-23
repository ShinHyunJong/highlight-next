import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import queryString from 'query-string';

import { api } from '@/requests';

import { Button } from '../ui/button';

function Auth() {
  const handleApple = () => {
    const config = {
      client_id: 'com.signin.highlight', // This is the service ID we created.
      redirect_uri:
        'https://rich-blue-llama-wrap.cyclic.cloud/auth/apple/verify', // As registered along with our service ID
      response_type: 'code id_token',
      state: 'origin:web', // Any string of your choice that you may use for some logic. It's optional and you may omit it.
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
      console.log(data);
    },
  });

  const handleSpotify = () => {
    if (typeof window === 'undefined') return;
    const scope = 'user-read-private user-read-email';
    const client_id = '2e437b5b537441a393bc68887bd9d180';
    const redirect_uri = 'http://localhost:3002?tab=profile';
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
    <div className="flex flex-col gap-1">
      <Button onClick={handleApple}>Apple</Button>
      <Button onClick={handleSpotify}>Spotify</Button>
      <Button onClick={() => handleGoogle()}>Google</Button>
    </div>
  );
}

export default Auth;
