import React, { useEffect, useState } from "react";
import type { IncomeReport, IncomeStatementType } from "../../alphacompany";
import RatioList from "../RatioList/RatioList";
import { getIncomeStatement } from "../../api";
import { useParams } from "react-router-dom";
import { mockIncomeData } from "../../mockIncomeData";
import Table from "../Table/Table";
type Props = {};

const incomeTableConfig = [
  {
    label: "Date",
    render: (report: IncomeReport) => report.fiscalDateEnding,
  },
  {
    label: "Total Revenue",
    render: (report: IncomeReport) => report.totalRevenue,
  },
  {
    label: "Cost Of Revenue",
    render: (report: IncomeReport) => report.costOfRevenue,
  },
  {
    label: "Operating Expenses",
    render: (report: IncomeReport) => report.operatingExpenses,
  },
  {
    label: "Depreciation & Amortization",
    render: (report: IncomeReport) => report.depreciationAndAmortization,
  },
  {
    label: "Gross Profit",
    render: (report: IncomeReport) => report.grossProfit,
  },
  {
    label: "Operating Income",
    render: (report: IncomeReport) => report.operatingIncome,
  },
  {
    label: "Income Before Tax",
    render: (report: IncomeReport) => report.incomeBeforeTax,
  },
  {
    label: "Net Income",
    render: (report: IncomeReport) => report.netIncome,
  },
];

const IncomeStatement = (props: Props) => {
  //fetch income statement data from context

  const { symbol } = useParams<{ symbol: string }>();
  const [incomeData, setIncomeData] =
    useState<IncomeStatementType>(mockIncomeData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchIncomeData = async () => {
      try {
        const data = await getIncomeStatement(symbol);
        //console.log(data);
        if (typeof data !== "string" && data && typeof data === "object")
          //setIncomeData(data);
          setIncomeData(mockIncomeData);
        else if (typeof data === "string") setError(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchIncomeData();
    console.log(incomeData);
  }, [symbol]);

  return (
    <>
      {incomeData ? (
        <Table config={incomeTableConfig} data={incomeData.annualReports} />
      ) : (
        <>No income data available</>
      )}
    </>
  );
};

export default IncomeStatement;
