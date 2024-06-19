import Shop from "./models/Shop";
import ShopifyBuy from 'shopify-buy';
import Product from "./models/Product";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { defaultProducts, defaultShop } from "./db/database";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: `select_account` });
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

export const firebaseDatabases = {
  dev: {
    usersDatabase: `devUsers`,
    emailsDatabase: `devEmails`,
    productsDatabase: `devProducts`,
    pageViewsDatabase: `devPageviews`,
  },
  test: {
    usersDatabase: `testUsers`,
    emailsDatabase: `testEmails`,
    productsDatabase: `testProducts`,
    pageViewsDatabase: `testPageviews`,
  },
  alpha: {
    usersDatabase: `alphaUsers`,
    emailsDatabase: `alphaEmails`,
    productsDatabase: `alphaProducts`,
    pageViewsDatabase: `alphaPageviews`,
  },
  beta: {
    usersDatabase: `betaUsers`,
    emailsDatabase: `betaEmails`,
    productsDatabase: `betaProducts`,
    pageViewsDatabase: `betaPageviews`,
  },
  prod: {
    usersDatabase: `users`,
    emailsDatabase: `emails`,
    productsDatabase: `products`,
    pageViewsDatabase: `pageviews`,
  },
};
  
export const firebaseDatabaseToUse = firebaseDatabases.prod;
export const { usersDatabase, emailsDatabase, productsDatabase, pageViewsDatabase } = firebaseDatabaseToUse;

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

export const trackUniquePageView = async (uniquePageView) => {
  try {
    await setDoc(doc(db, pageViewsDatabase, uniquePageView?.ID), uniquePageView);
    return { success: true };
  } catch (error) {
    console.log(`Error adding unique page view to database`, error);
    return { success: false, error };
  }
}

export const addUserToDatabase = async (userObj) => {
  try {
    await setDoc(doc(db, usersDatabase, userObj?.ID), userObj);
    await createShopifyCustomer(userObj?.email);
    return { success: true };
  } catch (error) {
    console.log(`Error adding user to database`, error);
    return { success: false, error };
  }
}

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
      return customersData;
    }
  }
}

export const fetchCartFromAPI = async () => {
  let cartResponse = await fetch(`${liveLink}/api/cart`);
  if (cartResponse.status === 200) {
    let cartData = await cartResponse.json();
    if (cartData) {
      return cartData;
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

export const newShopifyCheckout = async (cartProducts, customerData) => {
  try {
    let startNewShopifyCheckoutResponse = await fetch(`${liveLink}/api/checkouts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerData,
        cartProducts,
      })
    });

    if (startNewShopifyCheckoutResponse.ok) {
      let startNewShopifyCheckoutData = await startNewShopifyCheckoutResponse.json();
      if (startNewShopifyCheckoutData) return startNewShopifyCheckoutData;
    } else {
      const errorResponse = await startNewShopifyCheckoutResponse.json();
      console.log(`Error Starting New Checkout`, {
        status: errorResponse.message || startNewShopifyCheckoutResponse.statusText,
        startNewShopifyCheckoutResponse,
        errorResponse,
      });
      return null;
    }
  } catch (error) {
    console.log(`Server Error on Start New Checkout`, error);
  }
}

// export const newShopifyCheckout = async (cartProducts, customerId, customerData) => {
//   try {
//     let startNewShopifyCheckoutResponse = await fetch(`${liveLink}/api/cart/create`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         customerId,
//         customerData,
//         cartProducts,
//       })
//     });

//     if (startNewShopifyCheckoutResponse.ok) {
//       let startNewShopifyCheckoutData = await startNewShopifyCheckoutResponse.json();
//       if (startNewShopifyCheckoutData) return startNewShopifyCheckoutData;
//     } else {
//       const errorResponse = await startNewShopifyCheckoutResponse.json();
//       console.log(`Error Starting New Checkout`, {
//         status: errorResponse.message || startNewShopifyCheckoutResponse.statusText,
//         startNewShopifyCheckoutResponse,
//         errorResponse,
//       });
//       return null;
//     }
//   } catch (error) {
//     console.log(`Server Error on Start New Checkout`, error);
//   }
// }

const storeName = process.env.SHOPIFY_STORE_NAME || process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME;
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

export const shopifyClient = ShopifyBuy.buildClient({
  domain: `${storeName}.myshopify.com`,
  storefrontAccessToken: accessToken
});

export default app;