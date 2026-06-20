/* topic-3d-functions.js — Three.js r128 window-attached 3D models */

function _setup3D(container, fov) {
  console.log('[3D DEBUG] _setup3D called. existing _3dRafId:', container._3dRafId, 'existing children:', container.children.length);
  // Cancel any previous animation loop on this container before removing its canvas
  if (container._3dRafId) {
    cancelAnimationFrame(container._3dRafId);
    container._3dRafId = null;
    console.log('[3D DEBUG] RAF cancelled on existing container');
  }
  container.innerHTML = '';
  console.log('[3D DEBUG] container cleared, children:', container.children.length);
  const w = container.clientWidth || 320;
  const h = container.clientHeight || 260;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);
  const camera = new THREE.PerspectiveCamera(fov || 60, w / h, 0.1, 1000);
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // ambient + directional light
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 5, 5);
  scene.add(dir);

  // drag rotate state
  let isDragging = false, prevX = 0, prevY = 0, lastPinchDist = 0;
  const pivot = new THREE.Group();
  scene.add(pivot);

  // Mouse drag
  renderer.domElement.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - prevX, dy = e.clientY - prevY;
    pivot.rotation.y += dx * 0.01;
    pivot.rotation.x += dy * 0.01;
    prevX = e.clientX; prevY = e.clientY;
  });
  renderer.domElement.addEventListener('wheel', e => {
    camera.position.z = Math.max(1, Math.min(20, camera.position.z + e.deltaY * 0.01));
  }, { passive: true });

  // Touch drag + pinch-to-zoom
  renderer.domElement.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      isDragging = false;
      lastPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: true });

  renderer.domElement.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      pivot.rotation.y += dx * 0.01;
      pivot.rotation.x += dy * 0.01;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      camera.position.z = Math.max(1, Math.min(20, camera.position.z - (dist - lastPinchDist) * 0.02));
      lastPinchDist = dist;
    }
  }, { passive: false });

  renderer.domElement.addEventListener('touchend', () => { isDragging = false; }, { passive: true });

  return { scene, camera, renderer, pivot };
}

// ── 1. Atom Model (Bohr) ────────────────────────────────────────────────────
window.createAtomModel = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 6;

  // nucleus
  const nucGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const nucMat = new THREE.MeshPhongMaterial({ color: 0xff6644, emissive: 0x441100 });
  pivot.add(new THREE.Mesh(nucGeo, nucMat));

  // orbits + electrons
  const orbits = [1.2, 1.9, 2.7];
  const eColors = [0x88ccff, 0xaaffaa, 0xffcc44];
  const electrons = [];

  orbits.forEach((r, i) => {
    const pts = [];
    for (let a = 0; a <= 64; a++) pts.push(new THREE.Vector3(Math.cos(a / 64 * Math.PI * 2) * r, Math.sin(a / 64 * Math.PI * 2) * r * 0.3, 0));
    const ring = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0x334455, transparent: true, opacity: 0.5 })
    );
    ring.rotation.x = (i * Math.PI) / 4;
    pivot.add(ring);

    const eGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const eMat = new THREE.MeshPhongMaterial({ color: eColors[i], emissive: eColors[i], emissiveIntensity: 0.4 });
    const emesh = new THREE.Mesh(eGeo, eMat);
    pivot.add(emesh);
    electrons.push({ mesh: emesh, r, tilt: ring.rotation.x, speed: 0.8 + i * 0.3, phase: (i * Math.PI * 2) / 3 });
  });

  let t = 0;
  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    t += 0.016;
    pivot.rotation.y += 0.003;
    electrons.forEach(e => {
      const a = t * e.speed + e.phase;
      e.mesh.position.x = Math.cos(a) * e.r;
      e.mesh.position.y = Math.sin(a) * e.r * Math.cos(e.tilt);
      e.mesh.position.z = Math.sin(a) * e.r * Math.sin(e.tilt);
    });
    renderer.render(scene, camera);
  }
  animate();
};

// ── 2. Molecule ──────────────────────────────────────────────────────────────
window.createMolecule = function(container, type) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 5;

  const COLOR = { H: 0xeeeeee, O: 0xee2222, C: 0x555555, N: 0x4444ee, Cl: 0x22cc44, Na: 0x9933cc, S: 0xddcc00 };
  const SIZE  = { H: 0.18, O: 0.28, C: 0.25, N: 0.26, Cl: 0.32, Na: 0.34, S: 0.28 };

  function atom(el, x, y, z) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(SIZE[el] || 0.22, 24, 24),
      new THREE.MeshPhongMaterial({ color: COLOR[el] || 0xaaaaaa, shininess: 80 })
    );
    m.position.set(x, y, z);
    pivot.add(m);
    return m;
  }

  function bond(a, b) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    const cyl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, len, 12),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    cyl.position.copy(mid);
    cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    pivot.add(cyl);
  }

  const t = type || 'water';
  const atoms = {};

  if (t === 'water') {
    atoms.O = atom('O', 0, 0, 0);
    atoms.H1 = atom('H', -0.8, -0.5, 0);
    atoms.H2 = atom('H',  0.8, -0.5, 0);
    bond(atoms.O.position, atoms.H1.position);
    bond(atoms.O.position, atoms.H2.position);
  } else if (t === 'co2') {
    atoms.O1 = atom('O', -1.4, 0, 0);
    atoms.C  = atom('C',  0,   0, 0);
    atoms.O2 = atom('O',  1.4, 0, 0);
    bond(atoms.O1.position, atoms.C.position);
    bond(atoms.C.position, atoms.O2.position);
  } else if (t === 'nacl') {
    atom('Na', -0.9, 0, 0);
    atom('Cl',  0.9, 0, 0);
  } else if (t === 'methane') {
    atoms.C  = atom('C', 0, 0, 0);
    const s = 0.9;
    [[-s,-s,-s],[ s, s,-s],[ s,-s, s],[-s, s, s]].forEach((p, i) => {
      atoms['H'+i] = atom('H', ...p);
      bond(atoms.C.position, atoms['H'+i].position);
    });
  } else if (t === 'benzene') {
    const cPos = [];
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI * 2) / 6;
      cPos.push([Math.cos(a) * 1.1, Math.sin(a) * 1.1, 0]);
    }
    const cAtoms = cPos.map(p => atom('C', ...p));
    cAtoms.forEach((ca, i) => {
      const nb = cAtoms[(i + 1) % 6];
      bond(ca.position, nb.position);
      const ha = (i * Math.PI * 2) / 6;
      const h = atom('H', Math.cos(ha) * 1.9, Math.sin(ha) * 1.9, 0);
      bond(ca.position, h.position);
    });
  }

  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    pivot.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animate();
};

// ── 3. 3D Wave ───────────────────────────────────────────────────────────────
window.createWave3D = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 60);
  camera.position.set(3, 3, 7);
  camera.lookAt(0, 0, 0);

  const W = 30, H = 30;
  const geo = new THREE.PlaneGeometry(6, 6, W - 1, H - 1);
  const mat = new THREE.MeshPhongMaterial({ color: 0x4499ff, wireframe: true, transparent: true, opacity: 0.7 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  pivot.add(mesh);

  let t = 0;
  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    t += 0.04;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 1.5 + t) * 0.4 + Math.cos(y * 1.5 + t * 0.8) * 0.3);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    pivot.rotation.y += 0.003;
    renderer.render(scene, camera);
  }
  animate();
};

// ── 4. Field Lines ───────────────────────────────────────────────────────────
window.createFieldLines = function(container, type) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 6;

  const t = type || 'electric';

  if (t === 'electric') {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 24, 24),
      new THREE.MeshPhongMaterial({ color: 0xffaa22, emissive: 0x441100 })
    );
    pivot.add(sphere);

    for (let i = 0; i < 16; i++) {
      const theta = Math.acos(1 - 2 * (i + 0.5) / 16);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      const dx = Math.sin(theta) * Math.cos(phi);
      const dy = Math.sin(theta) * Math.sin(phi);
      const dz = Math.cos(theta);
      const pts = [];
      for (let s = 0; s <= 20; s++) {
        const r = 0.42 + s * 0.15;
        pts.push(new THREE.Vector3(dx * r, dy * r, dz * r));
      }
      pivot.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xffdd88 })
      ));
    }
  } else {
    // magnetic — bar + curved lines around it
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 2, 0.3),
      new THREE.MeshPhongMaterial({ color: 0xcc3333 })
    );
    pivot.add(bar);

    for (let i = 0; i < 12; i++) {
      const phi = (i / 12) * Math.PI * 2;
      const pts = [];
      for (let s = 0; s <= 40; s++) {
        const a = (s / 40) * Math.PI * 2;
        const r = 0.6 + 0.8 * Math.sin(a * 0.5) * Math.sin(a * 0.5);
        pts.push(new THREE.Vector3(
          Math.cos(phi) * r,
          Math.cos(a) * 1.2,
          Math.sin(phi) * r
        ));
      }
      pivot.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0x44aaff })
      ));
    }
  }

  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    pivot.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animate();
};

// ── 5. Nucleus ───────────────────────────────────────────────────────────────
window.createNucleus = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 4;

  const protonMat  = new THREE.MeshPhongMaterial({ color: 0xff3333, shininess: 80 });
  const neutronMat = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 80 });

  for (let i = 0; i < 14; i++) {
    const isProton = i < 7;
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 20), isProton ? protonMat : neutronMat);
    // pack in rough sphere via Fibonacci
    const theta = Math.acos(1 - 2 * (i + 0.5) / 14);
    const phi = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 0.55;
    m.position.set(
      r * Math.sin(theta) * Math.cos(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(theta)
    );
    pivot.add(m);
  }

  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    pivot.rotation.y += 0.005;
    pivot.rotation.x += 0.002;
    renderer.render(scene, camera);
  }
  animate();
};

// ── 6. Orbital ───────────────────────────────────────────────────────────────
window.createOrbital = function(container, type) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 60);
  camera.position.z = 5;

  const t = type || 's';
  const COUNT = 1800;
  const positions = new Float32Array(COUNT * 3);
  const colors    = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    let x = 0, y = 0, z = 0;
    if (t === 's') {
      const r = Math.cbrt(Math.random()) * 1.5;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      x = r * Math.sin(theta) * Math.cos(phi);
      y = r * Math.sin(theta) * Math.sin(phi);
      z = r * Math.cos(theta);
    } else if (t === 'p') {
      const lobe = Math.random() < 0.5 ? 1 : -1;
      const r = Math.cbrt(Math.random()) * 1.5;
      const spread = Math.random() * 0.4;
      x = lobe * r;
      y = (Math.random() - 0.5) * spread;
      z = (Math.random() - 0.5) * spread;
    } else if (t === 'd') {
      const lobe = Math.floor(Math.random() * 4);
      const angles = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2];
      const a = angles[lobe];
      const r = Math.cbrt(Math.random()) * 1.5;
      const spread = Math.random() * 0.3;
      x = Math.cos(a) * r;
      y = (Math.random() - 0.5) * spread;
      z = Math.sin(a) * r;
    }
    positions[i * 3]     = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const intensity = 0.5 + Math.random() * 0.5;
    colors[i * 3]     = 0.3 * intensity;
    colors[i * 3 + 1] = 0.6 * intensity;
    colors[i * 3 + 2] = intensity;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.8 });
  pivot.add(new THREE.Points(geo, mat));

  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    pivot.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animate();
};

// ── 7. Pendulum ──────────────────────────────────────────────────────────────
window.createPendulum = function(container) {
  console.log('[3D DEBUG] createPendulum called, instance:', Math.random());
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 6;

  // pendulumGroup origin = pivot point (top); rotate the group for rigid-body swing
  const pendulumGroup = new THREE.Group();
  pendulumGroup.position.set(0, 1.5, 0);
  pivot.add(pendulumGroup);

  const pivotSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshPhongMaterial({ color: 0xaaaaaa })
  );
  pendulumGroup.add(pivotSphere);

  const ROD_LEN = 2.4;
  const rod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, ROD_LEN, 12),
    new THREE.MeshPhongMaterial({ color: 0x888888 })
  );
  rod.position.set(0, -ROD_LEN / 2, 0);
  pendulumGroup.add(rod);

  const bob = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 24, 24),
    new THREE.MeshPhongMaterial({ color: 0xffcc44, shininess: 120, emissive: 0x221100 })
  );
  bob.position.set(0, -ROD_LEN, 0);
  pendulumGroup.add(bob);

  const startTime = performance.now();

  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    const elapsed = (performance.now() - startTime) / 1000;
    pendulumGroup.rotation.z = 0.5 * Math.sin(elapsed * 1.5);
    pivot.rotation.y += 0.002;
    renderer.render(scene, camera);
  }
  animate();
};

// ── 8. Polymer Chain ─────────────────────────────────────────────────────────
window.createPolymerChain = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 8;

  const UNITS = 10;
  const monomerColors = [0xff6644, 0x44aaff, 0xffcc22, 0x44cc88];
  const positions = [];

  for (let i = 0; i < UNITS; i++) {
    const x = (i - UNITS / 2) * 0.9;
    const y = (i % 2 === 0 ? 0.35 : -0.35);
    positions.push(new THREE.Vector3(x, y, 0));
  }

  positions.forEach((pos, i) => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 20, 20),
      new THREE.MeshPhongMaterial({ color: monomerColors[i % monomerColors.length], shininess: 80 })
    );
    m.position.copy(pos);
    pivot.add(m);

    if (i > 0) {
      const prev = positions[i - 1];
      const dir = new THREE.Vector3().subVectors(pos, prev);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(prev, pos).multiplyScalar(0.5);
      const cyl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, len, 10),
        new THREE.MeshPhongMaterial({ color: 0x888888 })
      );
      cyl.position.copy(mid);
      cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      pivot.add(cyl);
    }
  });

  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    pivot.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animate();
};
