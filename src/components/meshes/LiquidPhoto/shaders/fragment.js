import snoise from "@/lib/shaders/snoise";

const fragment = /* glsl */ `
varying vec2 vUv;


uniform float uTime;
uniform float   uFreq;
uniform float   uSpeed;
uniform vec2    uMouse;
uniform  sampler2D  uTex;
uniform vec2 uResolution;
uniform vec2 uImageBounds;

${snoise}

vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }

void main() {

  //Image resize
    vec2 s = aspect(uResolution);
    vec2 i = aspect(uImageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) + vec2(0.5, 0.5);


    //Noise
    float noise = snoise(vec3(zUv * uFreq, uTime)) * 0.05;
    vec3 color = texture2D(uTex, zUv+noise).rgb;

    //add ripples
   float distToCenter = length(zUv - uMouse - 0.5);
   float d = sin(distToCenter*60.0 - uTime*uSpeed);
   vec2 dir = normalize(zUv - uMouse - 0.5);
   vec2 rippleCords = zUv + noise* d*dir;

   color =  texture2D(uTex, rippleCords).rgb;





   // color = texture2D(uTex, zUv).xyz;
    gl_FragColor=vec4(color,1.0);
  
}

`;

export default fragment;
