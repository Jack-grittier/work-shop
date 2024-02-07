import Shop from "./models/Shop";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Product from "./models/Product";

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
    emailsDatabase: `devEmails`,
    productsDatabase: `devProducts`,
  },
  test: {
    usersDatabase: `testUsers`,
    emailsDatabase: `testEmails`,
    productsDatabase: `testProducts`,
  },
  alpha: {
    usersDatabase: `alphaUsers`,
    emailsDatabase: `alphaEmails`,
    productsDatabase: `alphaProducts`,
  },
  beta: {
    usersDatabase: `betaUsers`,
    emailsDatabase: `betaEmails`,
    productsDatabase: `betaProducts`,
  },
  prod: {
    usersDatabase: `users`,
    emailsDatabase: `emails`,
    productsDatabase: `products`,
  },
};
  
export const environment = environments.prod;
export const usersDatabase = environment.usersDatabase;
export const emailsDatabase = environment.emailsDatabase;
export const productsDatabase = environment.productsDatabase;

export const maxAnimationTime = 2500;
export const maxDataSize = 1_048_576; // 1MB

export const roles = {
  User: 1,
  Mod: 2,
  Admin: 3,
  Developer: 4,
  Owner: 5
}

export const dataSize = (data) => {
  let stringData = JSON.stringify(data);
  let dataInfo = new Blob([stringData]);
  return dataInfo.size;
}

export const checkRole = (userRoles, role) => {
  let userHasMinimumRole = userRoles && Array.isArray(userRoles) ? userRoles.some(rol => roles[rol] >= roles[role]) : false;
  return userHasMinimumRole;
}

export const serverPort = process.env.NEXT_PUBLIC_SERVERPORT || process.env.SERVERPORT || 3000;
export const liveLink = process.env.NODE_ENV == `development` ? `http://localhost:${serverPort}` : window.location.origin;

export const fetchShopDataFromAPI = async (customObject = true) => {
  let shopResponse = await fetch(`${liveLink}/api/shop`);
  if (shopResponse.status === 200) {
    let shopData = await shopResponse.json();
    if (shopData) return customObject == true ? new Shop(shopData) : shopData;
  }
}

export const fetchProductsFromAPI = async (customObject = true) => {
  let productsResponse = await fetch(`${liveLink}/api/products`);
  if (productsResponse.status === 200) {
    let productsData = await productsResponse.json();
    if (productsData) {
      if (Array.isArray(productsData)) {
        let modifiedProducts = productsData.map(prod => customObject == true ? new Product(prod) : prod);
        return modifiedProducts;
      }
    }
  }
}

export const addUserToDatabase = async (userObj) => {
  try {
    await setDoc(doc(db, usersDatabase, userObj?.ID), userObj);
    // await setDoc(doc(db, emailsDatabase, userObj?.ID), { email: userObj?.email });
    return { success: true };
  } catch (error) {
    console.log(`Error adding user to database`, error);
    return { success: false, error };
  }
}

export default app;