import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { GoogleLogin } from "@react-oauth/google";
import whatsapp_logo from "../images/whatsapp_logo.png";
import "../styles/Login.css";
import { jwtDecode } from "jwt-decode";


export default function () {
  const { setAccount } = useContext(DataContext);

  const onLoginSuccess = (res) => {
    const decoded = jwtDecode(res.credential);
    setAccount(decoded);
    console.log(decoded)
  };

  const onLoginError = (res) => {
    console.log("Login Failed !!! ", res);
  };

  return (
    <div className="login">
      <div className="logo_container">
        <img src={whatsapp_logo} />
        <GoogleLogin
          className="login_button"
          onSuccess={onLoginSuccess}
          onError={onLoginError}
        />
      </div>
    </div>
  );
}
