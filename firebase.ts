import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import User from "./models/User";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const googleProvider = provider;

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const environments = {
    dev: {
      usersDatabase: `devUsers`,
      productsDatabase: `devProducts`,
    },
    test: {
      usersDatabase: `testUsers`,
      productsDatabase: `testProducts`,
    },
    alpha: {
      usersDatabase: `alphaUsers`,
      productsDatabase: `alphaProducts`,
    },
    beta: {
      usersDatabase: `betaUsers`,
      productsDatabase: `betaProducts`,
    },
    prod: {
      usersDatabase: `users`,
      productsDatabase: `products`,
    },
};

export const roles = {
  User: 1,
  Mod: 2,
  Admin: 3,
  Developer: 4,
  Owner: 5
}

export const checkRole = (userRoles, role) => {
  let userHasMinimumRole = userRoles && Array.isArray(userRoles) ? userRoles.some(rol => roles[rol] >= roles[role]) : false;
  return userHasMinimumRole;
}
  
export const environment = environments.prod;
export const usersDatabase = environment.usersDatabase;
export const productsDatabase = environment.productsDatabase;

export const addUserToDatabase = async (userObj: User) => await setDoc(doc(db, usersDatabase, userObj?.ID), userObj);

export default app;