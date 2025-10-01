import React, { useState, type SyntheticEvent } from "react";
import type { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Navbar from "../../Components/Navbar/Navbar";
import Search from "../../Components/Search/Search";
import PortfolioList from "../../Components/Portfolio/PortfolioList/PortfolioList";
import CardList from "../../Components/CardList/CardList";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<string[]>([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    setSearchResults([]);
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result)) {
      setSearchResults(result);
    }
  };

  const onPortfolioSubmit = async (e: any) => {
    e.preventDefault();
    if (portfolioData.includes(e.currentTarget[0].value)) return;
    setPortfolioData([...portfolioData, e.currentTarget[0].value]);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    setPortfolioData(
      portfolioData.filter((item) => item !== e.currentTarget[0].value)
    );
  };

  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <PortfolioList
        portfolioData={portfolioData}
        onPortfolioDelete={onPortfolioDelete}
      />
      {serverError && <h1>{serverError}</h1>}
      <CardList
        searchResults={searchResults}
        onPortfolioSubmit={onPortfolioSubmit}
      />
    </>
  );
};

export default SearchPage;
