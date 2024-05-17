"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { KeyRound, Eye, UserRound, Mail } from "lucide-react";
import api, { axiosInstance } from "@/utils/api";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = signUpDetails;

  const signupInputHandler = (e) => {
    setSignUpDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (!passwordMatch) {
      setPasswordMatch(true);
    }
  };

  const signupHandler = async () => {
    try {
      const response = await axiosInstance.post("auth/register", signUpDetails);
      console.log(response);
      if (response.status == 201) {
        toast.success(response.data.message);
        console.log("asd");
      }
      console.log(response.data);
      setSignUpDetails({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setPasswordMatch(true);
      signupHandler();
    } else {
      setPasswordMatch(false);
    }
  };
  return (
    <>
      <Toaster />
      <div className="relative  flex justify-center items-center h-[100vh] w-screen">
        <div className="context z-10 flex flex-col gap-10 justify-start py-10 items-center  bg-white h-[70vh] w-96 rounded-xl">
          <h1 className="text-black text-3xl font-extrabold">Register</h1>
          <form
            id="login-Form"
            onSubmit={handleSignupSubmit}
            action=""
            className="flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-5 relative">
              <div className="custom-input flex items-center justify-start gap-1 px-3 h-12 py-2 relative border-b-[3px]">
                <label htmlFor="" className="absolute -top-4 left-0 text-sm">
                  Username
                </label>
                <UserRound className="text-gray-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={signupInputHandler}
                  className="inputField loginUsername h-full w-full outline-none bg-transparent"
                />
                <span className="labelborder"></span>
              </div>
              <div className="custom-input flex items-center justify-start gap-1 px-2 h-12 py-2 relative border-b-[3px]">
                <label htmlFor="" className="absolute -top-4 left-0 text-sm">
                  Email
                </label>
                <Mail className="text-gray-500 size-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={signupInputHandler}
                  className="inputField loginUsername h-full w-full outline-none bg-transparent"
                />
                <span className="labelborder"></span>
              </div>
              <div className="custom-input flex items-center justify-start gap-1 px-3 h-12 py-2 relative border-b-[3px]">
                <label htmlFor="" className="absolute -top-4 left-0 text-sm">
                  Password
                </label>
                {showPassword ? (
                  <Eye
                    className="text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <KeyRound
                    className="text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                <input
                  type={!showPassword ? "password" : "text"}
                  minLength={"8"}
                  name="password"
                  required
                  value={password}
                  onChange={signupInputHandler}
                  placeholder="Type your password"
                  className="inputField loginPassword h-full w-full outline-none bg-transparent"
                />
                <span className="labelborder"></span>
              </div>
              <div className="custom-input flex items-center justify-start gap-1 px-3 h-12 py-2 relative border-b-[3px]">
                <label htmlFor="" className="absolute -top-4 left-0 text-sm">
                  Confirm Password
                </label>
                {showPassword ? (
                  <Eye
                    className="text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <KeyRound
                    className="text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                <input
                  type={!showPassword ? "password" : "text"}
                  minLength={"8"}
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={signupInputHandler}
                  placeholder="Type your password"
                  className="inputField loginPassword h-full w-full outline-none bg-transparent"
                />
                <span className="labelborder"></span>
              </div>
              {!passwordMatch && (
                <p
                  className="password-mismatch-error"
                  style={{ color: "red", textAlign: "center" }}
                >
                  Passwords do not match.
                </p>
              )}
            </div>
            <div className=" w-full h-10 mt-10 flex items-center justify-center text-white font-semibold rounded-xl bg-gradient-to-tl from-[#4e54c8] to-[#b1b4f4]">
              <button className="px-28">Register</button>
            </div>
          </form>
          <div className=" flex flex-col gap-2">
            <div className="">
              <Link href="/" className="text-[#4e54c8]">
                Login Here
              </Link>
            </div>
          </div>
        </div>

        <div className="area absolute">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;
