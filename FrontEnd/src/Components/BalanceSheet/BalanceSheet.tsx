import React, { useEffect, useState } from "react";
import type { BalanceReport, BalanceSheetType } from "../../alphacompany";
import { useOutletContext, useParams } from "react-router-dom";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import mockBalanceSheet from "../../mockBalanceSheet";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  safeFormatNumber,
} from "../../Helpers/NumberFormatting";

type Props = {};

export const config = [
  {
    label: <div className="font-bold">Total Assets</div>,
    render: (company: BalanceReport) => safeFormatNumber(company.totalAssets),
  },
  {
    label: "Current Assets",
    render: (company: BalanceReport) =>
      safeFormatNumber(company.totalCurrentAssets),
  },
  {
    label: "Total Cash",
    render: (company: BalanceReport) =>
      safeFormatNumber(company.cashAndShortTermInvestments),
  },
  {
    label: "Property & Equipment",
    render: (company: BalanceReport) =>
      safeFormatNumber(company.propertyPlantEquipment),
  },
  {
    label: "Intangible Assets",
    render: (company: BalanceReport) =>
      safeFormatNumber(company.intangibleAssets),
  },
  {
    label: "Long Term Debt",
    render: (company: BalanceReport) => safeFormatNumber(company.longTermDebt),
  },
  {
    label: "Total Debt",
    render: (company: BalanceReport) => safeFormatNumber(company.currentDebt),
  },
  {
    label: <div className="font-bold">Total Liabilities</div>,
    render: (company: BalanceReport) =>
      safeFormatNumber(company.totalLiabilities),
  },
  {
    label: "Current Liabilities",
    render: (company: BalanceReport) =>
      safeFormatNumber(company.totalCurrentLiabilities),
  },
  {
    label: "Long-Term Debt",
    render: (company: BalanceReport) => safeFormatNumber(company.longTermDebt),
  },
  {
    label: "Stakeholder's Equity",
    render: (company: BalanceReport) =>
      safeFormatNumber(company.totalStockholdersEquity),
  },
  {
    label: "Retained Earnings",
    render: (company: BalanceReport) =>
      safeFormatNumber(company.retainedEarnings),
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
        if (typeof data !== "string" && data && typeof data === "object") {
          if (data.annualReports && data.annualReports.length > 0) {
            setBalanceData(data);
          } else {
            console.warn("No balance sheet reports found, using mock data");
            setBalanceData(mockBalanceSheet);
          }
        } else {
          console.warn("Invalid data type, using mock data");
          setBalanceData(mockBalanceSheet);
        }
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
        <Spinner />
      )}
    </>
  );
};

export default BalanceSheet;
