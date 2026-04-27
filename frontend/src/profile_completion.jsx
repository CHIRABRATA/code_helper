import React, { useState, useEffect } from 'react';
import { ArrowRight, User, Code } from 'lucide-react';
import { supabase } from './supabaseClient';

const ProfileCompletion = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    avatar: '👨‍💻',
    bio: ''
  });

  const avatarOptions = ['👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🎓', '👩‍🎓', '🔧', '⚡', '🚀', '🎨', '📚'];

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAuthUser(user);
        // Pre-fill name from auth metadata
        const emailPrefix = user.email?.split('@')[0] || 'user';
        setFormData(prev => ({
          ...prev,
          name: user.user_metadata?.full_name || '',
          handle: emailPrefix
        }));
      }
    };
    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        alert('Please enter your name');
        setLoading(false);
        return;
      }
      if (!formData.handle.trim()) {
        alert('Please enter a handle');
        setLoading(false);
        return;
      }

      // Create user profile in database
      const { error } = await supabase
        .from('users')
        .insert({
          id: authUser.id,
          name: formData.name,
          handle: formData.handle,
          avatar: formData.avatar,
          is_pro: false,
          posts_count: 0,
          followers_count: 0,
          following_count: 0,
          created_at: new Date().toISOString()
        });

      if (error) {
        if (error.message.includes('duplicate key')) {
          alert('This handle is already taken. Please choose another.');
        } else {
          alert('Error creating profile: ' + error.message);
        }
        setLoading(false);
        return;
      }

      // Success - redirect to dashboard
      alert('Profile created successfully! Welcome to CodeHub 🎉');
      onNavigate('dashboard');
    } catch (error) {
      alert('Unexpected error: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
            <Code className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-white">CodeHub</h1>
        </div>

        {/* Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
          <p className="text-slate-400 mb-6">Just a few more details to get started!</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Handle */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Handle (username)</label>
              <input
                type="text"
                name="handle"
                value={formData.handle}
                onChange={handleInputChange}
                placeholder="@yourhandle"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Choose Avatar</label>
              <div className="grid grid-cols-5 gap-2">
                {avatarOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, avatar: emoji }))}
                    className={`h-12 rounded-lg text-2xl flex items-center justify-center border-2 transition-all ${
                      formData.avatar === emoji
                        ? 'border-indigo-500 bg-indigo-500/20'
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Bio (optional)</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows="3"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-600/30 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Creating Profile...' : 'Complete Profile'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Info */}
          <p className="text-xs text-slate-500 text-center mt-6">
            We only need this information once. You can update your profile anytime later!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
