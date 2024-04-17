"use client";
import Link from "next/link";
import { useState } from "react";
import { KeyRound, Eye, UserRound } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import api, { axiosInstance } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const loginInputHandler = (e) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Checking For Credentials");
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("auth/login", loginDetails);
      console.log(response);

      if (response.status === 200) {
        toast.dismiss(loading);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        toast.success("Login Successful");
        router.push("/home");
      }
      setLoginDetails({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Invalid Credentials!");
    } finally {
      setIsLoading(false);
    }
  };

  const { email, password } = loginDetails;
  return (
    <>
      <Toaster />
      <div className="relative  flex justify-center items-center h-[100vh] w-screen">
        <div className="context z-10 flex flex-col gap-10 justify-start py-10 items-center  bg-white h-[70vh] w-96 rounded-xl">
          <h1 className="text-black text-3xl font-extrabold">Login</h1>
          <form
            id="login-Form"
            onSubmit={loginHandler}
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
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={loginInputHandler}
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
                  onChange={loginInputHandler}
                  placeholder="Type your password"
                  className="inputField loginPassword h-full w-full outline-none bg-transparent"
                />
                <span className="labelborder"></span>
              </div>
              <Link href="#" className="text-xs absolute -bottom-5 right-0">
                Forgot Password
              </Link>
            </div>
            <div className=" w-full h-10 mt-10 flex items-center justify-center text-white font-semibold rounded-xl bg-gradient-to-tl from-[#4e54c8] to-[#b1b4f4]">
              <button className="px-28">Login</button>
            </div>
          </form>
          <div className=" flex flex-col gap-2">
            <div className="">
              <Link href="/register" className="text-[#4e54c8]">
                Register Here
              </Link>
            </div>
            {/* <div className="text-[10px] text-center">Or Sign Up Using</div>
            <div className="flex gap-2 justify-center items-center">
              <Link
                to="https://www.facebook.com"
                target="_blank"
                className="h-[30px] w-[30px] bg-blue-600 rounded-full flex items-center justify-center"
              >
                <FaFacebookF className="text-white " />
              </Link>
              <Link
                to="https://www.Twitter.com"
                target="_blank"
                className="h-[30px] w-[30px] bg-[#60bcf6] rounded-full flex items-center justify-center"
              >
                <FaTwitter className="text-white" />
              </Link>
              <Link
                to="https://www.gmail.com"
                target="_blank"
                className="h-[30px] w-[30px] bg-red-500 rounded-full flex items-center justify-center"
              >
                <FaGoogle className="text-white" />
              </Link>
            </div> */}
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
}
