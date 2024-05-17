"use client";
import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { LoaderIcon, MailCheck, MailX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/utils/api";
import Link from "next/link";

const Verification = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    (async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post("/auth/verify-email", {
          verificationToken: token,
          email: email,
        });
        if (response.status === 200) {
          setResponse(response?.data);
        }
        console.log(response.data.message);
      } catch (error) {
        console.log(error);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchParams]);

  return (
    <>
      <div className=" relative flex justify-center items-center h-[100vh] w-screen">
        <div className="context z-10 flex flex-col gap-2 justify-start py-10 items-center  bg-white h-[40vh] w-96 rounded-xl">
          {isLoading ? (
            <div className="  h-full w-full flex justify-center items-center">
              <LoaderIcon className="animate-spin " size={100} />
            </div>
          ) : (
            <>
              {response ? (
                <>
                  <p
                    className={`h-[50px] w-[50px] bg-green-400 flex justify-center items-center rounded-full`}
                  >
                    <MailCheck className="h-[30px] w-[30px] text-white" />
                  </p>
                  <h1>Email Verification</h1>
                  <p className="max-w-[90%] text-center">
                    Your email was Successfully verified. You can continue using
                    the application.
                  </p>
                  <Link href="/" className="text-purple-400">
                    Login Here
                  </Link>
                </>
              ) : (
                <>
                  <p
                    className={`h-[50px] w-[50px] bg-red-400 flex justify-center items-center rounded-full`}
                  >
                    <MailX className="h-[30px] w-[30px] text-white" />
                  </p>
                  <h1>Email Verification</h1>
                  <p className="max-w-[90%]  text-center">
                    Your email verification was unsuccessful. This URL can be
                    used once.
                  </p>
                  <Link href="/register" className="text-purple-400">
                    Signup Here
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <div className="area absolute ">
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

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Verification />
  </Suspense>
);

export default Page;
