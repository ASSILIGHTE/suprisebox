import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeGiftBox({ isOpen, isShaking, onClick, isInteractive = true }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const lidRef = useRef(null);
  const bowGroupRef = useRef(null);
  const innerLightRef = useRef(null);
  const boxGroupRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5f7, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffb6c1, 0.8);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // Inner Glow Light (inside gift box)
    const innerLight = new THREE.PointLight(0xff69b4, 0, 10);
    innerLight.position.set(0, 0.5, 0);
    scene.add(innerLight);
    innerLightRef.current = innerLight;

    // Main Gift Box Group
    const boxGroup = new THREE.Group();
    scene.add(boxGroup);
    boxGroupRef.current = boxGroup;

    // Materials
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8a5ba, // Soft blush pink
      roughness: 0.2,
      metalness: 0.1,
    });

    const innerBoxMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe6ec,
      roughness: 0.4,
    });

    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff, // Creamy White ribbon
      roughness: 0.1,
      metalness: 0.2,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Warm golden accent
      roughness: 0.2,
      metalness: 0.6,
    });

    // 1. Box Body (Hollow Container)
    const boxSize = 2.0;
    const wallThick = 0.1;
    const bodyGroup = new THREE.Group();

    // Outer Box Base
    const baseGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const baseMesh = new THREE.Mesh(baseGeo, boxMaterial);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    bodyGroup.add(baseMesh);

    // Vertical & Horizontal Ribbons on Box Body
    const ribbonVGeo = new THREE.BoxGeometry(boxSize + 0.02, boxSize + 0.02, 0.35);
    const ribbonVMesh = new THREE.Mesh(ribbonVGeo, ribbonMaterial);
    bodyGroup.add(ribbonVMesh);

    const ribbonHGeo = new THREE.BoxGeometry(0.35, boxSize + 0.02, boxSize + 0.02);
    const ribbonHMesh = new THREE.Mesh(ribbonHGeo, ribbonMaterial);
    bodyGroup.add(ribbonHMesh);

    boxGroup.add(bodyGroup);

    // 2. Box Lid Group
    const lidGroup = new THREE.Group();
    const lidHeight = 0.45;
    const lidSize = boxSize + 0.12;

    const lidGeo = new THREE.BoxGeometry(lidSize, lidHeight, lidSize);
    const lidMesh = new THREE.Mesh(lidGeo, boxMaterial);
    lidMesh.castShadow = true;
    lidMesh.position.y = lidHeight / 2;
    lidGroup.add(lidMesh);

    // Lid Ribbons
    const lidRibbonV = new THREE.Mesh(
      new THREE.BoxGeometry(lidSize + 0.02, lidHeight + 0.02, 0.36),
      ribbonMaterial
    );
    lidRibbonV.position.y = lidHeight / 2;
    lidGroup.add(lidRibbonV);

    const lidRibbonH = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, lidHeight + 0.02, lidSize + 0.02),
      ribbonMaterial
    );
    lidRibbonH.position.y = lidHeight / 2;
    lidGroup.add(lidRibbonH);

    // 3D Ribbon Bow on Top of Lid (Connected & Plush)
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, lidHeight / 2 + 0.08, 0);

    // Fully closed torus geometry (Math.PI * 2) - No open gaps!
    const loopGeo = new THREE.TorusGeometry(0.32, 0.08, 24, 48, Math.PI * 2);

    // Left Bow Loop
    const leftLoop = new THREE.Mesh(loopGeo, ribbonMaterial);
    leftLoop.scale.set(1.3, 0.7, 0.5);
    leftLoop.rotation.y = Math.PI / 2;
    leftLoop.rotation.z = 0.35;
    leftLoop.position.set(-0.28, 0.16, 0);
    leftLoop.castShadow = true;
    bowGroup.add(leftLoop);

    // Right Bow Loop
    const rightLoop = new THREE.Mesh(loopGeo, ribbonMaterial);
    rightLoop.scale.set(1.3, 0.7, 0.5);
    rightLoop.rotation.y = Math.PI / 2;
    rightLoop.rotation.z = -0.35;
    rightLoop.position.set(0.28, 0.16, 0);
    rightLoop.castShadow = true;
    bowGroup.add(rightLoop);

    // Front Bow Loop
    const frontLoop = new THREE.Mesh(loopGeo, ribbonMaterial);
    frontLoop.scale.set(1.3, 0.7, 0.5);
    frontLoop.rotation.z = -0.35;
    frontLoop.position.set(0, 0.16, 0.28);
    frontLoop.castShadow = true;
    bowGroup.add(frontLoop);

    // Back Bow Loop
    const backLoop = new THREE.Mesh(loopGeo, ribbonMaterial);
    backLoop.scale.set(1.3, 0.7, 0.5);
    backLoop.rotation.z = 0.35;
    backLoop.position.set(0, 0.16, -0.28);
    backLoop.castShadow = true;
    bowGroup.add(backLoop);

    // Ribbon Tails trailing over lid
    const tailGeo = new THREE.BoxGeometry(0.28, 0.03, 0.65);
    
    const tailLeft = new THREE.Mesh(tailGeo, ribbonMaterial);
    tailLeft.position.set(-0.25, 0.04, 0.25);
    tailLeft.rotation.y = Math.PI / 4;
    tailLeft.rotation.x = 0.12;
    tailLeft.castShadow = true;
    bowGroup.add(tailLeft);

    const tailRight = new THREE.Mesh(tailGeo, ribbonMaterial);
    tailRight.position.set(0.25, 0.04, 0.25);
    tailRight.rotation.y = -Math.PI / 4;
    tailRight.rotation.x = 0.12;
    tailRight.castShadow = true;
    bowGroup.add(tailRight);

    // Center Golden Knot Sphere
    const knotMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 24, 24),
      goldMaterial
    );
    knotMesh.position.set(0, 0.16, 0);
    knotMesh.castShadow = true;
    bowGroup.add(knotMesh);

    lidGroup.add(bowGroup);
    bowGroupRef.current = bowGroup;

    // Position lid above box
    lidGroup.position.y = boxSize / 2;
    boxGroup.add(lidGroup);
    lidRef.current = lidGroup;

    // 3. Sparkle / Light Particles Emitter inside Box
    const particleCount = 40;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 1.2;
      pPos[i * 3 + 1] = Math.random() * 2;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xffe600,
      size: 0.12,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeo, pMat);
    boxGroup.add(particles);
    particlesRef.current = particles;

    // Pointer Interaction (Tilt on mouse move)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e) => {
      if (!isInteractive) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      
      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animFrameId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (boxGroupRef.current) {
        // Floating motion when closed
        if (!isOpen) {
          boxGroupRef.current.position.y = Math.sin(elapsedTime * 2) * 0.08;
          
          if (isShaking) {
            boxGroupRef.current.rotation.z = Math.sin(elapsedTime * 40) * 0.08;
            boxGroupRef.current.rotation.x = Math.cos(elapsedTime * 30) * 0.06;
          } else {
            targetRotationY = mouseX * 0.4;
            targetRotationX = -mouseY * 0.3;
            boxGroupRef.current.rotation.y += (targetRotationY - boxGroupRef.current.rotation.y) * 0.05;
            boxGroupRef.current.rotation.x += (targetRotationX - boxGroupRef.current.rotation.x) * 0.05;
            boxGroupRef.current.rotation.z = 0;
          }
        } else {
          // Lid opening animation
          if (lidRef.current) {
            lidRef.current.position.y += (2.2 - lidRef.current.position.y) * 0.06;
            lidRef.current.position.z += (1.2 - lidRef.current.position.z) * 0.06;
            lidRef.current.rotation.x += (-1.2 - lidRef.current.rotation.x) * 0.06;
            lidRef.current.rotation.y += (0.4 - lidRef.current.rotation.y) * 0.06;
          }

          // Ramped up Inner Light
          if (innerLightRef.current) {
            innerLightRef.current.intensity = Math.min(innerLightRef.current.intensity + 0.4, 8);
          }

          // Particles lifting up
          if (particlesRef.current) {
            particlesRef.current.material.opacity = Math.min(particlesRef.current.material.opacity + 0.05, 0.9);
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
              positions[i * 3 + 1] += 0.03;
              if (positions[i * 3 + 1] > 3) {
                positions[i * 3 + 1] = 0.2;
              }
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
          }

          boxGroupRef.current.rotation.y += 0.008;
        }
      }

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isOpen, isShaking, isInteractive]);

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      className="w-full h-[320px] sm:h-[380px] md:h-[440px] cursor-pointer flex items-center justify-center relative touch-none select-none"
    />
  );
}
