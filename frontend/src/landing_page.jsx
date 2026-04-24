import React from 'react';
import { ArrowRight, Code, Bot, TrendingUp, CheckCircle } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="bg-white overflow-hidden">
      {/* Navigation Header */}
      <header className="fixed w-full top-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CODE PEER</span>
          </div>
          
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">How It Works</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
          </div>
          
          <button onClick={() => onNavigate('login')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Improve your code with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Peer + AI</span> Feedback
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Share your code, get feedback from developers and AI, and grow faster. Join a community of developers committed to writing better code.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate('signup')} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold flex items-center justify-center gap-2 text-lg">
                🚀 Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => onNavigate('login')} className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg">
                Login
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold text-gray-900">200+</p>
                <p className="text-gray-600">Active Developers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">10k+</p>
                <p className="text-gray-600">Code Reviews</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">95%</p>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Developer with laptop"
                className="rounded-2xl shadow-2xl object-cover w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <p className="text-sm font-semibold text-gray-900">Trusted by 200+ developers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-600/20 border border-blue-500/50 px-4 py-2 rounded-full mb-4">
              <span className="text-blue-300 font-semibold text-sm">✨ See it in action</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">How Developers Improve</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Watch our platform in action as developers get real-time feedback and improve their code</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Video container with premium styling */}
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Main video container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-700">
                {/* Play indicator badge */}
                <div className="absolute top-4 right-4 z-20 bg-red-500/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                  <span className="text-white text-xs font-semibold">LIVE</span>
                </div>

                <video
                  className="w-full h-96 object-contain bg-gray-900"
                  autoPlay
                  loop
                  muted
                >
                  <source src="/src/assets/e50e95dce31b0d8913bbdd9a287ba714.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Info card below video */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 translate-y-full mt-4 w-full max-w-sm">
                <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-xl p-4 shadow-xl">
                  <p className="text-gray-300 text-center text-sm">
                    <span className="text-blue-400 font-semibold">Get Started</span> in seconds • Instant AI feedback • Join 200+ developers
                  </p>
                </div>
              </div>
            </div>

            {/* Space for the info card */}
            <div className="mt-20"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to improve your code</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-shadow border border-blue-200">
              <div className="bg-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Peer Review</h3>
              <p className="text-gray-700 leading-relaxed">
                Get constructive feedback from experienced developers in our community. Learn best practices and improve your code quality.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-lg transition-shadow border border-purple-200">
              <div className="bg-purple-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Code Analysis</h3>
              <p className="text-gray-700 leading-relaxed">
                Get instant AI-powered suggestions to improve your code. Our AI catches bugs, improves performance, and suggests best practices.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl hover:shadow-lg transition-shadow border border-green-200">
              <div className="bg-green-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Growth Tracking</h3>
              <p className="text-gray-700 leading-relaxed">
                Track how your code improves over time. Get detailed analytics and insights about your progress as a developer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to improve your code</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Paste Your Code</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Share your code snippet or entire project. Support for all programming languages and frameworks.
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Feedback</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Receive detailed feedback from both AI and experienced developers in minutes.
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Improve</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Apply the feedback and watch your code quality improve with each review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose CODE PEER?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Get real feedback from experienced developers",
              "AI-powered code analysis and suggestions",
              "Track your improvement over time",
              "Learn best practices from the community",
              "No more isolation in your learning journey",
              "Build connections with other developers"
            ].map((benefit, index) => (
              <div key={index} className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <p className="text-white text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold text-white">
            Ready to Improve Your Code?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Start improving your code today with AI feedback and peer reviews from our community.
          </p>
          <button onClick={() => onNavigate('signup')} className="bg-white text-blue-600 px-10 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg inline-flex items-center gap-2">
            Sign Up Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CODE PEER</span>
              </div>
              <p className="text-sm text-gray-400">
                Improve your code with peer and AI feedback.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">License</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-sm text-gray-400">
              © 2026 CODE PEER. All rights reserved. Made with ❤️ by developers, for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 