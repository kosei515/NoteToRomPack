

let player;
let synthesizer;
let selectS = document.getElementById("soundfonts");
loadSoundFontList();

function loadSoundFontList() {
    return fetch("https://soundfonts.pages.dev/list.json")
      .then((response) => response.json())
      .then((data) => {
        const soundfonts = document.getElementById("soundfonts");
        data.forEach((info) => {
          const option = document.createElement("option");
          option.textContent = info.name;
          if (info.name == "GeneralUser_GS_v1.471") {
            option.selected = true;
          }
          soundfonts.appendChild(option);
        });
      });
}
  
async function initPlayer() {
    player = new SoundFontPlayer();
    synthesizer = new SoundFontPlayer();
    const soundFontDir = `https://soundfonts.pages.dev/${selectS.value}`;
    const program = new Set();
    program.add(0);
    program.add(128);
    await synthesizer.loadSoundFontDir([...program], soundFontDir);
}
  
async function loadSoundFont(player, name, programs) {
  if (!name) {
    const soundfonts = document.getElementById("soundfonts");
    const index = soundfonts.selectedIndex;
    if (index == 0) return; // use local file or url
    name = soundfonts.options[index].value;
  }
  const soundFontDir = `https://soundfonts.pages.dev/${name}`;
  if (!programs) programs = getPrograms(ns);
  await player.loadSoundFontDir(programs, soundFontDir);
}  

class SoundFontPlayer {
    constructor() {
      this.context = new AudioContext();
      this.cacheUrls = new Array(128);
    }
  
    async loadSoundFontDir(programs, dir) {
      const promises = programs.map((program) => {
        const programId = program.toString().padStart(3, "0");
        const url = `${dir}/${programId}.sf3`;
        if (this.cacheUrls[program] == url) return true;
        this.cacheUrls[program] = url;
        return this.fetchBuffer(url);
      });
      const buffers = await Promise.all(promises);
      for (const buffer of buffers) {
        if (buffer instanceof ArrayBuffer) {
          await this.loadSoundFontBuffer(buffer);
        }
      }
    }
  
    async fetchBuffer(url) {
      const response = await fetch(url);
      if (response.status == 200) {
        return await response.arrayBuffer();
      } else {
        return undefined;
      }
    }
    
  
    async loadSoundFontBuffer(soundFontBuffer) {
      if (!this.synth) {
        await this.context.audioWorklet.addModule('./p/libfluidsynth-2.3.0-with-libsndfile.min.js', );
        await this.context.audioWorklet.addModule("./p/js-synthesizer.worklet.min.js", );
        this.synth = new JSSynth.AudioWorkletNodeSynthesizer();
        this.synth.init(this.context.sampleRate);
        const node = this.synth.createAudioNode(this.context);
        node.connect(this.context.destination);
      }
      const soundFontId = await this.synth.loadSFont(soundFontBuffer);
      return soundFontId;
    }
  }

  document.getElementById("inputSoundFontFile").onchange = loadSoundFontFileEvent;

  async function loadSoundFontFileEvent(event) {
    if (player) {
      document.getElementById("soundfonts").options[0].selected = true;
      const file = event.target.files[0];
      const soundFontBuffer = await file.arrayBuffer();
      await player.loadSoundFontBuffer(soundFontBuffer);
      await synthesizer.loadSoundFontBuffer(soundFontBuffer);
    }
  }

let play = document.getElementById('play');
play.onclick = play0;
let stop = document.getElementById('stop');
stop.onclick = stop0;
let reset = document.getElementById('Sreset');
reset.onclick = Sreset;
let Ron = document.getElementById('Ron');
let lightup = document.getElementById('lightup');

function Sreset() {
  stop0();
  stop1();
  if(Sout.checked){
    initPlayer(); 
    setTimeout(() => {
      ReadInst();
     },1000);
  }
}

window.addEventListener('DOMContentLoaded',function(){
  setTimeout(() => {
    if(Sout.checked){
       initPlayer(); 
       ReadInst();
       synthesizer.synth.midiProgramChange(0, 0);
       synthesizer.synth.midiProgramChange(1, 0);
    }
  },5000);  
});
selectS.addEventListener("change",function(){
  initPlayer();
  setTimeout(() => {
    ReadInst();
   },1000);
});

function ReadInst(){
     loadSoundFont(synthesizer, undefined, [Bass[0]]);
     loadSoundFont(synthesizer, undefined, [Rhyrhm[0]]);
     loadSoundFont(synthesizer, undefined, [Acc[0]]);
     loadSoundFont(synthesizer, undefined, [Piano[0]]);
     loadSoundFont(synthesizer, undefined, [Piano[1]]);
     loadSoundFont(synthesizer, undefined, [Harpsichord[0]]);
     loadSoundFont(synthesizer, undefined, [Harpsichord[1]]);
     loadSoundFont(synthesizer, undefined, [Organ[0]]);
     loadSoundFont(synthesizer, undefined, [Organ[1]]);
     loadSoundFont(synthesizer, undefined, [Violin[0]]);
     loadSoundFont(synthesizer, undefined, [Violin[1]]);
     loadSoundFont(synthesizer, undefined, [Flute[0]]);
     loadSoundFont(synthesizer, undefined, [Flute[1]]);
     loadSoundFont(synthesizer, undefined, [Clarinet[0]]);
     loadSoundFont(synthesizer, undefined, [Clarinet[1]]);
     loadSoundFont(synthesizer, undefined, [Trumpet[0]]);
     loadSoundFont(synthesizer, undefined, [Trumpet[1]]);
     loadSoundFont(synthesizer, undefined, [Celesta[0]]);
     loadSoundFont(synthesizer, undefined, [Celesta[1]]);
}

var tapCount = 0 ;
function timecl(e) {
  if( !tapCount ) {
		++tapCount ;
		setTimeout( function() {
			tapCount = 0 ;
		}, 350 ) ;
	// ダブルタップ判定
	} else {
		e.preventDefault() ;
    let slt = Number(e.target.innerHTML);

    let Pl1=[], Pl2=[], Pl3=[];
    rh=0, rhT=0, fil=0, x0=0, y0=0, z0=0, tm=0;
    Pl1 = Pdata1[0];
    Pl2 = Pdata2[0];
    Pl3 = Pdata3[0];
    if(Sout.checked){
      ReadInst();
      synthesizer.synth.midiProgramChange(3, Acc[0]);
      synthesizer.synth.midiProgramChange(2, Bass[0]);
      synthesizer.synth.midiProgramChange(9, Rhyrhm[0]);
    }
    for(let s=0; s<slt; s++){
      if(Plo1>=1){
        if(Pl1[1]==s){
          let e=0;
          do{
            if(Pl1[0]==1){
              if(Sout.checked) synthesizer.synth.midiProgramChange(0, Pl1[2]);
              if(MoutOn==1) midi.output[MoutS.selectedIndex].send(['0xC3', Pl1[2]]);
              vol1=Pl1[3];
            }
            x0++;
            if(x0<Plo1-1){
              Pl1 = Pdata1[x0];
              if(s==Pl1[1])e=1;
              else e=0;
            } else e=0;
          }while(e==1);
        }
      }

      if(Plo2>=1){
        if(Pl2[1]==s){
          let e=0;
          do{
            if(Pl2[0]==1){
              if(Sout.checked) synthesizer.synth.midiProgramChange(1, Pl2[2]);
              if(MoutOn==1) midi.output[MoutS.selectedIndex].send(['0xC4', Pl2[2]]);
              vol2=Pl2[3];
            }
            y0++;
            if(y0<Plo2-1){
              Pl2 = Pdata2[y0];
              if(s==Pl2[1])e=1;
              else e=0;
            } else e=0;
          }while(e==1);
        }
      }
        
      if(Plo3>=1){
        if(Pl3[1]==s){
          let e=0;
          do{
            if(Pl3[0]==2){
                tempo=Pl3[2];
            }
            if(Pl3[0]==4){
              rh=Pl3[2];
              fil = 3;
              if (rh<=14 && rhT<=95) rhT += 96;
              if (rh>=15 && rhT<=71) rhT += 72;
            }
            if(Pl3[0]==6){
               rh=Pl3[2];
               fil=0;
            }
            if(Pl3[0]==8) rhT = 0;
            if(Pl3[0]==7){
              if(Pl3[2]==1){
                fil = 1;
                if (rh <= 14 && rhT <= 95) rhT += 96;
                if (rh >= 15 && rhT <= 71) rhT += 72;
                if (rh <= 14 && rhT >= 189) rhT -= 96;
                if (rh >= 15 && rhT >= 141) rhT -= 72;
              }else{ fil = 0; }
            }
            z0++;
            if(z0<Plo3-1){
              Pl3 = Pdata3[z0];
              if(s==Pl3[1])e=1;
              else e=0;
            } else e=0;
          }while(e==1);
        }
      }
      rhT++;
      if (rh <= 14 && rhT >= 192) rhT = 0;
      if (rh >= 15 && rhT >= 144) rhT = 0;
    }
    w = slt;
		tapCount = 0 ;
    play0();
	}
}

let no;
let pl = null;



let w=0, rh=0, rhT=0, fil=0, x0=0, y0=0, z0=0, vol1,vol2,tm=0;
let l1=0, l2=0, l3=0, light1=0;
let long1=[], long2=[], long3=[], long4=[];
let o=0, Pl1=[], Pl2=[], Pl3=[], u=0;
function play0() {
    
    o=0, Pl1=[], Pl2=[], Pl3=[], u;
    long1=[], long2=[], long3=[], long4=[];
    l1=0, l2=0, l3=0, light1=0;
    Pl1 = Pdata1[x0];
    Pl2 = Pdata2[y0];
    Pl3 = Pdata3[z0];

      stop1();
      if(Sout.checked){
        ReadInst();
        synthesizer.synth.midiProgramChange(2, Acc[0]);
        synthesizer.synth.midiProgramChange(9, Rhyrhm[0]);
      }
      if(MoutOn==1){
        midi.output[MoutS.selectedIndex].send(['0xC2', Acc[0]]);
        midi.output[MoutS.selectedIndex].send(['0xC5', Acc[0]]);
        midi.output[MoutS.selectedIndex].send(['0xC9', Rhyrhm[0]]);
      }
      play1();
}

function play1() {
    pl = setInterval(function () {
      if(w>=maxL){
        w=0, rh=0, rhT=0, fil=0, x0=0, y0=0, z0=0, tm=0;
        clearInterval(pl);
      }

      if(Plo1>=1){
        if(long1[1]==l1){
          if(Sout.checked) synthesizer.synth.midiNoteOff(0, long1[0]);
          if(Mout.checked&&MoutOn==1) midi.output[MoutS.selectedIndex].send(['0x83', long1[0], '0']);
        }
        if(Pl1[1]==w){
          let e=0;
          do{
            if(Pl1[0]==1){
              if(Sout.checked) synthesizer.synth.midiProgramChange(0, Pl1[2]);
              if(MoutOn==1) midi.output[MoutS.selectedIndex].send(['0xC3', Pl1[2]]);
              vol1=Pl1[3];
            }
            if(Pl1[0]==3){
               if(Sout.checked) synthesizer.synth.midiNoteOn(0, Pl1[2], vol1);
               if(Mout.checked&&MoutOn==1) midi.output[MoutS.selectedIndex].send(['0x93', Pl1[2], vol1]);
               long1 = [Pl1[2],Pl1[3]];
               l1=0;
            }
            x0++;
            if(x0<Plo1){
              Pl1 = Pdata1[x0];
              if(w==Pl1[1])e=1;
              else e=0;
            }
            else e=0;
          }while(e==1);
          light1=1;
        }
      }

      if(Plo2>=1){
        if(long2[1]==l2){
          if(Sout.checked) synthesizer.synth.midiNoteOff(1, long2[0]);
          if(Mout.checked&&MoutOn==1) midi.output[MoutS.selectedIndex].send(['0x84', long2[0], '0']);
        }
        if(Pl2[1]==w){
          let e=0;
          do{
            if(Pl2[0]==1){
              if(Sout.checked) synthesizer.synth.midiProgramChange(1, Pl2[2]);
              if(MoutOn==1) midi.output[MoutS.selectedIndex].send(['0xC4', Pl2[2]]);
              vol2=Pl2[3];
            }
            if(Pl2[0]==3){
              if(Sout.checked) synthesizer.synth.midiNoteOn(1, Pl2[2], vol2);
              if(Mout.checked&&MoutOn==1) midi.output[MoutS.selectedIndex].send(['0x94', Pl2[2], vol2]);
              long2 = [Pl2[2],Pl2[3]];
              l2=0;
           }
            y0++;
            if(y0<Plo2){
              Pl2 = Pdata2[y0];
              if(w==Pl2[1])e=1;
              else e=0;
            }
            else e=0;
          }while(e==1);
          light1=1;
        }
      }
        
      if(Plo3>=1){
        if(o<=l3){
          for(let ff=0; ff<u; ff++){
            if(Sout.checked) {
              synthesizer.synth.midiNoteOff(2, long3[ff]);
            }
            if(Mout.checked&&MoutOn==1){
              midi.output[MoutS.selectedIndex].send(['0x85', long3[ff], '0']);
              midi.output[MoutS.selectedIndex].send(['0x82', long4[ff], '0']);
            }
          }
          u=0; 
        }
        if(Pl3[1]==w){
          let e=0;
          do{
            if(Pl3[0]==2){
              if(tempo!=Pl3[2]){
                tempo=Pl3[2];
                clearInterval(pl);
                play1();
              }
            }
            if(Pl3[0]==3){
              if(Sout.checked && Pl3[4]<=2) synthesizer.synth.midiNoteOn(2, Pl3[2], Acc[1]+15);
              if(Mout.checked&&MoutOn==1){
                 if(Pl3[4]<=2) midi.output[MoutS.selectedIndex].send(['0x95', Pl3[2], Acc[1]]);
                 if(Pl3[4]>=1){ 
                  midi.output[MoutS.selectedIndex].send(['0x92', Pl3[2]-12, 1]);
                 }
              }
              long3[u] = Pl3[2];
              long4[u] = Pl3[2]-12;
              o = Pl3[3]-1;
              l3=0;
              u++;
            }
            if(Pl3[0]==4){
              rh=Pl3[2];
              fil = 3;
              if (rh<=14 && rhT<=95) rhT += 96;
              if (rh>=15 && rhT<=71) rhT += 72;
            }
            if(Pl3[0]==6){
              rh=Pl3[2];
              fil = 0;
            }
            if(Pl3[0]==8){
              rhT = 0;
            }
            if(Pl3[0]==7){
              if(Pl3[2]==1){
                fil = 1;
                if (rh <= 14 && rhT <= 95) rhT += 96;
                if (rh >= 15 && rhT <= 71) rhT += 72;
                if (rh <= 14 && rhT >= 189) rhT -= 96;
                if (rh >= 15 && rhT >= 141) rhT -= 72;
              }else{
                fil = 0;
              }
            }
            z0++;
            if(z0<Plo3){
              Pl3 = Pdata3[z0];
              if(w==Pl3[1])e=1;
              else e=0;
            }
            else e=0;
          }while(e==1);
          light1=2;
        }
      }
         
        
        
  
        if(Ron.checked){
          if(Sout.checked){
            if (fil==3) {
                if (rh >= 15) {
                    if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 31, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 31); }
                    if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 31, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 31); }
                    if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 31, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 31); }
                    if (rhT >= 141) fil = 0;
                } else {
                    if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 31, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 31); }
                    if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 31, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 31); }
                    if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 31, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 31); }
                    if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 31, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 31); }
                    if (rhT >= 189) fil = 0;
                }
            }
            if (fil==0) switch(rh){
                    case 1:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        break;
                    case 2:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        break;
                    case 3:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 138) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 150) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        break;
                    case 4:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 6) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 18) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 30) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 42) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 54) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 66) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 78) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 90) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 102) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 126) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 138) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 150) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 174) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 42) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 126) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 5:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 40) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 88) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 136) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 152) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 160) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 176) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 184) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 6:
                    case 14:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 40) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 88) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 136) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 184) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 7:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 6) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 18) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 30) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 42) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 54) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 66) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 78) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 90) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 102) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 126) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 138) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 150) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 162) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 174) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 186) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 18) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 66) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 162) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 30) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 42) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 54) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 66) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 78) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 126) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 138) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 150) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 162) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 174) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        break;
                    case 8:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 18) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 42) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 66) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 90) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 138) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 162) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 42) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 126) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 9:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        break;
                    case 10:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 18) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        break;
                    case 11:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 186) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 12:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 162) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 13:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 8) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 16) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 32) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 40) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 56) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 64) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 80) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 88) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 104) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 112) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 128) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 136) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 152) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 160) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 176) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 184) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 40) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 88) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 136) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 160) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 15:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 16:
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 12) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 30) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 36) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 102) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 0) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 60) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 24) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 48) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                }
            if (fil==1) {
                switch (rh) {
                    case 1:
                    case 2:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 102) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 126) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 150) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 174) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 186) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 162) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        break;
                    case 3:
                    case 8:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 138) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 174) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 102) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 4:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 102) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 126) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 138) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 150) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 162) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 174) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 186) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        break;
                    case 5:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 104) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 112) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 136) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 152) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 160) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 160) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 176) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 184) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 184) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        break;
                    case 6:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 104) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 112) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 128) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 136) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 152) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 160) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 184) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 112) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 128) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 184) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        break;
                    case 7:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 102) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 138) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 150) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 162) { synthesizer.synth.midiNoteOn(9, 63, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 63); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 174) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 186) { synthesizer.synth.midiNoteOn(9, 64, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 64); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 138) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 150) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 162) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 174) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 186) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        break;
                    case 9:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 126) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 37, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 37); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        break;
                    case 10:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 114) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 41, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 41); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 41, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 41); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        break;
                    case 11:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 186) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 12:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 156) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 174) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 180) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 186) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        break;
                    case 13:
                    case 14:
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 104) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 112) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 128) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 136) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 144) { synthesizer.synth.midiNoteOn(9, 41, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 41); }
                        if (rhT == 152) { synthesizer.synth.midiNoteOn(9, 41, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 41); }
                        if (rhT == 152) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 160) { synthesizer.synth.midiNoteOn(9, 41, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 41); }
                        if (rhT == 160) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 168) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 176) { synthesizer.synth.midiNoteOn(9, 42, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 42); }
                        if (rhT == 184) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 184) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        break;
                    case 15:
                    case 16:
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 72) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 84) { synthesizer.synth.midiNoteOn(9, 38, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 38); }
                        if (rhT == 96) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 108) { synthesizer.synth.midiNoteOn(9, 45, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 45); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        if (rhT == 120) { synthesizer.synth.midiNoteOn(9, 46, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 46); }
                        if (rhT == 132) { synthesizer.synth.midiNoteOn(9, 36, Rhyrhm[1]); synthesizer.synth.midiNoteOff(9, 36); }
                        break;
                }
                if (rh <= 14 && rhT == 187) fil = 0;
                if (rh >= 15 && rhT == 139) fil = 0;
            }
          }
          if(Mout.checked&&MoutOn==1){
            if (fil==3) {
                if (rh >= 15) {
                    if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 31, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 31, '0']); }
                    if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 31, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 31, '0']); }
                    if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 31, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 31, '0']); }
                    if (rhT >= 141) fil = 0;
                } else {
                    if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 31, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 31, '0']); }
                    if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 31, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 31, '0']); }
                    if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 31, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 31, '0']); }
                    if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 31, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 31, '0']); }
                    if (rhT >= 189) fil = 0;
                }
            }
            if (fil==0) switch(rh){
                    case 1:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        break;
                    case 2:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        break;
                    case 3:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 138) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 150) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        break;
                    case 4:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 6) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 18) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 30) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 42) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 54) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 66) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 78) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 90) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 102) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 126) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 138) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 150) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 174) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 42) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 126) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 5:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 40) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 88) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 136) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 152) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 160) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 176) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 184) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 6:
                    case 14:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 40) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 88) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 136) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 184) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 7:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 6) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 18) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 30) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 42) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 54) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 66) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 78) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 90) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 102) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 126) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 138) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 150) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 162) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 174) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 186) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 18) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 66) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 162) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 30) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 42) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 54) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 66) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 78) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 126) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 138) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 150) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 162) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 174) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        break;
                    case 8:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 18) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 42) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 66) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 90) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 138) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 162) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 42) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 126) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 9:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        break;
                    case 10:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 18) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        break;
                    case 11:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 186) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 12:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 162) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 13:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 8) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 16) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 32) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 40) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 56) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 64) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 80) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 88) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 104) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 112) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 128) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 136) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 152) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 160) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 176) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 184) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 40) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 88) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 136) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 160) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 15:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 16:
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 12) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 30) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 36) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 102) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 0) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 60) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 24) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 48) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                }
            if (fil==1) {
                switch (rh) {
                    case 1:
                    case 2:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 102) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 126) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 150) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 174) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 186) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 162) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        break;
                    case 3:
                    case 8:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 138) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 174) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 102) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 4:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 102) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 126) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 138) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 150) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 162) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 174) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 186) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        break;
                    case 5:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 104) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 112) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 136) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 152) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 160) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 160) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 176) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 184) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 184) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        break;
                    case 6:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 104) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 112) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 128) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 136) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 152) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 160) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 184) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 112) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 128) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 184) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        break;
                    case 7:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 102) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 138) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 150) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 162) { midi.output[MoutS.selectedIndex].send(['0x99', 63, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 63, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 174) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 186) { midi.output[MoutS.selectedIndex].send(['0x99', 64, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 64, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 138) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 150) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 162) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 174) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 186) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        break;
                    case 9:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 126) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 37, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 37, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        break;
                    case 10:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 114) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 41, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 41, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 41, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 41, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        break;
                    case 11:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 186) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 12:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 156) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 174) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 180) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 186) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        break;
                    case 13:
                    case 14:
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 104) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 112) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 128) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 136) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 144) { midi.output[MoutS.selectedIndex].send(['0x99', 41, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 41, '0']); }
                        if (rhT == 152) { midi.output[MoutS.selectedIndex].send(['0x99', 41, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 41, '0']); }
                        if (rhT == 152) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 160) { midi.output[MoutS.selectedIndex].send(['0x99', 41, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 41, '0']); }
                        if (rhT == 160) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 168) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 176) { midi.output[MoutS.selectedIndex].send(['0x99', 42, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 42, '0']); }
                        if (rhT == 184) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 184) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        break;
                    case 15:
                    case 16:
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 72) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 84) { midi.output[MoutS.selectedIndex].send(['0x99', 38, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 38, '0']); }
                        if (rhT == 96) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 108) { midi.output[MoutS.selectedIndex].send(['0x99', 45, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 45, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        if (rhT == 120) { midi.output[MoutS.selectedIndex].send(['0x99', 46, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 46, '0']); }
                        if (rhT == 132) { midi.output[MoutS.selectedIndex].send(['0x99', 36, Rhyrhm[1]]); midi.output[MoutS.selectedIndex].send(['0x89', 36, '0']); }
                        break;
                }
                if (rh <= 14 && rhT == 187) fil = 0;
                if (rh >= 15 && rhT == 139) fil = 0;
            }
          }
          
        }
        if(lightup.checked && light1>=1){
          var ba = ".timebox:contains(\t"+ w +"\t)";
          var bc = ".timebox:contains(\t"+ (w-late) +"\t)";
          $(ba).css("background-color", "#FFDBC9");
          $(bc).css("background-color", "#FFDBC9");
          light1=0;
        }


        rhT++;
        if (rh <= 14 && rhT >= 192) rhT = 0;
        if (rh >= 15 && rhT >= 144) rhT = 0;
        l1++;
        l2++;
        l3++;
        w++;
	}, (60 / tempo * 1000)/24);
  j++;
}





function stop0() {
  stop1();
  w=0, rh=0, rhT=0, fil=0, x0=0, y0=0, z0=0, tm=0;
}
function stop1() {
  clearInterval(pl);
  var timebox = document.getElementsByClassName('timebox');
  for(let l=0; l<timebox.length; l++) timebox[l].style.backgroundColor = "#eee";
  for(let f=0; f<110; f++){
    if(Sout.checked){
      synthesizer.synth.midiNoteOff(0, f);
      synthesizer.synth.midiNoteOff(1, f);
      synthesizer.synth.midiNoteOff(2, f);
      synthesizer.synth.midiNoteOff(9, f);
    }
    if(MoutOn==1){
      midi.output[MoutS.selectedIndex].send(['0x82', f, '0']);
      midi.output[MoutS.selectedIndex].send(['0x83', f, '0']);
      midi.output[MoutS.selectedIndex].send(['0x84', f, '0']);
      midi.output[MoutS.selectedIndex].send(['0x85', f, '0']);
      midi.output[MoutS.selectedIndex].send(['0x89', f, '0']);
    }
  }
}

Sout.addEventListener('change', function(){
  if(Sout.checked){ }
  else{
    for(let f=0; f<110; f++){
      synthesizer.synth.midiNoteOff(0, f);
      synthesizer.synth.midiNoteOff(1, f);
      synthesizer.synth.midiNoteOff(2, f);
      synthesizer.synth.midiNoteOff(9, f);
    }
  }
  jsave();
});
Mout.addEventListener('change', function(){
  if(MoutOn==1){
    if(Mout.checked){ }
    else{
      for(let f=0; f<110; f++){
        midi.output[MoutS.selectedIndex].send(['0x82', f, '0']);
        midi.output[MoutS.selectedIndex].send(['0x83', f, '0']);
        midi.output[MoutS.selectedIndex].send(['0x84', f, '0']);
        midi.output[MoutS.selectedIndex].send(['0x85', f, '0']);
        midi.output[MoutS.selectedIndex].send(['0x89', f, '0']);
      }
    }
  }
  jsave();
});
