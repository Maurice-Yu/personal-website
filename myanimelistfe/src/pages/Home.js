import "../css/Home.css";
import { redirect } from "react-router-dom";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';

export const Home = () => {
  const [lastQuery, setLastQuery] = useState('Bungaku');
  const [tagSearch, setTagSearch] = useState(false);
  const [show, setShow] = useState(true); //is default home page showing?
  const [page, setPage] = useState(0); //Which page are we on?
  const [numPages, setNumPages] = useState(1);
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
[[{title:
"test",
description:"test",
pic:"test",
description:"test",
}]]
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
  function SearchBar({ queryDB, queryNumItemsTitle }) {
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
        <button className="btn btn-outline-success" onClick={() => {queryNumItemsTitle(query); setPage(0); setTagSearch(false); setLastQuery(query); queryDB(query); setShow(true)}}>
          Search
        </button>
      </>
    );
  }

  function NavToInfo(info) {
    setInfo(info)
    setShow(false)
  }

  
  function FilterButton({ queryDBtag, queryNumItemsTag, filter}) {
    //Have a <button> tag and an associated query that searches by that filter
    return(
      <button className="button search-filter-button" onClick={() => {console.log(filter); queryNumItemsTag(filter); setPage(0); setTagSearch(true); setLastQuery(filter); queryDBtag(filter); setShow(true)}}>{filter}</button>
    )
  }
  function SearchFilters({ queryDBtag, queryNumItemsTag }) {
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
            <FilterButton queryDBtag={queryDBtag} queryNumItemsTag={queryNumItemsTag} filter={t} />
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
    const deleteFromList =(payload)=> {
      fetch('http://127.0.0.1:8000/users/deleteFromList/', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
        },
        body: JSON.stringify({"payload": payload,"username": win.getItem("un")})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(payload);
      });
    }
    const prevPage = () => {
      //prev page functionality
      console.log("old page: " + page);
      var pageChanged = Math.max(page - 1, 0) != page;
      setPage(Math.max(page - 1, 0));
      console.log("new page: " + page);
      if (pageChanged) {tagSearch ? queryDBtag(lastQuery) : queryDB(lastQuery);}
    }
    const nextPage = () => {
      //next page functionality
      console.log("old page: " + page);
      var pageChanged = Math.min(page + 1, numPages - 1) != page;
      //var pageChanged = Math.min(page + 1, animeListData.results.length - 1) != page;
      setPage(Math.min(page + 1, numPages - 1));
      //setPage(Math.min(page + 1, animeListData.results.length - 1));
      console.log("new page: " + page);
      if (pageChanged) {tagSearch ? queryDBtag(lastQuery) : queryDB(lastQuery);}
    }
    if (animeListData) {
      var data = animeListData.results[0];
      //console.log(animeListData);
      //console.log(data);
      
      return (
        <div className="anime-list">
          <button onClick = {() => prevPage()}> Previous Page </button>
          <button onClick = {() => nextPage()}> Next Page </button>
          {data.map((entry, index) => (
          <div>
            <AnimeEntry key={index} info={entry} title={entry.title} description={entry.description} img={entry.picture} synonyms={entry.synonyms}/>
          <button onClick={() =>addToList(entry)}>add to list</button>
          <button onClick={() =>deleteFromList(entry.id)}>delete</button>
          </div>
          ))}
        </div>
      );
    } else {
      return <p>No anime entries available.</p>;
    }
  }
  function MainContent({ animeListData, queryDB, queryDBtag, queryMyList }) {
    return (
      <div className="main-content">
        <div style={{ display: 'flex', flex: 2 }}>
          <LeftColumn queryDB={queryDB} queryMyList={queryMyList}/>
          <div className="anime-list-container">
            {
              show ? <AnimeList animeListData={animeListData} /> : <AnimeInfo />
            }
          </div>
          <RightColumn queryDB={queryDB} queryDBtag={queryDBtag}/>
        </div>
      </div>
    );
  }
    function RightColumn({ queryDB }) {
      
      return (
        <div className="right-column">
          <SearchBar queryDB={queryDB} queryNumItemsTitle={queryNumItemsTitle} />
          <SearchFilters queryDBtag={queryDBtag} queryNumItemsTag={queryNumItemsTag} />
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
      body: JSON.stringify({"searchQ": query, "page": page})
    })
    .then(response => response.json())
    .then(data => {
      console.log(query);
      console.log(data);
      console.log(numPages);
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
      body: JSON.stringify({"searchQ": query, "page": page})
    })
    .then(response => response.json())
    .then(data => {
      console.log(query);
      console.log(data);
      console.log(numPages);
      setAnimeListData(data); // Update animeListData with new data
      win.setItem("animeList", JSON.stringify(data)); // Update session storage
    });
  }
  function queryNumItemsTitle(query) {
    console.log("query num items");
    fetch('http://127.0.0.1:8000/search/numItemsTitle/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify({"searchQ": query})
    })
    .then(response => response.json())
    .then(data => {
      console.log("result:");
      console.log(query);
      console.log(data);
      setNumPages(Math.ceil(data.results / 5));
      console.log(numPages);
      //setAnimeListData(data); // Update animeListData with new data
      //win.setItem("animeList", JSON.stringify(data)); // Update session storage
    });
  }
  function queryNumItemsTag(query) {
    console.log("query num items");
    fetch('http://127.0.0.1:8000/search/numItemsTag/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify({"searchQ": query})
    })
    .then(response => response.json()) 
    .then(data => {
      console.log("result:");
      console.log(query);
      console.log(data);
      setNumPages(Math.ceil(data.results / 5));
      console.log(numPages);
      //setAnimeListData(data); // Update animeListData with new data
      //win.setItem("animeList", JSON.stringify(data)); // Update session storage
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