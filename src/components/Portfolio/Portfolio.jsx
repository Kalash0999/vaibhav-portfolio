import { useState } from 'react'

const projects = [
  { id: 1, title: 'Brand Identity Reel', category: 'Motion Design', thumbnail: '/images/projects/thumbnail1.png', videoId: 'QhG8sYkm9ls' },
  { id: 2, title: 'SaaS Product Launch', category: 'Explainer', thumbnail: '/images/projects/thumbnail1.png', videoId: 'LjAaJLPFWFg' },
  { id: 3, title: 'Educational Series', category: 'Education', thumbnail: '/images/projects/thumbnail1.png', videoId: 'pusuRGf3Inc' },
  { id: 4, title: 'App Promo Video', category: 'Short Form', thumbnail: '/images/projects/thumbnail1.png', videoId: 'nFruoDiUSGA' },
  { id: 5, title: 'Corporate Showreel', category: 'Motion Design', thumbnail: '/images/projects/thumbnail1.png', videoId: 'QhG8sYkm9ls' },
  { id: 6, title: 'Social Media Campaign', category: 'Short Form', thumbnail: '/images/projects/thumbnail1.png', videoId: 'LjAaJLPFWFg' },
]

const getEmbedUrl = (videoId, autoplay) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`

function ProjectCard({ project, featured }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden glass-card glass-card-hover cursor-pointer ${
        featured ? 'sm:col-span-2 sm:row-span-2' : ''
      }`}
    >
      {/* Media */}
      <div className={`relative w-full overflow-hidden bg-white/[0.03] ${featured ? 'aspect-[16/10]' : 'aspect-video'}`}>
        <iframe
          src={getEmbedUrl(project.videoId, hovered)}
          title={project.title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${
            hovered ? 'brightness-100 scale-105' : 'brightness-[0.65] grayscale-[18%] scale-100'
          }`}
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* View Project overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-400 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className={`flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2.5 backdrop-blur-md transition-all duration-500 ${
            hovered ? 'translate-y-0 scale-100' : 'translate-y-4 scale-90'
          }`}>
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-white">
              View Project
            </span>
            <svg className="h-3.5 w-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bottom info on card */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-block rounded-full border border-gold/20 bg-gold/[0.08] px-3 py-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-md">
            {project.category}
          </span>
          <h3 className={`mt-2 font-display font-semibold text-textPrimary transition-colors duration-300 group-hover:text-white ${
            featured ? 'text-xl' : 'text-base'
          }`}>
            {project.title}
          </h3>
        </div>
      </div>
    </article>
  )
}

export default function Portfolio() {
  return (
    <section id="work" className="relative section-padding bg-[#030303]">
      {/* Ambient */}
      <div className="ambient-glow -top-40 right-0 h-80 w-80 bg-gold/[0.03]" />

      <div className="mx-auto max-w-7xl">
        <p className="section-label">Portfolio</p>
        <h2 className="section-heading">
          Selected <span className="text-gradient-gold">Work</span>
        </h2>
        <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-textMuted">
          A curated collection of motion design, video editing, and visual storytelling projects.
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
