import React, { useState } from 'react';
import { Search, Home, Compass, Bookmark, FileText, Brain, Code, Bell, Mail, Settings, Plus, Star, Heart, MessageCircle, Share, MoreVertical, Sun, Moon, LogOut, Menu, X } from 'lucide-react';
import { supabase } from './supabaseClient';

const Dashboard = ({ onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: '👩‍💻',
      handle: '@sarahjohnson',
      timeAgo: '2h ago',
      language: 'JavaScript',
      title: 'Debouncing function in JavaScript – Help needed!',
      description: 'I implemented a debounce function but it\'s not working as expected. Can someone review my code?',
      code: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
}`,
      codeLanguage: 'JS',
      likes: 24,
      comments: 12,
      bookmarks: 8,
    },
    {
      id: 2,
      author: 'Alex Chen',
      avatar: '👨‍💻',
      handle: '@alexchen',
      timeAgo: '5h ago',
      language: 'Python',
      title: 'Optimize this Python code',
      description: 'This code works but is too slow for large datasets. Any suggestions?',
      code: `def find_max(numbers):
  max_num = numbers[0]
  for n in numbers:
    if n > max_num:
      max_num = n
  return max_num`,
      codeLanguage: 'PY',
      likes: 18,
      comments: 7,
      bookmarks: 5,
    },
  ]);

  const [currentUser] = useState({
    name: 'John Doe',
    handle: '@johndoe',
    avatar: '👨‍💼',
    isPro: true,
    posts: 12,
    followers: 289,
    following: 156,
  });

  const topContributors = [
    { name: 'Sarah Johnson', avatar: '👩‍💻', points: 482 },
    { name: 'Alex Chen', avatar: '👨‍💻', points: 389 },
    { name: 'Dev Patel', avatar: '👨‍🔬', points: 312 },
    { name: 'Michael Brown', avatar: '👨‍🏫', points: 278 },
    { name: 'Emily Davis', avatar: '👩‍🚀', points: 245 },
  ];

  const trendingTags = [
    { tag: 'JavaScript', count: 1200 },
    { tag: 'React', count: 890 },
    { tag: 'Python', count: 756 },
    { tag: 'CSS', count: 634 },
    { tag: 'NextJS', count: 512 },
    { tag: 'HTML', count: 498 },
    { tag: 'TypeScript', count: 476 },
    { tag: 'NodeJS', count: 423 },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert('Logout error: ' + error.message);
      } else {
        alert('You have been logged out.');
        onNavigate('landing');
      }
    } catch (err) {
      alert('An unexpected error occurred: ' + err.message);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* HEADER */}
      <header className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b sticky top-0 z-40 px-3 sm:px-6 py-3 sm:py-4`}>
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'} rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm`}>
                &lt;/&gt;
              </div>
              <span className={`text-lg sm:text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>CODE PEER</span>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile, visible on sm+ */}
          <div className="hidden sm:block flex-1 max-w-xs lg:max-w-md">
            <div className={`relative flex items-center ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} rounded-lg px-3 py-2`}>
              <Search className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                placeholder="Search..."
                className={`flex-1 ml-2 bg-transparent outline-none text-xs sm:text-sm placeholder-shown:text-xs ${isDarkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />}
            </button>
            <button className={`p-2 rounded-lg transition-colors relative ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
              <Bell className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-3 sm:pl-4 border-l border-slate-700">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                JD
              </div>
              <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentUser.name}</span>
              <button
                onClick={handleLogout}
                className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-red-500' : 'hover:bg-slate-100 text-slate-600 hover:text-red-600'}`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)]">
        {/* SIDEBAR - Mobile overlay on sm-, fixed on lg+ */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative lg:w-52 xl:w-56 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-r h-full overflow-y-auto sticky top-16 lg:top-0 transition-transform duration-300 w-48 sm:w-56 z-30`}>
          <div className="p-3 sm:p-6 space-y-4 sm:space-y-8">
            {/* Navigation */}
            <nav className="space-y-1 sm:space-y-2">
              {[
                { icon: Home, label: 'Home', active: true },
                { icon: Compass, label: 'Explore', active: false },
                { icon: Bookmark, label: 'Bookmarks', active: false },
                { icon: FileText, label: 'My Posts', active: false },
                { icon: Brain, label: 'AI Reviews', active: false },
                { icon: Code, label: 'Saved Snippets', active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
                    item.active
                      ? isDarkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                      : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* New Post Button */}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Post</span>
              <span className="sm:hidden">Post</span>
            </button>

            {/* Upgrade Section - Hidden on mobile */}
            <div className={`hidden sm:block ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-indigo-50 border-indigo-200'} border rounded-xl p-3 sm:p-4`}>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <h3 className={`font-bold text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Upgrade to Pro</h3>
              </div>
              <p className={`text-xs mb-2 sm:mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Unlock advanced AI reviews and more features.</p>
              <button className={`w-full py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition-colors ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                Upgrade Now →
              </button>
            </div>

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="sm:hidden w-full flex items-center gap-2 px-2 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-xs font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-2 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 max-w-2xl lg:max-w-3xl mx-auto">
            {/* Post Creator */}
            <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border rounded-lg sm:rounded-2xl p-3 sm:p-6`}>
              <div className="flex gap-2 sm:gap-4 mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-sm sm:text-lg font-bold flex-shrink-0">
                  {currentUser.avatar}
                </div>
                <input
                  type="text"
                  placeholder="Share your code..."
                  className={`flex-1 bg-transparent outline-none placeholder-shown:text-xs sm:placeholder-shown:text-sm ${isDarkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
                />
              </div>
              <div className="flex gap-1 sm:gap-2 justify-end flex-wrap">
                <button className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                  <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Code</span>
                </button>
                <button className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                  <span className="text-xs">Title</span>
                </button>
                <button className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                  <span className="text-xs">#Tag</span>
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded font-semibold transition-colors text-xs sm:text-sm">
                  Post
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {posts.map((post) => (
                <div key={post.id} className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border rounded-lg sm:rounded-2xl p-3 sm:p-6`}>
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                    <div className="flex gap-2 sm:gap-3 flex-1">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-slate-700 flex items-center justify-center text-sm sm:text-lg flex-shrink-0">
                        {post.avatar}
                      </div>
                      <div className="min-w-0">
                        <h3 className={`font-semibold text-xs sm:text-sm truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{post.author}</h3>
                        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {post.handle} · {post.timeAgo}
                        </p>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs mt-1 ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>{post.language}</span>
                      </div>
                    </div>
                    <button className={isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post Title & Description */}
                  <div className="mb-3 sm:mb-4">
                    <h2 className={`text-sm sm:text-lg font-bold mb-1 sm:mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{post.title}</h2>
                    <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{post.description}</p>
                  </div>

                  {/* Code Block */}
                  <div className={`${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} border rounded p-2 sm:p-4 mb-3 sm:mb-4 overflow-x-auto`}>
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider`}>{post.codeLanguage}</span>
                    <pre className={`text-xs sm:text-sm font-mono mt-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {post.code}
                    </pre>
                  </div>

                  {/* Post Stats */}
                  <div className={`flex items-center justify-between pt-2 sm:pt-4 border-t gap-1 sm:gap-6 text-xs sm:text-sm ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div className="flex gap-2 sm:gap-6">
                      <button className={`flex items-center gap-1 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-red-500' : 'text-slate-600 hover:text-red-500'}`}>
                        <Heart className="w-4 h-4" />
                        <span className="hidden sm:inline font-medium">{post.likes}</span>
                        <span className="sm:hidden text-xs">{post.likes}</span>
                      </button>
                      <button className={`flex items-center gap-1 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-blue-500' : 'text-slate-600 hover:text-blue-500'}`}>
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline font-medium">{post.comments}</span>
                        <span className="sm:hidden text-xs">{post.comments}</span>
                      </button>
                      <button className={`flex items-center gap-1 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-indigo-500' : 'text-slate-600 hover:text-indigo-500'}`}>
                        <Bookmark className="w-4 h-4" />
                        <span className="hidden sm:inline font-medium">{post.bookmarks}</span>
                        <span className="sm:hidden text-xs">{post.bookmarks}</span>
                      </button>
                    </div>
                    <button className={`flex items-center gap-1 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}>
                      <Share className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR - Hidden on lg-, visible on xl+ */}
        <aside className={`hidden xl:block w-64 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-l h-full overflow-y-auto sticky top-0 p-4 space-y-4`}>
          {/* Profile Card */}
          <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} border rounded-xl p-4 text-center`}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-xl font-bold mx-auto mb-3">
              {currentUser.avatar}
            </div>
            <h2 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentUser.name}</h2>
            <p className={`text-xs mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{currentUser.handle}</p>
            {currentUser.isPro && (
              <div className="inline-block px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full mb-3">
                💎 Pro
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-2 mb-3 py-3 border-y border-slate-700 text-xs">
              <div>
                <p className="text-lg font-bold text-indigo-500">{currentUser.posts}</p>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Posts</p>
              </div>
              <div>
                <p className="text-lg font-bold text-indigo-500">{currentUser.followers}</p>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Followers</p>
              </div>
              <div>
                <p className="text-lg font-bold text-indigo-500">{currentUser.following}</p>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Following</p>
              </div>
            </div>

            <button className={`w-full py-1.5 rounded-lg font-semibold text-xs transition-colors ${isDarkMode ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}>
              View Profile
            </button>
          </div>

          {/* Top Contributors */}
          <div>
            <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              🔥 Top Contributors
            </h3>
            <div className="space-y-2">
              {topContributors.slice(0, 3).map((contributor, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <span className={`font-bold w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{index + 1}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs flex-shrink-0">
                    {contributor.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{contributor.name}</p>
                  </div>
                  <span className="text-indigo-500 font-bold">{contributor.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div>
            <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Trending</h3>
            <div className="flex flex-wrap gap-1">
              {trendingTags.slice(0, 5).map((item, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  #{item.tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};


export default Dashboard;
