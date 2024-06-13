import { axiosInstance } from "../configs/axiosConfig";

export const loginService = (credentials) => {
  return axiosInstance.post("/auth/login", credentials);
};

export const getGoogleProfile = (accessToken) => {
  return axiosInstance.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
    {
      Headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }
  );
};

export const googleLogin = (credentials) => {
  return axiosInstance.post("/auth/googleLogin", credentials);
};

export const registerService = (credentials) => {
  return axiosInstance.post("/auth/register", credentials);
};
