import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    // Add fog for depth perception
    scene.fog = new THREE.FogExp2(0x000215, 0.08);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- OBJECTS (NODES & EDGES) ---
    const nodeCount = 200;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodesGroup = new THREE.Group();
    const nodeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00aaff,
      emissive: 0x00aaff, // Make the nodes glow
      emissiveIntensity: 1,
      metalness: 0.8,
      roughness: 0.4,
    });

    for (let i = 0; i < nodeCount; i++) {
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(15));
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      nodesGroup.add(node);
    }
    scene.add(nodesGroup);

    // Create edges (lines connecting nodes)
    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
    });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    scene.add(edges);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x4040ff, 1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00ffff, 3, 20);
    pointLight.position.set(2, 3, 5);
    scene.add(pointLight);

    // --- MOUSE INTERACTION ---
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animationId;
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate the entire group for a slow, drifting effect
      nodesGroup.rotation.y = elapsedTime * 0.05;
      nodesGroup.rotation.x = elapsedTime * 0.03;
      edges.rotation.copy(nodesGroup.rotation);

      // Make the camera subtly look around based on mouse position
      const targetX = mouse.x * 0.2;
      const targetY = mouse.y * 0.2;
      camera.position.x += 0.05 * (targetX - camera.position.x);
      camera.position.y += 0.05 * (targetY - camera.position.y);
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      // You can add more cleanup here (dispose geometries, materials, etc.)
    };
  }, []);

  return <canvas ref={canvasRef} style={{
    position: 'fixed',
    top: 0,
    left: 0,
    outline: 'none',
    zIndex: -1,
  }} />;
};

export default ThreeBackground;