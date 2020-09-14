import React from "react";
import "../styles/OmniPresentationPage.css";
import PresentationCard from "./PresentationCard";
class OmniPresentationPage extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="omni-presentation-page-container">
        <div className="presentation-row">
          {data && data.map((param) => {
              return (
                <div className="presentation-column" key={param.id}>
                  <PresentationCard
                    presentationTitle={param.title}
                    description={param.description}
                    sceneCount={param.presentationScenes.length}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default OmniPresentationPage;
