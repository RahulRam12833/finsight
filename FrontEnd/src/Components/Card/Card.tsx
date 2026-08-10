import React, { type JSX } from "react";
import "./Card.css";
import type { CompanySearch } from "../../alphacompany.d.ts";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioSubmit,
}: Props): JSX.Element => {
  return (
    <>
      <div
        className="flex w-full flex-col gap-3 rounded-lg bg-slate-100 p-4 shadow-sm
               md:flex-row md:items-center md:justify-between md:gap-6"
        key={id}
        id={id}
      >
        <Link
          to={`/company/${searchResult.symbol}`}
          className="min-w-0 flex-1 truncate text-center font-bold text-slate-900
                 transition-colors hover:text-blue-800 md:text-left"
        >
          {searchResult.name} ({searchResult.symbol})
        </Link>
        <p className="text-center text-sm font-medium text-blue-900 md:w-24 md:text-left">
          {searchResult.currency}
        </p>
        <p className="hidden text-sm font-semibold text-slate-700 md:block md:w-40 md:text-left ">
          {searchResult.name}
        </p>
        <AddPortfolio
          onPortfolioSubmit={onPortfolioSubmit}
          symbol={searchResult.symbol}
        />
      </div>
    </>
  );
};

export default Card;
