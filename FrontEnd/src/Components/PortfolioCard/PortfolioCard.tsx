import React from "react";

interface Props {
  portfolioItem: string;
}

const PortfolioCard = ({ portfolioItem }: Props) => {
  return (
    <>
      <h2>{portfolioItem}</h2>
      <button>X</button>
    </>
  );
};
export default PortfolioCard;
