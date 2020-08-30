(this["webpackJsonpastral-recess"]=this["webpackJsonpastral-recess"]||[]).push([[0],{30:function(e,n,t){e.exports=t(41)},40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),i=t(23),o=t.n(i),c=t(4),u=t(28),l=t(29),s=t(10),d=t.n(s),m=t(6),f=t(7),p=function(){var e=window.AudioContext||window.webkitAudioContext;if(!e)throw new Error("It appears that this browser does not support the Web Audio API.  Please switch to a modern browser.");var n=new e,t=n.createGain(),r=n.createAnalyser();return t.gain.value=0,t.connect(r),r.connect(n.destination),[n,t,r]},v=function(e,n,t){var r=t.payload;e.gain.linearRampToValueAtTime(r,n.currentTime+.1)},x=function(e,n){var t=n.payload,r=t.audioNodeIndex,a=t.parameter,i=t.value;e[r][a].value=i},g=function(e,n,t,r){var a=r.payload,i=a.mixer,o=a.audioNodes;n.gain.linearRampToValueAtTime(i.masterVolume,e.currentTime+4),t.forEach((function(n,t){o[t].frequency&&n.frequency.linearRampToValueAtTime(o[t].frequency,e.currentTime+4),o[t].detune&&n.detune.linearRampToValueAtTime(o[t].detune,e.currentTime+4),o[t].gain&&n.gain.linearRampToValueAtTime(o[t].gain,e.currentTime+4),o[t].Q&&n.Q.linearRampToValueAtTime(o[t].Q,e.currentTime+4)}))},b=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t.type,a=void 0===r?"sine":r,i=t.frequency,o=void 0===i?200:i,c=t.detune,u=void 0===c?0:c,l=t.gain,s=void 0===l?.5:l,d=t.pan,m=void 0===d?0:d;if(!e||!e.createOscillator)throw new Error("Please provide an AudioContext.");var f=e.createOscillator(),p=e.createGain(),v=e.createAnalyser(),x=e.createStereoPanner();return f.type=a,f.frequency.value=o,f.detune.value=u,p.gain.value=s,x.pan.value=m,f.connect(p),p.connect(v),v.connect(x),f.start(),x.connect(n),[f,p,v,x]},h=function(e){var n,t,r,a,i,o,c;n=t=r=a=i=o=c=0;var u=e.createScriptProcessor(4096,1,1);return u.onaudioprocess=function(e){for(var u=e.outputBuffer.getChannelData(0),l=0;l<4096;l++){var s=2*Math.random()-1;n=.99886*n+.0555179*s,t=.99332*t+.0750759*s,r=.969*r+.153852*s,a=.8665*a+.3104856*s,i=.55*i+.5329522*s,o=-.7616*o-.016898*s,u[l]=n+t+r+a+i+o+c+.5362*s,u[l]*=.11,c=.115926*s}},u},y=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=t.filterType,a=void 0===r?"lowpass":r,i=t.filterFrequency,o=void 0===i?5e3:i,c=t.filterQ,u=void 0===c?0:c,l=t.gain,s=void 0===l?.01:l,d=h(e),m=e.createBiquadFilter(),f=e.createGain();return m.type=a,m.frequency.value=o,m.Q.value=u,f.gain.value=s,d.connect(m),m.connect(f),f.connect(n),[m,f]},O=d.a.mark(w),E=d.a.mark(q),j=d.a.mark(A);function w(){var e,n,t,r,a,i,o,c,u,l,s,h,E,j,w,q,A,V,N,P;return d.a.wrap((function(d){for(;;)switch(d.prev=d.next){case 0:return e=p(),n=Object(m.a)(e,3),t=n[0],r=n[1],a=n[2],i=b(t,r,{frequency:79,detune:-19,pan:-1}),o=Object(m.a)(i,3),c=o[0],u=o[1],l=o[2],s=b(t,r,{frequency:78,pan:1}),h=Object(m.a)(s,3),E=h[0],j=h[1],w=h[2],q=y(t,r),A=Object(m.a)(q,2),V=A[0],N=A[1],P=[c,E,N,V,u,j],d.next=7,Object(f.c)("@action.activePreset.mixer.setMasterVolume",v,r,t);case 7:return d.next=9,Object(f.c)("@action.activePreset.setAudioNodeParameter",x,P);case 9:return d.next=11,Object(f.c)("@action.changeActivePreset",g,t,r,P);case 11:return d.next=13,Object(f.b)({type:"@action.createVisualizer",payload:a});case 13:return d.next=15,Object(f.b)({type:"@action.createOsc1Visualizer",payload:l});case 15:return d.next=17,Object(f.b)({type:"@action.createOsc2Visualizer",payload:w});case 17:case"end":return d.stop()}}),O)}function q(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(f.c)("@action.grantUserPermissionForAudio",w);case 2:case"end":return e.stop()}}),E)}function A(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(f.a)([q()]);case 2:case"end":return e.stop()}}),j)}var V=Object(l.a)(),N=[V],P={theme:"light",toggleTheme:Object(c.b)((function(e){e.theme="light"===e.theme?"dark":"light"})),hasUserPermissionForAudio:!1,grantUserPermissionForAudio:Object(c.b)((function(e){e.hasUserPermissionForAudio=!0})),errors:["Must get permission to use AudioContext."],createError:Object(c.b)((function(e,n){e.errors=[].concat(Object(u.a)(e.errors),[n])})),activePreset:{mixer:{masterVolume:0,setMasterVolume:Object(c.b)((function(e,n){e.masterVolume=n}))},audioNodes:[{frequency:72,detune:-19},{frequency:71.6,detune:0},{gain:.01},{frequency:5e3,Q:0},{gain:.5},{gain:.5}],setAudioNodeParameter:Object(c.b)((function(e,n){var t=n.audioNodeIndex,r=n.parameter,a=n.value;e.audioNodes[t][r]=a}))},changeActivePreset:Object(c.b)((function(e,n){var t=n.mixer,r=n.audioNodes;e.activePreset.mixer=t,e.activePreset.audioNodes=r})),presets:[{mixer:{masterVolume:0},audioNodes:[{frequency:72,detune:-19},{frequency:71.6,detune:0},{gain:.01},{frequency:5e3,Q:0},{gain:.5},{gain:.5}]},{mixer:{masterVolume:.5},audioNodes:[{frequency:163.733,detune:-19},{frequency:158.133,detune:39.667},{gain:.0103},{frequency:3367,Q:0},{gain:.5},{gain:.5}]},{mixer:{masterVolume:0},audioNodes:[{frequency:72,detune:-19},{frequency:71.6,detune:0},{gain:.01},{frequency:5e3,Q:0},{gain:.5},{gain:.5}]},{mixer:{masterVolume:0},audioNodes:[{frequency:72,detune:-19},{frequency:71.6,detune:0},{gain:.01},{frequency:5e3,Q:0},{gain:.5},{gain:.5}]},{mixer:{masterVolume:0},audioNodes:[{frequency:72,detune:-19},{frequency:71.6,detune:0},{gain:.01},{frequency:5e3,Q:0},{gain:.5},{gain:.5}]},{mixer:{masterVolume:0},audioNodes:[{frequency:72,detune:-19},{frequency:71.6,detune:0},{gain:.01},{frequency:5e3,Q:0},{gain:.5},{gain:.5}]}],visualizer:null,createVisualizer:Object(c.b)((function(e,n){e.visualizer=n})),oscillator1Visualizer:null,createOsc1Visualizer:Object(c.b)((function(e,n){e.oscillator1Visualizer=n})),oscillator2Visualizer:null,createOsc2Visualizer:Object(c.b)((function(e,n){e.oscillator2Visualizer=n}))},T=Object(c.c)(P,{middleware:N});V.run(A);var k=T,C=t(8),I=t(9);function z(){var e=Object(C.a)(['\n  font-size: 2rem;\n  font-family: "Roboto Mono";\n  font-weight: 400;\n  font-style: normal;\n']);return z=function(){return e},e}var F=I.a.button(z()),Q=t(14);function R(){var e=Object(C.a)(["\n  display: flex;\n  flex-direction: row;\n"]);return R=function(){return e},e}function M(){var e=Object(C.a)(["\n  display: block;\n  text-align: center;\n"]);return M=function(){return e},e}function U(){var e=Object(C.a)(["\n  margin-right: 100px;\n"]);return U=function(){return e},e}function B(){var e=Object(C.a)(["\n  display: flex;\n  flex-direction: row;\n  margin: 20px;\n  padding: 20px;\n"]);return B=function(){return e},e}var D=I.a.div(B()),S=I.a.div(U()),G=I.a.label(M()),W=I.a.div(R());var J=function(){var e=Object(r.useRef)(),n=Object(r.useRef)(),t=Object(r.useRef)(),i=Object(Q.a)({},Object(c.e)((function(e){return e.activePreset.mixer})),{},Object(c.d)((function(e){return e.activePreset.mixer}))),o=Object(c.d)((function(e){return e.changeActivePreset})),u=Object(c.e)((function(e){return e.presets})),l=Object(c.e)((function(e){return e.hasUserPermissionForAudio})),s=Object(c.d)((function(e){return e.grantUserPermissionForAudio}));return l?a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("h3",null,"presets"),a.a.createElement(F,{onClick:function(){return o(u[0])}},"1"),a.a.createElement(F,{onClick:function(){return o(u[1])}},"2"),a.a.createElement(F,{onClick:function(){return o(u[2])}},"3"),a.a.createElement(F,{onClick:function(){return o(u[3])}},"4"),a.a.createElement(F,{onClick:function(){return o(u[4])}},"5"),a.a.createElement(F,{onClick:function(){return o(u[5])}},"6")),a.a.createElement(D,null,a.a.createElement(S,null,a.a.createElement(G,null,"left oscillator"),a.a.createElement(W,null,a.a.createElement(K,{audioNodeIndex:0,parameter:"frequency",step:1e-4,min:20,max:300}),a.a.createElement(K,{audioNodeIndex:0,parameter:"detune",step:1e-4,min:-50,max:50}),a.a.createElement(K,{audioNodeIndex:4,parameter:"gain",step:1e-4,min:0,max:.5}))),a.a.createElement(S,null,a.a.createElement(G,null,"right oscillator"),a.a.createElement(W,null,a.a.createElement(K,{audioNodeIndex:1,parameter:"frequency",min:20,max:300}),a.a.createElement(K,{audioNodeIndex:1,parameter:"detune",min:-50,max:50}),a.a.createElement(K,{audioNodeIndex:5,parameter:"gain",min:0,max:.5}))),a.a.createElement(S,null,a.a.createElement(G,null,"pink noise"),a.a.createElement(W,null,a.a.createElement(K,{audioNodeIndex:3,parameter:"frequency",step:1e-4,min:1,max:1e4}),a.a.createElement(K,{audioNodeIndex:3,parameter:"Q",step:1e-4,min:0,max:15}),a.a.createElement(K,{audioNodeIndex:2,parameter:"gain",step:1e-4,min:0,max:.25}))),a.a.createElement(H,{name:"master volume",step:1e-4,min:0,max:1,values:[i.masterVolume],onChange:function(e){var n=Object(m.a)(e,1)[0];return i.setMasterVolume(n)}})),a.a.createElement("canvas",{ref:n,style:{width:"500px",height:"500px"}}),a.a.createElement("canvas",{ref:t,style:{width:"500px",height:"500px"}}),a.a.createElement("canvas",{ref:e,id:"visualizer",style:{width:"500px",height:"500px"}})):a.a.createElement(F,{onClick:function(){return s()}},"Grant permission for audio")},$=t(15);var H=function(e){var n=e.parameter,t=e.step,r=e.min,i=e.max,o=e.values,c=e.onChange;return a.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",margin:"20px"}},a.a.createElement($.Range,{step:t,min:r,max:i,direction:$.Direction.Up,values:o,onChange:c,renderTrack:function(e){var n=e.props,t=e.children;return a.a.createElement("div",{onMouseDown:n.onMouseDown,onTouchStart:n.onTouchStart,style:Object(Q.a)({},n.style,{flexGrow:1,width:"36px",display:"flex",justifyContent:"center",height:"300px"})},a.a.createElement("div",{ref:n.ref,style:{width:"5px",height:"100%",borderRadius:"4px",background:Object($.getTrackBackground)({colors:["#548BF4","#ccc"],values:o,min:r,max:i,direction:$.Direction.Up}),alignSelf:"center"}},t))},renderThumb:function(e){var n=e.props,t=e.isDragged;return a.a.createElement("div",Object.assign({},n,{style:Object(Q.a)({},n.style,{height:"42px",width:"42px",borderRadius:"4px",backgroundColor:"#FFF",display:"flex",justifyContent:"center",alignItems:"center",boxShadow:"0px 2px 6px #AAA"})}),a.a.createElement("div",{style:{width:"16px",height:"5px",backgroundColor:t?"#548BF4":"#CCC"}}))}}),a.a.createElement("label",null,n,a.a.createElement("br",null),o[0]))};var K=function(e){var n=e.audioNodeIndex,t=e.parameter,r=e.step,i=void 0===r?1e-4:r,o=e.min,u=e.max,l={parameter:t,step:i,min:o,max:u},s=Object(c.e)((function(e){return e.activePreset.audioNodes})),d=Object(c.d)((function(e){return e.activePreset.setAudioNodeParameter}));return a.a.createElement(H,Object.assign({},l,{values:[s[n][t]],onChange:function(e){var r=Object(m.a)(e,1)[0];return d({audioNodeIndex:n,parameter:t,value:r})}}))};var L=function(){return a.a.createElement(c.a,{store:k},a.a.createElement(J,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(40);o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[30,1,2]]]);
//# sourceMappingURL=main.fc40622f.chunk.js.map