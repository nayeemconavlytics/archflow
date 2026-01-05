"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  activeTab: number;
}

export default function ThreeBackground({ activeTab }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetsRef = useRef<Float32Array>(new Float32Array(450 * 3));

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    // --- Core Constants ---
    const particleCount = 450;
    const radius = 6;
    const maxDistance = 2.5; 
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particlesData: { velocity: THREE.Vector3; originalColor: THREE.Color }[] = [];

    const palette = [
      new THREE.Color(0x00d2ff), 
      new THREE.Color(0x3aefc3), 
      new THREE.Color(0xffb400)
    ];

    // --- FUNCTIONALITY: MORPHING LOGIC ---
    const updateTargets = (tab: number) => {
      const targets = targetsRef.current;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // TRIGGER: Tab 1 is now the Humanoid (About Us)
        if (tab === 1) { 
          if (i < 80) { 
            // 1. HEAD
            const phi = Math.acos(-1 + (2 * i) / 80);
            const theta = Math.sqrt(80 * Math.PI) * phi;
            targets[i3] = 0.9 * Math.cos(theta) * Math.sin(phi);
            targets[i3 + 1] = 0.9 * Math.sin(theta) * Math.sin(phi) + 4.5; 
            targets[i3 + 2] = 0.9 * Math.cos(phi);
          } 
          else if (i < 300) {
            // 2. TORSO (V-Taper Architect)
            const p = (i - 80) / 220;
            const y = (1 - p) * 5 - 1.5; 
            const vWidth = p < 0.2 ? 1.5 + p * 8 : 4.5 - p * 3; 
            targets[i3] = (Math.random() - 0.5) * vWidth;
            targets[i3 + 1] = y;
            targets[i3 + 2] = (Math.random() - 0.5) * 1.8;
          } 
          else {
            // 3. ARMS
            const p = (i - 300) / 150;
            const side = i % 2 === 0 ? 1 : -1; 
            const armY = 3.2 - p * 4;
            targets[i3] = (2.2 + p * 1.5) * side; 
            targets[i3 + 1] = armY;
            targets[i3 + 2] = (Math.random() - 0.5) * 1.2;
          }
        } 
        else if (tab === 2) {
          // TRIGGER: Tab 2 is now the Thunder Bolt (Services)
          const p = i / particleCount;
          let tx, ty;

          if (p < 0.4) {
            const segP = p / 0.4;
            tx = 3 - segP * 4;
            ty = 5 - segP * 4;
          } else if (p < 0.7) {
            const segP = (p - 0.4) / 0.3;
            tx = -1 + segP * 5;
            ty = 1;
          } else {
            const segP = (p - 0.7) / 0.3;
            tx = 4 - segP * 6;
            ty = 1 - segP * 6;
          }

          targets[i3] = tx + (Math.random() - 0.5) * 0.5;
          targets[i3 + 1] = ty + (Math.random() - 0.5) * 0.5;
          targets[i3 + 2] = (Math.random() - 0.5) * 1.0;
        }
        else if (tab === 3) {
          // TRIGGER: Tab 3 is Full Medieval Shield + Tick
          if (i < 350) {
            // FULL MEDIEVAL HEATER SHIELD (Filled)
            const p = (i / 350);
            const side = i % 2 === 0 ? 1 : -1;
            
            // Generate a random Y and then calculate the max allowed X for that Y 
            // to create a "filled" look rather than just an outline.
            const y = 4.5 - (p * 9); 
            let maxWidth;

            if (y > 2.0) {
              maxWidth = 3.5; // Top block
            } else {
              const normalizedY = (y + 4.5) / 6.5; 
              maxWidth = 3.5 * Math.pow(normalizedY, 0.7); // Tapered bottom
            }

            // Randomly distribute particles within the shield width
            targets[i3] = (Math.random() * maxWidth) * side;
            targets[i3 + 1] = y;
            targets[i3 + 2] = (Math.random() - 0.5) * 0.8;
          } else {
            // TICK (Inside Shield)
            const p = (i - 350) / 100;
            if (p < 0.35) {
              const segP = p / 0.35;
              targets[i3] = -1.2 + segP * 1.2;
              targets[i3 + 1] = 0.5 - segP * 1.5;
            } else {
              const segP = (p - 0.35) / 0.65;
              targets[i3] = 0 + segP * 2.2;
              targets[i3 + 1] = -1.0 + segP * 3.2;
            }
            targets[i3 + 2] = 0.5; // Slightly in front of shield
          }
        }
        else if (tab === 4) {
          // TRIGGER: Tab 4 is Calculator
          if (i < 200) {
            const p = i / 200;
            const side = i % 2 === 0 ? 1 : -1;
            targets[i3] = side * 3.5;
            targets[i3 + 1] = (p * 10) - 5;
            if (i % 4 < 2) { 
              targets[i3] = (Math.random() - 0.5) * 7;
              targets[i3 + 1] = (i % 4 === 0) ? 5 : -5;
            }
          } else if (i < 280) {
            targets[i3] = (Math.random() - 0.5) * 5;
            targets[i3 + 1] = 3.2 + (Math.random() - 0.5) * 1;
          } else {
            const p = (i - 280) / 170;
            const row = Math.floor(p * 3);
            const col = i % 2 === 0 ? -1 : 1;
            targets[i3] = (col * 1.5) + (Math.random() - 0.5) * 0.8;
            targets[i3 + 1] = (1 - row * 2) + (Math.random() - 0.5) * 0.8;
          }
          targets[i3 + 2] = (Math.random() - 0.5) * 1.0;
        }
        else if (tab === 5) {
          // TRIGGER: Tab 5 is Mail Symbol
          const rectWidth = 8;
          const rectHeight = 6;

          if (i < 300) {
            // Rectangle Outline
            const p = i / 300;
            if (p < 0.25) { // Bottom
              targets[i3] = (p * 4 - 0.5) * rectWidth;
              targets[i3 + 1] = -rectHeight / 2;
            } else if (p < 0.5) { // Top
              targets[i3] = ((p - 0.25) * 4 - 0.5) * rectWidth;
              targets[i3 + 1] = rectHeight / 2;
            } else if (p < 0.75) { // Left
              targets[i3] = -rectWidth / 2;
              targets[i3 + 1] = ((p - 0.5) * 4 - 0.5) * rectHeight;
            } else { // Right
              targets[i3] = rectWidth / 2;
              targets[i3 + 1] = ((p - 0.75) * 4 - 0.5) * rectHeight;
            }
          } else {
            // V-Flap
            const p = (i - 300) / 150;
            const side = i % 2 === 0 ? 1 : -1;
            targets[i3] = (side * rectWidth / 2) * (1 - p);
            targets[i3 + 1] = (rectHeight / 2) - (p * 4); 
          }
          targets[i3 + 2] = (Math.random() - 0.5) * 0.5;
        }
        else { 
          // DEFAULT: Globe (All other tabs)
          const phi = Math.acos(-1 + (2 * i) / particleCount);
          const theta = Math.sqrt(particleCount * Math.PI) * phi;
          targets[i3] = radius * Math.cos(theta) * Math.sin(phi);
          targets[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
          targets[i3 + 2] = radius * Math.cos(phi);
        }
      }
    };

    updateTargets(activeTab);

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = targetsRef.current[i3];
      positions[i3 + 1] = targetsRef.current[i3 + 1];
      positions[i3 + 2] = targetsRef.current[i3 + 2];
      
      const clr = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = clr.r; 
      colors[i3 + 1] = clr.g; 
      colors[i3 + 2] = clr.b;

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        originalColor: clr.clone()
      });
    }

    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    pGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
    
    const pSystem = new THREE.Points(pGeometry, new THREE.PointsMaterial({ 
      size: 0.12, 
      vertexColors: true, 
      blending: THREE.AdditiveBlending, 
      transparent: true, 
      opacity: 0.8 
    }));
    group.add(pSystem);

    const lineGeometry = new THREE.BufferGeometry();
    const linePos = new Float32Array(particleCount * 60 * 3); 
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMesh = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ 
      color: 0x444444, 
      transparent: true, 
      opacity: 0.2,
      depthWrite: false
    }));
    group.add(lineMesh);

    // --- INTERACTION STATE ---
    let targetZ = 12;
    let currentZ = 12;
    let mx = 0, my = 0;
    let shakeIntensity = 0;

    const handleWave = () => { shakeIntensity = 1.5; };
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
      my = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    const onScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      targetZ = 15 - (progress * 13);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("gravitational-wave", handleWave);

    // --- ANIMATION LOOP ---
    const animate = () => {
      const posArray = pGeometry.attributes.position.array as Float32Array;
      const colArray = pGeometry.attributes.color.array as Float32Array;
      const targets = targetsRef.current;
      let lineIndex = 0;

      if (shakeIntensity > 0) shakeIntensity *= 0.94;
      else shakeIntensity = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        posArray[i3]   += (targets[i3]   - posArray[i3])   * 0.08;
        posArray[i3+1] += (targets[i3+1] - posArray[i3+1]) * 0.08;
        posArray[i3+2] += (targets[i3+2] - posArray[i3+2]) * 0.08;

        posArray[i3]   += particlesData[i].velocity.x;
        posArray[i3+1] += particlesData[i].velocity.y;
        posArray[i3+2] += particlesData[i].velocity.z;

        if (shakeIntensity > 0.01) {
          posArray[i3]   += (Math.random() - 0.5) * shakeIntensity;
          posArray[i3+1] += (Math.random() - 0.5) * shakeIntensity;
          posArray[i3+2] += (Math.random() - 0.5) * shakeIntensity;
          colArray[i3] = Math.min(1, particlesData[i].originalColor.r + shakeIntensity);
          colArray[i3+1] = Math.min(1, particlesData[i].originalColor.g + shakeIntensity);
          colArray[i3+2] = Math.min(1, particlesData[i].originalColor.b + shakeIntensity);
        } else {
          colArray[i3] = particlesData[i].originalColor.r;
          colArray[i3+1] = particlesData[i].originalColor.g;
          colArray[i3+2] = particlesData[i].originalColor.b;
        }

        const d = Math.sqrt(posArray[i3]**2 + posArray[i3+1]**2 + posArray[i3+2]**2);
        if (d > radius + 1 || d < radius - 5) particlesData[i].velocity.multiplyScalar(-1);

        for (let j = i + 1; j < Math.min(i + 40, particleCount); j++) {
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3+1] - posArray[j3+1];
          const dz = posArray[i3+2] - posArray[j3+2];
          const distSq = dx*dx + dy*dy + dz*dz;

          if (distSq < maxDistance * maxDistance) {
            linePos[lineIndex++] = posArray[i3];
            linePos[lineIndex++] = posArray[i3+1];
            linePos[lineIndex++] = posArray[i3+2];
            linePos[lineIndex++] = posArray[j3];
            linePos[lineIndex++] = posArray[j3+1];
            linePos[lineIndex++] = posArray[j3+2];
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      pGeometry.attributes.position.needsUpdate = true;
      pGeometry.attributes.color.needsUpdate = true;

      currentZ += (targetZ - currentZ) * 0.05;
      camera.position.z = currentZ;
      group.rotation.y += 0.0015 + (mx * 0.02);
      group.rotation.x += (my * 0.02);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("gravitational-wave", handleWave);
      renderer.dispose();
    };
  }, [activeTab]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}