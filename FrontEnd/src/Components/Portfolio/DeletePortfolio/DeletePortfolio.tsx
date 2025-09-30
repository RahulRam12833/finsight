import React from "react";

interface Props {
  onPortfolioDelete: (e: any) => void;
  value: string;
}

const DeletePortfolio = ({ onPortfolioDelete, value }: Props) => {
  return (
    <form onSubmit={onPortfolioDelete}>
      <input readOnly={true} hidden={true} value={value} />
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeletePortfolio;
