import { useEffect, useRef } from 'react'

export default function LuxuryCursor() {
  const layerRef = useRef(null)
  const diamondRef = useRef(null)
  const coreRef = useRef(null)
  const auraRef = useRef(null)

  useEffect(() => {
    const hasFinePointer =
      window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(any-pointer: fine)').matches

    if (!hasFinePointer) return undefined

    const layer = layerRef.current
    const diamond = diamondRef.current
    const core = coreRef.current
    const aura = auraRef.current
    if (!layer || !diamond || !core || !aura) return undefined

    document.body.classList.add('luxury-cursor-active')

    let mouseX = -100
    let mouseY = -100
    let curX = -100
    let curY = -100
    let hovering = false
    let pressing = false
    let visible = true
    let raf = 0

    const tick = () => {
      curX += (mouseX - curX) * 0.18
      curY += (mouseY - curY) * 0.18
      layer.style.transform = `translate3d(${curX}px, ${curY}px, 0)`

      const s = hovering ? 1.45 : pressing ? 0.82 : 1
      const r = hovering ? 90 : 45
      const ao = hovering ? 0.55 : 0.36
      diamond.style.transform = `rotate(${r}deg) scale(${s})`
      aura.style.opacity = `${ao}`

      if (visible) {
        layer.style.opacity = '1'
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const el = e.target
      hovering =
        el instanceof Element &&
        !!el.closest(
          'a, button, [role="button"], input, textarea, select, label, .glass-card, article, video',
        )
    }

    const onDown = () => { pressing = true }
    const onUp = () => { pressing = false }
    const onLeave = () => { visible = false; layer.style.opacity = '0' }
    const onEnter = () => { visible = true }

    window.addEventListener('mousemove', onMove, true)
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('mousedown', onDown, true)
    window.addEventListener('mouseup', onUp, true)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove, true)
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('mousedown', onDown, true)
      window.removeEventListener('mouseup', onUp, true)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('luxury-cursor-active')
    }
  }, [])

  return (
    <div ref={layerRef} className="luxury-cursor-layer" aria-hidden="true">
      <div ref={auraRef} className="luxury-cursor-aura" />
      <div ref={diamondRef} className="luxury-cursor-diamond" />
      <div ref={coreRef} className="luxury-cursor-core" />
    </div>
  )
}
