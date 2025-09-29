import axios from "axios";
import type { CompanySearch } from "./company";

interface SearchResult {
  data: CompanySearch[];
}
export const searchCompanies = async (query: string) => {
  try {
    const response = await axios.get<SearchResult>(
      `https://financialmodelingprep.com/stable/search-symbol`,
      {
        params: {
          query,
          limit: 100,
          exchange: "NASDAQ",
          apikey: import.meta.env.VITE_FIN_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching company data:", error.message);
      return error.message;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error has occurred";
    }
  }
};
