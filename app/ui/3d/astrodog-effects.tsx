//@ts-nocheck
import * as THREE from 'three'
import {
    Bloom,
    DepthOfField,
    EffectComposer,
    Noise,
    Vignette,
} from '@react-three/postprocessing'
import { Effects } from '@react-three/drei'
import { extend, useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import {
    FilmPass,
    WaterPass,
    UnrealBloomPass,
    LUTPass,
    LUTCubeLoader,
} from 'three-stdlib'

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass })

export default function AstrodogEffects({ magic }: { magic: boolean }) {
    const water = useRef(null)
    const data = useLoader(LUTCubeLoader, '/cubicle.CUBE')
    useFrame((state) => {
        if (water.current) {
            water.current.time = state.clock.elapsedTime * 4
        }
    })

    return (
        magic && (
            <Effects disableGamma>
                <waterPass ref={water} factor={0.25} />
                <unrealBloomPass args={[undefined, 0.5, 0.6, 0.1]} />
                <filmPass args={[0.2, 0.3, 1500, false]} />
                <lUTPass lut={data.texture} intensity={0.1} />
            </Effects>
        )
    )
}
