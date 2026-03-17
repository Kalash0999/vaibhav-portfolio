const footerLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[#030303]">
      {/* Ambient glow */}
      <div className="ambient-glow -top-32 left-1/2 h-64 w-96 -translate-x-1/2 bg-gold/[0.03]" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-textPrimary">
              VAIBHAV <span className="font-light text-textMuted">TIWARI</span>
            </p>
            <p className="mt-2 font-body text-sm text-textMuted">
              Video Editor & Motion Designer
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-textMuted transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 md:flex-row">
          <p className="font-body text-xs text-textMuted/60">
            &copy; {new Date().getFullYear()} Vaibhav Tiwari. All rights reserved.
          </p>
          <p className="font-body text-xs text-textMuted/40">
            Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  )
}
