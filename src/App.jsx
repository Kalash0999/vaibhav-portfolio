import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Background3D from './components/UI/Background3D'
import LuxuryCursor from './components/UI/LuxuryCursor'
import Navbar from './components/UI/Navbar'
import Footer from './components/UI/Footer'
import Hero from './components/Hero/Hero'
import Portfolio from './components/Portfolio/Portfolio'
import Showreel from './components/Showreel/Showreel'
import Services from './components/Services/Services'
import Process from './components/Process/Process'
import Tools from './components/Tools/Tools'
import About from './components/About/About'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('section:not(:first-child)')

      sections.forEach((section, sectionIndex) => {
        const sectionEl = section
        const heading = sectionEl.querySelector('.section-heading')
        const label = sectionEl.querySelector('.section-label')
        const intro = sectionEl.querySelector('.section-heading + p')
        const cards = gsap.utils.toArray(sectionEl.querySelectorAll('.glass-card, article'))

        const timeline = gsap.timeline({
          defaults: { ease: 'power4.out' },
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 82%',
            once: true,
          },
        })

        timeline.fromTo(
          sectionEl,
          { autoAlpha: 0, scale: 0.985 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            clearProps: 'opacity,visibility,transform',
          },
        )

        if (label) {
          timeline.fromTo(
            label,
            { autoAlpha: 0, xPercent: -130, yPercent: 24, rotateZ: -3, filter: 'blur(6px)' },
            {
              autoAlpha: 1,
              xPercent: 0,
              yPercent: 0,
              rotateZ: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              clearProps: 'opacity,visibility,transform,filter',
            },
            0.08,
          )
        }

        if (heading) {
          timeline.fromTo(
            heading,
            {
              autoAlpha: 0,
              yPercent: 80,
              rotateX: sectionIndex % 2 === 0 ? -16 : 16,
              transformOrigin: '50% 100%',
              filter: 'blur(10px)',
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              duration: 1.05,
              clearProps: 'opacity,visibility,transform,filter',
            },
            0.14,
          )
        }

        if (intro) {
          timeline.fromTo(
            intro,
            { autoAlpha: 0, y: 70 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              clearProps: 'opacity,visibility,transform',
            },
            0.26,
          )
        }

        if (cards.length) {
          timeline.fromTo(
            cards,
            {
              autoAlpha: 0,
              y: 120,
              xPercent: (_, i) => (i % 2 === 0 ? -34 : 34),
              rotateY: (_, i) => (i % 2 === 0 ? 16 : -16),
              rotateZ: (_, i) => (i % 3 === 0 ? -2 : 2),
              transformOrigin: '50% 100%',
              filter: 'blur(12px)',
            },
            {
              autoAlpha: 1,
              y: 0,
              xPercent: 0,
              rotateY: 0,
              rotateZ: 0,
              filter: 'blur(0px)',
              duration: 1.05,
              stagger: 0.11,
              clearProps: 'opacity,visibility,transform,filter',
            },
            0.36,
          )
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <LuxuryCursor />
      <Background3D />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <div className="section-divider" />
          <Portfolio />
          <div className="section-divider" />
          <Showreel />
          <div className="section-divider" />
          <Services />
          <div className="section-divider" />
          <Process />
          <div className="section-divider" />
          <Tools />
          <div className="section-divider" />
          <About />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
