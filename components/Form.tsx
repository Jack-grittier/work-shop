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

export default function Form(props?: any) {
  const { style } = props;
  const loadedRef = useRef(false);
  const [, setLoaded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { user, authState, emailField, users, playersLoading } = useContext<any>(StateContext);

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