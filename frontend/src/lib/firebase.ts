import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCkS04MdzG2f7oanfZBMJ7lMHkgpwUYfs0',
  authDomain: 'e-commerce-tech-task.firebaseapp.com',
  projectId: 'e-commerce-tech-task',
  storageBucket: 'e-commerce-tech-task.firebasestorage.app',
  messagingSenderId: '801308148111',
  appId: '1:801308148111:web:7ad26b38c605c0ad1bcbfa',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { getDownloadURL, ref, storage, uploadBytes };
