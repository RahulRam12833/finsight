import React, { type JSX } from "react";
import "./Card.css";
import type { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";

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
    <div className="card">
      <img
        src="https://images.unsplash.com/photo-1612428978260-2b9c7df20150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        alt="Company Logo"
      />
      <div className="details">
        <h2>
          {searchResult.name} ({searchResult.symbol})
        </h2>
        <p>${searchResult.currency}</p>
        <p className="info">
          {searchResult.exchange} - {searchResult.exchangeFullName}
        </p>
        <AddPortfolio
          onPortfolioSubmit={onPortfolioSubmit}
          symbol={searchResult.symbol}
        />
      </div>
    </div>
  );
};

export default Card;
