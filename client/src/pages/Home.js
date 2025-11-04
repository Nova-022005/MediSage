import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/heroImage.png";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-20 flex-grow relative overflow-hidden bg-[#F5F5F7]">
        <div className="relative z-10 max-w-2xl text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-[#1A1A1A]">
            AI-Powered Health Management
          </h1>
          <p className="text-xl text-[#6B7280] mb-8 leading-relaxed max-w-3xl">
            Secure open-source platform for managing medical records with AI insights and privacy protection.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link
              to="/register"
              className="bg-[#4F46E5] text-white px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-[#4338CA] hover:shadow-lg transition-all duration-300"
            >
              Sign up for demo
            </Link>
            <Link
              to="/login"
              className="border-2 border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 rounded-xl font-semibold hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
            >
              View on Github
            </Link>
          </div>
        </div>

        <div className="relative mt-12 lg:mt-0">
          <img
            src={heroImg}
            alt="Medical illustration"
            className="relative w-full max-w-md lg:max-w-lg drop-shadow-xl"
          />
        </div>
      </section>

      {/* See How It Works Section */}
      <section className="bg-white py-16 px-8 lg:px-20 text-center">
        <h3 className="text-4xl font-bold mb-4 text-[#1A1A1A]">
          See how it works
        </h3>
        <p className="text-[#6B7280] mb-6">Watch now | 1 min</p>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#F5F5F7] py-24 px-8 lg:px-20">
        <h3 className="text-4xl font-bold text-center mb-14 text-[#1A1A1A]">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "🔒 Secure Document Storage",
              desc: "Safely upload and manage your prescriptions, lab reports, and medical records with end-to-end encryption in a digital vault.",
            },
            {
              title: "🧠 AI Health Insights",
              desc: "Get AI-powered lifestyle and wellness recommendations based on your medical history and document analysis.",
            },
            {
              title: "💡 Insurance Suggestions",
              desc: "Receive personalized health insurance plan recommendations aligned with your health profile.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h4 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                {item.title}
              </h4>
              <p className="text-[#6B7280]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-24 px-8 lg:px-20 bg-white"
      >
        <h3 className="text-4xl font-bold text-center mb-12 text-[#1A1A1A]">
          How it works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-6xl mx-auto">
          {[
            {
              step: "1. Upload Documents",
              desc: "Add your medical reports, prescriptions, or health scans securely to your MediSage vault.",
            },
            {
              step: "2. AI Analysis",
              desc: "Our AI analyzes your health history and provides meaningful insights and recommendations.",
            },
            {
              step: "3. Get Insights",
              desc: "Receive lifestyle, fitness, and insurance suggestions tailored to your health profile.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-[#F5F5F7] rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h4 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                {item.step}
              </h4>
              <p className="text-[#6B7280]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 lg:px-20 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-[#1A1A1A]">
            About MediSage
          </h3>
          <p className="text-[#6B7280] text-lg leading-relaxed">
            MediSage is a next-generation AI-powered medical document management
            platform built on the MERN stack. It combines secure storage,
            intelligent health analysis, and insurance recommendations — giving
            patients and doctors a unified health record system like never
            before.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
