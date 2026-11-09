/* ถ้วยสุดท้าย — engine */
(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const D1=window.DATA,D2=window.DATA2,ART=window.ART;let D=D1;
const stage=$('#stage');
function fit(){const s=Math.min(innerWidth/1280,innerHeight/720);stage.style.transform=`translate(-50%,-50%) scale(${s})`;}
addEventListener('resize',fit);fit();
stage.addEventListener('scroll',()=>{stage.scrollTop=0;stage.scrollLeft=0;});
function setPart(n){D=n===2?D2:D1;stage.classList.toggle('part2',n===2);}

/* ---------- storage ---------- */
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}},del(k){try{localStorage.removeItem(k);}catch(e){}}};
const DEF={master:80,music:70,rain:70,sfx:80,speed:3,lowfx:false,mini:true};
const V=Object.assign({},DEF,LS.get('lastcup.settings',{}));
const saveV=()=>LS.set('lastcup.settings',V);
stage.classList.toggle('lowfx',!!V.lowfx);
const G=Object.assign({cg:[],endings:[],endings2:[],ks:[],read:[],cs:[]},LS.get('lastcup.gallery',{}));
const readSet=new Set(G.read);
let gTimer=null;const saveG=()=>{clearTimeout(gTimer);gTimer=setTimeout(()=>{G.read=[...readSet].slice(-3000);LS.set('lastcup.gallery',G);},400);};
const newP=()=>({v:2,part:1,phase:'night',n:1,res:{},bond:0,flags:{},keepsakes:[],unlocked:[],pre:[],known:[]});
let P=null;
const saveP=()=>{if(P)LS.set('lastcup.save',P);};
const hasSave=()=>!!LS.get('lastcup.save',null);
function unlockG(k,v){if(!G[k].includes(v)){G[k].push(v);saveG();}}

/* ---------- static scene art ---------- */
let seed=11;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
(function(){
 let s='';for(let i=0;i<46;i++)s+=`<circle cx="${380+rnd()*520}" cy="${60+rnd()*170}" r="${(rnd()*1.1+.3).toFixed(2)}" opacity="${(rnd()*.6+.2).toFixed(2)}"/>`;$('#stars').innerHTML=s;
 let c='',x=370,k=0;
 while(x<910){const w=40+rnd()*70,h=90+rnd()*150,top=430-h,col=k%2?'#0f1330':'#151a3c';
  c+=`<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${col}"/>`;
  if(rnd()<.4)c+=`<rect x="${(x+w*.4).toFixed(1)}" y="${(top-14).toFixed(1)}" width="3" height="14" fill="${col}"/><circle cx="${(x+w*.4+1.5).toFixed(1)}" cy="${(top-15).toFixed(1)}" r="1.6" fill="#ff5a6a"/>`;
  for(let yy=top+10;yy<420;yy+=16)for(let xx=x+6;xx<x+w-8;xx+=12)if(rnd()<.28){const warm=rnd()<.8;c+=`<rect x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" width="6" height="8" fill="${warm?'#ffd58a':'#a9d8ff'}" opacity="${(.35+rnd()*.5).toFixed(2)}"/>`;}
  x+=w+2;k++;}
 $('#city').innerHTML=c;
 const cup=(x,y,col,h)=>`<g transform="translate(${x},${y})"><path d="M0 0 h26 l-3 ${h} q-1 4 -5 4 h-10 q-4 0 -5 -4z" fill="${col}"/><path d="M26 5 q8 0 7 8 q-1 6 -8 6" stroke="${col}" stroke-width="3" fill="none"/><ellipse cx="13" cy="0" rx="13" ry="2.5" fill="#000" opacity=".25"/></g>`;
 $('#cupsL').innerHTML=cup(40,272,'#efe6da',24)+cup(78,272,'#c9d8e6',24)+cup(116,272,'#e8b0a8',24)+cup(160,276,'#f2e2c4',20)+cup(196,276,'#efe6da',20)+`<g transform="translate(232,262)"><rect width="50" height="38" rx="3" fill="#7a4d34"/><rect x="4" y="4" width="42" height="30" fill="#5a3726"/><text x="25" y="24" text-anchor="middle" font-family="Mali" font-size="10" fill="#f2d4a8">ร้านยาย</text></g>`;
 $('#cupsR').innerHTML=`<g transform="translate(960,306)"><rect x="0" y="6" width="32" height="40" rx="6" fill="#d9a85a" opacity=".6"/><rect x="3" y="0" width="26" height="8" rx="2" fill="#7a4d2a"/></g>`+cup(1004,322,'#efe6da',24)+cup(1040,322,'#2f5e7a',24)+`<g transform="translate(1086,300)"><rect width="16" height="52" rx="3" fill="#9a4a3a"/><rect x="18" y="8" width="14" height="44" rx="3" fill="#3a5a4a"/><rect x="34" y="4" width="12" height="48" rx="3" fill="#c9a77a"/></g>`;
 const candle=(cls)=>`<circle class="cglow" cx="13" cy="6" r="22" fill="url(#cglowG)"/><path d="M0 12 h26 l-2 22 q-1 4 -5 4 h-12 q-4 0 -5 -4z" fill="url(#amberGlass)" stroke="#ffd9a0" stroke-opacity=".5"/><rect x="4" y="16" width="18" height="16" rx="2" fill="#f6ead2" opacity=".9"/><ellipse cx="13" cy="16" rx="9" ry="2" fill="#fff6e4"/><path d="M13 16 v-4" stroke="#2a1a10" stroke-width="1.2"/><g class="flame ${cls}"><path d="M13 -6 q7 8 4 14 q-2 4 -4 4 q-2 0 -4 -4 q-3 -6 4 -14z" fill="#ffa63a"/><path d="M13 0 q3 4 2 7 q-1 2 -2 2 q-1 0 -2 -2 q-1 -3 2 -7z" fill="#fff6c8"/></g><path class="smoke" d="M13 10 q-5 -8 0 -16 q5 -8 0 -16" stroke="#c9c0cc" stroke-width="2" fill="none"/>`;
 ['','b','c'].forEach((c,i)=>{$('#cd'+i).innerHTML=candle(c);});
})();

/* ---------- characters ---------- */
const POS={c:440,l:250,r:640,menu:590};
const chars={};
function specFor(k){return k==='prang'?null:ART.CHARS[k];}
function makeChar(k,pos,specKey){
 let el=chars[k];
 if(!el){el=document.createElement('div');el.className='chr x-neutral';el.innerHTML='<div class="bob"><svg viewBox="0 0 400 520" width="400" height="520"></svg></div>';$('#chars').appendChild(el);chars[k]=el;}
 const sk=specKey||k;const sp=specFor(sk);
 el.querySelector('svg').innerHTML=sk==='prang'?ART.prang():sk==='dang'?ART.dog():ART.char(sp);
 el.dataset.k=k;el.dataset.ghost=(sk==='prang'||sk==='dang'||(sp&&sp.ghost))?'1':'';
 el.classList.toggle('human',!el.dataset.ghost);
 el.style.left=(POS[pos]||POS.c)+'px';el.dataset.pos=pos;
 return el;
}
function charIn(k,pos){const el=makeChar(k,pos||castPos(k));el.classList.remove('leave');requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('show')));if(el.dataset.ghost)SFX.whoosh();}
function charOut(k){const el=chars[k];if(!el)return;el.classList.remove('show');el.classList.add('leave');if(el.dataset.ghost){burst(+el.style.left.replace('px','')+200);SFX.sparkle();}}
function charFade(k){const el=chars[k];if(!el)return;el.classList.remove('show');el.classList.add('leave');SFX.sad();}
function charSwap(k,sk){const el=chars[k];if(!el)return;const cls=el.className;makeChar(k,el.dataset.pos,sk);el.className=cls;burst(+el.style.left.replace('px','')+200,80);SFX.ding();}
function clearChars(){Object.keys(chars).forEach(k=>{chars[k].remove();delete chars[k];});}
function setExpr(k,e){const el=chars[k];if(!el)return;el.className=el.className.replace(/x-\w+/g,'').trim()+' x-'+e;}
function castPos(k){const n=CUR&&CUR.cast?CUR.cast.find(c=>c.k===k):null;return n?n.pos:'c';}
const visibleGhosts=()=>Object.values(chars).filter(el=>el.dataset.ghost&&el.classList.contains('show')).map(el=>+el.style.left.replace('px','')+200);

/* ---------- canvases ---------- */
const rc=$('#rain'),rx=rc.getContext('2d');rx.scale(1.5,1.5);
const RW=520,RH=370;let rainLevel=1,rainTarget=1,lanterns=false;
const streaks=[],drops=[],lants=[];
for(let i=0;i<240;i++)streaks.push({x:Math.random()*RW*1.2-40,y:Math.random()*RH,l:10+Math.random()*22,v:9+Math.random()*9,a:.12+Math.random()*.25});
const newDrop=(init)=>({x:Math.random()*RW,y:init?Math.random()*RH:-10-Math.random()*40,r:1+Math.random()*2.8,v:0,slide:Math.random()<.25,t:Math.random()*400});
for(let i=0;i<80;i++)drops.push(newDrop(true));
for(let i=0;i<34;i++)lants.push({x:Math.random()*RW,y:Math.random()*RH*1.4,s:3+Math.random()*7,v:.15+Math.random()*.35,p:Math.random()*6});
function sprite(r,g,b){const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d');const gr=x.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,`rgba(${r},${g},${b},1)`);gr.addColorStop(.35,`rgba(${r},${g},${b},.5)`);gr.addColorStop(1,`rgba(${r},${g},${b},0)`);x.fillStyle=gr;x.fillRect(0,0,32,32);return c;}
const spWarm=sprite(255,205,140),spCyan=sprite(150,225,255),spWhite=sprite(235,248,255),spLan=sprite(255,170,80);
function drawRain(){
 rx.clearRect(0,0,RW,RH);rx.save();rx.beginPath();rx.moveTo(0,RH);rx.lineTo(0,110);rx.ellipse(260,110,260,110,0,Math.PI,0);rx.lineTo(RW,RH);rx.closePath();rx.clip();
 rainLevel+=(rainTarget-rainLevel)*.008;
 if(lanterns){for(const l of lants){l.y-=l.v;l.p+=.03;l.x+=Math.sin(l.p)*.15;if(l.y<-20){l.y=RH+20;l.x=Math.random()*RW;}
  rx.globalAlpha=.9;rx.drawImage(spLan,l.x-l.s*2.2,l.y-l.s*2.2,l.s*4.4,l.s*4.4);rx.fillStyle='#ffd890';rx.fillRect(l.x-l.s*.35,l.y-l.s*.5,l.s*.7,l.s);rx.globalAlpha=1;}}
 if(rainLevel>.01){
  rx.lineCap='round';const n=Math.floor(streaks.length*rainLevel*(V.lowfx?.4:1));
  for(let i=0;i<n;i++){const s=streaks[i];s.y+=s.v;s.x+=s.v*.14;if(s.y>RH){s.y=-s.l-Math.random()*60;s.x=Math.random()*RW*1.2-40;}
   rx.strokeStyle=`rgba(190,210,255,${s.a})`;rx.lineWidth=1;rx.beginPath();rx.moveTo(s.x,s.y);rx.lineTo(s.x-s.l*.14,s.y-s.l);rx.stroke();}
 }
 const dl=Math.min(1,rainLevel*1.4);
 if(dl>.03)for(let di=0;di<(V.lowfx?30:drops.length);di++){const d=drops[di];
  if(d.slide){d.t-=1;if(d.t<0)d.v=Math.min(d.v+.05,2.4);d.y+=d.v;if(d.v>0){rx.strokeStyle=`rgba(200,220,255,${.08*dl})`;rx.lineWidth=d.r*.9;rx.beginPath();rx.moveTo(d.x,d.y-d.r);rx.lineTo(d.x,d.y-d.r-14);rx.stroke();}}
  if(d.y>RH+5)Object.assign(d,newDrop(false));
  const al=.5*dl;rx.fillStyle=`rgba(150,170,220,${al*.35})`;rx.beginPath();rx.arc(d.x,d.y,d.r,0,6.283);rx.fill();
  rx.fillStyle=`rgba(255,255,255,${al*.8})`;rx.beginPath();rx.arc(d.x-d.r*.3,d.y-d.r*.35,d.r*.35,0,6.283);rx.fill();}
 drawSeasonFx();
 rx.restore();
}
const fc=$('#fx'),fx=fc.getContext('2d');
const dust=[];for(let i=0;i<70;i++){const L=[230,640,1062][i%3];dust.push({x:L+(Math.random()-.5)*360,y:90+Math.random()*420,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.12,s:2+Math.random()*4,p:Math.random()*6.28});}
let wisps=[];
function drawFx(){
 fx.clearRect(0,0,1280,720);fx.globalCompositeOperation='lighter';
 if(!V.lowfx)for(const d of dust){d.x+=d.vx;d.y+=d.vy;d.p+=.02;if(d.y<60)d.y=520;if(d.y>540)d.y=70;fx.globalAlpha=.25+.25*Math.sin(d.p);fx.drawImage(spWarm,d.x-d.s,d.y-d.s,d.s*2,d.s*2);}
 const gx=visibleGhosts();
 for(const cx of gx){if(Math.random()<(V.lowfx?.12:.38)/Math.max(1,gx.length*.7)){const side=Math.random();wisps.push({x:side<.35?cx-170+Math.random()*80:side<.7?cx+90+Math.random()*80:cx-100+Math.random()*200,y:side<.7?240+Math.random()*320:430+Math.random()*130,vx:(Math.random()-.5)*.3,vy:-.3-Math.random()*.6,life:1,s:3+Math.random()*7,sp:spCyan});}}
 for(let i=wisps.length-1;i>=0;i--){const w=wisps[i];w.x+=w.vx+Math.sin(w.y*.03)*.3;w.y+=w.vy;w.life-=w.dec||.008;if(w.life<=0){wisps.splice(i,1);continue;}fx.globalAlpha=Math.min(1,w.life*1.4)*.8;fx.drawImage(w.sp,w.x-w.s,w.y-w.s,w.s*2,w.s*2);}
 fx.globalAlpha=1;fx.globalCompositeOperation='source-over';
}
function burst(cx,n){cx=cx||640;for(let i=0;i<(n||(V.lowfx?90:300));i++)wisps.push({x:cx-140+Math.random()*280,y:220+Math.random()*340,vx:(Math.random()-.5)*1.2,vy:-.4-Math.random()*1.8,life:1,dec:.004+Math.random()*.006,s:2+Math.random()*7,sp:Math.random()<.6?spCyan:spWhite});}
function loop(now){seasonTick(now||0);drawRain();drawFx();requestAnimationFrame(loop);}

/* ---------- audio ---------- */
let AC=null,master,musicBus,sfxBus,rainG,rainVol,noiseBuf,nextT=0,ci=0,MUS=D.MUSIC.menu;
function initAudio(){
 if(AC){try{AC.resume();}catch(e){}return;}
 try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){AC=null;return;}
 master=AC.createGain();master.gain.value=V.master/100*.9;master.connect(AC.destination);
 const rev=AC.createConvolver();rev.buffer=makeIR(3);const rg=AC.createGain();rg.gain.value=.4;rev.connect(rg);rg.connect(master);
 musicBus=AC.createGain();musicBus.gain.value=.6*V.music/100;musicBus.connect(master);musicBus.connect(rev);
 sfxBus=AC.createGain();sfxBus.gain.value=.8*V.sfx/100;sfxBus.connect(master);sfxBus.connect(rev);
 const n=AC.sampleRate*3;noiseBuf=AC.createBuffer(1,n,AC.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
 const brown=AC.createBuffer(1,n,AC.sampleRate),bd=brown.getChannelData(0);let last=0;for(let i=0;i<n;i++){const w=Math.random()*2-1;last=(last+.02*w)/1.02;bd[i]=last*3.5;}
 rainG=AC.createGain();rainG.gain.value=0;rainG.gain.linearRampToValueAtTime(rainTarget,AC.currentTime+3);rainVol=AC.createGain();rainVol.gain.value=V.rain/100;rainG.connect(rainVol);rainVol.connect(master);
 const s1=AC.createBufferSource();s1.buffer=noiseBuf;s1.loop=true;const hp=AC.createBiquadFilter();hp.type='highpass';hp.frequency.value=600;const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=3800;const g1=AC.createGain();g1.gain.value=.075;s1.connect(hp);hp.connect(lp);lp.connect(g1);g1.connect(rainG);s1.start();
 const s2=AC.createBufferSource();s2.buffer=brown;s2.loop=true;const lp2=AC.createBiquadFilter();lp2.type='lowpass';lp2.frequency.value=500;const g2=AC.createGain();g2.gain.value=.22;s2.connect(lp2);lp2.connect(g2);g2.connect(rainG);s2.start();
 nextT=AC.currentTime+.6;setInterval(sched,400);
}
function makeIR(sec){const len=AC.sampleRate*sec,b=AC.createBuffer(2,len,AC.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6);}return b;}
const mtof=m=>440*Math.pow(2,(m-69)/12);
function sched(){if(!AC)return;while(nextT<AC.currentTime+1.6){const M=MUS,c=M.ch[ci%M.ch.length];c.forEach(m=>pad(mtof(m),nextT,M.bar,M.pad));pad(mtof(c[0]-12),nextT,M.bar,.035);const st=M.bar/8;for(let i=0;i<8;i++)if(Math.random()<M.p){const ns=M.mel[ci%M.mel.length];pluck(mtof(ns[Math.floor(Math.random()*ns.length)]),nextT+i*st+Math.random()*.04,.045);}nextT+=M.bar;ci++;}}
function setMusic(k){MUS=D.MUSIC[k]||D.MUSIC.n1;ci=0;}
function pad(f,t,dur,g){const o1=AC.createOscillator(),o2=AC.createOscillator(),lp=AC.createBiquadFilter(),ga=AC.createGain();o1.type='triangle';o2.type='sine';o1.frequency.value=f;o2.frequency.value=f;o1.detune.value=-7;o2.detune.value=6;lp.type='lowpass';lp.frequency.value=1000;ga.gain.setValueAtTime(0,t);ga.gain.linearRampToValueAtTime(g,t+1.6);ga.gain.setValueAtTime(g,t+dur-.4);ga.gain.linearRampToValueAtTime(0,t+dur+1.4);o1.connect(lp);o2.connect(lp);lp.connect(ga);ga.connect(musicBus);o1.start(t);o2.start(t);o1.stop(t+dur+1.5);o2.stop(t+dur+1.5);}
function pluck(f,t,g,bus){const o=AC.createOscillator(),o2=AC.createOscillator(),ga=AC.createGain(),g2=AC.createGain(),lp=AC.createBiquadFilter();o.type='sine';o2.type='triangle';o.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=.25;lp.type='lowpass';lp.frequency.value=2800;ga.gain.setValueAtTime(0,t);ga.gain.linearRampToValueAtTime(g,t+.006);ga.gain.exponentialRampToValueAtTime(.0001,t+1.9);o.connect(ga);o2.connect(g2);g2.connect(ga);ga.connect(lp);lp.connect(bus||musicBus);o.start(t);o2.start(t);o.stop(t+2);o2.stop(t+2);}
const SFX={
 bell(){if(!AC)return;const t=AC.currentTime;[1568,2093,2637,3136].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.setValueAtTime(0,t+i*.05);g.gain.linearRampToValueAtTime(.06/(i*.5+1),t+i*.05+.005);g.gain.exponentialRampToValueAtTime(.0001,t+i*.05+2.6);o.connect(g);g.connect(sfxBus);o.start(t+i*.05);o.stop(t+3);});},
 ding(){if(!AC)return;const t=AC.currentTime;pluck(1046,t,.09,sfxBus);pluck(1568,t+.09,.07,sfxBus);pluck(2093,t+.18,.05,sfxBus);},
 insight(){if(!AC)return;const t=AC.currentTime;[72,76,79,83,86].forEach((m,i)=>pluck(mtof(m),t+i*.07,.06,sfxBus));},
 whoosh(){if(!AC)return;const t=AC.currentTime,s=AC.createBufferSource(),bp=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;bp.type='bandpass';bp.Q.value=3;bp.frequency.setValueAtTime(300,t);bp.frequency.exponentialRampToValueAtTime(2400,t+2.4);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.16,t+1.8);g.gain.linearRampToValueAtTime(0,t+3);s.connect(bp);bp.connect(g);g.connect(sfxBus);s.start(t);s.stop(t+3.1);},
 puff(){if(!AC)return;const t=AC.currentTime,s=AC.createBufferSource(),lp=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;lp.type='lowpass';lp.frequency.value=900;g.gain.setValueAtTime(.25,t);g.gain.exponentialRampToValueAtTime(.001,t+.45);s.connect(lp);lp.connect(g);g.connect(sfxBus);s.start(t);s.stop(t+.5);},
 clink(){if(!AC)return;const t=AC.currentTime;[2400,3350,4100].forEach(f=>{const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.setValueAtTime(.05,t);g.gain.exponentialRampToValueAtTime(.0001,t+.5);o.connect(g);g.connect(sfxBus);o.start(t);o.stop(t+.6);});},
 tap(){if(!AC)return;pluck(1318,AC.currentTime,.025,sfxBus);},
 err(){if(!AC)return;const t=AC.currentTime;pluck(330,t,.05,sfxBus);pluck(311,t+.1,.05,sfxBus);},
 sparkle(){if(!AC)return;const t=AC.currentTime;[72,76,79,84,88,91,96].forEach((m,i)=>pluck(mtof(m),t+i*.12,.05,sfxBus));},
 sad(){if(!AC)return;const t=AC.currentTime;[69,65,62,57].forEach((m,i)=>pluck(mtof(m),t+i*.35,.05,sfxBus));}
};
function applyVolumes(){if(!AC)return;const t=AC.currentTime;master.gain.setTargetAtTime(V.master/100*.9,t,.05);musicBus.gain.setTargetAtTime(.6*V.music/100,t,.05);sfxBus.gain.setTargetAtTime(.8*V.sfx/100,t,.05);rainVol.gain.setTargetAtTime(V.rain/100,t,.05);}
function setRain(v){rainTarget=v;if(AC)rainG.gain.linearRampToValueAtTime(Math.max(v,.02),AC.currentTime+4);}

/* ---------- scene modes ---------- */
function setWeather(w,day){
 stage.classList.toggle('day',!!day);stage.classList.toggle('fog',!!(w&&w.fog));
 lanterns=!!(w&&w.lanterns);setRain(day?0:(w?w.rain:1));
 $('#bg').classList.toggle('clear',!!(w&&w.clear)||!!day);
 applySeason(day?null:w);
}
function renderDecor(){
 ['bg','mid','front'].forEach(l=>{$('#decor_'+l).innerHTML='';});
 (P?P.keepsakes:[]).forEach(k=>{const d=ART.DECOR[k];if(d)$('#decor_'+d.layer).insertAdjacentHTML('beforeend',d.svg);});
 (P&&P.decor?P.decor:[]).forEach(k=>{const d=DECOR2[k];if(d)$('#decor_'+d.layer).insertAdjacentHTML('beforeend',d.svg);});
}

/* ---------- dialogue ---------- */
const seg=(window.Intl&&Intl.Segmenter)?new Intl.Segmenter('th',{granularity:'grapheme'}):null;
const graph=s=>seg?[...seg.segment(s)].map(x=>x.segment):Array.from(s);
const hash=s=>{let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return h;};
const dlg=$('#dialog'),dName=$('#dlgName'),dText=$('#dlgText');
let queue=[],qDone=null,typing=false,gs=[],gi=0,tmr=null,lastShow=0,autoOn=false,skipOn=false,autoT=null,curRead=false;
const LOG=[];
let S={state:'menu'};
function nameOf(k){if(k==='narr')return '';if(k==='cust')return 'ลูกค้า';if(P&&P.forgot&&P.forgot.includes(k))return '???';if(D.NAMES[k]&&(!D.UNKNOWN[k]||(P&&P.known.includes(k))))return D.NAMES[k];return D.UNKNOWN[k]||D.NAMES[k]||k;}
function say(lines,done){queue=lines.filter(Boolean).slice();qDone=done;S.state='dialog';dlg.style.display='block';hideChoices();nextLine(true);}
function nextLine(force){
 clearTimeout(autoT);
 if(typing){finishType();return;}
 if(!force&&Date.now()-lastShow<150)return;
 if(!queue.length){dlg.style.display='none';const d=qDone;qDone=null;S.state='idle';d&&d();return;}
 const L=queue.shift();lastShow=Date.now();
 if(L.fx)L.fx.split(' ').forEach(runFx);
 const who=L.s;
 if(L.e){const tgt=L.c||who;setExpr(tgt,L.e);}
 dName.className=who==='narr'?'narr':(who==='soba'?'soba':who==='you'?'you':(chars[who]&&chars[who].dataset.ghost?'ghost':'human'));
 dText.className=dName.className;
 dName.textContent=nameOf(who);
 if(who==='soba'){const c=$('#cat');c.classList.remove('talk');void c.offsetWidth;c.classList.add('talk');}
 if(L.frag)setTimeout(()=>gainFrag(L.frag),400);
 const h=hash(who+L.t);curRead=readSet.has(h);readSet.add(h);saveG();
 LOG.push({n:nameOf(who),t:L.t,c:dName.className});if(LOG.length>300)LOG.shift();
 gs=graph(L.t);gi=0;typing=true;dlg.classList.remove('done');dText.textContent='';
 clearInterval(tmr);
 const ms=[55,38,26,13,0][V.speed-1];
 if(!ms||(skipOn&&curRead))finishType();
 else tmr=setInterval(()=>{gi++;dText.textContent=gs.slice(0,gi).join('');if(gi>=gs.length)finishType();},ms);
}
function finishType(){
 clearInterval(tmr);dText.textContent=gs.join('');typing=false;dlg.classList.add('done');
 if(skipOn){if(curRead||ctrlHeld){autoT=setTimeout(()=>{if(S.state==='dialog'&&!modalOpen())nextLine(true);},70);return;}else setSkip(false);}
 if(autoOn)autoT=setTimeout(()=>{if(S.state==='dialog'&&!modalOpen())nextLine(true);},1300+gs.length*32);
}
function setAuto(v){autoOn=v;$('#btnAuto').classList.toggle('on',v);if(v&&!typing&&S.state==='dialog')finishType();}
function setSkip(v){skipOn=v;$('#btnSkip').classList.toggle('on',v);if(v&&!typing&&S.state==='dialog')nextLine(true);}
let ctrlHeld=false;
addEventListener('keydown',e=>{if(e.key==='Control'&&!ctrlHeld&&S.state==='dialog'&&!modalOpen()){ctrlHeld=true;skipOn=true;$('#btnSkip').classList.add('on');if(!typing)nextLine(true);}});
addEventListener('keyup',e=>{if(e.key==='Control'){ctrlHeld=false;setSkip(false);}});
dlg.addEventListener('click',e=>{e.stopPropagation();if(e.target.closest('.dctl'))return;if(S.state==='dialog'&&!modalOpen()){setAuto(false);if(skipOn)setSkip(false);nextLine();}});
$('#btnAuto').addEventListener('click',e=>{e.stopPropagation();setAuto(!autoOn);});
$('#btnSkip').addEventListener('click',e=>{e.stopPropagation();setSkip(!skipOn);});
$('#btnLog').addEventListener('click',e=>{e.stopPropagation();openLog();});
const modalOpen=()=>!!document.querySelector('.modal.on');
stage.addEventListener('click',e=>{if(S.state==='dialog'&&!modalOpen()&&!e.target.closest('button,#journal,#brew,#end,.modal,#menu,#sketch'))nextLine();});
addEventListener('keydown',e=>{
 if(e.key==='Escape'){e.preventDefault();if(modalOpen())closeTopModal();else if($('#journal').classList.contains('on'))closeJournal();else if(!['menu','intro','end'].includes(S.state))openModal('mPause');return;}
 if((e.key===' '||e.key==='Enter')&&S.state==='dialog'&&!modalOpen()){e.preventDefault();nextLine();}
});
function openLog(){$('#logList').innerHTML=LOG.map(l=>`<div class="lg ${l.c}">${l.n?`<b>${l.n}</b>`:''}<span>${l.t}</span></div>`).join('')||'<div class="lg narr"><span>ยังไม่มีบทสนทนา</span></div>';openModal('mLog');const b=$('#logList');setTimeout(()=>b.scrollTop=b.scrollHeight,30);}

/* ---------- fx dispatcher ---------- */
function runFx(f){
 const [a,b,c]=f.split(':');
 switch(a){
  case 'bell':SFX.bell();break;
  case 'in':charIn(b);break;
  case 'out':charOut(b);break;
  case 'fade':charFade(b);break;
  case 'swap':charSwap(b,c);break;
  case 'know':if(P&&!P.known.includes(b))P.known.push(b);break;
  case 'rainStop':setRain(0);$('#bg').classList.add('clear');break;
  case 'flash':showFlash(b);unlockG('cg',b);break;
  case 'flashOff':hideFlash();break;
  case 'drinkOne':$$('#served .sv1').forEach(c=>{c.style.transition='opacity 2s';c.style.opacity=0;});break;
  case 'keepsake':{const k=CUR&&CUR.keepsake;const d=k&&ART.DECOR[k];if(d){$('#keepsake').innerHTML=d.layer==='front'?d.svg:`<g transform="translate(700,470) scale(.8)">${d.svg.replace(/translate\([^)]*\)/,'translate(0,0)')}</g>`;$('#keepsake').style.opacity=1;}SFX.ding();}break;
  case 'unlock':b.split(',').forEach(u=>{if(!P.unlocked.includes(u))P.unlocked.push(u);});SFX.insight();break;
  case 'candleOut':candleOut();break;
  case 'yomPass':P.flags.yomPass=true;saveP();break;
  case 'yomFail':P.flags.yomPass=false;saveP();break;
  case 'sobaMem':if(P.sobaMem&&!P.sobaMem.includes(b)){P.sobaMem.push(b);if(N&&CUR&&CUR.frags[b])gainFrag(b);}break;
  case 'light':addLight(+b);break;
  case 'catGuest':$('#cat').classList.add('guest');break;
  case 'catOut':$('#cat').classList.add('gone');burst(640,200);SFX.sparkle();break;
  case 'catHeal':$('#cat').classList.add('heal');if(P){P.light=100;}$('#cat').style.opacity=1;SFX.sparkle();break;
  case 'forget':if(P){P.forgot=P.forgot||[];if(!P.forgot.includes(b))P.forgot.push(b);}break;
  case 'clearServed':$('#served').style.transition='opacity 1s';$('#served').style.opacity=0;break;
 }
}
function showFlash(id){const F=ART.FLASH[id];if(!F)return;$('#flashSvg').innerHTML=F.svg;$('#flashCap').textContent=F.cap;$('#flash').classList.toggle('norain',!F.rain);$('#flash').style.background=F.tone||'#0b0f1c';$('#flash').classList.add('on');stage.classList.add('flashing');}
function hideFlash(){$('#flash').classList.remove('on');stage.classList.remove('flashing');}

/* ---------- night state ---------- */
let CUR=null,N=null;
function freshN(){return {frags:new Set(),asked:new Set(),seen:new Set(),killed:new Set(),events:new Set(),done:new Set(),candles:3,sel:{base:null,flavor:null,temp:null,count:null},warned:false,target:null,order:[],faded:new Set(),score:0};}
function fragDef(id){return CUR&&CUR.frags[id];}
function gainFrag(id,quiet){
 if(!N||N.frags.has(id)||!fragDef(id))return;N.frags.add(id);N.order.push(id);
 const f=fragDef(id);
 if(!quiet){showToast(f.ins?'ต่อความทรงจำสำเร็จ':'ได้รับเศษความทรงจำ',f.t,f.ins?'ins':'');
  f.ins?SFX.insight():SFX.ding();const b=$('#jBtn');b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse');}
 updateJCount();renderJournal();
}
function updateJCount(){if(!CUR)return;const tot=Object.keys(CUR.frags).length;$('#jCnt').textContent=N.frags.size+'/'+tot;}
const reqOK=(req)=>(req||[]).every(r=>r.startsWith('ev:')?N.events.has(r.slice(3)):N.frags.has(r));

/* ---------- journal & linking ---------- */
let picks=[];
function renderJournal(){
 if(!CUR){$('#jList').innerHTML='';return;}
 const ids=Object.keys(CUR.frags);
 $('#jList').innerHTML=ids.map(k=>{const f=CUR.frags[k];if(!N.frags.has(k))return f.ins?'':`<div class="frag lock"><div class="dot"></div><div><b>? ? ?</b><span>ยังไม่ได้ค้นพบ</span></div></div>`;
  const fd=N.faded.has(k);const cls=['frag',f.ins?'ins':'',N.killed.has(k)?'lie':'',fd?'faded':'',picks.includes(k)?'pick':''].join(' ');
  return `<div class="${cls}" data-id="${k}"><div class="dot"></div><div><b>${f.t}</b><span>${N.killed.has(k)?'<em>เรื่องโกหก!</em> ':''}${fd?'<em class="fd">เลือนหาย...</em> ':''}${f.n}</span></div></div>`;}).join('');
 $$('#jList .frag[data-id]').forEach(el=>el.onclick=e=>{e.stopPropagation();const id=el.dataset.id;if(N.killed.has(id)||N.faded.has(id))return;SFX.tap();if(picks.includes(id))picks=picks.filter(x=>x!==id);else{picks.push(id);if(picks.length>2)picks.shift();}renderJournal();});
 const btn=$('#linkBtn');btn.disabled=picks.length!==2||S.state!=='choice';
 $('#linkHint').textContent=S.state!=='choice'?'ต่อความทรงจำได้ระหว่างเลือกคำถาม':picks.length===2?'พร้อมแล้ว ลองต่อดูสิ':`เลือกเศษความทรงจำ 2 ชิ้นที่ดูเกี่ยวกัน (${picks.length}/2)`;
}
function openJournal(){renderJournal();$('#journal').classList.add('on');}
function closeJournal(){$('#journal').classList.remove('on');picks=[];}
$('#jBtn').onclick=e=>{e.stopPropagation();SFX.tap();$('#journal').classList.contains('on')?closeJournal():openJournal();};
$('#jClose').onclick=e=>{e.stopPropagation();closeJournal();};
$('#journal').addEventListener('click',e=>e.stopPropagation());
$('#linkBtn').onclick=e=>{e.stopPropagation();if(picks.length!==2)return;
 const [x,y]=picks;const cb=(CUR.combos||[]).find(c=>(c.a===x&&c.b===y)||(c.a===y&&c.b===x));
 if(!cb){SFX.err();const j=$('#journal');j.classList.remove('shake');void j.offsetWidth;j.classList.add('shake');$('#linkHint').textContent='สองเรื่องนี้ยังเชื่อมกันไม่ได้ ลองคู่อื่นดู';picks=[];setTimeout(renderJournal,1200);return;}
 if(N.frags.has(cb.r)){$('#linkHint').textContent='คู่นี้เคยต่อแล้ว';picks=[];setTimeout(renderJournal,1000);return;}
 picks=[];if(cb.kill)N.killed.add(cb.kill);gainFrag(cb.r);closeJournal();
 if(cb.lines)say(cb.lines,openChoices);else openChoices();
};

/* ---------- choices (bottom) ---------- */
const chEl=$('#choices');
function hideChoices(){chEl.classList.remove('on');}
function openChoices(){
 if(!CUR)return;S.state='choice';
 const ev=(CUR.events||[]).find(e=>!N.events.has(e.id)&&e.when(N));
 if(ev){N.events.add(ev.id);return say(ev.lines,openChoices);}
 const avail=CUR.topics.filter(t=>!N.asked.has(t.id)&&reqOK(t.req));
 const who=CUR.cast.map(c=>c.k).filter(k=>chars[k]&&chars[k].classList.contains('show'));
 let h=`<div class="hd">คุยกับ${who.map(nameOf).join(' และ ')||'แขก'}...</div>`;
 avail.forEach((t,i)=>{const isNew=(t.req||[]).length&&!N.seen.has(t.id);h+=`<button class="ch" data-id="${t.id}" style="animation-delay:${i*.05}s">${CUR.cast.length>1?`<small>${nameOf(t.to)}</small>`:''}${t.label}${isNew?'<span class="new">ใหม่</span>':''}</button>`;});
 h+=`<button class="ch brew" data-id="__brew" style="animation-delay:${avail.length*.05}s">ชงเครื่องดื่ม</button>`;
 chEl.innerHTML=h;chEl.classList.add('on');avail.forEach(t=>N.seen.add(t.id));
 chEl.querySelectorAll('.ch').forEach(b=>b.onclick=e=>{e.stopPropagation();SFX.tap();const id=b.dataset.id;if(id==='__brew')return tryBrew();const t=CUR.topics.find(x=>x.id===id);
  if(t.draw||t.obs||t.listen||t.trial)return openSketch(t);N.asked.add(id);say(t.lines,()=>{fadeStep();openChoices();});});
 if($('#journal').classList.contains('on'))renderJournal();
}
function dayChoice(q,opts,cb){
 S.state='daychoice';
 let h=`<div class="hd">${q}</div>`;opts.forEach((o,i)=>{h+=`<button class="ch day" data-i="${i}" ${o.dis?'disabled':''} style="animation-delay:${i*.06}s">${o.t}${o.dis?`<small class="why">${o.dis}</small>`:''}</button>`;});
 chEl.innerHTML=h;chEl.classList.add('on');
 chEl.querySelectorAll('.ch').forEach(b=>b.onclick=e=>{e.stopPropagation();SFX.tap();hideChoices();cb(opts[+b.dataset.i]);});
}

/* ---------- sketch / observe / listen / trial ---------- */
function trialEvidence(){
 const ks=(P.keepsakes||[]).length,rc=(P.recipes||[]).length,dc=(P.decor||[]).length,tot=Object.values(P.aff||{}).reduce((a,b)=>a+b,0);
 return `<div class="trialCard"><div class="th">หลักฐานที่คุณมี</div>
  <div class="ev"><b>${ks}</b><span>ของที่ระลึกจากแขกปีนี้</span></div>
  <div class="ev"><b>${rc}</b><span>สูตรในสมุดสูตร</span></div>
  <div class="ev"><b>${dc}</b><span>ของตกแต่งร้าน</span></div>
  <div class="ev"><b>${P.flags.testimony?'มี':'ไม่มี'}</b><span>คำรับรองจากเพื่อนบ้าน</span></div>
  <div class="ev"><b>${tot}</b><span>ความสนิทกับเพื่อนบ้าน</span></div>
  <div class="sc">ตอบถูกแล้ว ${N.score||0} ข้อ · ต้องถูกอย่างน้อย 2 ข้อ</div></div>`;
}
function openSketch(t,disabled){
 disabled=disabled||[];hideChoices();S.state='sketch';
 let img='',lb='';
 if(t.draw){img=ART.drawingWrap(ART.drawings[t.draw]);lb='สมุดวาดเขียนของเด็กชาย';}
 else if(t.obs){img=`<div class="obsCard"><div class="chr show human x-${t.obs.e||'neutral'}" style="position:relative;left:0;top:0;width:300px;height:330px;overflow:hidden"><div><svg viewBox="40 100 320 360" width="300" height="330">${ART.dog()}</svg></div></div><p>${t.obs.desc}</p></div>`;lb='ท่าทางของเจ้าตัวนั้น';}
 else if(t.listen){img=`<div class="listenCard"><div class="bubble"><div class="jp">${t.listen.jp}</div><div class="ro">${t.listen.ro}</div></div><p>${t.listen.note}</p><div class="tip">เคล็ดลับ: ฟังคำที่คล้ายภาษาไทยหรือภาษาอังกฤษ แล้วดูท่าทางประกอบ</div></div>`;lb='สิ่งที่เธอพูด';}
 else if(t.trial){img=trialEvidence();lb='การไต่สวนของยม';}
 $('#skImg').innerHTML=img;$('#skImg').className=t.draw?'paper':'plain';
 $('#skLb').textContent=lb;$('#skQ').textContent=t.q;
 $('#skOpts').innerHTML=t.opts.map((o,i)=>{const ok=!o.cond||o.cond(P);return `<button class="sk" data-i="${i}" ${disabled.includes(i)||!ok?'disabled':''}>${o.t}${!ok&&o.why?`<small>${o.why}</small>`:''}</button>`;}).join('');
 $('#skClose').style.display=t.trial?'none':'';
 $('#sketch').classList.add('on');SFX.tap();
 $$('#skOpts .sk').forEach(b=>b.onclick=e=>{e.stopPropagation();const i=+b.dataset.i,o=t.opts[i];$('#sketch').classList.remove('on');
  if(o.ok){N.asked.add(t.id);if(t.trial){N.score=(N.score||0)+1;SFX.insight();}say(o.lines,()=>{fadeStep();openChoices();});setTimeout(()=>gainFrag(o.frag),300);}
  else if(t.trial){N.asked.add(t.id);SFX.err();say(o.lines,openChoices);}
  else{SFX.err();say(o.lines,()=>openSketch(t,[...disabled,i]));}});
}
$('#skClose').onclick=e=>{e.stopPropagation();$('#sketch').classList.remove('on');openChoices();};
$('#sketch').addEventListener('click',e=>e.stopPropagation());
function fadeStep(){
 if(!CUR||!CUR.fading||!N)return;
 const live=N.order.filter(k=>fragDef(k)&&!fragDef(k).ins&&!N.faded.has(k));
 if(live.length>3){const k=live[0];N.faded.add(k);picks=picks.filter(x=>x!==k);showToast('ความทรงจำเลือนหาย...',fragDef(k).t,'fade');SFX.sad();renderJournal();}
}
function showToast(l1,l2,cls){$('#toastL1').textContent=l1;$('#toastT').textContent=l2;const t=$('#toast');t.className='';if(cls)t.classList.add(cls);void t.offsetWidth;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2400);}

/* ---------- brewing ---------- */
const getI=(k,id)=>D.ING[k].find(x=>x.id===id);
function unlockedI(k){return D.ING[k].filter(i=>!i.lock||(P&&P.unlocked.includes(i.lock)));}
let lastSel={};
function buildBrew(){
 const rows=[['base','1 · ฐานเครื่องดื่ม'],['flavor','2 · กลิ่นรส']];
 let h='';
 rows.forEach(([k,l])=>{h+=`<div class="row"><div class="rl">${l}</div><div class="cards">`;unlockedI(k).forEach(it=>h+=card(k,it));h+='</div></div>';});
 h+=`<div class="row two"><div><div class="rl">3 · อุณหภูมิ</div><div class="cards">${unlockedI('temp').map(it=>card('temp',it)).join('')}</div></div><div><div class="rl">4 · จำนวน</div><div class="cards">${unlockedI('count').map(it=>card('count',it)).join('')}</div></div></div>`;
 $('#bpRows').innerHTML=h;
 $$('#bpRows .card').forEach(c=>c.onclick=e=>{e.stopPropagation();const k=c.dataset.k;N.sel[k]=c.dataset.id;$$(`#bpRows .card[data-k="${k}"]`).forEach(x=>x.classList.toggle('sel',x===c));updateCup(k);brewSfx(k,c.dataset.id);});
}
function brewSfx(k,v){if(!AC)return;const t=AC.currentTime;
 if(k==='base'){const s=AC.createBufferSource(),bp=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;bp.type='bandpass';bp.frequency.setValueAtTime(900,t);bp.frequency.linearRampToValueAtTime(500,t+.7);bp.Q.value=1.2;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.12,t+.08);g.gain.linearRampToValueAtTime(0,t+.8);s.connect(bp);bp.connect(g);g.connect(sfxBus);s.start(t);s.stop(t+.9);}
 else if(k==='temp'&&v==='iced'){[0,.12,.22].forEach(d=>{pluck(2600+Math.random()*800,t+d,.05,sfxBus);});}
 else if(k==='temp'){const s=AC.createBufferSource(),hp=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;hp.type='highpass';hp.frequency.value=3000;g.gain.setValueAtTime(.06,t);g.gain.exponentialRampToValueAtTime(.001,t+.9);s.connect(hp);hp.connect(g);g.connect(sfxBus);s.start(t);s.stop(t+1);}
 else if(k==='count'){SFX.clink();}else SFX.tap();}
function card(k,it){return `<button class="card ${N.sel[k]===it.id?'sel':''}" data-k="${k}" data-id="${it.id}"><svg viewBox="0 0 48 48">${ICON[it.id]||''}</svg><div class="n">${it.n}</div><div class="m">${it.m}</div></button>`;}
function pendingRecipes(){return CUR.recipes.filter(r=>!N.done.has(r.who));}
function tryBrew(){
 hideChoices();
 const pend=pendingRecipes();const ready=pend.filter(r=>!r.need||reqOK([r.need]));
 if(!ready.length){const r=pend[0];return say(r.refuse||[{s:'soba',t:'ยังไม่ถึงเวลาหรอก คุยกันต่ออีกหน่อยเถอะ'}],openChoices);}
 if(N.frags.size<3&&!N.warned&&!CUR.trial){N.warned=true;return say([{s:'soba',t:'ใจร้อนจริง... เจ้ายังรู้เรื่องของแขกน้อยเกินไปนะ'},{s:'soba',t:'แต่ถ้ามั่นใจก็ลองดู แค่จำไว้ว่าเทียนมีแค่สามเล่ม'}],()=>openBrew(ready));}
 openBrew(ready);
}
function openBrew(ready){
 S.state='brew';S.order=null;closeJournal();lastSel={};
 if(!N.target||!ready.find(r=>r.who===N.target))N.target=ready[0].who;
 $('#bpTargets').innerHTML=ready.length>1?ready.map(r=>`<button class="tgt ${r.who===N.target?'on':''}" data-w="${r.who}">ชงให้${nameOf(r.who)}</button>`).join(''):'';
 $$('#bpTargets .tgt').forEach(b=>b.onclick=e=>{e.stopPropagation();N.target=b.dataset.w;openBrew(ready);});
 $('#bpTitle').textContent='ชงเครื่องดื่มให้'+nameOf(N.target);$('#bpClose').textContent='กลับไปคุยต่อ';
 const fr=[...N.frags].filter(k=>fragDef(k)&&!N.killed.has(k)&&!N.faded.has(k));
 $('#fragChips').innerHTML=fr.length?fr.map(k=>`<span class="${fragDef(k).ins?'ins':''}">${fragDef(k).t}</span>`).join(''):'<span style="opacity:.6">ยังไม่มีเศษความทรงจำ</span>';
 buildBrew();$('#brew').style.display='block';updateCup();
}
function openOrder(item,known,cb){
 S.state='brew';S.order={item,known,cb};N.sel={base:null,flavor:null,temp:null,count:null};lastSel={};
 $('#bpTargets').innerHTML='';$('#bpTitle').textContent='ออเดอร์: '+item.n;$('#bpClose').textContent='ขอโทษ ทำเมนูนี้ไม่ได้';
 $('#fragChips').innerHTML=`<div class="ticket"><div class="tk1">ใบสั่ง #${String(P.n*10+Math.floor(Math.random()*9)).padStart(3,'0')}</div><div class="tk2">${item.n}</div><div class="tk3">${known?'สูตรนี้อยู่ในสมุดสูตรแล้ว':'ลูกค้าใบ้: '+item.hint}</div><div class="tk4">฿${item.price}</div></div>`;
 buildBrew();$('#brew').style.display='block';updateCup();
}
$('#bpClose').onclick=e=>{e.stopPropagation();SFX.tap();$('#brew').style.display='none';
 if(S.order){const o=S.order;S.order=null;say([{s:'cust',e:'sad',t:'อ้าว... ไม่เป็นไรครับ ไว้วันหลัง'}],()=>o.cb(0));return;}
 openChoices();};
$('#bpBook').onclick=e=>{e.stopPropagation();openModal('mBook');};
function hex(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function mix(a,b,t){const A=hex(a),B=hex(b);return'#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('');}
function liquidColor(sel){const base=sel.base&&getI('base',sel.base),fl=sel.flavor&&getI('flavor',sel.flavor);if(!base)return '#c8b8a8';let col=base.c;if(fl&&fl.c)col=mix(col,fl.c,base.id==='milk'?fl.a*1.15:fl.a);if(sel.temp==='iced')col=mix(col,'#ffffff',.12);return col;}
let uid=0;
function cupSVG(cx,cy,s,sel,cls,anim){
 anim=anim||{};const id=++uid;const base=sel.base&&getI('base',sel.base),fl=sel.flavor&&getI('flavor',sel.flavor),tp=sel.temp;
 const glass="M-58,-112 L58,-112 L49,98 Q47,114 32,114 L-32,114 Q-47,114 -49,98 Z",inner="M-52,-104 L52,-104 L44,95 Q42,108 30,108 L-30,108 Q-42,108 -44,95 Z";
 let liq='',steam='',gar='',cond='',stream='';
 if(base){
  const col=liquidColor(sel);
  const top=tp==='iced'?-60:-72;const foam=base.id==='coffee'?'#8a5a3a':mix(col,'#ffffff',.45);
  const dz=anim.flavor?'aDrz':'';
  let sw='';
  if(fl&&fl.id==='straw')sw=`<path class="${dz}" d="M-50,30 C-24,6 6,54 50,22" stroke="#e0567e" stroke-width="7" fill="none" opacity=".55"/><path class="${dz}" d="M-50,70 C-20,50 10,90 50,60" stroke="#e0567e" stroke-width="5" fill="none" opacity=".45"/>`;
  if(fl&&fl.id==='honey')sw=`<path class="${dz}" d="M-50,40 C-24,16 6,64 50,32" stroke="#ffc84a" stroke-width="6" fill="none" opacity=".5"/>`;
  if(fl&&fl.id==='caramel')sw=`<path class="${dz}" d="M-50,36 C-24,12 6,60 50,28" stroke="#7a4418" stroke-width="6" fill="none" opacity=".55"/>`;
  if(fl&&fl.id==='mango')sw=`<path class="${dz}" d="M-50,50 C-24,26 6,74 50,42" stroke="#f6a020" stroke-width="7" fill="none" opacity=".5"/>`;
  if(fl&&fl.id==='ginger')sw=`<g class="${dz}" fill="#e8c890" opacity=".7"><rect x="-30" y="20" width="10" height="6" rx="2"/><rect x="10" y="50" width="10" height="6" rx="2"/><rect x="-6" y="80" width="10" height="6" rx="2"/></g>`;
  if(fl&&fl.id==='anchan')sw=`<path class="${dz}" d="M-60,${top} h120 v60 h-120z" fill="#8a6ae8" opacity=".35"/>`;
  let ice='';if(tp==='iced')ice=`<g class="${anim.temp?'aIce':''}" fill="#eef8ff" opacity=".55" stroke="#fff" stroke-opacity=".8"><rect x="-38" y="-58" width="34" height="32" rx="7" transform="rotate(-14 -21 -42)"/><rect x="2" y="-50" width="32" height="30" rx="7" transform="rotate(12 18 -35)"/><rect x="-20" y="-18" width="30" height="28" rx="7" transform="rotate(6 -5 -4)"/></g>`;
  let topper='';
  if(fl&&fl.id==='marsh')topper=`<g class="${anim.flavor?'aPop':''}" fill="#fff" stroke="#e8e0e8"><rect x="-34" y="${top-14}" width="22" height="18" rx="6"/><rect x="-6" y="${top-18}" width="22" height="18" rx="6"/><rect x="18" y="${top-12}" width="20" height="16" rx="6"/></g>`;
  if(fl&&fl.id==='jasmine')topper=`<g class="${anim.flavor?'aPop':''}"><g transform="translate(-12,${top-4})">${[0,72,144,216,288].map(a=>`<ellipse rx="5" ry="10" transform="rotate(${a}) translate(0,-8)" fill="#fffef4"/>`).join('')}<circle r="4" fill="#ffe08a"/></g></g>`;
  if(sel.art)topper+=`<g transform="translate(0,${top}) scale(1,.22)">${sel.art}</g>`;
  liq=`<g clip-path="url(#ci${id})"><g class="${anim.base?'aFill':''}"><rect x="-60" y="${top}" width="120" height="200" fill="${col}"/>${sw}${ice}<rect x="-60" y="${top}" width="120" height="200" fill="url(#cl${id})"/><ellipse cx="0" cy="${top}" rx="56" ry="7" fill="${foam}"/>${fl&&fl.id==='straw'&&base.id!=='coffee'?`<ellipse cx="0" cy="${top}" rx="20" ry="3" fill="#f07a9e" opacity=".7"/>`:''}</g></g>${topper}`;
  if(anim.base)stream=`<rect class="aStream" x="-6" y="-260" width="12" height="190" rx="6" fill="${col}"/>`;
 }
 if(tp==='hot')steam=`<path class="steam" d="M-22,-122 q-10,-22 0,-44 q10,-22 0,-44"/><path class="steam s2" d="M4,-122 q-10,-22 0,-44 q10,-22 0,-44"/><path class="steam s3" d="M28,-122 q-10,-22 0,-44 q10,-22 0,-44"/>`;
 if(tp==='warm')steam=`<path class="steam" style="stroke-width:3;stroke:rgba(255,255,255,.22)" d="M-10,-122 q-8,-18 0,-36 q8,-18 0,-36"/><path class="steam s3" style="stroke-width:3;stroke:rgba(255,255,255,.22)" d="M14,-122 q-8,-18 0,-36 q8,-18 0,-36"/>`;
 if(tp==='iced'){const Pt=[[-40,-60],[-30,10],[-44,60],[36,-40],[30,30],[40,80],[-10,90],[14,-80]];cond=Pt.map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="${2+i%3}" ry="${3+i%3}" fill="#fff" opacity=".45"/>`).join('');}
 const ga=anim.flavor?'aPop':'';
 if(fl&&fl.id==='straw')gar=`<g class="${ga}"><g transform="translate(46,-110) rotate(25)"><path d="M0,-14 C14,-16 20,-4 14,8 C9,17 3,22 0,24 C-3,22 -9,17 -14,8 C-20,-4 -14,-16 0,-14Z" fill="#ec4f6c"/><path d="M0,-14 L-8,-21 L-2,-15 L0,-24 L2,-15 L8,-21 Z" fill="#5fae5a"/></g></g>`;
 if(fl&&fl.id==='yuzu')gar=`<g class="${ga}"><g transform="translate(-50,-108)"><circle r="17" fill="#f2df5a"/><circle r="13" fill="#fff2a0"/><g stroke="#f2df5a" stroke-width="1.5"><path d="M0 -13v26M-13 0h26M-9 -9l18 18M9 -9l-18 18"/></g></g></g>`;
 if(fl&&fl.id==='honey')gar=`<g class="${ga}"><g transform="translate(40,-150) rotate(25)"><rect x="-3" y="0" width="6" height="60" rx="3" fill="#c9a77a"/><ellipse cx="0" cy="62" rx="9" ry="12" fill="#e8a830"/></g></g>`;
 if(fl&&fl.id==='anchan')gar=`<g class="${ga}"><g transform="translate(44,-112) rotate(20)"><path d="M0 0 c-14 -6 -14 -26 0 -30 c14 4 14 24 0 30z" fill="#4a3ac8"/></g></g>`;
 if(fl&&fl.id==='mango')gar=`<g class="${ga}"><g transform="translate(46,-112) rotate(20)"><path d="M0 -16 C14 -16 18 0 10 12 C4 20 -8 18 -12 8 C-16 -4 -10 -16 0 -16Z" fill="#f6b83a"/><path d="M-4 -10 q4 -4 8 0" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/></g></g>`;
 if(fl&&fl.id==='ginger')gar=`<g class="${ga}"><g transform="translate(-48,-112)"><path d="M-10 -6 q6 -10 16 -4 q10 0 8 10 q-4 10 -14 6 q-12 2 -10 -12z" fill="#d8b070"/></g></g>`;
 return `<g class="${cls||''}" transform="translate(${cx},${cy}) scale(${s})"><defs><clipPath id="ci${id}"><path d="${inner}"/></clipPath><linearGradient id="cl${id}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".3" stop-color="#fff" stop-opacity=".14"/><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient></defs>
 <ellipse cx="0" cy="120" rx="72" ry="10" fill="#000" opacity=".35"/>${steam}${stream}<path d="${glass}" fill="rgba(220,235,255,.08)" stroke="rgba(235,245,255,.7)" stroke-width="2.5"/>${liq}
 <path d="M-45,-96 L-37,88" stroke="#fff" stroke-width="6" opacity=".22" stroke-linecap="round"/><path d="M40,-96 L35,40" stroke="#fff" stroke-width="2.5" opacity=".18" stroke-linecap="round"/><ellipse cx="0" cy="-112" rx="58" ry="6" fill="none" stroke="rgba(235,245,255,.8)" stroke-width="2"/>${cond}${gar}</g>`;
}
function updateCup(changed){
 const sel=N.sel,two=sel.count==='2';const anim={};
 if(changed&&(changed!=='base'||lastSel.base!==sel.base))anim[changed]=true;
 if(changed==='base'||changed==='flavor')anim.base=changed==='base';
 const a2=Object.assign({},anim);
 $('#cupView').innerHTML=two?cupSVG(120,190,.92,sel,'',a2)+cupSVG(258,206,.8,sel,changed==='count'?'aSlide':'',a2):cupSVG(180,190,1,sel,'',a2);
 lastSel=Object.assign({},sel);
 const parts=['base','flavor','temp','count'].map(k=>sel[k]&&getI(k,sel[k])).filter(Boolean).map(x=>x.m);
 $('#meaningM').textContent=parts.length?parts.join(' · '):'...';
 $('#serveBtn').disabled=!(sel.base&&sel.flavor&&sel.temp&&sel.count);
}
$('#serveBtn').onclick=e=>{e.stopPropagation();serve();};
function serve(){
 $('#brew').style.display='none';
 const sel={...N.sel};
 runMinigames(sel,(q)=>{SFX.clink();if(q.artSvg)sel.art=q.artSvg;if(S.order)serveOrder(sel,q);else serveGhost(sel,q);});
}
function placeServed(sel,cx){const sv=$('#served');sv.style.transition='none';sv.style.opacity=1;sv.innerHTML=sel.count==='2'?cupSVG(cx-43,516,.3,sel,'sv1')+cupSVG(cx+43,516,.3,sel,'sv2'):cupSVG(cx,516,.3,sel,'sv1');}
function serveGhost(sel,q){
 const R=CUR.recipes.find(r=>r.who===N.target);
 const cx=chars[R.who]?+chars[R.who].style.left.replace('px','')+200:640;
 placeServed(sel,R.who==='soba'?640:cx);
 const keys=['base','flavor','temp','count'];const bad=keys.find(k=>!R.ans[k].includes(sel[k]));
 const qline=q.art==='perfect'?[{s:'narr',t:'ลวดลายบนหน้าแก้วสวยจนแขกยิ้มออกมาก่อนจะได้ดื่ม'}]:q.pour==='miss'?[{s:'narr',t:'(น้ำล้นขอบแก้วไปนิดหนึ่ง แต่แขกไม่ได้ว่าอะไร)'}]:[];
 if(!bad){N.done.add(R.who);N.sel={base:null,flavor:null,temp:null,count:null};
  if(D.part===2){const rid='g'+P.n+':'+R.who;if(!P.recipes.includes(rid))P.recipes.push(rid);if(!CUR.finale)addLight(D.LIGHT.goodBrew);}
  if(pendingRecipes().length){return say([...qline,...(CUR.partial&&CUR.partial[R.who]||[])],()=>{openChoices();});}
  const good=typeof CUR.good==='function'?CUR.good(P,N):CUR.good;
  return say([...qline,...good],()=>playLife(()=>endNight(true)));}
 const rt=R.react[bad]||{};const txt=rt[sel[bad]]||rt._||'...';
 const lines=[{s:R.who,e:'shut',t:'(จิบ)...'},{s:R.who,e:'sad',t:txt},{s:'narr',t:'เปลวเทียนเล่มหนึ่งไหววูบ แล้วดับลง',fx:'candleOut clearServed'}];
 if(N.candles-1<=0)return say([...lines,...CUR.bad],()=>endNight(false));
 if(N.candles-1===1)lines.push({s:'soba',t:'เหลือเทียนเล่มสุดท้ายแล้ว ใจเย็นๆ ลองเปิดสมุดความทรงจำทบทวนดูก่อน'});
 const more=CUR.topics.filter(t=>!N.asked.has(t.id)&&reqOK(t.req)).length;
 if(more)lines.push({s:'soba',t:'ยังมีเรื่องที่เจ้ายังไม่ได้ถามนะ ทุกเศษความทรงจำมีความหมาย'});
 else if((CUR.combos||[]).some(c=>N.frags.has(c.a)&&N.frags.has(c.b)&&!N.frags.has(c.r)))lines.push({s:'soba',t:'ในสมุดมีเศษความทรงจำที่ยังไม่ได้ต่อเข้าด้วยกันนะ ลองดูสิ'});
 say(lines,openChoices);
}
const pick=(a)=>a[Math.floor(Math.random()*a.length)];
function serveOrder(sel,q){
 const o=S.order;S.order=null;const it=o.item;placeServed(sel,640);
 const ok=['base','flavor','temp','count'].every(k=>it.r[k]===sel[k]);
 if(!ok){return say([{s:'cust',e:'sad',t:pick(D.CUST_LINES.bad)},{s:'narr',t:'ลูกค้าดื่มไปนิดเดียว แล้วจ่ายแค่ครึ่งราคา',fx:'clearServed'}],()=>{const pay=Math.floor(it.price/2);P.money+=pay;updateHud2();o.cb(pay);});}
 const tipR=(q.pour==='perfect'?.25:q.pour==='good'?.12:0)+(q.art==='perfect'?.3:q.art==='good'?.15:0);
 const tip=Math.round(it.price*tipR*(1+decorBonus('tip')));const pay=it.price+tip;
 const lines=[{s:'cust',e:'happy',t:q.art==='perfect'?pick(D.CUST_LINES.art):pick(D.CUST_LINES.good),fx:'drinkOne'},{s:'narr',t:`ได้รับ ฿${it.price}${tip?` + ทิป ฿${tip}`:''}`}];
 if(!P.recipes.includes(it.id)){P.recipes.push(it.id);lines.push({s:'narr',t:`บันทึกสูตร "${it.n}" ลงในสมุดสูตรแล้ว`});}
 P.money+=pay;updateHud2();SFX.ding();
 say(lines,()=>o.cb(pay));
}
function candleOut(){N.candles--;const idx=N.candles;$('#cd'+idx).classList.add('out');SFX.puff();$$('#hcandles i')[idx].classList.add('off');$('#candleLight').style.opacity=N.candles/3;}
function resetCandles(){$$('.candle').forEach(c=>c.classList.remove('out'));$$('#hcandles i').forEach(c=>c.classList.remove('off'));$('#candleLight').style.opacity=1;}

/* ---------- minigames ---------- */
function runMinigames(sel,cb){
 if(!V.mini)return cb({pour:'good',art:null});
 pourGame(sel,(pour)=>{
  const artOK=sel.temp!=='iced'&&['milk','coffee','cocoa','matcha'].includes(sel.base);
  if(!artOK)return cb({pour,art:null});
  artGame(sel,(art,artSvg)=>cb({pour,art,artSvg}));
 });
}
let pourState=null;
function pourGame(sel,cb){
 const easy=P&&(P.decor||[]).includes('d_machine');
 const col=liquidColor(sel);
 pourState={lv:0,hold:false,done:false,cb,col,easy,t0:0,sel};
 $('#pour').classList.add('on');$('#pourMsg').textContent='กดค้างที่ปุ่ม (หรือ Space) แล้วปล่อยเมื่อน้ำถึงแถบสีทอง';$('#pourRes').textContent='';
 drawPour();let last=performance.now();
 const tick=(now)=>{if(!pourState||pourState.done)return;const dt=(now-last)/1000;last=now;
  if(pourState.hold){pourState.lv+=dt*.42;if(pourState.lv>=1.02){pourState.lv=1.02;finishPour();return;}if(AC&&Math.random()<.3)pluck(300+pourState.lv*500,AC.currentTime,.012,sfxBus);}
  drawPour();requestAnimationFrame(tick);};
 requestAnimationFrame(tick);
}
function drawPour(){
 const s=pourState;if(!s)return;const H=240,top=60,bot=top+H,lvY=bot-s.lv*H;
 const tc=.76,pw=(s.easy?.05:.03),gw=(s.easy?.12:.08);
 const y1=bot-(tc+gw)*H,y2=bot-(tc-gw)*H,p1=bot-(tc+pw)*H,p2=bot-(tc-pw)*H;
 $('#pourSvg').innerHTML=`<defs><clipPath id="pClip"><path d="M80 ${top} L220 ${top} L208 ${bot-10} Q206 ${bot} 194 ${bot} L106 ${bot} Q94 ${bot} 92 ${bot-10}Z"/></clipPath></defs>
  <rect x="60" y="${y1}" width="180" height="${y2-y1}" fill="#f2c98a" opacity=".18"/><rect x="60" y="${p1}" width="180" height="${p2-p1}" fill="#f2c98a" opacity=".45"/>
  <path d="M60 ${p1} h-14 M240 ${p1} h14 M60 ${p2} h-14 M240 ${p2} h14" stroke="#f2c98a" stroke-width="3"/>
  ${s.hold?`<rect x="144" y="0" width="12" height="${lvY}" rx="6" fill="${s.col}" opacity=".95"/><circle cx="150" cy="${lvY}" r="10" fill="#fff" opacity=".35"/>`:''}
  <g clip-path="url(#pClip)"><rect x="60" y="${lvY}" width="180" height="${bot-lvY+4}" fill="${s.col}"/><ellipse cx="150" cy="${lvY}" rx="70" ry="6" fill="#fff" opacity=".25"/></g>
  <path d="M80 ${top} L220 ${top} L208 ${bot-10} Q206 ${bot} 194 ${bot} L106 ${bot} Q94 ${bot} 92 ${bot-10}Z" fill="rgba(220,235,255,.06)" stroke="rgba(235,245,255,.8)" stroke-width="3"/>
  <path d="M92 ${top+14} L100 ${bot-20}" stroke="#fff" stroke-width="6" opacity=".2" stroke-linecap="round"/>
  ${s.lv>1?`<g fill="${s.col}"><ellipse cx="70" cy="${top+30}" rx="10" ry="16"/><ellipse cx="232" cy="${top+50}" rx="8" ry="14"/></g>`:''}`;
}
function finishPour(){
 const s=pourState;if(!s||s.done)return;s.done=true;s.hold=false;drawPour();
 const d=Math.abs(s.lv-.76),pw=s.easy?.05:.03,gw=s.easy?.12:.08;
 const r=s.lv>1?'miss':d<=pw?'perfect':d<=gw?'good':'miss';
 $('#pourRes').textContent=r==='perfect'?'เยี่ยม! พอดีขีดเป๊ะ':r==='good'?'ดี! เกือบพอดี':s.lv>1?'ล้นแก้ว!':s.lv<.76?'น้อยไปหน่อย':'มากไปหน่อย';
 $('#pourRes').className=r;r==='miss'?SFX.err():SFX.ding();
 setTimeout(()=>{$('#pour').classList.remove('on');const cb=s.cb;pourState=null;cb(r);},900);
}
const pourBtn=$('#pourBtn');
const pDown=e=>{e.preventDefault();e.stopPropagation();if(pourState&&!pourState.done){pourState.hold=true;}};
const pUp=e=>{if(e){e.stopPropagation();}if(pourState&&pourState.hold&&!pourState.done){pourState.hold=false;if(pourState.lv>.05)finishPour();}};
pourBtn.addEventListener('pointerdown',pDown);addEventListener('pointerup',pUp);pourBtn.addEventListener('pointerleave',pUp);
addEventListener('keydown',e=>{if(e.key===' '&&pourState&&!pourState.done){e.preventDefault();pourState.hold=true;}});
addEventListener('keyup',e=>{if(e.key===' '&&pourState)pUp();});
$('#pour').addEventListener('click',e=>e.stopPropagation());
/* latte art */
const SHAPES={
 heart:()=>{const p=[];for(let i=0;i<60;i++){const t=i/60*Math.PI*2;p.push([160+16*Math.pow(Math.sin(t),3)*7,150-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*7]);}return p;},
 leaf:()=>{const p=[];for(let i=0;i<=24;i++)p.push([160,60+i*8.5]);for(let k=0;k<6;k++){const y=80+k*26,w=78-k*10;for(let j=0;j<=8;j++){const f=j/8;p.push([160-w*f,y+f*18]);p.push([160+w*f,y+f*18]);}}return p;},
 cat:()=>{const p=[];for(let i=0;i<44;i++){const t=i/44*Math.PI*2;p.push([160+Math.cos(t)*70,175+Math.sin(t)*62]);}[[100,130,110,72,140,118],[220,130,210,72,180,118]].forEach(([a,b,c,d,e,f])=>{for(let j=0;j<=8;j++){const u=j/8;p.push([a+(c-a)*u,b+(d-b)*u]);p.push([c+(e-c)*u,d+(f-d)*u]);}});[[135,165],[185,165]].forEach(([x,y])=>{for(let i=0;i<10;i++){const t=i/10*Math.PI*2;p.push([x+Math.cos(t)*8,y+Math.sin(t)*8]);}});return p;}
};
const SHAPE_N={heart:'หัวใจ',leaf:'ใบไม้',cat:'แมวเหมียว'};
let artState=null;
function artGame(sel,cb){
 const keys=Object.keys(SHAPES);const shape=keys[Math.floor(Math.random()*keys.length)];
 const guide=SHAPES[shape]();artState={guide,pts:[],drawing:false,cb,shape,t:7,done:false,col:liquidColor(sel)};
 $('#artName').textContent=SHAPE_N[shape];$('#art').classList.add('on');$('#artRes').textContent='';
 drawArt();const t0=performance.now();
 const tick=(now)=>{if(!artState||artState.done)return;const left=7-(now-t0)/1000;artState.t=left;$('#artTime i').style.width=Math.max(0,left/7*100)+'%';if(left<=0){finishArt();return;}requestAnimationFrame(tick);};
 requestAnimationFrame(tick);
}
function drawArt(){
 const s=artState;if(!s)return;const c=$('#artCv'),x=c.getContext('2d');x.clearRect(0,0,320,320);
 x.save();x.beginPath();x.arc(160,160,150,0,6.283);x.fillStyle='#e8e0d4';x.fill();x.beginPath();x.arc(160,160,136,0,6.283);x.clip();
 const g=x.createRadialGradient(160,140,10,160,160,140);g.addColorStop(0,mix(s.col,'#ffffff',.15));g.addColorStop(1,mix(s.col,'#000000',.2));x.fillStyle=g;x.fillRect(0,0,320,320);
 x.fillStyle='rgba(255,255,255,.35)';s.guide.forEach(([a,b])=>{x.beginPath();x.arc(a,b,3,0,6.283);x.fill();});
 x.strokeStyle='#fff8ee';x.lineWidth=13;x.lineCap='round';x.lineJoin='round';x.shadowColor='rgba(255,255,255,.6)';x.shadowBlur=6;
 s.pts.forEach(st=>{if(st.length<2){if(st.length){x.beginPath();x.arc(st[0][0],st[0][1],6,0,6.283);x.fillStyle='#fff8ee';x.fill();}return;}x.beginPath();x.moveTo(st[0][0],st[0][1]);st.forEach(p=>x.lineTo(p[0],p[1]));x.stroke();});
 x.restore();
}
function artPos(e){const c=$('#artCv'),r=c.getBoundingClientRect();return[(e.clientX-r.left)/r.width*320,(e.clientY-r.top)/r.height*320];}
$('#artCv').addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(!artState||artState.done)return;artState.drawing=true;artState.pts.push([artPos(e)]);drawArt();});
$('#artCv').addEventListener('pointermove',e=>{if(!artState||!artState.drawing)return;const st=artState.pts[artState.pts.length-1];st.push(artPos(e));drawArt();});
addEventListener('pointerup',()=>{if(artState)artState.drawing=false;});
$('#artDone').onclick=e=>{e.stopPropagation();finishArt();};
$('#artSkip').onclick=e=>{e.stopPropagation();if(!artState)return;artState.pts=[];finishArt(true);};
$('#art').addEventListener('click',e=>e.stopPropagation());
function finishArt(skip){
 const s=artState;if(!s||s.done)return;s.done=true;
 const all=[].concat(...s.pts);let hit=0;s.guide.forEach(([a,b])=>{if(all.some(([x,y])=>(x-a)*(x-a)+(y-b)*(y-b)<16*16))hit++;});
 const cov=hit/s.guide.length;const stray=all.filter(([x,y])=>!s.guide.some(([a,b])=>(x-a)*(x-a)+(y-b)*(y-b)<26*26)).length/(all.length||1);
 const sc=cov-stray*.35;const r=skip||!all.length?null:sc>=.62?'perfect':sc>=.32?'good':'messy';
 $('#artRes').textContent=r==='perfect'?`สวยมาก! ${SHAPE_N[s.shape]}ชัดเจน`:r==='good'?'ใช้ได้เลย!':r==='messy'?'ลายเบี้ยวนิดหน่อย แต่ก็น่ารักดี':'ข้ามการวาด';
 $('#artRes').className=r||'';r==='perfect'?SFX.sparkle():r?SFX.ding():null;
 const svg=all.length?`<g fill="none" stroke="#fff8ee" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity=".9" transform="translate(-50,-50) scale(.3125)">${s.pts.filter(st=>st.length>1).map(st=>`<path d="M${st.map(p=>p[0].toFixed(0)+' '+p[1].toFixed(0)).join(' L')}"/>`).join('')}</g>`:'';
 setTimeout(()=>{$('#art').classList.remove('on');const cb=s.cb;artState=null;cb(r,svg);},skip?200:1000);
}

/* ---------- ICONS ---------- */
const ICON={
 coffee:`<path d="M10 20h24v10a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10z" fill="#efe6da"/><path d="M34 23h3a5 5 0 0 1 0 10h-3" stroke="#efe6da" stroke-width="3" fill="none"/><ellipse cx="22" cy="20" rx="12" ry="3" fill="#3b2216"/><ellipse cx="22" cy="10" rx="4" ry="6" fill="#6a3a22" transform="rotate(30 22 10)"/>`,
 matcha:`<path d="M8 38C8 20 22 8 40 8C40 26 28 40 8 38Z" fill="#86ad5e"/><path d="M8 38C18 28 26 20 36 12" stroke="#4f7a36" stroke-width="2" fill="none"/>`,
 milk:`<path d="M17 6h14v6l5 7v21a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V19l5-7z" fill="#f6f0e6"/><rect x="16" y="3" width="16" height="5" rx="2" fill="#6aa0d8"/><rect x="12" y="24" width="24" height="10" fill="#6aa0d8"/>`,
 thai:`<path d="M13 8h22l-3 32a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3z" fill="#e0853a"/><path d="M13 8h22l-1 8H14z" fill="#f6efe2"/><path d="M28 2l-4 30" stroke="#d94a4a" stroke-width="2.5"/>`,
 cocoa:`<path d="M10 18h26v12a12 12 0 0 1-12 12h-2a12 12 0 0 1-12-12z" fill="#c06040"/><ellipse cx="23" cy="18" rx="13" ry="3" fill="#6a3a24"/><path d="M14 16 q-4 -6 2 -8 q2 -6 8 -3 q5 -4 8 2 q6 0 4 7z" fill="#fff"/>`,
 straw:`<path d="M24 14c10-2 14 8 10 16c-3 7-8 11-10 12c-2-1-7-5-10-12c-4-8 0-18 10-16z" fill="#ec4f6c"/><path d="M24 14l-6-6l5 5l1-8l1 8l5-5z" fill="#5fae5a"/><g fill="#ffe08a"><ellipse cx="20" cy="22" rx="1" ry="1.7"/><ellipse cx="28" cy="21" rx="1" ry="1.7"/><ellipse cx="24" cy="29" rx="1" ry="1.7"/></g>`,
 honey:`<path d="M12 16h24v20a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z" fill="#e8a830"/><rect x="14" y="10" width="20" height="7" rx="2" fill="#a8662a"/><path d="M12 22q6 4 12 0t12 0" stroke="#ffd27a" stroke-width="2" fill="none"/>`,
 yuzu:`<circle cx="24" cy="26" r="14" fill="#f2df5a"/><circle cx="24" cy="26" r="10" fill="#fff2a0"/><g stroke="#f2df5a" stroke-width="1.5"><path d="M24 16v20M14 26h20M17 19l14 14M31 19L17 33"/></g><path d="M26 12q6-8 12-4q-6 4-12 4z" fill="#5fae5a"/>`,
 caramel:`<path d="M24 6C30 18 36 24 36 31a12 12 0 0 1-24 0c0-7 6-13 12-25z" fill="#a8662a"/><path d="M19 28a6 6 0 0 0 4 8" stroke="#e0a060" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
 marsh:`<rect x="8" y="14" width="18" height="16" rx="6" fill="#fff" stroke="#e0d0e0"/><rect x="22" y="22" width="18" height="16" rx="6" fill="#ffe8f0" stroke="#e0d0e0"/><rect x="14" y="28" width="16" height="14" rx="5" fill="#fff" stroke="#e0d0e0"/>`,
 anchan:`<path d="M24 40 c-16 -6 -16 -30 0 -34 c16 4 16 28 0 34z" fill="#4a3ac8"/><path d="M24 34 c-8 -4 -8 -18 0 -22" stroke="#fff" stroke-width="2.5" fill="none" opacity=".6"/><circle cx="24" cy="30" r="3" fill="#f2e05a"/>`,
 jasmine:`<g transform="translate(24,24)">${[0,72,144,216,288].map(a=>`<ellipse rx="6" ry="12" transform="rotate(${a}) translate(0,-9)" fill="#fffef4" stroke="#e8e4d0"/>`).join('')}<circle r="5" fill="#ffe08a"/></g>`,
 mango:`<path d="M24 8 C38 8 42 26 34 36 C28 44 14 42 10 32 C6 20 12 8 24 8Z" fill="#f6b83a"/><path d="M24 8 q4 -6 10 -4" stroke="#5fae5a" stroke-width="3" fill="none"/><path d="M16 18 q4 -4 8 -2" stroke="#fff" stroke-width="2.5" fill="none" opacity=".6"/>`,
 ginger:`<path d="M10 30 q4 -14 14 -10 q6 -10 14 -2 q8 6 0 14 q-6 8 -14 4 q-10 6 -14 -6z" fill="#d8b070"/><path d="M20 22 q2 6 0 12 M30 20 q2 6 -2 12" stroke="#a8804a" stroke-width="1.5" fill="none"/>`,
 none:`<circle cx="24" cy="24" r="14" fill="none" stroke="#a8937c" stroke-width="3"/><path d="M14 34L34 14" stroke="#a8937c" stroke-width="3"/>`,
 hot:`<path d="M24 4c4 8 12 12 12 22a12 12 0 0 1-24 0c0-6 4-8 5-14c3 4 3 6 5 8c2-6 0-10 2-16z" fill="#ff6a3a"/><path d="M24 22c2 4 6 6 6 11a6 6 0 0 1-12 0c0-4 4-6 6-11z" fill="#ffd27a"/>`,
 warm:`<path d="M24 40C10 30 6 24 6 17a8 8 0 0 1 18-4a8 8 0 0 1 18 4c0 7-4 13-18 23z" fill="#ffb06a"/><path d="M16 8q-3-4 0-7M24 8q-3-4 0-7M32 8q-3-4 0-7" stroke="#ffe0b0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>`,
 iced:`<rect x="8" y="10" width="18" height="18" rx="4" fill="#bfe6ff" opacity=".85" transform="rotate(-12 17 19)"/><rect x="22" y="20" width="18" height="18" rx="4" fill="#e4f6ff" opacity=".9" transform="rotate(10 31 29)"/>`,
 '1':`<path d="M14 14h20l-2 24a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3z" fill="#f2d4a8"/><ellipse cx="24" cy="14" rx="10" ry="2.5" fill="#fff4e0"/>`,
 '2':`<path d="M5 16h16l-2 20a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3z" fill="#f2d4a8"/><ellipse cx="13" cy="16" rx="8" ry="2" fill="#fff4e0"/><path d="M27 16h16l-2 20a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3z" fill="#ffb0c8"/><ellipse cx="35" cy="16" rx="8" ry="2" fill="#ffe0ea"/>`
};

/* ---------- title card ---------- */
function titleCard(a,b,c,cb){const n=$('#nightCard');$('#ncA').textContent=a;$('#ncB').textContent=b;$('#ncC').textContent=c||'';n.classList.add('on');setTimeout(()=>{n.classList.remove('on');setTimeout(cb,900);},2600);}
function showHud(on,night){$('#hud').style.display=on?'flex':'none';$('#topright').style.display=on?'flex':'none';$('#hud').classList.toggle('dayhud',!night);}

/* ---------- night flow ---------- */
function startNight(n,retry){
 CUR=D.NIGHTS[n];N=freshN();S.state='intro';
 P.phase='night';P.n=n;
 if(D.part===2&&!retry&&!P['lit'+n]){P['lit'+n]=1;P.light=Math.max(0,P.light-D.LIGHT.perNight);}
 saveP();
 clearChars();resetCandles();$('#served').innerHTML='';$('#keepsake').style.opacity=0;$('#keepsake').innerHTML='';hideFlash();
 $('#cat').classList.remove('guest','gone','heal');
 (P.pre||[]).forEach(id=>{if(CUR.frags[id]){N.frags.add(id);N.order.push(id);}});
 setWeather(CUR.weather,false);setMusic(CUR.music);renderDecor();updateHud2();
 $('#nightTag').textContent=CUR.title+' · '+(CUR.time.split('·')[0].trim());updateJCount();renderJournal();
 showHud(false);
 const go=()=>{showHud(true,true);say(retry?CUR.retry:CUR.intro(P),openChoices);};
 if(retry)setTimeout(go,900);else titleCard(CUR.title,CUR.sub,CUR.time,go);
}
function endNight(good){
 const n=P.n;
 if(CUR.finale)return finale(good);
 S.state='end';const k=CUR.keepsake;
 const e=$('#end');
 const ksD=k?D.KEEPSAKES[k]:null;
 const nextTxt=D.part===2?'ไปต่อ: วันรุ่งขึ้น':(n<5?'ไปต่อ: เช้าวันรุ่งขึ้น':'ไปต่อ');
 const lightRow=D.part===2?`<div>แสงของโซบะ <b>${P.light}%</b></div>`:'';
 $('#endCard').innerHTML=good?`<div class="k">${CUR.title} · จบ</div><h2>${CUR.endName.good}</h2>
  ${ksD?`<svg class="ks" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#ff9cc0" opacity=".14"/><g transform="translate(60,60) scale(1.6)">${ksIcon(k)}</g></svg>
  <div class="kt">ของที่ระลึก: ${ksD.n}</div><div class="kd">${ksD.d}</div>`:''}
  <div class="stats"><div>ความทรงจำ <b>${N.frags.size}/${Object.keys(CUR.frags).length}</b></div><div>เทียนที่เหลือ <b>${N.candles}/3</b></div>${lightRow}</div>
  <button id="eNext">${nextTxt}</button>`
 :`<div class="k">${CUR.title} · จบ</div><h2>${CUR.endName.bad}</h2>
  <div class="kt" style="margin-top:14px">${nameOf(CUR.cast[0].k)}จากไปทั้งที่ยังค้างคาใจ</div><div class="kd">เคล็ดลับ: ถามให้ครบทุกเรื่อง ลองต่อความทรงจำในสมุด แล้วจับคู่ "ความหมาย" ของส่วนผสม</div>
  <div class="stats"><div>ความทรงจำ <b>${N.frags.size}/${Object.keys(CUR.frags).length}</b></div>${lightRow}</div>
  <div class="btnrow"><button id="eRetry">ย้อนเวลากลับไปเที่ยงคืน</button><button id="eNext" class="ghostbtn">ยอมรับแล้วไปต่อ</button></div>`;
 e.style.display='flex';requestAnimationFrame(()=>e.classList.add('on'));
 const close=()=>{e.classList.remove('on');setTimeout(()=>e.style.display='none',1000);};
 $('#eNext').onclick=ev=>{ev.stopPropagation();SFX.tap();close();
  P.res[n]=good?'good':'bad';if(good&&k&&!P.keepsakes.includes(k)){P.keepsakes.push(k);unlockG('ks',k);}
  P.pre=[];saveP();
  setTimeout(()=>playDiary(n,()=>{if(D.part===2)startDay2(n);else if(n<5)startDay(n);else startEnding();}),700);};
 const r=$('#eRetry');if(r)r.onclick=ev=>{ev.stopPropagation();SFX.tap();close();if(D.part===2)P.flags.yomPass=false;setTimeout(()=>startNight(n,true),300);};
}
function ksIcon(k){
 if(k==='clip')return ART.clipShape();
 if(k==='drawing')return `<g transform="translate(-30,-24)"><rect width="60" height="48" fill="#fffdf6"/><path d="M10 40 h30 l-4 -20 h-22z" fill="#8a5030"/><path d="M14 18 q4 -8 10 -3 q6 -6 10 3z" fill="#fff" stroke="#ccc"/><circle cx="48" cy="12" r="6" fill="#f2c84a"/></g>`;
 if(k==='tincup')return `<g transform="translate(-14,-18)"><path d="M0 4 h26 l-3 30 q-1 4 -5 4 h-10 q-4 0 -5 -4z" fill="#c8ccd4"/><g fill="#d84a5a"><circle cx="9" cy="18" r="3"/><circle cx="17" cy="24" r="3"/></g><ellipse cx="13" cy="4" rx="13" ry="2.5" fill="#e8ecf2"/></g>`;
 if(k==='chime')return `<g transform="translate(0,-34)"><path d="M-16 34 q16 -18 32 0 q-16 -4 -32 0z" fill="#f2b8c8"/><g stroke="#c8a060" stroke-width="1"><path d="M-10 34 v20 M0 34 v28 M10 34 v18"/></g><g fill="#e8d8a0"><rect x="-12" y="52" width="4" height="10"/><rect x="-2" y="60" width="4" height="10"/><rect x="8" y="50" width="4" height="10"/></g></g>`;
 if(k==='notebook')return `<g transform="translate(-26,-20)"><rect width="52" height="40" rx="3" fill="#5a3a24"/><rect x="4" y="4" width="44" height="32" fill="#f6ead2"/><path d="M26 4 v32" stroke="#c8b08a"/><path d="M8 12 h14 M8 18 h12 M30 12 h14 M30 18 h10" stroke="#8a6a4a" stroke-width="1.5"/></g>`;
 if(k==='collar')return `<g><path d="M-24 -8 q24 22 48 0" stroke="#c8384a" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="0" cy="10" r="9" fill="#f2c45a"/><text y="13" text-anchor="middle" font-size="7" font-family="Mali" fill="#6a4020">ด่าง</text></g>`;
 if(k==='photo85')return `<g transform="translate(-26,-20)"><rect width="52" height="40" fill="#fff"/><rect x="4" y="4" width="44" height="28" fill="#5ab4e8"/><circle cx="18" cy="20" r="6" fill="#f6dcd0"/><circle cx="34" cy="20" r="6" fill="#d8a888"/><rect x="12" y="26" width="12" height="6" fill="#f4f4f8"/><rect x="28" y="26" width="12" height="6" fill="#e8d8a8"/></g>`;
 if(k==='flashlight')return `<g transform="rotate(-20)"><rect x="-22" y="-7" width="34" height="14" rx="4" fill="#333"/><rect x="10" y="-9" width="12" height="18" rx="3" fill="#666"/><path d="M22 -9 l22 -8 v34 l-22 -8z" fill="#fff8c0" opacity=".5"/></g>`;
 if(k==='mic')return `<g><rect x="-3" y="-4" width="6" height="30" rx="3" fill="#555"/><circle cy="-12" r="11" fill="#888"/><path d="M-8 -16 h16 M-8 -10 h16" stroke="#bbb"/></g>`;
 return '';
}

/* ---------- day flow ---------- */
function startDay(d){
 const DY=D.DAYS[d];CUR=null;N=null;S.state='intro';
 P.phase='day';P.n=d;saveP();
 clearChars();$('#served').innerHTML='';$('#keepsake').style.opacity=0;hideFlash();resetCandles();
 setWeather(null,true);setMusic(DY.music);renderDecor();
 $('#nightTag').textContent=DY.title+' · กลางวัน';showHud(false);
 titleCard(DY.title,DY.sub,DY.time,()=>{showHud(true,false);
  say(DY.lines(P),()=>{const C=DY.choice(P);dayChoice(C.q,C.opts,(o)=>{
   P.bond+=o.bond||0;if(o.flag)P.flags[o.flag]=true;saveP();
   say(o.lines,()=>say(DY.after(P),()=>{P.pre=(DY.next&&DY.next.pre)||[];saveP();startNight(d+1);}));});});});
}

/* ---------- ending ---------- */
function startEnding(){
 const key=D.endingFor(P);const E=D.ENDINGS[key];S.state='intro';CUR=null;N=null;
 clearChars();$('#served').innerHTML='';$('#keepsake').style.opacity=0;
 setWeather(null,key!=='bitter');setMusic(key==='bitter'?'n5':'day');renderDecor();showHud(false);
 titleCard('บทส่งท้าย',E.t,'',()=>say(E.lines(P),()=>{
  unlockG('endings',key);G.p1={ending:key,bond:P.bond,flags:P.flags};const firstUnlock=!G.unlock2;G.unlock2=true;saveG();
  const helped=[1,2,3,4,5].filter(n=>P.res[n]==='good').length;
  $('#endCard').innerHTML=`<div class="k">ตอนจบ ${key==='true'?'(ตอนจบที่แท้จริง)':''}</div><h2>${E.t}</h2><div class="kt" style="margin-top:6px">${E.d}</div>
   <div class="stats"><div>ช่วยวิญญาณได้ <b>${helped}/5</b></div><div>ความผูกพันกับย่าน <b>${P.bond}/4</b></div><div>ตอนจบที่ปลดล็อก <b>${G.endings.length}/3</b></div></div>
   <div class="kd" style="margin-bottom:18px">${key==='true'?'ขอบคุณที่เล่นจนจบ ร้านนี้จะเปิดรอคุณเสมอ':'ยังมีตอนจบอื่นรออยู่ ลองช่วยทุกคน และเลือกทางที่ใจบอกดูนะ'}</div>
   <button id="eMenu">กลับเมนูหลัก</button>`;
  LS.del('lastcup.save');P=null;
  const e=$('#end');e.style.display='flex';requestAnimationFrame(()=>e.classList.add('on'));S.state='end';
  $('#eMenu').onclick=ev=>{ev.stopPropagation();e.classList.remove('on');setTimeout(()=>e.style.display='none',1000);if(firstUnlock)playCS('teaser',backToMenu);else backToMenu();};
 }));
}

/* ================= CUTSCENES ================= */
const STORY=window.STORY;
(function mergeExtra(){[1,2].forEach(p=>{const DD=p===1?D1:D2;Object.keys(STORY.EXTRA[p]).forEach(n=>{const t=STORY.EXTRA[p][n];const ng=DD.NIGHTS[n];if(ng&&!ng.topics.find(x=>x.id===t.id))ng.topics.push(t);});});})();
let csNext=null,csSkip=null,csTyping=false,csTimer=null;
function charMarkup(c){return c==='prang'?ART.prang():c==='dang'?ART.dog():ART.char(ART.CHARS[c]);}
function catMarkup(){return $('#cat svg').outerHTML;}
function playCS(id,done,beatsOverride){
 const C=STORY.CS[id];if(!C){done&&done();return;}
 if(id.startsWith('life_'))unlockG('cs',id);
 const prev=S.state;S.state='cs';hideChoices();
 const el=$('#cs');el.classList.add('on');$('#csTitle').textContent=C.title||'';
 const beats=beatsOverride||C.beats;let i=0;
 const fin=()=>{el.classList.remove('on');clearTimeout(csTimer);csNext=csSkip=null;S.state=prev==='dialog'?'idle':prev;setTimeout(()=>done&&done(),500);};
 const show=()=>{if(i>=beats.length)return fin();renderBeat(beats[i]);};
 csNext=()=>{if(csTyping){revealAll();return;}i++;SFX.tap();show();};
 csSkip=()=>{i=beats.length;fin();};
 show();
}
function revealAll(){csTyping=false;clearTimeout(csTimer);$('#csStage .beat').classList.add('all');}
function renderBeat(b){
 const st=$('#csStage'),cap=$('#csCap');let h='',stag=0,n=0;
 const txt=(v)=>typeof v==='function'?v(P):v;
 switch(b.k){
  case 'card':h=`<div class="beat cCard"><div class="a">${b.t}</div>${b.s?`<div class="b">${b.s}</div>`:''}</div>`;break;
  case 'cg':h=`<div class="beat cCg kb-${b.fx||'in'}"><svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">${ART.FLASH[b.id].svg}</svg></div>`;unlockG('cg',b.id);break;
  case 'face':{const dog=b.c==='dang';h=`<div class="beat cFace"><div class="glow"></div><div class="chr show human x-${b.e||'neutral'}" style="position:relative;left:0;top:0;width:560px;height:580px;overflow:hidden"><div><svg viewBox="${dog?'60 150 280 300':'84 34 232 300'}" width="560" height="${dog?600:724}">${charMarkup(b.c)}</svg></div></div></div>`;break;}
  case 'obj':h=`<div class="beat cObj"><div class="glow"></div><svg viewBox="-200 -160 400 320" width="640" height="512">${STORY.OBJ[b.o]||''}</svg></div>`;break;
  case 'quote':h=`<div class="beat cQuote"><div class="q">${b.t}</div>${b.who?`<div class="w">— ${b.who}</div>`:''}</div>`;break;
  case 'cat':h=`<div class="beat cCat cat-${b.e||'n'}"><div class="glow"></div>${catMarkup()}</div>`;break;
  case 'diary':{const L=txt(b.t);n=L.length;stag=1.5;h=`<div class="beat cDiary"><div class="paper"><div class="dt">${b.date||''}</div>${L.map((l,i)=>`<p style="animation-delay:${i*stag}s">${l}</p>`).join('')}</div></div>`;break;}
  case 'phone':n=b.lines.length;stag=1.1;h=`<div class="beat cPhone"><div class="ph"><div class="phTop">ข้อความ</div>${b.lines.map((m,i)=>`<div class="msg ${m.f==='คุณ'?'me':m.f==='ระบบ'?'sys':''}" style="animation-delay:${i*stag+.3}s">${m.f!=='คุณ'&&m.f!=='ระบบ'?`<b>${m.f}</b>`:''}${m.t}</div>`).join('')}</div></div>`;break;
  case 'voice':n=b.lines.length;stag=2.4;h=`<div class="beat cVoice"><div class="ph"><div class="vName">ยาย</div><div class="vSub">ข้อความเสียง · 0:42</div><div class="wave">${[...Array(28)].map((_,i)=>`<i style="animation-delay:${(i%7)*.12}s;height:${10+((i*37)%30)}px"></i>`).join('')}</div></div><div class="vt">${b.lines.map((l,i)=>`<p style="animation-delay:${i*stag+.4}s">${l}</p>`).join('')}</div></div>`;break;
 }
 st.innerHTML=h;cap.classList.remove('on');cap.textContent=b.k==='card'||b.k==='quote'?'':(b.t&&typeof b.t==='string'?b.t:'');
 if(b.k==='diary'||b.k==='voice'||b.k==='phone')cap.textContent=b.k==='diary'?'':(b.t||'');
 requestAnimationFrame(()=>{st.querySelector('.beat').classList.add('in');setTimeout(()=>cap.classList.add('on'),b.k==='phone'||b.k==='voice'?n*stag*1000+300:500);});
 csTyping=!!n;clearTimeout(csTimer);if(n)csTimer=setTimeout(()=>{csTyping=false;},n*stag*1000+400);
 if(b.k==='voice'&&AC){const t=AC.currentTime;for(let i=0;i<5;i++)pluck(mtof([67,69,72,74,76][i]),t+i*.5,.02,sfxBus);}
}
$('#cs').addEventListener('click',e=>{e.stopPropagation();if(e.target.closest('#csSkipBtn'))return;csNext&&csNext();});
$('#csSkipBtn').addEventListener('click',e=>{e.stopPropagation();csSkip&&csSkip();});
addEventListener('keydown',e=>{if(S.state!=='cs')return;if(e.key===' '||e.key==='Enter'){e.preventDefault();e.stopImmediatePropagation();csNext&&csNext();}else if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();csSkip&&csSkip();}},true);
function playLife(cb){const id=STORY.LIFE[D.part]&&STORY.LIFE[D.part][P.n];if(id&&!CUR.finale)playCS(id,cb);else cb();}
function playDiary(n,cb){const id=STORY.DIARY[D.part]&&STORY.DIARY[D.part][n];if(id)playCS(id,cb);else cb();}

/* ================= PART 2 ================= */
const newP2=()=>({v:2,part:2,phase:'night',n:1,res:{},bond:0,flags:{},keepsakes:[],unlocked:['cocoa','marsh','anchan','jasmine'],pre:[],known:['ton','nuch','pen','daeng','yai'],money:120,light:D2.LIGHT.start,aff:{ton:0,nuch:0,pen:0,daeng:0},sobaMem:[],decor:[],recipes:['latte','thaitea'],bought:{},forgot:[],earned:0,p1end:G.p1?G.p1.ending:null});
function addLight(v){if(!P||D.part!==2)return;P.light=Math.max(0,Math.min(100,P.light+v));updateHud2();if(v>0){const c=$('#cat');c.classList.remove('glow');void c.offsetWidth;c.classList.add('glow');}}
function updateHud2(){
 if(!P||D.part!==2){$('#cat').style.opacity='';return;}
 $('#hMoney b').textContent=P.money;$('#hLight i').style.width=P.light+'%';$('#hLight b').textContent=P.light+'%';
 $('#hLight').classList.toggle('low',P.light<D.LIGHT.stayMin);
 if(!$('#cat').classList.contains('gone'))$('#cat').style.opacity=(.3+.7*P.light/100).toFixed(2);
}
function decorBonus(k){let v=0;(P.decor||[]).forEach(id=>{const it=D.SHOP&&D.SHOP.find(x=>x.id===id);if(it&&it[k])v+=it[k];if(id==='d_kids'&&k==='cust')v+=1;});if(k==='cust'&&P.flags.penHelp)v+=1;return v;}
const DECOR2={
 d_rose:{layer:'front',svg:`<g transform="translate(436,494)"><path d="M4 30 h26 l-3 22 h-20z" fill="#c97a4d"/><rect x="2" y="27" width="30" height="6" rx="2" fill="#d98b5d"/><path d="M17 28 v-14 M10 28 q-2 -10 -6 -14 M24 28 q2 -10 6 -14" stroke="#4f8a4a" stroke-width="2" fill="none"/><g fill="#e0405a"><circle cx="17" cy="10" r="7"/><circle cx="5" cy="13" r="6"/><circle cx="30" cy="13" r="6"/></g><g fill="#ff7a8a"><circle cx="16" cy="8" r="3"/><circle cx="4" cy="11" r="2.5"/><circle cx="29" cy="11" r="2.5"/></g></g>`},
 d_lantern:{layer:'mid',svg:`<g transform="translate(925,0)"><path d="M0 0 v40" stroke="#5a3a24" stroke-width="1.5"/><ellipse cx="0" cy="62" rx="18" ry="24" fill="#e84a3a"/><ellipse cx="0" cy="62" rx="18" ry="24" fill="url(#lanG)"/><path d="M-18 62 h36 M-16 50 h32 M-16 74 h32" stroke="#a02a1a" stroke-width="1" opacity=".6"/><rect x="-8" y="36" width="16" height="5" fill="#3a2418"/><rect x="-8" y="84" width="16" height="5" fill="#3a2418"/><path d="M0 89 v14" stroke="#f2c45a" stroke-width="2"/><circle cx="0" cy="62" r="34" fill="#ffb060" opacity=".18"/></g>`},
 d_record:{layer:'mid',svg:`<g transform="translate(866,398)"><rect width="52" height="30" rx="3" fill="#6a3a24"/><ellipse cx="22" cy="10" rx="17" ry="6" fill="#1a1a1a"/><ellipse cx="22" cy="10" rx="5" ry="2" fill="#c0503a"/><path d="M42 4 l-10 8" stroke="#ccc" stroke-width="2"/><circle cx="44" cy="22" r="2" fill="#f2c45a"/></g>`},
 d_sign:{layer:'bg',svg:`<g transform="translate(236,330)"><rect width="84" height="64" rx="4" fill="#3a2418"/><rect x="5" y="5" width="74" height="54" fill="#1f2a26"/><text x="42" y="26" text-anchor="middle" font-family="Mali" font-size="12" font-weight="700" fill="#f1ede4">เมนูวันนี้</text><text x="42" y="44" text-anchor="middle" font-family="Mali" font-size="9" fill="#ffc2dc">มีโกโก้ใส่ก้อนเมฆ!</text><path d="M14 52 h56" stroke="#f1ede4" stroke-width="1" opacity=".5"/></g>`},
 d_machine:{layer:'front',svg:`<g><rect x="176" y="410" width="162" height="10" rx="5" fill="url(#goldG)"/><path d="M330 420 l4 -8 l4 8 l-8 -4 h8z" fill="#fff6c0"/></g>`},
 d_kids:{layer:'bg',svg:`<g>${[[24,336,-6,'#f2c84a'],[94,346,4,'#5a8ad0'],[938,380,-3,'#e0567e'],[1004,388,6,'#3ab04a']].map(([x,y,r,c])=>`<g transform="translate(${x},${y}) rotate(${r})"><rect width="56" height="44" fill="#fffdf6"/><rect x="18" y="-4" width="20" height="8" fill="#f2e8a0" opacity=".85"/><circle cx="18" cy="22" r="9" fill="none" stroke="${c}" stroke-width="3"/><path d="M32 34 l8 -14 l8 14z" fill="${c}" opacity=".7"/></g>`).join('')}</g>`}
};
const SEASON={
 winter:`<g class="fairy"><path d="M0 34 Q320 78 640 40 T1280 34" stroke="#2a1a14" stroke-width="1.5" fill="none"/>${[...Array(22)].map((_,i)=>{const t=i/21,x=t*1280;const y=t<.5?34+Math.sin(t*2*Math.PI)*28+6:34+Math.sin(t*2*Math.PI)*24+6;const c=['#ffd27a','#ff8a8a','#8ad8ff','#a8f0a0'][i%4];return `<g class="bulb" style="animation-delay:${(i%5)*.4}s"><circle cx="${x.toFixed(0)}" cy="${(y+8).toFixed(0)}" r="12" fill="${c}" opacity=".3"/><circle cx="${x.toFixed(0)}" cy="${(y+8).toFixed(0)}" r="4.5" fill="${c}"/></g>`;}).join('')}</g>`,
 songkran:`<g>${[362,912].map(x=>`<g transform="translate(${x},40)">${[...Array(14)].map((_,i)=>`<circle cx="${(i%2)*3}" cy="${i*15}" r="7" fill="${i%3===2?'#fff8e8':i%2?'#ffb02a':'#ff8a1a'}"/>`).join('')}<path d="M0 210 l-6 18 h12z" fill="#e84a6a"/></g>`).join('')}<g transform="translate(640,92)"><rect x="-78" y="-14" width="156" height="26" rx="13" fill="#2a8ad0" opacity=".85"/><text y="5" text-anchor="middle" font-family="Mali" font-size="13" font-weight="700" fill="#fff">สุขสันต์วันสงกรานต์</text></g></g>`,
 okpansa:`<g clip-path="url(#winClip2)"><g class="boat"><g transform="translate(560,372)"><path d="M-110 30 Q0 50 110 30 L96 42 Q0 58 -96 42Z" fill="#3a1a0a"/>${[...Array(26)].map((_,i)=>{const a=i/25;const x=-100+a*200;const y=30-Math.sin(a*Math.PI)*70;return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="3" fill="#ffd27a"/>`;}).join('')}${[...Array(9)].map((_,i)=>`<circle cx="${-60+i*15}" cy="${-10-Math.sin(i/8*Math.PI)*30}" r="2.6" fill="#ffb060"/>`).join('')}<ellipse cx="0" cy="0" rx="130" ry="70" fill="#ff9a3a" opacity=".22" filter="url(#fogBlur)"/><g opacity=".35" transform="scale(1,-.5) translate(0,-110)"><path d="M-100 30 Q0 -40 100 30" stroke="#ffb060" stroke-width="5" fill="none"/></g></g></g></g>`,
 yom:`<g clip-path="url(#winClip2)"><circle cx="790" cy="140" r="130" fill="#a0101a" opacity=".25" filter="url(#fogBlur)"/><circle cx="790" cy="140" r="31" fill="#c8202a"/><circle cx="782" cy="134" r="6" fill="#901018" opacity=".6"/><rect x="380" y="60" width="520" height="380" fill="#3a0010" opacity=".25"/></g>`,
 rainy:'',newyear:''
};
const W={splash:false,lightning:false,fireworks:false,flash:0,nextEv:0,fw:[]};
function applySeason(w){
 const s=w&&w.season||'';stage.dataset.season=s;['winter','songkran','rainy','okpansa','yom','newyear'].forEach(k=>stage.classList.toggle('s-'+k,k===s));
 $('#season').innerHTML=SEASON[s]||'';
 W.splash=s==='songkran';W.lightning=s==='rainy';W.fireworks=s==='newyear';W.fw=[];W.nextEv=performance.now()+2500;
}
function seasonTick(now){
 if(now>W.nextEv){
  if(W.lightning){W.flash=1;W.nextEv=now+5000+Math.random()*7000;setTimeout(thunder,300+Math.random()*700);}
  else if(W.splash){const cx=60+Math.random()*400,cy=60+Math.random()*200;for(let i=0;i<16;i++){const d=drops[i%drops.length];Object.assign(d,{x:cx+(Math.random()-.5)*90,y:cy+(Math.random()-.5)*60,r:2+Math.random()*5,slide:true,t:Math.random()*30,v:0});}W.flash=.35;W.nextEv=now+2500+Math.random()*3500;if(AC){const t=AC.currentTime,s=AC.createBufferSource(),bp=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;bp.type='bandpass';bp.frequency.value=2200;g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.5);s.connect(bp);bp.connect(g);g.connect(sfxBus);s.start(t);s.stop(t+.6);}}
  else if(W.fireworks){const cx=80+Math.random()*360,cy=50+Math.random()*130,col=[[255,120,160],[255,210,110],[140,220,255],[180,255,150],[220,160,255]][Math.floor(Math.random()*5)];for(let i=0;i<46;i++){const a=Math.random()*6.283,v=.8+Math.random()*2.2;W.fw.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,c:col});}W.nextEv=now+900+Math.random()*1600;if(AC){const t=AC.currentTime,s=AC.createBufferSource(),lp=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;lp.type='lowpass';lp.frequency.value=400;g.gain.setValueAtTime(.18,t+.05);g.gain.exponentialRampToValueAtTime(.001,t+.9);s.connect(lp);lp.connect(g);g.connect(sfxBus);s.start(t);s.stop(t+1);}}
  else W.nextEv=now+3000;
 }
}
function thunder(){if(!AC)return;const t=AC.currentTime,s=AC.createBufferSource(),lp=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;lp.type='lowpass';lp.frequency.value=180;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5,t+.1);g.gain.exponentialRampToValueAtTime(.001,t+2.6);s.connect(lp);lp.connect(g);g.connect(master);s.start(t);s.stop(t+2.8);}
function drawSeasonFx(){
 if(W.fw.length){rx.save();rx.globalCompositeOperation='lighter';for(let i=W.fw.length-1;i>=0;i--){const p=W.fw[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.025;p.vx*=.985;p.life-=.012;if(p.life<=0){W.fw.splice(i,1);continue;}rx.globalAlpha=p.life;rx.fillStyle=`rgb(${p.c[0]},${p.c[1]},${p.c[2]})`;rx.beginPath();rx.arc(p.x,p.y,1.8,0,6.283);rx.fill();rx.globalAlpha=p.life*.25;rx.beginPath();rx.arc(p.x,p.y,5,0,6.283);rx.fill();}rx.restore();}
 if(W.flash>.01){rx.fillStyle=`rgba(235,242,255,${W.flash*.75})`;rx.fillRect(0,0,RW,RH);$('#lflash').style.opacity=(W.flash*.35).toFixed(3);W.flash*=.88;}else if(W.flash){W.flash=0;$('#lflash').style.opacity=0;}
}

/* ---------- part 2 day ---------- */
function startDay2(d){
 const DY=D.DAYS[d];CUR=null;N=freshN();S.state='intro';
 P.phase='day';P.n=d;saveP();
 clearChars();$('#served').innerHTML='';$('#keepsake').style.opacity=0;hideFlash();resetCandles();$('#cat').classList.remove('guest');
 setWeather(null,true);setMusic('day');renderDecor();updateHud2();
 $('#nightTag').textContent=DY.title+' · กลางวัน';showHud(false);
 titleCard(DY.title,DY.sub,DY.time,()=>{showHud(true,false);
  const intro=[{s:'narr',t:'ร้านเปิดรับลูกค้ากลางวัน เงินที่ได้เอาไปซื้อขนมให้โซบะ ของแต่งร้าน หรือของที่ตลาดได้'}];
  if(d===1)intro.push({s:'soba',t:'ลูกค้ากลางวันสั่งตามเมนูบนกระดาน สูตรที่เคยชงแล้วจะอยู่ในสมุดสูตร ส่วนเมนูที่ยังไม่เคยชง ลูกค้าจะบอกใบ้ให้เอง'},{s:'soba',t:'เทให้พอดีขีด วาดลายบนหน้าแก้วให้สวย แล้วจะได้ทิปเพิ่ม'});
  say(intro,()=>shopSession(d,()=>{
   const VS=DY.visit;say(VS.lines(P),()=>{const C=VS.choice(P);dayChoice(C.q,C.opts,(o)=>{applyOpt(o);
    say([...(o.lines||[]),...(o.sobaMem?memLines():[])],()=>{
     const next=()=>say(DY.after(P),()=>{saveP();startNight(d+1);});
     if(DY.noActivity)return next();activity(next);});});});}));});
}
function applyOpt(o){
 if(o.aff)Object.keys(o.aff).forEach(k=>{P.aff[k]=(P.aff[k]||0)+o.aff[k];P.bond+=o.aff[k];});
 if(o.flag)P.flags[o.flag]=true;if(o.light)addLight(o.light);if(o.money)P.money=Math.max(0,P.money+o.money);
 if(o.decor&&!P.decor.includes(o.decor)){P.decor.push(o.decor);renderDecor();}
 updateHud2();saveP();
}
function memLines(){const m=D.SOBA_MEM.find(x=>!P.sobaMem.includes(x.id));if(!m)return[{s:'soba',t:'ข้าเล่าให้เจ้าฟังหมดแล้วนะ... นั่งเงียบๆ ด้วยกันก็พอ'}];P.sobaMem.push(m.id);saveP();return[...m.lines,{s:'narr',t:`✦ ได้รับความทรงจำของโซบะ: ${m.t} (${P.sobaMem.length}/5)`}];}
function activity(next){
 const lowest=Object.keys(P.aff).sort((a,b)=>P.aff[a]-P.aff[b])[0];
 const memLeft=D.SOBA_MEM.some(x=>!P.sobaMem.includes(x.id));
 const opts=[];
 if(memLeft)opts.push({t:'ใช้เวลากับโซบะ — แสง +10 และได้ฟังเรื่องในอดีตของมัน',a:'soba'});
 opts.push({t:`ไปตลาด — มีเงิน ฿${P.money} ซื้อขนมแมว ธูปหอม หรือของแต่งร้าน`,a:'market'});
 opts.push({t:`ไปช่วยงาน${D.NAMES[lowest]} — ความสนิท +1 และได้ค่าขนม ฿60`,a:'help'});
 dayChoice('ช่วงบ่าย จะทำอะไรดี?',opts,(o)=>{
  if(o.a==='soba'){addLight(10);say(memLines(),next);}
  else if(o.a==='market')openMarket(next);
  else{P.aff[lowest]++;P.bond++;P.money+=60;updateHud2();saveP();say([{s:'narr',t:`คุณใช้เวลาบ่ายช่วย${D.NAMES[lowest]} พวกคุณคุยกันจนเย็น`},{s:'narr',t:`ความสนิทกับ${D.NAMES[lowest]} +1 · ได้รับ ฿60`}],next);}
 });
}
function shopSession(d,done){
 const items=D.MENU.filter(m=>(!m.lock||P.unlocked.includes(m.lock))&&(!m.flag||P.flags[m.flag]));
 const n=Math.min(6,3+decorBonus('cust'));let i=0,earn=0;
 const nextC=()=>{
  if(i>=n){if(chars.cust)charOut('cust');P.earned=(P.earned||0)+earn;saveP();return setTimeout(()=>say([{s:'narr',t:`ปิดรอบขายกลางวัน วันนี้ได้เงินทั้งหมด ฿${earn} (มีเงิน ฿${P.money})`}],done),600);}
  const idx=d*7+i;const unknown=items.filter(m=>!P.recipes.includes(m.id));
  const item=(i%2===0&&unknown.length)?unknown[idx%unknown.length]:items[(idx*5+3)%items.length];
  ART.CHARS.cust=ART.customer(idx+11);if(chars.cust){chars.cust.remove();delete chars.cust;}
  charIn('cust','c');setExpr('cust','smile');
  const known=P.recipes.includes(item.id);
  say([{s:'narr',t:`ลูกค้าคนที่ ${i+1}/${n}`},{s:'cust',e:'smile',t:pick(D.CUST_LINES.order).replace('{n}',item.n)},...(known?[]:[{s:'cust',e:'neutral',t:'(ใบ้ให้) '+item.hint}])],()=>openOrder(item,known,(pay)=>{earn+=pay;i++;charOut('cust');$('#served').style.opacity=0;setTimeout(nextC,900);}));
 };
 setTimeout(nextC,500);
}
/* market */
let marketDone=null;
function openMarket(done){marketDone=done;renderMarket();openModal('mMarket');}
function renderMarket(){
 $('#mkMoney').textContent=P.money;
 $('#mkList').innerHTML=D.SHOP.map(it=>{const key=P.n+'_'+it.id;const cnt=P.bought[key]||0;const owned=it.type==='decor'&&P.decor.includes(it.id);const lim=it.perDay&&cnt>=it.perDay;const poor=P.money<it.price;
  return `<div class="mk ${owned?'own':''}"><div class="mki"><svg viewBox="-30 -30 60 60">${shopIcon(it.id)}</svg></div><div class="mkt"><b>${it.n}</b><span>${it.d}</span></div><button data-id="${it.id}" ${owned||lim||poor?'disabled':''}>${owned?'มีแล้ว':lim?'ซื้อครบแล้ววันนี้':'฿'+it.price}</button></div>`;}).join('');
 $$('#mkList button[data-id]').forEach(b=>b.onclick=e=>{e.stopPropagation();const it=D.SHOP.find(x=>x.id===b.dataset.id);if(P.money<it.price)return;P.money-=it.price;const key=P.n+'_'+it.id;P.bought[key]=(P.bought[key]||0)+1;
  if(it.type==='light')addLight(it.v);else if(!P.decor.includes(it.id)){P.decor.push(it.id);renderDecor();}
  SFX.ding();updateHud2();saveP();renderMarket();});
}
function shopIcon(id){return {treat:'<path d="M-20 0 q10 -14 26 -6 l10 -8 v28 l-10 -8 q-16 8 -26 -6z" fill="#9ab0c8"/><circle cx="-10" cy="-2" r="2" fill="#222"/>',incense:'<rect x="-2" y="-24" width="4" height="34" fill="#c0503a"/><path d="M0 -24 q-6 -8 0 -14" stroke="#ccc" fill="none"/><rect x="-14" y="10" width="28" height="12" rx="3" fill="#c8a060"/>',d_rose:'<circle cy="-8" r="10" fill="#e0405a"/><path d="M0 2 v16 M-6 10 l6 -4" stroke="#4f8a4a" stroke-width="3"/><path d="M-10 18 h20 l-3 10 h-14z" fill="#c97a4d"/>',d_lantern:'<ellipse rx="14" ry="18" fill="#e84a3a"/><rect x="-6" y="-22" width="12" height="4" fill="#3a2418"/><rect x="-6" y="18" width="12" height="4" fill="#3a2418"/>',d_record:'<rect x="-24" y="-12" width="48" height="26" rx="3" fill="#6a3a24"/><ellipse cx="-4" cy="-2" rx="15" ry="6" fill="#1a1a1a"/><ellipse cx="-4" cy="-2" rx="4" ry="2" fill="#c0503a"/>',d_sign:'<rect x="-22" y="-16" width="44" height="32" rx="3" fill="#1f2a26" stroke="#3a2418" stroke-width="3"/><path d="M-12 -4 h24 M-12 4 h18" stroke="#f1ede4" stroke-width="2"/>',d_machine:'<rect x="-22" y="-16" width="44" height="32" rx="5" fill="#c8c4cc"/><rect x="-22" y="-16" width="44" height="6" fill="#d8a23a"/><circle cy="2" r="7" fill="#f4efe6" stroke="#d8a23a" stroke-width="2"/>'}[id]||'';}
/* recipe book */
function renderBook(){
 if(!P||D.part!==2){$('#bkList').innerHTML='<p style="color:#a8937c">ยังไม่มีสูตรในสมุด</p>';return;}
 const mini=(r)=>`<svg viewBox="-80 -250 160 390" class="bkCup">${cupSVG(0,0,1,r)}</svg>`;
 const chip=(r)=>['base','flavor','temp','count'].map(k=>`<span>${getI(k,r[k]).n}</span>`).join('');
 let h='<div class="gsec">เมนูของร้าน</div><div class="bkGrid">';
 D.MENU.forEach(m=>{const avail=(!m.lock||P.unlocked.includes(m.lock))&&(!m.flag||P.flags[m.flag]);const known=P.recipes.includes(m.id);
  h+=known?`<div class="bk">${mini(m.r)}<div><b>${m.n}</b><div class="chips">${chip(m.r)}</div><small>฿${m.price}</small></div></div>`:`<div class="bk lock"><div class="bkq">?</div><div><b>${avail?m.n:'???'}</b><small>${avail?'ยังไม่เคยชง — ลูกค้าจะบอกใบ้ให้':'ยังไม่ปลดล็อก'}</small></div></div>`;});
 h+='</div><div class="gsec">ถ้วยของแขกยามค่ำคืน</div><div class="bkGrid">';
 const gs=P.recipes.filter(x=>x[0]==='g');
 if(!gs.length)h+='<p style="color:#a8937c;grid-column:1/-1">ยังไม่มี ชงให้แขกยามค่ำคืนสำเร็จแล้วสูตรจะถูกบันทึกที่นี่</p>';
 gs.forEach(id=>{const n=+id.slice(1,id.indexOf(':')),who=id.slice(id.indexOf(':')+1);const R=D.NIGHTS[n].recipes.find(r=>r.who===who);const r={base:R.ans.base[0],flavor:R.ans.flavor[0],temp:R.ans.temp[0],count:R.ans.count[0]};
  h+=`<div class="bk ghost">${mini(r)}<div><b>ถ้วยของ${nameOf(who)}</b><div class="chips">${chip(r)}</div><small>${D.NIGHTS[n].title} · ${D.NIGHTS[n].sub}</small></div></div>`;});
 $('#bkList').innerHTML=h+'</div>';
}
/* finale & endings */
function finale(good){
 P.res[6]=good?'good':'bad';saveP();S.state='intro';
 const canStay=P.flags.yomPass&&P.light>=D.LIGHT.stayMin;
 playCS('life_soba',()=>{
  ART.CHARS.yom=ART.CHARS.yom;charIn('yom','r');setExpr('yom','neutral');
  say([{s:'yom',e:'neutral',t:'ถึงเวลาแล้ว แมวของบัว'}],()=>{
   const opts=P.flags.yomPass?[{t:'ให้โซบะอยู่ต่อ — รับสัญญาของยมแทน',v:'stay',dis:canStay?null:`ต้องมีแสงของโซบะอย่างน้อย ${D.LIGHT.stayMin}% (ตอนนี้ ${P.light}%)`},{t:'ปล่อยโซบะไปหาคุณยาย',v:'release'}]:[{t:'ส่งโซบะไปกับยม',v:'release'}];
   dayChoice('คุณจะทำอย่างไร?',opts,(o)=>startEnding2(o.v));});
 });
}
function startEnding2(choice){
 const key=D.endingFor(P,choice);const E=D.ENDINGS[key];S.state='intro';
 say(E.lines(P),()=>playCS('epilogue2',()=>{
  unlockG('endings2',key);hideChoices();
  const helped=[1,2,3,4].filter(n=>P.res[n]==='good').length+(P.flags.yomPass?1:0);
  $('#endCard').innerHTML=`<div class="k">ตอนจบ · แมวดำที่จางหาย</div><h2>${E.t}</h2><div class="kt" style="margin-top:6px">${E.d}</div>
   <div class="stats"><div>แขกที่ช่วยได้ <b>${helped}/5</b></div><div>ความทรงจำของโซบะ <b>${P.sobaMem.length}/5</b></div><div>แสงของโซบะ <b>${P.light}%</b></div></div>
   <div class="stats"><div>สูตรในสมุด <b>${P.recipes.length}</b></div><div>รายได้รวม <b>฿${P.earned||0}</b></div><div>ตอนจบที่ค้นพบ <b>${G.endings2.length}/4</b></div></div>
   <div class="kd" style="margin-bottom:18px">${key==='guardian'||key==='kitten'?'ขอบคุณที่ดูแลร้านและแมวดำตัวนั้นจนถึงคืนสุดท้าย':'ยังมีทางอื่นให้โซบะ ลองเก็บความทรงจำ ต่อแสง และผ่านการตรวจของยมดูนะ'}</div>
   <button id="eMenu">กลับเมนูหลัก</button>`;
  LS.del('lastcup.save');P=null;
  const e=$('#end');e.style.display='flex';requestAnimationFrame(()=>e.classList.add('on'));S.state='end';
  $('#eMenu').onclick=ev=>{ev.stopPropagation();e.classList.remove('on');setTimeout(()=>e.style.display='none',1000);backToMenu();};
 },key==='dark'?[...STORY.CS.epilogue2.beats.slice(0,-1),{k:'card',t:'ร้านยาย',s:'ปิดลงแล้ว แต่บ้านยังอยู่ตรงนี้'}]:null));
}

/* ---------- menu, modals ---------- */
const mstack=[];
function openModal(id){const m=$('#'+id);if(m.classList.contains('on'))return;if(id==='mSettings')syncSettings();if(id==='mPause')resetConfirm('#pMenu','กลับเมนูหลัก');if(id==='mGallery')renderGallery();if(id==='mBook')renderBook();m.classList.add('on');mstack.push(id);SFX.tap();}
function closeModal(id){$('#'+id).classList.remove('on');const i=mstack.lastIndexOf(id);if(i>=0)mstack.splice(i,1);if(id==='mMarket'&&marketDone){const f=marketDone;marketDone=null;setTimeout(f,250);}}
function closeTopModal(){const id=mstack[mstack.length-1];if(id)closeModal(id);}
function closeAllModals(){while(mstack.length)closeModal(mstack[mstack.length-1]);}
$$('.modal').forEach(m=>{m.addEventListener('click',e=>{e.stopPropagation();if(e.target===m&&m.id!=='mMarket')closeModal(m.id);});m.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();SFX.tap();closeModal(m.id);}));});
const SPEEDL=['ช้ามาก','ช้า','ปกติ','เร็ว','ทันที'];
function updRange(r){const pct=(r.value-r.min)/(r.max-r.min)*100;r.style.setProperty('--p',pct+'%');r.nextElementSibling.textContent=r.dataset.k==='speed'?SPEEDL[r.value-1]:r.value+'%';}
function syncSettings(){$$('#mSettings input[type=range]').forEach(r=>{r.value=V[r.dataset.k];updRange(r);});$('#swLow').classList.toggle('on',!!V.lowfx);$('#swMini').classList.toggle('on',!!V.mini);}
$('#swMini').addEventListener('click',e=>{e.preventDefault();e.stopPropagation();V.mini=!V.mini;syncSettings();saveV();SFX.tap();});
$$('#mSettings input[type=range]').forEach(r=>{r.addEventListener('input',()=>{V[r.dataset.k]=+r.value;updRange(r);initAudio();applyVolumes();saveV();});r.addEventListener('change',()=>{if(r.dataset.k==='sfx'||r.dataset.k==='master')SFX.ding();});});
$('#swLow').addEventListener('click',e=>{e.preventDefault();e.stopPropagation();V.lowfx=!V.lowfx;stage.classList.toggle('lowfx',V.lowfx);syncSettings();saveV();SFX.tap();});
$('#sReset').addEventListener('click',e=>{e.stopPropagation();Object.assign(V,DEF);stage.classList.toggle('lowfx',false);syncSettings();applyVolumes();saveV();SFX.tap();});
function resetConfirm(sel,txt){const b=$(sel);if(!b)return;b.dataset.c='';b.classList.remove('warn');b.innerHTML=txt;}
$('#pauseBtn').addEventListener('click',e=>{e.stopPropagation();openModal('mPause');});
$$('#mPause .pbtn').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const a=b.dataset.p;SFX.tap();
 if(a==='resume')closeModal('mPause');else if(a==='settings')openModal('mSettings');else if(a==='howto')openModal('mHowto');else if(a==='log'){closeModal('mPause');openLog();}
 else if(a==='menu'){if(!b.dataset.c){b.dataset.c='1';b.classList.add('warn');b.textContent='กดอีกครั้งเพื่อยืนยัน (เกมบันทึกไว้แล้วตอนเริ่มช่วงนี้)';}else backToMenu();}}));
function renderMenu(){
 const sv=LS.get('lastcup.save',null);
 const cont=$('#mContinue');cont.style.display=sv?'block':'none';
 if(sv){const DD=sv.part===2?D2:D1;cont.querySelector('small').textContent=(sv.part===2?'แมวดำที่จางหาย · ':'ถ้วยสุดท้าย · ')+(sv.phase==='day'?DD.DAYS[sv.n].title+' · '+DD.DAYS[sv.n].sub:DD.NIGHTS[sv.n].title+' · '+DD.NIGHTS[sv.n].sub);}
 resetConfirm('#mNew','<i></i>เริ่มเรื่องใหม่<small>ถ้วยสุดท้าย · ห้าคืนแรกที่ร้านยาย</small>');
 const un=!!(G.unlock2||G.endings.length);if(un&&!G.unlock2){G.unlock2=true;saveG();}
 $('#mP2').style.display=un?'block':'none';
 resetConfirm('#mP2',`<i></i>แมวดำที่จางหาย${G.seen2?'':'<span class="newb">ใหม่</span>'}<small>เรื่องราวหลังคืนลอยกระทง</small>`);
}
function startFromMenu(fn){
 S.state='intro';initAudio();SFX.tap();$('#menu').classList.add('off');$('#mtap').classList.add('off');
 if(chars.prang){charFade('prang');}
 setTimeout(()=>{clearChars();fn();},1600);
}
$$('.mnav button').forEach(b=>b.addEventListener('click',e=>{
 e.stopPropagation();initAudio();$('#mtap').classList.add('off');const a=b.dataset.a;
 if(a==='continue'){const sv=LS.get('lastcup.save',null);if(!sv)return;setPart(sv.part||1);P=Object.assign(sv.part===2?newP2():newP(),sv);startFromMenu(()=>P.phase==='day'?(D.part===2?startDay2(P.n):startDay(P.n)):startNight(P.n));}
 else if(a==='new'||a==='part2'){if(hasSave()&&!b.dataset.c){b.dataset.c='1';b.classList.add('warn');b.innerHTML='<i></i>กดอีกครั้งเพื่อเริ่มใหม่<small>เซฟเดิมจะถูกเขียนทับ</small>';return;}
  if(a==='part2'&&!(G.unlock2||G.endings.length))return;
  if(a==='part2'){G.seen2=true;saveG();}
  if(a==='new'){setPart(1);P=newP();}else{setPart(2);P=newP2();}startFromMenu(()=>playCS(a==='new'?'prologue1':'prologue2',()=>startNight(1)));}
 else if(a==='gallery')openModal('mGallery');else if(a==='settings')openModal('mSettings');else if(a==='howto')openModal('mHowto');else if(a==='about')openModal('mAbout');
}));
$('#menu').addEventListener('click',e=>{e.stopPropagation();initAudio();$('#mtap').classList.add('off');});
function backToMenu(){
 closeAllModals();closeJournal();clearInterval(tmr);clearTimeout(autoT);queue=[];qDone=null;typing=false;dlg.style.display='none';hideChoices();
 $('#brew').style.display='none';$('#sketch').classList.remove('on');$('#pour').classList.remove('on');$('#art').classList.remove('on');pourState=null;artState=null;S.order=null;
 const e=$('#end');e.classList.remove('on');setTimeout(()=>e.style.display='none',600);
 S.state='menu';CUR=null;N=null;showHud(false);hideFlash();clearChars();$('#served').innerHTML='';$('#keepsake').style.opacity=0;resetCandles();
 $('#cat').classList.remove('guest','gone','heal','glow');$('#cat').style.opacity='';
 P=null;setPart(1);renderDecor();setWeather({rain:1},false);setMusic('menu');
 renderMenu();$('#menu').classList.remove('off');menuArt();
}
function menuArt(){const el=makeChar('prang','menu');setExpr('prang','smile');setTimeout(()=>el.classList.add('show'),300);}

/* ---------- gallery ---------- */
const CGS1=['f1','f2','f3','f4','f5'],CGS2=['g1','g2','g3','g4','g5','g6'];
function renderGallery(){
 const un2=!!G.unlock2;const CGS=un2?CGS1.concat(CGS2):CGS1;
 $('#gCG').innerHTML=CGS.map(id=>G.cg.includes(id)?`<button class="gcg" data-id="${id}"><svg viewBox="0 0 1280 720">${ART.FLASH[id].svg}</svg><span>${ART.FLASH[id].cap}</span></button>`:`<div class="gcg lock"><div>?</div><span>ยังไม่ปลดล็อก</span></div>`).join('');
 const endRow=(DD,list,keys)=>keys.map(k=>list.includes(k)?`<div class="gend"><b>${DD.ENDINGS[k].t}</b><span>${DD.ENDINGS[k].d}</span></div>`:`<div class="gend lock"><b>? ? ?</b><span>ยังไม่ปลดล็อก</span></div>`).join('');
 $('#gEnd').innerHTML='<div class="gsub">ถ้วยสุดท้าย</div>'+endRow(D1,G.endings,['true','good','bitter'])+(un2?'<div class="gsub">แมวดำที่จางหาย</div>'+endRow(D2,G.endings2,['guardian','kitten','goodbye','dark']):'');
 const KS=un2?Object.assign({},D1.KEEPSAKES,D2.KEEPSAKES):Object.assign({},D1.KEEPSAKES);
 const LO=STORY.LIFE_ORDER.filter((id,i)=>un2||i<5);
 $('#gStory').innerHTML=LO.map(id=>(G.cs||[]).includes(id)?`<button class="gst" data-cs="${id}">${STORY.CS[id].title}</button>`:'<div class="gst lock">? ? ?</div>').join('');
 $$('#gStory .gst[data-cs]').forEach(b=>b.onclick=e=>{e.stopPropagation();playCS(b.dataset.cs);});
 $('#gKs').innerHTML=Object.keys(KS).map(k=>`<div class="gks ${G.ks.includes(k)?'':'lock'}"><svg viewBox="-40 -40 80 80">${G.ks.includes(k)?ksIcon(k):'<text y="10" text-anchor="middle" font-size="28" fill="#6a5a4a">?</text>'}</svg><span>${G.ks.includes(k)?KS[k].n:'???'}</span></div>`).join('');
 $$('#gCG .gcg[data-id]').forEach(b=>b.onclick=e=>{e.stopPropagation();const F=ART.FLASH[b.dataset.id];$('#gView').innerHTML=`<svg viewBox="0 0 1280 720">${F.svg}</svg><div class="cap">${F.cap}</div>`;$('#gView').classList.add('on');});
}
$('#gView').addEventListener('click',e=>{e.stopPropagation();$('#gView').classList.remove('on');});
$('#bookBtn').addEventListener('click',e=>{e.stopPropagation();openModal('mBook');});

/* ---------- boot ---------- */
setMusic('menu');renderMenu();menuArt();requestAnimationFrame(loop);
window.__lc={get S(){return S;},get N(){return N;},get P(){return P;},set P(v){P=v;},get D(){return D;},D1,D2,V,G,setPart,newP2,startNight,startDay,startDay2,startEnding,openChoices,gainFrag,say,runFx,setExpr,chars,backToMenu,endNight,get pourState(){return pourState;},get artState(){return artState;},finishPour,finishArt,artGame,pourGame,playCS};
})();
