import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Lerp helper
const lerp = (a, b, t) => a + (b - a) * t

export default function Hero() {
  const sectionRef = useRef(null)
  const btnRef = useRef(null)

  // Refs for GSAP intro animations
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const videoRef = useRef(null)
  const playWrapRef = useRef(null)
  const labelRef = useRef(null)

  // Parallax layer refs (direct DOM manipulation, zero re-renders)
  const videoWrapRef = useRef(null)
  const contentRef = useRef(null)
  const glowRef = useRef(null)
  const overlayGradRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  // ── Parallax depth engine ───────────────────────────────
  useEffect(() => {
    // Raw (instant) and smoothed (lerped) mouse values, 0-1
    const raw = { x: 0.5, y: 0.5 }
    const smooth = { x: 0.5, y: 0.5 }
    // Separate slower channel for the video layer
    const smoothVideo = { x: 0.5, y: 0.5 }
    // Magnetic button state
    const btnSmooth = { x: 0, y: 0 }
    let btnTarget = { x: 0, y: 0 }

    let rafId = null
    let active = true

    const onMouseMove = (e) => {
      raw.x = e.clientX / window.innerWidth
      raw.y = e.clientY / window.innerHeight

      // Magnetic pull calculation (runs at event rate, cheap)
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 220
        if (dist < maxDist) {
          const pull = (1 - dist / maxDist) * 18
          btnTarget = { x: (dx / dist) * pull, y: (dy / dist) * pull }
        } else {
          btnTarget = { x: 0, y: 0 }
        }
      }
    }

    // ── Per-frame loop ──────────────────────────────────
    const tick = () => {
      if (!active) return

      // Lerp channels at different rates for depth separation
      smooth.x = lerp(smooth.x, raw.x, 0.06)       // content — medium
      smooth.y = lerp(smooth.y, raw.y, 0.06)
      smoothVideo.x = lerp(smoothVideo.x, raw.x, 0.025) // video — very slow
      smoothVideo.y = lerp(smoothVideo.y, raw.y, 0.025)
      btnSmooth.x = lerp(btnSmooth.x, btnTarget.x, 0.12)
      btnSmooth.y = lerp(btnSmooth.y, btnTarget.y, 0.12)

      // ── Layer 1: Video background (follows cursor, very subtle) ─
      if (videoWrapRef.current) {
        const vx = (smoothVideo.x - 0.5) * 12   // max ±6px
        const vy = (smoothVideo.y - 0.5) * 8    // max ±4px
        videoWrapRef.current.style.transform =
          `scale(1.08) translate3d(${vx}px, ${vy}px, 0)`
      }

      // ── Layer 2: Gradient overlay (subtle tilt with cursor) ─
      if (overlayGradRef.current) {
        const ox = (smooth.x - 0.5) * -4
        const oy = (smooth.y - 0.5) * -3
        overlayGradRef.current.style.transform =
          `translate3d(${ox}px, ${oy}px, 0)`
      }

      // ── Layer 3: Glow (precise cursor follow) ───────────
      if (glowRef.current) {
        glowRef.current.style.background =
          `radial-gradient(700px circle at ${smooth.x * 100}% ${smooth.y * 100}%, rgba(212,175,55,0.13), transparent 55%)`
      }

      // ── Layer 4: Content (opposite direction, cinematic) ─
      if (contentRef.current) {
        const cx = (smooth.x - 0.5) * -28  // max ±14px
        const cy = (smooth.y - 0.5) * -20  // max ±10px
        contentRef.current.style.transform =
          `translate3d(${cx}px, ${cy}px, 0)`
      }

      // ── Layer 5: Scroll indicator (slight opposite drift) ─
      if (scrollIndicatorRef.current) {
        const sx = (smooth.x - 0.5) * -8
        scrollIndicatorRef.current.style.transform =
          `translateX(calc(-50% + ${sx}px))`
      }

      // ── Magnetic button ─────────────────────────────────
      if (btnRef.current) {
        btnRef.current.style.transform =
          `translate3d(${btnSmooth.x}px, ${btnSmooth.y}px, 0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      active = false
      window.removeEventListener('mousemove', onMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // ── GSAP intro timeline ──────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Video fade-in
      tl.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4 },
        0,
      )

      // Heading — animate each line wrapper
      const lines = headingRef.current?.querySelectorAll('.hero-line')
      if (lines?.length) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 40, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.15,
          },
          0.3,
        )
      }

      // Subheading
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9 },
        lines?.length ? 0.7 : 0.6,
      )

      // Play button + label
      tl.fromTo(
        playWrapRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.45',
      )
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.35',
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#030303]"
    >
      {/* ── Background Video (Layer 1 — slowest parallax) ── */}
      <div
        ref={videoWrapRef}
        className="absolute inset-[-4%] will-change-transform"
        style={{ transform: 'scale(1.08)' }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover will-change-[opacity]"
          style={{ opacity: 0 }}
          src="/videos/heroshowreel.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* ── Dark Overlay ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/70" />

      {/* ── Gradient Overlay (Layer 2 — slight tilt) ─────── */}
      <div
        ref={overlayGradRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,3,3,0.4) 0%, transparent 40%, transparent 60%, rgba(3,3,3,0.85) 100%)',
        }}
      />

      {/* ── Cursor-Following Radial Gold Glow (Layer 3) ──── */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-40 will-change-[background]"
        style={{
          background: 'radial-gradient(700px circle at 50% 50%, rgba(212,175,55,0.13), transparent 55%)',
        }}
      />

      {/* ── Content (Layer 4 — opposite parallax) ────────── */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center will-change-transform"
      >
        {/* Heading */}
        <h1
          ref={headingRef}
          className="max-w-4xl font-display text-[clamp(2.2rem,5.5vw,4.8rem)] font-bold leading-[1.08] tracking-tight text-textPrimary will-change-transform"
        >
          <span className="hero-line inline-block">
            Bringing Your Vision to Life,{' '}
          </span>
          <span className="hero-line inline-block bg-gradient-to-r from-[#D4AF37] via-goldLight to-[#D4AF37] bg-clip-text text-transparent">
            Frame by Frame
          </span>
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          style={{ opacity: 0 }}
          className="mt-6 max-w-2xl font-body text-[clamp(0.95rem,1.6vw,1.25rem)] leading-relaxed tracking-wide text-textMuted/90 will-change-[opacity,transform]"
        >
          Video Editor &amp; Motion Designer specializing in SaaS explainers,
          educational content, and short-form videos.
        </p>

        {/* ── Play Button ────────────────────────────────── */}
        <div ref={playWrapRef} style={{ opacity: 0 }} className="will-change-[opacity,transform]">
        <button
          ref={btnRef}
          aria-label="Play showreel"
          className="group relative mt-14 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-silver/25 backdrop-blur-lg transition-[box-shadow,border-color] duration-500 ease-out hover:scale-[1.08] hover:border-silver/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] will-change-transform"
          style={{
            background: 'rgba(255,255,255,0.06)',
            boxShadow: '0 0 40px rgba(212,175,55,0.08)',
          }}
        >
          {/* Hover glow ring */}
          <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: '0 0 60px 8px rgba(212,175,55,0.18), inset 0 0 20px rgba(212,175,55,0.06)' }} />

          {/* Play triangle */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="ml-1 h-7 w-7"
            aria-hidden="true"
          >
            <path
              d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28a1 1 0 0 0-1.5.86Z"
              fill="#D4AF37"
            />
          </svg>
        </button>
        </div>

        <span
          ref={labelRef}
          style={{ opacity: 0 }}
          className="mt-4 font-body text-xs uppercase tracking-[0.25em] text-textMuted/60"
        >
          Watch Showreel
        </span>
      </div>

      {/* ── Scroll Indicator (Layer 5) ─────────────────── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 will-change-transform"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-textMuted/40">
          Scroll
        </span>
        <svg
          className="h-5 w-5 animate-scroll-hint text-gold/50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>

      {/* ── Bottom vignette fade ─────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent" />
    </section>
  )
}
