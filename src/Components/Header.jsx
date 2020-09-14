import React from "react";
import "../styles/Header.css";
import sap2 from "../sap2.png";
function Header(props) {
  return (
    <div className="header" style={props.isLoggedIn ? {backgroundColor:"#2d2b2b", color:"white"} : {backgroundColor:"white"}}>
      <a className="appName">
        {" "}
        {!props.isLoggedIn && <img
          src={sap2}
          alt="HTML5 Icon"
          style={{ width: "3rem", height: "3rem" }}
        ></img>}
        <span style={!props.isLoggedIn ? {color:"#0f152e"} : {color:"#f78244"}}>IX </span>&nbsp; <span style={!props.isLoggedIn ? {color:"#0f152e"} : {color:"white"}}>OMNI</span>
      </a>
      {props.isLoggedIn && (
        <div className="user-details">
          <p> <b>{props.userData.firstName +" "+ props.userData.lastName}</b></p>
          <button
            type="button"
            className="link"
            data-qa="forgot-password-link"
            onClick={props.onLogout}
          >
            Logout
          </button>
          
        </div>
      )}
    </div>
  );
}

export default Header;
