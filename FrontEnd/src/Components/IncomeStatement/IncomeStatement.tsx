import { useEffect, useState } from "react";
import type { IncomeReport, IncomeStatementType } from "../../alphacompany";
//import RatioList from "../RatioList/RatioList";
import { getIncomeStatement } from "../../api";
import { useParams } from "react-router-dom";
import { mockIncomeData } from "../../mockIncomeData";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { safeFormatNumber } from "../../Helpers/NumberFormatting";
//type Props = {};

export const incomeTableConfig = [
  {
    label: "Date",
    render: (report: IncomeReport) => report.fiscalDateEnding ?? "None",
  },
  {
    label: "Total Revenue",
    render: (report: IncomeReport) => safeFormatNumber(report.totalRevenue),
  },
  {
    label: "Cost Of Revenue",
    render: (report: IncomeReport) => safeFormatNumber(report.costOfRevenue),
  },
  {
    label: "Operating Expenses",
    render: (report: IncomeReport) =>
      safeFormatNumber(report.operatingExpenses),
  },
  {
    label: "Depreciation & Amortization",
    render: (report: IncomeReport) =>
      safeFormatNumber(report.depreciationAndAmortization),
  },
  {
    label: "Gross Profit",
    render: (report: IncomeReport) => safeFormatNumber(report.grossProfit),
  },
  {
    label: "Operating Income",
    render: (report: IncomeReport) => safeFormatNumber(report.operatingIncome),
  },
  {
    label: "Income Before Tax",
    render: (report: IncomeReport) => safeFormatNumber(report.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (report: IncomeReport) => safeFormatNumber(report.netIncome),
  },
];

const IncomeStatement = () => {
  //fetch income statement data from context

  const { symbol } = useParams<{ symbol: string }>();
  const [incomeData, setIncomeData] =
    useState<IncomeStatementType>(mockIncomeData);
  //const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchIncomeData = async () => {
      try {
        const data = await getIncomeStatement(symbol);

        if (typeof data !== "string" && data && typeof data === "object") {
          if (data.annualReports && data.annualReports.length > 0) {
            setIncomeData(data);
          } else {
            console.warn("No income reports found, using mock data");
            setIncomeData(mockIncomeData);
          }
        } else {
          console.warn("Invalid data type, using mock data");
          setIncomeData(mockIncomeData);
        }
      } catch (error) {
        console.error("Error fetching income statement data:", error);
        setIncomeData(mockIncomeData);
        //setError("Failed to fetch data, using mock data.");
      }
    };

    fetchIncomeData();
  }, [symbol]);

  return (
    <>
      {incomeData ? (
        <Table config={incomeTableConfig} data={incomeData.annualReports} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default IncomeStatement;
