

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, } from "firebase/auth";
import { getStorage ,ref,uploadBytes,getDownloadURL, listAll} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

let firebaseApp = null;
let auth = null;
let provider = null;
let storage=null;
let db = null;

if (typeof window !== "undefined") {  // Ensure Firebase is initialized only on the client
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    
    // Initialize Firebase App and Auth only on the client
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    provider = new GoogleAuthProvider();
    storage = getStorage(firebaseApp);
    db = getFirestore(firebaseApp);
}

export { auth, provider,storage ,ref, uploadBytes, getDownloadURL, listAll,db};
