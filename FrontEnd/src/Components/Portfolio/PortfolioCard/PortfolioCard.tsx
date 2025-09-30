import React from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";

interface Props {
  portfolioItem: string;
  onPortfolioDelete: (e: any) => void;
}

const PortfolioCard = ({ portfolioItem, onPortfolioDelete }: Props) => {
  return (
    <>
      <h2>{portfolioItem}</h2>
      <DeletePortfolio
        onPortfolioDelete={onPortfolioDelete}
        value={portfolioItem}
      />
    </>
  );
};
export default PortfolioCard;
