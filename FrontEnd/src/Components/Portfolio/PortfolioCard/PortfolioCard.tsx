import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { Link } from "react-router-dom";
import type { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioItem: PortfolioGet;
  onPortfolioDelete: (e: any) => void;
}

const PortfolioCard = ({ portfolioItem, onPortfolioDelete }: Props) => {
  return (
    <>
      <div
        className=" flex w-full flex-col space-y-4
  rounded-2xl
  border border-blue-100
  bg-white/80
  p-8
  text-center text-indigo-950
  shadow-[0_10px_30px_rgba(37,99,235,0.10)]
  backdrop-blur-sm
  md:w-1/3"
      >
        <Link
          to={`/company/${portfolioItem}`}
          className="pt-6 text-xl font-bold"
        >
          {portfolioItem.symbol}
        </Link>
        <DeletePortfolio
          portfolioItem={portfolioItem.symbol}
          onPortfolioDelete={onPortfolioDelete}
        />
      </div>
    </>
  );
};
export default PortfolioCard;
