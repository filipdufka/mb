import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import { Vector } from "p5";
import "./omniSources.glsl";

const shaders = Shaders.create({
  ColoredDisc: {
    frag: GLSL`
  precision highp float;

  uniform vec2 res;

  uniform float locations[10];
  uniform float scale;
  uniform float volume;
  uniform float frequency;
	
	  #define PI  3.14159265359

	vec2 cmul( vec2 a, vec2 b )  { return vec2( a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x ); }
	vec2 cdiv( vec2 a, vec2 b )  { float d = dot(b,b); return vec2( dot(a,b), a.y*b.x - a.x*b.y ) / d; }
	vec2 cexp( vec2 z ){ return vec2(cos(z.y), sin(z.y)) * exp(z.x); }
  
  float log10(float x) {return 0.43429448190325176 * log(x);}

  void main(void) {
  vec2 j = vec2(0,1);

  vec2 uv = gl_FragCoord.xy/res.y;
  uv = vec2(uv.x, 1.0 - uv.y);
  uv *= scale;	

	float speed = 344.0;
    
	vec2 phis = vec2(0.0);
  vec2 k = vec2(2.0 * PI * frequency / speed, 0);  
  //A0 = -(R.^2)./(1+j*k*R).*exp(-j*k*R);

    for(int i = 0; i < 5; i++){
      vec2 pos = vec2(locations[i*2], locations[i*2 + 1]);
        if(pos.x >= 0.0){
          float dist =  distance(scale * pos / 800.0, uv);
          vec2 insideExp = cmul(cmul(-j, vec2(dist, 0)), k);
          
          vec2 phi = cdiv(cmul(vec2(volume,0.0), cexp(insideExp)),vec2(dist,0.0));
          phis = phi + phis;
        }
      
    }
	    
     float magP = sqrt(pow(phis.x,2.0) + pow(phis.y,2.0));   
     
    float decibels = 20.0 * log10(magP);
    vec3 col = vec3(0.0);
    if(decibels > -6.0){
      col = vec3(0.0,0.066,1.0);
    }	
    if(decibels > -3.0){
      col = vec3(0.0, 0.3, 1.0);
    }	
    if(decibels > 0.0){
      col = vec3(0.0, 1.0, 1.0);
    }	
    if(decibels > 3.0){
      col = vec3(0.0, 1.0, 0.5);
    }	
    if(decibels > 6.0){
      col = vec3(0.3, 1.0, 0.15);
    }	
    if(decibels > 9.0){
      col = vec3(0.7, 0.9, 0.02);
    }	
    if(decibels > 12.0){
      col = vec3(1.0, 1.0, 0.0);
    }	
    if(decibels > 15.0){
      col = vec3(1.0, 0.5, 0.0);
    }	
    if(decibels > 18.0){
      col = vec3(0.93, 0.15, 0.0);
    }
    if(decibels > 21.0){
      col = vec3(1.0, 0.0, 0.0);
    }	

	gl_FragColor = vec4(col,1);    
    
  }
  `,
  },
});

class ColoredDisc extends Component<MBOmniSourcesWebGLProps, {}> {
  render() {
    // fromColor/toColor must be array of 3 numbers because defined as vec3 type.
    const { res } = this.props;
    const locations = [
      this.props.positions[0].x,this.props.positions[0].y,
      this.props.positions[1].x,this.props.positions[1].y,
      this.props.positions[2].x,this.props.positions[2].y,
      this.props.positions[3].x,this.props.positions[3].y,
      this.props.positions[4].x,this.props.positions[4].y
      ];
    const blob0 = [this.props.positions[0].x, this.props.positions[0].y];
    const blob1 = [this.props.positions[1].x, this.props.positions[1].y];
    const blob2 = [this.props.positions[2].x, this.props.positions[2].y];
    const blob3 = [this.props.positions[3].x, this.props.positions[3].y];
    const blob4 = [this.props.positions[4].x, this.props.positions[4].y];
    const time = new Date().getTime();
    const scale = 30.0;
    const volume = 3.0;
    const frequency = 81.5*4;
    return (
      <Node
        shader={shaders.ColoredDisc}
        uniforms={{ res, locations, scale, volume, frequency }}
      />
    );
  }
}

export default class MBOmniSourcesWebGL extends Component<MBOmniSourcesWebGLProps, {}> {
  render() {      
    const { positions, res } = this.props;
    return (
      <div className="layer">
        <Surface width={res[0]} height={res[1]}>
          <ColoredDisc positions={positions} res={res} />
        </Surface>
      </div>
    );
  }
}

interface MBOmniSourcesWebGLProps {
    res: number[]; 
    positions: Vector[];
}
