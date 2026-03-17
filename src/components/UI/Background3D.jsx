import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const DUST_COUNT = 120
const STAR_COUNT = 50
const HALO_COUNT = 60

function createCloud(count, spread, depth, colorMode = 'silver') {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * spread
    positions[i3 + 1] = (Math.random() - 0.5) * spread * 0.7
    positions[i3 + 2] = (Math.random() - 0.5) * depth

    if (colorMode === 'gold') {
      const g = 0.75 + Math.random() * 0.25
      colors[i3] = 0.83 * g
      colors[i3 + 1] = 0.69 * g
      colors[i3 + 2] = 0.22 * g
    } else if (colorMode === 'stars') {
      const w = 0.88 + Math.random() * 0.12
      colors[i3] = w
      colors[i3 + 1] = w
      colors[i3 + 2] = 0.88 + Math.random() * 0.12
    } else {
      const b = 0.58 + Math.random() * 0.35
      colors[i3] = b
      colors[i3 + 1] = b + 0.03
      colors[i3 + 2] = b + 0.06
    }
  }

  return { positions, colors }
}

function DustLayer() {
  const pointsRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  const { positions, colors } = useMemo(
    () => createCloud(DUST_COUNT, 20, 10, 'silver'),
    [],
  )

  useFrame(({ pointer, clock }) => {
    if (!pointsRef.current) return

    mouse.current.x += (pointer.x * 0.4 - mouse.current.x) * 0.015
    mouse.current.y += (pointer.y * 0.3 - mouse.current.y) * 0.015
    pointsRef.current.rotation.y = mouse.current.x * 0.12
    pointsRef.current.rotation.x = -mouse.current.y * 0.08
    pointsRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.08) * 0.2
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={DUST_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={DUST_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function StarLayer() {
  const pointsRef = useRef()
  const { positions, colors } = useMemo(
    () => createCloud(STAR_COUNT, 22, 14, 'stars'),
    [],
  )

  useFrame(({ pointer, clock }) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += 0.00045
    pointsRef.current.rotation.x = pointer.y * -0.04
    pointsRef.current.rotation.z = pointer.x * 0.03
    pointsRef.current.position.z = Math.sin(clock.getElapsedTime() * 0.15) * 0.25

    const material = pointsRef.current.material
    material.opacity = 0.75 + Math.sin(clock.getElapsedTime() * 0.9) * 0.12
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={STAR_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.085}
        vertexColors
        transparent
        opacity={0.82}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function HaloLayer() {
  const pointsRef = useRef()
  const { positions, colors } = useMemo(() => {
    const positionsArr = new Float32Array(HALO_COUNT * 3)
    const colorsArr = new Float32Array(HALO_COUNT * 3)

    for (let i = 0; i < HALO_COUNT; i++) {
      const i3 = i * 3
      const angle = (i / HALO_COUNT) * Math.PI * 2
      const radius = 5.2 + Math.random() * 1.8

      positionsArr[i3] = Math.cos(angle) * radius
      positionsArr[i3 + 1] = Math.sin(angle) * radius * 0.38
      positionsArr[i3 + 2] = (Math.random() - 0.5) * 2.2

      const g = 0.72 + Math.random() * 0.28
      colorsArr[i3] = 0.83 * g
      colorsArr[i3 + 1] = 0.69 * g
      colorsArr[i3 + 2] = 0.22 * g
    }

    return { positions: positionsArr, colors: colorsArr }
  }, [])

  useFrame(({ pointer, clock }) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.z = clock.getElapsedTime() * 0.035
    pointsRef.current.rotation.y = pointer.x * 0.09
    pointsRef.current.rotation.x = pointer.y * -0.07
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={HALO_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={HALO_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.048}
        vertexColors
        transparent
        opacity={0.52}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Subtle radial fog plane ───────────────────────────── */
function AmbientFog() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.material.opacity = 0.06 + Math.sin(clock.getElapsedTime() * 0.35) * 0.015
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[18, 14]} />
      <meshBasicMaterial
        color="#d4af37"
        transparent
        opacity={0.06}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ─── Main export ───────────────────────────────────────── */
export default function Background3D() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-65 mix-blend-screen"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 30 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <AmbientFog />
        <DustLayer />
        <StarLayer />
        <HaloLayer />
      </Canvas>
    </div>
  )
}
