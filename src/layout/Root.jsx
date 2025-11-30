import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const Root = () => {
  const navigation = useNavigation();

  return (
    <div className="min-h-screen relative">

   
      {navigation.state === "loading" && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
