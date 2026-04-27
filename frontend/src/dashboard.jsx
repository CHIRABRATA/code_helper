import React, { useState, useEffect } from 'react';
import { Search, Home, Compass, Bookmark, FileText, Brain, Code, Bell, Mail, Settings, Plus, Star, Heart, MessageCircle, Share, MoreVertical, Sun, Moon, LogOut, Menu, X, TrendingUp, Award, Zap, ChevronRight } from 'lucide-react';
import { supabase } from './supabaseClient';

const PremiumDashboard = ({ onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [hoveredPost, setHoveredPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [topContributors, setTopContributors] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Compass, label: 'Explore', id: 'explore' },
    { icon: Bookmark, label: 'Bookmarks', id: 'bookmarks' },
    { icon: FileText, label: 'My Posts', id: 'posts' },
    { icon: Brain, label: 'AI Reviews', id: 'reviews' },
    { icon: Code, label: 'Snippets', id: 'snippets' },
  ];

  const togglePostLike = async (postId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please login to like posts');
        return;
      }

      const currentLike = posts.find(p => p.id === postId)?.liked;

      if (currentLike) {
        // Remove like
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        // Add like
        await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: user.id,
          });
      }

      // Update local state
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      ));
    } catch (error) {
      console.error('Error toggling like:', error.message);
      alert('Error toggling like: ' + error.message);
    }
  };

  const togglePostBookmark = async (postId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please login to bookmark posts');
        return;
      }

      const currentBookmark = posts.find(p => p.id === postId)?.bookmarked;

      if (currentBookmark) {
        // Remove bookmark
        await supabase
          .from('post_bookmarks')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        // Add bookmark
        await supabase
          .from('post_bookmarks')
          .insert({
            post_id: postId,
            user_id: user.id,
          });
      }

      // Update local state
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, bookmarked: !post.bookmarked, bookmarks: post.bookmarked ? post.bookmarks - 1 : post.bookmarks + 1 }
          : post
      ));
    } catch (error) {
      console.error('Error toggling bookmark:', error.message);
      alert('Error toggling bookmark: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert('Logout error: ' + error.message);
      } else {
        onNavigate('landing');
      }
    } catch (err) {
      alert('An unexpected error occurred: ' + err.message);
    }
  };

  // Fetch current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (error) throw error;

          setCurrentUser({
            id: userData.id,
            name: userData.name,
            handle: userData.handle,
            avatar: userData.avatar,
            isPro: userData.is_pro,
            posts: userData.posts_count,
            followers: userData.followers_count,
            following: userData.following_count,
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch posts with user info and like/bookmark status
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data: { user: authUser } } = await supabase.auth.getUser();

        // Fetch posts with user details
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            description,
            code,
            language,
            code_language,
            likes_count,
            comments_count,
            bookmarks_count,
            created_at,
            user_id,
            users(id, name, handle, avatar)
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        if (postsError) throw postsError;

        // For each post, check if current user liked or bookmarked it
        let enrichedPosts = [];
        if (postsData) {
          for (const post of postsData) {
            let liked = false;
            let bookmarked = false;

            if (authUser) {
              // Check if user liked this post
              const { data: likeData } = await supabase
                .from('post_likes')
                .select('id')
                .eq('post_id', post.id)
                .eq('user_id', authUser.id)
                .single();
              liked = !!likeData;

              // Check if user bookmarked this post
              const { data: bookmarkData } = await supabase
                .from('post_bookmarks')
                .select('id')
                .eq('post_id', post.id)
                .eq('user_id', authUser.id)
                .single();
              bookmarked = !!bookmarkData;
            }

            // Calculate time ago
            const createdDate = new Date(post.created_at);
            const now = new Date();
            const diffMinutes = Math.floor((now - createdDate) / 60000);
            const diffHours = Math.floor((now - createdDate) / 3600000);
            const diffDays = Math.floor((now - createdDate) / 86400000);

            let timeAgo = '';
            if (diffMinutes < 60) timeAgo = `${diffMinutes}m ago`;
            else if (diffHours < 24) timeAgo = `${diffHours}h ago`;
            else timeAgo = `${diffDays}d ago`;

            enrichedPosts.push({
              id: post.id,
              author: post.users.name,
              avatar: post.users.avatar,
              handle: '@' + post.users.handle,
              timeAgo,
              language: post.language,
              title: post.title,
              description: post.description,
              code: post.code,
              codeLanguage: post.code_language,
              likes: post.likes_count,
              comments: post.comments_count,
              bookmarks: post.bookmarks_count,
              liked,
              bookmarked,
            });
          }
        }

        setPosts(enrichedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch trending tags
  useEffect(() => {
    const fetchTrendingTags = async () => {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('*')
          .order('count', { ascending: false })
          .limit(6);

        if (error) throw error;

        setTrendingTags(data || []);
      } catch (error) {
        console.error('Error fetching trending tags:', error.message);
      }
    };

    fetchTrendingTags();
  }, []);

  // Fetch top contributors (users with most likes on their posts)
  useEffect(() => {
    const fetchTopContributors = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, avatar, posts_count')
          .order('posts_count', { ascending: false })
          .limit(5);

        if (error) throw error;

        const contributorsWithPoints = (data || []).map(user => ({
          name: user.name,
          avatar: user.avatar,
          points: user.posts_count * 50 + Math.floor(Math.random() * 200), // Simple points calculation
        }));

        setTopContributors(contributorsWithPoints);
      } catch (error) {
        console.error('Error fetching top contributors:', error.message);
      }
    };

    fetchTopContributors();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
    }`}>
      {/* HEADER */}
      <header className={`${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800/50 backdrop-blur-xl' 
          : 'bg-white/80 border-slate-200/50 backdrop-blur-xl'
      } border-b sticky top-0 z-40 px-3 sm:px-6 py-3 sm:py-4 shadow-sm transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'hover:bg-slate-800/50 text-slate-300' 
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg`}>
                &lt;/&gt;
              </div>
              <span className={`text-lg sm:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400`}>CODE PEER</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:block flex-1 max-w-xs lg:max-w-md">
            <div className={`relative flex items-center group ${
              isDarkMode 
                ? 'bg-slate-800/40 border-slate-700/40' 
                : 'bg-slate-100/40 border-slate-200/40'
            } rounded-lg px-3 py-2.5 border transition-all duration-300 hover:border-indigo-500/50 focus-within:border-indigo-500`}>
              <Search className={`w-4 h-4 transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`} />
              <input
                type="text"
                placeholder="Search code, users, tags..."
                className={`flex-1 ml-2 bg-transparent outline-none text-xs sm:text-sm placeholder-shown:text-xs ${
                  isDarkMode 
                    ? 'text-white placeholder-slate-500' 
                    : 'text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                isDarkMode 
                  ? 'hover:bg-slate-800/50 text-yellow-400' 
                  : 'hover:bg-slate-100 text-yellow-500'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button className={`p-2 rounded-lg transition-all duration-300 relative group ${
              isDarkMode 
                ? 'hover:bg-slate-800/50 text-slate-400' 
                : 'hover:bg-slate-100 text-slate-600'
            }`}>
              <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Menu */}
            <div className="hidden sm:flex items-center gap-3 pl-3 sm:pl-4 border-l border-slate-700/30">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {currentUser?.avatar?.charAt(0) || 'U'}
              </div>
              <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {currentUser?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className={`p-1.5 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'hover:bg-red-500/10 text-slate-400 hover:text-red-500' 
                    : 'hover:bg-red-50 text-slate-600 hover:text-red-600'
                }`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] sm:h-[calc(100vh-70px)]">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside className={`${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-800/50' 
            : 'bg-white/95 border-slate-200/50'
        } border-r fixed lg:relative lg:w-52 xl:w-56 h-full overflow-y-auto transition-all duration-300 w-48 sm:w-56 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } backdrop-blur-xl`}>
          <div className="p-3 sm:p-6 space-y-4 sm:space-y-8">
            {/* Navigation */}
            <nav className="space-y-1 sm:space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300 group ${
                    activeTab === item.id
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-indigo-400 border-l-2 border-indigo-500'
                        : 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-600 border-l-2 border-indigo-500'
                      : isDarkMode
                      ? 'text-slate-400 hover:bg-slate-800/30'
                      : 'text-slate-600 hover:bg-slate-100/50'
                  }`}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="hidden sm:inline text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div className={`h-px ${isDarkMode ? 'bg-slate-800/30' : 'bg-slate-200/50'}`} />

            {/* New Post Button */}
            <button className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-600/30 text-white'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-purple-500/30 text-white'
            }`}>
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm">New Post</span>
              <span className="sm:hidden text-xs">Post</span>
            </button>

            {/* Upgrade Section */}
            <div className={`${
              isDarkMode
                ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-indigo-500/20'
                : 'bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-indigo-200/50'
            } border rounded-xl p-3 sm:p-4 backdrop-blur transition-all duration-300 hover:border-indigo-500/50`}>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0 animate-pulse" />
                <h3 className={`font-bold text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Go Pro</h3>
              </div>
              <p className={`text-xs mb-2 sm:mb-4 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Unlock AI reviews & advanced features</p>
              <button className={`w-full py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}>
                Upgrade Now →
              </button>
            </div>

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className={`sm:hidden w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-xs font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-2 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 max-w-3xl lg:max-w-4xl mx-auto">
            {/* Post Creator */}
            <div className={`${
              isDarkMode
                ? 'bg-slate-900/50 border-slate-800/50'
                : 'bg-white/50 border-slate-200/50'
            } border rounded-lg sm:rounded-2xl p-3 sm:p-6 backdrop-blur transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg`}>
              <div className="flex gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-sm sm:text-lg font-bold flex-shrink-0 shadow-lg">
                  {currentUser?.avatar || '👨‍💻'}
                </div>
                <input
                  type="text"
                  placeholder="Share your code or question..."
                  className={`flex-1 bg-transparent outline-none text-xs sm:text-base ${
                    isDarkMode 
                      ? 'text-white placeholder-slate-500' 
                      : 'text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
              <div className="flex gap-1 sm:gap-2 justify-end flex-wrap">
                <button className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                    : 'bg-slate-100/50 hover:bg-slate-200/50 text-slate-700'
                }`}>
                  <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Code</span>
                </button>
                <button className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                    : 'bg-slate-100/50 hover:bg-slate-200/50 text-slate-700'
                }`}>
                  <span className="text-xs">Title</span>
                </button>
                <button className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                    : 'bg-slate-100/50 hover:bg-slate-200/50 text-slate-700'
                }`}>
                  <span className="text-xs">#Tag</span>
                </button>
                <button className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-600/30 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded font-semibold transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm`}>
                  Post
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Loading posts...
                  </div>
                </div>
              ) : posts.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    No posts yet. Be the first to share!
                  </div>
                </div>
              ) : (
                posts.map((post) => (
                  <article
                    key={post.id}
                    onMouseEnter={() => setHoveredPost(post.id)}
                    onMouseLeave={() => setHoveredPost(null)}
                    className={`${
                      isDarkMode
                        ? 'bg-slate-900/50 border-slate-800/50 hover:bg-slate-900/70'
                        : 'bg-white/50 border-slate-200/50 hover:bg-white/70'
                    } border rounded-lg sm:rounded-2xl p-3 sm:p-6 backdrop-blur transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg group`}
                  >
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                      <div className="flex gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-sm sm:text-lg flex-shrink-0 shadow-lg">
                          {post.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className={`font-semibold text-xs sm:text-sm truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {post.author}
                          </h3>
                          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                            {post.handle} · {post.timeAgo}
                          </p>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs mt-1 transition-all duration-300 ${
                            isDarkMode
                              ? 'bg-slate-800/50 text-slate-300'
                              : 'bg-slate-100/50 text-slate-700'
                          }`}>
                            {post.language}
                          </span>
                        </div>
                      </div>
                      <button className={`p-1.5 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                        isDarkMode
                          ? 'hover:bg-slate-800/50 text-slate-400'
                          : 'hover:bg-slate-100/50 text-slate-600'
                      }`}>
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Post Title & Description */}
                    <div className="mb-3 sm:mb-4">
                      <h2 className={`text-sm sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {post.title}
                      </h2>
                      <p className={`text-xs sm:text-sm line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {post.description}
                      </p>
                    </div>

                    {/* Code Block */}
                    <div className={`${
                      isDarkMode
                        ? 'bg-slate-950/50 border-slate-800/50'
                        : 'bg-slate-50/50 border-slate-200/50'
                    } border rounded-lg p-2 sm:p-4 mb-3 sm:mb-4 overflow-x-auto transition-all duration-300 group-hover:border-indigo-500/20`}>
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isDarkMode ? 'text-slate-500' : 'text-slate-600'
                      }`}>
                        {post.codeLanguage}
                      </span>
                      <pre className={`text-xs sm:text-sm font-mono mt-2 max-h-32 overflow-auto ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {post.code}
                      </pre>
                    </div>

                    {/* Post Stats */}
                    <div className={`flex items-center justify-between pt-3 sm:pt-4 border-t gap-2 sm:gap-4 text-xs sm:text-sm ${
                      isDarkMode ? 'border-slate-800/50' : 'border-slate-200/50'
                    }`}>
                      <div className="flex gap-2 sm:gap-6">
                        <button
                          onClick={() => togglePostLike(post.id)}
                          className={`flex items-center gap-1 transition-all duration-300 transform hover:scale-110 ${
                            post.liked
                              ? 'text-red-500'
                              : isDarkMode
                              ? 'text-slate-400 hover:text-red-500'
                              : 'text-slate-600 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 transition-all ${post.liked ? 'fill-current scale-110' : ''}`} />
                          <span className="hidden sm:inline font-medium">{post.likes}</span>
                          <span className="sm:hidden text-xs">{post.likes}</span>
                        </button>
                        <button className={`flex items-center gap-1 transition-all duration-300 transform hover:scale-110 ${
                          isDarkMode
                            ? 'text-slate-400 hover:text-blue-500'
                            : 'text-slate-600 hover:text-blue-500'
                        }`}>
                          <MessageCircle className="w-4 h-4" />
                          <span className="hidden sm:inline font-medium">{post.comments}</span>
                          <span className="sm:hidden text-xs">{post.comments}</span>
                        </button>
                        <button
                          onClick={() => togglePostBookmark(post.id)}
                          className={`flex items-center gap-1 transition-all duration-300 transform hover:scale-110 ${
                            post.bookmarked
                              ? 'text-indigo-500'
                              : isDarkMode
                              ? 'text-slate-400 hover:text-indigo-500'
                              : 'text-slate-600 hover:text-indigo-500'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 transition-all ${post.bookmarked ? 'fill-current scale-110' : ''}`} />
                          <span className="hidden sm:inline font-medium">{post.bookmarks}</span>
                          <span className="sm:hidden text-xs">{post.bookmarks}</span>
                        </button>
                      </div>
                      <button className={`hidden sm:flex items-center gap-1 transition-all duration-300 ${
                        isDarkMode
                          ? 'text-slate-400 hover:text-slate-300'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}>
                        <Share className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR - Hidden on lg-, visible on xl+ */}
        <aside className={`hidden xl:block w-64 ${
          isDarkMode
            ? 'bg-slate-900/50 border-slate-800/50'
            : 'bg-white/50 border-slate-200/50'
        } border-l h-full overflow-y-auto sticky top-0 p-4 space-y-4 backdrop-blur-xl`}>
          {/* Profile Card */}
          <div className={`${
            isDarkMode
              ? 'bg-slate-800/50 border-slate-700/50'
              : 'bg-slate-100/50 border-slate-200/50'
          } border rounded-xl p-4 text-center backdrop-blur transition-all duration-300 hover:border-indigo-500/30`}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-lg">
              {currentUser?.avatar || '👨‍💼'}
            </div>
            <h2 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {currentUser?.name || 'Loading...'}
            </h2>
            <p className={`text-xs mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentUser?.handle || ''}
            </p>
            {currentUser?.isPro && (
              <div className="inline-block px-2 py-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 text-xs font-semibold rounded-full mb-3 border border-indigo-500/30">
                ✨ Pro Member
              </div>
            )}
            
            <div className={`grid grid-cols-3 gap-2 mb-3 py-3 border-y border-slate-700/30 text-xs`}>
              <div>
                <p className="text-lg font-bold text-indigo-500">{currentUser?.posts || 0}</p>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Posts</p>
              </div>
              <div>
                <p className="text-lg font-bold text-indigo-500">{currentUser?.followers || 0}</p>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Followers</p>
              </div>
              <div>
                <p className="text-lg font-bold text-indigo-500">{currentUser?.following || 0}</p>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Following</p>
              </div>
            </div>

            <button className={`w-full py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? 'bg-indigo-600/30 text-indigo-400 hover:bg-indigo-600/50 border border-indigo-500/30'
                : 'bg-indigo-100/50 text-indigo-600 hover:bg-indigo-200/50 border border-indigo-200'
            }`}>
              View Profile
            </button>
          </div>

          {/* Top Contributors */}
          <div>
            <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Top Contributors
            </h3>
            <div className="space-y-2">
              {topContributors.slice(0, 3).map((contributor, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? 'hover:bg-slate-800/50'
                      : 'hover:bg-slate-100/50'
                  }`}
                >
                  <span className={`font-bold w-5 text-xs ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {index + 1}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs flex-shrink-0 shadow-md">
                    {contributor.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {contributor.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-indigo-500 font-bold text-xs">{contributor.points}</span>
                    <Zap className="w-3 h-3 text-indigo-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div>
            <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <Award className="w-4 h-4 text-yellow-500" />
              Trending
            </h3>
            <div className="space-y-2">
              {trendingTags.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 transform hover:translate-x-1 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/50'
                      : 'bg-slate-100/30 text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  <span className="text-indigo-500">#{item.name}</span>
                  <span className={`float-right text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        /* Smooth scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.4);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.6);
        }
      `}</style>
    </div>
  );
};

export default PremiumDashboard;
