(this["webpackJsonpastral-recess"]=this["webpackJsonpastral-recess"]||[]).push([[0],{30:function(e,t,n){e.exports=n(41)},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),i=n(23),c=n.n(i),o=n(4),l=n(28),s=n(29),u=n(5),m=n.n(u),p=n(7),d=m.a.mark(h),f=m.a.mark(y),x=m.a.mark(O),b=m.a.mark(j),g=m.a.mark(w);function v(e,t,n){console.log("doSetMasterVolume"),console.log("audioContext.currentTime is",t.currentTime),e.gain.linearRampToValueAtTime(n,t.currentTime+.1)}function h(e,t,n){var r;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r=n.payload,a.next=3,Object(p.b)(v,e,t,r);case 3:case"end":return a.stop()}}),d)}function y(e,t){var n,r,a,i;return m.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:n=t.payload,r=n.oscillatorIndex,a=n.parameter,i=n.value,e[r][a].value=i;case 3:case"end":return c.stop()}}),f)}function O(){var e,t,n,r,a,i,c,o,l,s,u,d,f,b,g,v;return m.a.wrap((function(m){for(;;)switch(m.prev=m.next){case 0:return e=window.AudioContext||window.webkitAudioContext,t=new e,n=t.createOscillator(),r=t.createGain(),a=t.createAnalyser(),i=t.createStereoPanner(),n.type="sine",n.frequency.value=72,r.gain.value=.5,i.pan.setValueAtTime(-1,t.currentTime),n.connect(r),r.connect(a),a.connect(i),n.start(),c=t.createOscillator(),o=t.createGain(),l=t.createAnalyser(),s=t.createStereoPanner(),c.type="sine",c.frequency.value=71.6,o.gain.value=.5,s.pan.setValueAtTime(1,t.currentTime),c.connect(o),o.connect(l),l.connect(s),c.start(),4096,u=function(){var e,n,r,a,i,c,o;e=n=r=a=i=c=o=0;var l=t.createScriptProcessor(4096,1,1);return l.onaudioprocess=function(t){for(var l=t.outputBuffer.getChannelData(0),s=0;s<4096;s++){var u=2*Math.random()-1;e=.99886*e+.0555179*u,n=.99332*n+.0750759*u,r=.969*r+.153852*u,a=.8665*a+.3104856*u,i=.55*i+.5329522*u,c=-.7616*c-.016898*u,l[s]=e+n+r+a+i+c+o+.5362*u,l[s]*=.11,o=.115926*u}},l}(),d=t.createBiquadFilter(),f=t.createGain(),u.connect(d),d.connect(f),d.type="lowpass",d.frequency.value=5e3,d.Q.value=0,f.gain.value=.01,(b=t.createGain()).gain.value=0,n.detune.setValueAtTime(-19,t.currentTime),i.connect(b),s.connect(b),f.connect(b),g=t.createAnalyser(),b.connect(g),g.connect(t.destination),v=[n,c,f,d,r,o],m.next=48,Object(p.c)({type:"@action.initializeApp"});case 48:return m.next=50,Object(p.c)({type:"@action.createVisualizer",payload:g});case 50:return m.next=52,Object(p.c)({type:"@action.createOsc1Visualizer",payload:a});case 52:return m.next=54,Object(p.c)({type:"@action.createOsc2Visualizer",payload:l});case 54:return m.next=56,Object(p.d)("@action.mixer.setMasterVolume",h,b,t);case 56:return m.next=58,Object(p.d)("@action.setOscillatorParameter",y,v);case 58:case"end":return m.stop()}}),x)}function j(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.d)("@action.grantUserPermissionForAudio",O);case 2:case"end":return e.stop()}}),b)}function w(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)([j()]);case 2:case"end":return e.stop()}}),g)}var E=Object(s.a)(),P=[E],k={appIsInitialized:!1,initializeApp:Object(o.b)((function(e){e.appIsInitialized=!0})),transport:{isPlaying:!1,isPaused:!0,isStopped:!0,play:Object(o.b)((function(e){e.isPlaying=!0,e.isPaused=!1,e.isStopped=!1})),pause:Object(o.b)((function(e){e.isPlaying=!1,e.isPaused=!0,e.isStopped=!1})),stop:Object(o.b)((function(e){e.isPlaying=!1,e.isPaused=!0,e.isStopped=!0}))},mixer:{masterVolume:0,setMasterVolume:Object(o.b)((function(e,t){e.masterVolume=t}))},oscillators:[{frequency:72,detune:-19},{frequency:71.6,detune:0},{gain:.01},{frequency:5e3,Q:0},{gain:.5},{gain:.5}],setOscillatorParameter:Object(o.b)((function(e,t){var n=t.oscillatorIndex,r=t.parameter,a=t.value;e.oscillators[n][r]=a})),visualizer:null,createVisualizer:Object(o.b)((function(e,t){e.visualizer=t})),oscillator1Visualizer:null,createOsc1Visualizer:Object(o.b)((function(e,t){e.oscillator1Visualizer=t})),oscillator2Visualizer:null,createOsc2Visualizer:Object(o.b)((function(e,t){e.oscillator2Visualizer=t})),hasUserPermissionForAudio:!1,grantUserPermissionForAudio:Object(o.b)((function(e){e.hasUserPermissionForAudio=!0})),theme:"light",toggleTheme:Object(o.b)((function(e){e.theme="light"===e.theme?"dark":"light"})),errors:["Must get permission to use AudioContext."],createError:Object(o.b)((function(e,t){e.errors=[].concat(Object(l.a)(e.errors),[t])}))},V=Object(o.c)(k,{middleware:P});E.run(w);var A=V,z=n(8),S=n(9);function C(){var e=Object(z.a)(['\n  font-size: 2rem;\n  font-family: "Roboto Mono";\n  font-weight: 400;\n  font-style: normal;\n']);return C=function(){return e},e}var T=S.a.button(C()),I=n(17),R=n(13);function F(){var e=Object(z.a)(["\n  display: flex;\n  flex-direction: row;\n"]);return F=function(){return e},e}function B(){var e=Object(z.a)(["\n  display: block;\n  text-align: center;\n"]);return B=function(){return e},e}function q(){var e=Object(z.a)(["\n  margin-right: 100px;\n"]);return q=function(){return e},e}function M(){var e=Object(z.a)(["\n  display: flex;\n  flex-direction: row;\n  margin: 20px;\n  padding: 20px;\n"]);return M=function(){return e},e}var D=S.a.div(M()),U=S.a.div(q()),G=S.a.label(B()),Q=S.a.div(F()),W=function(e,t){return function(){if(e&&e.current){var n,r=e.current,a=r.getContext("2d"),i=function(e){var t=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/t}(a),c=getComputedStyle(r).getPropertyValue("width").slice(0,-2),o=getComputedStyle(r).getPropertyValue("height").slice(0,-2);r.width=c*i,r.height=o*i,r.style.width="".concat(c,"px"),r.style.height="".concat(o,"px");return function e(){var i=t.frequencyBinCount,c=new Uint8Array(i);t.getByteTimeDomainData(c),a.fillStyle="rgb(200, 200, 200)",a.fillRect(0,0,r.width,r.height),a.lineWidth=2,a.strokeStyle="rgb(0, 0, 0)",a.beginPath();for(var o=1*r.width/i,l=0,s=0;s<i;s++){var u=c[s]/128*r.height/2;0===s?a.moveTo(l,u):a.lineTo(l,u),l+=o}a.lineTo(r.width,r.height/2),a.stroke(),n=requestAnimationFrame(e)}(),function(){cancelAnimationFrame(n)}}}};var J=function(){var e=Object(o.e)((function(e){return e.visualizer})),t=Object(o.e)((function(e){return e.oscillator1Visualizer})),n=Object(o.e)((function(e){return e.oscillator2Visualizer}));console.log("visualizer is",e);var i=Object(r.useRef)(),c=Object(r.useRef)(),l=Object(r.useRef)();Object(r.useEffect)(W(i,e)),Object(r.useEffect)(W(c,t)),Object(r.useEffect)(W(l,n));var s=Object(R.a)({},Object(o.e)((function(e){return e.mixer})),{},Object(o.d)((function(e){return e.mixer}))),u=Object(o.e)((function(e){return e.hasUserPermissionForAudio})),m=Object(o.d)((function(e){return e.grantUserPermissionForAudio}));return u?a.a.createElement("div",null,a.a.createElement(D,null,a.a.createElement(U,null,a.a.createElement(G,null,"left oscillator"),a.a.createElement(Q,null,a.a.createElement(K,{oscillatorIndex:0,parameter:"frequency",step:.001,min:20,max:300}),a.a.createElement(K,{oscillatorIndex:0,parameter:"detune",step:.001,min:-50,max:50}),a.a.createElement(K,{oscillatorIndex:4,parameter:"gain",step:.001,min:0,max:.5}))),a.a.createElement(U,null,a.a.createElement(G,null,"right oscillator"),a.a.createElement(Q,null,a.a.createElement(K,{oscillatorIndex:1,parameter:"frequency",step:.001,min:20,max:300}),a.a.createElement(K,{oscillatorIndex:1,parameter:"detune",step:.001,min:-50,max:50}),a.a.createElement(K,{oscillatorIndex:5,parameter:"gain",step:.001,min:0,max:.5}))),a.a.createElement(U,null,a.a.createElement(G,null,"pink noise"),a.a.createElement(Q,null,a.a.createElement(K,{oscillatorIndex:3,parameter:"frequency",step:.001,min:1,max:1e4}),a.a.createElement(K,{oscillatorIndex:3,parameter:"Q",step:.001,min:0,max:15}),a.a.createElement(K,{oscillatorIndex:2,parameter:"gain",step:.001,min:0,max:.25}))),a.a.createElement(H,{name:"master volume",step:1e-4,min:0,max:1,values:[s.masterVolume],onChange:function(e){var t=Object(I.a)(e,1)[0];return s.setMasterVolume(t)}})),a.a.createElement("canvas",{ref:c,style:{width:"500px",height:"500px"}}),a.a.createElement("canvas",{ref:l,style:{width:"500px",height:"500px"}}),a.a.createElement("canvas",{ref:i,id:"visualizer",style:{width:"500px",height:"500px"}})):a.a.createElement(T,{onClick:function(){return m()}},"Grant permission for audio")},$=n(14);var H=function(e){var t=e.parameter,n=e.step,r=e.min,i=e.max,c=e.values,o=e.onChange;return a.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",margin:"20px"}},a.a.createElement($.Range,{step:n,min:r,max:i,direction:$.Direction.Up,values:c,onChange:o,renderTrack:function(e){var t=e.props,n=e.children;return a.a.createElement("div",{onMouseDown:t.onMouseDown,onTouchStart:t.onTouchStart,style:Object(R.a)({},t.style,{flexGrow:1,width:"36px",display:"flex",justifyContent:"center",height:"300px"})},a.a.createElement("div",{ref:t.ref,style:{width:"5px",height:"100%",borderRadius:"4px",background:Object($.getTrackBackground)({colors:["#548BF4","#ccc"],values:c,min:r,max:i,direction:$.Direction.Up}),alignSelf:"center"}},n))},renderThumb:function(e){var t=e.props,n=e.isDragged;return a.a.createElement("div",Object.assign({},t,{style:Object(R.a)({},t.style,{height:"42px",width:"42px",borderRadius:"4px",backgroundColor:"#FFF",display:"flex",justifyContent:"center",alignItems:"center",boxShadow:"0px 2px 6px #AAA"})}),a.a.createElement("div",{style:{width:"16px",height:"5px",backgroundColor:n?"#548BF4":"#CCC"}}))}}),a.a.createElement("label",null,t,a.a.createElement("br",null),c[0]))};var K=function(e){var t=e.oscillatorIndex,n=e.parameter,r=e.step,i=e.min,c=e.max,l={parameter:n,step:r,min:i,max:c},s=Object(o.e)((function(e){return e.oscillators})),u=Object(o.d)((function(e){return e.setOscillatorParameter}));return a.a.createElement(H,Object.assign({},l,{values:[s[t][n]],onChange:function(e){var r=Object(I.a)(e,1)[0];return u({oscillatorIndex:t,parameter:n,value:r})}}))};var L=function(){return a.a.createElement(o.a,{store:A},a.a.createElement(J,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(40);c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[30,1,2]]]);
//# sourceMappingURL=main.f261fab6.chunk.js.map