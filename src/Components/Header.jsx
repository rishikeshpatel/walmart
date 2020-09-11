import React from "react";
import "../styles/Header.css";
import sap2 from "../sap2.png";
function Header(props) {
  return (
    <div className="header">
      <a className="appName">
        {" "}
        <img
          src={sap2}
          alt="HTML5 Icon"
          style={{ width: "3rem", height: "3rem" }}
        ></img>
        IX OMNI
      </a>
      {props.isLoggedIn && (
        <button
          type="button"
          className="link"
          data-qa="forgot-password-link"
          onClick={props.onLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Header;
