import React from "react";

const Section = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="section">
      <h3 onClick={() => setIsOpen(!isOpen)}>{title}</h3>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const AboutModal = ({ onClose }) => (
  <div className="about">
    <br />
    <div className="star-wars">
      <Section title="Astronomy Picture of the Day (APOD)">
        <p className="crawl">
          APOD feature allows you to discover a new celestial wonder every
          day. Accompanied by detailed explanations, you can learn about our
          universe in a visually striking way.
        </p>
      </Section>
      <Section title="EONET">
        <p className="crawl">
          The Earth Observatory Natural Event Tracker (EONET) is a repository of
          metadata about natural events around the world. It's maintained by
          NASA's Earth Science Division. EONET events are categorized into
          several types such as wildfires, severe storms, floods, and more.
        </p>
      </Section>
      <Section title="Video Search">
        <p className="crawl">
          Powerful search tool taps into NASA's vast video database, enabling
          you to find stunning visuals of distant galaxies, nebulae, planets,
          and more. Click on a video to view it in greater detail within a
          dedicated modal.
        </p>
      </Section>
      <Section title="Mars Weather">
        <p className="crawl">
          Mars Weather feature allows you to view the latest weather report from
          the red planet. Data is provided by NASA's InSight: Mars Weather
          Service API.
          </p>
          </Section>
    </div>
  </div>
);

export default AboutModal;
