var vbuf;
var pstart;
var nump;

var canvasElement;
var gl;
window.onload = function() {
  canvasElement = document.getElementById("glCanvas");
  

  gl = canvasElement.getContext("webgl");
  if (!gl) {
    gl = canvasElement.getContext("experimental-webgl");
    if (!gl) alert("WebGL not supported!");
  }
  
  nump = 20000;
  pstart = new Float32Array(nump*2);
  var i = pstart.length;
  while (i--) {
    pstart[i] = Math.random() * 2 - 1;
  }
  
  vbuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,vbuf);
  gl.bufferData(gl.ARRAY_BUFFER,pstart,gl.STATIC_DRAW);
  
  var vsh = gl.createShader(gl.VERTEX_SHADER);
  var vertexShaderSource = `
    \nprecision mediump float;
    attribute vec2 Vertex; 
    varying vec2 V; 
    uniform float T;
    void main(void){
        gl_PointSize = 3.;
        V = Vertex;
        vec2 wave = vec2(0.05 * sin(-T * 32.0 + 10.0 * V.x),0);        
        gl_Position = vec4(V + wave,0.,1.);
    }
  `;
  gl.shaderSource(vsh,vertexShaderSource);
  gl.compileShader(vsh);
  
  var fsh = gl.createShader(gl.FRAGMENT_SHADER);
  var fragmentShaderSource = `
  \nprecision mediump float; 
  varying vec2 V; 
  uniform float T;
  
  void main(void) {
    gl_FragColor = vec4(.0,.0,.0,1);
  }
  `;
  gl.shaderSource(fsh, fragmentShaderSource);
  
  gl.compileShader(fsh);
  
  var program = gl.createProgram();
  gl.attachShader(program,vsh);
  gl.attachShader(program,fsh);
  gl.linkProgram(program);
  gl.useProgram(program);
  
  var vattr = gl.getAttribLocation(program,"Vertex");
  gl.enableVertexAttribArray(vattr);
  gl.vertexAttribPointer(vbuf,2,gl.FLOAT,false,4,0);
  
  tuni = gl.getUniformLocation(program,"T");
  
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  
  gl.disable(gl.DEPTH_TEST);
  
  gl.clearColor(1,1,1,1);
  
  if (!window.requestAnimationFrame) window.requestAnimationFrame = setTimeout;
    
  startTime = Date.now();
  render();
}
                
 var tuni,startTime;      
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform1f(tuni,(Date.now()-startTime)/30000.);
  gl.drawArrays(gl.POINTS,0,nump);
  
  window.requestAnimationFrame(render);
}