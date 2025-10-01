import React, { type JSX } from "react";
import Card from "../Card/Card";
import type { CompanySearch } from "../../company";
import { v4 as uuidv4 } from "uuid";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CardList: React.FC<Props> = ({
  searchResults,
  onPortfolioSubmit,
}: Props): JSX.Element => {
  return (
    <>
      {searchResults.length > 0 ? (
        searchResults.map((result) => {
          return (
            <Card
              id={result.symbol}
              key={uuidv4()}
              searchResult={result}
              onPortfolioSubmit={onPortfolioSubmit}
            />
          );
        })
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}
    </>
  );
};

export default CardList;
