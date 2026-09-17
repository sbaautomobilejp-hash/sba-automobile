'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Sparkles, Lightbulb, RotateCw, ShieldCheck, CheckCircle2 } from 'lucide-react';

const COLOR_OPTIONS = [
  { name: 'Tokyo Midnight', color: 0x0c0e12, hex: '#0c0e12' },
  { name: 'Suzuka Crimson', color: 0xdc2626, hex: '#dc2626' },
  { name: 'Hakosuka Silver', color: 0xc0c6cf, hex: '#c0c6cf' },
  { name: 'Fuji Pearl White', color: 0xf3f4f6, hex: '#f3f4f6' },
  { name: 'Ibaraki Racing Gold', color: 0xd97706, hex: '#d97706' },
];

export default function Showroom3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState(COLOR_OPTIONS[1]); // Default Suzuka Crimson
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [underglowOn, setUnderglowOn] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string | null>('engine');

  const carMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const headlightLightsRef = useRef<THREE.SpotLight[]>([]);
  const underglowLightRef = useRef<THREE.PointLight | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.04);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const isMobile = width < 640;
    camera.position.set(isMobile ? 6.8 : 5.8, isMobile ? 2.35 : 2.45, isMobile ? 7.6 : 6.9);
    camera.lookAt(0, 0.65, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Stage / Turntable Floor
    const floorGeo = new THREE.CylinderGeometry(4.8, 5, 0.25, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f1217,
      roughness: 0.2,
      metalness: 0.85,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.125;
    floor.receiveShadow = true;
    scene.add(floor);

    // Glowing Red Ring on Turntable Edge
    const ringGeo = new THREE.TorusGeometry(4.85, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    // Studio Ambient & Spot Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key Light
    const mainSpot = new THREE.SpotLight(0xffffff, 3.5, 25, Math.PI / 5, 0.4, 1);
    mainSpot.position.set(5, 7, 5);
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    // Rim/Back Light for metallic silhouette
    const rimLight = new THREE.DirectionalLight(0xdc2626, 1.8);
    rimLight.position.set(-5, 4, -5);
    scene.add(rimLight);

    // Red Underglow
    const underglow = new THREE.PointLight(0xdc2626, 4, 3.5);
    underglow.position.set(0, 0.2, 0);
    scene.add(underglow);
    underglowLightRef.current = underglow;

    // Headlight Spotlights
    const hlLeft = new THREE.SpotLight(0xffffff, 6, 10, Math.PI / 8, 0.3);
    hlLeft.position.set(1.9, 0.65, 0.75);
    hlLeft.target.position.set(5, 0.3, 0.75);
    scene.add(hlLeft);
    scene.add(hlLeft.target);

    const hlRight = new THREE.SpotLight(0xffffff, 6, 10, Math.PI / 8, 0.3);
    hlRight.position.set(1.9, 0.65, -0.75);
    hlRight.target.position.set(5, 0.3, -0.75);
    scene.add(hlRight);
    scene.add(hlRight.target);

    headlightLightsRef.current = [hlLeft, hlRight];

    // Car Body Model Group
    const carGroup = new THREE.Group();
    carMaterialsRef.current = [];

    // Car Paint Material
    const bodyMat = new THREE.MeshStandardMaterial({
      color: activeColor.color,
      roughness: 0.15,
      metalness: 0.9,
    });
    carMaterialsRef.current.push(bodyMat);

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x050608,
      roughness: 0.05,
      metalness: 0.95,
      transparent: true,
      opacity: 0.85,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: 0.4,
      metalness: 0.6,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.95,
    });

    // Lower Chassis
    const chassisGeo = new THREE.BoxGeometry(3.6, 0.5, 1.8);
    const chassis = new THREE.Mesh(chassisGeo, bodyMat);
    chassis.position.y = 0.5;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    carGroup.add(chassis);

    // Cabin / Roof
    const cabinGeo = new THREE.BoxGeometry(1.8, 0.48, 1.45);
    const cabin = new THREE.Mesh(cabinGeo, glassMat);
    cabin.position.set(-0.2, 0.95, 0);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Roof Top Shell
    const roofGeo = new THREE.BoxGeometry(1.6, 0.08, 1.4);
    const roof = new THREE.Mesh(roofGeo, bodyMat);
    roof.position.set(-0.2, 1.2, 0);
    carGroup.add(roof);

    // Front Hood Slope
    const hoodGeo = new THREE.BoxGeometry(1.0, 0.3, 1.7);
    const hood = new THREE.Mesh(hoodGeo, bodyMat);
    hood.position.set(1.4, 0.55, 0);
    hood.rotation.z = -0.15;
    carGroup.add(hood);

    // Front Carbon Splitter
    const splitterGeo = new THREE.BoxGeometry(0.5, 0.06, 1.9);
    const splitter = new THREE.Mesh(splitterGeo, carbonMat);
    splitter.position.set(1.75, 0.25, 0);
    carGroup.add(splitter);

    // Rear GT Wing (Japanese Sports Spec)
    const wingStands = new THREE.BoxGeometry(0.08, 0.4, 0.08);
    const stand1 = new THREE.Mesh(wingStands, carbonMat);
    stand1.position.set(-1.6, 0.9, 0.5);
    const stand2 = new THREE.Mesh(wingStands, carbonMat);
    stand2.position.set(-1.6, 0.9, -0.5);
    carGroup.add(stand1);
    carGroup.add(stand2);

    const wingBladeGeo = new THREE.BoxGeometry(0.35, 0.05, 1.75);
    const wingBlade = new THREE.Mesh(wingBladeGeo, carbonMat);
    wingBlade.position.set(-1.6, 1.1, 0);
    carGroup.add(wingBlade);

    // Headlight Meshes (LED strip)
    const hlMeshGeo = new THREE.BoxGeometry(0.08, 0.12, 0.4);
    const hlMeshMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const hlMeshL = new THREE.Mesh(hlMeshGeo, hlMeshMat);
    hlMeshL.position.set(1.82, 0.58, 0.65);
    const hlMeshR = new THREE.Mesh(hlMeshGeo, hlMeshMat);
    hlMeshR.position.set(1.82, 0.58, -0.65);
    carGroup.add(hlMeshL);
    carGroup.add(hlMeshR);

    // Wheels (4 units)
    const wheelPositions = [
      [1.1, 0.38, 0.95],
      [1.1, 0.38, -0.95],
      [-1.1, 0.38, 0.95],
      [-1.1, 0.38, -0.95],
    ];

    const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 24);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });

    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Group();
      wheel.position.set(x, y, z);

      const tire = new THREE.Mesh(wheelGeo, tireMat);
      tire.rotation.x = Math.PI / 2;
      tire.castShadow = true;
      wheel.add(tire);

      // Rim
      const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.29, 16);
      const rim = new THREE.Mesh(rimGeo, chromeMat);
      rim.rotation.x = Math.PI / 2;
      wheel.add(rim);

      // Red Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.12, 0.18, 0.1);
      const caliperMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(0.1, 0.12, 0);
      wheel.add(caliper);

      carGroup.add(wheel);
    });

    // Keep the virtual vehicle centered on the turntable.
    carGroup.position.set(0, 0.05, 0);
    carGroup.scale.setScalar(1.05);
    scene.add(carGroup);
    carGroupRef.current = carGroup;

    // Interactive Drag Controls (Mouse / Touch)
    let isDragging = false;
    let prevMouseX = 0;
    let rotationVelocity = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !carGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      carGroupRef.current.rotation.y += deltaX * 0.009;
      rotationVelocity = deltaX * 0.0025;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !carGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      prevMouseX = e.touches[0].clientX;
      carGroupRef.current.rotation.y += deltaX * 0.012;
      rotationVelocity = deltaX * 0.0025;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 520;
      const mobile = newWidth < 640;
      camera.aspect = newWidth / newHeight;
      camera.position.set(mobile ? 6.8 : 5.8, mobile ? 2.35 : 2.45, mobile ? 7.6 : 6.9);
      camera.lookAt(0, 0.65, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (carGroupRef.current) {
        if (!isDragging) {
          if (isRotating) {
            carGroupRef.current.rotation.y += 0.004;
          } else {
            // Apply gentle inertia
            carGroupRef.current.rotation.y += rotationVelocity;
            rotationVelocity *= 0.95;
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  // Update paint color dynamically
  useEffect(() => {
    carMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(activeColor.color);
    });
  }, [activeColor]);

  // Toggle headlights
  useEffect(() => {
    headlightLightsRef.current.forEach((light) => {
      light.intensity = headlightsOn ? 6 : 0;
    });
  }, [headlightsOn]);

  // Toggle underglow
  useEffect(() => {
    if (underglowLightRef.current) {
      underglowLightRef.current.intensity = underglowOn ? 4 : 0;
    }
  }, [underglowOn]);

  return (
    <section className="relative py-12 bg-obsidian-950 overflow-hidden border-b border-white/10">
      {/* Background Japanese Watermark & Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none bg-japan-grid opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-japan-red/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-japan-red"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
                Virtual Inspection Studio
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive 360° Japanese Vehicle Showroom
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Rotate, inspect chassis styling, test exterior lacquer finishes, and explore Japanese export standards before shipment.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs text-slate-400 bg-obsidian-900/80 px-3 py-1.5 rounded-full border border-white/10">
            <RotateCw className="w-3.5 h-3.5 text-japan-red animate-spin-slow" />
            <span>Click & drag to spin 360°</span>
          </div>
        </div>

        {/* 3D Canvas Container & UI Overlay */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-obsidian-900 to-obsidian-950 shadow-2xl">
          {/* Three.js Canvas Element */}
          <div ref={mountRef} className="w-full h-[430px] sm:h-[520px] cursor-grab active:cursor-grabbing touch-pan-y" />

          {/* Top Left: Specification Hotspots */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <button
              onClick={() => setActiveFeature('engine')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md flex items-center gap-2 transition-all ${
                activeFeature === 'engine'
                  ? 'bg-japan-red text-white shadow-lg shadow-japan-red/30 border border-japan-red'
                  : 'bg-obsidian-900/80 text-slate-300 border border-white/10 hover:border-white/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auction Grade 5/A Spec</span>
            </button>

            <button
              onClick={() => setActiveFeature('shipping')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md flex items-center gap-2 transition-all ${
                activeFeature === 'shipping'
                  ? 'bg-japan-red text-white shadow-lg shadow-japan-red/30 border border-japan-red'
                  : 'bg-obsidian-900/80 text-slate-300 border border-white/10 hover:border-white/20'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Inspection & Ro-Ro Export Support</span>
            </button>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-obsidian-900/90 backdrop-blur-md border border-white/15 p-3 rounded-xl">
            {/* Color Swatches */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline mr-1">
                Finish:
              </span>
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setActiveColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform border-2 relative flex items-center justify-center ${
                    activeColor.name === c.name
                      ? 'scale-110 border-white shadow-lg'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {activeColor.name === c.name && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow"></span>
                  )}
                </button>
              ))}
              <span className="text-xs font-semibold text-slate-200 ml-2">
                {activeColor.name}
              </span>
            </div>

            {/* Studio Lighting & Orbit Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHeadlightsOn(!headlightsOn)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                  headlightsOn
                    ? 'bg-white/15 text-white border-white/30'
                    : 'bg-obsidian-850 text-slate-400 border-white/10'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                <span>LED Lights</span>
              </button>

              <button
                onClick={() => setUnderglowOn(!underglowOn)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                  underglowOn
                    ? 'bg-japan-red/20 text-japan-red border-japan-red/40'
                    : 'bg-obsidian-850 text-slate-400 border-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-japan-red"></span>
                <span>Underglow</span>
              </button>

              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                  isRotating
                    ? 'bg-white/15 text-white border-white/30'
                    : 'bg-obsidian-850 text-slate-400 border-white/10'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
                <span>{isRotating ? 'Auto-Spin ON' : 'Paused'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Detail Callout Below Showroom */}
        {activeFeature && (
          <div className="mt-4 p-4 rounded-xl bg-obsidian-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-japan-red shrink-0" />
              <div>
                <strong className="text-white">
                  {activeFeature === 'engine'
                    ? 'Authentic Japanese Auction Inspection Reports'
                    : 'Worldwide Container & Roll-on/Roll-off Shipping Standards'}
                </strong>
                <p className="text-slate-400 mt-0.5">
                  {activeFeature === 'engine'
                    ? 'Every vehicle procured by SBA合同会社 undergoes rigorous physical checks in Tokyo and Yokohama before auction bidding.'
                    : 'SBA Transport Service transports your car safely from auction yards to port staging areas, completing export deregistration and JEVIC certificates.'}
                </p>
              </div>
            </div>
            <a
              href="#inventory"
              className="shrink-0 px-4 py-2 bg-obsidian-800 hover:bg-obsidian-750 text-white font-semibold rounded-lg border border-white/10 transition-colors"
            >
              View In-Stock Vehicles
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
