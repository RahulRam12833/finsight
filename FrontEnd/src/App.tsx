import { useState, useEffect, type SyntheticEvent } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { searchCompanies } from "./api";
import type { CompanySearch } from "./company";
import PortfolioList from "./Components/Portfolio/PortfolioList/PortfolioList";
import Navbar from "./Components/Navbar/Navbar";

type Stock = {
  id: number;
  symbol: string;
  companyName: string;
  purchase: number;
};

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("/api/PlaceholderStock");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        setError("Failed to fetch stocks");
        console.error("Error fetching stocks:", error);
      }
    };

    //fetchStocks();
  }, []);

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
      <div className="App">
        <Navbar />
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
      </div>
    </>
  );
}

export default App;
