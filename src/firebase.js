import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAszKe2G-XJ0WMGxHogc1x8fL2-Sd1Ydw0",
  authDomain: "netflix-clone-cv.firebaseapp.com",
  projectId: "netflix-clone-cv",
  storageBucket: "netflix-clone-cv.appspot.com",
  messagingSenderId: "177914950555",
  appId: "1:177914950555:web:8ca9c18efc948d6e0e673e",
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export { storage };
