import React, { useEffect, useState } from "react";
import type { BalanceReport, BalanceSheetType } from "../../alphacompany";
import { useOutletContext, useParams } from "react-router-dom";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import mockBalanceSheet from "../../mockBalanceSheet";

type Props = {};

const config = [
  {
    label: <div className="font-bold">Total Assets</div>,
    render: (company: BalanceReport) => company.totalAssets,
  },
  {
    label: "Current Assets",
    render: (company: BalanceReport) => company.totalCurrentAssets,
  },
  {
    label: "Total Cash",
    render: (company: BalanceReport) => company.cashAndShortTermInvestments,
  },
  {
    label: "Property & equipment",
    render: (company: BalanceReport) => company.propertyPlantEquipment,
  },
  {
    label: "Intangible Assets",
    render: (company: BalanceReport) => company.intangibleAssets,
  },
  {
    label: "Long Term Debt",
    render: (company: BalanceReport) => company.longTermDebt,
  },
  {
    label: "Total Debt",
    render: (company: BalanceReport) => company.currentDebt,
  },
  {
    label: <div className="font-bold">Total Liabilites</div>,
    render: (company: BalanceReport) => company.totalLiabilities,
  },
  {
    label: "Current Liabilities",
    render: (company: BalanceReport) => company.totalCurrentLiabilities,
  },
  {
    label: "Long-Term Debt",
    render: (company: BalanceReport) => company.longTermDebt,
  },
  {
    label: "Stakeholder's Equity",
    render: (company: BalanceReport) => company.totalStockholdersEquity,
  },
  {
    label: "Retained Earnings",
    render: (company: BalanceReport) => company.retainedEarnings,
  },
];

const BalanceSheet = (props: Props) => {
  const { symbol } = useParams<{ symbol: string }>();
  const [balanceData, setBalanceData] =
    useState<BalanceSheetType>(mockBalanceSheet);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const getBalanceData = async () => {
      try {
        const data = await getBalanceSheet(symbol);
        if (typeof data !== "string" && data && typeof data === "object")
          //setBalanceData(data);
          setBalanceData(mockBalanceSheet);
        else if (typeof data === "string") setError(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    getBalanceData();
  }, []);
  return (
    <>
      {balanceData ? (
        <RatioList config={config} data={balanceData.annualReports[0]} />
      ) : (
        <>No balance sheet available</>
      )}
    </>
  );
};

export default BalanceSheet;
