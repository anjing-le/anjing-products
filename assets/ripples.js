const canvas = document.querySelector('.water');
const gl = canvas.getContext('webgl', { alpha:false, antialias:false, powerPreference:'low-power' });
canvas.hidden=true;
if (gl) {
  const shader = (type, source) => {
    const object = gl.createShader(type);
    gl.shaderSource(object, source);
    gl.compileShader(object);
    if (!gl.getShaderParameter(object, gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(object));
    return object;
  };
  const program = gl.createProgram();
  gl.attachShader(program, shader(gl.VERTEX_SHADER,
    'attribute vec2 point;void main(){gl_Position=vec4(point,0.,1.);}'));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, `
    precision highp float;
    uniform vec2 size;
    uniform float time;
    uniform sampler2D stone;
    uniform float textureAspect;
    vec2 hash(vec2 cell){
      return fract(sin(vec2(dot(cell,vec2(127.1,311.7)),dot(cell,vec2(269.5,183.3))))*4375.5453);
    }
    float caustic(vec2 p,float t){
      p+=.26*sin(p.yx*2.+vec2(.3*t,-.21*t))+.09*cos(p.yx*4.9-t*.22);
      vec2 cell=floor(p),local=fract(p);
      float nearest=9.,second=9.;
      for(int y=-1;y<=1;y++){
        for(int x=-1;x<=1;x++){
          vec2 offset=vec2(float(x),float(y));
          vec2 seed=hash(cell+offset);
          vec2 delta=offset+.5+.29*sin(seed*6.283+t*.29)-local;
          float distance2=dot(delta,delta);
          second=min(second,max(nearest,distance2));
          nearest=min(nearest,distance2);
        }
      }
      return exp(-17.*(second-nearest));
    }
    void main(){
      vec2 uv=gl_FragCoord.xy/size;
      float aspect=size.x/size.y;
      vec2 p=(uv-.5)*vec2(aspect,1.);
      float t=time;
      float wave1=sin(dot(p,vec2(17.,24.))+.70*t+1.3*sin(p.x*8.-t*.25));
      float wave2=cos(dot(p,vec2(-26.,12.))-.54*t+sin(p.y*11.+t*.3));
      vec2 slope=vec2(.65*wave1-.52*wave2,.76*wave1+.33*wave2);
      vec2 fit=min(vec2(aspect/textureAspect,textureAspect/aspect),vec2(1.));
      vec2 lookup=.5+(uv-.5+.005*slope/vec2(aspect,1.))*fit*.985;
      float grain=dot(texture2D(stone,lookup).rgb,vec3(.3,.59,.11));
      vec3 base=mix(vec3(grain),vec3(238.,234.,228.)/255.,.74);
      float web=caustic(p*5.3+vec2(t*.048,-t*.028),t);
      float sunlight=.52+.32*sin(p.x*3.+p.y*4.+.5*wave2);
      vec3 transmitted=base*(.985+.009*wave2)+vec3(1.,.99,.97)*web*.10*sunlight;
      float glint=pow(max(0.,slope.y*.78+slope.x*.24),12.);
      gl_FragColor=vec4(transmitted+.025*glint,1.);
    }`));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const buffer=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const point=gl.getAttribLocation(program,'point');
  gl.enableVertexAttribArray(point);
  gl.vertexAttribPointer(point,2,gl.FLOAT,false,0,0);
  const size=gl.getUniformLocation(program,'size'), time=gl.getUniformLocation(program,'time');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0, previous=-100;
  function draw(now) {
    if(now-previous>=42 || !frame) {
      previous=now;
      gl.uniform1f(time,reducedMotion.matches?0:now*.001);
      gl.drawArrays(gl.TRIANGLES,0,3);
    }
    frame=document.hidden||reducedMotion.matches?0:requestAnimationFrame(draw);
  }
  function reset() {
    cancelAnimationFrame(frame);
    frame=0;
    const scale=Math.min(1,1152/Math.max(1,canvas.clientWidth));
    canvas.width=Math.max(1,Math.round(canvas.clientWidth*scale));
    canvas.height=Math.max(1,Math.round(canvas.clientHeight*scale));
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.uniform2f(size,canvas.width,canvas.height);
    draw(performance.now());
  }
  const marble=new Image();
  marble.onload=()=>{
    gl.bindTexture(gl.TEXTURE_2D,gl.createTexture());
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,marble);
    for(const axis of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])
      gl.texParameteri(gl.TEXTURE_2D,axis,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.uniform1f(gl.getUniformLocation(program,'textureAspect'),marble.width/marble.height);
    canvas.hidden=false;
    reset();
    new ResizeObserver(reset).observe(canvas);
    reducedMotion.addEventListener('change',reset);
    document.addEventListener('visibilitychange',reset);
  };
  marble.src=new URL('./marble.webp',import.meta.url);
}
