/* topic-3d-functions.js — Three.js r128 window-attached 3D models */

function _makeLabel(text, color = '#ffffff') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, 256, 64);
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 32);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.2, 0.3, 1);
  return sprite;
}

function _setup3D(container, fov) {
  // Cancel any previous animation loop on this container before removing its canvas
  if (container._3dRafId) {
    cancelAnimationFrame(container._3dRafId);
    container._3dRafId = null;
  }
  container.innerHTML = '';
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
  camera.position.set(0, 0, 8);
  camera.lookAt(0, 0, 0);

  // Nucleus: cluster of 6 red protons + 6 grey neutrons (carbon-like)
  for (let i = 0; i < 6; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xff5555, emissive: 0x441111 })
    );
    p.position.set((Math.random()-0.5)*0.55, (Math.random()-0.5)*0.55, (Math.random()-0.5)*0.55);
    pivot.add(p);
  }
  for (let i = 0; i < 6; i++) {
    const n = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xaaaaaa, emissive: 0x333333 })
    );
    n.position.set((Math.random()-0.5)*0.55, (Math.random()-0.5)*0.55, (Math.random()-0.5)*0.55);
    pivot.add(n);
  }

  // Two electron shells: K-shell (2e, inner) and L-shell (4e, outer)
  const shellConfigs = [
    { radius: 1.5, count: 2, color: 0x55aaff, tilt: 0 },
    { radius: 2.5, count: 4, color: 0x55ddaa, tilt: Math.PI / 5 }
  ];
  const electrons = [];

  shellConfigs.forEach(shell => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(shell.radius - 0.02, shell.radius + 0.02, 64),
      new THREE.MeshBasicMaterial({ color: shell.color, side: THREE.DoubleSide, transparent: true, opacity: 0.25 })
    );
    ring.rotation.x = shell.tilt;
    pivot.add(ring);

    for (let i = 0; i < shell.count; i++) {
      const e = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshPhongMaterial({ color: shell.color, emissive: shell.color, emissiveIntensity: 0.4 })
      );
      pivot.add(e);
      electrons.push({ mesh: e, radius: shell.radius, tilt: shell.tilt, speed: 0.6 + Math.random()*0.3, angle: (i / shell.count) * Math.PI * 2 });
    }
  });

  const nucleusLbl = _makeLabel('Nucleus', '#ffddaa');
  nucleusLbl.position.set(0, 0.7, 0);
  scene.add(nucleusLbl);
  const kShellLbl = _makeLabel('K Shell', '#55aaff');
  kShellLbl.position.set(0, 1.8, 0);
  scene.add(kShellLbl);
  const lShellLbl = _makeLabel('L Shell', '#55ddaa');
  lShellLbl.position.set(0, 2.8, 0);
  scene.add(lShellLbl);

  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    pivot.rotation.y += 0.003;
    electrons.forEach(e => {
      e.angle += 0.01 * e.speed;
      e.mesh.position.x = Math.cos(e.angle) * e.radius;
      e.mesh.position.y = Math.sin(e.angle) * e.radius * Math.cos(e.tilt);
      e.mesh.position.z = Math.sin(e.angle) * e.radius * Math.sin(e.tilt);
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
  const LABEL_CLR = { H: '#dddddd', O: '#ff6666', C: '#aaaaaa', N: '#8888ff', Cl: '#44ee88', Na: '#cc66ff', S: '#ffee44' };

  function atom(el, x, y, z) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(SIZE[el] || 0.22, 24, 24),
      new THREE.MeshPhongMaterial({ color: COLOR[el] || 0xaaaaaa, shininess: 80 })
    );
    m.position.set(x, y, z);
    pivot.add(m);
    const lbl = _makeLabel(el, LABEL_CLR[el] || '#ffffff');
    lbl.position.set(x, y + (SIZE[el] || 0.22) + 0.22, z);
    pivot.add(lbl);
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
  } else if (t === 'dna') {
    // Double helix: 14 base pairs, 2 full turns
    const PAIRS = 14, H = 4.5;
    let pv1 = null, pv2 = null;
    for (let i = 0; i < PAIRS; i++) {
      const a = (i / PAIRS) * Math.PI * 4;
      const y = (i / PAIRS) * H - H / 2;
      const v1 = new THREE.Vector3(Math.cos(a) * 1.0, y, Math.sin(a) * 1.0);
      const v2 = new THREE.Vector3(Math.cos(a + Math.PI) * 1.0, y, Math.sin(a + Math.PI) * 1.0);
      atom('N', v1.x, v1.y, v1.z);
      atom('O', v2.x, v2.y, v2.z);
      bond(v1, v2);
      if (pv1) { bond(pv1, v1); bond(pv2, v2); }
      pv1 = v1; pv2 = v2;
    }
  } else if (t === 'glucose') {
    // Pyranose ring: 5C + 1O with hydroxyl groups
    const R = 1.1;
    const ringEls = ['C', 'C', 'C', 'C', 'C', 'O'];
    const ringV = ringEls.map((el, i) => {
      const a = (i / 6) * Math.PI * 2;
      return { el, v: new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R) };
    });
    ringV.forEach(({ el, v }) => atom(el, v.x, v.y, v.z));
    for (let i = 0; i < 6; i++) {
      const curr = ringV[i], next = ringV[(i + 1) % 6];
      bond(curr.v, next.v);
      if (curr.el === 'C') {
        const oh = new THREE.Vector3(curr.v.x * 1.55, 0.7, curr.v.z * 1.55);
        atom('O', oh.x, oh.y, oh.z);
        bond(curr.v, oh);
      }
    }
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

  const waveLbl = _makeLabel('Wave Propagation', '#88ddff');
  waveLbl.position.set(0, 2.0, 0);
  scene.add(waveLbl);

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
    const electricLbl = _makeLabel('Electric Field', '#ffdd88');
    electricLbl.position.set(0, 2.8, 0);
    scene.add(electricLbl);
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
    const magneticLbl = _makeLabel('Magnetic Field', '#88ccff');
    magneticLbl.position.set(0, 2.8, 0);
    scene.add(magneticLbl);
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

  const nucleusLabel = _makeLabel('7P : 7N', '#ffddaa');
  nucleusLabel.position.set(0, 1.3, 0);
  nucleusLabel.scale.set(1.6, 0.4, 1);
  scene.add(nucleusLabel);

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

  const orbLbl = _makeLabel(t + ' orbital', '#88bbff');
  orbLbl.position.set(0, -2.2, 0);
  scene.add(orbLbl);

  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    pivot.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animate();
};

// ── 7. Pendulum ──────────────────────────────────────────────────────────────
window.createPendulum = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.set(0, 0, 6);
  camera.lookAt(0, 0, 0);

  const ROD_LEN = 2.2;
  const rodGeo = new THREE.CylinderGeometry(0.04, 0.04, ROD_LEN, 12);
  rodGeo.translate(0, -ROD_LEN / 2, 0);
  const rod = new THREE.Mesh(rodGeo, new THREE.MeshPhongMaterial({ color: 0x888888 }));

  const bob = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 24, 24),
    new THREE.MeshPhongMaterial({ color: 0xffcc44, shininess: 120, emissive: 0x221100 })
  );
  bob.position.set(0, -ROD_LEN, 0);
  rod.add(bob);

  const anchor = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 16, 16),
    new THREE.MeshPhongMaterial({ color: 0xaaaaaa })
  );
  rod.add(anchor);

  const swingGroup = new THREE.Group();
  swingGroup.add(rod);
  swingGroup.position.set(0, 1.1, 0);
  pivot.add(swingGroup);

  const pivotLbl = _makeLabel('Pivot', '#aaaaaa');
  pivotLbl.position.set(0, 1.4, 0);
  scene.add(pivotLbl);
  const bobLbl = _makeLabel('Bob', '#ffcc44');
  scene.add(bobLbl);

  const startTime = performance.now();
  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    const elapsed = (performance.now() - startTime) / 1000;
    swingGroup.rotation.z = 0.5 * Math.sin(elapsed * 1.5);
    const angle = swingGroup.rotation.z;
    bobLbl.position.set(Math.sin(angle) * ROD_LEN, 1.1 - Math.cos(angle) * ROD_LEN - 0.5, 0);
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

  const monoLbl = _makeLabel('Monomer', '#ff8866');
  monoLbl.position.set(positions[0].x, positions[0].y + 0.55, 0);
  pivot.add(monoLbl);
  const chainLbl = _makeLabel('Polymer Chain', '#ffffff');
  chainLbl.position.set(0, 1.4, 0);
  scene.add(chainLbl);

  function animate() {
    container._3dRafId = requestAnimationFrame(animate);
    pivot.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animate();
};

// ── 9. Diffusion / Membrane Transport ────────────────────────────────────────
window.createDiffusionAnimation = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  for (let y = -2.2; y <= 2.2; y += 0.5) {
    if (Math.abs(y) > 0.32) {
      const bar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8),
        new THREE.MeshPhongMaterial({ color: 0xdddddd })
      );
      bar.position.set(0, y, 0);
      pivot.add(bar);
    }
  }

  const particles = [];
  for (let i = 0; i < 24; i++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0xff6633 })
    );
    const onLeft = i < 20;
    m.position.set(
      onLeft ? -(Math.random() * 2.0 + 0.3) : (Math.random() * 2.0 + 0.3),
      (Math.random() - 0.5) * 3.6,
      (Math.random() - 0.5) * 1.2
    );
    const a = Math.random() * Math.PI * 2;
    const spd = 0.016 + Math.random() * 0.014;
    pivot.add(m);
    particles.push({ mesh: m, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, vz: (Math.random() - 0.5) * 0.008 });
  }

  const highLbl = _makeLabel('High Concentration', '#ff9966');
  highLbl.position.set(-1.5, 1.8, 0);
  highLbl.scale.set(2.2, 0.55, 1);
  scene.add(highLbl);
  const lowLbl = _makeLabel('Low Concentration', '#aaddff');
  lowLbl.position.set(1.5, 1.8, 0);
  lowLbl.scale.set(2.2, 0.55, 1);
  scene.add(lowLbl);

  function animateDiff() {
    container._3dRafId = requestAnimationFrame(animateDiff);
    for (const p of particles) {
      const m = p.mesh;
      const px = m.position.x;
      m.position.x += p.vx;
      m.position.y += p.vy;
      m.position.z += p.vz;
      if (Math.abs(m.position.x) > 2.5) { p.vx *= -1; m.position.x = px; }
      if (Math.abs(m.position.y) > 2.0) p.vy *= -1;
      if (Math.abs(m.position.z) > 1.0) p.vz *= -1;
      if (px * m.position.x < 0 && Math.abs(m.position.y) > 0.32) { p.vx *= -1; m.position.x = px; }
    }
    renderer.render(scene, camera);
  }
  animateDiff();
};

// ── 10. Photosynthesis ───────────────────────────────────────────────────────
window.createPhotosynthesisAnimation = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 6;

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 24, 24),
    new THREE.MeshPhongMaterial({ color: 0x228833, emissive: 0x0a2210 })
  );
  pivot.add(core);

  function mp(col, sz) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(sz, 12, 12), new THREE.MeshPhongMaterial({ color: col }));
    pivot.add(m); return m;
  }

  const co2a = mp(0x999999, 0.12), co2b = mp(0x999999, 0.12);
  const h2oa = mp(0x3399ff, 0.11), h2ob = mp(0x3399ff, 0.11);
  const lght = mp(0xffee00, 0.14);
  const o2a  = mp(0xff4444, 0.12), o2b  = mp(0xff4444, 0.12);
  const gluc = mp(0xffaa22, 0.18);

  const chloroLbl = _makeLabel('Chloroplast', '#44cc66');
  chloroLbl.position.set(0, -1.1, 0);
  scene.add(chloroLbl);
  const co2Lbl = _makeLabel('CO₂ (in)', '#aaaaaa');
  co2Lbl.position.set(2.2, 0.5, 0);
  co2Lbl.scale.set(1.6, 0.4, 1);
  scene.add(co2Lbl);
  const o2Lbl = _makeLabel('O₂ (out)', '#ff8888');
  o2Lbl.position.set(-2.2, 1.5, 0);
  o2Lbl.scale.set(1.6, 0.4, 1);
  scene.add(o2Lbl);
  const sunLbl2 = _makeLabel('Sunlight', '#ffee66');
  sunLbl2.position.set(0.8, 2.4, 0);
  scene.add(sunLbl2);

  let t = 0;
  function animatePhoto() {
    container._3dRafId = requestAnimationFrame(animatePhoto);
    t += 0.022;
    function pr(ph) { return (Math.sin(ph) + 1) * 0.5; }
    co2a.position.set(2.5 - 2.5 * pr(t), 0.3, 0);
    co2b.position.set(2.5 - 2.5 * pr(t + 1.3), -0.3, 0.2);
    h2oa.position.set(-2.0 + 2.0 * pr(t + 0.8), -1.5 + 1.5 * pr(t + 0.8), 0);
    h2ob.position.set(-2.0 + 2.0 * pr(t + 2.1), -1.5 + 1.5 * pr(t + 2.1), 0.2);
    lght.position.set(0, 2.5 - 2.5 * pr(t + 1.6), 0);
    o2a.position.set(-2.0 * pr(t + Math.PI * 0.5), 1.5 * pr(t + Math.PI * 0.5), 0);
    o2b.position.set(-2.0 * pr(t + Math.PI * 0.5 + 1.5), 1.5 * pr(t + Math.PI * 0.5 + 1.5), 0.2);
    gluc.position.set(2.2 * pr(t + Math.PI * 0.6), -1.2 * pr(t + Math.PI * 0.6), 0);
    const sc = 1 + 0.04 * Math.sin(t * 2.5);
    core.scale.set(sc, sc * 0.95, sc);
    renderer.render(scene, camera);
  }
  animatePhoto();
};

// ── 11. Transpiration ────────────────────────────────────────────────────────
window.createTranspirationAnimation = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
    const bar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 6, 6),
      new THREE.MeshPhongMaterial({ color: 0xcc9944 })
    );
    bar.position.set(Math.cos(a) * 0.38, 0, Math.sin(a) * 0.38);
    pivot.add(bar);
  }

  for (let i = -1; i <= 1; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 8), new THREE.MeshPhongMaterial({ color: 0x33aa44 }));
    leaf.scale.set(1.4, 0.45, 0.7);
    leaf.position.set(i * 0.5, 3.1, 0);
    pivot.add(leaf);
  }

  for (let i = -2; i <= 2; i++) {
    const r = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.01, 0.45, 6),
      new THREE.MeshPhongMaterial({ color: 0x886633 })
    );
    r.position.set(i * 0.18, -3.1, 0);
    r.rotation.z = i * 0.25;
    pivot.add(r);
  }

  const drops = [];
  for (let i = 0; i < 10; i++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0x44aaff, emissive: 0x001133 })
    );
    const ang = Math.random() * Math.PI * 2;
    const rr = Math.random() * 0.22;
    m.position.set(Math.cos(ang) * rr, -2.8 + i * 0.56, Math.sin(ang) * rr);
    pivot.add(m);
    drops.push({ mesh: m, speed: 0.014 + Math.random() * 0.01 });
  }

  const evaps = [];
  for (let i = 0; i < 5; i++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      new THREE.MeshPhongMaterial({ color: 0x88ccff, transparent: true, opacity: 0.8 })
    );
    m.userData = { ox: (i - 2) * 0.25, phase: (i / 5) * Math.PI * 2 };
    pivot.add(m);
    evaps.push(m);
  }

  const uptakeLbl = _makeLabel('Water Uptake', '#44aaff');
  uptakeLbl.position.set(1.2, -3.1, 0);
  uptakeLbl.scale.set(1.8, 0.45, 1);
  scene.add(uptakeLbl);
  const xylemLbl = _makeLabel('Xylem', '#cc9944');
  xylemLbl.position.set(0.9, 0, 0);
  scene.add(xylemLbl);
  const transLbl = _makeLabel('Transpiration', '#88ccff');
  transLbl.position.set(1.2, 3.3, 0);
  transLbl.scale.set(1.8, 0.45, 1);
  scene.add(transLbl);

  let tT = 0;
  function animateTransp() {
    container._3dRafId = requestAnimationFrame(animateTransp);
    tT += 0.016;
    for (const d of drops) {
      d.mesh.position.y += d.speed;
      if (d.mesh.position.y > 2.9) d.mesh.position.y = -2.9;
    }
    evaps.forEach(m => {
      const ph = (tT * 0.5 + m.userData.phase) % (Math.PI * 2);
      const prog = ph / (Math.PI * 2);
      m.position.set(m.userData.ox + Math.sin(ph * 2) * 0.15, 2.9 + prog * 1.2, 0);
      m.material.opacity = Math.max(0, 0.9 - prog * 1.2);
    });
    renderer.render(scene, camera);
  }
  animateTransp();
};

// ── 12. Respiration ──────────────────────────────────────────────────────────
window.createRespirationAnimation = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 6;

  const mito = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 24, 16),
    new THREE.MeshPhongMaterial({ color: 0xcc5522, emissive: 0x220a00, transparent: true, opacity: 0.8 })
  );
  mito.scale.set(1.5, 0.68, 0.9);
  pivot.add(mito);

  function mk(col, sz) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(sz, 10, 10), new THREE.MeshPhongMaterial({ color: col }));
    pivot.add(m); return m;
  }

  const gluc = [mk(0xffaa22, 0.17), mk(0xffaa22, 0.15)];
  const o2in = [mk(0xff4444, 0.12), mk(0xff4444, 0.12)];
  const atp  = [mk(0xaaff22, 0.13), mk(0xaaff22, 0.13), mk(0xaaff22, 0.13)];
  const co2  = [mk(0x888888, 0.11), mk(0x888888, 0.11)];
  const h2o  = mk(0x3399ff, 0.11);

  const mitoLbl = _makeLabel('Mitochondrion', '#ee7755');
  mitoLbl.position.set(0, -1.3, 0);
  mitoLbl.scale.set(2.0, 0.5, 1);
  scene.add(mitoLbl);
  const glucLbl = _makeLabel('Glucose', '#ffaa22');
  glucLbl.position.set(-2.4, 0.8, 0);
  scene.add(glucLbl);
  const o2inLbl = _makeLabel('O₂', '#ff6666');
  o2inLbl.position.set(2.2, -0.1, 0);
  scene.add(o2inLbl);
  const atpLbl = _makeLabel('ATP', '#aaff44');
  atpLbl.position.set(0.5, 2.1, 0);
  scene.add(atpLbl);

  let tR = 0;
  function animateResp() {
    container._3dRafId = requestAnimationFrame(animateResp);
    tR += 0.022;
    function pr(ph) { return (Math.sin(ph) + 1) * 0.5; }
    gluc.forEach((m, i) => m.position.set(-2.5 + 2.5 * pr(tR + i * 1.4), i * 0.4 - 0.2, 0));
    o2in.forEach((m, i) => m.position.set(2.2 - 2.2 * pr(tR + i * 1.2 + 0.7), -0.3 + i * 0.3, 0.2));
    atp.forEach((m, i)  => m.position.set((i - 1) * 0.6, 1.8 * pr(tR + i * 1.0 + Math.PI * 0.5), 0));
    co2.forEach((m, i)  => m.position.set(-2.0 * pr(tR + i * 1.5 + Math.PI * 0.4), 0.5 - i * 0.3, 0.2));
    h2o.position.set(0, -1.8 * pr(tR + Math.PI * 0.3), 0);
    mito.material.emissiveIntensity = 0.2 + 0.15 * Math.sin(tR * 3);
    renderer.render(scene, camera);
  }
  animateResp();
};

// ── 13. Nerve Impulse ────────────────────────────────────────────────────────
window.createNerveImpulse = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  const N = 20;
  const pts = [];
  for (let i = 0; i < N; i++) {
    pts.push(new THREE.Vector3((i / (N - 1)) * 6 - 3, Math.sin(i * 0.5) * 0.25, 0));
  }
  pivot.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color: 0x4488cc })
  ));

  const nodes = [];
  for (let i = 0; i < N; i += 3) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0x336699 })
    );
    m.position.copy(pts[i]);
    pivot.add(m);
    nodes.push({ mesh: m, idx: i });
  }

  const impulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 14, 14),
    new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xaaaa00, emissiveIntensity: 0.8 })
  );
  pivot.add(impulse);
  const pLight = new THREE.PointLight(0xffff44, 1.5, 2.5);
  pivot.add(pLight);

  const axonLbl = _makeLabel('Axon', '#6699cc');
  axonLbl.position.set(0, -0.8, 0);
  scene.add(axonLbl);
  const apLbl = _makeLabel('Action Potential', '#ffff88');
  apLbl.scale.set(2.0, 0.5, 1);
  scene.add(apLbl);

  let tN = 0;
  function animateNerve() {
    container._3dRafId = requestAnimationFrame(animateNerve);
    tN += 0.018;
    const progress = (tN * 0.45) % 1;
    const fi = progress * (N - 1);
    const idx = Math.min(Math.floor(fi), N - 2);
    const frac = fi - idx;
    const p0 = pts[idx], p1 = pts[idx + 1];
    const ix = p0.x + (p1.x - p0.x) * frac;
    const iy = p0.y + (p1.y - p0.y) * frac;
    impulse.position.set(ix, iy, 0);
    pLight.position.set(ix, iy, 0);
    apLbl.position.set(ix, iy + 0.5, 0);
    nodes.forEach(n => {
      const dist = Math.abs(n.idx - fi);
      const b = Math.max(0, 1 - dist / 2.5);
      n.mesh.material.emissiveIntensity = b * 0.8;
      n.mesh.material.emissive.setRGB(b * 0.4, b * 0.7, 0);
    });
    renderer.render(scene, camera);
  }
  animateNerve();
};

// ── 14. Cell Division (Mitosis) ──────────────────────────────────────────────
window.createCellDivision = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 6;

  const cellMat = new THREE.MeshPhongMaterial({ color: 0x4488cc, transparent: true, opacity: 0.65 });
  const cell = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), cellMat);
  pivot.add(cell);
  const nucMat = new THREE.MeshPhongMaterial({ color: 0x224488 });
  const nuc = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), nucMat);
  pivot.add(nuc);

  const dMat  = new THREE.MeshPhongMaterial({ color: 0x44aa66, transparent: true, opacity: 0.65 });
  const dMat2 = new THREE.MeshPhongMaterial({ color: 0x44aa66, transparent: true, opacity: 0.65 });
  const cellA = new THREE.Mesh(new THREE.SphereGeometry(0.65, 24, 24), dMat);
  const cellB = new THREE.Mesh(new THREE.SphereGeometry(0.65, 24, 24), dMat2);
  cellA.visible = cellB.visible = false;
  pivot.add(cellA); pivot.add(cellB);

  const mitosisLbl = _makeLabel('Mitosis', '#88aaff');
  mitosisLbl.position.set(0, 1.8, 0);
  scene.add(mitosisLbl);
  const parentLbl = _makeLabel('Parent Cell', '#4488cc');
  parentLbl.position.set(0, 1.3, 0);
  scene.add(parentLbl);
  const daughterLbl = _makeLabel('Daughter Cells', '#44aa66');
  daughterLbl.position.set(0, 1.3, 0);
  daughterLbl.scale.set(1.8, 0.45, 1);
  daughterLbl.visible = false;
  scene.add(daughterLbl);

  let tCD = 0;
  function animateDiv() {
    container._3dRafId = requestAnimationFrame(animateDiv);
    tCD += 0.016;
    const phase = (tCD * 0.22) % 1;
    if (phase < 0.25) {
      cell.visible = nuc.visible = true; cellA.visible = cellB.visible = false;
      cell.scale.set(1, 1, 1); cellMat.opacity = 0.65; nuc.position.set(0, 0, 0);
    } else if (phase < 0.5) {
      const p = (phase - 0.25) / 0.25;
      cell.visible = nuc.visible = true; cellA.visible = cellB.visible = false;
      cell.scale.set(1 + p * 0.55, 1 - p * 0.3, 1);
    } else if (phase < 0.75) {
      const p = (phase - 0.5) / 0.25;
      cell.visible = true; nuc.visible = false; cellA.visible = cellB.visible = true;
      cell.scale.set(1.5 - p * 0.5, 0.7, 1);
      cellMat.opacity = 0.65 * (1 - p);
      cellA.position.set(-(0.55 + p * 0.55), 0, 0); cellA.scale.setScalar(p);
      cellB.position.set(  0.55 + p * 0.55, 0, 0);  cellB.scale.setScalar(p);
    } else {
      cell.visible = false; nuc.visible = false; cellA.visible = cellB.visible = true;
      cellMat.opacity = 0.65;
      cellA.position.set(-1.1, 0, 0); cellB.position.set(1.1, 0, 0);
      cellA.scale.setScalar(1); cellB.scale.setScalar(1);
    }
    const showDaughter = phase >= 0.5;
    parentLbl.visible = !showDaughter;
    daughterLbl.visible = showDaughter;
    renderer.render(scene, camera);
  }
  animateDiv();
};

// ── 15. Particle States (Solid / Liquid / Gas) ───────────────────────────────
window.createParticleStates = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 60);
  camera.position.z = 9;

  const solid = [], liquid = [], gas = [];

  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 12), new THREE.MeshPhongMaterial({ color: 0x4488ff }));
    const bx = -3.2 + i * 0.6, by = (j - 1) * 0.6;
    m.userData = { bx, by };
    pivot.add(m);
    solid.push(m);
  }

  for (let i = 0; i < 9; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 12), new THREE.MeshPhongMaterial({ color: 0x44cc88 }));
    m.position.set((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, 0);
    m.userData = { vx: (Math.random() - 0.5) * 0.03, vy: (Math.random() - 0.5) * 0.03 };
    pivot.add(m);
    liquid.push(m);
  }

  for (let i = 0; i < 9; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 12), new THREE.MeshPhongMaterial({ color: 0xffaa44 }));
    m.position.set(3 + (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 1);
    const spd = 0.05 + Math.random() * 0.04;
    const a = Math.random() * Math.PI * 2;
    m.userData = { vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, vz: (Math.random() - 0.5) * spd * 0.5 };
    pivot.add(m);
    gas.push(m);
  }

  const solidLbl = _makeLabel('Solid', '#4488ff');
  solidLbl.position.set(-2.6, 1.8, 0);
  scene.add(solidLbl);
  const liquidLbl = _makeLabel('Liquid', '#44cc88');
  liquidLbl.position.set(0, 1.8, 0);
  scene.add(liquidLbl);
  const gasLbl = _makeLabel('Gas', '#ffaa44');
  gasLbl.position.set(3.2, 1.8, 0);
  scene.add(gasLbl);

  let tPS = 0;
  function animateStates() {
    container._3dRafId = requestAnimationFrame(animateStates);
    tPS += 0.016;
    solid.forEach(m => {
      m.position.x = m.userData.bx + Math.sin(tPS * 9 + m.userData.bx * 3) * 0.045;
      m.position.y = m.userData.by + Math.cos(tPS * 11 + m.userData.by * 5) * 0.04;
    });
    liquid.forEach(m => {
      m.position.x += m.userData.vx;
      m.position.y += m.userData.vy;
      if (Math.abs(m.position.x) > 1.3) m.userData.vx *= -1;
      if (Math.abs(m.position.y) > 1.3) m.userData.vy *= -1;
    });
    gas.forEach(m => {
      m.position.x += m.userData.vx;
      m.position.y += m.userData.vy;
      m.position.z += m.userData.vz;
      if (m.position.x < 1.6 || m.position.x > 4.8) m.userData.vx *= -1;
      if (Math.abs(m.position.y) > 1.8) m.userData.vy *= -1;
      if (Math.abs(m.position.z) > 0.9) m.userData.vz *= -1;
    });
    renderer.render(scene, camera);
  }
  animateStates();
};

// ── 16. Reaction Animation (Collision Theory / Energetics) ───────────────────
window.createReactionAnimation = function(container, type) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  const energetic = type === 'energetic';
  const PCOUNT = 20;
  const particles = [];
  const COLS = [0xff4444, 0x4488ff];

  for (let i = 0; i < PCOUNT; i++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 12),
      new THREE.MeshPhongMaterial({ color: COLS[i % 2] })
    );
    m.position.set((Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 3.5, (Math.random() - 0.5) * 2);
    const spd = (energetic ? 0.05 : 0.028) + Math.random() * 0.025;
    const a = Math.random() * Math.PI * 2;
    const az = (Math.random() - 0.5) * Math.PI;
    pivot.add(m);
    particles.push({ mesh: m, vx: Math.cos(a) * Math.cos(az) * spd, vy: Math.sin(a) * Math.cos(az) * spd, vz: Math.sin(az) * spd * 0.5, flash: 0 });
  }

  const rxnTitleLbl = _makeLabel(energetic ? 'Energetic Collision' : 'Collision Theory', '#ffffff');
  rxnTitleLbl.position.set(0, 2.5, 0);
  rxnTitleLbl.scale.set(2.0, 0.5, 1);
  scene.add(rxnTitleLbl);
  const molALbl = _makeLabel('Molecule A', '#ff6666');
  molALbl.position.set(-1.8, -2.3, 0);
  molALbl.scale.set(1.6, 0.4, 1);
  scene.add(molALbl);
  const molBLbl = _makeLabel('Molecule B', '#6699ff');
  molBLbl.position.set(1.8, -2.3, 0);
  molBLbl.scale.set(1.6, 0.4, 1);
  scene.add(molBLbl);

  function animateRxn() {
    container._3dRafId = requestAnimationFrame(animateRxn);
    for (const p of particles) {
      p.mesh.position.x += p.vx; p.mesh.position.y += p.vy; p.mesh.position.z += p.vz;
      if (Math.abs(p.mesh.position.x) > 2.5) p.vx *= -1;
      if (Math.abs(p.mesh.position.y) > 2.0) p.vy *= -1;
      if (Math.abs(p.mesh.position.z) > 1.5) p.vz *= -1;
      if (p.flash > 0) {
        const f = p.flash / (energetic ? 12 : 8);
        p.mesh.material.emissive.setRGB(f * (energetic ? 1.0 : 0.9), f * 0.6, 0);
        p.flash--;
      } else {
        p.mesh.material.emissive.set(0);
      }
    }
    for (let i = 0; i < PCOUNT; i++) {
      for (let j = i + 1; j < PCOUNT; j++) {
        if (i % 2 === j % 2) continue;
        const pa = particles[i], pb = particles[j];
        if (pa.flash > 0 || pb.flash > 0) continue;
        const dx = pa.mesh.position.x - pb.mesh.position.x;
        const dy = pa.mesh.position.y - pb.mesh.position.y;
        const dz = pa.mesh.position.z - pb.mesh.position.z;
        if (dx * dx + dy * dy + dz * dz < 0.18) {
          pa.vx *= -1; pb.vx *= -1; pa.vy *= -1; pb.vy *= -1;
          pa.flash = pb.flash = energetic ? 12 : 8;
        }
      }
    }
    renderer.render(scene, camera);
  }
  animateRxn();
};

// ── 17. Metal Lattice ────────────────────────────────────────────────────────
window.createMetalLattice = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  const ionMat = new THREE.MeshPhongMaterial({ color: 0x8899ff, transparent: true, opacity: 0.85 });
  for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), ionMat);
    m.position.set(x * 1.4, y * 1.4, z * 1.4);
    pivot.add(m);
  }

  const eMat = new THREE.MeshPhongMaterial({ color: 0xffff44, emissive: 0xaaaa00, emissiveIntensity: 0.6 });
  const electrons = [];
  for (let i = 0; i < 22; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), eMat);
    m.position.set((Math.random() - 0.5) * 3.5, (Math.random() - 0.5) * 3.5, (Math.random() - 0.5) * 3.5);
    const spd = 0.045 + Math.random() * 0.04;
    const a = Math.random() * Math.PI * 2, az = (Math.random() - 0.5) * Math.PI;
    pivot.add(m);
    electrons.push({ mesh: m, vx: Math.cos(a) * Math.cos(az) * spd, vy: Math.sin(a) * Math.cos(az) * spd, vz: Math.sin(az) * spd });
  }

  const ionLbl = _makeLabel('Metal Ion⁺', '#aabbff');
  ionLbl.position.set(0, 2.2, 0);
  scene.add(ionLbl);
  const eLattLbl = _makeLabel('Delocalised e⁻', '#ffff66');
  eLattLbl.position.set(0, -2.3, 0);
  eLattLbl.scale.set(2.2, 0.55, 1);
  scene.add(eLattLbl);

  function animateLattice() {
    container._3dRafId = requestAnimationFrame(animateLattice);
    for (const e of electrons) {
      e.mesh.position.x += e.vx; e.mesh.position.y += e.vy; e.mesh.position.z += e.vz;
      if (Math.abs(e.mesh.position.x) > 2.3) e.vx *= -1;
      if (Math.abs(e.mesh.position.y) > 2.3) e.vy *= -1;
      if (Math.abs(e.mesh.position.z) > 2.3) e.vz *= -1;
    }
    pivot.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animateLattice();
};

// ── 18. Motion Animation ─────────────────────────────────────────────────────
window.createMotionAnimation = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  pivot.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3.5, -1.5, 0), new THREE.Vector3(3.5, -1.5, 0)]),
    new THREE.LineBasicMaterial({ color: 0x666666 })
  ));

  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 20, 20),
    new THREE.MeshPhongMaterial({ color: 0xff6633, shininess: 100 })
  );
  pivot.add(ball);

  const TRAIL = 14;
  const trail = [];
  for (let i = 0; i < TRAIL; i++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.05 + (i / TRAIL) * 0.12, 8, 8),
      new THREE.MeshPhongMaterial({ color: 0xff9966, transparent: true, opacity: i / TRAIL * 0.8 })
    );
    pivot.add(m);
    trail.push(m);
  }

  const arrBuf = new Float32Array(6);
  const arrGeo = new THREE.BufferGeometry();
  arrGeo.setAttribute('position', new THREE.BufferAttribute(arrBuf, 3));
  pivot.add(new THREE.Line(arrGeo, new THREE.LineBasicMaterial({ color: 0xffff00 })));

  const velLbl = _makeLabel('v →', '#ffff00');
  scene.add(velLbl);

  const history = [];
  let tM = 0;
  function animateMotion() {
    container._3dRafId = requestAnimationFrame(animateMotion);
    tM += 0.022;
    const period = 6.0, ph = (tM % period) / period;
    let x, vx;
    if (ph < 1/3) { const p = ph * 3; x = -3 + p * p * 2; vx = p * 1.0; }
    else if (ph < 2/3) { const p = (ph - 1/3) * 3; x = -1 + p * 2; vx = 0.6; }
    else { const p = (ph - 2/3) * 3; x = 1 + (1 - (1-p)*(1-p)) * 2.2; vx = (1-p) * 0.4; }
    ball.position.set(x, -1.2, 0);
    history.unshift({ x, y: -1.2 });
    if (history.length > TRAIL) history.pop();
    trail.forEach((m, i) => { if (history[i]) m.position.set(history[i].x, history[i].y, 0); });
    arrBuf[0] = x; arrBuf[1] = -1.2; arrBuf[2] = 0;
    arrBuf[3] = x + vx * 2; arrBuf[4] = -1.2; arrBuf[5] = 0;
    arrGeo.attributes.position.needsUpdate = true;
    velLbl.position.set(x + vx * 2 + 0.4, -0.85, 0);
    renderer.render(scene, camera);
  }
  animateMotion();
};

// ── 19. Force Vectors ────────────────────────────────────────────────────────
window.createForceVectors = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  const box = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), new THREE.MeshPhongMaterial({ color: 0x6688aa }));
  pivot.add(box);
  const ground = new THREE.Mesh(new THREE.BoxGeometry(7, 0.12, 2), new THREE.MeshPhongMaterial({ color: 0x445544 }));
  ground.position.y = -1.0;
  pivot.add(ground);

  function arrow(color, rz) {
    const g = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8), new THREE.MeshPhongMaterial({ color }));
    shaft.position.y = 0.55;
    g.add(shaft);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 8), new THREE.MeshPhongMaterial({ color }));
    tip.position.y = 1.25;
    g.add(tip);
    if (rz) g.rotation.z = rz;
    pivot.add(g);
    return g;
  }

  const wArr  = arrow(0xff3333, Math.PI);       wArr.position.set(0, -0.45, 0);
  const nArr  = arrow(0x33ff55, 0);             nArr.position.set(0, 0.45, 0);
  const fArr  = arrow(0xffff33, -Math.PI / 2); fArr.position.set(0.45, 0, 0);
  const frArr = arrow(0xff9933, Math.PI / 2);  frArr.position.set(-0.45, 0, 0);

  const weightLbl = _makeLabel('Weight', '#ff6666');
  weightLbl.position.set(0.4, -2.1, 0);
  pivot.add(weightLbl);
  const normalLbl = _makeLabel('Normal', '#66ff88');
  normalLbl.position.set(0.4, 2.1, 0);
  pivot.add(normalLbl);
  const forceLbl = _makeLabel('Applied Force', '#ffff66');
  forceLbl.position.set(2.2, 0.4, 0);
  forceLbl.scale.set(1.8, 0.45, 1);
  pivot.add(forceLbl);
  const frictionLbl = _makeLabel('Friction', '#ffaa66');
  frictionLbl.position.set(-2.1, 0.4, 0);
  pivot.add(frictionLbl);

  let tF = 0;
  function animateForce() {
    container._3dRafId = requestAnimationFrame(animateForce);
    tF += 0.018;
    const fs = 0.6 + 0.6 * Math.abs(Math.sin(tF * 0.4));
    fArr.scale.set(fs, fs, 1);
    frArr.scale.set(fs * 0.85, fs * 0.85, 1);
    box.position.x = Math.sin(tF * 0.4) * 0.15;
    pivot.rotation.y += 0.004;
    renderer.render(scene, camera);
  }
  animateForce();
};

// ── 20. Collision Animation (Momentum) ───────────────────────────────────────
window.createCollisionAnimation = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  pivot.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, -1, 0), new THREE.Vector3(4, -1, 0)]),
    new THREE.LineBasicMaterial({ color: 0x666666 })
  ));

  const b1mat = new THREE.MeshPhongMaterial({ color: 0xff4444, shininess: 100 });
  const b2mat = new THREE.MeshPhongMaterial({ color: 0x4488ff, shininess: 100 });
  const ball1 = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 20), b1mat);
  const ball2 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 20), b2mat);
  pivot.add(ball1); pivot.add(ball2);

  const momentumLbl = _makeLabel('p = mv', '#ffffff');
  momentumLbl.position.set(0, 1.2, 0);
  scene.add(momentumLbl);
  const b1Lbl = _makeLabel('A', '#ff6666');
  const b2Lbl = _makeLabel('B', '#6699ff');
  scene.add(b1Lbl); scene.add(b2Lbl);

  const PERIOD = 5.0;
  let tC = 0;
  function animateColl() {
    container._3dRafId = requestAnimationFrame(animateColl);
    tC += 0.016;
    const ph = (tC % PERIOD) / PERIOD;
    if (ph < 0.4) {
      const p = ph / 0.4;
      ball1.position.set(-3.5 + p * 2.85, -0.55, 0);
      ball2.position.set(3.0, -0.55, 0);
      b1mat.emissive.set(0); b2mat.emissive.set(0);
    } else if (ph < 0.48) {
      const p = (ph - 0.4) / 0.08;
      ball1.position.set(-0.65, -0.55, 0);
      ball2.position.set(0.65, -0.55, 0);
      b1mat.emissive.setRGB(p * 0.5, p * 0.25, 0);
      b2mat.emissive.setRGB(p * 0.5, p * 0.25, 0);
    } else if (ph < 0.8) {
      const p = (ph - 0.48) / 0.32;
      ball1.position.set(-0.65 - p * 0.9, -0.55, 0);
      ball2.position.set(0.65 + p * 2.7, -0.55, 0);
      b1mat.emissive.set(0); b2mat.emissive.set(0);
    } else {
      const p = (ph - 0.8) / 0.2;
      ball1.position.set(-1.55 - p * 1.95, -0.55, 0);
      ball2.position.set(3.35 - p * 0.35, -0.55, 0);
    }
    b1Lbl.position.set(ball1.position.x, ball1.position.y + 0.65, 0);
    b2Lbl.position.set(ball2.position.x, ball2.position.y + 0.52, 0);
    renderer.render(scene, camera);
  }
  animateColl();
};

// ── 21. Energy Transfer (KE ↔ PE) ────────────────────────────────────────────
window.createEnergyTransfer = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  pivot.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.5, -2.3, 0), new THREE.Vector3(1.2, -2.3, 0)]),
    new THREE.LineBasicMaterial({ color: 0x666666 })
  ));

  const ballMat = new THREE.MeshPhongMaterial({ color: 0x4488ff, shininess: 100 });
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 20), ballMat);
  pivot.add(ball);

  const bgMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
  const peBg = new THREE.Mesh(new THREE.BoxGeometry(0.45, 4.0, 0.2), bgMat);
  peBg.position.set(2.0, 0, 0); pivot.add(peBg);
  const keBg = new THREE.Mesh(new THREE.BoxGeometry(0.45, 4.0, 0.2), bgMat.clone());
  keBg.position.set(2.65, 0, 0); pivot.add(keBg);

  const peBar = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1, 0.25), new THREE.MeshPhongMaterial({ color: 0x3366ff }));
  const keBar = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1, 0.25), new THREE.MeshPhongMaterial({ color: 0xff3333 }));
  pivot.add(peBar); pivot.add(keBar);

  const peLbl = _makeLabel('PE', '#3366ff');
  peLbl.position.set(2.0, 2.4, 0);
  scene.add(peLbl);
  const keLbl = _makeLabel('KE', '#ff3333');
  keLbl.position.set(2.65, 2.4, 0);
  scene.add(keLbl);
  const ballLbl = _makeLabel('Ball', '#aabbff');
  scene.add(ballLbl);

  const TOP = 2.0, BOT = -1.95;
  let tE = 0;
  function animateEnergy() {
    container._3dRafId = requestAnimationFrame(animateEnergy);
    tE += 0.025;
    const bounce = Math.abs(Math.sin(tE * 0.9));
    ball.position.set(-0.5, TOP - (TOP - BOT) * bounce, 0);
    const peR = 1 - bounce;
    ballMat.color.setRGB(peR * 0.2 + (1 - peR), peR * 0.4 + (1 - peR) * 0.2, peR);
    const pH = Math.max(0.05, peR * 3.8), kH = Math.max(0.05, bounce * 3.8);
    peBar.scale.y = pH; peBar.position.set(2.0, BOT + pH / 2, 0);
    keBar.scale.y = kH; keBar.position.set(2.65, BOT + kH / 2, 0);
    ballLbl.position.set(ball.position.x, ball.position.y + 0.55, 0);
    renderer.render(scene, camera);
  }
  animateEnergy();
};

// ── 22. Pressure Particles ───────────────────────────────────────────────────
window.createPressureParticles = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  pivot.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(4.5, 4, 2)),
    new THREE.LineBasicMaterial({ color: 0x999999 })
  ));

  const particles = [];
  for (let i = 0; i < 18; i++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0xff9944 })
    );
    m.position.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3.5, (Math.random() - 0.5) * 1.6);
    const spd = 0.045 + Math.random() * 0.04;
    const a = Math.random() * Math.PI * 2, az = (Math.random() - 0.5) * Math.PI;
    pivot.add(m);
    particles.push({ mesh: m, vx: Math.cos(a) * Math.cos(az) * spd, vy: Math.sin(a) * Math.cos(az) * spd, vz: Math.sin(az) * spd, flash: 0 });
  }

  const pressureLbl = _makeLabel('Gas Pressure', '#ff9944');
  pressureLbl.position.set(0, 2.4, 0);
  pressureLbl.scale.set(1.6, 0.4, 1);
  scene.add(pressureLbl);
  const containerLbl = _makeLabel('Container', '#999999');
  containerLbl.position.set(0, -2.5, 0);
  scene.add(containerLbl);

  function animatePressure() {
    container._3dRafId = requestAnimationFrame(animatePressure);
    for (const p of particles) {
      p.mesh.position.x += p.vx; p.mesh.position.y += p.vy; p.mesh.position.z += p.vz;
      let hit = false;
      if (Math.abs(p.mesh.position.x) > 2.1) { p.vx *= -1; hit = true; }
      if (Math.abs(p.mesh.position.y) > 1.85) { p.vy *= -1; hit = true; }
      if (Math.abs(p.mesh.position.z) > 0.85) { p.vz *= -1; hit = true; }
      if (hit) p.flash = 6;
      if (p.flash > 0) {
        p.mesh.material.emissive.setRGB(0.7 * p.flash / 6, 0.3 * p.flash / 6, 0);
        p.flash--;
      } else {
        p.mesh.material.emissive.set(0);
      }
    }
    renderer.render(scene, camera);
  }
  animatePressure();
};

// ── 23. Heat Conduction ──────────────────────────────────────────────────────
window.createHeatConduction = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  const N = 12;
  const atoms = [];
  for (let i = 0; i < N; i++) {
    const h0 = 1 - i / (N - 1);
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 14, 14),
      new THREE.MeshPhongMaterial({ color: new THREE.Color(0.8 * h0 + 0.1, 0.05, 0.1 + 0.7 * (1 - h0)) })
    );
    m.userData = { bx: (i / (N - 1)) * 6.5 - 3.25, by: 0 };
    pivot.add(m);
    atoms.push(m);
    if (i > 0) {
      pivot.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(atoms[i - 1].userData.bx, 0, 0),
          new THREE.Vector3(m.userData.bx, 0, 0)
        ]),
        new THREE.LineBasicMaterial({ color: 0x555555 })
      ));
    }
  }

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshPhongMaterial({ color: 0xff2200, emissive: 0xff2200, emissiveIntensity: 0.7, transparent: true, opacity: 0.35 })
  );
  glow.position.set(-3.25, 0, 0);
  pivot.add(glow);

  const hotLbl = _makeLabel('Hot', '#ff4422');
  hotLbl.position.set(-3.25, -0.7, 0);
  scene.add(hotLbl);
  const coldLbl = _makeLabel('Cold', '#4488ff');
  coldLbl.position.set(3.25, -0.7, 0);
  scene.add(coldLbl);
  const heatFlowLbl = _makeLabel('Heat Flow →', '#ffaa44');
  heatFlowLbl.position.set(0, 0.7, 0);
  heatFlowLbl.scale.set(1.8, 0.45, 1);
  scene.add(heatFlowLbl);

  let tH = 0;
  function animateHeat() {
    container._3dRafId = requestAnimationFrame(animateHeat);
    tH += 0.025;
    const spread = Math.sin(tH * 0.25) * 0.5 + 0.5;
    atoms.forEach((m, i) => {
      const pos = i / (N - 1);
      const eff = Math.max(0, Math.min(1, 1 - pos + spread * pos * 0.8));
      const vib = eff * 0.17;
      m.position.x = m.userData.bx + Math.sin(tH * (8 + eff * 14) + i * 1.7) * vib;
      m.position.y = Math.cos(tH * (9 + eff * 12) + i * 2.1) * vib * 0.85;
      m.material.color.setRGB(0.1 + eff * 0.8, eff * 0.05, 0.1 + (1 - eff) * 0.7);
    });
    glow.material.emissiveIntensity = 0.4 + 0.3 * Math.abs(Math.sin(tH * 5));
    renderer.render(scene, camera);
  }
  animateHeat();
};

// ── 24. Ray Refraction ───────────────────────────────────────────────────────
window.createRayRefraction = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 6;

  const glassBlock = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 1.8, 0.4),
    new THREE.MeshPhongMaterial({ color: 0x88ccff, transparent: true, opacity: 0.28 })
  );
  glassBlock.position.y = -1.2;
  pivot.add(glassBlock);

  pivot.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.8, 0, 0), new THREE.Vector3(2.8, 0, 0)]),
    new THREE.LineBasicMaterial({ color: 0x666666 })
  ));
  pivot.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -2.8, 0), new THREE.Vector3(0, 2.8, 0)]),
    new THREE.LineBasicMaterial({ color: 0x333333 })
  ));

  function makeRay(color) {
    const buf = new Float32Array(6);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(buf, 3));
    pivot.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color })));
    return { geo, buf };
  }

  const incRay = makeRay(0xffee22);
  const refRay = makeRay(0x44aaff);

  function setRay(r, x1, y1, x2, y2) {
    r.buf[0] = x1; r.buf[1] = y1; r.buf[2] = 0;
    r.buf[3] = x2; r.buf[4] = y2; r.buf[5] = 0;
    r.geo.attributes.position.needsUpdate = true;
  }

  const normalLbl2 = _makeLabel('Normal', '#888888');
  normalLbl2.position.set(0.4, 2.4, 0);
  scene.add(normalLbl2);
  const glassLbl = _makeLabel('Glass', '#88ccff');
  glassLbl.position.set(0, -1.2, 0);
  scene.add(glassLbl);
  const incLbl = _makeLabel('Incident Ray', '#ffee22');
  incLbl.scale.set(1.8, 0.45, 1);
  scene.add(incLbl);
  const refLbl = _makeLabel('Refracted Ray', '#44aaff');
  refLbl.scale.set(1.8, 0.45, 1);
  scene.add(refLbl);

  const N2 = 1.5;
  let tRefr = 0;
  function animateRefr() {
    container._3dRafId = requestAnimationFrame(animateRefr);
    tRefr += 0.015;
    const theta1 = 0.18 + Math.abs(Math.sin(tRefr * 0.35)) * 1.12;
    setRay(incRay, -Math.sin(theta1) * 2.5, Math.cos(theta1) * 2.5, 0, 0);
    incLbl.position.set(-Math.sin(theta1) * 2.5 + 0.4, Math.cos(theta1) * 2.5, 0);
    const sinR = Math.sin(theta1) / N2;
    if (sinR <= 1) {
      const theta2 = Math.asin(sinR);
      setRay(refRay, 0, 0, Math.sin(theta2) * 2.2, -Math.cos(theta2) * 2.2);
      refLbl.position.set(Math.sin(theta2) * 2.2 + 0.3, -Math.cos(theta2) * 2.2, 0);
    } else {
      setRay(refRay, 0, 0, 0, 0);
    }
    renderer.render(scene, camera);
  }
  animateRefr();
};

// ── 25. Longitudinal Wave (Sound) ─────────────────────────────────────────────
window.createLongitudinalWave = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  const NW = 18;
  const wParticles = [];
  for (let i = 0; i < NW; i++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 12, 12),
      new THREE.MeshPhongMaterial({ color: 0x55aaff })
    );
    m.userData = { bx: (i - NW / 2 + 0.5) * 0.55 };
    pivot.add(m);
    wParticles.push(m);
  }

  pivot.add(new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-4.2, -1.8, 0),
    1.8, 0xffaa00, 0.35, 0.25
  ));

  const waveDirLbl = _makeLabel('Wave Direction →', '#ffaa00');
  waveDirLbl.position.set(-3.2, -1.8, 0);
  waveDirLbl.scale.set(2.2, 0.55, 1);
  scene.add(waveDirLbl);
  const compLbl = _makeLabel('Compression', '#88ccff');
  compLbl.scale.set(1.8, 0.45, 1);
  scene.add(compLbl);
  const rarefLbl = _makeLabel('Rarefaction', '#4466aa');
  rarefLbl.scale.set(1.8, 0.45, 1);
  scene.add(rarefLbl);

  let tLW = 0;
  function animateLong() {
    container._3dRafId = requestAnimationFrame(animateLong);
    tLW += 0.03;
    let maxDisp = -Infinity, minDisp = Infinity, maxX = 0, minX = 0;
    wParticles.forEach((m, i) => {
      const disp = Math.sin(tLW - i * 0.65) * 0.28;
      m.position.x = m.userData.bx + disp;
      const comp = disp / 0.28;
      m.material.color.setRGB(0.15 + comp * 0.3, 0.4 + comp * 0.2, 0.9 - comp * 0.15);
      if (disp > maxDisp) { maxDisp = disp; maxX = m.position.x; }
      if (disp < minDisp) { minDisp = disp; minX = m.position.x; }
    });
    compLbl.position.set(maxX, 0.6, 0);
    rarefLbl.position.set(minX, 0.6, 0);
    renderer.render(scene, camera);
  }
  animateLong();
};

// ── 26. Electromagnetic Induction ─────────────────────────────────────────────
window.createEMInduction = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.z = 7;

  const TURNS = 9;
  const coilRings = [];
  for (let i = 0; i < TURNS; i++) {
    const mat = new THREE.MeshPhongMaterial({ color: 0xcc8833 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.065, 8, 24), mat);
    ring.rotation.y = Math.PI / 2;
    ring.position.x = (i - TURNS / 2 + 0.5) * 0.42;
    pivot.add(ring);
    coilRings.push(ring);
  }

  const magnet = new THREE.Group();
  const north = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.8, 16), new THREE.MeshPhongMaterial({ color: 0xff2222 }));
  const south = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.8, 16), new THREE.MeshPhongMaterial({ color: 0x2222ff }));
  north.rotation.z = south.rotation.z = Math.PI / 2;
  north.position.x = 0.4; south.position.x = -0.4;
  magnet.add(north); magnet.add(south);
  pivot.add(magnet);

  const coilLbl = _makeLabel('Coil', '#cc8833');
  coilLbl.position.set(0, 1.1, 0);
  scene.add(coilLbl);
  const inductLbl = _makeLabel('Induced Current', '#ffdd88');
  inductLbl.position.set(0, -1.3, 0);
  inductLbl.scale.set(2.0, 0.5, 1);
  scene.add(inductLbl);
  const nLbl = _makeLabel('N', '#ff6666');
  const sLbl = _makeLabel('S', '#6688ff');
  scene.add(nLbl); scene.add(sLbl);

  let tEMI = 0;
  function animateEMI() {
    container._3dRafId = requestAnimationFrame(animateEMI);
    tEMI += 0.02;
    const mx = Math.sin(tEMI * 0.75) * 2.8;
    magnet.position.x = mx;
    nLbl.position.set(mx + 0.4, 0.8, 0);
    sLbl.position.set(mx - 0.4, 0.8, 0);
    const speed = Math.abs(Math.cos(tEMI * 0.75));
    coilRings.forEach(ring => {
      const dist = Math.abs(ring.position.x - mx);
      const gw = speed * Math.max(0, 1 - dist / 2.2);
      ring.material.emissive.setRGB(gw * 0.9, gw * 0.55, 0);
      ring.material.color.setRGB(0.8 + gw * 0.15, 0.55 + gw * 0.3, 0.2);
    });
    renderer.render(scene, camera);
  }
  animateEMI();
};

// ── 27. Orbit Animation (Space Physics) ──────────────────────────────────────
window.createOrbitAnimation = function(container) {
  const { scene, camera, renderer, pivot } = _setup3D(container, 55);
  camera.position.set(2, 4, 8);
  camera.lookAt(0, 0, 0);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 24, 24),
    new THREE.MeshPhongMaterial({ color: 0xffdd22, emissive: 0xffaa00, emissiveIntensity: 0.5 })
  );
  pivot.add(sun);
  const sunLight = new THREE.PointLight(0xffdd88, 1.5, 12);
  pivot.add(sunLight);

  const oRing = [];
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    oRing.push(new THREE.Vector3(Math.cos(a) * 2.6, 0, Math.sin(a) * 2.6));
  }
  pivot.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(oRing),
    new THREE.LineBasicMaterial({ color: 0x334455, transparent: true, opacity: 0.5 })
  ));

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 16, 16),
    new THREE.MeshPhongMaterial({ color: 0x3366cc })
  );
  pivot.add(planet);

  const mRing = [];
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    mRing.push(new THREE.Vector3(Math.cos(a) * 0.65, 0, Math.sin(a) * 0.65));
  }
  const moonOrbit = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(mRing),
    new THREE.LineBasicMaterial({ color: 0x334455, transparent: true, opacity: 0.3 })
  );
  pivot.add(moonOrbit);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 12, 12),
    new THREE.MeshPhongMaterial({ color: 0xbbbbbb })
  );
  pivot.add(moon);

  const sunLbl = _makeLabel('Sun', '#ffee88');
  sunLbl.position.set(0, 0.9, 0);
  scene.add(sunLbl);
  const planetLbl = _makeLabel('Planet', '#88aaff');
  scene.add(planetLbl);
  const moonLbl = _makeLabel('Moon', '#cccccc');
  scene.add(moonLbl);

  let tOrb = 0;
  function animateOrbit() {
    container._3dRafId = requestAnimationFrame(animateOrbit);
    tOrb += 0.016;
    const px = Math.cos(tOrb * 0.38) * 2.6, pz = Math.sin(tOrb * 0.38) * 2.6;
    planet.position.set(px, 0, pz);
    moonOrbit.position.set(px, 0, pz);
    moon.position.set(px + Math.cos(tOrb * 2.4) * 0.65, 0, pz + Math.sin(tOrb * 2.4) * 0.65);
    sun.scale.setScalar(1 + 0.04 * Math.sin(tOrb * 1.8));
    planetLbl.position.set(px, 0.5, pz);
    moonLbl.position.set(moon.position.x, moon.position.y + 0.25, moon.position.z);
    renderer.render(scene, camera);
  }
  animateOrbit();
};
