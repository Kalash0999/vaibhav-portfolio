const steps = [
  { number: '01', title: 'Concept', description: 'Deep-dive into your vision, goals, and audience to define the creative direction.' },
  { number: '02', title: 'Structure', description: 'Storyboarding and scripting the narrative flow to ensure clarity and impact.' },
  { number: '03', title: 'Motion', description: 'Bringing the concept to life with polished animation, editing, and sound design.' },
  { number: '04', title: 'Final Polish', description: 'Color grading, audio mastering, and detail refinement for a cinematic finish.' },
]

export default function Process() {
  return (
    <section id="process" className="relative section-padding bg-[#030303]">
      <div className="mx-auto max-w-7xl">
        <p className="section-label">How I Work</p>
        <h2 className="section-heading">
          The <span className="text-gradient-gold">Process</span>
        </h2>
        <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-textMuted">
          A streamlined workflow designed for quality, clarity, and cinematic results.
        </p>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Connecting line — desktop only */}
          <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.number} className="group relative">
                {/* Timeline dot */}
                <div className="relative mb-8 hidden lg:flex lg:justify-center">
                  <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border border-gold/30 bg-[#030303]">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold/50 transition-all duration-400 group-hover:bg-gold group-hover:shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
                  </div>
                </div>

                {/* Card */}
                <div className="glass-card glass-card-hover p-8">
                  <span className="font-display text-3xl font-bold text-gold/15 transition-colors duration-400 group-hover:text-gold/35">
                    {step.number}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-textPrimary transition-colors duration-300 group-hover:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-textMuted transition-colors duration-300 group-hover:text-silver">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
