import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { searchCompanies } from "./api";
import type { CompanySearch } from "./company";
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSearchResults([]);
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result)) {
      setSearchResults(result);
    }
  };

  return (
    <>
      <div className="App">
        <Search onClick={onClick} search={search} handleChange={handleChange} />
        {serverError && <h1>{serverError}</h1>}
        <CardList searchResults={searchResults} />
      </div>
    </>
  );
}

export default App;
