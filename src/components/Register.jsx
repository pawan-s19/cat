import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isError, error } = useMutation({
    mutationFn: registerService,
    onSuccess: ({ data }) => {
      setCookie("token", data.token, 30);
      dispatch(setUser({ user: data.user }));
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  if (isError) alert(error.response.data.message);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm transform transition-transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="submit"
            value="Register"
            className="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700 transition duration-300 cursor-pointer"
          />
        </form>
        <p className="mt-4 text-black">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
