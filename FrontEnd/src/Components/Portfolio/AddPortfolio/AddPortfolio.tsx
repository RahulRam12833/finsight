import React from "react";

interface Props {
  onPortfolioSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  symbol: string;
}

const AddPortfolio = ({ onPortfolioSubmit, symbol }: Props) => {
  return (
    <form onSubmit={onPortfolioSubmit}>
      <input readOnly={true} hidden={true} value={symbol} />
      <button type="submit">Add to Portfolio</button>
    </form>
  );
};

export default AddPortfolio;
