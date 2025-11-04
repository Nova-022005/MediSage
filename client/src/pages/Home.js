import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/heroImage.png";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-teal-100 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-20 flex-grow relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-teal-50">
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative z-10 max-w-xl text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-snug mb-6 pb-1 bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-blue-800 drop-shadow-sm [text-rendering:optimizeLegibility]">
            Manage & Analyze Your  <br/> Medical Records Intelligently
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            MediSage lets you securely store your health documents and uses AI
            to provide personalized insights, lifestyle tips, and insurance
            recommendations — all in one place.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link
              to="/register"
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border-2 border-teal-600 text-teal-700 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 hover:scale-105 transition-transform duration-300"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="relative mt-12 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-200 to-blue-200 blur-2xl opacity-30 rounded-full"></div>
          <img
            src={heroImg}
            alt="Medical illustration"
            className="relative w-full max-w-md lg:max-w-lg drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 px-8 lg:px-20">
        <h3 className="text-4xl font-bold text-center mb-14 text-gray-800">
          ⚙️ Key Features of <span className="text-teal-600">MediSage</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "🔒 Secure Document Storage",
              desc: "Safely upload and manage your prescriptions, lab reports, and medical records in an encrypted digital vault.",
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
              className="p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-teal-100"
            >
              <h4 className="text-xl font-semibold text-teal-700 mb-3">
                {item.title}
              </h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-24 px-8 lg:px-20 bg-gradient-to-r from-blue-50 to-teal-50"
      >
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">
          🚀 How <span className="text-teal-600">MediSage</span> Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              step: "1️⃣ Upload Documents",
              desc: "Add your medical reports, prescriptions, or health scans securely to your MediSage vault.",
            },
            {
              step: "2️⃣ AI Analysis",
              desc: "Our AI analyzes your health history and provides meaningful insights and recommendations.",
            },
            {
              step: "3️⃣ Get Insights",
              desc: "Receive lifestyle, fitness, and insurance suggestions tailored to your health profile.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <h4 className="text-xl font-semibold text-teal-700 mb-3">
                {item.step}
              </h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-gray-800">
            💬 About <span className="text-teal-600">MediSage</span>
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
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
