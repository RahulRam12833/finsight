import { useState, useEffect } from "react";
import "./App.css";

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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">
          FinSight Stocks
        </h1>
        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-4">
          {stocks.map((stock) => (
            <li key={stock.id} className="border p-2 rounded shadow">
              <div className="flex justify-between">
                <span className="text-gray-700">{stock.symbol}</span>
                <span className="text-gray-700">{stock.companyName}</span>
                <span className="text-green-400">{stock.purchase}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
