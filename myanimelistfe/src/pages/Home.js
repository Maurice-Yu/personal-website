import "../css/Home.css";
function Header() {
    return (
      <header>
        <h1>Welcome to Your Website</h1>
      </header>
    );
  }
  function Footer() {
    return (
      <footer>
        <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
      </footer>
    );
  }

  function LeftColumn() {
    return (
      <div className="left-column">
        <button className="button">Button 1</button>
        <button className="button">Button 2</button>
        <button className="button">Button 3</button>
        <button className="button">Button 4</button>
        <button className="button">Button 5</button>
      </div>
    );
  }
  function SearchBar() {
    return (
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
    );
  }
  
  function SearchFilters() {
    return (
      <div className="search-buttons">
        <button className="button">Filter 1</button>
        <button className="button">Filter 2</button>
        <button className="button">Filter 3</button>
        {/* Add more filter buttons if needed */}
      </div>
    );
  }
  function AnimeEntry({ title, description }) {
    return (
      <div className="anime-entry">
        <input type="checkbox" className="checkbox" />
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </div>
    );
  }
  function AnimeList() {
    const animeEntries = [
      { title: 'Anime 1', description: 'Description for Anime 1' },
      { title: 'Anime 2', description: 'Description for Anime 2' },
      { title: 'Anime 3', description: 'Description for Anime 3' },
      { title: 'Anime 1', description: 'Description for Anime 1' },
      { title: 'Anime 2', description: 'Description for Anime 2' },
      { title: 'Anime 3', description: 'Description for Anime 3' },
      { title: 'Anime 1', description: 'Description for Anime 1' },
      { title: 'Anime 2', description: 'Description for Anime 2' },
      { title: 'Anime 3', description: 'Description for Anime 3' },
      { title: 'Anime 1', description: 'Description for Anime 1' },
      { title: 'Anime 2', description: 'Description for Anime 2' },
      { title: 'Anime 3', description: 'Description for Anime 3' },
      { title: 'Anime 1', description: 'Description for Anime 1' },
      { title: 'Anime 2', description: 'Description for Anime 2' },
      { title: 'Anime 3', description: 'Description for Anime 3' },
      { title: 'Anime 1', description: 'Description for Anime 1' },
      { title: 'Anime 2', description: 'Description for Anime 2' },
      { title: 'Anime 3', description: 'Description for Anime 3' },
      { title: 'Anime 1', description: 'Description for Anime 1' },
      { title: 'Anime 2', description: 'Description for Anime 2' },
      { title: 'Anime 3', description: 'Description for Anime 3' },
      { title: 'Anime 1', description: 'Description for Anime 1' },
      { title: 'Anime 2', description: 'Description for Anime 2' },
      { title: 'Anime 3', description: 'Description for Anime 3' },
      { title: 'Anime 1', description: 'Description for Anime 1' },
      { title: 'Anime 2', description: 'Description for Anime 2' },
      { title: 'Anime 3', description: 'Description for Anime 3' },
      // Add more anime entries as needed
    ];
  
    return (
      <div className="anime-list">
        {animeEntries.map((entry, index) => (
          <AnimeEntry key={index} title={entry.title} description={entry.description} />
        ))}
      </div>
    );
  }
  function MainContent() {
    return (
        <div className="main-content">
          <div style={{ display: 'flex', flex: 2 }}>
            <LeftColumn />
            <div className="anime-list-container">
              <AnimeList />
            </div>
            <RightColumn />
          </div>
        </div>
      );
    }
  function RightColumn() {
    return (
      <div className="right-column">
        <SearchBar />
        <SearchFilters />
      </div>
    );
  }  
  

  
export const Home = () =>
{
    return (
    
        <div className="flex-container">
        <Header />
        <MainContent />
        <Footer />
      </div>
    
        );
}