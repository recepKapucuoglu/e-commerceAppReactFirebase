import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyA8O1e0iJ2PFwpiMEHf_o_UqtQMii1UEC8',
  authDomain: 'onlineshop-dc08c.firebaseapp.com',
  projectId: 'onlineshop-dc08c',
  storageBucket: 'onlineshop-dc08c.appspot.com',
  messagingSenderId: '957795539028',
  appId: '1:957795539028:web:ea66550fbeb06b9264b5c1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
