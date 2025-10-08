import axios from "axios";
import type { CompanyProfile } from "./company";

import type { CompanySearch } from "./alphacompany.d.ts";

interface SearchResult {
  bestMatches: CompanySearch[];
}
export const searchCompanies = async (keywords: string) => {
  try {
    const response = await axios.get<SearchResult>(
      `https://www.alphavantage.co/query`,
      {
        params: {
          function: "SYMBOL_SEARCH",
          keywords,
          apikey: import.meta.env.VITE_ALPHA_API_KEY,
        },
      }
    );
    const matches = response.data.bestMatches;
    if (!matches) return [];

    return matches.map((m: any) => ({
      symbol: m["1. symbol"],
      name: m["2. name"],
      type: m["3. type"],
      region: m["4. region"],
      marketOpen: m["5. marketOpen"],
      marketClose: m["6. marketClose"],
      timezone: m["7. timezone"],
      currency: m["8. currency"],
      matchScore: m["9. matchScore"],
    }));
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

export const getCompanyProfile = async (symbol: string) => {
  try {
    const response = await axios.get<CompanyProfile[]>(
      "https://financialmodelingprep.com/stable/profile",
      {
        params: {
          symbol, // symbol=AAPL
          apikey: import.meta.env.VITE_FIN_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching company profile:", error.message);
      return error.message;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error has occurred";
    }
  }
};
