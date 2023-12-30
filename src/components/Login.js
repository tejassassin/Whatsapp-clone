import React, { useContext } from "react";
import "../styles/Login.css";
import { jwtDecode } from "jwt-decode";

import { GoogleLogin } from "@react-oauth/google";
import { DataContext } from "../context/DataProvider";

export default function Login() {
  const { setAccount } = useContext(DataContext);

  return (
    <div className="login_container">
      <div className="login_button">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);

            console.log(decoded);

            setAccount(decoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      ;
    </div>
  );
}
