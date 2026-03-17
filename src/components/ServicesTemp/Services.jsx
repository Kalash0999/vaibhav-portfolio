const services = [
  {
    num: '01',
    title: 'Motion Design',
    description: 'Cinematic motion graphics that elevate brand identity with fluid, eye-catching visuals.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'SaaS Explainers',
    description: 'Clear, engaging product videos that simplify complex software into compelling stories.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Educational Content',
    description: 'Visually rich educational videos designed to inform, engage, and retain audiences.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Short Form Editing',
    description: 'Punchy, scroll-stopping edits optimized for social media and short-form platforms.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="relative section-padding bg-[#030303]">
      {/* Ambient */}
      <div className="ambient-glow -top-32 left-0 h-64 w-64 bg-gold/[0.03]" />

      <div className="mx-auto max-w-7xl">
        <p className="section-label">What I Do</p>
        <h2 className="section-heading">
          Services & <span className="text-gradient-gold">Expertise</span>
        </h2>
        <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-textMuted">
          Specialized in crafting visual stories that captivate audiences and drive results.
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.num}
              className="group glass-card glass-card-hover p-8 sm:p-10"
            >
              <div className="flex items-start justify-between">
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.06] text-gold/60 transition-all duration-400 group-hover:bg-gold/[0.12] group-hover:text-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                  {service.icon}
                </div>
                {/* Number */}
                <span className="font-display text-sm font-medium text-textMuted/30 transition-colors duration-300 group-hover:text-gold/30">
                  {service.num}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-semibold text-textPrimary transition-colors duration-300 group-hover:text-white">
                {service.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-textMuted transition-colors duration-300 group-hover:text-silver">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
