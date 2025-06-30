import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sourceImage, setSourceImage] = useState(null);
  const [targetVideo, setTargetVideo] = useState(null);
  const [outputVideo, setOutputVideo] = useState(null);
  const [realTimeMode, setRealTimeMode] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState('');
  const [qualitySettings, setQualitySettings] = useState({
    resolution: '1080p',
    fps: 30,
    quality: 'ultra'
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileUpload = (file, type) => {
    const url = URL.createObjectURL(file);
    if (type === 'source') {
      setSourceImage(url);
    } else if (type === 'target') {
      setTargetVideo(url);
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setOutputVideo('/api/placeholder/processed-video');
    }, 3000);
  };

  const toggleRealTime = () => {
    setRealTimeMode(!realTimeMode);
  };

  const connectToSocial = (platform) => {
    setSocialPlatform(platform);
    // Simulate connection
    alert(`Connected to ${platform}! Ready for live streaming.`);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
              {/* Navigation */}
              <nav className="bg-black/20 backdrop-blur-lg border-b border-purple-500/20">
                <div className="container mx-auto px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">R</span>
                      </div>
                      <h1 className="text-2xl font-bold text-white">RoopCam Ultra</h1>
                    </div>
                    <div className="flex space-x-6">
                      <button 
                        onClick={() => setActiveTab('home')}
                        className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'home' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'}`}
                      >
                        Home
                      </button>
                      <button 
                        onClick={() => setActiveTab('studio')}
                        className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'studio' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'}`}
                      >
                        AI Studio
                      </button>
                      <button 
                        onClick={() => setActiveTab('live')}
                        className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'live' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'}`}
                      >
                        Live Mode
                      </button>
                      <button 
                        onClick={() => setActiveTab('social')}
                        className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'social' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'}`}
                      >
                        Social Connect
                      </button>
                    </div>
                  </div>
                </div>
              </nav>

              {/* Main Content */}
              <main className="container mx-auto px-6 py-8">
                {activeTab === 'home' && (
                  <div className="space-y-12">
                    {/* Hero Section */}
                    <div className="text-center space-y-6">
                      <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf" 
                          alt="AI Technology" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-center">
                            <h2 className="text-5xl font-bold text-white mb-4">
                              Next-Gen AI Face Swap
                            </h2>
                            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                              Experience the future of deepfake technology with real-time processing, 
                              voice manipulation, and seamless social media integration
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                        <img 
                          src="https://images.unsplash.com/photo-1690162396384-6741ab2f33bd" 
                          alt="Face Swap" 
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold text-white mb-2">Ultra-Fast Face Swap</h3>
                        <p className="text-gray-300">Process videos 10,000x faster with our revolutionary AI engine</p>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                        <img 
                          src="https://images.pexels.com/photos/8102677/pexels-photo-8102677.jpeg" 
                          alt="Real-time Processing" 
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold text-white mb-2">Real-Time Processing</h3>
                        <p className="text-gray-300">Live video processing for streaming and video calls</p>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                        <img 
                          src="https://images.unsplash.com/photo-1683721003111-070bcc053d8b" 
                          alt="Social Media" 
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold text-white mb-2">Social Integration</h3>
                        <p className="text-gray-300">Direct integration with WhatsApp, TikTok, Instagram, and more</p>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                        <img 
                          src="https://images.unsplash.com/photo-1726731770351-6c23298bd0e0" 
                          alt="Voice Processing" 
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold text-white mb-2">Voice Manipulation</h3>
                        <p className="text-gray-300">Real-time voice changing and audio synchronization</p>
                      </div>
                    </div>

                    {/* Quick Start */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
                      <h3 className="text-2xl font-bold text-white mb-6 text-center">Quick Start</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">1</span>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2">Upload Source</h4>
                          <p className="text-gray-300">Choose your face image or video</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">2</span>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2">Select Target</h4>
                          <p className="text-gray-300">Choose target video or connect live camera</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">3</span>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2">Process & Share</h4>
                          <p className="text-gray-300">AI processes and shares to your platform</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'studio' && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">AI Studio</h2>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Upload Section */}
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                        <h3 className="text-xl font-bold text-white mb-4">Upload Files</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Source Face Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e.target.files[0], 'source')}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Target Video
                            </label>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleFileUpload(e.target.files[0], 'target')}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            />
                          </div>
                        </div>

                        {/* Quality Settings */}
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Quality Settings</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <select 
                              value={qualitySettings.resolution}
                              onChange={(e) => setQualitySettings({...qualitySettings, resolution: e.target.value})}
                              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="720p">720p</option>
                              <option value="1080p">1080p</option>
                              <option value="4K">4K Ultra</option>
                              <option value="8K">8K Max</option>
                            </select>
                            
                            <select 
                              value={qualitySettings.fps}
                              onChange={(e) => setQualitySettings({...qualitySettings, fps: e.target.value})}
                              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="24">24 FPS</option>
                              <option value="30">30 FPS</option>
                              <option value="60">60 FPS</option>
                              <option value="120">120 FPS</option>
                            </select>
                            
                            <select 
                              value={qualitySettings.quality}
                              onChange={(e) => setQualitySettings({...qualitySettings, quality: e.target.value})}
                              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="fast">Fast</option>
                              <option value="balanced">Balanced</option>
                              <option value="ultra">Ultra</option>
                              <option value="maximum">Maximum</option>
                            </select>
                          </div>
                        </div>

                        <button
                          onClick={startProcessing}
                          disabled={!sourceImage || !targetVideo || isProcessing}
                          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                        >
                          {isProcessing ? 'Processing...' : 'Start AI Processing'}
                        </button>
                      </div>

                      {/* Preview Section */}
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                        <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
                        
                        <div className="space-y-4">
                          {sourceImage && (
                            <div>
                              <p className="text-sm text-gray-300 mb-2">Source Face:</p>
                              <img src={sourceImage} alt="Source" className="w-full h-32 object-cover rounded-lg" />
                            </div>
                          )}
                          
                          {targetVideo && (
                            <div>
                              <p className="text-sm text-gray-300 mb-2">Target Video:</p>
                              <video ref={videoRef} src={targetVideo} className="w-full h-32 object-cover rounded-lg" controls />
                            </div>
                          )}
                          
                          {isProcessing && (
                            <div className="flex items-center justify-center h-32 bg-gray-800 rounded-lg">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                              <span className="ml-2 text-white">AI Processing...</span>
                            </div>
                          )}
                          
                          {outputVideo && !isProcessing && (
                            <div>
                              <p className="text-sm text-gray-300 mb-2">Output Result:</p>
                              <video src={outputVideo} className="w-full h-32 object-cover rounded-lg" controls />
                              <button className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                                Download Result
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'live' && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Live Mode</h2>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                        <h3 className="text-xl font-bold text-white mb-4">Real-Time Controls</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white">Real-Time Mode</span>
                            <button
                              onClick={toggleRealTime}
                              className={`w-12 h-6 rounded-full transition-colors ${realTimeMode ? 'bg-green-500' : 'bg-gray-600'}`}
                            >
                              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${realTimeMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-white">Voice Change</span>
                            <button
                              onClick={() => setVoiceMode(!voiceMode)}
                              className={`w-12 h-6 rounded-full transition-colors ${voiceMode ? 'bg-blue-500' : 'bg-gray-600'}`}
                            >
                              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${voiceMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
                            </button>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Voice Type
                            </label>
                            <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                              <option>Original</option>
                              <option>Male Deep</option>
                              <option>Female High</option>
                              <option>Robot</option>
                              <option>Celebrity Voice 1</option>
                              <option>Celebrity Voice 2</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Face Blend Strength
                            </label>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              defaultValue="80" 
                              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        </div>
                        
                        <button className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                          Start Live Stream
                        </button>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                        <h3 className="text-xl font-bold text-white mb-4">Live Preview</h3>
                        <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                              </svg>
                            </div>
                            <p className="text-gray-300">Camera feed will appear here</p>
                            <p className="text-sm text-gray-400 mt-2">Enable real-time mode to start</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Social Connect</h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { name: 'WhatsApp', color: 'bg-green-500', icon: '📱' },
                        { name: 'TikTok', color: 'bg-pink-500', icon: '🎵' },
                        { name: 'Instagram', color: 'bg-purple-500', icon: '📸' },
                        { name: 'Facebook', color: 'bg-blue-500', icon: '👥' },
                        { name: 'Zoom', color: 'bg-blue-600', icon: '🎥' },
                        { name: 'Discord', color: 'bg-indigo-500', icon: '🎮' },
                      ].map((platform) => (
                        <div key={platform.name} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 text-center">
                          <div className={`w-16 h-16 ${platform.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <span className="text-2xl">{platform.icon}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                          <p className="text-gray-300 mb-4">Connect and stream directly</p>
                          <button
                            onClick={() => connectToSocial(platform.name)}
                            className={`w-full ${platform.color} hover:opacity-80 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105`}
                          >
                            Connect {platform.name}
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                      <h3 className="text-xl font-bold text-white mb-4">Advanced Integration</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Stream Settings</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm text-gray-300 mb-1">Stream Quality</label>
                              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                                <option>1080p 60fps</option>
                                <option>720p 60fps</option>
                                <option>480p 30fps</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm text-gray-300 mb-1">Audio Quality</label>
                              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
                                <option>High (320kbps)</option>
                                <option>Medium (192kbps)</option>
                                <option>Low (128kbps)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Privacy & Security</h4>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-2" />
                              <span className="text-gray-300">End-to-end encryption</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-2" />
                              <span className="text-gray-300">Auto-delete processed files</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-2" />
                              <span className="text-gray-300">Anonymous mode</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </main>

              {/* Footer */}
              <footer className="bg-black/20 backdrop-blur-lg border-t border-purple-500/20 mt-16">
                <div className="container mx-auto px-6 py-8">
                  <div className="text-center">
                    <p className="text-gray-400">© 2025 RoopCam Ultra - Advanced AI Deepfake Technology</p>
                    <p className="text-sm text-gray-500 mt-2">Use responsibly and ethically. Respect privacy and consent.</p>
                  </div>
                </div>
              </footer>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;