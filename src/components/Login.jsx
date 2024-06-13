import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getGoogleProfile, googleLogin, loginService } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import BackDropLoader from "./BackDropLoader";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isError, error } = useMutation({
    mutationFn: loginService,
    onSuccess: ({ data }) => {
      setCookie("token", data.token, 30);
      dispatch(setUser({ user: data.user }));
    },
    onError: ({ response }) => {
      return toast.error(response?.data?.data?.message);
    },
  });

  const {
    mutate: loginViaGoogle,
    isError: googleLoginError,
    error: googleLoginErrorDets,
  } = useMutation({
    mutationFn: googleLogin,
    onSuccess: ({ data }) => {
      setCookie("token", data.token, 30);
      dispatch(setUser({ user: data.user }));
      navigate("/dashboard");
    },
  });

  const { mutate: getGProfileDets, isPending } = useMutation({
    mutationFn: getGoogleProfile,
    onSuccess: ({ data }) => {
      const profileData = data;

      const payload = {
        email: profileData.email,
        id: profileData.id,
        picture: profileData.picture,
        name: profileData.name,
      };

      loginViaGoogle(payload);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutate({ email, password });
    if (isError) return toast.error(error.response.data.message);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      getGProfileDets(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm transform transition-transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="submit"
            value="Submit"
            className="bg-purple-600 text-white py-2 px-4 rounded w-full hover:bg-purple-700 transition duration-300 cursor-pointer"
          />
        </form>
        <p className="mt-4 text-black">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <div className="mt-6">
          <p className=" text-black">Login with Google</p>
          <button
            onClick={() => login()}
            className="bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600 transition duration-300"
          >
            Sign in with Google 🚀
          </button>
        </div>
      </div>
      <Link to="/dashboard" className="mt-4 text-white hover:underline">
        Go to Dashboard
      </Link>
      {isPending ? <BackDropLoader /> : null}
    </div>
  );
}
