"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function DigitalCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const requestRef = useRef<number | null>(null);

  const scrollRef = useRef(0);
  const originalZRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000);
    camera.position.z = 500;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const particlesCount = 8000;
    const positions = new Float32Array(particlesCount * 3);
    const originalZ = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2500;
      positions[i3 + 1] = (Math.random() - 0.5) * 2500;
      positions[i3 + 2] = (Math.random() - 0.5) * 4000;
      originalZ[i] = positions[i3 + 2];
    }
    originalZRef.current = originalZ;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 4.5,
      color: 0x34d399,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = totalHeight <= 0 ? 0 : window.scrollY / totalHeight;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const animate = () => {
      const time = Date.now() * 0.001;
      const progress = scrollRef.current;

      if (particlesRef.current && originalZRef.current) {
        const particles = particlesRef.current;
        const positions = particles.geometry.attributes.position.array as Float32Array;
        const originalZ = originalZRef.current;

        particles.rotation.z += 0.0015;
        particles.rotation.y += 0.0008;

        for (let i = 0; i < originalZ.length; i++) {
          const i3 = i * 3;
          let newZ = originalZ[i] + progress * 4500;
          while (newZ > 1500) newZ -= 4000;
          while (newZ < -2500) newZ += 4000;
          positions[i3 + 2] = newZ;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        const mat = particles.material as THREE.PointsMaterial;
        mat.size = 4.5 + Math.sin(time * 3) * 2;
      }
      
      if (cameraRef.current) {
        cameraRef.current.position.y = progress * -150;
      }

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none" 
      style={{ zIndex: 1, background: "transparent" }} 
    />
  );
}
