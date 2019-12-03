var vbuf;
var pstart;
var canvasElement;
var gl;
window.onload = function() {
  canvasElement = document.getElementById("glCanvas");  

  gl = canvasElement.getContext("webgl");
  if (!gl) {
    gl = canvasElement.getContext("experimental-webgl");
    if (!gl) alert("WebGL not supported!");
  }
  

  pstart = new Float32Array(4*2);
  pstart[0] = -1;
  pstart[1] = 1;
  pstart[2] = -1;
  pstart[3] = -1;
  pstart[4] = 1;
  pstart[5] = -1;
  pstart[6] = 1;
  pstart[7] = 1;

  indices = [3,2,1,3,1,0];  
  
  vbuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,vbuf);
  gl.bufferData(gl.ARRAY_BUFFER,pstart,gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var ibuf = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new this.Uint16Array(indices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  
  var vsh = gl.createShader(gl.VERTEX_SHADER);
  var vertexShaderSource = `
    \nprecision mediump float;
    attribute vec2 Vertex; 
    void main(void){
        gl_Position = vec4(Vertex,0.,1.);
    }
  `;
  gl.shaderSource(vsh,vertexShaderSource);
  gl.compileShader(vsh);
  
  var fsh = gl.createShader(gl.FRAGMENT_SHADER);
  var fragmentShaderSource = `
  \nprecision mediump float;
	  
 	 uniform vec2 iResolution;
	uniform vec2 sourcesPos[3];	
	
	  #define PI  3.14159265359

	vec2 cmul( vec2 a, vec2 b )  { return vec2( a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x ); }
	vec2 cdiv( vec2 a, vec2 b )  { float d = dot(b,b); return vec2( dot(a,b), a.y*b.x - a.x*b.y ) / d; }
	vec2 cexp( vec2 z ){ return vec2(cos(z.y), sin(z.y)) * exp(z.x); }
  
  
  void main(void) {
	vec2 j = vec2(0,1);

	vec2 uv = gl_FragCoord.xy/iResolution.y;
	uv *= 30.0;	
	float speed = 344.0;
    float f = 50.0;
    
	vec2 phis = vec2(0.0);
    float volume = 0.1;
	vec2 k = vec2(2.0 * PI * f / speed, 0);    
    for(int i = 0; i < 3; i++){
		float dist =  distance(sourcesPos[i], uv);
    	vec2 insideExp = cmul(cmul(-j, vec2(dist, 0)), k);
        
        vec2 phi = cdiv(cmul(vec2(volume,0.0), cexp(insideExp)),vec2(dist,0.0));
        phis = phi + phis;
    }
	    
   	float magP = sqrt(pow(phis.x,2.0) + pow(phis.y,2.0));   
	
    vec3 col = vec3(15.0*magP);
	

	gl_FragColor = vec4(col,1);    
    
  }
  `;
  gl.shaderSource(fsh, fragmentShaderSource);
  
  
  gl.compileShader(fsh);
  
  var program = gl.createProgram();
  gl.attachShader(program,vsh);
  gl.attachShader(program,fsh);
  gl.linkProgram(program);
  gl.useProgram(program);

  uResolution = gl.getUniformLocation(program, "iResolution");
  uSourcePos = gl.getUniformLocation(program, "sourcesPos");

  gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuf);

  
  var vattr = gl.getAttribLocation(program,"Vertex");
  gl.enableVertexAttribArray(vattr);
  gl.vertexAttribPointer(vattr,2,gl.FLOAT,false,0,0);
  
  

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  
  gl.enable(gl.DEPTH_TEST);
  
  gl.clearColor(.1,1,1,1);
  
  if (!window.requestAnimationFrame) window.requestAnimationFrame = setTimeout;
    
  render();
}
                
 var tuni,startTime, uResolution, uSourcePos;      
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2fv(uResolution,[1600,1600]);
  var locations = [
	10.0, 10.0,
	20.0, 20.0,
	10.0, 20.0
	];
	gl.uniform2fv(uSourcePos, locations); 
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
	
  
  window.requestAnimationFrame(render);
}