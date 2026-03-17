import { useState, useRef } from 'react'

export default function Showreel() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <section id="showreel" className="relative section-padding bg-[#030303]">
      {/* Ambient top glow */}
      <div className="ambient-glow -top-32 left-1/2 h-64 w-[500px] -translate-x-1/2 bg-gold/[0.04]" />

      <div className="mx-auto max-w-6xl text-center">
        <p className="section-label">Watch</p>
        <h2 className="section-heading mx-auto">
          Show<span className="text-gradient-gold">reel</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md font-body text-sm text-textMuted">
          A highlight reel of recent motion design and video editing work.
        </p>

        {/* Video container */}
        <div className="group relative mx-auto mt-14 overflow-hidden rounded-2xl glass-card">
          {/* Ambient glow behind video */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gold/[0.03] blur-2xl transition-all duration-700 group-hover:bg-gold/[0.06]" />

          <div className="relative aspect-video w-full overflow-hidden bg-white/[0.03]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/videos/heroshowreel.mp4"
              playsInline
              preload="metadata"
              poster="/images/projects/project-1.jpg"
              onEnded={() => setPlaying(false)}
              onClick={togglePlay}
            />

            {/* Custom play overlay */}
            <div
              onClick={togglePlay}
              className={`absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 transition-all duration-500 ${
                playing ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md transition-all duration-400 hover:scale-110 hover:border-gold/30 hover:bg-white/[0.12]">
                {/* Pulse ring */}
                <span className="absolute inset-0 animate-pulse-gold rounded-full border border-gold/20" />
                <svg viewBox="0 0 24 24" fill="none" className="ml-1 h-7 w-7">
                  <path
                    d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z"
                    fill="#D4AF37"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
