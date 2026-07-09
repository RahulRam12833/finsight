import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import type { UserProfileToken } from "../Models/User";

const api = "https://localhost:7206/api/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "Account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (err) {
    handleError(err);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string,
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "Account/register", {
      email,
      username,
      password,
    });
    return data;
  } catch (err) {
    handleError(err);
  }
};
