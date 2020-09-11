import React from "react";
import "../styles/OmniPresentationPage.css";
import PresentationCard from "./PresentationCard";
class OmniPresentationPage extends React.Component {
  render() {
    return (
      <div className="omni-presentation-page-container">
        <div className="presentation-row">
          <div className="presentation-column">
            <PresentationCard />
          </div>
          <div className="presentation-column">
            <PresentationCard />
          </div>
          <div className="presentation-column">
            <PresentationCard />
          </div>
          <div className="presentation-column">
            <PresentationCard />
          </div>
          <div className="presentation-column">
            <PresentationCard />
          </div>
          <div className="presentation-column">
            <PresentationCard />
          </div>
          <div className="presentation-column">
            <PresentationCard />
          </div>
          <div className="presentation-column">
            <PresentationCard />
          </div>
        </div>
      </div>
    );
  }
}

export default OmniPresentationPage;
