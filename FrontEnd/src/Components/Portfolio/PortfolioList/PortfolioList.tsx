import React from "react";
import PortfolioCard from "../PortfolioCard/PortfolioCard";

interface Props {
  portfolioData: string[];
  onPortfolioDelete: (e: any) => void;
}

const PortfolioList = ({ portfolioData, onPortfolioDelete }: Props) => {
  return (
    <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        My Portfolio
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          {portfolioData.length > 0 ? (
            portfolioData.map((portfolioItem) => {
              return (
                <PortfolioCard
                  portfolioItem={portfolioItem}
                  onPortfolioDelete={onPortfolioDelete}
                />
              );
            })
          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              Your portfolio is empty.
            </h3>
          )}
        </>
      </div>
    </section>
  );
};

export default PortfolioList;
