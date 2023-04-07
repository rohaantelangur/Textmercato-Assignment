import React from "react";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export const Rating = ({ stars }) => {
  stars = stars.split("/")[0]
  let starpattern = Array.from({ length: 5 }, (el, ind) => {
    let half = ind + 0.5;
    return (
      <span key={ind} as="span">
        {stars >= ind + 1 ? (
          <FaStar style={{ color: "#FFD700" }} />
        ) : stars >= half ? (
          <FaStarHalfAlt style={{ color: "#FFD700" }} />
        ) : (
          <AiOutlineStar style={{ color: "#FFD700" }} />
        )}
      </span>
    );
  });

  return (
    <>
      <p as="span" display={"flex"} alignItems="center">
        {starpattern}({stars})
      </p>
    </>
  );
};