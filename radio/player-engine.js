/* Live-radio player adapted from the supplied Radio España application. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CochesRadioPlayer=api})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const validURL=value=>{try{return new URL(value).protocol==='https:'}catch{return false}};
 class RadioPlayer{
  constructor(options){this.createAudio=options.createAudio;this.Hls=options.Hls;this.onChange=options.onChange||(()=>{});this.delay=options.timeout||20000;this.clock=options.clock||{set:(fn,delay)=>setTimeout(fn,delay),clear:id=>clearTimeout(id)};this.volume=.5;this.station=null;this.audio=null;this.hls=null;this.generation=0;this.timer=null;this.wanted=false;this.playing=false;this.index=0;this.status='Radio apagada';this.destroyed=false}
  snapshot(){return{station:this.station,wanted:this.wanted,playing:this.playing,volume:this.volume,status:this.status,index:this.index}}
  notify(status){if(status)this.status=status;this.onChange(this.snapshot())}
  clearTimer(){if(this.timer!==null){this.clock.clear(this.timer);this.timer=null}}
  stopSource(){++this.generation;this.clearTimer();if(this.hls){this.hls.destroy();this.hls=null}if(this.audio){this.audio.pause();this.audio.removeAttribute('src');this.audio.load()}this.playing=false}
  setVolume(value){const number=Number(value);this.volume=Number.isFinite(number)?Math.max(0,Math.min(1,number)):.5;if(this.audio)this.audio.volume=this.volume*this.volume;this.notify()}
  tune(station){if(this.destroyed)return;if(!station){this.off();return}this.station=station;this.index=0;this.wanted=true;this.load()}
  off(){this.wanted=false;this.stopSource();this.notify('Radio apagada')}
  retry(){if(this.station&&!this.destroyed){this.index=0;this.wanted=true;this.load()}}
  load(){
   this.stopSource();const station=this.station;if(!station||!this.wanted||this.destroyed)return;const urls=[...new Set([station.u,...(station.a||[])])],url=urls[this.index],generation=this.generation,audio=this.createAudio();this.audio=audio;audio.preload='none';audio.volume=this.volume*this.volume;let handled=false;
   const current=()=>generation===this.generation&&this.wanted&&!this.destroyed;
   const bad=reason=>{if(!current()||handled)return;handled=true;if(this.index+1<urls.length){this.index++;this.load()}else{this.wanted=false;this.stopSource();this.notify(reason+' · pulsa para reintentar')}};
   const arm=()=>{this.clearTimer();this.timer=this.clock.set(()=>bad('La emisora no responde'),this.delay)};
   const play=()=>{if(!current())return;let result;try{result=audio.play()}catch(error){bad('No se pudo reproducir la emisora');return}Promise.resolve(result).catch(error=>{if(!current()||error.name==='AbortError')return;if(error.name==='NotAllowedError'){this.wanted=false;this.stopSource();this.notify('Pulsar reproducir para permitir el audio')}else bad('No se pudo reproducir la emisora')})};
   audio.addEventListener('playing',()=>{if(!current())return;this.playing=true;this.clearTimer();this.notify('En directo')});
   for(const event of ['waiting','stalled'])audio.addEventListener(event,()=>{if(!current())return;this.playing=false;this.notify('Recuperando conexión…');if(this.timer===null)arm()});
   audio.addEventListener('error',()=>bad('No se pudo conectar'));audio.addEventListener('ended',()=>bad('Emisión interrumpida'));
   audio.addEventListener('pause',()=>{if(!current()||handled||audio.ended||audio.error)return;this.wanted=false;this.stopSource();this.notify('Radio en pausa')});
   this.notify(this.index?'Probando conexión alternativa…':'Conectando…');arm();if(!validURL(url)){bad('Dirección de emisora no válida');return}
   if(/\.m3u8(?:[?#]|$)/i.test(url)){
    const Hls=this.Hls;if(Hls&&Hls.isSupported()){const engine=new Hls({manifestLoadingTimeOut:12000,levelLoadingTimeOut:12000,fragLoadingTimeOut:15000});this.hls=engine;engine.on(Hls.Events.ERROR,(_,data)=>{if(data.fatal)bad('No se pudo cargar la emisión HLS')});engine.on(Hls.Events.MEDIA_ATTACHED,()=>{if(current())engine.loadSource(url)});engine.on(Hls.Events.MANIFEST_PARSED,play);engine.attachMedia(audio)}
    else if(audio.canPlayType('application/vnd.apple.mpegurl')){audio.src=url;play()}else bad('Este navegador no admite la emisión HLS')
   }else{audio.src=url;play()}
  }
  destroy(){this.wanted=false;this.destroyed=true;this.stopSource()}
 }
 return{RadioPlayer,validURL}
});
