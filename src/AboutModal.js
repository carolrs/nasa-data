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
          Our APOD feature allows you to discover a new celestial wonder every
          day. Accompanied by detailed explanations, you can learn about our
          universe in a visually striking way.
        </p>
      </Section>
      <Section title="Near Earth Objects (NEO)">
        <p className="crawl">
          The NEO feature provides you with real-time data about objects that
          have recently passed close to Earth. With information like the close
          approach date and the estimated diameter, this feature helps you
          comprehend the activity that occurs in our planet's vicinity.
        </p>
      </Section>
      <Section title="Image Search">
        <p className="crawl">
          Powerful search tool taps into NASA's vast image database, enabling
          you to find stunning visuals of distant galaxies, nebulae, planets,
          and more. Click on an image to view it in greater detail within a
          dedicated modal.
        </p>
      </Section>
    </div>
  </div>
);

export default AboutModal;
