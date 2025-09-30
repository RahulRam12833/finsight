import React from "react";
import PortfolioCard from "../PortfolioCard/PortfolioCard";

interface Props {
  portfolioData: string[];
  onPortfolioDelete: (e: any) => void;
}

const PortfolioList = ({ portfolioData, onPortfolioDelete }: Props) => {
  return (
    <>
      <h3>My Portfolio</h3>
      {portfolioData &&
        portfolioData.map((portfolioItem) => {
          return (
            <PortfolioCard
              portfolioItem={portfolioItem}
              onPortfolioDelete={onPortfolioDelete}
            />
          );
        })}
    </>
  );
};

export default PortfolioList;
