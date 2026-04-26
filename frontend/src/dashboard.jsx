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
      <header className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b sticky top-0 z-40 px-6 py-4`}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'} rounded-lg flex items-center justify-center text-white font-bold`}>
              &lt;/&gt;
            </div>
            <span className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>CODE PEER</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className={`relative flex items-center ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} rounded-lg px-4 py-2`}>
              <Search className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                placeholder="Search code, users, or tags..."
                className={`flex-1 ml-3 bg-transparent outline-none placeholder-shown:text-sm ${isDarkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            <button className={`p-2 rounded-lg transition-colors relative ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
              <Bell className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
                JD
              </div>
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentUser.name}</span>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-lg transition-colors ml-2 ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-red-500' : 'hover:bg-slate-100 text-slate-600 hover:text-red-600'}`}
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className={`w-56 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-r h-screen overflow-y-auto sticky top-16`}>
          <div className="p-6 space-y-8">
            {/* Navigation */}
            <nav className="space-y-2">
              {[
                { icon: Home, label: 'Home', active: true },
                { icon: Compass, label: 'Explore', active: false },
                { icon: Bookmark, label: 'Bookmarks', active: false },
                { icon: FileText, label: 'My Posts', active: false },
                { icon: Brain, label: 'AI Reviews', active: false },
                { icon: Code, label: 'Saved Snippets', active: false },
                { icon: Bell, label: 'Notifications', active: false },
                { icon: Mail, label: 'Messages', active: false },
                { icon: Settings, label: 'Settings', active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? isDarkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                      : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* New Post Button */}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
              <Plus className="w-5 h-5" />
              New Post
            </button>

            {/* Upgrade Section */}
            <div className={`${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-indigo-50 border-indigo-200'} border rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Upgrade to Pro</h3>
              </div>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Unlock advanced AI reviews and more features.</p>
              <button className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                Upgrade Now →
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-3xl">
          <div className="p-6 space-y-6">
            {/* Post Creator */}
            <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-6`}>
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-lg font-bold">
                  {currentUser.avatar}
                </div>
                <input
                  type="text"
                  placeholder="What code do you want to share today?"
                  className={`flex-1 bg-transparent outline-none placeholder-shown:text-sm ${isDarkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                  <Code className="w-4 h-4" />
                  Code
                </button>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                  Add Title
                </button>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                  Add Tag
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Post
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-6`}>
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-lg">
                        {post.avatar}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{post.author}</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {post.handle} · {post.timeAgo} · <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>{post.language}</span>
                        </p>
                      </div>
                    </div>
                    <button className={isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Post Title & Description */}
                  <div className="mb-4">
                    <h2 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{post.title}</h2>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{post.description}</p>
                  </div>

                  {/* Code Block */}
                  <div className={`${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} border rounded-xl p-4 mb-4 overflow-x-auto`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider`}>{post.codeLanguage}</span>
                    </div>
                    <pre className={`text-sm font-mono ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {post.code}
                    </pre>
                  </div>

                  {/* Post Stats */}
                  <div className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div className="flex gap-6">
                      <button className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-red-500' : 'text-slate-600 hover:text-red-500'}`}>
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-blue-500' : 'text-slate-600 hover:text-blue-500'}`}>
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                      <button className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-indigo-500' : 'text-slate-600 hover:text-indigo-500'}`}>
                        <Bookmark className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.bookmarks}</span>
                      </button>
                    </div>
                    <button className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}>
                      <Share className="w-5 h-5" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className={`w-80 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-l h-screen overflow-y-auto sticky top-16 p-6 space-y-6`}>
          {/* Profile Card */}
          <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} border rounded-2xl p-6 text-center`}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {currentUser.avatar}
            </div>
            <h2 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentUser.name}</h2>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{currentUser.handle}</p>
            {currentUser.isPro && (
              <div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full mb-4">
                💎 Pro Member
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-slate-700">
              <div>
                <p className="text-2xl font-bold text-indigo-500">{currentUser.posts}</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Posts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-500">{currentUser.followers}</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-500">{currentUser.following}</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Following</p>
              </div>
            </div>

            <button className={`w-full py-2 rounded-lg font-semibold transition-colors ${isDarkMode ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}>
              View Profile
            </button>
          </div>

          {/* Top Contributors */}
          <div>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              🔥 Top Contributors
            </h3>
            <div className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{index + 1}</span>
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    {contributor.avatar}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{contributor.name}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-indigo-500 font-bold">{contributor.points}</span>
                    <span className="text-indigo-500">⚡</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Trending Tags</h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((item, index) => (
                <button
                  key={index}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  #{item.tag}
                </button>
              ))}
            </div>
            <button className={`text-sm font-semibold flex items-center gap-1 mt-4 ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}>
              See all tags →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
