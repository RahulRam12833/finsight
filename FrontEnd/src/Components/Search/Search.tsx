import React, { type JSX, type SyntheticEvent } from "react";

interface Props {
  search: string | undefined;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: SyntheticEvent) => void;
}

const Search: React.FC<Props> = ({
  onSearchSubmit,
  search,
  handleSearchChange,
}: Props): JSX.Element => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <form
          className=" flex w-full flex-col gap-4 rounded-2xl border border-blue-100  bg-white/80 p-4
        shadow-[0_10px_40px_rgba(37,99,235,0.10)] backdrop-blur-sm sm:p-5 md:flex-row md:items-center md:gap-3 "
          onSubmit={onSearchSubmit}
        >
          <div className="relative flex-1">
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-indigo-950 outline-none transition  placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4focus:ring-blue-100"
              id="search-input"
              placeholder="Search by ticker(eg AAPL, MSFT, IBM) or name"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-blue-700 px-8 py-4 font-semiboldtext-white shadow-sm transition hover:bg-blue-800 hover:shadow-md active:scale-[0.98] md:px-10"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
