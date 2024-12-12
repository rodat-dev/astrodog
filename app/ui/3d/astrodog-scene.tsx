'use client'
import {
    Environment,
    PresentationControls,
    Float,
    Preload,
    Lightformer,
    View,
    Stars,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/app/lib/utils'
import {
    BufferGeometry,
    Material,
    NormalBufferAttributes,
    Object3DEventMap,
    Points,
} from 'three'
import AstrodogEffects from './astrodog-effects'
import { Particles } from './astrodog-portal'
import { useTheme } from 'next-themes'
import {
    Bloom,
    DepthOfField,
    EffectComposer,
    Noise,
    Vignette,
} from '@react-three/postprocessing'

const AstrodogModel = dynamic(() => import('@/app/ui/3d/astrodog-model'), {
    ssr: false,
})

function StarryBackground() {
    const stars =
        useRef<
            Points<
                BufferGeometry<NormalBufferAttributes>,
                Material | Material[],
                Object3DEventMap
            >
        >(null)
    useFrame(({ clock }) => {
        stars.current!.rotation.y = clock.getElapsedTime() * 0.002
        stars.current!.rotation.x = clock.getElapsedTime() * 0.003
    })

    return (
        <Stars
            ref={stars}
            count={10000}
            factor={0.8}
            depth={50}
            speed={1.2}
            saturation={0.5}
            radius={100}
        />
    )
}

// const CAMERA_POSITIONS = (isHome: boolean) => (isHome ? -10 : 0)
const ASTRODOG_POSITIONS = (isHome: boolean) => (isHome ? -10 : -20)

export default function AstrodogScene() {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { theme } = useTheme()
    useEffect(() => setMounted(true))
    if (!mounted) return null

    const isHome = pathname === '/'

    return (
        <section className="pointer-events-none absolute left-0 top-0 z-0 h-dvh w-dvw">
            <Canvas
                linear={theme === 'magic'}
                flat={theme === 'magic'}
                legacy={theme === 'magic'}
                inert={!isHome}
                camera={{ position: [0, 0, 10], fov: 35 }}
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
                className="bg-radial absolute left-0 top-0 h-dvh w-dvw cursor-pointer touch-none from-violet-950 via-slate-950 to-black transition-all duration-500 contain-layout"
            >
                <Suspense fallback={null}>
                    <fog color="#161616" attach="fog" near={8} far={30} />
                    <StarryBackground />
                </Suspense>

                <Suspense fallback={null}>
                    <PresentationControls
                        global
                        cursor
                        azimuth={[-Infinity, Infinity]}
                        config={{ mass: 1, tension: 170, friction: 26 }}
                    >
                        <Float>
                            <AstrodogModel
                                positionY={ASTRODOG_POSITIONS(isHome)}
                            />
                        </Float>
                    </PresentationControls>

                    <Environment resolution={512}>
                        <group rotation={[-Math.PI / 3, 0, 1]}>
                            <Lightformer
                                form="circle"
                                intensity={100}
                                rotation-x={Math.PI / 2}
                                position={[0, 5, -9]}
                                scale={2}
                            />
                            <Lightformer
                                form="circle"
                                intensity={2}
                                rotation-y={Math.PI / 2}
                                position={[-5, 1, -1]}
                                scale={2}
                            />
                            <Lightformer
                                form="circle"
                                intensity={4}
                                rotation-y={Math.PI / 2}
                                position={[-5, -1, -1]}
                                scale={2}
                            />
                            <Lightformer
                                form="circle"
                                intensity={3}
                                rotation-y={-Math.PI / 2}
                                position={[10, 1, 0]}
                                scale={8}
                            />
                            <Lightformer
                                form="ring"
                                color="#4060ff"
                                intensity={90}
                                position={[10, -5, 0]}
                                scale={14}
                            />
                        </group>
                    </Environment>
                    <AstrodogEffects magic={theme === 'magic'} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </section>
    )
}
