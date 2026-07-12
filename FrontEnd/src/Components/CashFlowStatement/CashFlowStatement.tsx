import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Table from "../Table/Table";
//import Spinner from "../Spinners/Spinner";
import type { CashFlowReport, CashFlowType } from "../../alphacompany";
import { getCashFlowStatement } from "../../api";
import mockCashFlow from "../../mockCashFlow";
import Spinner from "../Spinner/Spinner";
import { safeFormatNumber } from "../../Helpers/NumberFormatting";

export const cashFlowConfig = [
  {
    label: "Date",
    render: (company: CashFlowReport) => company.fiscalDateEnding ?? "None", // dates are strings
  },
  {
    label: "Operating Cashflow",
    render: (company: CashFlowReport) =>
      safeFormatNumber(company.operatingCashflow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CashFlowReport) =>
      safeFormatNumber(company.cashflowFromInvestment),
  },
  {
    label: "Financing Cashflow",
    render: (company: CashFlowReport) =>
      safeFormatNumber(company.cashflowFromFinancing),
  },
  {
    label: "Capital Expenditures",
    render: (company: CashFlowReport) =>
      safeFormatNumber(company.capitalExpenditures),
  },
  {
    label: "Dividends Paid",
    render: (company: CashFlowReport) =>
      safeFormatNumber(company.dividendPayout),
  },
  {
    label: "Net Income",
    render: (company: CashFlowReport) => safeFormatNumber(company.netIncome),
  },
  {
    label: "Change In Cash",
    render: (company: CashFlowReport) =>
      safeFormatNumber(company.changeInCashAndCashEquivalents),
  },
];

const CashflowStatement = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [cashFlowData, setCashFlowData] = useState<CashFlowType>();
  //const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const getRatios = async () => {
      try {
        const result = await getCashFlowStatement(symbol);

        if (
          typeof result !== "string" &&
          result &&
          typeof result === "object"
        ) {
          if (result.annualReports && result.annualReports.length > 0) {
            setCashFlowData(result);
          } else {
            console.warn("No cash flow reports found, using mock data");
            setCashFlowData(mockCashFlow);
          }
        } else {
          console.warn("Invalid cash flow data, using mock data");
          setCashFlowData(mockCashFlow);
        }
      } catch (error) {
        console.error("Error fetching cash flow data:", error);
        setCashFlowData(mockCashFlow);
        //setError("Failed to fetch data, using mock data.");
      }
    };

    getRatios();
  }, [symbol]);

  return cashFlowData ? (
    <Table config={cashFlowConfig} data={cashFlowData.annualReports}></Table>
  ) : (
    <Spinner />
  );
};

export default CashflowStatement;
