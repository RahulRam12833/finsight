import React from "react";

interface Props {
  onPortfolioSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  symbol: string;
}

const AddPortfolio = ({ onPortfolioSubmit, symbol }: Props) => {
  return (
    <div className="flex items-center">
      <form onSubmit={onPortfolioSubmit}>
        <input readOnly={true} hidden={true} value={symbol} />
        <button
          type="submit"
          className="rounded-lg bg-blue-800 px-6 py-2 text-sm font-semibold
                     text-white shadow-sm transition-all
                     hover:bg-blue-700 hover:shadow-md
                     active:scale-95 focus:outline-none
                     focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPortfolio;
