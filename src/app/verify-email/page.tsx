import React from "react";
import SetPassword from "@/(components)/auth/SetPassword";
import Header from "@/(components)/Header";

const page = () => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <Header />
      <SetPassword />
    </div>
  );
};

export default page;
