import axios from "axios";
//import type { CompanyProfile } from "./company";

import type {
  CompanyProfileType,
  CompanySearch,
  IncomeStatementType,
} from "./alphacompany.d.ts";
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
    console.log(response.data);
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
    const response = await axios.get<CompanyProfileType>(
      "https://www.alphavantage.co/query",
      {
        params: {
          symbol, // symbol=AAPL
          function: "OVERVIEW",
          apikey: import.meta.env.VITE_FIN_API_KEY,
        },
      }
    );

    const data = response.data;
    const formattedData = {
      symbol: data.symbol,
      name: data.name,
      description: data.description,
      sector: data.sector,
      industry: data.industry,
      marketCapitalization: data.marketCapitalization,
      EBITDA: data.EBITDA,
      PERatio: data.PERatio,
      PEGRatio: data.PEGRatio,
      bookValue: data.bookValue,
      dividendPerShare: data.dividendPerShare,
      dividendYield: data.dividendYield,
      eps: data.eps,
      revenuePerShareTTM: data.revenuePerShareTTM,
      profitMargin: data.profitMargin,
      operatingMarginTTM: data.operatingMarginTTM,
      returnOnAssetsTTM: data.returnOnAssetsTTM,
      returnOnEquityTTM: data.returnOnEquityTTM,
      beta: data.beta,
      fiftyTwoWeekHigh: data.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: data.fiftyTwoWeekLow,
      sharesOutstanding: data.sharesOutstanding,
      logo: data.logo,
    };

    return formattedData;
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

export const getIncomeStatement = async (symbol: string) => {
  try {
    const response = await axios.get<IncomeStatementType>(
      "https://www.alphavantage.co/query",
      {
        params: {
          symbol, // symbol=AAPL
          function: "INCOME_STATEMENT",
          apikey: import.meta.env.VITE_FIN_API_KEY,
        },
      }
    );

    const data = response.data;
    const formattedIncomeData = {
      symbol: data.symbol,
      annualReports: data.annualReports.map((r) => ({
        fiscalDateEnding: r.fiscalDateEnding,
        totalRevenue: r.totalRevenue,
        grossProfit: r.grossProfit,
        operatingIncome: r.operatingIncome,
        netIncome: r.netIncome,
      })),
      quarterlyReports: data.quarterlyReports.map((r) => ({
        fiscalDateEnding: r.fiscalDateEnding,
        totalRevenue: r.totalRevenue,
        grossProfit: r.grossProfit,
        operatingIncome: r.operatingIncome,
        netIncome: r.netIncome,
      })),
    };
    return formattedIncomeData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching income statement:", error.message);
      return error.message;
    } else {
      console.error("Unexpected error:", error);
      return "An unexpected error has occurred";
    }
  }
};
