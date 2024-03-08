import Shop from "./models/Shop";
import Product from "./models/Product";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { defaultProducts, defaultShop } from "./globalFunctions";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const googleProvider = provider;

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID || process.env.FIREBASE_APPID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY || process.env.FIREBASE_APIKEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID || process.env.FIREBASE_PROJECTID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN || process.env.FIREBASE_AUTHDOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET || process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID || process.env.FIREBASE_MESSAGINGSENDERID,
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
export const { usersDatabase, emailsDatabase, productsDatabase } = environment;

export const maxAnimationTime = 2500;
export const shortAnimationTime = 350;
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

export const prodURL = process.env.NEXT_PUBLIC_PRODURL || process.env.PRODURL || `https://creative-workshop.vercel.app`;
export const serverPort = process.env.NEXT_PUBLIC_SERVERPORT || process.env.SERVERPORT || 3000;
export const liveLink = process.env.NODE_ENV == `development` ? `http://localhost:${serverPort}` : prodURL;

export const productPlaceholderImage = `https://cdn.shopify.com/s/files/1/0857/2839/5586/files/CatTripleWhiteBG.png?v=1706157387`;
export const productPlaceholderAltImage = `https://cdn.shopify.com/s/files/1/0857/2839/5586/files/CatTripleBlueBG.png?v=1707470831`;

export const fetchShopDataFromAPI = async (customObject = true, useDatabase = true) => {
  if (useDatabase == true) {
    let shopResponse = await fetch(`${liveLink}/api/shop`);
    if (shopResponse.status === 200) {
      let shopData = await shopResponse.json();
      if (shopData) return customObject == true ? new Shop(shopData) : shopData;
    }
  } else {
    return defaultShop;
  }
}

export const fetchProductsFromAPI = async (customObject = true, useDatabase = true) => {
  if (useDatabase == true) {
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
  } else {
    return defaultProducts;
  }
}

export const fetchCustomersFromAPI = async () => {
  let customersResponse = await fetch(`${liveLink}/api/customers`);
  if (customersResponse.status === 200) {
    let customersData = await customersResponse.json();
    if (customersData) {
      if (Array.isArray(customersData)) {
        return customersData;
      }
    }
  }
}

export const createShopifyCustomer = async (email) => {
  try {
    let createShopifyCustomerResponse = await fetch(`${liveLink}/api/customers/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      })
    });

    if (createShopifyCustomerResponse.status === 200) {
      let createdCustomerData = await createShopifyCustomerResponse.json();
      if (createdCustomerData) return createdCustomerData;
    } else {
      const errorResponse = await createShopifyCustomerResponse.json();
      console.log(`Error creating customer: ${errorResponse.message || createShopifyCustomerResponse.statusText}`);
      return null;
    }
  } catch (error) {
    console.log(`Server Error on Create Customer`, error);
  }
}

export const addUserToDatabase = async (userObj) => {
  try {
    await setDoc(doc(db, usersDatabase, userObj?.ID), userObj);
    await createShopifyCustomer(userObj?.email);
    // await setDoc(doc(db, emailsDatabase, userObj?.ID), { email: userObj?.email });
    return { success: true };
  } catch (error) {
    console.log(`Error adding user to database`, error);
    return { success: false, error };
  }
}

export default app;