import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainLanding = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="landing-page font-sans">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-2xl py-4 rounded-full' : 'bg-[#4A154B] py-6'}`}>
        <nav className="container mx-auto flex justify-between items-center px-6 md:px-40">
          <div className="flex items-center space-x-6">
            <img src={scrolled ? 'logo-scrolled.jpg' : 'logo.png'} alt="Slack Logo" className="h-10 w-auto" />
            <ul className="hidden md:flex space-x-8">
              <li><a className={`font-medium ${scrolled ? 'text-[#4A154B]' : 'text-white'}`} href="#features">Features</a></li>
              <li><a className={`font-medium ${scrolled ? 'text-[#4A154B]' : 'text-white'}`} href="#solutions">Solutions</a></li>
              <li><a className={`font-medium ${scrolled ? 'text-[#4A154B]' : 'text-white'}`} href="#enterprise">Enterprise</a></li>
              <li><a className={`font-medium ${scrolled ? 'text-[#4A154B]' : 'text-white'}`} href="#resources">Resources</a></li>
              <li><a className={`font-medium ${scrolled ? 'text-[#4A154B]' : 'text-white'}`} href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button className={`text-md font-medium border px-6 py-2 rounded ${scrolled ? 'text-[#4A154B] border-[#4A154B] bg-white' : 'text-white border-white bg-[#4A154B]'}`}><Link to={'/login'}>Already a user?</Link></button>
            <button className={`text-md font-medium border px-6 py-2 rounded ${scrolled ? 'text-white border-white bg-[#4A154B]' : 'text-[#4A154B] border-[#4A154B] bg-white'}`}><Link to={'/register'}>CREATE A NEW WORKSPACE</Link></button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero bg-[#4A154B] text-white py-16">
        <div className="container mx-auto text-center px-6 mt-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Slack</h1>
          <p className="text-lg md:text-xl mb-6">Where teams collaborate efficiently and effectively.</p>
          <button className="bg-white text-[#4A154B] px-8 py-3 rounded-lg text-lg"><Link to={'/register'}>GET STARTED</Link></button>
        </div>
        <div className="mt-8 flex justify-center">
          <img src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/hero-5-ways-to-use-apps-workflows%402x.en_.EN_.jpg" alt="Hero Image" className="w-full max-w-md h-auto rounded-lg" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features py-16 bg-gray-200">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-item p-6 border rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl bg-white">
              <img src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/hero-collection-digital-hq%402x.jpg" className="w-full h-auto mb-4 rounded-lg"/>
              <h3 className="text-2xl font-semibold mb-4">Real-time Messaging</h3>
              <p className="text-lg">Communicate with your team in real-time with instant messaging.</p>
            </div>
            {/* Feature 2 */}
            <div className="feature-item p-6 border rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl bg-white">
              <img src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/cebu-campaign-slack-hero.jpg" alt="Channel Organization" className="w-full h-auto mb-4 rounded-lg"/>
              <h3 className="text-2xl font-semibold mb-4">Channel Organization</h3>
              <p className="text-lg">Organize conversations into channels for different projects and topics.</p>
            </div>
            {/* Feature 3 */}
            <div className="feature-item p-6 border rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl bg-white">
              <img src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/EDU-Channels-unfurl%402x.jpg" alt="File Sharing" className="w-full h-auto mb-4 rounded-lg"/>
              <h3 className="text-2xl font-semibold mb-4">File Sharing</h3>
              <p className="text-lg">Share files and documents seamlessly within your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing py-16 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
          <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
            {/* Free Plan */}
            <div className="price-plan-item p-6 border rounded-lg shadow-lg text-center bg-white flex-1 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <img src="https://framerusercontent.com/images/1Kp30meK8EOOlWBQxMcVUdF4j48.png" alt="Free Plan" className="w-full h-auto mb-4 rounded-lg"/>
              <h3 className="text-2xl font-semibold mb-4">Free Plan</h3>
              <p className="text-4xl font-bold mb-4">$0</p>
              <p className="text-lg">Basic features for small teams.</p>
            </div>
            {/* Pro Plan */}
            <div className="price-plan-item p-6 border rounded-lg shadow-lg text-center bg-white flex-1 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <img src="https://www.chanty.com/blog/wp-content/uploads/2019/04/Slack-pricing-1-1024x526.png" alt="Pro Plan" className="w-full h-auto mb-4 rounded-lg"/>
              <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
              <p className="text-4xl font-bold mb-4">$15</p>
              <p className="text-lg">Advanced features for growing teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact py-16 bg-gray-200">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <p className="text-lg">Email: support@slack.com</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-[#4A154B] text-white py-6 text-center">
        <p>&copy; 2024 Slack Clone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLanding;
