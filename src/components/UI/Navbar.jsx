import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-20">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-textPrimary transition-colors duration-300 group-hover:text-gold">
            VAIBHAV
          </span>
          <span className="hidden font-display text-lg font-light tracking-tight text-textMuted sm:inline">
            TIWARI
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-body text-[13px] font-medium uppercase tracking-[0.2em] text-textMuted transition-colors duration-300 hover:text-textPrimary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#about"
          className="hidden rounded-full border border-gold/30 bg-gold/[0.06] px-5 py-2 font-body text-[12px] font-medium uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:border-gold/50 hover:bg-gold/[0.12] hover:shadow-glow md:inline-block"
        >
          Let&apos;s Talk
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-[5px] md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-[1.5px] w-5 bg-textPrimary transition-all duration-300 ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block h-[1.5px] w-5 bg-textPrimary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[1.5px] w-5 bg-textPrimary transition-all duration-300 ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/[0.04] bg-black/80 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-body text-sm font-medium uppercase tracking-[0.15em] text-textMuted transition-colors duration-200 hover:bg-white/[0.04] hover:text-textPrimary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full border border-gold/30 bg-gold/[0.06] px-5 py-3 text-center font-body text-sm font-medium uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:bg-gold/[0.12]"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </nav>
  )
}
