import React, { useState } from 'react';
import { FaLock, FaUser, FaShieldAlt, FaCookieBite, FaLink, FaSync, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CallToAction from './CallToAction';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="bg-[#f9f5ef] min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#0a1a2f] to-[#1a3357] py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-[#c19d56]/20"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-[#c19d56]/15"></div>
          <div className="absolute bottom-10 left-1/3 w-14 h-14 rounded-full bg-[#c19d56]/10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-[#c19d56] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaLock className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-[#c19d56] mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your privacy is our priority. We're committed to protecting your personal information with transparency and care.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Last Updated */}
            <div className="bg-[#f0e6d8] p-6 border-b border-[#e4d5c1] flex items-center justify-between">
              <div className="flex items-center">
                <FaSync className="text-[#c19d56] text-xl mr-3" />
                <span className="font-semibold">Last updated: July 11, 2025</span>
              </div>
              <div className="text-sm bg-[#0a1a2f] text-white px-3 py-1 rounded-full">
                Version 2.1
              </div>
            </div>
            
            {/* Introduction */}
            <div className="p-8 border-b border-[#e4d5c1]">
              <p className="text-lg mb-4">
                At Life & Emotions, we are committed to safeguarding your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or use our services. By accessing our platform, you agree to the terms outlined here.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-[#f9f5ef] px-4 py-2 rounded-full flex items-center">
                  <div className="w-3 h-3 bg-[#c19d56] rounded-full mr-2"></div>
                  <span>Transparent Data Practices</span>
                </div>
                <div className="bg-[#f9f5ef] px-4 py-2 rounded-full flex items-center">
                  <div className="w-3 h-3 bg-[#c19d56] rounded-full mr-2"></div>
                  <span>Secure Information Handling</span>
                </div>
                <div className="bg-[#f9f5ef] px-4 py-2 rounded-full flex items-center">
                  <div className="w-3 h-3 bg-[#c19d56] rounded-full mr-2"></div>
                  <span>User Control & Rights</span>
                </div>
              </div>
            </div>
            
            {/* Policy Sections - Accordion Style */}
            <div className="divide-y divide-[#e4d5c1]">
              {/* Section 1 */}
              <div className="p-8">
                <button 
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => toggleSection(1)}
                >
                  <div className="flex items-center">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FaUser className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      1. Information We Collect
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 1 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 1 && (
                  <div className="mt-6 pl-14">
                    <p className="mb-4">We collect various types of information to provide and improve our services:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li className="flex items-start">
                        <div className="bg-[#f0e6d8] w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          <span className="text-[#0a1a2f] text-sm font-bold">1</span>
                        </div>
                        <span>Personal information such as name, email, phone number, and address.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#f0e6d8] w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          <span className="text-[#0a1a2f] text-sm font-bold">2</span>
                        </div>
                        <span>Order details and communication history.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#f0e6d8] w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          <span className="text-[#0a1a2f] text-sm font-bold">3</span>
                        </div>
                        <span>Browser information, IP address, and device type for analytics and security.</span>
                      </li>
                    </ul>
                    <div className="mt-6 bg-[#f9f5ef] p-4 rounded-lg border border-[#e4d5c1]">
                      <p className="text-sm italic">We only collect information that is necessary to provide our services and enhance your experience.</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Section 2 */}
              <div className="p-8">
                <button 
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => toggleSection(2)}
                >
                  <div className="flex items-center">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      2. How We Use Your Information
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 2 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 2 && (
                  <div className="mt-6 pl-14">
                    <p className="mb-4">We use your information to:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#f9f5ef] p-5 rounded-lg border border-[#e4d5c1]">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#0a1a2f] text-[#c19d56] w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="font-bold">Order Processing</h3>
                        </div>
                        <p>Process and fulfill your orders efficiently and accurately.</p>
                      </div>
                      
                      <div className="bg-[#f9f5ef] p-5 rounded-lg border border-[#e4d5c1]">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#0a1a2f] text-[#c19d56] w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                          </div>
                          <h3 className="font-bold">Customer Support</h3>
                        </div>
                        <p>Respond to your inquiries and provide exceptional customer service.</p>
                      </div>
                      
                      <div className="bg-[#f9f5ef] p-5 rounded-lg border border-[#e4d5c1]">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#0a1a2f] text-[#c19d56] w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="font-bold">Personalization</h3>
                        </div>
                        <p>Send promotional emails only if you opt in to receive them.</p>
                      </div>
                      
                      <div className="bg-[#f9f5ef] p-5 rounded-lg border border-[#e4d5c1]">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#0a1a2f] text-[#c19d56] w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="font-bold">Improvement</h3>
                        </div>
                        <p>Continuously enhance our website, products, and user experience.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Section 3 */}
              <div className="p-8">
                <button 
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => toggleSection(3)}
                >
                  <div className="flex items-center">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      3. Information Sharing
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 3 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 3 && (
                  <div className="mt-6 pl-14">
                    <p className="mb-4">
                      We do not sell or rent your personal information. However, we may share it with:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Trusted service providers (e.g., payment processors, delivery services)</li>
                      <li>Government bodies if legally required</li>
                    </ul>
                    <div className="mt-6 bg-[#f0e6d8] p-5 rounded-lg">
                      <h3 className="font-bold text-[#0a1a2f] mb-2">Our Commitment</h3>
                      <p>We maintain strict confidentiality agreements with all third-party partners to ensure your data remains protected.</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Section 4 */}
              <div className="p-8">
                <button 
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => toggleSection(4)}
                >
                  <div className="flex items-center">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FaCookieBite className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      4. Cookies & Tracking
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 4 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 4 && (
                  <div className="mt-6 pl-14">
                    <p className="mb-4">
                      We use cookies and similar technologies to analyze trends, administer the website, track users' movements around the site, and gather demographic information about our user base.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="bg-[#f9f5ef] px-3 py-1 rounded-full text-sm">Essential Cookies</div>
                      <div className="bg-[#f9f5ef] px-3 py-1 rounded-full text-sm">Performance Cookies</div>
                      <div className="bg-[#f9f5ef] px-3 py-1 rounded-full text-sm">Analytics Cookies</div>
                      <div className="bg-[#f9f5ef] px-3 py-1 rounded-full text-sm">Marketing Cookies</div>
                    </div>
                    <p>
                      You can manage cookies through your browser settings. Disabling cookies may affect your experience on our site.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Section 5 */}
              <div className="p-8">
                <button 
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => toggleSection(5)}
                >
                  <div className="flex items-center">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FaShieldAlt className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      5. Data Security
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 5 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 5 && (
                  <div className="mt-6 pl-14">
                    <p className="mb-4">
                      We implement industry-standard security measures to protect your data, including:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-[#f9f5ef] p-4 rounded-lg text-center">
                        <div className="bg-[#0a1a2f] text-[#c19d56] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <h3 className="font-bold">Encryption</h3>
                        <p className="text-sm">Data transmission with SSL/TLS encryption</p>
                      </div>
                      
                      <div className="bg-[#f9f5ef] p-4 rounded-lg text-center">
                        <div className="bg-[#0a1a2f] text-[#c19d56] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="font-bold">Access Control</h3>
                        <p className="text-sm">Strict access permissions to sensitive data</p>
                      </div>
                      
                      <div className="bg-[#f9f5ef] p-4 rounded-lg text-center">
                        <div className="bg-[#0a1a2f] text-[#c19d56] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                          </svg>
                        </div>
                        <h3 className="font-bold">Regular Audits</h3>
                        <p className="text-sm">Continuous security assessments</p>
                      </div>
                    </div>
                    <p className="italic">
                      However, no online platform is 100% secure. Always use strong passwords and avoid sharing sensitive data via unsecured channels.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Section 6 */}
              <div className="p-8">
                <button 
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => toggleSection(6)}
                >
                  <div className="flex items-center">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      6. Your Rights
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 6 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 6 && (
                  <div className="mt-6 pl-14">
                    <ul className="list-disc list-inside space-y-2">
                      <li>You may request access to your data</li>
                      <li>You can request to update or delete your data at any time</li>
                    </ul>
                    <div className="mt-6 bg-gradient-to-r from-[#0a1a2f] to-[#1a3357] p-6 rounded-lg text-white">
                      <div className="flex items-center mb-4">
                        <FaEnvelope className="text-[#c19d56] text-xl mr-3" />
                        <h3 className="text-xl font-bold">Contact Us</h3>
                      </div>
                      <p className="mb-4">
                        To exercise these rights, please contact us at:
                      </p>
                      <a 
                        href="mailto:beautifulmolds@gmail.com" 
                        className="text-[#c19d56] font-bold text-lg hover:underline"
                      >
                        beautifulmolds@gmail.com
                      </a>
                      <p className="mt-4 text-sm">
                        We respond to all requests within 48 business hours.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Section 7 */}
              <div className="p-8">
                <button 
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => toggleSection(7)}
                >
                  <div className="flex items-center">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FaLink className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      7. Third-Party Links
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 7 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 7 && (
                  <div className="mt-6 pl-14">
                    <p>
                      Our website may contain links to other sites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any website you visit.
                    </p>
                    <div className="mt-4 bg-[#f9f5ef] p-4 rounded-lg border border-[#e4d5c1]">
                      <p className="font-bold mb-2">Recommendation:</p>
                      <p>Always check for a privacy policy link in the footer of any website you visit.</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Section 8 */}
              <div className="p-8">
                <button 
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => toggleSection(8)}
                >
                  <div className="flex items-center">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FaSync className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      8. Changes to This Policy
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 8 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 8 && (
                  <div className="mt-6 pl-14">
                    <p>
                      We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Changes will be posted here with an updated effective date.
                    </p>
                    <div className="mt-4 flex items-center p-4 bg-[#f0e6d8] rounded-lg">
                      <div className="bg-[#0a1a2f] text-[#c19d56] w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-semibold">
                        We recommend reviewing this policy periodically to stay informed about how we are protecting your information.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Contact Card */}
          <div className="mt-12 bg-gradient-to-r from-[#0a1a2f] to-[#1a3357] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-8 md:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Privacy Questions?</h2>
                  <p className="text-lg opacity-90 max-w-2xl">
                    Our privacy team is here to answer any questions you have about your data and our policies.
                  </p>
                </div>
                
                <div className="md:w-1/3">
                  <a 
                    href="mailto:beautifulmolds@gmail.com" 
                    className="bg-[#c19d56] text-[#0a1a2f] font-bold py-4 px-8 rounded-lg hover:bg-[#a8843f] transition-colors flex items-center justify-center"
                  >
                    <FaEnvelope className="mr-2" />
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CallToAction />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;