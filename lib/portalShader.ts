const VERTEX_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// Water-dive submersion + blacklight color burst. The overlay ramps to full
// black opacity at the midpoint (swallowing the viewport — this is when the
// actual route swap happens underneath), then fades back out to reveal the
// new room. Rings are colored magenta/cyan/acid-green per the design brief's
// universal transition treatment.
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

  // envelope: 0 -> 1 -> 0, black coverage peaks at the midpoint
  float envelope = smoothstepf(0.0, 0.35, u_time) * (1.0 - smoothstepf(0.65, 1.0, u_time));

  // ripple distortion — settles as the dive progresses (water-surface break)
  float rippleAmp = 0.06 * (1.0 - u_time);
  float ripple = sin(dist * 18.0 - u_time * 14.0) * rippleAmp;
  float d = dist + ripple;

  // expanding burst ring
  float burstRadius = u_time * 1.5;
  float ring = smoothstepf(0.18, 0.0, abs(d - burstRadius));

  vec3 magenta = vec3(1.0, 0.18, 0.82);
  vec3 cyan    = vec3(0.13, 0.94, 1.0);
  vec3 acid    = vec3(0.78, 1.0, 0.18);

  float mixer = sin(angle * 3.0 + u_time * 6.0) * 0.5 + 0.5;
  vec3 burstColor = mix(magenta, cyan, mixer);
  float acidMix = smoothstepf(0.6, 1.0, sin(angle * 5.0 - u_time * 4.0) * 0.5 + 0.5);
  burstColor = mix(burstColor, acid, acidMix);

  vec3 finalColor = burstColor * ring * envelope * 1.6;

  gl_FragColor = vec4(finalColor, envelope);
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
