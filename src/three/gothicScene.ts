import * as THREE from "three";

type GothicSceneController = {
  dispose: () => void;
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSmallScreen = window.matchMedia("(max-width: 720px)").matches;

export function createGothicScene(canvas: HTMLCanvasElement): GothicSceneController {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isSmallScreen,
    alpha: true,
    powerPreference: "high-performance"
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.4 : 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050506, 0.028);

  const camera = new THREE.PerspectiveCamera(
    isSmallScreen ? 46 : 42,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.6, isSmallScreen ? 14 : 9.2);

  const root = new THREE.Group();
  const baseRoot = {
    x: isSmallScreen ? 0 : 2.35,
    y: isSmallScreen ? 1.45 : 1.12,
    z: isSmallScreen ? -0.2 : 0.15
  };
  root.position.set(baseRoot.x, baseRoot.y, baseRoot.z);
  root.scale.setScalar(isSmallScreen ? 0.56 : 0.92);
  scene.add(root);

  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x19191d,
    roughness: 0.46,
    metalness: 0.72
  });
  const silverLine = new THREE.LineBasicMaterial({
    color: 0xbfb8ad,
    transparent: true,
    opacity: 0.35
  });

  buildArchitecture(root, darkMetal, silverLine);

  const ambient = new THREE.AmbientLight(0x8d8790, 0.58);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xf3eee2, 2.4);
  keyLight.position.set(-4, 5, 5);
  scene.add(keyLight);

  const coldLight = new THREE.PointLight(0xb9c2d7, 9, 12);
  coldLight.position.set(-3.5, 2.6, -1.8);
  scene.add(coldLight);

  const pointer = new THREE.Vector2();
  const targetPointer = new THREE.Vector2();
  let scrollProgress = 0;
  let frameId = 0;
  const clock = new THREE.Clock();

  const onPointerMove = (event: PointerEvent) => {
    targetPointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    targetPointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  const onScroll = () => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    scrollProgress = window.scrollY / maxScroll;
  };

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.4 : 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  onScroll();

  const render = () => {
    const elapsed = clock.getElapsedTime();
    pointer.lerp(targetPointer, reducedMotion ? 0.04 : 0.08);

    root.rotation.y = pointer.x * 0.08 + scrollProgress * 0.32;
    root.rotation.x = -pointer.y * 0.045 + scrollProgress * 0.08;
    root.position.x = baseRoot.x + pointer.x * (isSmallScreen ? 0.08 : 0.18);
    root.position.y =
      baseRoot.y - scrollProgress * (isSmallScreen ? 0.85 : 1.25) + Math.sin(elapsed * 0.55) * (reducedMotion ? 0.01 : 0.035);

    camera.position.x = pointer.x * 0.42;
    camera.position.y = 1.55 + pointer.y * -0.18 + scrollProgress * 0.35;
    camera.lookAt(0, -0.25, 0);

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(render);
  };

  render();

  return {
    dispose() {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
    }
  };
}

function buildArchitecture(
  root: THREE.Group,
  material: THREE.Material,
  lineMaterial: THREE.LineBasicMaterial
) {
  const arch = new THREE.Group();
  arch.position.set(0, -0.12, -1.8);
  root.add(arch);

  const columnGeometry = new THREE.CylinderGeometry(0.075, 0.12, 4.4, 8);
  [-2.8, 2.8].forEach((x) => {
    const column = new THREE.Mesh(columnGeometry, material);
    column.position.set(x, -0.15, 0);
    arch.add(column);

    const finial = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.9, 8), material);
    finial.position.set(x, 2.45, 0);
    arch.add(finial);
  });

  const leftCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-2.8, 2.0, 0),
    new THREE.Vector3(-2.15, 3.6, 0),
    new THREE.Vector3(-0.92, 4.1, 0),
    new THREE.Vector3(0, 4.72, 0)
  );
  const rightCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 4.72, 0),
    new THREE.Vector3(0.92, 4.1, 0),
    new THREE.Vector3(2.15, 3.6, 0),
    new THREE.Vector3(2.8, 2.0, 0)
  );

  [leftCurve, rightCurve].forEach((curve) => {
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.07, 8), material);
    arch.add(tube);
  });

  const innerPoints = [
    new THREE.Vector3(-2.38, 2.05, 0.02),
    new THREE.Vector3(-1.15, 3.74, 0.02),
    new THREE.Vector3(0, 4.34, 0.02),
    new THREE.Vector3(1.15, 3.74, 0.02),
    new THREE.Vector3(2.38, 2.05, 0.02)
  ];
  const innerLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(innerPoints), lineMaterial);
  arch.add(innerLine);

}
