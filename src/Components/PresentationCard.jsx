import React from "react";
import "../styles/PresentationCard.css";
import ppt from "../ppt.jpg";

function PresentationCard(props) {
  return (
    <div className="card" id="card">
      <div className="image-container">
        <img src={ppt} alt="Avatar" style={{ width: "100%" }} />
        <div className="bottom-left">Presentation Title</div>
      </div>

      <div className="details-container">
        <p>
          No of Scenes
        </p>
        <p>Presentation Description...</p>
      </div>
    </div>
  );
}

export default PresentationCard;
