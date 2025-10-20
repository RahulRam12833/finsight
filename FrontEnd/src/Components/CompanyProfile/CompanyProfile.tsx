import React, { useEffect, useState } from "react";
import type { CompanyProfileType } from "../../alphacompany";
import { useOutletContext } from "react-router-dom";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyProfileType) => company.marketCapitalization,
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "EPS",
    render: (company: CompanyProfileType) => company.eps,
    subTitle: "Earnings per share, indicates profitability",
  },
  {
    label: "Profit Margin TTM",
    render: (company: CompanyProfileType) => company.profitMargin,
    subTitle:
      "Profit margin is a measure of profitability and efficiency, calculated as net income divided by revenue",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyProfileType) => company.returnOnEquityTTM,
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyProfileType) => company.returnOnAssetsTTM,
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Operating Margin TTM",
    render: (company: CompanyProfileType) => company.operatingMarginTTM,
    subTitle:
      "Operating margin is a measure of a company's profitability, calculated as operating income divided by revenue",
  },
  {
    label: "PE Ratio",
    render: (company: CompanyProfileType) => company.PERatio,
    subTitle:
      "This is the upperbound of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "PEG Ratio",
    render: (company: CompanyProfileType) => company.PEGRatio,
    subTitle:
      "PE ratio divided by earnings growth, indicates valuation vs growth",
  },
  {
    label: "EBITDA",
    render: (company: CompanyProfileType) => company.EBITDA,
    subTitle:
      "Earnings before interest, taxes, depreciation, and amortization, measure of cash profitability",
  },
  {
    label: "Revenue Per Share TTM",
    render: (company: CompanyProfileType) => company.revenuePerShareTTM,
    subTitle:
      "Revenue per share is a measure of a company's revenue relative to its number of outstanding shares",
  },
  {
    label: "Book Value Per Share TTM",
    render: (company: CompanyProfileType) => company.bookValue,
    subTitle:
      "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
  },
  {
    label: "Dividend Yield TTM",
    render: (company: CompanyProfileType) => company.dividendYield,
    subTitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Beta",
    render: (company: CompanyProfileType) => company.beta,
    subTitle: "Stock volatility relative to the market, risk indicator",
  },
  {
    label: "52-Week High",
    render: (company: CompanyProfileType) => company.fiftyTwoWeekHigh,
    subTitle: "Highest stock price in last 52 weeks, trend indicator",
  },
  {
    label: "52-Week Low",
    render: (company: CompanyProfileType) => company.fiftyTwoWeekLow,
    subTitle: "Lowest stock price in last 52 weeks, trend indicator",
  },
];

const CompanyProfile = (props: Props) => {
  const companyData = useOutletContext<CompanyProfileType>();
  console.log("Company Data in Profile:", companyData);
  return (
    <>
      {companyData ? (
        <RatioList config={tableConfig} data={companyData} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;
