const showreelVideoId = 'LjAaJLPFWFg'
const showreelEmbedUrl = `https://www.youtube.com/embed/${showreelVideoId}?autoplay=1&mute=1&loop=1&playlist=${showreelVideoId}&controls=1&modestbranding=1&rel=0&playsinline=1`

export default function Showreel() {
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
            <iframe
              className="h-full w-full object-cover"
              src={showreelEmbedUrl}
              title="Showreel"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
