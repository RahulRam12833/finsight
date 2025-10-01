import React from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";

interface Props {
  portfolioItem: string;
  onPortfolioDelete: (e: any) => void;
}

const PortfolioCard = ({ portfolioItem, onPortfolioDelete }: Props) => {
  return (
    <>
      <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
        <p className="pt-6 text-xl font-bold">{portfolioItem}</p>
        <DeletePortfolio
          portfolioItem={portfolioItem}
          onPortfolioDelete={onPortfolioDelete}
        />
      </div>
    </>
  );
};
export default PortfolioCard;
