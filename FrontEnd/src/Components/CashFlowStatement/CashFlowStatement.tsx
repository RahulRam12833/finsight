import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import Table from "../Table/Table";
//import Spinner from "../Spinners/Spinner";
import type { CashFlowReport, CashFlowType } from "../../alphacompany";
import { getCashFlowStatement } from "../../api";
import mockCashFlow from "../../mockCashFlow";

type Props = {};

const config = [
  {
    label: "Date",
    render: (company: CashFlowReport) => company.fiscalDateEnding,
  },
  {
    label: "Operating Cashflow",
    render: (company: CashFlowReport) => company.operatingCashflow,
  },
  {
    label: "Investing Cashflow",
    render: (company: CashFlowReport) => company.cashflowFromInvestment,
  },
  {
    label: "Financing Cashflow",
    render: (company: CashFlowReport) => company.cashflowFromFinancing,
  },
  {
    label: "Capital Expenditures",
    render: (company: CashFlowReport) => company.capitalExpenditures,
  },
  {
    label: "Dividends Paid",
    render: (company: CashFlowReport) => company.dividendPayout,
  },
  {
    label: "Net Income",
    render: (company: CashFlowReport) => company.netIncome,
  },
  {
    label: "Change In Cash",
    render: (company: CashFlowReport) => company.changeInCashAndCashEquivalents,
  },
];

const CashflowStatement = (props: Props) => {
  const { symbol } = useParams<{ symbol: string }>();
  const [cashFlowData, setCashFlowData] = useState<CashFlowType>();
  useEffect(() => {
    if (!symbol) return;

    const getRatios = async () => {
      try {
        const result = await getCashFlowStatement(symbol);
        if (typeof result !== "string" && result && typeof result === "object")
          setCashFlowData(result.annualReports.length ? result : undefined);
        else setCashFlowData(mockCashFlow);
      } catch (error) {
        console.error("Error fetching cash flow data:", error);
      }
    };
    getRatios();
  }, []);
  return cashFlowData ? (
    <Table config={config} data={cashFlowData.annualReports}></Table>
  ) : (
    <>No cash flow data available</>
  );
};

export default CashflowStatement;
