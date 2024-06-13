import { axiosInstance } from "../configs/axiosConfig";

export const startTestSession = () => {
  return axiosInstance.post("/quiz/startSession");
};

export const fetchQuestion = (payload) => {
  return axiosInstance.get("/quiz/question", {
    params: payload,
  });
};

export const fetchResult = (sessionId) => {
  return axiosInstance.get("/quiz/result", {
    params: sessionId,
  });
};

export const fetchSessions = () => {
  return axiosInstance.get("/quiz/sessions");
};
