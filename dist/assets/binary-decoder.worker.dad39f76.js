(function(){"use strict";var T=(e=>(e[e.POSITION_CARTESIAN=0]="POSITION_CARTESIAN",e[e.COLOR_PACKED=1]="COLOR_PACKED",e[e.COLOR_FLOATS_1=2]="COLOR_FLOATS_1",e[e.COLOR_FLOATS_255=3]="COLOR_FLOATS_255",e[e.NORMAL_FLOATS=4]="NORMAL_FLOATS",e[e.FILLER=5]="FILLER",e[e.INTENSITY=6]="INTENSITY",e[e.CLASSIFICATION=7]="CLASSIFICATION",e[e.NORMAL_SPHEREMAPPED=8]="NORMAL_SPHEREMAPPED",e[e.NORMAL_OCT16=9]="NORMAL_OCT16",e[e.NORMAL=10]="NORMAL",e))(T||{});const I={DATA_TYPE_DOUBLE:{ordinal:0,size:8},DATA_TYPE_FLOAT:{ordinal:1,size:4},DATA_TYPE_INT8:{ordinal:2,size:1},DATA_TYPE_UINT8:{ordinal:3,size:1},DATA_TYPE_INT16:{ordinal:4,size:2},DATA_TYPE_UINT16:{ordinal:5,size:2},DATA_TYPE_INT32:{ordinal:6,size:4},DATA_TYPE_UINT32:{ordinal:7,size:4},DATA_TYPE_INT64:{ordinal:8,size:8},DATA_TYPE_UINT64:{ordinal:9,size:8}};function O(e,t,r){return{name:e,type:t,numElements:r,byteSize:r*t.size}}const S=O(1,I.DATA_TYPE_INT8,4),E={POSITION_CARTESIAN:O(0,I.DATA_TYPE_FLOAT,3),RGBA_PACKED:S,COLOR_PACKED:S,RGB_PACKED:O(1,I.DATA_TYPE_INT8,3),NORMAL_FLOATS:O(4,I.DATA_TYPE_FLOAT,3),FILLER_1B:O(5,I.DATA_TYPE_UINT8,1),INTENSITY:O(6,I.DATA_TYPE_UINT16,1),CLASSIFICATION:O(7,I.DATA_TYPE_UINT8,1),NORMAL_SPHEREMAPPED:O(8,I.DATA_TYPE_UINT8,2),NORMAL_OCT16:O(9,I.DATA_TYPE_UINT8,2),NORMAL:O(10,I.DATA_TYPE_FLOAT,3)};class d{constructor(t){this.versionMinor=0,this.version=t;const r=t.indexOf(".")===-1?t.length:t.indexOf(".");this.versionMajor=parseInt(t.substr(0,r),10),this.versionMinor=parseInt(t.substr(r+1),10),isNaN(this.versionMinor)&&(this.versionMinor=0)}newerThan(t){const r=new d(t);return this.versionMajor>r.versionMajor?!0:this.versionMajor===r.versionMajor&&this.versionMinor>r.versionMinor}equalOrHigher(t){const r=new d(t);return this.versionMajor>r.versionMajor?!0:this.versionMajor===r.versionMajor&&this.versionMinor>=r.versionMinor}upTo(t){return!this.newerThan(t)}}class N{constructor(t){this.tmp=new ArrayBuffer(4),this.tmpf=new Float32Array(this.tmp),this.tmpu8=new Uint8Array(this.tmp),this.u8=new Uint8Array(t)}getUint32(t){return this.u8[t+3]<<24|this.u8[t+2]<<16|this.u8[t+1]<<8|this.u8[t]}getUint16(t){return this.u8[t+1]<<8|this.u8[t]}getFloat32(t){const r=this.tmpu8,s=this.u8,n=this.tmpf;return r[0]=s[t+0],r[1]=s[t+1],r[2]=s[t+2],r[3]=s[t+3],n[0]}getUint8(t){return this.u8[t]}}const h=Math.sign||function(e){return(e=+e)==0||e!=e?e:e<0?-1:1};function b(e){const t=e.data.buffer,r=e.data.pointAttributes,s={attributeBuffers:{},currentOffset:0,data:new N(t),mean:[0,0,0],nodeOffset:e.data.offset,numPoints:e.data.buffer.byteLength/r.byteSize,pointAttributes:r,scale:e.data.scale,tightBoxMax:[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],tightBoxMin:[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],transferables:[],version:new d(e.data.version)};for(const i of s.pointAttributes.attributes)P(i,s),s.currentOffset+=i.byteSize;const n=new ArrayBuffer(s.numPoints*4),a=new Uint32Array(n);for(let i=0;i<s.numPoints;i++)a[i]=i;s.attributeBuffers[T.CLASSIFICATION]||y(s);const u={buffer:t,mean:s.mean,attributeBuffers:s.attributeBuffers,tightBoundingBox:{min:s.tightBoxMin,max:s.tightBoxMax},indices:n};postMessage(u,s.transferables)}function y(e){const t=new ArrayBuffer(e.numPoints*4),r=new Float32Array(t);for(let s=0;s<e.numPoints;s++)r[s]=0;e.attributeBuffers[T.CLASSIFICATION]={buffer:t,attribute:E.CLASSIFICATION}}function P(e,t){const r=g(e,t);r!==void 0&&(t.attributeBuffers[r.attribute.name]=r,t.transferables.push(r.buffer))}function g(e,t){switch(e.name){case T.POSITION_CARTESIAN:return L(e,t);case T.COLOR_PACKED:return m(e,t);case T.INTENSITY:return B(e,t);case T.CLASSIFICATION:return C(e,t);case T.NORMAL_SPHEREMAPPED:return F(e,t);case T.NORMAL_OCT16:return p(e,t);case T.NORMAL:return R(e,t);default:return}}function L(e,t){const r=new ArrayBuffer(t.numPoints*4*3),s=new Float32Array(r);for(let n=0;n<t.numPoints;n++){let a,u,i;t.version.newerThan("1.3")?(a=t.data.getUint32(t.currentOffset+n*t.pointAttributes.byteSize+0)*t.scale,u=t.data.getUint32(t.currentOffset+n*t.pointAttributes.byteSize+4)*t.scale,i=t.data.getUint32(t.currentOffset+n*t.pointAttributes.byteSize+8)*t.scale):(a=t.data.getFloat32(n*t.pointAttributes.byteSize+0)+t.nodeOffset[0],u=t.data.getFloat32(n*t.pointAttributes.byteSize+4)+t.nodeOffset[1],i=t.data.getFloat32(n*t.pointAttributes.byteSize+8)+t.nodeOffset[2]),s[3*n+0]=a,s[3*n+1]=u,s[3*n+2]=i,t.mean[0]+=a/t.numPoints,t.mean[1]+=u/t.numPoints,t.mean[2]+=i/t.numPoints,t.tightBoxMin[0]=Math.min(t.tightBoxMin[0],a),t.tightBoxMin[1]=Math.min(t.tightBoxMin[1],u),t.tightBoxMin[2]=Math.min(t.tightBoxMin[2],i),t.tightBoxMax[0]=Math.max(t.tightBoxMax[0],a),t.tightBoxMax[1]=Math.max(t.tightBoxMax[1],u),t.tightBoxMax[2]=Math.max(t.tightBoxMax[2],i)}return{buffer:r,attribute:e}}function m(e,t){const r=new ArrayBuffer(t.numPoints*3),s=new Uint8Array(r);for(let n=0;n<t.numPoints;n++)s[3*n+0]=t.data.getUint8(t.currentOffset+n*t.pointAttributes.byteSize+0),s[3*n+1]=t.data.getUint8(t.currentOffset+n*t.pointAttributes.byteSize+1),s[3*n+2]=t.data.getUint8(t.currentOffset+n*t.pointAttributes.byteSize+2);return{buffer:r,attribute:e}}function B(e,t){const r=new ArrayBuffer(t.numPoints*4),s=new Float32Array(r);for(let n=0;n<t.numPoints;n++)s[n]=t.data.getUint16(t.currentOffset+n*t.pointAttributes.byteSize);return{buffer:r,attribute:e}}function C(e,t){const r=new ArrayBuffer(t.numPoints),s=new Uint8Array(r);for(let n=0;n<t.numPoints;n++)s[n]=t.data.getUint8(t.currentOffset+n*t.pointAttributes.byteSize);return{buffer:r,attribute:e}}function F(e,t){const r=new ArrayBuffer(t.numPoints*4*3),s=new Float32Array(r);for(let n=0;n<t.numPoints;n++){const a=t.data.getUint8(t.currentOffset+n*t.pointAttributes.byteSize+0),u=t.data.getUint8(t.currentOffset+n*t.pointAttributes.byteSize+1),i=a/255,l=u/255;let f=i*2-1,o=l*2-1,A=1;const _=-1,M=f*-f+o*-o+A*-_;A=M,f=f*Math.sqrt(M),o=o*Math.sqrt(M),f=f*2,o=o*2,A=A*2-1,s[3*n+0]=f,s[3*n+1]=o,s[3*n+2]=A}return{buffer:r,attribute:e}}function p(e,t){const r=new ArrayBuffer(t.numPoints*4*3),s=new Float32Array(r);for(let n=0;n<t.numPoints;n++){const a=t.data.getUint8(t.currentOffset+n*t.pointAttributes.byteSize+0),u=t.data.getUint8(t.currentOffset+n*t.pointAttributes.byteSize+1),i=a/255*2-1,l=u/255*2-1;let f=1-Math.abs(i)-Math.abs(l),o=0,A=0;f>=0?(o=i,A=l):(o=-(l/h(l)-1)/h(i),A=-(i/h(i)-1)/h(l));const _=Math.sqrt(o*o+A*A+f*f);o=o/_,A=A/_,f=f/_,s[3*n+0]=o,s[3*n+1]=A,s[3*n+2]=f}return{buffer:r,attribute:e}}function R(e,t){const r=new ArrayBuffer(t.numPoints*4*3),s=new Float32Array(r);for(let n=0;n<t.numPoints;n++){const a=t.data.getFloat32(t.currentOffset+n*t.pointAttributes.byteSize+0),u=t.data.getFloat32(t.currentOffset+n*t.pointAttributes.byteSize+4),i=t.data.getFloat32(t.currentOffset+n*t.pointAttributes.byteSize+8);s[3*n+0]=a,s[3*n+1]=u,s[3*n+2]=i}return{buffer:r,attribute:e}}onmessage=b})();