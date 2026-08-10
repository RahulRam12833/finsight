import PortfolioCard from "../PortfolioCard/PortfolioCard";
import type { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioData: PortfolioGet[];
  onPortfolioDelete: (e: any) => void;
}

const PortfolioList = ({ portfolioData, onPortfolioDelete }: Props) => {
  return (
    <section id="portfolio" className="px-6 py-10">
      <h2 className="mb-8 text-center text-3xl font-semibold text-indigo-950 md:text-4xl">
        My Portfolio
      </h2>

      {portfolioData.length > 0 ? (
        <div className=" mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {portfolioData.map((portfolioItem) => (
            <PortfolioCard
              key={portfolioItem.id}
              portfolioItem={portfolioItem}
              onPortfolioDelete={onPortfolioDelete}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-md rounded-2xl border border-blue-100 bg-white/80 p-10 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-indigo-950">
            Your portfolio is empty.
          </h3>

          <p className="mt-2 text-slate-500">
            Search for a stock and add it to your portfolio.
          </p>
        </div>
      )}
    </section>
  );
};

export default PortfolioList;
