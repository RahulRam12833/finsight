import React, { useEffect, useState } from "react";
//import type { CompanyProfile } from "../../company";
import type { CompanyProfileType } from "../../alphacompany.d.ts";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import { mockCompanyProfile } from "../../mockCompanyProfile.ts";

interface Props {}

const CompanyPage = (props: Props) => {
  let symbol = window.location.pathname.split("/")[2];
  const [company, setCompany] =
    useState<CompanyProfileType>(mockCompanyProfile);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const data = await getCompanyProfile(symbol);
        console.log(data);
        if (typeof data !== "string" && data && typeof data === "object")
          //setCompany(data);
          setCompany(mockCompanyProfile);
        else if (typeof data === "string") setError(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchCompanyData();
  }, [symbol]);

  return (
    <>
      {error && <h1>{error}</h1>}
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard symbol={symbol}>
            <Tile title="Company Name" subTitle={company.name} />
            <Tile title="Symbol" subTitle={company.symbol} />
          </CompanyDashboard>
        </div>
      ) : (
        <div>No company data available</div>
      )}
    </>
  );
};
export default CompanyPage;
