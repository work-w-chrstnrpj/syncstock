import { Package, BarChart3, RefreshCw, Shield, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">SyncStock</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">Benefits</a>
              <button 
                onClick={() => navigate('/sign-in')}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Sign In
              </button>
              <button 
                onClick={() => navigate('/register-company')}
                className="bg-[#2563eb] text-white px-6 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-600 hover:text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#benefits" className="block text-gray-600 hover:text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>Benefits</a>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('/sign-in'); }}
                className="w-full border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                Sign In
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('/register-company'); }}
                className="w-full bg-[#2563eb] text-white px-6 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-[#2563eb] mb-6">
              <span className="text-sm">Smart Inventory Management</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Keep Your Inventory{' '}
              <span className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent">
                In Perfect Sync
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Real-time inventory tracking across all your channels. Eliminate stockouts, reduce overstocking, and make data-driven decisions with SyncStock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/register-company')}
                className="bg-[#2563eb] text-white px-8 py-4 rounded-lg hover:bg-[#1d4ed8] transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                Start Using SyncStock
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors">
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">Free and Open Source Software</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage inventory
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your operations and boost efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<RefreshCw className="w-6 h-6" />}
              title="Real-Time Sync"
              description="Automatic synchronization across all sales channels and warehouses in real-time"
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Analytics Dashboard"
              description="Comprehensive insights and reports to optimize your inventory levels"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Secure & Reliable"
              description="Enterprise-grade security with 99.9% uptime guarantee"
            />
            <FeatureCard
              icon={<Package className="w-6 h-6" />}
              title="Multi-Location"
              description="Manage inventory across unlimited locations from one central hub"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#2563eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-100">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">50M+</div>
              <div className="text-blue-100">Items Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to optimize your inventory?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses that trust SyncStock for their inventory management
          </p>
          <button 
            onClick={() => navigate('/register-company')}
            className="bg-[#2563eb] text-white px-8 py-4 rounded-lg hover:bg-[#1d4ed8] transition-all hover:shadow-lg hover:shadow-blue-500/25 inline-flex items-center gap-2">
            Start Using SyncStock
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">SyncStock</span>
            </div>
            <div className="flex gap-8 text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">
            © 2026 SyncStock. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#2563eb] transition-all hover:shadow-lg group">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#2563eb] mb-4 group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
