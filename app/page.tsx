"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { useScroll, useTransform, MotionValue, animate } from "framer-motion";
import { Mesh } from "three";
import { useRouter } from "next/navigation";

type ShapeType = "cube" | "sphere" | null;

function FloatingShapes({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const cubeRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);
  const router = useRouter();
  const [clickedShape, setClickedShape] = useState<ShapeType>(null);

  // Scale scroll to movement from bottom
  const yPos = useTransform(scrollYProgress, [0, 1], [-10, 0]); // bigger range = pop-up effect

  useFrame(() => {
    if (!clickedShape) {
      // Rotate shapes normally
      if (cubeRef.current) cubeRef.current.rotation.y += 0.01;
      if (sphereRef.current) sphereRef.current.rotation.x += 0.008;

      // Scroll-based vertical movement
      if (cubeRef.current) cubeRef.current.position.y = yPos.get();
      if (sphereRef.current) sphereRef.current.position.y = yPos.get();
    }
  });

  const handleClick = (shape: ShapeType) => {
    if (!shape || clickedShape) return;
    setClickedShape(shape);

    const ref = shape === "cube" ? cubeRef.current : sphereRef.current;
    if (!ref) return;

    // Animate scale to fill screen
    animate(
      ref.scale,
      { x: 8, y: 8, z: 8 },
      {
        duration: 1,
        onComplete: () => {
          router.push(shape === "cube" ? "/cubePage" : "/spherePage");
        },
      }
    );
  };

  return (
    <>
      <mesh
        ref={cubeRef}
        position={[-2, -10, 0]}
        scale={[2.4, 2.4, 2.4]}
        onClick={() => handleClick("cube")}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" />
      </mesh>

      <mesh
        ref={sphereRef}
        position={[2, -10, 0]}
        scale={[1.5, 1.5, 1.5]}
        onClick={() => handleClick("sphere")}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" />
      </mesh>
    </>
  );
}

// Main canvas
export default function Page() {
  const { scrollYProgress } = useScroll();

  return (
    <div style={{ height: "200vh", width: "100vw" }}>
      {/* 3D Canvas fixed behind content */}
      <div className="z-50">
        <Canvas
          camera={{ position: [0, 1.5, 5], fov: 50 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={0.5} />
          <FloatingShapes scrollYProgress={scrollYProgress} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Optional overlay content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "#fff",
          paddingTop: "100vh",
          textAlign: "center",
        }}
      >
        <h1>Scroll down to see the shapes pop!</h1>
      </div>
    </div>
  );
}
