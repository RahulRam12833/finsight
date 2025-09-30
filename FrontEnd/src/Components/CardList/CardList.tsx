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
        <h2>No results found</h2>
      )}
    </>
  );
};

export default CardList;
