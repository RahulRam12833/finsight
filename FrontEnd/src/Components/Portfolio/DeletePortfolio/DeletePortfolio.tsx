interface Props {
  onPortfolioDelete: (e: any) => void;
  portfolioItem: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioItem }: Props) => {
  return (
    <form onSubmit={onPortfolioDelete}>
      <input readOnly={true} hidden={true} value={portfolioItem} />
      <button className="block m-auto  w-1/2 py-3 hover:text-white duration-200 border-2 rounded-lg hover:bg-red-500 text-red-500 bg-white border-red-400">
        x
      </button>
    </form>
  );
};

export default DeletePortfolio;
