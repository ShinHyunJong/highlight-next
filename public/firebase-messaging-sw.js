// /public/firebase-messaging-sw.js
importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js',
);
const firebaseConfig = {
  apiKey: 'AIzaSyC_tZM-TJ9NvcfE810vCuMLNXPMR3ebkYA',
  authDomain: 'highlight-bb870.firebaseapp.com',
  projectId: 'highlight-bb870',
  storageBucket: 'highlight-bb870.appspot.com',
  messagingSenderId: '32939626982',
  appId: '1:32939626982:web:970f55afde3ed554cc8627',
  measurementId: 'G-QRRSYR1FT9',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
