  precision highp float;
  varying vec2 uv;
  uniform vec2 res;
  uniform vec2 blob0;	
  uniform vec2 blob1;
  uniform vec2 blob2;
  uniform vec2 blob3;
  uniform vec2 blob4;
  uniform float time;
  
  vec2 hash( vec2 x ){  // replace this by something better
      const vec2 k = vec2( 0.3183099, 0.3678794 );
      x = x*k + k.yx;
      return -1.0 + 2.0 * fract( 16.12341 * k*fract( x.x*x.y*(x.x+x.y)) );
  }
  
  float noise( in vec2 p ){
      vec2 i = floor( p );
      vec2 f = fract( p );
      
      vec2 u = f*f*(3.0-2.0*f);
      
      return 0.5 + mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                             dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                        mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                             dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
  }
  
  vec3 randomColor(in vec2 p){
    vec2 pp = p + vec2(-4200. +500.*sin(time),-8000.);
    return vec3(
      noise(pp * 0.003),
      noise((vec2(124.2, 74.24154121) + pp) * 0.003),
      noise((vec2(57.001211411, -122.50012111) + pp) * 0.003));
  }
  
  vec4 getBlob(vec2 p, vec2 c){
    float d = distance(p, c);
    float r = 600.0;
    float a = atan( c.y - p.y , c.x - p.x);
    float a2 = atan( p.y + 200., p.x - c.x);
    float a3 = noise(c * 0.002 + .1 * vec2(cos(a), sin(a)));
    float a4 = noise(c * 0.002 + .1 * vec2(cos(a+time*3.), sin(a+time*3.)));
    float edge = r * a3;
    float s = (sin ( 10.0 * a) + 1.) * .25;
  
    vec4 col = vec4(1., 1., 1., 1.);
    if(d < edge){
      float ratio = d/edge;
      float saturation = 1.0;
      vec3 col0 = randomColor(c * 0.3);
      vec3 col1 = randomColor(c * 0.3 - vec2(40, 40));
      vec3 col2 = randomColor(c * 0.3 + vec2(40, 40));
  
      float border = 0.6;
  
      float ss = smoothstep(0.0, border, ratio);
      vec3 resColor = mix(col0,col1, ss);
      if(ratio >= border){
        ss = smoothstep(border, 1.0, ratio);
        resColor = mix(col1,col2, ss);
      }
  
      resColor = mix(resColor, vec3(1.), smoothstep(mix(1.,.2,a4),1.,ratio));
      col = vec4(resColor,1);
    }
    return col;
  }
  
  void main() {
    vec2 p = vec2(uv.x, 1. - uv.y) * res;
    vec2 c = res / 2.;
    
    vec4 col0 = getBlob(p, blob0);
    vec4 col1 = getBlob(p, blob1);
    vec4 col2 = getBlob(p, blob2);
    vec4 col3 = getBlob(p, blob3);
    vec4 col4 = getBlob(p, blob4);
  
    gl_FragColor = col0 * col1 * col2 * col3 * col4 ;
  }