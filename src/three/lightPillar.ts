import * as THREE from "three";

type LightPillarController = {
  dispose: () => void;
};

export function createLightPillar(canvas: HTMLCanvasElement): LightPillarController {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smallScreen = window.matchMedia("(max-width: 680px)").matches;
  const steps = smallScreen ? 42 : 64;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
    precision: "mediump"
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, smallScreen ? 1 : 1.35));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new THREE.PlaneGeometry(2, 2);
  const topColor = new THREE.Color("#5227ff");
  const bottomColor = new THREE.Color("#ff9ffc");

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      varying vec2 vUv;

      const float PI = 3.141592653589793;

      mat2 rotate2d(float angle) {
        float sine = sin(angle);
        float cosine = cos(angle);
        return mat2(cosine, -sine, sine, cosine);
      }

      float grain(vec2 coordinates) {
        vec2 value = 2.7182818 * sin(2.7182818 * coordinates);
        return fract(value.x * value.y * (1.0 + coordinates.x));
      }

      vec3 deform(vec3 position, float timeOffset) {
        float frequency = 1.0;
        float amplitude = 1.0;
        vec3 result = position;

        for (float index = 0.0; index < 4.0; index++) {
          result.xz *= rotate2d(0.4);
          vec3 oscillation = cos(result.zxy * frequency - timeOffset * index * 2.0);
          result += oscillation * amplitude;
          frequency *= 2.0;
          amplitude *= 0.5;
        }

        return result;
      }

      float smoothMinimum(float first, float second, float amount) {
        float scaledAmount = amount * 4.0;
        float blend = max(scaledAmount - abs(first - second), 0.0);
        return min(first, second) - blend * blend * 0.25 / scaledAmount;
      }

      float smoothMaximum(float first, float second, float amount) {
        return -smoothMinimum(-first, -second, amount);
      }

      void main() {
        vec2 fragment = vUv * uResolution;
        vec2 uv = (fragment * 2.0 - uResolution) / uResolution.y;
        uv *= rotate2d(-20.0 * PI / 180.0);

        vec3 origin = vec3(0.0, 0.0, -10.0);
        vec3 direction = normalize(vec3(uv, 1.0));
        float depth = 0.1;
        vec3 color = vec3(0.0);
        mat2 pillarRotation = rotate2d(uTime * 0.28);

        for (float index = 0.0; index < ${steps}.0; index++) {
          vec3 position = origin + direction * depth;
          position.xz *= pillarRotation;

          vec3 warped = position;
          warped.y *= 0.42;
          warped = deform(warped + vec3(0.0, uTime, 0.0), uTime);

          float field = length(cos(warped.xz)) - 0.2;
          float boundary = length(position.xz) - 3.2;
          field = smoothMaximum(boundary, field, 1.0);
          field = abs(field) * 0.15 + 0.01;

          vec3 gradient = mix(uBottomColor, uTopColor, smoothstep(15.0, -15.0, position.y));
          color += gradient / field;

          if (field < 0.001 || depth > 50.0) {
            break;
          }

          depth += field;
        }

        color *= 0.00235 / (3.2 / 3.0);
        color = color / (1.0 + color);
        color -= grain(gl_FragCoord.xy) / 15.0 * 0.16;
        color = max(color, vec3(0.0)) * 0.62;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTopColor: { value: new THREE.Vector3(topColor.r, topColor.g, topColor.b) },
      uBottomColor: { value: new THREE.Vector3(bottomColor.r, bottomColor.g, bottomColor.b) }
    }
  });

  scene.add(new THREE.Mesh(geometry, material));

  let frameId = 0;
  let timerId = 0;
  let running = false;
  let elapsed = 0;
  let lastTime = performance.now();
  const frameInterval = 1000 / (smallScreen ? 30 : 42);

  const resize = () => {
    const width = Math.max(window.innerWidth, 1);
    const height = Math.max(window.innerHeight, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, smallScreen ? 1 : 1.35));
    renderer.setSize(width, height, false);
    material.uniforms.uResolution.value.set(width, height);
    renderer.render(scene, camera);
  };

  const animate = (currentTime: number) => {
    if (!running) {
      return;
    }

    const delta = Math.min((currentTime - lastTime) / 1000, 0.05);
    lastTime = currentTime;
    elapsed += delta * 0.14;
    material.uniforms.uTime.value = elapsed;
    renderer.render(scene, camera);
    canvas.dataset.lightPillarFrame = String(Number(canvas.dataset.lightPillarFrame ?? "0") + 1);
    timerId = window.setTimeout(() => {
      frameId = window.requestAnimationFrame(animate);
    }, frameInterval);
  };

  const start = () => {
    if (running || reducedMotion) {
      return;
    }

    running = true;
    lastTime = performance.now();
    frameId = window.requestAnimationFrame(animate);
  };

  const stop = () => {
    running = false;
    window.cancelAnimationFrame(frameId);
    window.clearTimeout(timerId);
    frameId = 0;
    timerId = 0;
  };

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      start();
    } else {
      stop();
    }
  });

  resize();
  canvas.dataset.lightPillarReady = "true";
  window.addEventListener("resize", resize, { passive: true });

  if (reducedMotion) {
    renderer.render(scene, camera);
  } else {
    visibilityObserver.observe(canvas);
  }

  return {
    dispose() {
      stop();
      window.removeEventListener("resize", resize);
      visibilityObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    }
  };
}
