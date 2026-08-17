import React, { useEffect, useState, type SyntheticEvent } from "react";
import type { CompanySearch } from "../../alphacompany.d.ts";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import PortfolioList from "../../Components/Portfolio/PortfolioList/PortfolioList";
import CardList from "../../Components/CardList/CardList";
import type { PortfolioGet } from "../../Models/Portfolio.ts";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService.tsx";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioGet[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioData(res?.data);
        }
      })
      .catch(() => {
        toast.warning("Could not get portfolio values");
      });
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    setSearchResults([]);
    setServerError("");
    e.preventDefault();
    try {
      const result = await searchCompanies(search);

      setSearchResults(result);
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(error.message);
      } else {
        toast.warning("An unexpected error has occurred.");
      }
    }
  };

  const onPortfolioSubmit = async (e: any) => {
    e.preventDefault();
    // if (portfolioData.includes(e.currentTarget[0].value)) return;
    // setPortfolioData([...portfolioData, e.currentTarget[0].value]);

    portfolioAddAPI(e.target[0].value)
      .then((res) => {
        console.log("SUCCESS:", res);
        if (res?.status === 204) {
          toast.success("Stock added to portfolio!");
          getPortfolio();
        }
      })
      .catch((error) => {
        console.log("CAUGHT ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        const message =
          error.response?.data || "Could not create portfolio item!";
        toast.warning(message);
      });
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    // setPortfolioData(
    //   portfolioData.filter((item) => item !== e.currentTarget[0].value),
    // );

    portfolioDeleteAPI(e.target[0].value).then((res) => {
      if (res?.status == 200) {
        toast.success("Stock deleted from portfolio!");
        getPortfolio();
      }
    });
  };

  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <PortfolioList
        portfolioData={portfolioData!}
        onPortfolioDelete={onPortfolioDelete}
      />
      {serverError && <h1>{serverError}</h1>}
      <CardList
        searchResults={searchResults}
        onPortfolioSubmit={onPortfolioSubmit}
      />
    </>
  );
};

export default SearchPage;
