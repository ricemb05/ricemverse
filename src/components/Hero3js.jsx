import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Grid, useHelper } from "@react-three/drei";
import * as THREE from "three";

export default function Hero3js() {

    function VerticalWaveLines() {
        const mesh = useRef();
        const { mouse, camera } = useThree();

        const raycaster = useRef(new THREE.Raycaster());

        const material = useRef(
            new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                },
                vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
                fragmentShader: `
                uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {

    float lines = fract(vUv.x * 100.0);

    // ===== Cursor ripple =====
    float dist = distance(vUv, uMouse);
    float ripple = exp(-dist * 40.0);

    float cursorWave = sin((vUv.y * 20.0) - uTime * 4.0);
    float cursorDistortion = cursorWave * ripple * 0.12;

    // ===== Ambient waves (always active) =====
    float wave1 = sin(vUv.y * 10.0 + uTime * 1.5);
    float wave2 = sin(vUv.x * 6.0 - uTime * 1.0);

    float ambient = (wave1 + wave2) * 0.03;

    // ===== Combine both =====
    float distortion = cursorDistortion + ambient;

    float finalLines = step(0.98, fract((vUv.x + distortion) * 100.0));

    vec3 color = vec3(0.1, 0.1, 0.1);

    // glow stronger near cursor
    color += finalLines * vec3(1, 1, 1) * (0.5 + ripple);

    gl_FragColor = vec4(color, 1.0);
}
                `,
            })
        );

        useFrame(({ clock }) => {
            material.current.uniforms.uTime.value = clock.getElapsedTime();

            // Raycast from mouse into the scene
            raycaster.current.setFromCamera(mouse, camera);

            const intersects = raycaster.current.intersectObject(mesh.current);

            if (intersects.length > 0) {
                const uv = intersects[0].uv;
                material.current.uniforms.uMouse.value.copy(uv);
            }
        });

        return (
            <mesh ref={mesh} position={[0, 0, -30]}>
                <planeGeometry args={[200, 200]} />
                <primitive object={material.current} attach="material" />
            </mesh>
        );
    }


    const groupRef = useRef();

    function CameraRig({ groupRef }) {
        const { mouse } = useThree();

        const target = useRef({ x: 0, y: 0 });

        useFrame(() => {
            if (!groupRef.current) return;

            // 👉 base offset (scene shifted to the right)
            const baseX = 10;
            const baseY = 0;

            // 👉 subtle mouse influence (parallax)
            const mouseX = mouse.x * 5;
            const mouseY = mouse.y * 5;

            target.current.x = baseX + mouseX;
            target.current.y = baseY + mouseY;

            // smooth follow
            groupRef.current.position.x +=
                (target.current.x - groupRef.current.position.x) * 0.05;

            groupRef.current.position.y +=
                (target.current.y - groupRef.current.position.y) * 0.05;
        });

        return null;
    }

    function Target() {
        return (
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color="red" />
            </mesh>
        );
    }
    function Axes() {
        const { scene } = useThree();

        useEffect(() => {
            const axes = new THREE.AxesHelper(5);
            scene.add(axes);
            return () => scene.remove(axes);
        }, [scene]);

        return null;
    }
    function Scene() {

        const c1 = useRef();
        const c2 = useRef();
        const c3 = useRef();
        const c4 = useRef();
        const c5 = useRef();
        const c6 = useRef();
        const c7 = useRef();
        const c8 = useRef();
        const c9 = useRef();


        const time = useRef(0);

        // const lightRef = useRef();
        // useHelper(lightRef, THREE.DirectionalLightHelper, 2);

        useFrame(({ camera }) => {
            time.current += .02;


            const count = 9;
            const spacing = (Math.PI * 2) / count;

            const orbit = (ref, index) => {
                if (!ref.current) return;

                const angle = time.current + index * spacing;

                const baseRadius = 8; // stable ring size
                const pulse = Math.sin(time.current * 0.2);
                const wobble = Math.sin(time.current + index) * 0.5;

                const radius = 6 + index * 0.6 + pulse * 1.5;

                ref.current.position.x = Math.cos(angle) * (radius + wobble);
                ref.current.position.y = Math.sin(angle) * (radius - wobble);
                ref.current.position.z = Math.sin(angle * 1.5) * 5;

                const scale = 1 + Math.sin(time.current * 0.5 + index) * 0.15;
                ref.current.scale.set(scale, scale, scale);
            };


            orbit(c1, 0);
            orbit(c2, 1);
            orbit(c3, 2);
            orbit(c4, 3);
            orbit(c5, 4);
            orbit(c6, 5);
            orbit(c7, 6);
            orbit(c8, 7);
            orbit(c9, 8);


        });

        return (
            <group position={[10, 0, 0]} ref={groupRef}>


                <directionalLight position={[10, 8, 5]} intensity={50} />
                <ambientLight intensity={0.3} />

                <mesh ref={c1} >
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={1}
                        roughness={0}

                    />
                </mesh>
                <mesh ref={c2}>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
                <mesh ref={c3}>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
                <mesh ref={c4}>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
                <mesh ref={c5}>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
                <mesh ref={c6}>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
                <mesh ref={c7}>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
                <mesh ref={c8}>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
                <mesh ref={c9}>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={1}
                        roughness={0}
                    />
                </mesh>


            </group>
        );
    }





    return (
        <>
            <Canvas camera={{ position: [0, 2, 20], fov: 70 }}>
                <VerticalWaveLines />
                <Scene />

                {/* <Axes />
                <Grid args={[20, 20]} />
                <Target /> */}
                <CameraRig groupRef={groupRef} />

            </Canvas>
        </>
    )
}
