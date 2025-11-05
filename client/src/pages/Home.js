import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/heroImage.png";
import secureImg from "../assets/secure.png";
import chatImg from "../assets/chat.png";

const Home = () => {
  const [openCard, setOpenCard] = useState(null);

  const toggleCard = (index) => {
    setOpenCard(openCard === index ? null : index);
  };

  const useCases = [
    {
      title: "Medical Records",
      description: "Complete medical history including diagnoses, treatments, medications, and care plans from all your healthcare providers."
    },
    {
      title: "Blood Test Results",
      description: "Comprehensive blood work analysis including complete blood count, metabolic panels, and specialized markers."
    },
    {
      title: "Clinical Findings",
      description: "Detailed examination findings, vital signs, and clinical observations from doctor visits and consultations."
    },
    {
      title: "Biomarker Levels",
      description: "Track important health indicators like cholesterol, glucose, hormones, and other biological markers over time."
    },
    {
      title: "Hematology Report",
      description: "Detailed blood cell counts, hemoglobin levels, and other hematological parameters for monitoring blood health."
    },
    {
      title: "Immunology Results",
      description: "Immune system function tests, antibody levels, and allergy test results for comprehensive immune health assessment."
    },
    {
      title: "Pathology Report",
      description: "Laboratory analysis of tissue samples, biopsies, and cellular examinations for disease diagnosis and monitoring."
    },
    {
      title: "Patient History",
      description: "Complete health timeline including past illnesses, surgeries, family medical history, and lifestyle factors."
    },
    {
      title: "Serology Results",
      description: "Standardize antibody test results across different assays. Monitor immune status changes over time."
    },
    {
      title: "CBC (Complete Blood Count)",
      description: "Detailed analysis of red blood cells, white blood cells, platelets, and related parameters for overall health screening."
    },
    {
      title: "Electrolyte Panel",
      description: "Sodium, potassium, chloride, and bicarbonate levels to monitor fluid balance and metabolic function."
    },
    {
      title: "Liver Function Tests (LFTs)",
      description: "Enzyme and protein levels that assess liver health, including ALT, AST, bilirubin, and albumin measurements."
    },
    {
      title: "Renal Function Tests",
      description: "Kidney health indicators including creatinine, BUN, and GFR to monitor kidney performance and detect issues."
    },
    {
      title: "Metabolic Panel",
      description: "Comprehensive metabolic screening including glucose, calcium, and kidney/liver function markers for overall health."
    },
    {
      title: "Radiology Report",
      description: "Imaging study results from X-rays, CT scans, MRIs, and ultrasounds with detailed radiologist interpretations."
    },
    {
      title: "Urinalysis",
      description: "Urine test results analyzing physical, chemical, and microscopic properties for kidney and urinary tract health."
    },
    {
      title: "Microbiology Results",
      description: "Culture and sensitivity tests identifying bacteria, viruses, or fungi with antibiotic resistance patterns."
    },
    {
      title: "Genetic Testing",
      description: "DNA analysis results for hereditary conditions, disease risk factors, and personalized medicine insights."
    }
  ];

  const securityCards = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      title: "Unique Database Identification",
      description: "Every user's data is linked to a unique identifier of users' choice - we called it Database Id and it could be: personal ID, social security number, any other random identifier. This identifier is never sent to our servers in its original form. Instead, it's hashed using SHA-256, ensuring that even if intercepted, the information remains protected and untraceable.",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "End-to-End Encryption",
      description: "Your medical records are encrypted on your device before being transmitted to our servers. We use industry-standard AES-256 encryption to ensure your data remains private and secure throughout its entire lifecycle, from upload to storage to retrieval.",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Complete Data Protection",
      description: "Every action involving your data is secured with the highest levels of encryption. Even when accessing your data, our servers only receive hashed versions of your keys. These hashes are verified, but the actual keys remain on your device. This approach ensures that your data is inaccessible to unauthorized parties, including our servers, providing you with peace of mind that your information is always secure.",
      gradient: "from-blue-400 to-blue-600"
    }
  ];

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
      <section id="how-it-works" className="bg-white py-16 px-8 lg:px-20 text-center">
        <h3 className="text-4xl font-bold mb-4 text-[#1A1A1A]">
          See how it works
        </h3>
        <p className="text-[#6B7280] mb-6">Watch now | 1 min</p>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#0d1247] py-24 px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-base bold font-bold text-white mb-4 tracking-wide">Features</p>
          <h3 className="text-4xl lg:text-5xl font-bold text-center mb-20 text-white font-sans">
            Framework for building your Health Product
          </h3>

          {/* First Row - Two Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Encrypted Storage Card */}
            <div className="bg-[#f9fafb] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-10">
                <p className="text-base leading-normal font-semibold text-black mb-3">Encrypted storage</p>
                <h4 className="text-[32px] leading-tight font-bold text-[#1A1A1A] mb-6">
                  Store any health record safely
                </h4>
                <p className="text-black leading-relaxed">
                  Upload unstructured medical data, even poor-quality photos of documents. Don't lose any medical records and make sure they are safe behind unique secret key that only you have access to (not even us). You have access everywhere you go with your family without looking through email and cloud drives.
                </p>
              </div>
              <div className="overflow-hidden">
                <img src={secureImg} alt="Secure Storage" className="w-full px-[0.12px] h-full object-cover" />
              </div>
            </div>

            {/* AI Interpretation Card */}
            <div className="bg-[#f9fafb] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-10 mb-[26px]">
                <p className="text-base leading-normal font-semibold text-black mb-3">AI Interpretation</p>
                <h4 className="text-[32px] leading-tight font-bold text-[#1A1A1A] mb-6">
                  Chat with AI about results
                </h4>
                <p className="text-black leading-relaxed">
                  Analyze, check and find next actions of your medical records. You can translate to any language when traveling and benefit all AI advancements knowing your data was encrypted, redacted or removed before going to Local or Cloud LLM.
                </p>
              </div>
              <div className="overflow-hidden">
                <img src={chatImg} alt="AI Chat Interface" className="w-full px-[0.12px] h-full object-cover block" />
              </div>
            </div>
          </div>

          {/* Second Row - Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f9fafb] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 mb-3 flex items-center justify-center leading-normal">
                <i className="fa-solid fa-notes-medical text-4xl"></i>
              </div>
              <h4 className="text-[24px] leading-normal font-bold text-[#1A1A1A] mb-4">
                Understand any type of health record
              </h4>
              <p className="text-black text-[16px] leading-normal">
                Doctor Dok let you upload any note, image, scan, PDF to one system and understand what's inside translating auto summaries and making it into digestible text and data that AI understands
              </p>
            </div>

            <div className="bg-[#f9fafb] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 mb-3 flex items-center justify-center leading-normal">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-[24px] leading-normal font-bold text-[#1A1A1A] mb-4">
                Health Timeline in one place
              </h4>
              <p className="text-black text-[16px] leading-normal">
                Trust one place with all your medical records instead of having them split into email, external drives and photos on your phone. One place where you can search by tags, dates and tests.
              </p>
            </div>

            <div className="bg-[#f9fafb] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 mb-3 flex items-center justify-center leading-normal">
                <i className="fa-solid fa-house-medical-flag text-4xl"></i>
              </div>
              <h4 className="text-[24px] leading-normal font-bold text-[#1A1A1A] mb-4">
                Managing Medical data of closed ones.
              </h4>
              <p className="text-black text-[16px] leading-normal">
                Store data of your Spouse, Children, Parents with easy online access. Safe sharing within your family, with your physician by using Sharing Key feature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section
        id="use-cases"
        className="py-24 px-8 lg:px-20 bg-white"
      >
        <h3 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A]">
          Use Cases
        </h3>
        <p className="text-center text-[#6B7280] mb-12 text-lg">
          Here are all medical documents you can use with MediSage
        </p>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="relative"
                style={{ zIndex: openCard === index ? 50 : 1 }}
              >
                <div
                  onClick={() => toggleCard(index)}
                  className="bg-white border border-[#1A1A1A] rounded-xl p-4 hover:shadow-lg transition-all duration-500 ease-in-out cursor-pointer relative overflow-hidden"
                  style={{
                    boxShadow: openCard === index ? '0 10px 25px rgba(0,0,0,0.15)' : ''
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-[#1A1A1A]">{useCase.title}</h4>
                    <i className={`fa-solid fa-plus text-xl text-[#4F46E5] transition-transform duration-500 ease-in-out flex-shrink-0 ${openCard === index ? 'rotate-45' : ''
                      }`}></i>
                  </div>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${openCard === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-[#6B7280] text-sm leading-relaxed">
                          {useCase.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mt-12">
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Security Focus with Stacking Cards */}
      <section id="about" className="py-24 px-8 lg:px-20 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="lg:sticky lg:top-24">
              <p className="text-sm font-semibold text-black mb-4 uppercase tracking-wide">Security</p>
              <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-[#1A1A1A] leading-tight">
                How MediSage Keeps Your Data Safe
              </h3>
              <p className="text-[#6B7280] text-lg mb-6 leading-relaxed">
                At the core of our security model is a Zero Trust approach, designed to ensure that your sensitive information is secure and accessible only by you. Here's a breakdown of how our security system works.
              </p>
              <p className="text-[#6B7280] text-lg mb-8 leading-relaxed">
                By combining advanced encryption techniques, client-side security, and a <span className="font-bold text-[#1A1A1A]">Zero Trust</span> model, we ensure that your data is always protected, private, and under your control.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4">
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
                  Contact us
                </Link>
              </div>
            </div>

            {/* Right Content - Stacking Security Cards */}
            <div className="relative space-y-6">
              {securityCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-10 shadow-lg border border-gray-200 sticky"
                  style={{
                    top: `${6 + index * 3}rem`,
                    zIndex: index + 1
                  }}
                >
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                      {card.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                      {card.title}
                    </h4>
                    <p className="text-[#6B7280] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purple CTA Card - Centered in About Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-[#4F46E5] rounded-3xl p-12 shadow-2xl text-center">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Make your medical records safe and secure
              </h3>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                You store your passwords in safe place. You should also do it for most important data: your health history.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/register"
                  className="bg-white text-[#4F46E5] px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 transition-all duration-300"
                >
                  Sign up for demo
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#4F46E5] transition-all duration-300"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
