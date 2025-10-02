import React, { useEffect, useState } from "react";
import type { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";

interface Props {}

const CompanyPage = (props: Props) => {
  let symbol = window.location.pathname.split("/")[2];
  const [company, setCompany] = useState<CompanyProfile>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const data = await getCompanyProfile(symbol);
        console.log(data[0]);
        if (typeof data !== "string" && Array.isArray(data))
          setCompany(data[0]);
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
          <CompanyDashboard>
            <Tile title="Company Name" subTitle={company.companyName} />
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
