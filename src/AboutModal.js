import React from 'react';

const AboutModal = ({ onClose }) => (
    <div className="about">
        <h2 className="font-bold  text-2xl mb-4 lg:text-4xl">
            About the App
        </h2>
        <div className="star-wars">
            <p className="crawl">
                This app is a visual representation of our solar system,
                showcasing the orbits and rotations of the planets around the Sun.
                It creates an engaging and interactive experience by animating the planets
                in their respective orbits. Users can observe the planets' movements
                and learn about their characteristics and features.
                The app offers a visually captivating way to explore the solar system
                and deepen one's understanding of planetary motion.
                Whether for educational purposes or simply for enjoyment,
                this app provides an immersive journey through our celestial neighborhood.
            </p>
        </div>
    </div>
);

export default AboutModal;
