/* ถ้วยสุดท้าย — art: characters, flashbacks, drawings, decor */
(function(){
'use strict';
const ART={};

/* ---------------- eyes & brows ---------------- */
function eyeSVG(cx,cy,sx,P,o){
 o=o||{};const sc=o.scale||1;const male=o.male,old=o.old;
 const lashW=male?3.4:5.2;const lashC=o.lashC||'#1a1630';const skin=o.lid||'#f8e6ea';
 const lash=male?`<path d="M-24,-4 C-18,-18 -2,-24 12,-21 C20,-19 24,-14 26,-8" stroke="${lashC}" stroke-width="${lashW}" fill="none" stroke-linecap="round"/>`
  :`<path d="M-25,-3 C-21,-19 -3,-27 12,-23 C20,-21 25,-15 27,-8" stroke="${lashC}" stroke-width="${lashW}" fill="none" stroke-linecap="round"/><path d="M-25,-3 L-32,-10" stroke="${lashC}" stroke-width="3" stroke-linecap="round"/><path d="M-24,0 L-29,4" stroke="${lashC}" stroke-width="2" stroke-linecap="round"/><path d="M14,-22 L18,-28" stroke="${lashC}" stroke-width="1.6" stroke-linecap="round"/>`;
 const oldLines=old?`<path d="M-30,-2 l-8,-4 M-30,4 l-8,2 M-28,10 l-6,6" stroke="#b88a98" stroke-width="1.2" opacity=".7"/><path d="M-16,26 C-6,31 8,31 16,25" stroke="#c99aa8" stroke-width="1.3" fill="none" opacity=".75"/>`:'';
 return `<g transform="translate(${cx},${cy}) scale(${sx*sc},${sc})"><g class="blink">
 <g class="e-open">
  <path d="M-22,-2 C-20,-18 -4,-24 10,-20 C20,-16 23,-6 22,4 C20,16 8,24 -2,23 C-14,22 -22,12 -22,-2Z" fill="#fbfcff"/>
  <g clip-path="url(#${P}EyeClip)">
   <path d="M-24,-16 C-6,-24 12,-22 26,-12 L26,-3 C10,-13 -8,-13 -24,-5Z" fill="#c4cbe8" opacity=".8"/>
   <ellipse cx="1" cy="3" rx="${male?13.5:14.5}" ry="${male?16.5:18.5}" fill="url(#${P}Iris)" stroke="#161a46" stroke-width="1.6"/>
   <ellipse cx="1" cy="3" rx="9.5" ry="12.5" fill="none" stroke="#000" stroke-width="1" opacity=".18"/>
   <ellipse cx="1" cy="2" rx="6" ry="8.2" fill="#10132e"/>
   <ellipse cx="1" cy="14" rx="9" ry="4.5" fill="#fff" opacity=".35"/>
   <path d="M-14,-7 C-6,-15 8,-15 16,-7" stroke="#0f1230" stroke-width="6" fill="none" opacity=".45"/>
   <circle cx="-5" cy="-5" r="${male?4.4:5.3}" fill="#fff"/>
   <circle cx="7" cy="11" r="2.4" fill="#fff" opacity=".9"/>
   <circle cx="-8" cy="9" r="1.3" fill="#fff" opacity=".8"/>
   ${male?'':'<path d="M5,-3 l1.2,3 l3,1.2 l-3,1.2 l-1.2,3 l-1.2,-3 l-3,-1.2 l3,-1.2z" fill="#fff" opacity=".85"/>'}
  </g>
  ${lash}
  <path d="M-20,-24 C-8,-33 10,-33 22,-24" stroke="#c48ea2" stroke-width="1.3" fill="none" opacity=".6"/>
  <path d="M-16,19 C-8,24 6,25 15,18" stroke="#6a5470" stroke-width="1.4" fill="none" opacity=".7"/>
  ${oldLines}
  <g class="e-lid"><path d="M-30,-34 L32,-34 L32,-3 C16,-9 -8,-10 -30,0 Z" fill="${skin}"/><path d="M-27,0 C-8,-10 16,-9 29,-3" stroke="${lashC}" stroke-width="${lashW}" fill="none" stroke-linecap="round"/></g>
 </g></g>
 <g class="e-closed"><path d="M-20,6 Q0,-14 20,6" stroke="${lashC}" stroke-width="4.6" fill="none" stroke-linecap="round"/></g>
 <g class="e-shut"><path d="M-21,0 Q0,12 21,0" stroke="${lashC}" stroke-width="4.6" fill="none" stroke-linecap="round"/><path d="M-12,8 L-14,13 M0,10 L0,15 M12,8 L14,13" stroke="${lashC}" stroke-width="1.6" stroke-linecap="round"/></g>
 </g>`;
}
function browSVG(cx,cy,sx,o){
 o=o||{};const c=o.c||'#2a2440',w=o.w||2.8;
 return `<g transform="translate(${cx},${cy}) scale(${sx},1)" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" opacity=".85">
  <path class="b-norm" d="M-20,-44 Q0,-52 20,-47"/><path class="b-sad" d="M-20,-44 Q2,-47 20,-56"/><path class="b-up" d="M-20,-52 Q0,-63 20,-56"/></g>`;
}
ART.eyeSVG=eyeSVG;ART.browSVG=browSVG;

function irisDefs(P,ir){return `<linearGradient id="${P}Iris" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ir[0]}"/><stop offset=".45" stop-color="${ir[1]}"/><stop offset=".8" stop-color="${ir[2]}"/><stop offset="1" stop-color="${ir[3]||'#fff'}"/></linearGradient><clipPath id="${P}EyeClip"><path d="M-22,-2 C-20,-18 -4,-24 10,-20 C20,-16 23,-6 22,4 C20,16 8,24 -2,23 C-14,22 -22,12 -22,-2Z"/></clipPath>`;}

const MOUTHS=(o)=>`
 <g class="m-small"><path d="M193 248 Q200 251.5 207 248" stroke="${o.lip}" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>
 <path class="m-smile" d="M${o.male?186:188} 245 Q200 256 ${o.male?214:212} 245" stroke="${o.lip}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
 <g class="m-open"><path d="M187 244 Q200 264 213 244 Q200 248 187 244Z" fill="#a8445a"/><path d="M193 254 Q200 260 207 254 Q200 252 193 254Z" fill="#f08a9a"/></g>
 <path class="m-sad" d="M191 252 Q200 246 209 252" stroke="${o.lip}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
 <ellipse class="m-o" cx="200" cy="250" rx="4.5" ry="5.5" fill="#a8445a"/>
 <g class="tears"><path d="M176 214 C178 228 174 240 177 254" stroke="#cdeeff" stroke-width="3" fill="none" opacity=".85" stroke-linecap="round"/><path d="M224 214 C222 228 226 240 223 254" stroke="#cdeeff" stroke-width="3" fill="none" opacity=".85" stroke-linecap="round"/><circle cx="177" cy="258" r="3" fill="#e4f6ff"/><circle cx="223" cy="258" r="3" fill="#e4f6ff"/></g>`;
const BLUSH=(o)=>`<ellipse cx="156" cy="230" rx="17" ry="7" fill="#ff8fa8" opacity="${o.blush||.25}"/><ellipse cx="244" cy="230" rx="17" ry="7" fill="#ff8fa8" opacity="${o.blush||.25}"/>
 <g class="blush2"><ellipse cx="156" cy="230" rx="21" ry="9" fill="#ff7a98" opacity=".35"/><ellipse cx="244" cy="230" rx="21" ry="9" fill="#ff7a98" opacity=".35"/><path d="M146 233 l6 -8 M154 234 l6 -8 M162 234 l6 -8 M234 233 l6 -8 M242 234 l6 -8 M250 234 l6 -8" stroke="#e85a7a" stroke-width="1.4" opacity=".6"/></g>`;
const FACE='M130 160 Q130 90 200 86 Q270 90 270 160 Q268 212 238 247 Q216 268 200 270 Q184 268 162 247 Q132 212 130 160Z';
const FACE_M='M128 158 Q128 88 200 84 Q272 88 272 158 Q272 214 244 250 Q222 274 200 276 Q178 274 156 250 Q128 214 128 158Z';

/* ---------------- Prang (custom) ---------------- */
ART.prang=function(){const P='g';return `
<defs>
 <linearGradient id="gHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3672"/><stop offset=".5" stop-color="#1b1f44"/><stop offset=".85" stop-color="#2c3f86"/><stop offset="1" stop-color="#6fa4ec"/></linearGradient>
 <linearGradient id="gHairF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#36407e"/><stop offset=".45" stop-color="#232856"/><stop offset="1" stop-color="#1a1e44"/></linearGradient>
 <linearGradient id="gLock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262c5e"/><stop offset=".62" stop-color="#1c2148"/><stop offset="1" stop-color="#6c9ce6" stop-opacity=".9"/></linearGradient>
 <linearGradient id="gSkin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3dde4"/><stop offset=".55" stop-color="#fcecf0"/><stop offset="1" stop-color="#fdf0f3"/></linearGradient>
 <linearGradient id="gFaceSh" x1="0" x2="1"><stop offset="0" stop-color="#d9a9bb" stop-opacity=".75"/><stop offset=".2" stop-color="#d9a9bb" stop-opacity="0"/><stop offset=".8" stop-color="#d9a9bb" stop-opacity="0"/><stop offset="1" stop-color="#d9a9bb" stop-opacity=".75"/></linearGradient>
 ${irisDefs(P,['#171b58','#3f58b8','#7cc4f4','#c4f2ff'])}
 <linearGradient id="gBlouse" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8faff"/><stop offset="1" stop-color="#d2dbf0"/></linearGradient>
 <linearGradient id="gSleeve" x1="0" x2="1"><stop offset="0" stop-color="#c9d3ec"/><stop offset=".5" stop-color="#f6f8ff"/><stop offset="1" stop-color="#dde4f4"/></linearGradient>
 <linearGradient id="gArm" x1="0" x2="1"><stop offset="0" stop-color="#e6c6d2"/><stop offset=".5" stop-color="#f8e6ec"/><stop offset="1" stop-color="#e9ccd6"/></linearGradient>
 <linearGradient id="gRim" x1="0" x2="1"><stop offset="0" stop-color="#9fe0ff" stop-opacity=".6"/><stop offset=".22" stop-color="#9fe0ff" stop-opacity="0"/><stop offset=".78" stop-color="#9fe0ff" stop-opacity="0"/><stop offset="1" stop-color="#9fe0ff" stop-opacity=".6"/></linearGradient>
 <radialGradient id="gAura" cx=".5" cy=".42"><stop offset="0" stop-color="#a6e4ff" stop-opacity=".26"/><stop offset=".6" stop-color="#7ab8ff" stop-opacity=".08"/><stop offset="1" stop-color="#7ab8ff" stop-opacity="0"/></radialGradient>
 <clipPath id="gFaceClip"><path d="${FACE}"/></clipPath>
 <filter id="gTint"><feColorMatrix type="matrix" values=".9 .03 .05 0 0  .03 .93 .06 0 .01  .05 .06 .99 0 .035  0 0 0 1 0"/></filter>
</defs>
<ellipse class="aura" cx="200" cy="290" rx="200" ry="250" fill="url(#gAura)"/>
<g filter="url(#gTint)">
 <path d="M200 56 C114 56 100 128 104 190 C98 290 90 372 74 456 C96 470 130 474 160 468 C180 476 220 476 240 468 C270 474 304 470 326 456 C310 372 302 290 296 190 C300 128 286 56 200 56Z" fill="url(#gHair)"/>
 <path d="M150 240 C150 330 160 400 166 468 L234 468 C240 400 250 330 250 240Z" fill="#11142e" opacity=".55"/>
 <g stroke="#7d9ae0" stroke-width="1.6" fill="none" opacity=".35"><path d="M110 250 C104 330 96 400 82 452"/><path d="M290 250 C296 330 304 400 318 452"/><path d="M122 300 C118 360 114 410 108 462"/><path d="M278 300 C282 360 286 410 292 462"/></g>
 <path d="M88 428 C84 462 84 494 88 520 L122 520 C120 492 122 462 124 436Z" fill="url(#gArm)"/>
 <path d="M312 428 C316 462 316 494 312 520 L278 520 C280 492 278 462 276 436Z" fill="url(#gArm)"/>
 <path d="M180 236 L180 298 Q200 310 220 298 L220 236Z" fill="#f1dbe2"/>
 <path d="M180 256 Q200 280 220 256 L220 240 L180 240Z" fill="#d6aabb" opacity=".75"/>
 <path d="M134 316 C112 320 98 336 92 364 L86 430 C98 437 112 439 126 436 L134 380Z" fill="url(#gSleeve)"/>
 <path d="M266 316 C288 320 302 336 308 364 L314 430 C302 437 288 439 274 436 L266 380Z" fill="url(#gSleeve)"/>
 <path d="M86 430 C98 437 112 439 126 436 M314 430 C302 437 288 439 274 436" stroke="#aeb9d6" stroke-width="2.4" fill="none"/>
 <path d="M200 292 C168 294 146 300 132 316 L134 520 L266 520 L268 316 C254 300 232 294 200 292Z" fill="url(#gBlouse)"/>
 <path d="M200 292 C168 294 146 300 132 316 L134 520 L266 520 L268 316 C254 300 232 294 200 292Z" fill="url(#gRim)"/>
 <path d="M134 340 C136 400 136 460 134 520 M266 340 C264 400 264 460 266 520" stroke="#b1bcd8" stroke-width="2.2" fill="none"/>
 <path d="M160 410 C166 440 170 480 168 520 M222 430 C226 460 228 490 226 520" stroke="#c9d2e8" stroke-width="1.5" fill="none" opacity=".8"/>
 <path d="M228 386 L264 386 L264 414 Q246 422 228 414Z" fill="none" stroke="#b9c3dc" stroke-width="1.6"/>
 <text x="246" y="366" text-anchor="middle" font-family="Mali" font-size="11" font-weight="600" fill="#3a56b0" opacity=".9">ส.ร.</text>
 <text x="246" y="379" text-anchor="middle" font-family="Mali" font-size="8.5" fill="#3a56b0" opacity=".75">ปราง</text>
 <path d="M200 302 L166 288 L144 322 L188 336 Z" fill="#fbfcff" stroke="#b9c3dc" stroke-width="1.5"/>
 <path d="M200 302 L234 288 L256 322 L212 336 Z" fill="#fbfcff" stroke="#b9c3dc" stroke-width="1.5"/>
 <path d="M190 304 L210 304 L206 321 L194 321 Z" fill="#1c2858"/>
 <path d="M194 321 L206 321 L215 392 L200 410 L185 392 Z" fill="#22306a"/>
 <path d="M200 324 L204 394" stroke="#4458a8" stroke-width="2" opacity=".55"/>
 <path d="${FACE}" fill="url(#gSkin)"/>
 <g clip-path="url(#gFaceClip)">
  <rect x="120" y="80" width="160" height="200" fill="url(#gFaceSh)"/>
  <path d="M120 140 L130 150 Q140 140 152 184 Q160 158 166 134 Q176 154 178 178 Q186 152 194 128 Q202 148 206 174 Q216 154 222 130 Q232 152 236 180 Q244 162 246 140 Q256 160 260 190 Q268 178 272 162 L280 140 L280 80 L120 80Z" fill="#d8a6ba" opacity=".55"/>
  <path d="M150 252 Q200 282 250 252 L250 290 L150 290Z" fill="#e2bccb" opacity=".5"/>
 </g>
 ${eyeSVG(167,197,1,P)}${eyeSVG(233,197,-1,P)}
 <path d="M199 221 L202 228 L197 229" stroke="#cf95a5" stroke-width="1.6" fill="none" stroke-linecap="round"/>
 ${BLUSH({blush:.3})}
 <circle cx="150" cy="227" r="1.6" fill="#fff" opacity=".8"/><circle cx="238" cy="227" r="1.6" fill="#fff" opacity=".8"/>
 ${MOUTHS({lip:'#b0606e'})}
 <path d="M106 182 C102 112 140 56 200 54 C262 56 298 112 294 184 Q290 196 282 210 Q280 172 272 150 Q268 166 260 180 Q256 148 246 128 Q244 150 236 170 Q232 140 222 118 Q216 142 206 164 Q202 136 194 116 Q186 140 178 168 Q176 142 166 122 Q160 148 152 174 Q150 154 140 136 Q132 170 126 208 Q114 196 106 182Z" fill="url(#gHairF)"/>
 <g stroke="#0e1128" stroke-width="1.3" fill="none" opacity=".55"><path d="M196 62 C192 86 194 104 194 116"/><path d="M222 66 C226 88 224 104 222 118"/><path d="M168 74 C164 92 166 110 166 122"/><path d="M248 84 C252 100 250 116 246 128"/></g>
 <g stroke="#8ea4ea" stroke-width="3.2" fill="none" opacity=".6" stroke-linecap="round"><path d="M140 104 Q148 96 158 92"/><path d="M170 88 Q182 84 192 84"/><path d="M206 84 Q218 84 228 87"/><path d="M240 92 Q250 96 258 103"/></g>
 <path d="M198 58 C186 36 204 22 216 32 C206 32 200 42 204 58Z" fill="url(#gHairF)"/>
 <path d="M114 148 C98 222 110 300 92 404 C110 394 124 344 130 296 C136 244 132 192 126 156 Z" fill="url(#gLock)"/>
 <path d="M286 148 C302 222 290 300 308 404 C290 394 276 344 270 296 C264 244 268 192 274 156 Z" fill="url(#gLock)"/>
 <path d="M118 210 C114 270 110 330 100 390 M282 210 C286 270 290 330 300 390" stroke="#8ea4ea" stroke-width="1.8" fill="none" opacity=".45"/>
 ${browSVG(167,197,1)}${browSVG(233,197,-1)}
 <g transform="translate(266,124) rotate(24)">${ART.clipShape()}</g>
</g>`;};
ART.clipShape=()=>`<rect x="-14" y="-3" width="28" height="5" rx="2.5" fill="#cfd6e6"/><path d="M0,-12 C12,-14 17,-3 12,7 C8,14 3,18 0,20 C-3,18 -8,14 -12,7 C-17,-3 -12,-14 0,-12Z" fill="#ec4f6c"/><path d="M-8,-4 C-6,-10 -2,-11 0,-11" stroke="#ff9db0" stroke-width="2" fill="none"/><g fill="#ffe08a"><ellipse cx="-5" cy="-2" rx="1" ry="1.6"/><ellipse cx="4" cy="-3" rx="1" ry="1.6"/><ellipse cx="0" cy="5" rx="1" ry="1.6"/><ellipse cx="-6" cy="7" rx="1" ry="1.6"/><ellipse cx="6" cy="6" rx="1" ry="1.6"/></g><path d="M0,-12 L-7,-18 L-2,-13 L0,-20 L2,-13 L7,-18 Z" fill="#5fae5a"/>`;

/* ---------------- generic character generator ---------------- */
const HAIR={
 messy:{back:'M200 60 C122 60 106 120 110 190 C112 230 118 250 128 262 L272 262 C282 250 288 230 290 190 C294 120 278 60 200 60Z',
  front:'M108 196 C100 116 140 56 202 54 C266 56 302 118 292 196 L286 210 Q282 172 276 156 L268 188 Q262 150 250 132 L240 174 Q234 140 222 124 L210 170 Q206 136 196 122 L182 172 Q180 140 168 128 L156 176 Q152 150 142 140 L130 200 Q120 180 116 172Z',
  extra:'<path d="M110 176 C108 206 112 226 120 238 L126 200Z M290 176 C292 206 288 226 280 238 L274 200Z" fill="url(#PHF)"/><path d="M192 56 C186 40 200 30 210 36 C200 38 196 46 198 56Z M228 62 C238 46 252 48 256 56 C246 52 238 56 234 64Z" fill="url(#PHF)"/>'},
 fluffy:{back:'M200 50 C108 50 96 132 110 202 C118 240 140 250 152 244 L248 244 C260 250 282 240 290 202 C304 132 292 50 200 50Z',
  front:'M110 186 C100 104 146 52 200 52 C258 52 302 104 290 186 Q282 164 272 152 Q264 176 252 180 Q246 152 232 142 Q226 168 214 172 Q206 148 196 142 Q186 168 174 170 Q168 148 156 144 Q148 170 136 176 Q126 164 120 160Z',
  extra:'<path d="M200 54 C188 28 212 18 222 30 C210 28 204 38 206 54Z" fill="url(#PHF)"/><g stroke="#fff" stroke-opacity=".25" stroke-width="3" fill="none" stroke-linecap="round"><path d="M150 96 Q164 84 180 80"/><path d="M218 80 Q236 84 248 96"/></g>'},
 bob:{back:'M200 56 C116 56 100 126 104 192 C102 242 104 274 112 296 C150 306 250 306 288 296 C296 274 298 242 296 192 C300 126 284 56 200 56Z',
  front:'M104 198 C98 116 140 56 200 54 C262 56 302 116 296 198 C292 234 294 272 288 294 C274 282 270 244 270 210 Q264 172 254 154 Q226 160 196 140 Q172 128 160 136 Q144 156 138 188 Q132 214 132 240 C130 268 124 288 112 296 C106 270 106 232 104 198Z',
  extra:'<g stroke="#000" stroke-opacity=".25" stroke-width="1.3" fill="none"><path d="M160 140 C150 180 146 220 138 270"/><path d="M262 160 C270 200 272 240 282 286"/></g>'},
 slick:{back:'M200 62 C126 62 110 118 112 180 C114 212 120 228 126 234 L274 234 C280 228 286 212 288 180 C290 118 274 62 200 62Z',
  front:'M112 178 C108 112 146 62 204 60 C262 62 292 112 288 180 C282 150 270 124 250 110 C226 96 196 98 172 104 C146 114 128 140 120 180Z',
  extra:'<g stroke="#9aa4c0" stroke-opacity=".55" stroke-width="2" fill="none"><path d="M150 96 C176 82 214 80 246 92"/><path d="M140 112 C170 94 220 92 262 108"/></g><path d="M112 178 C112 196 116 214 122 226 L128 196Z M288 180 C288 198 284 214 278 226 L272 196Z" fill="url(#PHF)"/>'},
 bun:{back:'M200 66 C126 66 112 120 114 180 C116 214 122 232 130 240 L270 240 C278 232 284 214 286 180 C288 120 274 66 200 66Z',
  front:'M114 178 C110 112 146 66 200 64 C254 66 290 112 286 178 C280 140 262 112 232 104 Q214 100 200 110 Q186 100 168 104 C138 112 120 140 114 178Z',
  extra:'<circle cx="200" cy="50" r="30" fill="url(#PHF)"/><path d="M176 46 C190 34 212 34 224 48 M180 58 C194 50 210 50 222 60" stroke="#000" stroke-opacity=".2" stroke-width="2" fill="none"/><path d="M118 176 C112 196 114 214 120 226 M282 176 C288 196 286 214 280 226" stroke="url(#PHF)" stroke-width="4" fill="none"/>'},
 cropped:{back:'M200 76 C132 76 118 122 120 178 C122 206 126 220 132 228 L268 228 C274 220 278 206 280 178 C282 122 268 76 200 76Z',
  front:'M122 170 C120 122 150 82 200 80 C250 82 280 122 278 170 C270 142 254 122 230 116 C214 122 186 122 170 116 C146 122 130 142 122 170Z',
  extra:''},
 curly:{back:'',front:'',extra:'',curly:true},
 wavy:{back:'M200 56 C112 56 98 130 104 196 C96 280 84 360 70 450 C90 470 130 476 160 466 C190 478 220 478 246 466 C276 476 312 468 332 450 C316 360 306 280 298 196 C302 130 288 56 200 56Z',
  front:'M106 190 C100 112 142 56 202 54 C262 56 300 112 294 192 C298 240 312 290 304 340 C290 320 280 290 276 250 C272 210 268 180 258 160 Q236 150 210 126 Q190 112 170 120 Q150 140 140 180 Q134 220 130 260 C126 300 110 330 96 344 C88 300 104 240 106 190Z',
  extra:'<g stroke="#fff" stroke-opacity=".22" stroke-width="3" fill="none" stroke-linecap="round"><path d="M296 260 q10 20 0 40 q-10 20 4 40"/><path d="M104 270 q-10 20 0 40 q10 20 -4 40"/><path d="M180 70 q30 -8 60 6"/></g>'},
 pony:{back:'M200 58 C120 58 104 124 108 188 C108 222 114 240 124 250 L276 250 C286 240 292 222 292 188 C296 124 280 58 200 58Z',
  front:'M108 188 C102 112 142 58 200 56 C260 58 300 112 292 188 Q286 168 278 156 Q270 176 262 180 Q258 154 246 142 Q240 166 228 170 Q222 146 210 140 Q202 164 190 168 Q184 146 172 142 Q164 166 152 170 Q146 150 136 146 Q128 168 120 178Z',
  extra:'<path d="M272 96 C320 90 336 150 318 220 C312 250 300 270 290 280 C300 240 304 200 290 150 C284 128 276 112 266 104Z" fill="url(#PHF)"/><circle cx="276" cy="100" r="8" fill="#e85a7a"/>'}
};
function curlyHair(c1,c2){
 let back='',front='';const pts=[];
 for(let a=200;a<=340;a+=14){const r=(a*Math.PI)/180;pts.push([200+Math.cos(r)*92,170+Math.sin(r)*104]);}
 for(let a=-20;a<=20;a+=14){const r=(a*Math.PI)/180;pts.push([200+Math.cos(r)*92,170+Math.sin(r)*104]);}
 back=`<ellipse cx="200" cy="164" rx="96" ry="104" fill="${c2}"/>`+[[110,200],[290,200],[116,232],[284,232],[130,250],[270,250]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="22" fill="${c2}"/>`).join('');
 front=pts.map(([x,y],i)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${20+(i%3)*3}" fill="url(#PHF)"/>`).join('')+[[160,108],[186,98],[214,98],[240,108],[200,86]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="20" fill="url(#PHF)"/>`).join('')+`<g fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2">${pts.map(([x,y])=>`<path d="M${(x-8).toFixed(1)} ${(y-4).toFixed(1)} q8 -8 16 0"/>`).join('')}</g>`;
 return {back,front};
}
function bodySVG(o,P){
 const sw=o.sw||68,L=200-sw,R=200+sw;const long=o.longSleeve;
 const torso=`M200 292 C${200-sw*.5} 294 ${L+14} 300 ${L} 316 L${L+2} 520 L${R-2} 520 L${R} 316 C${R-14} 300 ${200+sw*.5} 294 200 292Z`;
 const slL=long?`M${L} 316 C${L-22} 320 ${L-36} 336 ${L-42} 364 L${L-50} 520 L${L-8} 520 L${L} 380Z`:`M${L} 316 C${L-22} 320 ${L-36} 336 ${L-42} 364 L${L-48} 430 C${L-36} 437 ${L-22} 439 ${L-8} 436 L${L} 380Z`;
 const slR=long?`M${R} 316 C${R+22} 320 ${R+36} 336 ${R+42} 364 L${R+50} 520 L${R+8} 520 L${R} 380Z`:`M${R} 316 C${R+22} 320 ${R+36} 336 ${R+42} 364 L${R+48} 430 C${R+36} 437 ${R+22} 439 ${R+8} 436 L${R} 380Z`;
 const arms=long?'':`<path d="M${L-46} 428 C${L-50} 462 ${L-50} 494 ${L-46} 520 L${L-12} 520 C${L-14} 492 ${L-12} 462 ${L-10} 436Z" fill="${o.skin}"/><path d="M${R+46} 428 C${R+50} 462 ${R+50} 494 ${R+46} 520 L${R+12} 520 C${R+14} 492 ${R+12} 462 ${R+10} 436Z" fill="${o.skin}"/><path d="M${L-46} 428 C${L-50} 462 ${L-50} 494 ${L-46} 520" stroke="${o.skinSh}" stroke-width="3" fill="none" opacity=".6"/>`;
 const c1=o.top||'#f4f6fb',c2=o.topSh||'#cfd6ea';
 let s=arms+`<path d="${slL}" fill="url(#${P}Top)"/><path d="${slR}" fill="url(#${P}Top)"/>`;
 if(!long)s+=`<path d="M${L-48} 430 C${L-36} 437 ${L-22} 439 ${L-8} 436 M${R+48} 430 C${R+36} 437 ${R+22} 439 ${R+8} 436" stroke="${c2}" stroke-width="2.4" fill="none"/>`;
 s+=`<path d="${torso}" fill="url(#${P}Top)"/>`;
 s+=`<path d="M${L+2} 340 C${L+4} 400 ${L+4} 460 ${L+2} 520 M${R-2} 340 C${R-4} 400 ${R-4} 460 ${R-2} 520" stroke="${c2}" stroke-width="2.2" fill="none"/>`;
 const of=o.outfit;
 if(of==='uniform'||of==='shirt'){
  s+=`<path d="M200 302 L${200-34} 288 L${200-56} 322 L188 336 Z" fill="${c1}" stroke="${c2}" stroke-width="1.5"/><path d="M200 302 L${200+34} 288 L${200+56} 322 L212 336 Z" fill="${c1}" stroke="${c2}" stroke-width="1.5"/>`;
  if(o.tie)s+=`<path d="M194 318 L208 318 L205 332 L196 332 Z" fill="${o.tie}"/><path d="M196 332 L205 332 L214 410 L202 426 L190 410 Z" fill="${o.tie}"/><path d="M198 336 L204 410" stroke="#fff" stroke-opacity=".2" stroke-width="2"/>`;
  s+=`<g fill="${c2}"><circle cx="200" cy="360" r="2.6"/><circle cx="200" cy="400" r="2.6"/><circle cx="200" cy="440" r="2.6"/></g>`;
 }
 if(of==='pajama'){
  s+=`<g clip-path="url(#${P}TorsoClip)" stroke="${c2}" stroke-width="5" opacity=".55">${[...Array(14)].map((_,i)=>`<path d="M${120+i*13} 280 v260"/>`).join('')}</g>`;
  s+=`<path d="M170 296 Q200 318 230 296" stroke="${o.pipe||'#6a9ad0'}" stroke-width="5" fill="none"/><path d="M200 312 v210" stroke="${o.pipe||'#6a9ad0'}" stroke-width="3"/><g fill="#fff"><circle cx="206" cy="348" r="4"/><circle cx="206" cy="392" r="4"/><circle cx="206" cy="436" r="4"/></g>`;
 }
 if(of==='cardigan'){
  s+=`<path d="M172 296 Q200 318 228 296 L226 520 L174 520Z" fill="${o.inner||'#f6efe2'}"/><path d="M172 298 Q200 312 228 298" stroke="${o.inner2||'#e2d6c0'}" stroke-width="3" fill="none"/>`;
  s+=`<path d="M172 296 L176 520 M228 296 L224 520" stroke="${c2}" stroke-width="4"/><g fill="${o.btn||'#e8d8b8'}"><circle cx="230" cy="352" r="4"/><circle cx="230" cy="392" r="4"/><circle cx="230" cy="432" r="4"/></g>`;
 }
 if(of==='suit'){
  s+=`<path d="M184 296 L216 296 L214 520 L186 520Z" fill="#f4f4f8"/><path d="M194 304 L206 304 L204 316 L196 316Z" fill="${o.tie||'#d8a23a'}"/><path d="M196 316 L204 316 L210 400 L200 414 L190 400Z" fill="${o.tie||'#d8a23a'}"/>`;
  s+=`<path d="M184 294 L156 330 L176 350 L168 420 L200 470 L190 400 Z" fill="${c2}"/><path d="M216 294 L244 330 L224 350 L232 420 L200 470 L210 400 Z" fill="${c2}"/>`;
  s+=`<path d="M236 356 l20 -3 l2 8 l-20 3z" fill="#f2d4a8"/><g fill="#d8b860"><circle cx="206" cy="470" r="3"/><circle cx="206" cy="496" r="3"/></g>`;
 }
 if(of==='apron'){
  s+=`<path d="M172 300 Q200 316 228 300" stroke="${c2}" stroke-width="3" fill="none"/>`;
  s+=`<path d="M160 360 L240 360 L246 520 L154 520Z" fill="${o.apron||'#8a4a3a'}"/><path d="M160 360 L172 300 M240 360 L228 300" stroke="${o.apron||'#8a4a3a'}" stroke-width="6"/><path d="M176 420 h48 v34 h-48z" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="2"/><path d="M160 360 L240 360" stroke="#fff" stroke-opacity=".15" stroke-width="2"/>`;
 }
 if(of==='polo'){
  s+=`<path d="M200 298 L174 290 L162 314 L194 322Z" fill="${c1}" stroke="${c2}" stroke-width="1.5"/><path d="M200 298 L226 290 L238 314 L206 322Z" fill="${c1}" stroke="${c2}" stroke-width="1.5"/><path d="M194 310 L194 370 L206 370 L206 310" fill="none" stroke="${c2}" stroke-width="2"/><g fill="#fff"><circle cx="200" cy="330" r="2.6"/><circle cx="200" cy="352" r="2.6"/></g>`;
 }
 if(of==='flower'){
  s+=`<g clip-path="url(#${P}TorsoClip)">${[...Array(30)].map((_,i)=>{const x=140+(i*37)%130,y=310+((i*53)%200);return `<g transform="translate(${x},${y})" fill="${o.fl||'#fff'}" opacity=".6"><circle r="3"/><circle cx="5" r="3"/><circle cx="2.5" cy="4.5" r="3"/><circle cx="2.5" cy="-4" r="3"/><circle cx="2.5" r="2" fill="#ffd27a"/></g>`;}).join('')}</g>`;
  s+=`<path d="M172 298 Q200 318 228 298" stroke="${c2}" stroke-width="4" fill="none"/>`;
 }
 if(of==='guard'){
  s+=`<path d="M200 302 L${200-34} 288 L${200-56} 322 L188 336 Z" fill="${c1}" stroke="${c2}" stroke-width="1.5"/><path d="M200 302 L${200+34} 288 L${200+56} 322 L212 336 Z" fill="${c1}" stroke="${c2}" stroke-width="1.5"/>`;
  s+=`<path d="M${L+4} 318 l40 -6 l2 10 l-40 6z M${R-4} 318 l-40 -6 l-2 10 l40 6z" fill="${c2}"/><path d="M150 372 h36 v26 h-36z M214 372 h36 v26 h-36z" fill="none" stroke="${c2}" stroke-width="2"/><path d="M150 372 h36 l-4 10 h-28z M214 372 h36 l-4 10 h-28z" fill="${c2}"/>`;
  s+=`<g transform="translate(232,350)"><path d="M0 -12 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1z" fill="#d8b860" stroke="#9a7a30"/></g><rect x="150" y="350" width="40" height="10" rx="2" fill="#fff" opacity=".85"/><g fill="${c2}"><circle cx="200" cy="420" r="3"/><circle cx="200" cy="460" r="3"/></g>`;
 }
 if(of==='dress'){
  s+=`<path d="M160 300 Q200 350 240 300 L268 316 L266 520 L134 520 L132 316Z" fill="${c1}"/><path d="M160 300 Q200 350 240 300" stroke="${c2}" stroke-width="3" fill="none"/>`;
  s+=`<g clip-path="url(#${P}TorsoClip)" fill="#fff6d0">${[...Array(46)].map((_,i)=>`<circle cx="${140+(i*29)%124}" cy="${330+((i*47)%190)}" r="${1.2+(i%3)*.6}" opacity="${.4+(i%4)*.15}"/>`).join('')}</g>`;
 }
 if(o.badge)s+=`<text x="242" y="372" text-anchor="middle" font-family="Mali" font-size="10" font-weight="600" fill="#3a56b0" opacity=".85">${o.badge}</text>`;
 return {s,torso};
}
ART.char=function(o){
 const P=o.id;const hs=HAIR[o.hair];const male=!!o.male,old=!!o.old;
 const face=male?FACE_M:FACE;
 let hb=hs.back,hf=hs.front,hx=(hs.extra||'').replace(/PHF/g,P+'HF');
 let back,front;
 if(hs.curly){const c=curlyHair(o.hc[0],o.hc[1]);back=c.back;front=c.front.replace(/PHF/g,P+'HF');}
 else{back=`<path d="${hb}" fill="url(#${P}HB)"/>`;front=`<path d="${hf}" fill="url(#${P}HF)"/>`;}
 const body=bodySVG(o,P);
 const ghost=!!o.ghost;
 const wr=old?`<path d="M168 228 Q162 242 170 254 M232 228 Q238 242 230 254" stroke="${o.skinSh}" stroke-width="1.6" fill="none" opacity=".7"/>`:'';
 const glasses=o.glasses?`<g fill="rgba(255,255,255,.06)" stroke="${o.glasses}" stroke-width="3"><rect x="${167-29}" y="${197-24}" width="58" height="46" rx="16"/><rect x="${233-29}" y="${197-24}" width="58" height="46" rx="16"/><path d="M196 192 Q200 186 204 192" fill="none"/></g><path d="M146 182 l14 -6 M212 182 l14 -6" stroke="#fff" stroke-opacity=".55" stroke-width="2.5"/>`:'';
 const must=o.mustache?`<path d="M180 238 C188 232 196 234 200 238 C204 234 212 232 220 238 C214 244 206 242 200 240 C194 242 186 244 180 238Z" fill="${o.hc[1]}"/>`:'';
 const tint=ghost?`filter="url(#${P}Tint)"`:'';
 const s=o.scale||1;
 return `<defs>
 <linearGradient id="${P}HB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.hc[0]}"/><stop offset=".7" stop-color="${o.hc[1]}"/><stop offset="1" stop-color="${o.hc[2]||o.hc[1]}"/></linearGradient>
 <linearGradient id="${P}HF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.hc[3]||o.hc[0]}"/><stop offset=".6" stop-color="${o.hc[1]}"/><stop offset="1" stop-color="${o.hc[1]}"/></linearGradient>
 <linearGradient id="${P}Skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.skinSh}"/><stop offset=".3" stop-color="${o.skin}"/><stop offset="1" stop-color="${o.skin}"/></linearGradient>
 <linearGradient id="${P}FaceSh" x1="0" x2="1"><stop offset="0" stop-color="${o.skinSh}" stop-opacity=".8"/><stop offset=".2" stop-color="${o.skinSh}" stop-opacity="0"/><stop offset=".8" stop-color="${o.skinSh}" stop-opacity="0"/><stop offset="1" stop-color="${o.skinSh}" stop-opacity=".8"/></linearGradient>
 <linearGradient id="${P}Top" x1="0" x2="1"><stop offset="0" stop-color="${o.topSh||'#cfd6ea'}"/><stop offset=".45" stop-color="${o.top||'#f4f6fb'}"/><stop offset="1" stop-color="${o.topSh||'#cfd6ea'}"/></linearGradient>
 <radialGradient id="${P}Aura" cx=".5" cy=".42"><stop offset="0" stop-color="#a6e4ff" stop-opacity=".26"/><stop offset=".6" stop-color="#7ab8ff" stop-opacity=".08"/><stop offset="1" stop-color="#7ab8ff" stop-opacity="0"/></radialGradient>
 ${irisDefs(P,o.iris||['#2a1a10','#6a4028','#b58a5a','#f0d8b0'])}
 <clipPath id="${P}FaceClip"><path d="${face}"/></clipPath>
 <clipPath id="${P}TorsoClip"><path d="${body.torso}"/></clipPath>
 <filter id="${P}Tint"><feColorMatrix type="matrix" values=".88 .04 .06 0 0  .04 .91 .07 0 .015  .06 .07 .99 0 .04  0 0 0 1 0"/></filter>
</defs>
${ghost?`<ellipse class="aura" cx="200" cy="290" rx="200" ry="250" fill="url(#${P}Aura)"/>`:''}
<g ${tint} transform="translate(${200*(1-s)},${o.dy||0}) scale(${s})">
 ${back}
 <path d="M180 236 L180 298 Q200 310 220 298 L220 236Z" fill="${o.skin}"/>
 <path d="M180 256 Q200 280 220 256 L220 240 L180 240Z" fill="${o.skinSh}" opacity=".75"/>
 ${body.s}
 <path d="${face}" fill="url(#${P}Skin)"/>
 <g clip-path="url(#${P}FaceClip)"><rect x="120" y="80" width="160" height="210" fill="url(#${P}FaceSh)"/><path d="M150 256 Q200 286 250 256 L250 296 L150 296Z" fill="${o.skinSh}" opacity=".45"/></g>
 ${eyeSVG(167,197,1,P,{male,old,lid:o.skin,scale:o.eyeScale||1})}${eyeSVG(233,197,-1,P,{male,old,lid:o.skin,scale:o.eyeScale||1})}
 <path d="M199 221 L202 228 L197 229" stroke="${o.skinSh}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
 ${BLUSH({blush:o.blush})}${wr}
 ${MOUTHS({lip:o.lip||'#a8606a',male})}${must}
 ${front}${hx}
 ${glasses}
 ${browSVG(167,197,1,{c:o.browC||o.hc[1],w:male?4:2.8})}${browSVG(233,197,-1,{c:o.browC||o.hc[1],w:male?4:2.8})}
 ${o.extra||''}
</g>`;
};

/* ---------------- character specs ---------------- */
const SK={fair:['#fbe9ec','#dcaab8'],warm:['#f6dccb','#d6a68e'],tan:['#eccab0','#c8987c'],old:['#f2dcd2','#c9a094']};
ART.CHARS={
 ton:{id:'ton',male:true,hair:'messy',hc:['#2a2a38','#14141e','#14141e','#3a3a50'],skin:SK.warm[0],skinSh:SK.warm[1],iris:['#20140c','#4a3020','#8a6040','#d8b890'],outfit:'shirt',top:'#eef3fb',topSh:'#bcc8dc',tie:'#3a4a7a',sw:80,lip:'#a8706a'},
 kao:{id:'kao',ghost:true,hair:'fluffy',hc:['#8a5a3a','#5a3622','#7aa6e0','#b07a52'],skin:SK.fair[0],skinSh:SK.fair[1],iris:['#3a2010','#8a5030','#e0a060','#fff0c0'],outfit:'pajama',top:'#dceaf8',topSh:'#9ab8dc',pipe:'#5a8ad0',sw:58,eyeScale:1.12,scale:.86,dy:58,blush:.4,extra:'<g transform="translate(246,236) rotate(-20)"><rect x="-9" y="-4" width="18" height="8" rx="3" fill="#f6dcc0"/><path d="M-3 -4 v8 M3 -4 v8" stroke="#d8b890" stroke-width="1"/></g>'},
 nuch:{id:'nuch',hair:'bob',hc:['#3a2a28','#1e1414','#1e1414','#5a4038'],skin:SK.warm[0],skinSh:SK.warm[1],iris:['#20140c','#5a3826','#9a7050','#e0c8a8'],outfit:'cardigan',top:'#c98a8a',topSh:'#9a5e60',inner:'#f6efe2',sw:66,lip:'#b06a70'},
 wichai:{id:'wichai',ghost:true,male:true,hair:'slick',hc:['#4a4a58','#22222c','#22222c','#6a6a7a'],skin:SK.tan[0],skinSh:SK.tan[1],iris:['#1a1208','#4a3018','#8a6438','#d8bc90'],outfit:'suit',top:'#2a3256',topSh:'#1a2040',tie:'#d8a23a',sw:84,longSleeve:true,mustache:true,old:true,lip:'#9a6460'},
 wichai2:{id:'wichai2',ghost:true,male:true,hair:'slick',hc:['#4a4a58','#22222c','#22222c','#6a6a7a'],skin:SK.tan[0],skinSh:SK.tan[1],iris:['#1a1208','#4a3018','#8a6438','#d8bc90'],outfit:'apron',top:'#e8e2d4',topSh:'#b8ae9a',apron:'#3a6a5a',sw:80,mustache:true,old:true,lip:'#9a6460'},
 pen:{id:'pen',hair:'bun',hc:['#5a5658','#2e2a2c','#2e2a2c','#8a8488'],skin:SK.tan[0],skinSh:SK.tan[1],iris:['#1a1208','#4a3018','#8a6438','#d8bc90'],outfit:'apron',top:'#f0e6d8',topSh:'#c4b49c',apron:'#c0603a',sw:70,old:true,glasses:'#6a4a30',lip:'#a0606a'},
 pia:{id:'pia',ghost:true,male:true,hair:'cropped',hc:['#d8d8e0','#a8a8b8','#a8a8b8','#f0f0f8'],skin:SK.old[0],skinSh:SK.old[1],iris:['#1a1208','#3a2a20','#7a6450','#c8b8a0'],outfit:'polo',top:'#8aa8c8',topSh:'#5a7898',sw:78,old:true,glasses:'#3a3a40',browC:'#b8b8c4',lip:'#a06a6a'},
 mali:{id:'mali',ghost:true,hair:'bun',hc:['#e0dce4','#b8b0c0','#b8b0c0','#f4f0f8'],skin:SK.old[0],skinSh:SK.old[1],iris:['#1a1208','#4a3424','#8a7058','#d8c8b0'],outfit:'flower',top:'#c8a0c8',topSh:'#9a7098',fl:'#fff4f8',sw:66,old:true,browC:'#a8a0b0',lip:'#b07080'},
 daeng:{id:'daeng',hair:'curly',hc:['#6a2a2a','#3a1414','#3a1414','#8a3a3a'],skin:SK.tan[0],skinSh:SK.tan[1],iris:['#1a1208','#4a3018','#8a6438','#d8bc90'],outfit:'apron',top:'#f2e8dc',topSh:'#c8b8a4',apron:'#b03a3a',sw:74,old:true,lip:'#b05a60'},
 hana:{id:'hana',ghost:true,hair:'pony',hc:['#6a4430','#3a2418','#7aa6e0','#8a5a40'],skin:SK.fair[0],skinSh:SK.fair[1],iris:['#2a1408','#6a3a1a','#b07040','#f0d0a0'],outfit:'flower',top:'#4aa0d8',topSh:'#2a70a8',fl:'#fff8c0',sw:64,blush:.35,lip:'#c06070',extra:'<path d="M140 300 L250 520" stroke="#2a2a2a" stroke-width="5"/><g transform="translate(236,470)"><rect x="-22" y="-14" width="44" height="30" rx="5" fill="#2a2a30"/><circle r="10" fill="#5a6a8a" stroke="#111" stroke-width="3"/><circle r="4" fill="#9ab"/></g>'},
 somsak:{id:'somsak',ghost:true,male:true,hair:'cropped',hc:['#8a8a90','#4a4a50','#4a4a50','#b0b0b8'],skin:SK.tan[0],skinSh:SK.tan[1],iris:['#1a1208','#3a2a18','#7a6040','#c8b090'],outfit:'guard',top:'#8a96a8',topSh:'#5a6678',sw:82,old:true,mustache:false,lip:'#9a6460',extra:'<path d="M118 132 C120 84 160 62 200 62 C240 62 280 84 282 132 Z" fill="#2a3448"/><path d="M110 132 h180 q6 8 -4 12 h-172 q-10 -4 -4 -12z" fill="#1a2030"/><circle cx="200" cy="104" r="10" fill="#d8b860"/>'},
 kaewta:{id:'kaewta',ghost:true,hair:'wavy',hc:['#4a2030','#2a1018','#a06ae0','#7a3a50'],skin:SK.warm[0],skinSh:SK.warm[1],iris:['#2a0a18','#7a2a50','#c86a90','#ffd0e0'],outfit:'dress',top:'#a83a6a',topSh:'#6a1a40',sw:62,blush:.3,lip:'#c03a5a',extra:'<g fill="#f2d47a"><circle cx="128" cy="232" r="5"/><circle cx="272" cy="232" r="5"/><path d="M125 236 l3 18 l3 -18z M269 236 l3 18 l3 -18z"/></g>'},
 yom:{id:'yom',ghost:true,male:true,hair:'slick',hc:['#1a1a22','#0a0a10','#0a0a10','#3a3a48'],skin:'#ece6ee',skinSh:'#b8aec4',iris:['#3a0008','#a0101a','#ff4a4a','#ffd0d0'],outfit:'suit',top:'#141418',topSh:'#050508',tie:'#a0101a',sw:86,longSleeve:true,lip:'#7a5a6a',browC:'#0a0a10',extra:'<path d="M104 120 Q200 96 296 120 L300 132 Q200 112 100 132Z" fill="#0a0a10"/><path d="M136 120 C138 70 170 50 200 50 C230 50 262 70 264 120Z" fill="#121218"/><path d="M140 112 Q200 100 260 112" stroke="#a0101a" stroke-width="6"/>'},
 yai:{id:'yai',ghost:true,hair:'bun',hc:['#e8e4ea','#c0b8c4','#c0b8c4','#f8f4fa'],skin:SK.old[0],skinSh:SK.old[1],iris:['#1a1208','#5a3a24','#9a7050','#e8d0b0'],outfit:'cardigan',top:'#8a6a58',topSh:'#5e4436',inner:'#f6efe2',btn:'#f2d4a8',sw:68,old:true,glasses:'#8a6a3a',browC:'#b0a8b4',lip:'#b07a80',extra:'<g transform="translate(152,104) rotate(-20)"><circle r="8" fill="#fff"/><circle r="3" fill="#ffd27a"/></g>'}
};

/* ---------------- kid's crayon drawings ---------------- */
const CR='filter="url(#crayon)"';
ART.drawings={
 bed:`<g ${CR} stroke-linecap="round" stroke-linejoin="round" fill="none">
  <rect x="40" y="40" width="120" height="90" stroke="#5a8ad0" stroke-width="5"/><path d="M100 40 v90 M40 85 h120" stroke="#5a8ad0" stroke-width="4"/><circle cx="70" cy="62" r="12" stroke="#f2c84a" stroke-width="5"/>
  <path d="M60 230 h230 M60 230 v40 M290 230 v40 M60 200 h80" stroke="#7a5a3a" stroke-width="6"/><rect x="70" y="180" width="60" height="30" rx="10" stroke="#fff" fill="#eef4ff" stroke-width="4"/>
  <path d="M130 200 h150 v30 h-150z" fill="#9fd0ff" stroke="#5a8ad0" stroke-width="5"/><circle cx="110" cy="182" r="22" fill="#ffe0c8" stroke="#c8906a" stroke-width="4"/><path d="M100 178 v2 M118 178 v2 M102 192 q8 -4 16 0" stroke="#3a2a20" stroke-width="3"/>
  <path d="M320 80 v190 M300 270 h40 M320 90 h-26 v40 h26" stroke="#9a9aa8" stroke-width="5"/><path d="M308 130 q-60 30 -170 60" stroke="#9a9aa8" stroke-width="3"/>
  <path d="M220 80 l8 -10 l8 10 l-8 10z M250 60 l6 -8 l6 8 l-6 8z" fill="#f2c84a" stroke="#f2c84a" stroke-width="2"/></g>`,
 mom:`<g ${CR} stroke-linecap="round" stroke-linejoin="round" fill="none">
  <circle cx="130" cy="100" r="34" fill="#ffe0c8" stroke="#c8906a" stroke-width="5"/><path d="M96 96 q0 -46 34 -46 q34 0 34 46 l4 30 q-8 -6 -12 -30 M96 96 l-4 30 q8 -6 10 -30" fill="#4a3028" stroke="#3a2018" stroke-width="5"/>
  <path d="M118 98 v3 M142 98 v3 M118 116 q12 8 24 0" stroke="#3a2a20" stroke-width="4"/><path d="M90 140 l-20 140 h120 l-20 -140z" fill="#e8a0a8" stroke="#c06070" stroke-width="5"/>
  <circle cx="250" cy="170" r="24" fill="#ffe0c8" stroke="#c8906a" stroke-width="5"/><path d="M228 160 q22 -30 44 0" fill="#8a5a3a" stroke="#5a3622" stroke-width="4"/><path d="M240 168 v2 M258 168 v2 M242 180 q8 6 16 0" stroke="#3a2a20" stroke-width="3"/>
  <path d="M232 196 l-10 84 h56 l-10 -84z" fill="#9fd0ff" stroke="#5a8ad0" stroke-width="5"/><path d="M176 190 q30 10 56 20" stroke="#c8906a" stroke-width="7"/>
  <path d="M190 60 c-10 -16 -30 0 0 20 c30 -20 10 -36 0 -20z M300 90 c-8 -12 -24 0 0 16 c24 -16 8 -28 0 -16z" fill="#ff7a98" stroke="#e05070" stroke-width="3"/></g>`,
 cocoa:`<g ${CR} stroke-linecap="round" stroke-linejoin="round" fill="none">
  <path d="M110 140 h150 l-14 120 q-4 16 -20 16 h-82 q-16 0 -20 -16z" fill="#fff4e8" stroke="#c06040" stroke-width="6"/><path d="M260 170 q40 0 36 36 q-4 30 -44 26" stroke="#c06040" stroke-width="7"/>
  <path d="M116 160 h138 l-6 40 h-126z" fill="#8a5030" stroke="#6a3a20" stroke-width="3"/>
  <path d="M130 150 q-10 -20 10 -24 q4 -20 24 -12 q14 -16 30 0 q20 -6 22 14 q20 4 10 22z" fill="#fff" stroke="#bbb" stroke-width="4"/><path d="M200 146 q-6 -16 10 -18 q10 -14 22 -2 q18 2 10 20z" fill="#fff" stroke="#bbb" stroke-width="4"/>
  <path d="M150 96 q-14 -20 0 -40 q14 -20 0 -40 M190 96 q-14 -20 0 -40 q14 -20 0 -40 M230 96 q-14 -20 0 -40" stroke="#c8c8d8" stroke-width="5"/>
  <circle cx="320" cy="60" r="20" fill="#f2c84a" stroke="#f2a03a" stroke-width="4"/></g>`,
 promise:`<g ${CR} stroke-linecap="round" stroke-linejoin="round" fill="none">
  <path d="M60 280 v-150 l150 -70 l150 70 v150z" fill="#f6e2c8" stroke="#8a5a3a" stroke-width="6"/><path d="M130 280 v-110 a50 50 0 0 1 100 0 v110" fill="#9fd0ff" stroke="#5a3622" stroke-width="5"/>
  <path d="M250 150 h80 v40 h-80z" fill="#3a3a3a" stroke="#222" stroke-width="4"/><path d="M262 172 q10 -16 20 0 M276 160 l4 -8 l4 8 M290 160 l4 -8 l4 8" stroke="#f2c84a" stroke-width="3"/>
  <circle cx="160" cy="210" r="16" fill="#ffe0c8" stroke="#c8906a" stroke-width="4"/><path d="M146 226 l-6 50 h40 l-6 -50z" fill="#e8a0a8" stroke="#c06070" stroke-width="4"/>
  <circle cx="200" cy="232" r="11" fill="#ffe0c8" stroke="#c8906a" stroke-width="4"/><path d="M192 244 l-4 32 h26 l-4 -32z" fill="#9fd0ff" stroke="#5a8ad0" stroke-width="4"/><path d="M176 236 q8 4 16 6" stroke="#c8906a" stroke-width="5"/>
  <path d="M300 70 l10 22 l24 2 l-18 16 l6 24 l-22 -12 l-22 12 l6 -24 l-18 -16 l24 -2z" fill="#f2c84a" stroke="#f2a03a" stroke-width="3"/></g>`,
 tongue:`<g ${CR} stroke-linecap="round" stroke-linejoin="round" fill="none">
  <circle cx="110" cy="120" r="46" fill="#ffe0c8" stroke="#c8906a" stroke-width="5"/><path d="M90 108 l8 6 l-8 6 M130 108 l-8 6 l8 6" stroke="#3a2a20" stroke-width="4"/><path d="M96 140 q14 10 28 0" stroke="#3a2a20" stroke-width="4"/><path d="M104 146 q6 22 12 0" fill="#ff7a98" stroke="#e05070" stroke-width="3"/>
  <path d="M60 70 l-10 -14 M80 60 l-4 -16 M140 60 l6 -16" stroke="#ff5a3a" stroke-width="4"/>
  <path d="M60 210 h90 l-8 60 h-74z" fill="#8a5030" stroke="#6a3a20" stroke-width="5"/><path d="M80 200 q-10 -16 0 -32 q10 -16 0 -32 M110 200 q-10 -16 0 -32" stroke="#ff5a3a" stroke-width="5"/>
  <path d="M40 180 l130 110 M170 180 l-130 110" stroke="#e03030" stroke-width="7"/>
  <circle cx="270" cy="140" r="46" fill="#ffe0c8" stroke="#c8906a" stroke-width="5"/><path d="M250 132 v4 M290 132 v4 M252 152 q18 14 36 0" stroke="#3a2a20" stroke-width="4"/>
  <path d="M230 220 h90 l-8 60 h-74z" fill="#a86a40" stroke="#6a3a20" stroke-width="5"/><path d="M262 210 q-6 -10 0 -18" stroke="#c8c8d8" stroke-width="4"/>
  <circle cx="275" cy="250" r="44" stroke="#3ab04a" stroke-width="6"/></g>`
};
ART.drawingWrap=(inner)=>`<svg viewBox="0 0 380 320" width="380" height="320"><defs><filter id="crayon"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.5"/></filter></defs><rect width="380" height="320" fill="#fffdf6"/><g opacity=".06" stroke="#5a8ad0">${[...Array(12)].map((_,i)=>`<path d="M0 ${24+i*26} h380"/>`).join('')}</g>${inner}</svg>`;

/* ---------------- flashbacks ---------------- */
const fdefs=`<defs>
 <radialGradient id="fPink"><stop offset="0" stop-color="#ff9cc0" stop-opacity=".9"/><stop offset="1" stop-color="#ff7fb0" stop-opacity="0"/></radialGradient>
 <radialGradient id="fWarm"><stop offset="0" stop-color="#ffd890" stop-opacity=".85"/><stop offset="1" stop-color="#ffb060" stop-opacity="0"/></radialGradient>
 <radialGradient id="fHead"><stop offset="0" stop-color="#fff2c8" stop-opacity=".8"/><stop offset="1" stop-color="#ffd27f" stop-opacity="0"/></radialGradient>
 <filter id="fb8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
 <filter id="fb3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>
 <filter id="sepia"><feColorMatrix type="matrix" values=".5 .45 .15 0 .05  .42 .4 .13 0 .03  .32 .3 .1 0 0  0 0 0 1 0"/></filter>
</defs>`;
ART.FLASH={};
ART.FLASH.f1={cap:'สิบปีก่อน · เช้าวันที่ฝนตกหนัก',rain:true,tone:'#0b0f1c',svg:`${fdefs}
<linearGradient id="fSky1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3552"/><stop offset=".6" stop-color="#55617f"/><stop offset="1" stop-color="#7a849c"/></linearGradient>
<linearGradient id="fRoad1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c3346"/><stop offset="1" stop-color="#151a28"/></linearGradient>
<rect width="1280" height="720" fill="url(#fSky1)"/>
<g opacity=".9"><rect x="0" y="180" width="1280" height="250" fill="#323b58"/><rect x="0" y="170" width="1280" height="14" fill="#262e48"/>
<g fill="#9fb0d8" opacity=".14">${(()=>{let s='';for(let r=0;r<3;r++)for(let c=0;c<26;c++)s+=`<rect x="${20+c*49}" y="${206+r*62}" width="32" height="38"/>`;return s;})()}</g>
<rect x="540" y="120" width="200" height="64" fill="#2a3250"/><circle cx="640" cy="150" r="22" fill="#b8c4e0" opacity=".25"/></g>
<g fill="#20283e" filter="url(#fb3)"><circle cx="80" cy="360" r="70"/><circle cx="160" cy="340" r="60"/><circle cx="1180" cy="350" r="80"/><circle cx="1100" cy="370" r="55"/></g>
<rect x="0" y="400" width="1280" height="42" fill="#3a4258"/><rect x="0" y="398" width="1280" height="4" fill="#5a6480"/>
<g stroke="#2a3048" stroke-width="3">${(()=>{let s='';for(let i=0;i<64;i++)s+=`<path d="M${i*20} 366 v34"/>`;return s;})()}</g>
<rect x="0" y="442" width="1280" height="150" fill="url(#fRoad1)"/>
<g fill="#e8eefc" opacity=".25"><rect x="60" y="512" width="90" height="5"/><rect x="260" y="512" width="90" height="5"/><rect x="460" y="512" width="90" height="5"/><rect x="660" y="512" width="90" height="5"/><rect x="860" y="512" width="90" height="5"/><rect x="1060" y="512" width="90" height="5"/></g>
<g filter="url(#fb8)" opacity=".7"><rect x="930" y="450" width="10" height="120" fill="#ffd27f" opacity=".5"/><rect x="1200" y="452" width="14" height="130" fill="#ffd27f" opacity=".4"/></g>
<circle cx="1230" cy="456" r="26" fill="url(#fHead)"/><circle cx="1180" cy="458" r="18" fill="url(#fHead)"/>
<g><ellipse class="ripple" cx="300" cy="540" rx="22" ry="5"/><ellipse class="ripple" cx="700" cy="480" rx="18" ry="4" style="animation-delay:.5s"/><ellipse class="ripple" cx="1000" cy="560" rx="24" ry="5" style="animation-delay:1s"/></g>
<g transform="translate(905,0)"><rect x="56" y="300" width="5" height="142" fill="#20283c"/><circle cx="58.5" cy="296" r="18" fill="#2a3450"/><circle cx="58.5" cy="296" r="13" fill="#e8eefc" opacity=".7"/>
 <circle cx="0" cy="338" r="15" fill="#d8c8ca"/><path d="M-16 336 C-16 316 16 316 16 336 C10 326 -10 326 -16 336Z" fill="#141a2c"/>
 <path d="M-20 356 C-22 350 -10 350 0 352 C10 350 22 350 20 356 L22 404 L-22 404Z" fill="#c0c9dc"/><path d="M-12 352 L14 404" stroke="#3a4260" stroke-width="3"/>
 <rect x="-21" y="402" width="42" height="18" fill="#252c48"/><rect x="-15" y="420" width="9" height="22" fill="#d8c8ca"/><rect x="6" y="420" width="9" height="22" fill="#d8c8ca"/></g>
<rect x="0" y="592" width="1280" height="128" fill="#3d4560"/><rect x="0" y="588" width="1280" height="6" fill="#626c88"/>
<g><rect x="40" y="250" width="560" height="22" fill="#3a4462"/><rect x="62" y="272" width="12" height="448" fill="#2a324c"/><rect x="566" y="272" width="12" height="448" fill="#2a324c"/>
 <rect x="74" y="300" width="492" height="260" fill="#9fb4e0" opacity=".1"/><rect x="140" y="320" width="150" height="200" rx="4" fill="#4a5478" opacity=".6"/><text x="215" y="410" text-anchor="middle" font-family="Mali" font-size="16" fill="#c9d4f0" opacity=".5">สาย 8</text>
 <rect x="110" y="610" width="420" height="12" fill="#2a324c"/></g>
<g transform="translate(386,0)">
 <circle cx="80" cy="452" r="58" fill="url(#fPink)" filter="url(#fb8)"/>
 <rect x="-20" y="596" width="12" height="62" fill="#d8c6cc"/><rect x="10" y="596" width="12" height="62" fill="#d8c6cc"/>
 <rect x="-21" y="650" width="14" height="24" fill="#eef0f6"/><rect x="9" y="650" width="14" height="24" fill="#eef0f6"/>
 <path d="M-23 674 h18 q4 0 4 6 v4 h-24z" fill="#111"/><path d="M7 674 h18 q6 0 6 6 v4 h-24z" fill="#111"/>
 <path d="M-36 514 L36 514 L52 600 L-52 600Z" fill="#202848"/><g stroke="#141a34" stroke-width="2"><path d="M-22 516 L-32 600 M-8 516 L-12 600 M8 516 L10 600 M22 516 L32 600"/></g>
 <path d="M-30 400 C-36 398 -22 390 0 391 C22 390 36 396 38 406 L34 470 L32 516 L-34 516 L-36 470 Z" fill="#c4cde2"/>
 <path d="M-24 396 L36 476" stroke="#2a3250" stroke-width="5"/><rect x="-52" y="470" width="30" height="40" rx="5" fill="#2a3250"/>
 <path d="M28 402 C42 402 52 414 52 436 L40 444 L30 420Z" fill="#d6deee"/><path d="M44 440 C46 458 52 466 64 464" stroke="#d8c6cc" stroke-width="11" fill="none" stroke-linecap="round"/>
 <g transform="translate(58,428) rotate(-6)"><rect width="20" height="28" rx="2" fill="#ff9cc0"/><path d="M0 0 l10 -7 l10 7z" fill="#ffc2d8"/><rect x="3" y="11" width="14" height="8" rx="1" fill="#fff" opacity=".85"/></g>
 <g transform="translate(76,432) rotate(4)"><rect width="20" height="28" rx="2" fill="#ffb0cc"/><path d="M0 0 l10 -7 l10 7z" fill="#ffd2e2"/><rect x="3" y="11" width="14" height="8" rx="1" fill="#fff" opacity=".85"/></g>
 <path d="M60 462 C66 468 80 468 88 460" stroke="#e0ced4" stroke-width="7" fill="none" stroke-linecap="round"/>
 <path d="M30 330 C38 332 42 340 40 348 C43 351 41 355 37 356 C37 364 32 370 26 370 L22 336Z" fill="#dccbd0"/>
 <path d="M-26 340 C-32 310 -14 296 4 296 C28 296 40 314 34 342 C38 384 36 430 30 474 C20 482 -8 484 -28 474 C-34 430 -34 384 -26 340Z" fill="#141a2e"/>
 <path d="M24 310 C36 322 38 342 32 364 C28 350 24 330 18 316Z" fill="#141a2e"/>
 <g stroke="#3a4a80" stroke-width="1.6" fill="none" opacity=".55"><path d="M-14 310 C-26 340 -24 400 -20 470"/><path d="M6 300 C-4 340 0 420 4 478"/></g>
 <g transform="translate(22,318) rotate(30)"><path d="M0,-6 C6,-7 8,-1 6,3 C4,7 1,9 0,10 C-1,9 -4,7 -6,3 C-8,-1 -6,-7 0,-6Z" fill="#ec4f6c"/></g>
</g>`};

ART.FLASH.f2={cap:'หนึ่งปีก่อน · ห้องพักเด็ก ชั้นสาม',rain:false,tone:'#0c1418',svg:`${fdefs}
<linearGradient id="fWall2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a4048"/><stop offset="1" stop-color="#1a2a30"/></linearGradient>
<rect width="1280" height="720" fill="url(#fWall2)"/>
<rect x="760" y="80" width="380" height="300" rx="6" fill="#0e1830"/><rect x="760" y="80" width="380" height="300" rx="6" fill="none" stroke="#c8d8d8" stroke-width="14"/><path d="M950 80 v300 M760 230 h380" stroke="#c8d8d8" stroke-width="8"/>
<g fill="#ffd58a" opacity=".5">${[...Array(18)].map((_,i)=>`<rect x="${780+(i*61)%340}" y="${250+(i*37)%110}" width="6" height="8"/>`).join('')}</g>
<g stroke="#bcd" stroke-opacity=".35" stroke-width="2">${[...Array(30)].map((_,i)=>`<path d="M${770+(i*47)%360} ${90+(i*29)%280} l-3 14"/>`).join('')}</g>
<g transform="translate(120,90)"><rect width="110" height="90" fill="#fffdf6" transform="rotate(-4)"/><path d="M20 70 h60 l-6 -40 h-48z" fill="#8a5030" transform="rotate(-4)"/><path d="M30 28 q8 -14 20 -6 q12 -10 22 6z" fill="#fff" stroke="#ccc" transform="rotate(-4)"/><rect x="40" y="-6" width="30" height="10" fill="#f2e8a0" opacity=".8" transform="rotate(-4)"/></g>
<g transform="translate(260,110)"><rect width="100" height="80" fill="#fffdf6" transform="rotate(5)"/><circle cx="50" cy="40" r="18" fill="#f2c84a" transform="rotate(5)"/><rect x="34" y="-6" width="30" height="10" fill="#f2e8a0" opacity=".8" transform="rotate(5)"/></g>
<g transform="translate(400,96)"><rect width="104" height="84" fill="#fffdf6" transform="rotate(-2)"/><path d="M20 70 l30 -40 l30 40z" fill="#e8a0a8" transform="rotate(-2)"/><circle cx="50" cy="24" r="12" fill="#ffe0c8" transform="rotate(-2)"/></g>
<circle cx="250" cy="420" r="260" fill="url(#fWarm)" opacity=".55"/>
<g transform="translate(160,330)"><rect x="-6" y="40" width="12" height="160" fill="#8a7a6a"/><path d="M-40 40 l40 -60 l40 60z" fill="#f2c890"/><circle cx="0" cy="34" r="16" fill="#fff6d0"/></g>
<rect x="1000" y="250" width="8" height="330" fill="#a8b4b8"/><path d="M970 250 h60" stroke="#a8b4b8" stroke-width="6"/><rect x="980" y="262" width="26" height="40" rx="6" fill="#d8eef8" opacity=".7"/><path d="M993 302 q-40 120 -230 200" stroke="#a8b4b8" stroke-width="2" fill="none"/>
<path d="M380 460 h560 v40 h-560z" fill="#d8dee4"/><rect x="380" y="500" width="14" height="160" fill="#8a96a0"/><rect x="926" y="500" width="14" height="160" fill="#8a96a0"/><path d="M380 430 v-90 q0 -20 20 -20 v110" fill="#c8d0d8"/>
<path d="M440 440 h480 v40 h-480z" fill="#9fc8e8"/><path d="M460 440 q200 -50 460 0" fill="#bcdcf0"/>
<rect x="400" y="412" width="110" height="44" rx="18" fill="#f4f6fa"/>
<circle cx="470" cy="408" r="34" fill="#f2dcd0"/><path d="M436 404 q0 -42 34 -42 q36 0 36 42 q-10 -18 -36 -20 q-24 2 -34 20z" fill="#7a4a30"/><path d="M458 414 q4 4 8 0 M478 414 q4 4 8 0" stroke="#3a2a20" stroke-width="2.5" fill="none"/><path d="M462 428 q8 5 16 0" stroke="#a8606a" stroke-width="2.5" fill="none"/>
<g transform="translate(720,320)"><path d="M-60 140 q0 -90 60 -100 q60 10 60 100z" fill="#c98a8a"/><circle cx="0" cy="10" r="38" fill="#e8c8b0"/><path d="M-40 10 q0 -50 40 -50 q42 0 42 50 l2 30 q-8 -6 -10 -28 q-30 -20 -64 0 q-2 22 -10 28z" fill="#2a1a18"/>
 <path d="M-18 14 q6 4 12 0" stroke="#3a2a20" stroke-width="2.5" fill="none"/><path d="M-80 120 l60 -30 l40 20 l-60 30z" fill="#fff8e8"/><path d="M-80 120 l60 -30 l-4 -6 l-60 30z" fill="#e8a040"/><path d="M-30 96 q-30 10 -60 14" stroke="#e8c8b0" stroke-width="12" stroke-linecap="round"/>
 <path d="M-50 70 q-40 30 -170 40" stroke="#e8c8b0" stroke-width="12" fill="none" stroke-linecap="round"/></g>`};

ART.FLASH.f3={cap:'ยี่สิบปีก่อน · ตลาดเช้า ก่อนพระอาทิตย์ขึ้น',tone:'#1a0f08',svg:`${fdefs}
<linearGradient id="fSky3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a5a"/><stop offset=".45" stop-color="#c06a6a"/><stop offset=".75" stop-color="#f2a65a"/><stop offset="1" stop-color="#f8d090"/></linearGradient>
<rect width="1280" height="720" fill="url(#fSky3)"/>
<circle cx="980" cy="380" r="70" fill="#ffe4a8" opacity=".9"/><circle cx="980" cy="380" r="200" fill="url(#fWarm)"/>
<g fill="#3a2430">${[...Array(9)].map((_,i)=>`<rect x="${i*150-20}" y="${250+(i%3)*30}" width="${120+(i%2)*40}" height="300"/>`).join('')}</g>
<g>${[...Array(6)].map((_,i)=>`<g transform="translate(${i*230-40},330)"><path d="M0 0 l180 0 l-20 40 l-140 0z" fill="${['#c0503a','#3a7a6a','#d8a040','#5a5a9a','#c0503a','#3a7a6a'][i]}"/><path d="M0 0 l180 0" stroke="#fff" stroke-opacity=".3" stroke-width="4" stroke-dasharray="20 20"/><rect x="20" y="40" width="6" height="200" fill="#2a1a18"/><rect x="154" y="40" width="6" height="200" fill="#2a1a18"/></g>`).join('')}</g>
<rect x="0" y="560" width="1280" height="160" fill="#4a3030"/><rect x="0" y="556" width="1280" height="6" fill="#6a4a40"/>
<g transform="translate(520,380)">
 <rect x="0" y="80" width="300" height="110" rx="8" fill="#d8c8a8"/><rect x="0" y="80" width="300" height="20" rx="6" fill="#3a6a5a"/><circle cx="50" cy="210" r="26" fill="#2a2020"/><circle cx="250" cy="210" r="26" fill="#2a2020"/><circle cx="50" cy="210" r="10" fill="#8a8a8a"/><circle cx="250" cy="210" r="10" fill="#8a8a8a"/>
 <g fill="#fff" opacity=".35"><rect x="20" y="30" width="40" height="50" rx="4"/><rect x="70" y="40" width="36" height="40" rx="4"/></g><rect x="20" y="50" width="40" height="30" rx="2" fill="#5a3018" opacity=".7"/>
 <path d="M150 60 h50 l-6 20 h-38z" fill="#c0c0c8"/><path d="M175 56 q-10 -20 0 -36 q10 -16 0 -30 M190 56 q-10 -18 0 -32" stroke="#fff" stroke-opacity=".6" stroke-width="5" fill="none"/>
 <text x="150" y="150" text-anchor="middle" font-family="Mali" font-size="26" font-weight="700" fill="#3a2418">โอเลี้ยง · กาแฟ</text>
 <g transform="translate(230,58)"><path d="M0 0 h22 l-3 22 h-16z" fill="#c8ccd4"/><path d="M0 0 h22 l-1 8 h-20z" fill="#2a1408"/></g><g transform="translate(258,58)"><path d="M0 0 h22 l-3 22 h-16z" fill="#c8ccd4"/><path d="M0 0 h22 l-1 8 h-20z" fill="#2a1408"/></g>
</g>
<g transform="translate(470,330)"><path d="M-36 250 l6 -140 q30 -20 60 0 l6 140z" fill="#3a6a5a"/><path d="M-30 110 q30 -20 60 0 l-4 -40 q-26 -10 -52 0z" fill="#e8e2d4"/><circle cx="0" cy="40" r="30" fill="#c89878"/><path d="M-30 36 q0 -36 30 -36 q32 0 32 30 q-20 -14 -62 6z" fill="#1a1a20"/><path d="M-10 54 q10 6 20 0" stroke="#1a1a20" stroke-width="5"/><path d="M28 120 q40 -10 60 -40" stroke="#c89878" stroke-width="14" stroke-linecap="round" fill="none"/></g>
<g transform="translate(900,420)"><rect x="-30" y="110" width="60" height="16" fill="#8a5a3a"/><path d="M-20 126 l-6 60 M20 126 l6 60" stroke="#6a4028" stroke-width="6"/><path d="M-34 112 q0 -70 34 -76 q34 6 34 76z" fill="#c0603a"/><circle cx="0" cy="12" r="26" fill="#d8a888"/><path d="M-26 8 q0 -32 26 -32 q26 0 26 32 q-8 -14 -26 -14 q-18 0 -26 14z" fill="#2a2224"/><circle cx="0" cy="-26" r="13" fill="#2a2224"/><path d="M-10 18 q10 10 20 0" stroke="#7a3a3a" stroke-width="3" fill="none"/><path d="M-30 70 q-30 -10 -44 -30" stroke="#d8a888" stroke-width="11" stroke-linecap="round" fill="none"/><g transform="translate(-84,26)"><path d="M0 0 h18 l-3 18 h-12z" fill="#c8ccd4"/></g></g>
<rect width="1280" height="720" fill="#ffb060" opacity=".08"/>`};

ART.FLASH.f4={cap:'ห้าสิบปีก่อน · ร้านนี้ ในเย็นวันหนึ่ง',tone:'#1a140c',sepia:true,svg:`${fdefs}<g filter="url(#sepia)">
<rect width="1280" height="720" fill="#6a4a3a"/><rect width="1280" height="420" fill="#8a6a50"/>
<g fill="#7a5a44" opacity=".6">${[...Array(20)].map((_,i)=>`<path d="M${i*64} 0 v420" stroke="#6a4a3a" stroke-width="2"/>`).join('')}</g>
<path d="M380 400 L380 150 A260 110 0 0 1 900 150 L900 400Z" fill="#e8c890"/><path d="M380 400 L380 150 A260 110 0 0 1 900 150 L900 400" fill="none" stroke="#3a2418" stroke-width="20"/><path d="M640 40 v360 M380 230 h520" stroke="#3a2418" stroke-width="10"/>
<circle cx="760" cy="200" r="70" fill="#fff4d0" opacity=".7"/>
<rect x="0" y="400" width="1280" height="20" fill="#4a3020"/>
<g transform="translate(1060,250)"><rect x="-70" y="30" width="140" height="80" rx="10" fill="#5a3a24"/><circle cx="-30" cy="70" r="22" fill="#3a2418"/><rect x="10" y="50" width="44" height="40" rx="4" fill="#d8b878"/><path d="M0 30 l-30 -50" stroke="#2a1a10" stroke-width="3"/></g>
<rect x="420" y="520" width="440" height="20" rx="4" fill="#5a3a24"/><rect x="620" y="540" width="40" height="180" fill="#4a3020"/>
<g transform="translate(500,380)"><path d="M-50 160 l10 -110 q40 -26 80 0 l10 110z" fill="#5a7898"/><circle cx="0" cy="10" r="34" fill="#e8c0a0"/><path d="M-34 8 q0 -42 34 -42 q34 0 34 34 q-16 -16 -68 8z" fill="#1a1414"/><path d="M-12 18 q4 3 8 0 M10 18 q4 3 8 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><path d="M-6 32 q8 6 16 0" stroke="#7a3a3a" stroke-width="3" fill="none"/><path d="M40 90 q40 10 70 40" stroke="#e8c0a0" stroke-width="13" stroke-linecap="round" fill="none"/></g>
<g transform="translate(780,380)"><path d="M-50 160 l10 -110 q40 -26 80 0 l10 110z" fill="#c8a0c8"/><circle cx="0" cy="10" r="32" fill="#f0c8b0"/><path d="M-34 14 q-6 -50 34 -50 q40 0 34 50 q-6 -30 -34 -30 q-28 0 -34 30z" fill="#1a1414"/><path d="M-34 14 q-4 40 -8 70 q10 -10 14 -40z M34 14 q4 40 8 70 q-10 -10 -14 -40z" fill="#1a1414"/><path d="M-12 18 q4 -3 8 0 M10 18 q4 -3 8 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><path d="M-6 32 q6 5 12 0" stroke="#a84a5a" stroke-width="3" fill="none"/><path d="M-40 90 q-40 10 -70 40" stroke="#f0c8b0" stroke-width="12" stroke-linecap="round" fill="none"/></g>
<g transform="translate(600,500)"><path d="M0 0 h28 l-4 22 h-20z" fill="#f4ead8"/><path d="M2 4 h24 l-1 6 h-22z" fill="#e0883a"/></g><g transform="translate(652,500)"><path d="M0 0 h28 l-4 22 h-20z" fill="#f4ead8"/><path d="M2 4 h24 l-1 6 h-22z" fill="#8fb46a"/></g>
<path d="M590 490 q50 -40 100 0" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none" stroke-dasharray="6 6"/>
<g transform="translate(220,330)"><rect x="-60" y="140" width="200" height="90" fill="#5a3a24"/><path d="M-30 140 l6 -90 q30 -20 60 0 l6 90z" fill="#e8dcc8"/><circle cx="6" cy="20" r="28" fill="#f0c8b0"/><path d="M-22 18 q0 -36 28 -36 q30 0 28 36 q-6 -22 -28 -22 q-22 0 -28 22z" fill="#1a1414"/><circle cx="6" cy="-24" r="14" fill="#1a1414"/><path d="M-4 30 q10 6 20 0" stroke="#a84a5a" stroke-width="3" fill="none"/><path d="M0 26 l0 0" /><g transform="translate(70,120)"><circle r="14" fill="#1a1414"/><path d="M-10 -8 l-4 -12 l10 6z M10 -8 l4 -12 l-10 6z" fill="#1a1414"/><circle cx="-5" cy="-1" r="2" fill="#d8f070"/><circle cx="5" cy="-1" r="2" fill="#d8f070"/></g></g>
</g><rect width="1280" height="720" fill="#ffd8a0" opacity=".08"/>`};

ART.FLASH.f5={cap:'พ.ศ. 2535 · วันแรกที่ร้านเปิด',tone:'#1a140a',svg:`${fdefs}
<linearGradient id="fSky5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ac0e8"/><stop offset=".7" stop-color="#f8e0b0"/><stop offset="1" stop-color="#f8d0a0"/></linearGradient>
<rect width="1280" height="720" fill="url(#fSky5)"/>
<g fill="#fff" opacity=".7"><ellipse cx="220" cy="120" rx="90" ry="24"/><ellipse cx="300" cy="104" rx="60" ry="22"/><ellipse cx="1000" cy="160" rx="110" ry="26"/></g>
<rect x="300" y="160" width="680" height="440" fill="#c89a6a"/><rect x="280" y="140" width="720" height="34" fill="#6a3a24"/><path d="M290 174 h700 l-20 40 h-660z" fill="#c0503a"/><path d="M290 174 h700 l-20 40 h-660z" fill="url(#stripe5)"/>
<pattern id="stripe5" width="60" height="40" patternUnits="userSpaceOnUse"><rect width="30" height="40" fill="#f4ead8"/></pattern>
<path d="M420 600 L420 330 A220 90 0 0 1 860 330 L860 600Z" fill="#2a3a5a"/><path d="M420 600 L420 330 A220 90 0 0 1 860 330 L860 600" fill="none" stroke="#4a2a18" stroke-width="16"/><path d="M640 240 v360 M420 420 h440" stroke="#4a2a18" stroke-width="8"/>
<g fill="#ffd890" opacity=".5"><rect x="440" y="440" width="180" height="140"/><rect x="660" y="440" width="180" height="140"/></g>
<rect x="0" y="600" width="1280" height="120" fill="#a88a6a"/>
<g transform="translate(640,96) rotate(-3)"><rect x="-120" y="0" width="240" height="56" rx="6" fill="#4a2a18"/><text x="0" y="40" text-anchor="middle" font-family="Charm" font-size="36" font-weight="700" fill="#f6d6a4">ร้านยาย</text><path d="M-80 0 l-30 -40 M80 0 l30 -40" stroke="#3a2418" stroke-width="3"/></g>
<g transform="translate(200,470)"><rect x="0" y="0" width="70" height="120" rx="6" fill="#2a2a2a"/><text x="35" y="40" text-anchor="middle" font-family="Mali" font-size="14" fill="#fff">เปิดวันนี้</text><text x="35" y="66" text-anchor="middle" font-family="Mali" font-size="12" fill="#f2c47c">กาแฟ</text><text x="35" y="86" text-anchor="middle" font-family="Mali" font-size="12" fill="#f2c47c">ชาไทย</text></g>
<g transform="translate(980,360)"><path d="M-60 240 l10 -170 q50 -30 100 0 l10 170z" fill="#8a6a58"/><path d="M-20 76 l20 30 l20 -30" fill="#f6efe2"/><circle cx="0" cy="20" r="38" fill="#f0c8b0"/><path d="M-38 18 q0 -50 38 -50 q40 0 38 50 q-10 -26 -38 -28 q-28 2 -38 28z" fill="#2a1e1a"/><circle cx="0" cy="-34" r="18" fill="#2a1e1a"/><path d="M-14 22 q5 -4 10 0 M6 22 q5 -4 10 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><path d="M-8 40 q8 7 16 0" stroke="#a84a5a" stroke-width="3" fill="none"/>
 <path d="M-50 120 q30 30 60 10" stroke="#f0c8b0" stroke-width="14" stroke-linecap="round" fill="none"/>
 <g transform="translate(-10,110)"><ellipse cx="0" cy="10" rx="22" ry="16" fill="#141019"/><circle cx="-14" cy="-6" r="13" fill="#141019"/><path d="M-24 -14 l-2 -12 l10 6z M-8 -16 l4 -12 l4 10z" fill="#141019"/><circle cx="-18" cy="-6" r="2.4" fill="#d8f070"/><circle cx="-10" cy="-6" r="2.4" fill="#d8f070"/><path d="M-20 4 q14 6 26 -2" stroke="#c8384a" stroke-width="4" fill="none"/></g></g>
<rect width="1280" height="720" fill="#ffe0a0" opacity=".1"/>`};

/* ---------------- part 2 flashbacks ---------------- */
const P2D=fdefs;
ART.FLASH.g1={cap:'หลายปีก่อน · เช้าหน้าหนาวที่ปากซอย',tone:'#14100c',svg:`${P2D}
<linearGradient id="gS1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ab0c8"/><stop offset=".6" stop-color="#e8d8c0"/><stop offset="1" stop-color="#f2e0c8"/></linearGradient>
<rect width="1280" height="720" fill="url(#gS1)"/>
<g fill="#fff" opacity=".35" filter="url(#fb8)"><ellipse cx="300" cy="420" rx="400" ry="60"/><ellipse cx="1000" cy="460" rx="420" ry="50"/></g>
<rect x="760" y="180" width="460" height="400" fill="#c89a6a"/><path d="M740 180 h500 l-20 40 h-460z" fill="#c0503a"/><path d="M820 580 L820 320 A160 70 0 0 1 1140 320 L1140 580Z" fill="#3a2a2a"/><g fill="#ffd890" opacity=".6"><rect x="840" y="400" width="130" height="160"/><rect x="990" y="400" width="130" height="160"/></g>
<rect x="0" y="580" width="1280" height="140" fill="#8a7a6a"/>
<g transform="translate(160,360)"><rect x="0" y="0" width="170" height="40" rx="6" fill="#e8742a"/><text x="85" y="28" text-anchor="middle" font-family="Mali" font-size="20" font-weight="700" fill="#fff">วินมอเตอร์ไซค์</text><rect x="20" y="40" width="8" height="180" fill="#5a4a3a"/><rect x="142" y="40" width="8" height="180" fill="#5a4a3a"/></g>
<g transform="translate(130,500)"><ellipse cx="40" cy="80" rx="34" ry="34" fill="#222"/><ellipse cx="200" cy="80" rx="34" ry="34" fill="#222"/><path d="M40 80 L100 30 L170 30 L200 80" stroke="#c03030" stroke-width="14" fill="none"/><rect x="90" y="16" width="70" height="20" rx="8" fill="#222"/></g>
<g transform="translate(470,330)"><path d="M-46 250 l8 -150 q38 -26 76 0 l8 150z" fill="#e8742a"/><path d="M-40 100 q38 -26 76 0 l-2 40 q-36 -16 -72 0z" fill="#d06020"/><text x="0" y="170" text-anchor="middle" font-family="Mali" font-size="16" font-weight="700" fill="#fff">12</text><circle cx="0" cy="50" r="30" fill="#c89878"/><path d="M-30 42 q30 -40 60 0 q-30 -14 -60 0z" fill="#d8d8d8"/><path d="M-12 56 q4 3 8 0 M6 56 q4 3 8 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><path d="M-8 70 q8 6 16 0" stroke="#7a3a3a" stroke-width="3" fill="none"/><path d="M30 130 q40 30 70 80" stroke="#c89878" stroke-width="13" stroke-linecap="round" fill="none"/></g>
<g transform="translate(600,560)"><ellipse cx="0" cy="48" rx="54" ry="10" fill="#000" opacity=".2"/><path d="M-40 40 C-44 0 -20 -20 10 -18 C40 -16 50 10 46 40Z" fill="#e8c898"/><ellipse cx="-30" cy="-26" rx="30" ry="26" fill="#e8c898"/><path d="M-44 -40 C-60 -30 -60 0 -50 10 C-44 -6 -40 -20 -40 -34Z" fill="#8a5a3a"/><path d="M-16 -46 C0 -40 4 -20 -4 -10 C-12 -20 -16 -32 -16 -46Z" fill="#8a5a3a"/><circle cx="-38" cy="-30" r="4" fill="#2a1a14"/><ellipse cx="-56" cy="-18" rx="6" ry="4" fill="#2a1a14"/><path d="M-60 -8 q8 10 16 4" fill="#f08a9a"/><path d="M-30 -2 Q-10 6 6 -4" stroke="#c8384a" stroke-width="6" fill="none"/><path d="M46 20 q24 -20 20 -44" stroke="#e8c898" stroke-width="10" stroke-linecap="round" fill="none"/></g>
<g transform="translate(560,530)"><path d="M0 0 h28 l-3 20 h-22z" fill="#f4f0e8"/><ellipse cx="14" cy="2" rx="13" ry="3" fill="#fff"/><path d="M8 -6 q-4 -10 0 -18 M18 -6 q-4 -10 0 -18" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/></g>
<rect width="1280" height="720" fill="#ffe8c8" opacity=".1"/>`};
ART.FLASH.g2={cap:'พ.ศ. 2528 · สงกรานต์หน้าร้านยาย',tone:'#0c1418',svg:`${P2D}
<linearGradient id="gS2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ab4e8"/><stop offset="1" stop-color="#bfe6f8"/></linearGradient>
<rect width="1280" height="720" fill="url(#gS2)"/>
<rect x="680" y="160" width="560" height="440" fill="#d8aa7a"/><path d="M660 160 h600 l-20 40 h-560z" fill="#c0503a"/><g transform="translate(960,110) rotate(-2)"><rect x="-90" y="0" width="180" height="44" rx="5" fill="#4a2a18"/><text x="0" y="32" text-anchor="middle" font-family="Charm" font-size="28" font-weight="700" fill="#f6d6a4">ร้านยาย</text></g>
<g>${[...Array(9)].map((_,i)=>`<g transform="translate(${700+i*62},200)"><path d="M0 0 q10 30 0 60" stroke="#e89a2a" stroke-width="3" fill="none"/>${[0,1,2,3].map(j=>`<circle cx="${(j%2)*4}" cy="${12+j*14}" r="7" fill="${j%2?'#ffb02a':'#ff8a1a'}"/>`).join('')}</g>`).join('')}</g>
<rect x="0" y="580" width="1280" height="140" fill="#a8a098"/>
<g fill="#cfeeff" opacity=".8">${[...Array(40)].map((_,i)=>`<circle cx="${300+(i*53)%500}" cy="${200+(i*37)%260}" r="${2+(i%4)}"/>`).join('')}</g>
<path d="M560 330 Q440 260 380 360" stroke="#bfe8ff" stroke-width="18" fill="none" stroke-linecap="round" opacity=".8"/>
<g transform="translate(360,330)"><path d="M-44 250 l8 -150 q36 -24 72 0 l8 150z" fill="#f4f4f8"/><path d="M-44 250 l8 -150" stroke="#9ab" stroke-width="2"/><circle cx="0" cy="50" r="30" fill="#f6dcd0"/><path d="M-30 50 q-6 -44 30 -44 q36 0 30 44 q-8 -24 -30 -24 q-22 0 -30 24z" fill="#3a2418"/><path d="M28 30 q34 10 30 70" stroke="#3a2418" stroke-width="10" fill="none"/><path d="M-12 56 q4 -4 8 0 M6 56 q4 -4 8 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><ellipse cx="0" cy="72" rx="6" ry="7" fill="#a8445a"/><path d="M-40 120 q-30 30 -30 60" stroke="#f6dcd0" stroke-width="12" stroke-linecap="round" fill="none"/><g fill="#bfe8ff" opacity=".9"><circle cx="-20" cy="20" r="4"/><circle cx="20" cy="90" r="5"/><circle cx="-30" cy="150" r="4"/></g></g>
<g transform="translate(620,340)"><path d="M-46 250 l8 -150 q38 -24 76 0 l8 150z" fill="#e8d8a8"/><circle cx="0" cy="50" r="30" fill="#d8a888"/><path d="M-30 46 q30 -40 60 0 q-30 -12 -60 0z" fill="#1a1414"/><path d="M-12 56 q4 3 8 0 M6 56 q4 3 8 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><path d="M-10 72 q10 -4 20 0" stroke="#7a3a3a" stroke-width="3" fill="none"/><path d="M-40 130 q-50 0 -70 -20" stroke="#d8a888" stroke-width="13" stroke-linecap="round" fill="none"/><g transform="translate(-120,96)"><ellipse rx="34" ry="12" fill="#c8a040"/><ellipse cy="-4" rx="28" ry="7" fill="#9ad8ff"/></g></g>
<rect width="1280" height="720" fill="#fff" opacity=".06"/>`};
ART.FLASH.g3={cap:'สามปีก่อน · ตีสามสิบนาที หน้าตึกโรงพยาบาลเก่า',rain:true,tone:'#06080e',svg:`${P2D}
<rect width="1280" height="720" fill="#0a0e1a"/>
<rect x="200" y="60" width="880" height="480" fill="#1a2032"/><g fill="#ffd58a">${[...Array(24)].map((_,i)=>`<rect x="${240+(i%8)*104}" y="${90+Math.floor(i/8)*130}" width="54" height="70" opacity="${i%5===2?.6:.08}"/>`).join('')}</g>
<rect x="560" y="380" width="160" height="160" fill="#0e1220"/><text x="640" y="370" text-anchor="middle" font-family="Mali" font-size="22" fill="#8a9ab8" opacity=".6">โรงพยาบาลเด็ก</text>
<rect x="0" y="540" width="1280" height="180" fill="#141a28"/>
<g transform="translate(980,250)"><circle r="60" fill="#e8e8e0"/><circle r="52" fill="#fffef4"/><path d="M0 0 v-36 M0 0 l12 -2" stroke="#222" stroke-width="5"/><text y="-60" text-anchor="middle" font-family="Mali" font-size="14" fill="#8a9ab8">03:10</text></g>
<path d="M430 440 L620 620 L240 620Z" fill="#fff8c0" opacity=".14"/>
<g transform="translate(430,380)"><path d="M-46 250 l8 -150 q38 -24 76 0 l8 150z" fill="#6a7688"/><path d="M-40 110 l20 -6 l2 10 l-20 6z M40 110 l-20 -6 l-2 10 l20 6z" fill="#4a5668"/><circle cx="0" cy="50" r="30" fill="#c89878"/><path d="M-32 34 q32 -40 64 0z" fill="#1a2030"/><rect x="-36" y="30" width="72" height="8" rx="3" fill="#0e1220"/><path d="M-12 58 q4 3 8 0 M6 58 q4 3 8 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><path d="M-6 72 q6 3 12 0" stroke="#7a3a3a" stroke-width="3" fill="none"/><path d="M36 120 q30 0 40 20" stroke="#c89878" stroke-width="12" stroke-linecap="round" fill="none"/><rect x="70" y="130" width="30" height="14" rx="4" fill="#333" transform="rotate(30 85 137)"/></g>
<g stroke="#9ab" stroke-opacity=".3" stroke-width="2">${[...Array(60)].map((_,i)=>`<path d="M${(i*67)%1280} ${(i*41)%720} l-6 26"/>`).join('')}</g>`};
ART.FLASH.g4={cap:'สิบห้าปีก่อน · คอนเสิร์ตครั้งสุดท้าย',tone:'#120612',svg:`${P2D}
<rect width="1280" height="720" fill="#14081a"/>
<g opacity=".5">${[...Array(7)].map((_,i)=>`<path d="M${180+i*150} 0 L${120+i*150} 460 L${260+i*150} 460Z" fill="${['#ff6ab0','#a06ae0','#6ab0ff'][i%3]}" opacity=".25"/>`).join('')}</g>
<rect x="0" y="460" width="1280" height="60" fill="#3a1a3a"/><rect x="0" y="456" width="1280" height="6" fill="#ff8ac0" opacity=".6"/>
<g transform="translate(640,200)"><path d="M-60 260 l14 -170 q46 -30 92 0 l14 170z" fill="#a83a6a"/><g fill="#fff6d0">${[...Array(30)].map((_,i)=>`<circle cx="${-40+(i*17)%80}" cy="${110+(i*29)%140}" r="1.8" opacity=".8"/>`).join('')}</g><circle cx="0" cy="50" r="34" fill="#f2d4c0"/><path d="M-36 50 q-10 -56 36 -56 q46 0 36 56 q10 40 4 80 q-12 -30 -10 -70 q-30 -20 -60 0 q2 40 -10 70 q-6 -40 4 -80z" fill="#2a1018"/><path d="M-14 50 q5 -5 10 0 M6 50 q5 -5 10 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><path d="M-8 72 q8 6 16 0" stroke="#c03a5a" stroke-width="3" fill="none"/><path d="M40 110 q30 -30 20 -70" stroke="#f2d4c0" stroke-width="12" stroke-linecap="round" fill="none"/><rect x="52" y="20" width="10" height="34" rx="4" fill="#333" transform="rotate(10 57 37)"/><circle cx="58" cy="18" r="9" fill="#555"/></g>
<rect x="0" y="520" width="1280" height="200" fill="#0a040e"/>
<g fill="#1a0e22">${[...Array(14)].map((_,i)=>`<circle cx="${40+i*92}" cy="${600+(i%2)*14}" r="34"/>`).join('')}</g>
<g transform="translate(600,560)"><circle r="20" fill="#f2d4c0"/><path d="M-20 -2 q20 -30 40 0" fill="#2a1018"/><rect x="-36" y="-70" width="72" height="44" rx="4" fill="#fff"/><text x="0" y="-42" text-anchor="middle" font-family="Mali" font-size="18" font-weight="700" fill="#c03a5a">แม่ ♥</text><path d="M-14 20 l-20 -40 M14 20 l20 -40" stroke="#f2d4c0" stroke-width="8" stroke-linecap="round"/></g>`};
ART.FLASH.g5={cap:'พ.ศ. 2538 · คืนที่ลูกแมวดำหลับไป',tone:'#0a0606',svg:`${P2D}
<rect width="1280" height="720" fill="#1a1010"/>
<path d="M380 400 L380 150 A260 110 0 0 1 900 150 L900 400Z" fill="#0e1428"/><path d="M380 400 L380 150 A260 110 0 0 1 900 150 L900 400" fill="none" stroke="#3a2418" stroke-width="20"/>
<circle cx="760" cy="200" r="40" fill="#e8d8c0" opacity=".7"/>
<rect x="0" y="470" width="1280" height="40" fill="#5a3726"/><rect x="0" y="510" width="1280" height="210" fill="#2a160e"/>
<circle cx="560" cy="430" r="220" fill="url(#fWarm)" opacity=".5"/>
<g transform="translate(560,300)"><path d="M-60 170 l12 -120 q48 -30 96 0 l12 120z" fill="#8a6a58"/><circle cx="0" cy="10" r="36" fill="#f0c8b0"/><path d="M-36 10 q0 -48 36 -48 q38 0 36 48 q-10 -24 -36 -26 q-26 2 -36 26z" fill="#2a1e1a"/><circle cx="0" cy="-42" r="16" fill="#2a1e1a"/><path d="M-14 16 q5 4 10 0 M6 16 q5 4 10 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><path d="M-12 22 q-2 14 0 22 M14 22 q2 14 0 22" stroke="#cdeeff" stroke-width="2.5" fill="none"/><path d="M-8 36 q8 -4 16 0" stroke="#a84a5a" stroke-width="3" fill="none"/>
 <path d="M-50 130 q50 30 100 0" stroke="#f0c8b0" stroke-width="14" stroke-linecap="round" fill="none"/>
 <g transform="translate(0,124)"><ellipse rx="34" ry="18" fill="#141019"/><circle cx="-24" cy="-6" r="15" fill="#141019"/><path d="M-34 -14 l-2 -12 l10 6z M-18 -18 l4 -12 l4 10z" fill="#141019"/><path d="M-30 -6 q4 3 8 0 M-20 -6 q4 3 8 0" stroke="#5a4a5a" stroke-width="1.6" fill="none"/></g></g>
<g transform="translate(1040,170)"><rect x="-40" y="0" width="80" height="300" fill="#0a0a10"/><circle cx="0" cy="-20" r="30" fill="#ece6ee"/><path d="M-50 -30 h100 l-6 -10 h-88z" fill="#0a0a10"/><path d="M-30 -40 q30 -40 60 0z" fill="#0a0a10"/><circle cx="-10" cy="-20" r="3" fill="#ff4a4a"/><circle cx="10" cy="-20" r="3" fill="#ff4a4a"/></g>
<rect width="1280" height="720" fill="#3a0010" opacity=".12"/>`};
ART.FLASH.g6={cap:'พ.ศ. 2535 · ฝนแรกของร้านยาย',rain:true,tone:'#08090e',svg:`${P2D}
<linearGradient id="gS6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4258"/><stop offset="1" stop-color="#6a7088"/></linearGradient>
<rect width="1280" height="720" fill="url(#gS6)"/>
<rect x="540" y="140" width="700" height="460" fill="#a8825a"/><path d="M520 140 h740 l-20 40 h-700z" fill="#a0402a"/><g transform="translate(890,94) rotate(-2)"><rect x="-90" y="0" width="180" height="44" rx="5" fill="#4a2a18"/><text x="0" y="32" text-anchor="middle" font-family="Charm" font-size="28" font-weight="700" fill="#f6d6a4">ร้านยาย</text></g>
<path d="M660 600 L660 330 A230 90 0 0 1 1120 330 L1120 600Z" fill="#ffd890" opacity=".5"/>
<rect x="0" y="600" width="1280" height="120" fill="#3a4050"/>
<g transform="translate(420,330)"><path d="M-130 30 Q0 -80 130 30Z" fill="#c0503a"/><path d="M0 -40 v220" stroke="#4a2a18" stroke-width="5"/><path d="M-50 250 l10 -150 q40 -26 80 0 l10 150z" fill="#8a6a58"/><circle cx="0" cy="70" r="30" fill="#f0c8b0"/><path d="M-30 66 q0 -38 30 -38 q32 0 30 38 q-10 -20 -30 -22 q-20 2 -30 22z" fill="#2a1e1a"/><circle cx="0" cy="26" r="14" fill="#2a1e1a"/><path d="M-12 74 q4 4 8 0 M6 74 q4 4 8 0" stroke="#2a1a14" stroke-width="2.5" fill="none"/><path d="M-8 90 q8 6 16 0" stroke="#a84a5a" stroke-width="3" fill="none"/><path d="M-40 150 q40 30 80 0" stroke="#f0c8b0" stroke-width="12" stroke-linecap="round" fill="none"/></g>
<g transform="translate(420,480)"><ellipse rx="22" ry="14" fill="#141019"/><circle cx="-14" cy="-8" r="11" fill="#141019"/><path d="M-22 -14 l-2 -10 l8 5z M-10 -16 l3 -10 l3 8z" fill="#141019"/><circle cx="-18" cy="-8" r="2.2" fill="#d8f070"/><circle cx="-10" cy="-8" r="2.2" fill="#d8f070"/></g>
<g stroke="#cde" stroke-opacity=".35" stroke-width="2">${[...Array(70)].map((_,i)=>`<path d="M${(i*71)%1280} ${(i*43)%720} l-6 26"/>`).join('')}</g>`};

/* ---------------- decor ---------------- */
ART.DECOR={
 clip:{layer:'front',svg:`<g transform="translate(848,536) rotate(15) scale(.9)"><circle r="16" fill="#ff9cc0" opacity=".25"/>${'CLIP'}</g>`},
 drawing:{layer:'bg',svg:`<g transform="translate(92,196) rotate(-5)"><rect width="78" height="62" fill="#fffdf6"/><rect x="24" y="-6" width="30" height="10" fill="#f2e8a0" opacity=".85"/><path d="M14 50 h40 l-5 -26 h-30z" fill="#8a5030"/><path d="M20 22 q5 -10 14 -4 q8 -8 14 4z" fill="#fff" stroke="#ccc"/><circle cx="62" cy="14" r="7" fill="#f2c84a"/><path d="M58 50 l6 -10 l6 10" stroke="#5a8ad0" stroke-width="2" fill="none"/></g>`},
 tincup:{layer:'bg',svg:`<g transform="translate(1150,318)"><path d="M0 4 h26 l-3 30 q-1 4 -5 4 h-10 q-4 0 -5 -4z" fill="#c8ccd4"/><path d="M26 10 q9 0 8 9 q-1 7 -9 6" stroke="#a8acb4" stroke-width="3" fill="none"/><g fill="#d84a5a"><circle cx="9" cy="18" r="3"/><circle cx="17" cy="24" r="3"/></g><g fill="#3aa05a"><circle cx="13" cy="14" r="2"/></g><ellipse cx="13" cy="4" rx="13" ry="2.5" fill="#e8ecf2"/></g>`},
 chime:{layer:'mid',svg:`<g transform="translate(470,72)"><path d="M0 0 v24" stroke="#c8a060" stroke-width="1.5"/><path d="M-16 34 q16 -18 32 0 q-16 -4 -32 0z" fill="#f2b8c8"/><path d="M-10 30 q10 -14 20 0" fill="#ffd0dc"/><g stroke="#c8a060" stroke-width="1"><path d="M-10 34 v26 M0 34 v34 M10 34 v22"/></g><g fill="#e8d8a0"><rect x="-12" y="58" width="4" height="12" rx="1"/><rect x="-2" y="66" width="4" height="14" rx="1"/><rect x="8" y="54" width="4" height="10" rx="1"/></g><path d="M0 74 v14" stroke="#c8a060"/><path d="M-6 88 h12 l-6 16z" fill="#f2b8c8"/></g>`},
 collar:{layer:'front',svg:`<g transform="translate(560,540)"><path d="M0 0 q20 12 40 0" stroke="#c8384a" stroke-width="6" fill="none"/><circle cx="20" cy="10" r="6" fill="#f2c45a"/></g>`},
 photo85:{layer:'bg',svg:`<g transform="translate(160,340) rotate(4)"><rect width="52" height="40" fill="#fff"/><rect x="4" y="4" width="44" height="28" fill="#5ab4e8"/><circle cx="18" cy="20" r="6" fill="#f6dcd0"/><circle cx="34" cy="20" r="6" fill="#d8a888"/></g>`},
 flashlight:{layer:'front',svg:`<g transform="translate(990,532) rotate(-10)"><rect width="34" height="12" rx="4" fill="#333"/><rect x="32" y="-2" width="10" height="16" rx="3" fill="#555"/><path d="M42 0 l40 -14 v40 z" fill="#fff8c0" opacity=".25"/></g>`},
 mic:{layer:'bg',svg:`<g transform="translate(1240,300)"><rect x="-3" y="0" width="6" height="46" rx="3" fill="#555"/><circle cy="-4" r="9" fill="#777"/><path d="M-8 -8 h16" stroke="#aaa"/></g>`},
 notebook:{layer:'front',svg:`<g transform="translate(470,536) rotate(-4)"><rect x="-2" y="-2" width="64" height="16" rx="2" fill="#5a3a24"/><rect x="0" y="0" width="60" height="12" fill="#f6ead2"/><path d="M30 0 v12" stroke="#c8b08a"/></g>`}
};
ART.DECOR.clip.svg=ART.DECOR.clip.svg.replace('CLIP',ART.clipShape());


ART.customer=function(i){
 const r=(n)=>{const x=Math.sin(i*97.13+n*13.7)*10000;return x-Math.floor(x);};
 const male=r(1)<.5;const hairs=male?['messy','slick','cropped','fluffy']:['bob','bun','pony','wavy','curly'];
 const hcs=[['#2a2a38','#14141e','#14141e','#3a3a50'],['#6a4430','#3a2418','#3a2418','#8a5a40'],['#8a6a4a','#4a3020','#4a3020','#a88a6a'],['#c8c8d0','#9a9aa8','#9a9aa8','#e8e8f0'],['#3a2a28','#1e1414','#1e1414','#5a4038']];
 const tops=[['#e8a0a0','#b06a6a'],['#a0c8e8','#6a98b8'],['#f2e0a0','#c0a860'],['#b8e0b0','#80a878'],['#f4f6fb','#cfd6ea'],['#d0b0e8','#9a78b8'],['#f0c090','#c08850']];
 const outfits=['shirt','cardigan','polo','flower','apron'];
 const sk=[SK.fair,SK.warm,SK.tan,SK.old][Math.floor(r(2)*4)];
 const t=tops[Math.floor(r(3)*tops.length)];const hc=hcs[Math.floor(r(4)*hcs.length)];
 return {id:'cust'+i,male,hair:hairs[Math.floor(r(5)*hairs.length)],hc,skin:sk[0],skinSh:sk[1],outfit:outfits[Math.floor(r(6)*outfits.length)],top:t[0],topSh:t[1],apron:'#7a5a8a',sw:male?78:66,old:r(7)<.25,glasses:r(8)<.3?'#4a3a30':null,tie:male&&r(9)<.4?'#3a4a7a':null,lip:'#a8606a',iris:['#1a1208','#4a3018','#8a6438','#d8bc90']};
};
ART.dog=function(){return `<defs><radialGradient id="dgAura" cx=".5" cy=".5"><stop offset="0" stop-color="#a6e4ff" stop-opacity=".25"/><stop offset="1" stop-color="#7ab8ff" stop-opacity="0"/></radialGradient>
 <linearGradient id="dgFur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8c898"/><stop offset="1" stop-color="#c89868"/></linearGradient><filter id="dgTint"><feColorMatrix type="matrix" values=".88 .04 .06 0 0  .04 .91 .07 0 .015  .06 .07 .99 0 .04  0 0 0 1 0"/></filter></defs>
 <ellipse class="aura" cx="200" cy="330" rx="190" ry="200" fill="url(#dgAura)"/>
 <g filter="url(#dgTint)" transform="translate(0,40)">
  <path d="M120 520 C110 420 140 360 200 352 C260 360 290 420 280 520Z" fill="url(#dgFur)"/>
  <path d="M160 520 C156 440 172 392 200 388 C228 392 244 440 240 520Z" fill="#fbf2e2"/>
  <g class="b-norm"><path d="M128 220 C96 228 88 290 108 330 C122 320 134 290 140 250Z" fill="#8a5a3a"/><path d="M272 220 C304 228 312 290 292 330 C278 320 266 290 260 250Z" fill="#8a5a3a"/></g>
  <g class="b-sad"><path d="M130 230 C100 250 104 320 120 350 C130 330 138 296 142 258Z" fill="#8a5a3a"/><path d="M270 230 C300 250 296 320 280 350 C270 330 262 296 258 258Z" fill="#8a5a3a"/></g>
  <g class="b-up"><path d="M132 220 C112 190 116 150 136 140 C146 170 150 196 150 222Z" fill="#8a5a3a"/><path d="M268 220 C288 190 284 150 264 140 C254 170 250 196 250 222Z" fill="#8a5a3a"/></g>
  <ellipse cx="200" cy="270" rx="80" ry="74" fill="url(#dgFur)"/>
  <path d="M222 220 C256 214 278 240 276 276 C262 290 238 290 224 272 C214 256 212 234 222 220Z" fill="#8a5a3a"/>
  <ellipse cx="200" cy="314" rx="44" ry="32" fill="#fbf2e2"/>
  <ellipse cx="200" cy="300" rx="13" ry="9" fill="#2a1a14"/><ellipse cx="196" cy="297" rx="4" ry="2.5" fill="#fff" opacity=".6"/>
  <g class="e-open"><g class="blink" style="transform-origin:200px 262px"><circle cx="170" cy="262" r="11" fill="#2a1a14"/><circle cx="230" cy="262" r="11" fill="#2a1a14"/><circle cx="166" cy="258" r="4" fill="#fff"/><circle cx="226" cy="258" r="4" fill="#fff"/><circle cx="173" cy="266" r="1.8" fill="#fff" opacity=".8"/><circle cx="233" cy="266" r="1.8" fill="#fff" opacity=".8"/></g></g>
  <g class="e-closed"><path d="M158 266 Q170 252 182 266 M218 266 Q230 252 242 266" stroke="#2a1a14" stroke-width="4" fill="none" stroke-linecap="round"/></g>
  <g class="e-shut"><path d="M158 262 Q170 270 182 262 M218 262 Q230 270 242 262" stroke="#2a1a14" stroke-width="4" fill="none" stroke-linecap="round"/></g>
  <g class="e-lid"><path d="M156 254 Q170 250 184 254 M216 254 Q230 250 244 254" stroke="#8a5a3a" stroke-width="5" fill="none"/></g>
  <g class="m-small"><path d="M200 309 v8 M186 318 Q193 326 200 318 Q207 326 214 318" stroke="#2a1a14" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>
  <g class="m-smile"><path d="M200 309 v8 M184 318 Q193 330 200 318 Q207 330 216 318" stroke="#2a1a14" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>
  <g class="m-open"><path d="M184 318 Q200 348 216 318Z" fill="#7a2a2a"/><path d="M192 328 Q200 352 208 328Z" fill="#f08a9a"/><path d="M200 309 v8" stroke="#2a1a14" stroke-width="2.6"/></g>
  <g class="m-sad"><path d="M200 309 v8 M188 326 Q200 316 212 326" stroke="#2a1a14" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>
  <g class="m-o"><path d="M200 309 v8" stroke="#2a1a14" stroke-width="2.6"/><ellipse cx="200" cy="324" rx="5" ry="6" fill="#7a2a2a"/></g>
  <g class="tears"><path d="M172 276 q-2 14 0 24 M228 276 q2 14 0 24" stroke="#cdeeff" stroke-width="3" fill="none"/></g>
  <g class="blush2"><ellipse cx="156" cy="290" rx="14" ry="6" fill="#ff8fa8" opacity=".45"/><ellipse cx="244" cy="290" rx="14" ry="6" fill="#ff8fa8" opacity=".45"/></g>
  <path d="M146 352 Q200 378 254 352 L250 366 Q200 390 150 366Z" fill="#c8384a"/><circle cx="200" cy="382" r="9" fill="#f2c45a"/><text x="200" y="386" text-anchor="middle" font-size="8" font-family="Mali" fill="#6a4020">ด่าง</text>
 </g>`;};
window.ART=ART;
})();
