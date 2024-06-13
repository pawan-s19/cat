import { axiosInstance } from "../configs/axiosConfig";

export const fetchLoggedInUser = () => {
  return axiosInstance.get("/auth/profile");
};
