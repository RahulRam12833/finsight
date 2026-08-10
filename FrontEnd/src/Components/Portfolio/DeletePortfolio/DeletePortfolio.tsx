interface Props {
  onPortfolioDelete: (e: any) => void;
  portfolioItem: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioItem }: Props) => {
  return (
    <form onSubmit={onPortfolioDelete}>
      <input readOnly={true} hidden={true} value={portfolioItem} />
      <button className="block m-auto  w-1/2 py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-400">
        X
      </button>
    </form>
  );
};

export default DeletePortfolio;
