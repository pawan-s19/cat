import Cookies from "js-cookie";

export const setCookie = (name, value, days) => {
  Cookies.set(name, value, { expires: days, secure: true, sameSite: "Strict" });
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const eraseCookie = (name) => {
  Cookies.remove(name);
};
