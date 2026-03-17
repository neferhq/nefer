'use client';

import { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    window.addEventListener('resize', syncSize);
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }`;

    // Fragment Shader: Abstract Precision Grids (Elegan & Sharp)
    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      mat2 rot(float a) {
          float s = sin(a), c = cos(a);
          return mat2(c, -s, s, c);
      }

      void main() {
          vec2 uv = (v_texCoord - 0.5) * 2.0;
          uv.x *= u_resolution.x / u_resolution.y;

          // Waktu dibikin sangat lambat agar elegan dan tenang
          float time = u_time * 0.03; 

          // Warna dasar Obsidian (Sangat Gelap)
          vec3 color = vec3(0.0, 0.07, 0.04); 
          
          // Warna aksen garis sesuai palet
          vec3 emerald = vec3(0.02, 0.46, 0.41); // #057569
          vec3 mint = vec3(0.73, 0.84, 0.78);    // #BBD7C8

          vec3 gridColor = vec3(0.0);

          // Membuat 3 lapis wireframe/grid yang bergeser
          for (int i = 0; i < 3; i++) {
              float fi = float(i);
              
              // Efek parallax: setiap layer bergerak ke arah berbeda secara perlahan
              vec2 offset = vec2(time * 0.3 * (fi + 1.0), time * 0.15 * (3.0 - fi));
              
              // Rotasi statis & dinamis untuk menciptakan sudut tajam
              float angle = time * (mod(fi, 2.0) == 0.0 ? 0.1 : -0.1) + fi * 0.785;
              vec2 st = (uv + offset) * rot(angle);
              
              // Skala grid tiap layer
              st *= 2.5 + fi * 2.0; 
              
              // Matematika untuk garis tajam (1px style)
              vec2 grid = abs(fract(st - 0.5) - 0.5);
              float lineThickness = 0.015; // Ketebalan garis
              
              float lineX = smoothstep(lineThickness, 0.0, grid.x);
              float lineY = smoothstep(lineThickness, 0.0, grid.y);
              
              // Persimpangan garis dibuat lebih terang (titik kumpul presisi)
              float intersect = lineX * lineY;
              
              // Gradasi warna antar layer
              vec3 col = mix(emerald, mint, fi / 2.0);
              
              // Render garis (transparan) & persimpangan (terang/glow)
              gridColor += col * (lineX + lineY) * 0.12; 
              gridColor += col * intersect * 0.8; 
          }

          // Vignette: Memudar ke hitam di bagian pinggir layar agar konten teks tetap terbaca jelas
          float dist = length(uv);
          gridColor *= smoothstep(1.8, 0.2, dist);

          color += gridColor;

          gl_FragColor = vec4(color, 1.0);
      }`;

    function cs(type: number, src: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let animationFrameId: number;
    let startTime = performance.now();
    
    function render(now: number) {
      gl.viewport(0, 0, canvas!.width, canvas!.height);
      const t = now - startTime;
      
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas!.width, canvas!.height);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', syncSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-[#00120a]">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}