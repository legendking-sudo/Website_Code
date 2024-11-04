import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import PostPropertyPage from "../postProperty/property";
import AuthPage from "../signin/signinsignup";
import SellerDashboard from "../sellerDashboard/sellerDashboard";
const Pages = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-property" element={<PostPropertyPage />} />
        <Route path="/signin-signup" element={<AuthPage />} />
        <Route path="/SellerDashboard" element={<SellerDashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Pages;
