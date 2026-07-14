import type { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";
import backendApi from "./backendapi";

//const api = "https://localhost:7206/api/comment/";

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string,
) => {
  try {
    const data = await backendApi.post<CommentPost>(`/api/comment/${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentGetAPI = async (symbol: string) => {
  try {
    const data = await backendApi.get<CommentGet[]>(
      `/api/comment/?Symbol=${symbol}`,
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
