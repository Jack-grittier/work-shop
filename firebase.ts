// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { GoogleAuthProvider, getAuth } from "firebase/auth";

// export const openWeatherAPIKey = process.env.NEXT_PUBLIC_OPENWEATHER_APIKEY;
// // export const devEnv = window && window.location.host.includes(`dev`) || window.location.host.includes(`local`) || window.location.host.includes(`:3000`);

// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });
// export const googleProvider = provider;

// const firebaseConfig = {
//   appId: process.env.NEXT_PUBLIC_APPID,
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//   projectId: process.env.NEXT_PUBLIC_PROJECTID || `xuruko-bdfcf`,
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

// export default app;