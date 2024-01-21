import { useContext, useEffect, useRef, useState } from 'react';
import { StateContext, signUpOrSignIn } from '../pages/_app';
import LoadingSpinner from './LoadingSpinner';

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

export const formatDateFromFirebase = (timestamp) => {
  let date;
  if (typeof timestamp === `number`) {
    date = new Date(timestamp * 1000);
  } else {
    date = new Date(timestamp);
  }
  date.setHours(date.getHours() - 5);
  const options = { weekday: `short`, year: `numeric`, month: `short`, day: `numeric`, hour: `2-digit`, minute: `2-digit`, second: `2-digit`, hour12: true };
  const formattedDate = date.toLocaleString(`en-US`, options);
  return `${formattedDate} EST`;
}

export default function Form(props?: any) {
  const { style } = props;
  const loadedRef = useRef(false);
  const [, setLoaded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const [alertOpen, setAlertOpen] = useState(false);
  const { user, authState, emailField, users, playersLoading } = useContext<any>(StateContext);

  // const resetPassword = (e) => {
  //   let email = (document.querySelector(`.emailAddressField`) as any)?.value;
  //   sendPasswordResetEmail(auth, email)
  //   .then(() => {
  //     toast.success(`Email Sent to ${email}, for resetting your password.`);
  //   })
  //   .catch(error => {
  //     toast.error(`Error snding reset password instructions to ${email}.`);
  //   });
  // }

  // const authForm = (e?: any) => {
  //   e.preventDefault();
  //   let formFields = e.target.children;
  //   let clicked = e?.nativeEvent?.submitter;
  //   let email = formFields?.email?.value ?? `email`;
  //   let password = formFields?.password?.value ?? `password`;

  //   switch(clicked?.value) {
  //     default:
  //       console.log(clicked?.value);
  //       break;
  //     case `Next`:
  //       setEmailField(true);
  //       let userEmails = getActivePlayers(databasePlayers, true, plays).filter(usr => usr?.email).map(usr => usr?.email?.toLowerCase());
  //       if (userEmails.includes(email?.toLowerCase())) {
  //         setAuthState(`Sign In`);
  //       } else {
  //         setAuthState(`Sign Up`);
  //       }
  //       break;
  //     case `Back`:
  //       setUpdates(updates+1);
  //       setAuthState(`Next`);
  //       setEmailField(false);
  //       break;
  //     case `Sign Out`:
  //       if (useDatabase == true) signOut(auth);
  //       setUser(null);
  //       setAuthState(`Next`);
  //       setEmailField(false);
  //       setUpdates(updates+1);
  //       break;
  //     case `Save`:
  //       let emptyFields = [];
  //       let fieldsToUpdate = [];
  //       console.log(`Save`, formFields);
  //       for (let i = 0; i < formFields.length; i++) {
  //         const input = formFields[i];
  //         if (input?.classList?.contains(`userData`)) {
  //           if (input.value === ``) {
  //             emptyFields.push(input?.placeholder);
  //           } else {
  //             fieldsToUpdate.push(input);
  //           }
  //         }
  //       }
  //       if (fieldsToUpdate.length == 0) {
  //         showAlert(`The Form was NOT Saved.`, `You Can Fill`, emptyFields);
  //       } else {
  //         console.log(`Fields To Update`, fieldsToUpdate);
  //       }
  //       break;
  //     case `Sign In`:
  //       if (password == ``) {
  //         showAlert(`Password Required`, <PasswordRequired />, (mobile || window.innerWidth <= 768) ? `88%` : `55%`, (mobile || window.innerWidth <= 768) ? `60%` : `auto`);
  //         return;
  //       } else { // Sign User In
  //         if (useDatabase == true) {
  //           signInWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
  //             let existingUser = createUserFromFirebaseData(userCredential, `Firebase`);
  //             let dbPlayers = getActivePlayers(databasePlayers, true, plays);
  //             let nameToAdd = existingUser?.name;
  //             let lowerCaseName = nameToAdd.toLowerCase();
  //             let playerExists = dbPlayers.length > 0 && (dbPlayers.find(plyr => plyr.email == existingUser.email) || dbPlayers.find(plyr => plyr.name.toLowerCase() == lowerCaseName || plyr.name.toLowerCase().includes(lowerCaseName)));
  //             console.log(`User Signed In`, existingUser);
  //             if (playerExists != null) {
  //               setFocus(false);
  //               setAuthState(`Sign Out`);
  //               setUser(playerExists);
  //               toast.success(`Successfully Signed In`);
  //             } else {
  //               setEmailField(true);
  //               setAuthState(`Sign Up`);
  //             }
  //           }).catch((error) => {
  //             const errorCode = error.code;
  //             const errorMessage = error.message;
  //             if (errorMessage) {
  //               toast.error(renderErrorMessage(errorMessage));
  //               // showAlert(`Error Signing In`, <div className="alertMessage errorMessage loadingMessage">
  //               //   <i style={{color: `var(--smasherscapeYellow)`}} className="fas fa-exclamation-triangle"></i>
  //               //   <h3>Error Signing In</h3>
  //               // </div>, `55%`, `50%`);
  //               console.log(`Error Signing In`, {
  //                 error,
  //                 errorCode,
  //                 errorMessage
  //               });
  //             }
  //             return;
  //           });
  //         }
  //       }
  //       break;
  //     case `Sign Up`:
  //       let name = capitalizeAllWords(email.split(`@`)[0]);
  //       if (password == ``) {
  //         showAlert(`Password Required`, <PasswordRequired />, (mobile || window.innerWidth <= 768) ? `88%` : `55%`, (mobile || window.innerWidth <= 768) ? `60%` : `auto`);
  //         return;
  //       } else {
  //         console.log(`Sign Up Params`, {name, email, password});
  //         let filteredActiveUsers = getActivePlayers(databasePlayers, true, plays);
  //         let usernames = filteredActiveUsers.map(usr => usr?.name || usr?.username);
  //         let lowerCaseUsernames = usernames.map(usr => usr.toLowerCase());
  //         // if (lowerCaseUsernames.includes(name.toLowerCase())) {
  //           // toast.error(`Player name is already taken, Please pick a unique name.`);
  //           // return;
  //         // } else {
  //           if (useDatabase == true) {
  //             createUserWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
  //               let createdFirebaseUser = createUserFromFirebaseData(userCredential, `Firebase`);
  //               if (createdFirebaseUser != null) {
  //                 console.log(`User Signed Up`, createdFirebaseUser);
  //                 let nameToAdd = createdFirebaseUser?.name;
  //                 let namesToAdd = [nameToAdd];
  //                 namesToAdd.forEach((usr, usrIndex) => {
  //                   let currentDateTimeStamp = formatDate(new Date());
  //                   let userPlayerData = createPlayer(usr, usrIndex, databasePlayers, null, lowerCaseUsernames);
  //                   let { uid, email, playerLink, emailVerified, source, type, validSince, lastRefresh, lastSignIn, providerId, operationType } = createdFirebaseUser;
  
  //                   let playerUserData: any = {
  //                     ...userPlayerData,
  //                     uid,
  //                     type,
  //                     email,
  //                     source,
  //                     providerId,
  //                     validSince,
  //                     playerLink,
  //                     lastSignIn,
  //                     lastRefresh,
  //                     operationType,
  //                     emailVerified,
  //                     roles: userPlayerData?.roles,
  //                   };
  
  //                   playerUserData.properties = countPropertiesInObject(playerUserData);
  
  //                   createdFirebaseUser = {
  //                     ...createdFirebaseUser,
  //                     updated: currentDateTimeStamp,
  //                     lastUpdated: currentDateTimeStamp,
  //                     uniqueIndex: playerUserData?.uniqueIndex,
  //                     roles: playerUserData?.roles,
  //                     uuid: playerUserData?.uuid,
  //                     ID: playerUserData?.ID,
  //                     id: playerUserData?.id,
  //                   }
  
  //                   createdFirebaseUser.properties = countPropertiesInObject(createdFirebaseUser);
  //                   let usersAndPlaysState = {player: playerUserData, user: createdFirebaseUser};
  
  //                   addPlayerToDB(usersAndPlaysState?.player);
  //                   dev() && console.log(`User`, usersAndPlaysState);
  //                   setUser(usersAndPlaysState?.user);
  //                   setAuthState(`Sign Out`);
  //                 })
  //               }
  //             }).catch((error) => {
  //               console.log(`Error Signing Up`, error);
  //               const errorMessage = error.message;
  //               console.log({errorMessage});
  //               if (errorMessage) {
  //                 toast.error(renderErrorMessage(errorMessage));
  //                 // showAlert(`Error Signing Up`, <div className="alertMessage errorMessage loadingMessage">
  //                 //   <i style={{color: `var(--smasherscapeYellow)`}} className="fas fa-exclamation-triangle"></i>
  //                 //   <h3>{renderErrorMessage(errorMessage)}</h3>
  //                 // </div>, `55%`, `50%`);                 
  //               }
  //               return;
  //             });
  //           }
  //         // }
  //       }
  //     break;
  //   };
  // }

  const trackKeyDown = () => {
    if (isFocused) {
      const scrollY = window.scrollY; // Capture the current scroll position
      window.onscroll = function () { window.scrollTo(window.scrollX, scrollY); };
    }
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
      <form onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onKeyDown={() => trackKeyDown()} id={props.id} className={`flex authForm ${authState == `Next` ? `Next` : ``} ${emailField == true ? `hasPasswordField` : `noPasswordYet`} ${props.className} ${authState == `Sign Up` || authState == `Sign In` ? `threeInputs` : ``} ${user ? `userSignedIn` : `userSignedOut`}`} style={style}>
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
          <input placeholder="Password" type="password" name="password" autoComplete={`current-password`} />
        )}
        {user && window?.location?.href?.includes(`profile`) && <input id="name" className={`name userData`} placeholder="Name" type="text" name="status" />}
        {user && window?.location?.href?.includes(`profile`) && <input id="status" className={`status userData`} placeholder="Status" type="text" name="status" />}
        {user && window?.location?.href?.includes(`profile`) && <input id="bio" className={`bio userData`} placeholder="About You" type="text" name="bio" />}
        {user && window?.location?.href?.includes(`profile`) && <input id="number" className={`number userData`} placeholder="Favorite Number" type="number" name="number" />}
        {user && window?.location?.href?.includes(`profile`) && <input id="password" className={`editPassword userData`} placeholder="Edit Password" type="password" name="editPassword" autoComplete={`current-password`} />}
        <input title={user ? `Sign Out` : authState} className={`${(user && window?.location?.href?.includes(`profile`) || (authState == `Sign In` || authState == `Sign Up`)) ? `submit half` : `submit full`} ${user ? `userSignedInSubmit` : `userSignedOutSubmit`}`} type="submit" name="authFormSubmit" value={user ? `Sign Out` : authState} />
        {/* {(authState == `Sign In` || authState == `Sign Up`) && <input id={`back`} className={`back`} type="submit" name="authFormBack" value={`Back`} />} */}
        {/* {!user && authState == `Next` && <div title={`${signUpOrSignIn} With Google`} className={`customUserSection`}>
          <GoogleButton type="dark" />
        </div>} */}
        {user && <div title={`Welcome, ${user?.name}`} className={`customUserSection`}>
          {user?.image ? <img alt={user?.email} src={user?.image}  className={`userImage`} /> : <div className={`userCustomAvatar`}>{user?.name?.charAt(0).toUpperCase()}</div>}
          Welcome, {user?.name}
        </div>}
        {user && window?.location?.href?.includes(`profile`) && <input id={user?.id} className={`save`} type="submit" name="authFormSave" style={{padding: 0}} value={`Save`} />}
      </form>
    )}
  </>
}