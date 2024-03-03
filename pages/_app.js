import '../creativeMain.scss';
import '../creativeTheme.scss';
import '../creativeWorkshop.scss';

import Pusher from 'pusher-js';
import User from '../models/User';
import ReactDOM from 'react-dom/client';
// import { useRouter } from 'next/router';
import { simplifyUser } from '../components/Form';
import { onAuthStateChanged } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { collection, onSnapshot } from 'firebase/firestore';
import { createContext, useRef, useState, useEffect } from 'react';
import { auth, dataSize, db, fetchCustomersFromAPI, fetchProductsFromAPI, fetchShopDataFromAPI, maxDataSize, usersDatabase } from '../firebase';

export const useDB = () => false;
export const StateContext = createContext({});
export const signUpOrSignIn = `Sign Up or Sign In`;

export const dev = () => process.env.NODE_ENV === `development`;
export const getPage = () => capitalizeAllWords(window.location.pathname.replace(`/`,``));
export const replaceAll = (str, search, replacement) => str.replace(new RegExp(search, `g`), replacement);
export const renderLogMessage = (string, useDatabase) => `${useDatabase == true ? `Database ` : ``}${string}`;
export const getCurrentPageName = () => window.location.hash.slice(window.location.hash.lastIndexOf(`/`)).replace(`/`, ``);
export const detectIfMobile = () => (typeof window.orientation !== `undefined`) || (navigator.userAgent.indexOf(`IEMobile`) !== -1);

export const getShopDataFromAPI = async () => {
  try {
    let getDatabase = useDB();
    if (getDatabase == true) {
      let latestShopData = fetchShopDataFromAPI();
      return latestShopData;
    } else {
      let shop = JSON.parse(localStorage.getItem(`shop`));
      if (shop) return shop;
    }
  } catch (error) {
    console.log(`Server Error on Get Shop Data`, error);
  }
}

export const getProductsFromAPI = async () => {
  try {
    let getDatabase = useDB();
    if (getDatabase == true) {
      let latestProducts = fetchProductsFromAPI();
      return latestProducts;
    } else {
      let products = JSON.parse(localStorage.getItem(`products`));
      if (products) return products;
    }
  } catch (error) {
    console.log(`Server Error on Get Products`, error);
  }
}

export const getCustomersFromAPI = async () => {
  try {
    let getDatabase = true;
    if (getDatabase == true) {
      let latestCustomers = fetchCustomersFromAPI();
      return latestCustomers;
    } else {
      let customers = JSON.parse(localStorage.getItem(`customers`));
      if (customers) return customers;
    }
  } catch (error) {
    console.log(`Server Error on Get Customers`, error);
  }
}

export const capWords = (str) => {
  return str.replace(/(?:^|\s)\w/g, (match) => {
    return match.toUpperCase();
  });
};

export const getNumberFromString = (string) => {
  let result = string.match(/\d+/);
  let number = parseInt(result[0]);
  return number;
}

export const createXML = (xmlString) => {
  let div = document.createElement(`div`);
  div.innerHTML = xmlString.trim();
  return div.firstChild;
}

export const setThemeMode = (theme) => {
  let html = document.documentElement;
  if (html.classList.contains(`dark`)) html.classList.remove(`dark`);
  if (html.classList.contains(`light`)) html.classList.remove(`light`);
  html.classList.add(theme);
  html.style = `color-scheme: ${theme}`;
  html.setAttribute(`data-theme`, theme);
  localStorage.setItem(`theme`, theme);
}

export const setThemeUI = () => {
  let themeMode = localStorage.getItem(`theme`) ? localStorage.getItem(`theme`) : `dark`;
  localStorage.setItem(`alertOpen`, false);
  setThemeMode(themeMode);
}

export const getTimezone = (date) => {
  const timeZoneString = new Intl.DateTimeFormat(undefined, {timeZoneName: `short`}).format(date);
  const match = timeZoneString.match(/\b([A-Z]{3,5})\b/);
  return match ? match[1] : ``;
}

export const cutOffTextAndReplace = (string, end, replacement) => {
  if (!replacement) {
    replacement = `...` || `-`;
  }
  return string?.length > end ? string?.substring(0, end - 1) + replacement : string;
};

export const parseDate = (dateStr) => {
  const parts = dateStr.split(`, `);
  const timePart = parts[0];
  const datePart = parts[1];
  const datePartWithoutSuffix = datePart.replace(/(\d+)(st|nd|rd|th)/, `$1`);
  const newDateStr = `${datePartWithoutSuffix}, ${timePart}`;
  return new Date(newDateStr);
}

export const genUUIDNumbers = (existingIDs) => {
  let newID;
  do {
    newID = Math.floor(Math.random() * 1000000); // generate a random integer between 0 and 999999
  } while (existingIDs.includes(newID)); // keep generating a new ID until it's not already in the existing IDs array
  return newID;
}

export const getFormValuesFromFields = (formFields) => {
  for (let i = 0; i < formFields.length; i++) {
    let field = formFields[i];
    if (field.type != `submit`) {
      console.log(field.type, field.value);
    };
  }
};

export const updateOrAdd = (obj, arr) => {
  let index = arr.findIndex((item) => item.name === obj.name);
  if (index !== -1) {
    arr[index] = obj;
  } else {
    arr.push(obj);
  }
  return arr;
};

export const removeNullAndUndefinedProperties = (object) => {
  return Object.entries(object).reduce((accumulator, [key, value]) => {
    if (value !== null && value !== undefined) {
      accumulator[key] = value;
    }
    return accumulator;
  }, {});
}

export const removeDuplicateObjectFromArray = (arrayOfObjects) => {
  const uniqueArray = arrayOfObjects?.filter((value, index) => {
    const _value = JSON.stringify(value);
    return index === arrayOfObjects?.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
    });
  });
  return uniqueArray;
};

export const setSideBarUI = () => {
  let toc = document.querySelector(`.nextra-toc`);
  let tocMinimized = JSON.parse(localStorage.getItem(`tocMinimized`));
  if (toc) {
    if (tocMinimized) {
      toc.classList.add(`minimized`);
    } else {
      toc.classList.remove(`minimized`);
    };
  }
}

export const generateUniqueID = (existingIDs) => {
  const generateID = () => {
    let id = Math.random().toString(36).substr(2, 9);
    return Array.from(id).map(char => {
      return Math.random() > 0.5 ? char.toUpperCase() : char;
    }).join(``);
  };
  let newID = generateID();
  if (existingIDs && existingIDs.length > 0) {
    while (existingIDs.includes(newID)) {
      newID = generateID();
    }
  }
  return newID;
};

export const countPropertiesInObject = (obj) => {
  let count = 0;
  // Base condition to check if the input is an object
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      count++; // Count the current key
      count += countPropertiesInObject(obj[key]); // Recursively count keys in nested objects
    }
    // If the object is an array, iterate over its elements
    if (Array.isArray(obj)) {
      obj.forEach(item => {
          count += countPropertiesInObject(item); // Recursively count keys in nested objects within the array
      });
    }
  }
  return count;
}

export const capitalizeAllWords = (string, underScores) => {
  let newString;
  if (underScores) {
    if (string != null || string != undefined) {
      const words = string.replace(/_/g, ` `).split(` `);
      const capitalizedWords = words.map((word) => {
        newString = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return newString;
      });
      newString = capitalizedWords.join(`_`);
      return newString;
    }
  } else {
    if (string != null || string != undefined) {
      newString = string.split(` `).map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1).toLowerCase()).join(` `);
      return newString;
    }
  }
};

export const formatDate = (date, specificPortion) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? `PM` : `AM`;
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour `0` should be `12`
  minutes = minutes < 10 ? `0` + minutes : minutes;
  let strTime = hours + `:` + minutes + ` ` + ampm;
  let strTimeNoSpaces = hours + `-` + minutes + `-` + ampm;
  let completedDate = strTime + ` ` + (date.getMonth() + 1) + `/` + date.getDate() + `/` + date.getFullYear();
  let timezone = getTimezone(date);

  if (specificPortion == `time`) {
    completedDate = strTime;
  } else if (specificPortion == `date`) {
    completedDate = (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear();
  } else if (specificPortion == `timezone`) {
    completedDate = strTime + ` ` + (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear() + ` ` + timezone;
  } else if (specificPortion == `timezoneNoSpaces`) {
    completedDate = strTimeNoSpaces + `_` + (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear() + `_` + timezone;
  } else {
    completedDate = strTime + ` ` + (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear() + ` ` + timezone;
  }

  return completedDate;
};

export const dismissAlert = (overlay = document.querySelector(`.overlay`), alertDialog = document.querySelector(`.alert`)) => {
  overlay.style.opacity = 0;
  alertDialog.style.opacity = 0;
  alertDialog.style.transform = `translateY(-50px)`;

  // Remove the alert and overlay from the DOM after the animation is complete
  setTimeout(() => {
    document.body.removeChild(overlay);
    localStorage.setItem(`alertOpen`, false);
  }, 240);
}

export const showAlert = async (title, component, width, height) => {
  let isAlertOpen = JSON.parse(localStorage.getItem(`alertOpen`)) == true;
  if (isAlertOpen) return;
  let overlay = document.createElement(`div`);
  overlay.className = `overlay`;
  document.body.appendChild(overlay);

  let alertDialog = document.createElement(`div`);
  alertDialog.className = `alert`;

  // Add transition styles for smooth fade-in/out
  overlay.style.opacity = 0;
  // overlay.style.transform = `translateY(-50px)`;
  overlay.style.transition = `opacity 240ms ease-out, transform 240ms ease-out`;
  alertDialog.style.opacity = 0;
  if (width) alertDialog.style.width = `${width}`;
  if (height) alertDialog.style.height = `${height}`;
  alertDialog.style.transform = `translateY(-50px)`;
  alertDialog.style.transition = `opacity 240ms ease-out, transform 240ms ease-out`;

  ReactDOM.createRoot(alertDialog).render(<>
    <h2 className={`alertTitle`}>{title}</h2>
    <div className={`inner`}>
      {component}
    </div>
    <button onClick={(e) => {
      dismissAlert(overlay, alertDialog);
    }} className={`alertButton iconButton`}>
      <span>X</span>
    </button>
  </>);

  overlay.appendChild(alertDialog);
  localStorage.setItem(`alertOpen`, true);

  // Trigger reflow to ensure the styles are applied before animating
  void alertDialog.offsetWidth;

  // Fade in the alert
  overlay.style.opacity = 1;
  // overlay.style.transform = `translateY(0)`;
  alertDialog.style.opacity = 1;
  alertDialog.style.transform = `translateY(0)`;

  // Add a click event listener to the overlay that dismisses the alert if clicked outside the alert content
  overlay.addEventListener(`click`, (e) => {
    if (!alertDialog.contains(e.target) && !e.target.classList.contains(`alertActionButton`)) {
      // Click occurred outside the alert content
      // Fade out the alert and overlay
      dismissAlert(overlay, alertDialog);
    }
  });
}

export default function CreativeWorkshop({ Component, pageProps, router }) {
  // const nextRouter = useRouter();
  let brwser = ``;
  let loaded = useRef(false);
  let mobileMenuBreakPoint = 697;
  let [IDs, setIDs] = useState([]);
  let [rte, setRte] = useState(``);
  let [page, setPage] = useState(``);
  let [qotd, setQotd] = useState(``);
  let [width, setWidth] = useState(0);
  let [color, setColor] = useState(``);
  let [users, setUsers] = useState([]);
  let [user, setUser] = useState(null);
  let [dark, setDark] = useState(false);
  let [updates, setUpdates] = useState(0);
  let [onMac, setOnMac] = useState(false);
  let [focus, setFocus] = useState(false);
  let [theme, setTheme] = useState(`dark`);
  let [browser, setBrowser] = useState(``);
  let [players, setPlayers] = useState([]);
  let [devEnv, setDevEnv] = useState(false);
  let [mobile, setMobile] = useState(false);
  let [loading, setLoading] = useState(true);
  let [iPhone, set_iPhone] = useState(false);
  let [platform, setPlatform] = useState(null);
  let [anim, setAnimComplete] = useState(false);
  let [categories, setCategories] = useState([]);
  let [colorPref, setColorPref] = useState(user);
  let [alertOpen, setAlertOpen] = useState(false);
  let [authState, setAuthState] = useState(`Next`);
  let [bodyClasses, setBodyClasses] = useState(``);
  let [mobileMenu, setMobileMenu] = useState(false);
  let [emailField, setEmailField] = useState(false);
  let [systemStatus, setSystemStatus] = useState(``);
  let [buttonText, setButtonText] = useState(`Next`);
  let [rearranging, setRearranging] = useState(false);
  let [usersLoading, setUsersLoading] = useState(true);
  let [content, setContent] = useState(`defaultContent`);
  let [year, setYear] = useState(new Date().getFullYear());
  let [databasePlayers, setDatabasePlayers] = useState([]);
  let [filteredPlayers, setFilteredPlayers] = useState(players);
  let [deleteCompletely, setDeleteCompletely] = useState(false);
  let [sameNamePlayeredEnabled, setSameNamePlayeredEnabled] = useState(false);
  let [noPlayersFoundMessage, setNoPlayersFoundMessage] = useState(`No Players Found`);

  let [useLazyLoad, setUseLazyLoad] = useState(true);
  let [useDatabase, setUseDatabase] = useState(useDB());
  let [imageURLAdded, setImageURLAdded] = useState(false);
  let [useLocalStorage, setUseLocalStorage] = useState(true);

  let [shop, setShop] = useState({});
  let [cart, setCart] = useState({});
  let [products, setProducts] = useState([]);
  let [customers, setCustomers] = useState([]);
  let [adminFeatures, setAdminFeatures] = useState([]);
  let [productToEdit, setProductToEdit] = useState(null);

  const setBrowserUI = () => {
    if (brwser == `` && (navigator.userAgent.match(/edg/i) || navigator.userAgent.includes(`edg`) || navigator.userAgent.includes(`Edg`))) {
      brwser = `edge`;
      setBrowser(`edge`);
    } if (brwser == `` && navigator.userAgent.match(/chrome|chromium|crios/i)) {
      brwser = `chrome`;
      setBrowser(`chrome`);
    } else if (brwser == `` && navigator.userAgent.match(/firefox|fxios/i)) {
      brwser = `firefox`;
      setBrowser(`firefox`);
    } else if (brwser == `` && navigator.userAgent.match(/safari/i)) {
      brwser = `safari`;
      setBrowser(`safari`);
    } else if (brwser == `` && navigator.userAgent.match(/opr\//i)) {
      brwser = `opera`;
      setBrowser(`opera`);
    }
  }

  const refreshShopDataFromAPI = async () => {
    let shopDataFromAPI = await getShopDataFromAPI();
    if (shopDataFromAPI) {
      setShop(shopDataFromAPI);
    } else {
      setShop({});
    }
  }

  const refreshProductsFromAPI = async () => {
    let productsFromAPI = await getProductsFromAPI();
    if (productsFromAPI) {
      setProducts(productsFromAPI);
    } else {
      setProducts([]);
    }
  }

  const refreshCustomersFromAPI = async () => {
    let customersFromAPI = await getCustomersFromAPI();
    if (customersFromAPI) {
      setCustomers(customersFromAPI);
    } else {
      setCustomers([]);
    }
  }

  const pageIs = (route) => {
    let pageIsActive = false;
    route = route.toLowerCase();
    if (window.location.href.includes(route) || router.route.includes(route) || rte.includes(route) || page.includes(route)) {
      pageIsActive = true;
    }
    
    return pageIsActive;
  }

  const setFeatures = () => {
    let defaultFeatures = [
      {
        feature: `Quantity Circle Buttons`,
        shown: pageIs(`products`),
        enabled: false,
      },
      {
        feature: `Dark Mode`,
        enabled: true,
        shown: true,
      }
    ];

    let adminFeats = localStorage.getItem(`features`) ? JSON.parse(localStorage.getItem(`features`)) && JSON.parse(localStorage.getItem(`features`)).length > 0 ? JSON.parse(localStorage.getItem(`features`)) : defaultFeatures : defaultFeatures;

    setAdminFeatures(prevFeats => {
      if (prevFeats) {
        if (prevFeats.length == 0) {
          localStorage.setItem(`features`, JSON.stringify(adminFeats));
          return adminFeats;
        } else {
          localStorage.setItem(`features`, JSON.stringify(adminFeats));
          return adminFeats;
        }
      } else {
        localStorage.setItem(`features`, JSON.stringify(adminFeats));
        return adminFeats;
      }
    });
  }

  const setInitialAndOnRouteChangeFeatures = () => {
    dev() && console.log(`App is changing to`, router.asPath);
    setFeatures();
  };

  // Catch Shop Updates
  useEffect(() => {
    if (Object.keys(shop).length > 0) {
      if (dataSize(shop) <= maxDataSize) localStorage.setItem(`shop`, JSON.stringify(shop));
      dev() && console.log(`Shop`, shop);
    }
  }, [shop])

  // Catch Product Updates
  useEffect(() => {
    if (products.length > 0) {
      if (dataSize(products) <= maxDataSize) localStorage.setItem(`products`, JSON.stringify(products));
      dev() && console.log(`Products`, products);
    }
  }, [products])

  // Catch Customer Updates
  useEffect(() => {
    if (customers.length > 0) {
      if (dataSize(customers) <= maxDataSize) localStorage.setItem(`customers`, JSON.stringify(customers));
      dev() && console.log(`Customers`, customers);
    }
  }, [customers])

  // Catch Feature Updates
  useEffect(() => {
    let darkMode = adminFeatures && adminFeatures?.find(feat => feat.feature == `Dark Mode`);
    if (darkMode) {
      if (darkMode.enabled) {
        setTheme(`dark`);
        setThemeMode(`dark`);
      } else {
        setTheme(`light`);
        setThemeMode(`light`);
      }
    }
    dev() && console.log(`Features`, adminFeatures);
    localStorage.setItem(`features`, JSON.stringify(adminFeatures));
  }, [adminFeatures])

  // Listen for route changes
  useEffect(() => {
    setInitialAndOnRouteChangeFeatures();

    const handleRouteChange = (url) => {
      setInitialAndOnRouteChangeFeatures();
    };

    router.events.on(`routeChangeStart`, handleRouteChange);

    return () => {
      router.events.off(`routeChangeStart`, handleRouteChange);
    };
  }, [router.events, router.asPath]);

  // Users
  useEffect(() => {
    if (useDatabase == true) {
      const unsubscribeFromDatabaseUsersListener = onSnapshot(collection(db, usersDatabase), (querySnapshot) => {
        let usersFromDatabase = [];
        querySnapshot.forEach((doc) => usersFromDatabase.push(new User({...doc.data()})));
        // usersFromDatabase = usersFromDatabase.map(usr => simplifyUser(usr));
        setUsersLoading(false);
        dev() && console.log(`Database Users`, usersFromDatabase);
        setUsers(usersFromDatabase);
        let storedUser = localStorage.getItem(`user`) ? JSON.parse(localStorage.getItem(`user`)) : null;
        let userToCheck = (user == null || user == undefined) ? storedUser : user;
        if (userToCheck) {
          let currentUser = usersFromDatabase.find(u => u.uid == userToCheck.uid);
          if (currentUser) {
            let userUpdatedRoles = new User({
              ...userToCheck,
              roles: currentUser.roles,
            });
            let simplifiedUser = simplifyUser(userUpdatedRoles);
            dev() ? console.log(`Current User`, userUpdatedRoles) : console.log(`Current User`, simplifiedUser);
            setUser(userUpdatedRoles);
          }
        }
      });

      return () => {
        unsubscribeFromDatabaseUsersListener();
      };
    } else {
      let storedUsers = JSON.parse(localStorage.getItem(`users`));
      if (storedUsers && useLocalStorage) {
        setUsers(storedUsers);
        setUsersLoading(false); 
      } else {
        setUsersLoading(false); 
      }
    }
  }, [])

  // App and User Updater
  useEffect(() => {
    // App
    setLoading(true);
    setAnimComplete(false);
    setSystemStatus(`Page Loading!`);
    if (loaded.current) return;
    loaded.current = true;
    
    setDevEnv(dev());
    setUpdates(updates);
    setPlatform(navigator?.userAgent);
    setYear(new Date().getFullYear());
    setSystemStatus(`System Status Ok.`);
    setRte(replaceAll(router.route, `/`, `_`));
    setOnMac(navigator.platform.includes(`Mac`));
    set_iPhone(/iPhone/.test(navigator.userAgent));
    setPage(window.location.pathname.replace(`/`,``));
    setMobile((typeof window.orientation !== `undefined`) || (navigator.userAgent.indexOf(`IEMobile`) !== -1));
    
    setThemeUI();
    setBrowserUI();
    setSideBarUI();

    setBodyClasses(`${rte = `` ? rte : `Index`} pageWrapContainer ${page != `` ? page?.toUpperCase() : `Home`} ${devEnv ? `devMode` : `prodMode`} ${onMac ? `isMac` : `isWindows`} ${mobile ? `mobile` : `desktop`} ${useDB() == true ? `useDB` : `noDB`} ${iPhone ? `on_iPhone` : `notOn_iPhone`}`);
    
    setLoading(false);
    setUsersLoading(false);
    setSystemStatus(`${getPage()} Loaded.`);
    setTimeout(() => setLoading(false), 1500);

    refreshShopDataFromAPI();
    refreshProductsFromAPI();
    refreshCustomersFromAPI();

    // User
    if (useDatabase == true) {

      if (users.length > 0) {
        if (dataSize(users) <= maxDataSize) localStorage.setItem(`users`, JSON.stringify(users));
        dev() && console.log(`Users`, users);
      }
      
      const unsubscribeFromAuthStateListener = onAuthStateChanged(auth, userCredential => {
        if (userCredential) {
          let firebaseUser = users && users.length > 0 ? users.find(u => u.uid == userCredential.uid) : userCredential;
          // firebaseUser.properties = countPropertiesInObject(firebaseUser);
          let currentUser = new User(firebaseUser);
          console.log(`Logged in as`, { users, currentUser, firebaseUser });
          localStorage.setItem(`user`, JSON.stringify(currentUser));
          setUser(currentUser);
          setAuthState(`Sign Out`);
        } else {
          setUser(null);
          setAuthState(`Next`);
        }
      })
      return () => {
        unsubscribeFromAuthStateListener();
      }
    }

  }, [rte, user, users, authState, dark])

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || process.env.PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || process.env.PUSHER_APP_CLUSTER,
      encrypted: true,
    });
    
    const shopChannel = pusher.subscribe(`shop`);
    const productsChannel = pusher.subscribe(`products`);
    const customersChannel = pusher.subscribe(`customers`);

    shopChannel.bind(`updated`, (data) => {
      dev() && console.log(`Shop Updated`, removeNullAndUndefinedProperties(data));
      refreshShopDataFromAPI();
    });

    productsChannel.bind(`created`, (data) => {
      console.log(`Products Created`, removeNullAndUndefinedProperties(data));
      refreshProductsFromAPI();
    });

    productsChannel.bind(`updated`, (data) => {
      console.log(`Products Updated`, removeNullAndUndefinedProperties(data));
      refreshProductsFromAPI();
    });

    productsChannel.bind(`deleted`, (data) => {
      console.log(`Products Deleted`, removeNullAndUndefinedProperties(data));
      refreshProductsFromAPI();
    });

    customersChannel.bind(`created`, (data) => {
      console.log(`Customers Created`, removeNullAndUndefinedProperties(data));
      refreshCustomersFromAPI();
    });

    customersChannel.bind(`updated`, (data) => {
      console.log(`Customers Updated`, removeNullAndUndefinedProperties(data));
      refreshCustomersFromAPI();
    });

    customersChannel.bind(`deleted`, (data) => {
      console.log(`Customers Deleted`, removeNullAndUndefinedProperties(data));
      refreshCustomersFromAPI();
    });

    return () => {
      customersChannel.unbind(`created`);
      customersChannel.unbind(`updated`);
      customersChannel.unbind(`deleted`);
      productsChannel.unbind(`created`);
      productsChannel.unbind(`updated`);
      productsChannel.unbind(`deleted`);
      pusher.unsubscribe(`customers`);
      pusher.unsubscribe(`products`);
      shopChannel.unbind(`updated`);
      pusher.unsubscribe(`shop`);
    };
  }, [])

  return <StateContext.Provider value={{ router, rte, setRte, updates, setUpdates, content, setContent, width, setWidth, user, setUser, page, setPage, mobileMenu, setMobileMenu, users, setUsers, authState, setAuthState, emailField, setEmailField, devEnv, setDevEnv, mobileMenuBreakPoint, platform, setPlatform, focus, setFocus, color, setColor, dark, setDark, colorPref, setColorPref, year, qotd, setQotd, alertOpen, setAlertOpen, mobile, setMobile, systemStatus, setSystemStatus, loading, setLoading, anim, setAnimComplete, IDs, setIDs, categories, setCategories, browser, setBrowser, onMac, rearranging, setRearranging, buttonText, setButtonText, players, setPlayers, filteredPlayers, setFilteredPlayers, useLocalStorage, setUseLocalStorage, databasePlayers, setDatabasePlayers, useDatabase, setUseDatabase, sameNamePlayeredEnabled, setSameNamePlayeredEnabled, deleteCompletely, setDeleteCompletely, noPlayersFoundMessage, setNoPlayersFoundMessage, useLazyLoad, setUseLazyLoad, usersLoading, setUsersLoading, iPhone, set_iPhone, shop, setShop, products, setProducts, productToEdit, setProductToEdit, cart, setCart, imageURLAdded, setImageURLAdded, adminFeatures, setAdminFeatures, theme, setTheme, customers, setCustomers }}>
    {(browser != `chrome` || onMac && browser != `chrome`) ? (
      <div className={`framerMotion ${bodyClasses}`}>
        <AnimatePresence mode={`wait`}>
          <motion.div className={bodyClasses} key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit" transition={{ duration: 0.35 }} variants={{
            pageInitial: {
              opacity: 0,
              clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
            },
            pageAnimate: {
              opacity: 1,
              clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
            },
            pageExit: {
              opacity: 0,
              clipPath: `polygon(50% 0, 50% 0, 50% 100%, 50% 100%)`,
            },
          }}>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div>
    ) : (
      <div className={`noFramerMotion ${bodyClasses}`}>
        <Component {...pageProps} />
      </div>
    )}
  </StateContext.Provider>
}