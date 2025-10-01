import React from "react";

interface Props {
  onPortfolioDelete: (e: any) => void;
  portfolioItem: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioItem }: Props) => {
  return (
    <form onSubmit={onPortfolioDelete}>
      <input readOnly={true} hidden={true} value={portfolioItem} />
      <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
        X
      </button>
    </form>
  );
};

export default DeletePortfolio;
