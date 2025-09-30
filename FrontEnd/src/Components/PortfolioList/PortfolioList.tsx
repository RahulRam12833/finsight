import React from "react";
import PortfolioCard from "../PortfolioCard/PortfolioCard";

interface Props {
  portfolioData: string[];
}

const PortfolioList = ({ portfolioData }: Props) => {
  return (
    <>
      <h3>My Portfolio</h3>
      {portfolioData &&
        portfolioData.map((portfolioItem) => {
          return <PortfolioCard portfolioItem={portfolioItem} />;
        })}
    </>
  );
};

export default PortfolioList;
