"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The "kernel": a faceted red core wrapped in a wireframe shell and two orbit rings
 * (the brochure's ellipses, in 3D). Reacts to pointer and scroll; pauses off-screen.
 */
export function KernelCore({ className }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // No WebGL: the surrounding layout still reads fine.
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 7.2);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const core = new THREE.Mesh(coreGeo, new THREE.MeshStandardMaterial({ color: 0xff2d2d, flatShading: true, roughness: 0.32, metalness: 0.25 }));
    group.add(core);

    const shellGeo = new THREE.IcosahedronGeometry(1.75, 2);
    const shell = new THREE.Mesh(shellGeo, new THREE.MeshBasicMaterial({ color: 0xe9dfc5, wireframe: true, transparent: true, opacity: 0.32 }));
    group.add(shell);

    const ringGeo = new THREE.TorusGeometry(2.55, 0.014, 8, 220);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xe9dfc5 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.set(1.15, 0.25, 0.2);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x9a4dff });
    const ring2 = new THREE.Mesh(ringGeo, ringMat2);
    ring2.scale.setScalar(0.82);
    ring2.rotation.set(0.35, 0.9, 1.1);
    group.add(ring1, ring2);

    // A scatter of bright points, like data in orbit.
    const n = 140;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.2 + Math.random() * 1.3;
      const a = Math.random() * Math.PI * 2;
      const b = Math.acos(2 * Math.random() - 1);
      pos.set([r * Math.sin(b) * Math.cos(a), r * Math.sin(b) * Math.sin(a), r * Math.cos(b)], i * 3);
    }
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const ptsMat = new THREE.PointsMaterial({ color: 0xe9dfc5, size: 0.035 });
    group.add(new THREE.Points(ptsGeo, ptsMat));

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    const rim = new THREE.PointLight(0x9a4dff, 60, 14);
    rim.position.set(-4, -1, 2);
    scene.add(key, rim);

    const resize = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (reduce) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientY - r.top) / r.height - 0.5) * 0.9;
      target.y = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
    };
    window.addEventListener("pointermove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(el);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const s = window.scrollY * 0.0016;
      group.rotation.y += (t * 0.18 + s + target.y - group.rotation.y) * 0.06;
      group.rotation.x += (target.x + Math.sin(t * 0.4) * 0.1 - group.rotation.x) * 0.06;
      core.rotation.y = -t * 0.4;
      shell.rotation.x = t * 0.1;
      ring1.rotation.z = 0.2 + t * 0.15;
      ring2.rotation.x = 0.35 - t * 0.12;
      renderer.render(scene, camera);
    };
    if (!reduce) loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      [coreGeo, shellGeo, ringGeo, ptsGeo].forEach((g) => g.dispose());
      [core.material, shell.material, ringMat, ringMat2, ptsMat].forEach((m) => (m as THREE.Material).dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className={className} />;
}
