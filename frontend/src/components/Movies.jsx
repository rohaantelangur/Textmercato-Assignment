import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "./Rating";
import { fetchCryto } from "../Redux/cryptoSlice";

const Movies = () => {
  const movies = useSelector((state) => state);
//   console.log(movies);

  const [visibility, setvisibility] = useState(true);
  const [label, setlabel] = useState("");
  const [shortlist, setshortlist] = useState(true);

  const colorCondition = (movie) => {
    var color = ""; // Default color

    if (movie.isVisible === "TRUE" && movie.isShortlisted === "TRUE") {
      color = "blue";
    } else if (movie.isVisible === "TRUE" && movie.isShortlisted === "FALSE") {
      color = "orange";
    } else if (movie.isVisible === "FALSE" && movie.isShortlisted === "FALSE") {
      color = "yellow";
    } else if (movie.isVisible === "FALSE" && movie.isShortlisted === "TRUE") {
      color = "black";
    }
    console.log(color);
    return color;
  };
  const Dispatch = useDispatch();
  
  useEffect(() => {
  console.log({label,shortlisted:shortlist,visible:shortlist});
  Dispatch(fetchCryto({label,shortlisted:shortlist,visible:shortlist}))
  }, [visibility,label,shortlist])
  

  return (
    <div className="main-movies">
      <div className="movies-controllers">
        <button
          onClick={() => {
            setvisibility(!visibility);
          }}
          className="movies-visible-btn button-20"
        >
          Visible {visibility?"NO":"OFF"}
        </button>
        <select
          className="movies-dropdown"
          onChange={(e) => {
            setlabel(e.target.value);
          }}
          name=""
          id=""
        >
          <option value="">All</option>
          <option value="TOP 10">TOP 10</option>
          <option value="POPULAR">POPULAR</option>
          <option value="NEW">NEW</option>
        </select>
        <button
          onClick={() => {
            setshortlist(!shortlist);
          }}
          className="movies-shortlist-btn button-20"
        >
          Short Listed {shortlist?"NO":"OFF"}
        </button>
      </div>
      {!movies.loading &&
      <div className="movies-grids">
        {movies?.data?.map((movie, index) => (
          <div key={index} className={`single-movie ${colorCondition(movie)}`}>
            <img src={movie.img} alt="" className="movie-image" />
            <div className="movie-flex">
              <div className="single-movie-title">{movie.title}</div>
              <div className="single-movie-des">{movie.desc}</div>
              <div className="single-movie-rating">
                <Rating stars={movie.rating[2].score} />
              </div>
            </div>
          </div>
        ))}
      </div>
      }
      {movies.loading &&
      <div className="backround-color">
      <div className="lds-dual-ring"></div>
      </div>
      }
    </div>
  );
};

export default Movies;
