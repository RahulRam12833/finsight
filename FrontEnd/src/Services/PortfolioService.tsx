import type { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";
import backendApi from "./backendapi";

//const api = "https://localhost:7206/api/portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const data = await backendApi.post<PortfolioPost>(
      `/api/portfolio/?symbol=${symbol}`,
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const data = await backendApi.delete<PortfolioPost>(
      `/api/portfolio/?symbol=${symbol}`,
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGetAPI = async () => {
  try {
    const data = await backendApi.get<PortfolioGet[]>("/api/portfolio");
    return data;
  } catch (error) {
    handleError(error);
  }
};
