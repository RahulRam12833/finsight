import axios from "axios";
import type { CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";

const api = "https://localhost:7206/api/comment/";

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string,
) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
