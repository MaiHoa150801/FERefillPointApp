import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDIQlqd_OOKonYs-lNYQrVCNc4ZJUST8eY',
  authDomain: 'final-project-90fa2.firebaseapp.com',
  projectId: 'final-project-90fa2',
  storageBucket: 'final-project-90fa2.appspot.com',
  messagingSenderId: '1008798489401',
  appId: '1:1008798489401:web:d5308cca2335b2f9ac26e8',
  measurementId: 'G-4892Z5YKMX',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
export { storage, auth };
