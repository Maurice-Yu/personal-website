import "../css/Home.css";
import { redirect } from "react-router-dom";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';

export const Home = () => {
  const [show, setShow] = useState(true); //is default home page showing?
  const [info, setInfo] = useState({title:
    "test title",
    description:"test desc",
    pic:"test pic",
    picture:"test picture",
    synonyms:"test syn",
    });
//const navigate = useNavigate();
const win= window.sessionStorage;
const initialdata = {results:
[{title:
"test",
description:"test",
pic:"test",
description:"test",
}]
}
win.setItem("animeList",JSON.stringify(initialdata));
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

  function LeftColumn({queryMyList}) {
    return (
      <div className="left-column">
        <button className="button" onClick = {()=>queryMyList()}>get my list</button>
        <button className="button">Button 2</button>
        <button className="button">Button 3</button>
        <button className="button">Button 4</button>
        <button className="button">Button 5</button>
      </div>
    );
  }
  function SearchBar({ queryDB }) {
    const [query, setQuery] = useState('Bungaku');
  
    function handleQueryChange(event) {
      setQuery(event.target.value);
    }
  
    return (
      <>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          name="search_query"
          required
          aria-label="Search"
          onChange={handleQueryChange}
          value={query}
        />
        <button className="btn btn-outline-success" onClick={() => {queryDB(query); setShow(true)}}>
          Search
        </button>
      </>
    );
  }

  function NavToInfo(info) {
    setInfo(info)
    setShow(false)
  }

  
  function FilterButton({ queryDBtag, filter}) {
    //Have a <button> tag and an associated query that searches by that filter
    return(
      <button className="button search-filter-button" onClick={() => {console.log(filter); queryDBtag(filter); setShow(true)}}>{filter}</button>
    )
  }
  function SearchFilters({ queryDBtag }) {
    const tags = ["Action", "Adventure", "Comedy", "Coming of Life", "Drama", "Fantasy",
                "Isekai", "Mystery", "Romance", "School", "Science Fiction", "Seinin", "Shonen",
                "Slice of Life"];
    //console.log(tags);
    //console.log(tags.length);
    //tags.forEach((t) => console.log(t))
    return (
      <div className="search-buttons">
        {
          tags.map((t) => (
            <FilterButton queryDBtag={queryDBtag} filter={t} />
          ))
          
        }{
        //<button className="button" >Filter 1</button>
        //<button className="button">Filter 2</button>
        //<button className="button">Filter 3</button>
        /* Add more filter buttons if needed */}
      </div>
    );
  }
  
  function AnimeEntry({ info, title, description,img,synonyms }) {
   console.log(img);
   console.log(description);
    return (
      <div className="anime-entry" >
        <input type="checkbox" className="checkbox" value={info} />
        <div className="title" >{title}</div>
        <div className="description">{description}</div>
        <div ><img src={img} alt="notworking" onClick={() => NavToInfo(info)}></img></div>
        <div >{synonyms}</div>
        
      </div>
    );
  }
  function AnimeInfo() {
    console.log(info);
    return(
      <div className="anime-info">
        <h1>{info.title}</h1>
        <div className="anime-info-meat">
          <div class="anime-info-image">
            <img src={info.picture} alt="notworking"></img>
          </div>
          <div className="ani-info-data">
            <table>
              <tbody>
                <tr className="ani-info-description">{info.description}</tr>
                <tr className="ani-info-tags">{info.tags}</tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  function AnimeList({ animeListData }) {
    const addToList =(payload)=> {
      fetch('http://127.0.0.1:8000/users/addToList/', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
        },
        body: JSON.stringify({"payload": payload,"username": win.getItem("un")})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
    }
    if (animeListData) {
      
      return (
        <div className="anime-list">
          {animeListData.results.map((entry, index) => (
          <div>
            <AnimeEntry key={index} info={entry} title={entry.title} description={entry.description} img={entry.picture} synonyms={entry.synonyms}/>
          <button onClick={() =>addToList(entry)}>add to list</button>
          </div>
          ))}
        </div>
      );
    } else {
      return <p>No anime entries available.</p>;
    }
  }
  function MainContent({ animeListData, queryDB, queryDBtag,queryMyList }) {
    return (
      <div className="main-content">
        <div style={{ display: 'flex', flex: 2 }}>
          <LeftColumn queryDB={queryDB} queryMyList={queryMyList}/>
          <div className="anime-list-container">
            {
              show ? <AnimeList animeListData={animeListData} /> : <AnimeInfo />
            }
          </div>
          <RightColumn queryDB={queryDB} queryDBtag={queryDBtag} />
        </div>
      </div>
    );
  }
    function RightColumn({ queryDB, queryDBtag }) {
      
      return (
        <div className="right-column">
          <SearchBar queryDB={queryDB} />
          <SearchFilters queryDBtag={queryDBtag} />
        </div>
      );
    }  

//export const Home = () => {
  const [animeListData, setAnimeListData] = useState(initialdata);
  //const [show, setShow] = useState(true); //is default home page showing?
  function queryDB(query) {
    fetch('http://127.0.0.1:8000/search/search/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify({"searchQ": query})
    })
    .then(response => response.json())
    .then(data => {
      console.log(query);
      console.log(data);
      setAnimeListData(data); // Update animeListData with new data
      win.setItem("animeList", JSON.stringify(data)); // Update session storage
    });
  }
  function queryDBtag(query) {
    console.log("query db tag");
    fetch('http://127.0.0.1:8000/search/searchTag/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify({"searchQ": query})
    })
    .then(response => response.json())
    .then(data => {
      console.log(query);
      console.log(data);
      setAnimeListData(data); // Update animeListData with new data
      win.setItem("animeList", JSON.stringify(data)); // Update session storage
    });
  }
  function queryMyList() {
    fetch('http://127.0.0.1:8000/users/getList/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify({"username": win.getItem("un")})
    })
    .then(response => response.json())
    .then(data => {
       // Update animeListData with new data
       console.log("printing mylist" +data)
       console.log(data.results);
       setAnimeListData(data);
      win.setItem("animeList", JSON.stringify(data)); // Update session storage
    });
  }
  return (
    <div className="flex-container">
      <Header />
        {
          //show ? <MainContent animeListData={animeListData} queryDB={queryDB} queryMyList={queryMyList} /> : <AnimeInfo />
        }
        <MainContent animeListData={animeListData} queryDB={queryDB} queryDBtag={queryDBtag} queryMyList={queryMyList} />
      <Footer />
    </div>
  );
}