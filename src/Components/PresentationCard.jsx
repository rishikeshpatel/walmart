import React from "react";
import "../styles/PresentationCard.css";
import ppt from "../ppt.jpg";

function PresentationCard(props) {
  return (
    <div className="card" id="card">
      <div className="image-container">
        <img src={ppt} alt="Avatar" style={{ width: "100%" }} />
        <div className="bottom-left">
          <b>{props.presentationTitle}</b>
        </div>
      </div>

      <div className="details-container">
        <p>No of Scenes <span className="badge">{props.sceneCount}</span></p>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default PresentationCard;
