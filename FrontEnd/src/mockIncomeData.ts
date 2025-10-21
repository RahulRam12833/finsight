import type { IncomeStatementType } from "./alphacompany";

export const mockIncomeData: IncomeStatementType = {
  symbol: "IBM",
  annualReports: [
    {
      fiscalDateEnding: "2024-12-31",
      reportedCurrency: "USD",
      grossProfit: "35551000000",
      totalRevenue: "62753000000",
      costOfRevenue: "27201000000",
      operatingExpenses: "25478000000",
      depreciationAndAmortization: "4667000000",
      operatingIncome: "10074000000",
      incomeBeforeTax: "5797000000",
      netIncome: "6023000000",
    },
    {
      fiscalDateEnding: "2023-12-31",
      reportedCurrency: "USD",
      grossProfit: "34300000000",
      totalRevenue: "61860000000",
      costOfRevenue: "27560000000",
      operatingExpenses: "26786000000",
      depreciationAndAmortization: "4395000000",
      operatingIncome: "7514000000",
      incomeBeforeTax: "8690000000",
      netIncome: "7502000000",
    },
    {
      fiscalDateEnding: "2022-12-31",
      reportedCurrency: "USD",
      grossProfit: "32687000000",
      totalRevenue: "60530000000",
      costOfRevenue: "27842000000",
      operatingExpenses: "24514000000",
      depreciationAndAmortization: "4802000000",
      operatingIncome: "8174000000",
      incomeBeforeTax: "1156000000",
      netIncome: "1640000000",
    },
  ],
  quarterlyReports: [], 
};