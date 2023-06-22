import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import AboutModal from "./AboutModal";
import ContactsModal from "./ContactModal";
import Footer from "./Footer";


const App = () => {
  const[articles, setArticles] = useState([]);
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [page, setPage] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isArtworkModalOpen, setIsArtworkModalOpen] = useState(false);
  const [selectedArtworkGuide, setSelectedArtworkGuide] = useState(null);

  const artworkGuides = {
    "Self-portrait": "Immersive_Van_Gogh_Audio_Guide.mp3",
    
  };
  
  const handleArtworkClick = async (artwork) => {
    setSelectedArtwork(artwork);
    setSelectedArtworkGuide(artworkGuides[artwork.title]); 
    setIsArtworkModalOpen(true);
  };
  
  useEffect(() => {
    setTimeout(() => {
      setShowArticles(true);
    }, 1000);
  }, []);

  const ScrollToTopButton = ({ onClick }) => (
    <div className="scroll-to-top-card">
      <button className="scroll-to-top" onClick={onClick}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldShowScrollToTop = scrollTop > 500;
      setShowScrollToTop(shouldShowScrollToTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [backgroundImage, setBackgroundImage] = useState(
    "https://wallpaperaccess.com/full/1363480.jpg"
  );
  
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch(
          `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.REACT_APP_RIJKSMUSEUM_API_KEY}&q=${term}`

        );
        const artworks = await res.json();
        setArticles(artworks.artObjects);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtworks();
  }, [term, page]);
  


  useEffect(() => {
    const setDarkModeClass = (darkMode) => {
      if (darkMode) {
        document.body.classList.add("dark-mode");
        document.querySelectorAll("article").forEach((article) => {
          article.classList.add("bg-black");
          article.classList.remove("bg-white");
          article.classList.add("dark-mode-article");
          article.querySelector("h2").classList.add("color-white");
        });
      } else {
        document.body.classList.remove("dark-mode");
        document.querySelectorAll("article").forEach((article) => {
          article.classList.remove("bg-black");
          article.classList.add("bg-white");
          article.classList.remove("dark-mode-article");
          article.querySelector("h2").classList.remove("color-white");
        });
      }
    };

    setDarkModeClass(isDarkMode);
  }, [isDarkMode]);
 
  return (
    
    <div>
      <header className="py-5 px-10 bg-black flex justify-between items-center">
        <h1 className="text-white">Art search</h1>
        <nav>
          <ul className="flex space-x-10 text-white">
            <li onClick={() => setIsAboutOpen(true)}>About</li>
            <li onClick={() => setIsContactsOpen(true)}>Contact</li>
            <li onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </li>
            <li>
              <div className="overlay px-5">
                <SearchForm searchText={(text) => setTerm(text)} />
              </div>
              
            </li>
          </ul>
        </nav>
      </header>
      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
      {isContactsOpen && (
        <ContactsModal onClose={() => setIsContactsOpen(false)} />
      )}
  
      <div
        className="showcase"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
  
  <section className="section-container grid grid-cols-1 gap-10 px-5 pt-10 pb-20">
  {articles.map((artwork, index) => {
    const {
      title,
      longTitle,
      webImage,
      objectNumber,
      description,
    } = artwork;

    const imageUrl = webImage
      ? webImage.url
      : "https://via.placeholder.com/150";

    return (
      <article
        key={objectNumber}
        className="bg-white py-10 px-5 rounded-lg lg:w-9/12 lg:mx-auto"
      >
        <div className="moveArtwork">

        <img 
  src={imageUrl}
  alt={title}
  onClick={() => handleArtworkClick(artwork)}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/150";
  }}
  className="artwork-image rotate"

/>
{isArtworkModalOpen && selectedArtwork && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setIsArtworkModalOpen(false)}>&times;</span>
      <h2>{selectedArtwork.title}</h2>
      <img src={selectedArtwork.webImage.url} alt={selectedArtwork.title} />
      <p>{selectedArtwork.description || 'There is no description available for this work of art.'}</p>
      {selectedArtworkGuide && (
        <div>
          <h3>Audio Guide</h3>
          <audio controls src={selectedArtworkGuide} />
        </div>
      )}
    </div>
  </div>
)}
        </div>

        <h2 className="font-bold text-3xl mb-5 lg:text-4xl">{title}</h2>
        <p className="text-lg">{longTitle}</p>
      </article>
    );
  })}
</section>
  
      {showScrollToTop && (
        <ScrollToTopButton onClick={handleScrollToTop} />
      )}
  
      <img 
        className="corner-image" 
        src="https://api-www.louvre.fr/sites/default/files/2021-01/aphrodite-dite-venus-d-arles.jpg" 
        alt="Corner Artwork"
      />
  
      <Footer className="bg-black text-white" />
    </div>
  );
  
        
};
export default App;