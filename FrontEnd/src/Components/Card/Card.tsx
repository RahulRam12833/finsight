import React, { type JSX } from "react";
import "./Card.css";
import type { CompanySearch } from "../../company";
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
        className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
        key={id}
        id={id}
      >
        <Link
          to={`/company/${searchResult.symbol}`}
          className="font-bold text-center  md:text-left"
        >
          {searchResult.name} ({searchResult.symbol})
        </Link>
        <p className="text-blue-900">{searchResult.currency}</p>
        <p className="font-bold ">
          {searchResult.exchange} - {searchResult.exchangeFullName}
        </p>
      </div>
      <AddPortfolio
        onPortfolioSubmit={onPortfolioSubmit}
        symbol={searchResult.symbol}
      />
    </>
  );
};

export default Card;
