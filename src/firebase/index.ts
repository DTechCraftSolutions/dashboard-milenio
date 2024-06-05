import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// //todo: colocar no .env
const firebaseConfig = {
    apiKey: "AIzaSyD7tO1cSmyUArE0aCxWDglCgRHfKQ97yM4",
    authDomain: "colegio3milenio-cf927.firebaseapp.com",
    projectId: "colegio3milenio-cf927",
    storageBucket: "colegio3milenio-cf927.appspot.com",
    messagingSenderId: "965533060526",
    appId: "1:965533060526:web:d6ddd67ca557a21bbb0c3f",
    measurementId: "G-KDNP0E0J8T"
  };

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_apikey,
//     authDomain: process.env.NEXT_PUBLIC_authDomain,
//     projectId: process.env.NEXT_PUBLIC_projectId,
//     storageBucket: process.env.NEXT_PUBLIC_storageBucket,
//     messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderID,
//     appId: process.env.NEXT_PUBLIC_appId,
//     measurementId: process.env.NEXT_PUBLIC_measurementId
// }

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);