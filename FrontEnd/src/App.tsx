import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";

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

    fetchStocks();
  }, []);

  return (
    <>
      <div className="App">
        <Search />
        <CardList />
      </div>
    </>
  );
}

export default App;
