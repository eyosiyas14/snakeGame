import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "./Axios";
import requests from "./Request";
function Banner() {
  const [movie, setMovie] = useState([]);
  function truncate(str) {
    return str.length > 150 ? str.substring(0, 150) + "..." : str;
  }
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData()
  }, []);
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
        backgroundSize: "cover",

      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__discription">
          {truncate(`${movie.overview}`)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
