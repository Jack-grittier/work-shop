import Toggle from "./Toggle";
import Popover from "./Popover";
import User from "../models/User";
import { toast } from "react-toastify";
import LoadingSpinner from './LoadingSpinner';
import GoogleButton from 'react-google-button';
import PasswordRequired from './PasswordRequired';
import { useContext, useEffect, useRef, useState } from 'react';
import { addUserToDatabase, auth, dataSize, googleProvider, maxDataSize } from '../firebase';
import { StateContext, dev, removeNullAndUndefinedProperties, showAlert, signUpOrSignIn } from '../pages/_app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const simplifyUser = (expandedUser: User) => {
  let simplifiedUser = {
    ID: expandedUser?.ID,
    id: expandedUser?.id,
    uid: expandedUser?.uid,
    name: expandedUser?.name,
    type: expandedUser?.type,
    uuid: expandedUser?.uuid,
    roles: expandedUser?.roles,
    email: expandedUser?.email,
    created: expandedUser?.created,
    updated: expandedUser?.updated,
    providerId: expandedUser?.providerId,
    lastSignIn: expandedUser?.lastSignIn,
    validSince: expandedUser?.validSince,
    lastRefresh: expandedUser?.lastRefresh,
    uniqueIndex: expandedUser?.uniqueIndex,
    displayName: expandedUser?.displayName,
    creationTime: expandedUser?.creationTime,
    emailVerified: expandedUser?.emailVerified,
    operationType: expandedUser?.operationType,
  };
  return simplifiedUser as User;
}

export const renderErrorMessage = (erMsg) => {
  if (erMsg.toLowerCase().includes(`invalid-email`)) {
    return `Please use a valid email.`;
  } else if (erMsg.toLowerCase().includes(`email-already-in-use`)) {
    return `Email is already in use.`;
  } else if (erMsg.toLowerCase().includes(`weak-password`)) {
    return `Password should be at least 6 characters`;
  } else if (erMsg.toLowerCase().includes(`wrong-password`)) {
    return `Incorrect Password`;
  } else if (erMsg.toLowerCase().includes(`user-not-found`)) {
    return `User Not Found`;
  } else {
    return erMsg;
  }
}

export default function Form(props?: any) {
  const { style } = props;
  const loadedRef = useRef(false);
  const [, setLoaded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [useLegacyProfileEditor, setUseLegacyProfileEditor] = useState(false);
  const { mobile, useDatabase, user, users, setUser, authState, emailField, playersLoading, setAuthState, setEmailField, setFocus, adminFeatures, setAdminFeatures } = useContext<any>(StateContext);
  
  const trackKeyDown = () => {
    if (isFocused) {
      const scrollY = window.scrollY; // Capture the current scroll position
      window.onscroll = function () { window.scrollTo(window.scrollX, scrollY); };
    }
  }

  const googleSignInOrSignUp = async (e) => {
   try {

    let googleUser = await signInWithPopup(auth, googleProvider);

    if (googleUser) {
      setFocus(false);
      setAuthState(`Sign Out`);

      let userWithGoogle = new User({ 
        ...(googleUser as any), 
        type: `Google`, 
        uniqueIndex: users.length + 1,
        email: googleUser?.user?.email, 
      });

      userWithGoogle = removeNullAndUndefinedProperties(userWithGoogle);
      // newUser.properties = countPropertiesInObject(userWithGoogle);

      let userToStoreInDatabase = simplifyUser(userWithGoogle);
      if (dataSize(userToStoreInDatabase) <= maxDataSize) localStorage.setItem(`user`, JSON.stringify(userToStoreInDatabase));

      let playerExistsInDatabase = users && users.length > 0 ? users.find(usr => usr.uid == userToStoreInDatabase.uid || usr.email.toLowerCase() == userToStoreInDatabase.email.toLowerCase()) : false;

      setUser(playerExistsInDatabase || userWithGoogle);

      let registrationData = { playerExistsInDatabase, userWithGoogle, userToStoreInDatabase };
      dev() && console.log(`Registration Logs`, registrationData);

      if (playerExistsInDatabase != false) {
        console.log(`Successfully Signed In with Google`, dev() ? registrationData : userToStoreInDatabase);
        toast.success(`Successfully Signed In with Google`);
      } else {
        addUserToDatabase(JSON.parse(JSON.stringify(userToStoreInDatabase)));
        console.log(`Successfully Signed Up with Google`, dev() ? registrationData : userToStoreInDatabase);
        toast.success(`Successfully Signed Up with Google`);
      }
    }

   } catch (error) {
    console.log(`Error Signing In with Google`, error);
    toast.error(`Error Signing In with Google`);
   }

  }

  const authForm = (e?: any) => {
    e.preventDefault();
    let formFields = e.target.children;
    let clicked = e?.nativeEvent?.submitter;
    let email = formFields?.email?.value ?? `email`;
    let password = formFields?.password?.value ?? `password`;
  
    switch(clicked?.value) {
      default:
        console.log(clicked?.value);
        break;
      case `Next`:
        setEmailField(true);
        let userEmails = users.filter(usr => usr?.email).map(usr => usr?.email?.toLowerCase());
        if (userEmails.includes(email?.toLowerCase())) {
          setAuthState(`Sign In`);
        } else {
          setAuthState(`Sign Up`);
        }
        break;
      case `Back`:
        setAuthState(`Next`);
        setEmailField(false);
        break;
      case `Sign Out`:
        if (useDatabase == true) signOut(auth);
        setUser(null);
        setAuthState(`Next`);
        setEmailField(false);
        localStorage.removeItem(`user`);
        break;
      case `Save`:
        let emptyFields = [];
        let fieldsToUpdate = [];
        console.log(`Save`, formFields);
        for (let i = 0; i < formFields.length; i++) {
          const input = formFields[i];
          if (input?.classList?.contains(`userData`)) {
            if (input.value === ``) {
              emptyFields.push(input?.placeholder);
            } else {
              fieldsToUpdate.push(input);
            }
          }
        }
        if (fieldsToUpdate.length == 0) {
          showAlert(`The Form was NOT Saved.`, `You Can Fill`, emptyFields);
        } else {
          console.log(`Fields To Update`, fieldsToUpdate);
        }
        break;
      case `Sign In`:
        if (password == ``) {
          showAlert(`Password Required`, <PasswordRequired />, (mobile || window.innerWidth <= 768) ? `88%` : `55%`, (mobile || window.innerWidth <= 768) ? `60%` : `auto`);
          return;
        } else { // Sign User In
          if (useDatabase == true) {
            signInWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
              if (userCredential != null) {
                let existingUser = users.find(usr => usr?.email?.toLowerCase() == email?.toLowerCase());
                if (existingUser != null) {
                  setFocus(false);
                  setAuthState(`Sign Out`);
                  setUser(existingUser);
                  toast.success(`Successfully Signed In`);
                } else {
                  setEmailField(true);
                  setAuthState(`Sign Up`);
                }
              }
            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorMessage) {
                toast.error(renderErrorMessage(errorMessage));
                console.log(`Error Signing In`, {
                  error,
                  errorCode,
                  errorMessage
                });
              }
              return;
            });
          }
        }
        break;
      case `Sign Up`:
        if (password == ``) {
          showAlert(`Password Required`, <PasswordRequired />, (mobile || window.innerWidth <= 768) ? `88%` : `55%`, (mobile || window.innerWidth <= 768) ? `60%` : `auto`);
          return;
        } else {
          if (useDatabase == true) {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
              if (userCredential != null) {
                let newUser = new User({ ...userCredential, email: email, type: `Firebase`, uniqueIndex: users.length + 1 });
                newUser = removeNullAndUndefinedProperties(newUser);
                // newUser.properties = countPropertiesInObject(newUser);
                let userToStoreInDatabase = simplifyUser(newUser);
                console.log(`User Signed Up`, dev() ? newUser : userToStoreInDatabase);
                addUserToDatabase(JSON.parse(JSON.stringify(userToStoreInDatabase)));
                setAuthState(`Sign Out`);
                setUser(newUser);
              }
            }).catch((error) => {
              console.log(`Error Signing Up`, error);
              const errorMessage = error.message;
              if (errorMessage) {
                toast.error(renderErrorMessage(errorMessage));             
              } else {
                toast.error(`Error Signing Up`);
              }
              return;
            });
          }
        }
      break;
    };
  }

  useEffect(() => {
    if (loadedRef.current) return;
      loadedRef.current = true;
      setLoaded(true);
  }, [user, users, authState]);

  useEffect(() => {
    // Restore normal scrolling when focus is lost
    const resetScroll = () => {
      window.onscroll = null;
    };

    if (!isFocused) {
      resetScroll();
    }

    // Event listeners for restoring scroll on window resize or orientation change
    window.addEventListener(`resize`, resetScroll);
    window.addEventListener(`orientationchange`, resetScroll);

    return () => {
      // Clean up event listeners
      window.removeEventListener(`resize`, resetScroll);
      window.removeEventListener(`orientationchange`, resetScroll);
    };
  }, [isFocused]);

  return <>
    {playersLoading ? (
      <LoadingSpinner override={true} size={18} />
    ) : (
      <form onSubmit={(e) => authForm(e)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onKeyDown={() => trackKeyDown()} id={props.id} className={`flex authForm ${authState == `Next` ? `Next` : ``} ${emailField == true ? `hasPasswordField` : `noPasswordYet`} ${props.className} ${authState == `Sign Up` || authState == `Sign In` ? `threeInputs` : ``} ${user ? `userSignedIn` : `userSignedOut`}`} style={style}>
        {!user && <>
          <div className={`authStateForm`}>
            <span className={`authFormLabel`}>
              <span className={`authFormPhrase`}>{authState == `Next` ? signUpOrSignIn : authState}</span>
            </span>
          </div>
          {authState == `Sign In` && <div className={`authStateForm authStateFormRight`}>
            <span className={`authFormLabel`}>
              <span className={`authFormPhrase`}>Reset Password</span>
            </span>
          </div>}
        </>}
        {!user && <input placeholder="Email Address" className={`emailAddressField`} type="email" name="email" autoComplete={`email`} required />}
        {!user && emailField && (
          <input className={`authFormPassworrdField`} autoFocus={emailField} placeholder="Password" type="password" name="password" autoComplete={`current-password`} />
        )}
        {user && (useLegacyProfileEditor && window?.location?.href?.includes(`profile`)) && <input id="name" className={`name userData`} placeholder="Name" type="text" name="status" />}
        {user && (useLegacyProfileEditor && window?.location?.href?.includes(`profile`)) && <input id="status" className={`status userData`} placeholder="Status" type="text" name="status" />}
        {user && (useLegacyProfileEditor && window?.location?.href?.includes(`profile`)) && <input id="bio" className={`bio userData`} placeholder="About You" type="text" name="bio" />}
        {user && (useLegacyProfileEditor && window?.location?.href?.includes(`profile`)) && <input id="number" className={`number userData`} placeholder="Favorite Number" type="number" name="number" />}
        {user && (useLegacyProfileEditor && window?.location?.href?.includes(`profile`)) && <input id="password" className={`editPassword userData`} placeholder="Edit Password" type="password" name="editPassword" autoComplete={`current-password`} />}
        <input title={user ? `Sign Out` : authState} className={`${(user && (useLegacyProfileEditor && window?.location?.href?.includes(`profile`)) || (authState == `Sign In` || authState == `Sign Up`)) ? `submit half` : `submit full`} ${user ? `userSignedInSubmit` : `userSignedOutSubmit`}`} type="submit" name="authFormSubmit" value={user ? `Sign Out` : authState} />
        {/* {(authState == `Sign In` || authState == `Sign Up`) && <input id={`back`} className={`back`} type="submit" name="authFormBack" value={`Back`} />} */}
        {!user && authState == `Next` && <div title={`${signUpOrSignIn} With Google`} className={`googleButton customUserSection`}>
          <GoogleButton onClick={(e) => googleSignInOrSignUp(e)} type={`dark`} />
        </div>}
        {user && (
          <div 
            style={{ position: `relative` }}
            className={`customUserSection popoverContainer`}
            // onMouseEnter={() => setPopoverVisible(true)}
            // onMouseLeave={() => setPopoverVisible(false)}
          >
            <a title={`Go to Profile`} className={`profileLink`} href={`/profile`}>
              {user?.image ? (
                <img alt={user?.email} src={user?.image} className={`userImage`} />
              ) : (
                <div className={`userCustomAvatar`}>{user?.name?.charAt(0).toUpperCase()}</div>
              )}
              <div className={`welcomeMessage`}>Welcome, {user?.name}</div>
            </a>

            <Popover
              id={`userAdminSection`}
              classes={`userAdminSection`}
              isVisible={isPopoverVisible}
              content={(
                <div className={`userAdminControls`}>
                  <h3 style={{ width: `90%`, margin: `0 auto`, textAlign: `center`, fontSize: 22, fontWeight: 900 }} className={`white`}>User Preferences</h3>
                  <div className={`adminControlsContainer`}>
                    {adminFeatures && adminFeatures?.length > 0 && adminFeatures?.map((feat, featIndex) => {
                      if (feat.shown) {
                        return (
                          <div key={featIndex} className={`adminFeature white`}>
                            {feat.feature} <Toggle toggled={feat.enabled} classes={`feat`} toggleFunction={() => setAdminFeatures(prevAdminFeats => prevAdminFeats.map(featr => featr.feature == feat.feature ? ({ ...featr, enabled: !featr.enabled }) : featr))} />
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )}
            />
          </div>
        )}
        {user && (useLegacyProfileEditor && window?.location?.href?.includes(`profile`)) && <input id={user?.id} className={`save`} type="submit" name="authFormSave" style={{padding: 0}} value={`Save`} />}
      </form>
    )}
  </>
}