import { useState, useRef, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const emailInputRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    let rafId = null;

    const updateVideoTime = (clientX) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        const video = videoRef.current;
        if (video && !isNaN(video.duration)) {
          const width = window.innerWidth;
          const percentage = Math.max(0, Math.min(1, 1 - clientX / width));
          video.currentTime = percentage * video.duration;
        }
      });
    };

    const handleMouseMove = (e) => {
      updateVideoTime(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updateVideoTime(e.touches[0].clientX);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      alert(`Thank you for joining the list: ${email}`)
      setEmail('')
    }
  }

  const handleJoinClick = () => {
    emailInputRef.current?.focus()
    setIsMenuOpen(false)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://www.image2url.com/r2/default/videos/1782718507864-c58ecbd9-9373-4f2f-b6a6-e627155fe7b2.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none"
      />
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 sm:px-10 lg:px-12 py-4 sm:py-8">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between relative w-full">
          {/* Left Nav Pill (glassmorphism) */}
          <div className="flex items-center bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 px-4 py-2.5 sm:px-6 sm:py-4">
            {/* Custom SVG Logo */}
            <svg
              viewBox="0 0 256 256"
              className="w-5 h-5 sm:w-7 sm:h-7 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" />
            </svg>
            <span className="font-askan text-white text-base sm:text-xl tracking-wide ml-2 select-none">
              Aurai
            </span>
            
            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="ml-4 sm:ml-32 md:ml-64 lg:ml-96 text-white hover:text-white/80 transition-colors focus:outline-none flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>

          {/* Right Button (desktop only) */}
          <button
            onClick={handleJoinClick}
            className="hidden sm:block bg-white text-gray-900 font-medium text-sm px-6 py-3 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all"
          >
            Join the list
          </button>
        </nav>

        {/* Mobile Menu (shown on toggle) */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-[4.5rem] left-4 right-4 bg-black/30 backdrop-blur-xl rounded-2xl p-5 border border-white/10 flex flex-col gap-4 z-50 animate-fadeIn">
            <a
              href="#story"
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-sm font-medium hover:text-white/80 transition-colors"
            >
              Story
            </a>
            <a
              href="#benefits"
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-sm font-medium hover:text-white/80 transition-colors"
            >
              Benefits
            </a>
            <a
              href="#connect"
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-sm font-medium hover:text-white/80 transition-colors"
            >
              Connect
            </a>
            <button
              onClick={handleJoinClick}
              className="w-full bg-white text-gray-900 font-medium text-sm py-3 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all mt-2"
            >
              Join the list
            </button>
          </div>
        )}

        {/* Mobile Spacer to push content to the bottom */}
        <div className="flex-1 sm:hidden" />

        {/* Main Content (Bottom-aligned) */}
        <div className="flex flex-col sm:flex-1 sm:flex-row sm:items-end pb-4 sm:pb-12 lg:pb-16 sm:mt-auto">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left">
            <h1 className="font-askan text-white text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight max-w-[700px] select-none">
              Your calm is always within.
            </h1>
            
            <p className="text-white/70 text-xs sm:text-base md:text-lg max-w-[520px] leading-relaxed mt-4 sm:mt-6 select-none">
              Aurai is your always-on wellness companion. Built by leading therapists, it brings you the care and clarity right when you need it.
            </p>

            {/* Email form */}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center bg-black/30 backdrop-blur-md rounded-full border border-white/10 w-full max-w-[480px] mt-6 sm:mt-8"
            >
              <input
                ref={emailInputRef}
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/50 text-sm pl-4 pr-32 sm:pl-6 sm:pr-40 py-3.5 sm:py-4 rounded-full focus:outline-none focus:ring-1 focus:ring-white/20"
              />
              <button
                type="submit"
                className="absolute right-1.5 bg-white text-gray-900 text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-white/90 active:scale-[0.97] transition-all"
              >
                Join the list
              </button>
            </form>

            {/* Feature pills (mobile only) */}
            <div className="flex sm:hidden flex-wrap gap-2 mt-4">
              <span className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/10">
                Smart Therapy
              </span>
              <span className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/10">
                Real-time Healing
              </span>
              <span className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/10">
                Insights into outcomes
              </span>
            </div>
          </div>

          {/* Right Column (desktop only) */}
          <div className="hidden sm:flex flex-col items-end gap-2 self-end ml-auto">
            <span className="bg-black/30 backdrop-blur-md text-white text-xs sm:text-sm px-4 py-2 rounded-full border border-white/10 whitespace-nowrap">
              Smart Therapy
            </span>
            <span className="bg-black/30 backdrop-blur-md text-white text-xs sm:text-sm px-4 py-2 rounded-full border border-white/10 whitespace-nowrap">
              Real-time Healing
            </span>
            <span className="bg-black/30 backdrop-blur-md text-white text-xs sm:text-sm px-4 py-2 rounded-full border border-white/10 whitespace-nowrap">
              Insights into outcomes
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
