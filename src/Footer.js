const Footer = () => {
  return (
    <footer className="bg-black text-white  items-top">
      <p>&copy; {new Date().getFullYear()} Art Search</p>
      <img
        src="https://thumbs.dreamstime.com/b/mediterranean-culture-ancient-greece-mythology-greek-painting-pottery-art-scene-banner-144047143.jpg?w=1600"
        alt="Comic strip"
        className="w-full object-contain h-60"
      />
    </footer>
  );
};

export default Footer;
