import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";
import { Card, Filter, Navbar, Pagination, Search } from "./components/index";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import CardDetails from "./components/Card/CardDetails";

const Home = () => {
  let [fetchedData, updateFetchedData] = useState([]);
  let { info, results } = fetchedData;
  let [pageNumber, updatePageNumber] = useState(1);
  let [search, setSearch] = useState("");
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");

  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(() => {
    (async function() {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
    }, [api]);
  
  return (
    <div className="App">
      <h1 className="text-center mb-3">Characters</h1>
      <div className="container">
        <div className="row">
          <h1 className="text-center mb-3">Characters</h1>
          <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
          <Filter
            pageNumber={pageNumber}
            status={status}
            updateStatus={updateStatus}
            updateGender={updateGender}
            updateSpecies={updateSpecies}
            updatePageNumber={updatePageNumber}
          />
          <div className="col-lg-8 col-12">
            <div className="row">
              <Card page="/" results={results} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/rickandmortywiki" element={<Home />} />
        <Route path="/rickandmortywiki/:id" element={<CardDetails />} />

        <Route path="/rickandmortywiki/episodes" element={<Episodes />} />
        <Route path="/rickandmortywiki/episodes/:id" element={<CardDetails />} />

        <Route path="/rickandmortywiki/location" element={<Location />} />
        <Route path="/rickandmortywiki/location/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
