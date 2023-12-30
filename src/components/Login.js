import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { GoogleLogin } from "@react-oauth/google";
import whatsapp_logo from "../images/whatsapp_logo.png";
import "../styles/Login.css";
import { jwtDecode } from "jwt-decode";

import { addUser } from "../service/api.js";

export default function () {
  const { setAccount } = useContext(DataContext);

  const processData = (decoded) => {
    let data = {};
    data.sub = decoded.sub;
    data.email = decoded.email;
    data.email_verified = decoded.email_verified;
    data.picture = decoded.picture;
    data.name = decoded.name;
    data.archived = false;
    data.messsages = [];
    return data;
  };

  const onLoginSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    let processedData = processData(decoded);
    // console.log(processedData);
    setAccount(processedData);
    await addUser(processedData);
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
