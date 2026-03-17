const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
]

export default function About() {
  return (
    <section id="about" className="relative section-padding bg-[#030303]">
      {/* Ambient */}
      <div className="ambient-glow -top-32 left-1/4 h-64 w-96 bg-gold/[0.03]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Image */}
        <div className="group relative overflow-hidden rounded-2xl glass-card">
          {/* Hover glow */}
          <div className="absolute -inset-1 -z-10 rounded-3xl bg-gold/[0.03] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

          <div className="aspect-[4/5] w-full overflow-hidden bg-white/[0.03]">
            <img
              src="/images/profile/vaibhav.jpg"
              alt="Vaibhav Tiwari"
              className="h-full w-full object-cover brightness-[0.85] transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-100"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="section-label">About</p>
          <h2 className="section-heading">
            Vaibhav <span className="text-gradient-gold">Tiwari</span>
          </h2>
          <p className="mt-6 font-body text-base leading-[1.8] text-textMuted">
            I&apos;m a video editor and motion designer crafting cinematic visual
            experiences for brands, startups, and creators. With a focus on
            SaaS explainers, educational content, and short-form social media
            videos, I bring ideas to life through clean storytelling, precise
            timing, and polished motion design.
          </p>
          <p className="mt-4 font-body text-base leading-[1.8] text-textMuted">
            Every project is built with intention — from the first concept to
            the final frame — ensuring visuals that resonate and convert.
          </p>

          {/* Stats */}
          <div className="mt-10 flex gap-8 border-t border-white/[0.06] pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-gold sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-body text-[11px] uppercase tracking-[0.2em] text-textMuted/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:hello@vaibhavtiwari.com"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/[0.06] px-7 py-3.5 font-body text-[12px] font-medium uppercase tracking-[0.2em] text-gold transition-all duration-400 hover:border-gold/50 hover:bg-gold/[0.12] hover:shadow-glow"
          >
            Let&apos;s Work Together
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
