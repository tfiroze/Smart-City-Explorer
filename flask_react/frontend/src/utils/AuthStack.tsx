import { useEffect, useState } from "react";
import { AuthContext, IAuthenticationInfo } from "./AuthContext";
import { Routes, useNavigate } from "react-router-dom";
import { Router } from "./Router";

export const AuthStack = () => {
  const [authInfo, setAuthInfo] = useState<IAuthenticationInfo>({
    authenticated: false,
    userInfo: null,
    token: null,
    authenticate: (cond, info) => {
      if (cond) {
        setAuthInfo((prevAuthInfo) => ({
          ...prevAuthInfo,
          authenticated: true,
          userInfo: info,
        }));
      } else {
        setAuthInfo((prevAuthInfo) => ({
          ...prevAuthInfo,
          authenticated: false,
          userInfo: null,
        }));
      }
    },
  });

  const authContextValue: IAuthenticationInfo = {
    ...authInfo,
  };
  useEffect(() => {
    const token = getCookie('token');
    checkLoginStatus(token)
  }, []);

  useEffect(() => {
  }, [authInfo]);

  function getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  function checkLoginStatus(accessToken: string | null) {
    if (accessToken !== null) {
      const userUid = localStorage.getItem('user_id');
      const email = localStorage.getItem('email');
      const first_name = localStorage.getItem('first_name');
      const last_name = localStorage.getItem('surname');

      authInfo.authenticate(true, {
        first_name: first_name,
        surname: last_name,
        email: email,
        user_id: userUid,
      });
    } else {
      authInfo.authenticate(false)
    }
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router auth={authContextValue.authenticated} />
    </AuthContext.Provider>
  );
};
