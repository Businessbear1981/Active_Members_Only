const VERTEX_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// Swirling-water dive. A vortex distortion spins the viewport around its center
// while concentric caustic rings ripple outward, in deep-water navy/teal shading
// to gold highlights (AMO's brass) — no neon blacklight burst. The overlay still
// ramps to full black/water opacity at the midpoint (when the actual route swap
// happens underneath), then fades back out to reveal the new room.
const FRAGMENT_SRC = `
precision mediump float;
uniform float u_time; // 0..1 progress through the jump
uniform vec2 u_resolution;

float smoothstepf(float a, float b, float x) {
  float t = clamp((x - a) / (b - a), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float dist = length(uv);
  float angle = atan(uv.y, uv.x);

  // envelope: 0 -> 1 -> 0, full water coverage peaks at the midpoint
  float envelope = smoothstepf(0.0, 0.35, u_time) * (1.0 - smoothstepf(0.65, 1.0, u_time));
  float spin = smoothstepf(0.0, 0.9, u_time);

  // vortex: swirl strengthens toward the center and eases in/out across the jump
  float swirl = (1.2 / (dist + 0.25)) * spin * (1.0 - spin) * 4.0;
  float swirledAngle = angle + swirl + u_time * 2.2;

  // layered caustic ripples — the "swirling water" texture
  float c1 = sin(dist * 16.0 - u_time * 10.0 + sin(swirledAngle * 3.0) * 1.6);
  float c2 = sin(dist * 9.0 + swirledAngle * 4.0 - u_time * 6.0);
  float caustic = (c1 * 0.6 + c2 * 0.4);
  float causticGlow = smoothstepf(0.35, 1.0, caustic);

  // deep water navy/teal, brightening to brass gold at caustic peaks
  vec3 deepWater  = vec3(0.02, 0.07, 0.11);
  vec3 teal       = vec3(0.05, 0.35, 0.42);
  vec3 gold       = vec3(0.79, 0.66, 0.30);

  vec3 waterColor = mix(deepWater, teal, smoothstepf(0.0, 1.0, dist + caustic * 0.15));
  waterColor = mix(waterColor, gold, causticGlow * 0.5);

  // radial vignette so the swirl reads as a submersion, not a flat overlay
  float vignette = 1.0 - smoothstepf(0.15, 1.1, dist);
  vec3 finalColor = mix(deepWater * 0.6, waterColor, vignette);

  float alpha = envelope * mix(0.85, 1.0, causticGlow);

  gl_FragColor = vec4(finalColor * envelope * 1.4, alpha);
}
`

export interface PortalRenderer {
  render: (progress: number) => void
  resize: () => void
  destroy: () => void
}

export function createPortalRenderer(canvas: HTMLCanvasElement): PortalRenderer | null {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
  if (!gl) return null

  function compile(type: number, src: string): WebGLShader | null {
    const shader = gl!.createShader(type)
    if (!shader) return null
    gl!.shaderSource(shader, src)
    gl!.compileShader(shader)
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      console.error('Portal shader compile error:', gl!.getShaderInfoLog(shader))
      gl!.deleteShader(shader)
      return null
    }
    return shader
  }

  const vertexShader = compile(gl.VERTEX_SHADER, VERTEX_SRC)
  const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC)
  if (!vertexShader || !fragmentShader) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Portal shader link error:', gl.getProgramInfoLog(program))
    return null
  }

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  )

  const positionLoc = gl.getAttribLocation(program, 'a_position')
  const timeLoc = gl.getUniformLocation(program, 'u_time')
  const resolutionLoc = gl.getUniformLocation(program, 'u_resolution')

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.floor(canvas.clientWidth * dpr)
    const height = Math.floor(canvas.clientHeight * dpr)
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl!.viewport(0, 0, canvas.width, canvas.height)
  }

  function render(progress: number) {
    resize()
    gl!.clearColor(0, 0, 0, 0)
    gl!.clear(gl!.COLOR_BUFFER_BIT)
    gl!.enable(gl!.BLEND)
    gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA)
    gl!.useProgram(program)

    gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer)
    gl!.enableVertexAttribArray(positionLoc)
    gl!.vertexAttribPointer(positionLoc, 2, gl!.FLOAT, false, 0, 0)

    gl!.uniform1f(timeLoc, progress)
    gl!.uniform2f(resolutionLoc, canvas.width, canvas.height)

    gl!.drawArrays(gl!.TRIANGLES, 0, 6)
  }

  function destroy() {
    gl!.deleteProgram(program)
    gl!.deleteShader(vertexShader)
    gl!.deleteShader(fragmentShader)
    gl!.deleteBuffer(positionBuffer)
  }

  return { render, resize, destroy }
}
