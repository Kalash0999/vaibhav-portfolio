const tools = [
  { name: 'After Effects', abbr: 'Ae', color: '#9999FF' },
  { name: 'Premiere Pro', abbr: 'Pr', color: '#9999FF' },
  { name: 'Photoshop', abbr: 'Ps', color: '#31A8FF' },
  { name: 'Illustrator', abbr: 'Ai', color: '#FF9A00' },
  { name: 'DaVinci Resolve', abbr: 'Dv', color: '#E4672E' },
  { name: 'Figma', abbr: 'Fi', color: '#A259FF' },
  { name: 'Blender', abbr: 'Bl', color: '#F5792A' },
  { name: 'Cinema 4D', abbr: 'C4', color: '#0A6AFF' },
]

export default function Tools() {
  return (
    <section id="tools" className="relative section-padding bg-[#030303]">
      {/* Ambient */}
      <div className="ambient-glow -bottom-20 right-0 h-64 w-64 bg-gold/[0.03]" />

      <div className="mx-auto max-w-7xl">
        <p className="section-label">Tech Stack</p>
        <h2 className="section-heading">
          Tools & <span className="text-gradient-gold">Software</span>
        </h2>
        <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-textMuted">
          Industry-standard tools for professional motion design and video production.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="group glass-card glass-card-hover flex flex-col items-center gap-4 p-6 sm:p-8 text-center"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-bold transition-all duration-400 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.12)]"
                style={{
                  background: `${tool.color}12`,
                  color: tool.color,
                }}
              >
                {tool.abbr}
              </div>
              <span className="font-body text-sm font-medium text-textMuted transition-colors duration-300 group-hover:text-textPrimary">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
