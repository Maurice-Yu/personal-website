/**
 * Please ignore this file for now.
 * It currently serves no purpose.
 */


import "../css/Home.css";
import { redirect } from "react-router-dom";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';

export const AnimeInfo = () =>
{
const navigate = useNavigate();
const win= window.sessionStorage;
const entry = win.currAnime;
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
        <button className="btn btn-outline-success" onClick={() => queryDB(query)}>
          Search
        </button>
      </>
    );
  }
  
  function SearchFilters( ) {

    return (
      <div className="search-buttons">
        <button className="button" >Filter 1</button>
        <button className="button">Filter 2</button>
        <button className="button">Filter 3</button>
        {/* Add more filter buttons if needed */}
      </div>
    );
  }
  function AnimeEntry({ info, title, description,img,synonyms }) {
   console.log(img);
   console.log(description);
    return (
      <div className="anime-entry">
        
        
      </div>
    );
  }
  function AnimeInfo({ info }) {
    //////////////////////////////////////////////////////////////////
    if (info) {
      return (
        <div className="anime-info">
          <input type="checkbox" className="checkbox" />
          <div className="title" >{info.title}</div>
          <div className="description">{info.description}</div>
          <div ><img src={info.img} alt="notworking" ></img></div>
          <div >{info.synonyms}</div>
        </div>
      );
    } else {
      return <p>No anime entries available.</p>;
    }
  }
  function MainContent({ entry, queryDB,queryMyList }) {
    return (
      <div className="main-content">
        <div style={{ display: 'flex', flex: 2 }}>
          <LeftColumn queryDB={queryDB} queryMyList={queryMyList}/>
          <div className="anime-info-container">
            <AnimeInfo info={entry} />
          </div>
          <RightColumn queryDB={queryDB} />
        </div>
      </div>
    );
  }
    function RightColumn({ queryDB }) {
      return (
        <div className="right-column">
          <SearchBar queryDB={queryDB} />
          <SearchFilters />
        </div>
      );
    }  
  

  

  
  const [animeListData, setAnimeListData] = useState(initialdata);
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
       setAnimeListData(data);
      win.setItem("animeList", JSON.stringify(data)); // Update session storage
    });
  }
  return (
    <div className="flex-container">
      <Header />
      <MainContent animeListData={animeListData} queryDB={queryDB} queryMyList={queryMyList} />
      <Footer />
    </div>
  );
}