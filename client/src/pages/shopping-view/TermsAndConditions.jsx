import React, { useState } from 'react';
import { FaGavel, FaBook, FaUserShield, FaFileContract, FaExclamationTriangle, FaBalanceScale, FaGlobe, FaSync, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Footer from './Footer';
import CallToAction from './CallToAction';

const TermsAndConditions = () => {
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
            <FaGavel className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <div className="w-24 h-1 bg-[#c19d56] mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Please read these terms carefully before using our services. By accessing our platform, you agree to be bound by these terms.
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
                <span className="font-semibold">Last updated: June 12, 2025</span>
              </div>
              <div className="text-sm bg-[#0a1a2f] text-white px-3 py-1 rounded-full">
                Version 3.0
              </div>
            </div>
            
            {/* Introduction */}
            <div className="p-8 border-b border-[#e4d5c1]">
              <p className="text-lg mb-4">
                Welcome to Beatiful Molds! These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions in full.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-[#f9f5ef] px-4 py-2 rounded-full flex items-center">
                  <div className="w-3 h-3 bg-[#c19d56] rounded-full mr-2"></div>
                  <span>Legal Agreement</span>
                </div>
                <div className="bg-[#f9f5ef] px-4 py-2 rounded-full flex items-center">
                  <div className="w-3 h-3 bg-[#c19d56] rounded-full mr-2"></div>
                  <span>User Responsibilities</span>
                </div>
                <div className="bg-[#f9f5ef] px-4 py-2 rounded-full flex items-center">
                  <div className="w-3 h-3 bg-[#c19d56] rounded-full mr-2"></div>
                  <span>Service Limitations</span>
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
                      <FaBook className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      1. Definitions
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 1 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 1 && (
                  <div className="mt-6 pl-14">
                    <p className="mb-4">For the purposes of these Terms and Conditions:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li className="flex items-start">
                        <div className="bg-[#f0e6d8] w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          <span className="text-[#0a1a2f] text-sm font-bold">1</span>
                        </div>
                        <span><strong>"Company"</strong> refers to Beautiful Molds, located at Surya Vihar Part 2, Sector 91, Faridabad, Hariyana 121003, India</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#f0e6d8] w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          <span className="text-[#0a1a2f] text-sm font-bold">2</span>
                        </div>
                        <span><strong>"Client", "You", "Your"</strong> refers to the individual accessing our services.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#f0e6d8] w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          <span className="text-[#0a1a2f] text-sm font-bold">3</span>
                        </div>
                        <span><strong>"Service"</strong> refers to our life casting and memorial services.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-[#f0e6d8] w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          <span className="text-[#0a1a2f] text-sm font-bold">4</span>
                        </div>
                        <span><strong>"Content"</strong> refers to text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You.</span>
                      </li>
                    </ul>
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
                      <FaUserShield className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      2. User Accounts
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 2 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 2 && (
                  <div className="mt-6 pl-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#f9f5ef] p-5 rounded-lg border border-[#e4d5c1]">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#0a1a2f] text-[#c19d56] w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="font-bold">Account Creation</h3>
                        </div>
                        <p>When you create an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.</p>
                      </div>
                      
                      <div className="bg-[#f9f5ef] p-5 rounded-lg border border-[#e4d5c1]">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#0a1a2f] text-[#c19d56] w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="font-bold">Account Security</h3>
                        </div>
                        <p>You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.</p>
                      </div>
                      
                      <div className="bg-[#f9f5ef] p-5 rounded-lg border border-[#e4d5c1]">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#0a1a2f] text-[#c19d56] w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="font-bold">Account Termination</h3>
                        </div>
                        <p>We reserve the right to terminate accounts that violate these terms or engage in fraudulent or illegal activities.</p>
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
                      <FaFileContract className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      3. Orders & Payments
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 3 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 3 && (
                  <div className="mt-6 pl-14">
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-[#0a1a2f]">Order Acceptance</h3>
                      <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason at any time.</p>
                      
                      <h3 className="font-bold text-lg text-[#0a1a2f] mt-6">Pricing</h3>
                      <p>Prices are subject to change without notice. We reserve the right to modify or discontinue services without notice at any time.</p>
                      
                      <h3 className="font-bold text-lg text-[#0a1a2f] mt-6">Payment Methods</h3>
                      <p>We accept various payment methods including credit cards, debit cards, UPI, and net banking. By providing payment information, you represent that you have the legal right to use the payment method.</p>
                      
                      <div className="mt-6 bg-[#f0e6d8] p-5 rounded-lg">
                        <h3 className="font-bold text-[#0a1a2f] mb-2">Important Note:</h3>
                        <p>Your order is not confirmed until payment is successfully processed. In case of payment failure, your order will not be processed.</p>
                      </div>
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
                      <FaExclamationTriangle className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      4. Intellectual Property
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 4 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 4 && (
                  <div className="mt-6 pl-14">
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-[#0a1a2f]">Ownership</h3>
                      <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of Beautiful Molds or its content suppliers and protected by copyright laws.</p>
                      
                      <h3 className="font-bold text-lg text-[#0a1a2f] mt-6">License to Use</h3>
                      <p>We grant you a limited, non-exclusive, non-transferable license to access and use the services for your personal, non-commercial use.</p>
                      
                      <h3 className="font-bold text-lg text-[#0a1a2f] mt-6">Restrictions</h3>
                      <p>You may not:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Modify, copy, or create derivative works of our content</li>
                        <li>Use our content for any commercial purpose</li>
                        <li>Attempt to decompile or reverse engineer any software</li>
                        <li>Remove any copyright or proprietary notations</li>
                      </ul>
                    </div>
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
                      <FaBalanceScale className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      5. Limitation of Liability
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 5 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 5 && (
                  <div className="mt-6 pl-14">
                    <div className="space-y-4">
                      <p>To the maximum extent permitted by applicable law, in no event shall Life & Emotions, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                      
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Your access to or use of or inability to access or use the Service</li>
                        <li>Any conduct or content of any third party on the Service</li>
                        <li>Any content obtained from the Service</li>
                        <li>Unauthorized access, use or alteration of your transmissions or content</li>
                      </ul>
                      
                      <div className="mt-6 bg-[#f0e6d8] p-5 rounded-lg">
                        <h3 className="font-bold text-[#0a1a2f] mb-2">Important:</h3>
                        <p>In no event shall our aggregate liability exceed the amount you paid us in the last six months.</p>
                      </div>
                    </div>
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
                      <FaGlobe className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      6. Governing Law
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 6 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 6 && (
                  <div className="mt-6 pl-14">
                    <div className="space-y-4">
                      <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
                      
                      <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
                      
                      <div className="mt-6 bg-gradient-to-r from-[#0a1a2f] to-[#1a3357] p-6 rounded-lg text-white">
                        <div className="flex items-center mb-4">
                          <FaBalanceScale className="text-[#c19d56] text-xl mr-3" />
                          <h3 className="text-xl font-bold">Jurisdiction</h3>
                        </div>
                        <p>
                          You agree that any dispute arising from or relating to these Terms will be heard exclusively by the courts of Delhi, India.
                        </p>
                      </div>
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
                      <FaSync className="text-lg" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0a1a2f] group-hover:text-[#c19d56] transition-colors">
                      7. Changes to Terms
                    </h2>
                  </div>
                  <div className="text-[#0a1a2f]">
                    {expandedSection === 7 ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {expandedSection === 7 && (
                  <div className="mt-6 pl-14">
                    <p>
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                    </p>
                    <div className="mt-4 flex items-center p-4 bg-[#f0e6d8] rounded-lg">
                      <div className="bg-[#0a1a2f] text-[#c19d56] w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-semibold">
                        Your continued use of our services after any revisions become effective means you agree to be bound by the revised terms.
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
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Questions About Our Terms?</h2>
                  <p className="text-lg opacity-90 max-w-2xl">
                    Our legal team is available to clarify any aspects of our terms and conditions.
                  </p>
                </div>
                
                <div className="md:w-1/3">
                  <a 
                    href="mailto:legal@lifenemotions.com" 
                    className="bg-[#c19d56] text-[#0a1a2f] font-bold py-4 px-8 rounded-lg hover:bg-[#a8843f] transition-colors flex items-center justify-center"
                  >
                    <FaEnvelope className="mr-2" />
                    Contact Legal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <CallToAction/>
    <Footer/>
    </div>
  );
};

export default TermsAndConditions;