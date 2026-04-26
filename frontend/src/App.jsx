import { useState, useEffect } from 'react';
import LandingPage from './landing_page';
import LoginPage from './login_page';
import SignupPage from './signup_page';
import Dashboard from './dashboard';
import { supabase } from './supabaseClient';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // User is already logged in, go to dashboard
          setCurrentPage('dashboard');
        } else {
          // No session, stay on landing page
          setCurrentPage('landing');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setCurrentPage('landing');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes (login, logout, etc)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && event !== 'SIGNED_OUT') {
          // User is signed in
          setCurrentPage('dashboard');
        } else if (!session && event === 'SIGNED_OUT') {
          // User signed out
          setCurrentPage('landing');
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold mx-auto mb-4">
            &lt;/&gt;
          </div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <SignupPage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
    </>
  );
}

export default App;