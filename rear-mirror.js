/* Rear view uses the existing WebGL context and a horizontally reflected texture. */
function mirrorViewPose(x,n,y,heading,length,heavy){
 const sx=Math.sin(heading),cz=Math.cos(heading),offset=Math.max(1,length*.5+.25),eye=heavy?3.5:1.65;
 return{x:x-sx*offset,y:y+eye,z:-n+cz*offset,lookX:x-sx*(offset+60),lookY:y+eye-.6,lookZ:-n+cz*(offset+60)};
}
(function(){
 'use strict';
 const stage=document.getElementById('stage'),frame=document.createElement('div');frame.id='rear-mirror';frame.className='rear-mirror';frame.setAttribute('role','group');frame.setAttribute('aria-label','Retrovisor central: vista en directo de la carretera y el tráfico detrás del vehículo');
 const view=document.createElement('div');view.className='rear-mirror-view';frame.append(view);stage.append(frame);
 const camera=new THREE.PerspectiveCamera(32,4,.35,9500),screen=new THREE.Scene(),screenCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),material=new THREE.MeshBasicMaterial({toneMapped:false,depthTest:false,depthWrite:false,fog:false});
 const geometry=new THREE.PlaneGeometry(2,2),uv=geometry.attributes.uv;for(let i=0;i<uv.count;i++)uv.setX(i,1-uv.getX(i));screen.add(new THREE.Mesh(geometry,material));
 const viewport=new THREE.Vector4(),scissor=new THREE.Vector4();let enabled=LS.get('n640mirror',true)!==false,target=null,frames=0;
 function sync(){document.body.classList.toggle('mirror-enabled',enabled);frame.hidden=!enabled;document.querySelectorAll('[data-mirror-toggle]').forEach(input=>input.checked=enabled)}
 function setEnabled(value){enabled=!!value;LS.set('n640mirror',enabled);if(!enabled&&target){target.dispose();target=null;material.map=null}sync()}
 document.querySelectorAll('[data-mirror-toggle]').forEach(input=>input.addEventListener('change',()=>setEnabled(input.checked)));sync();
 function draw(){
  if(!enabled||state==='menu')return;
  const rect=view.getBoundingClientRect(),stageRect=R.domElement.getBoundingClientRect();if(rect.width<1||rect.height<1||stageRect.width<1||stageRect.height<1)return;
  const width=Math.max(1,Math.min(768,Math.round(rect.width*R.getPixelRatio()))),height=Math.max(1,Math.round(width*rect.height/rect.width));
  if(!target){target=new THREE.WebGLRenderTarget(width,height,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,depthBuffer:true,stencilBuffer:false});target.texture.generateMipmaps=false;material.map=target.texture;material.needsUpdate=true}else if(target.width!==width||target.height!==height)target.setSize(width,height);
  const pose=mirrorViewPose(wx,wn,carY,wh,VL,VEH==='truck'||VEH==='bus');camera.position.set(pose.x,pose.y,pose.z);camera.lookAt(pose.lookX,pose.lookY,pose.lookZ);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();
  const originalTarget=R.getRenderTarget(),originalScissorTest=R.getScissorTest(),originalShadowUpdate=R.shadowMap.autoUpdate,visible=plr.visible;R.getViewport(viewport);R.getScissor(scissor);
  try{
   plr.visible=false;R.shadowMap.autoUpdate=false;updateSceneryVisibility(camera);R.setScissorTest(false);R.setRenderTarget(target);R.render(SC,camera);
   R.setRenderTarget(originalTarget);const size=R.getSize(new THREE.Vector2()),scaleX=size.x/stageRect.width,scaleY=size.y/stageRect.height,x=(rect.left-stageRect.left)*scaleX,y=(stageRect.bottom-rect.bottom)*scaleY,w=rect.width*scaleX,h=rect.height*scaleY;
   R.setViewport(x,y,w,h);R.setScissor(x,y,w,h);R.setScissorTest(true);R.render(screen,screenCamera);frames++;
   stage.style.setProperty('--rear-mirror-bottom',(rect.bottom-stageRect.top+18)+'px');
  }finally{
   plr.visible=visible;R.shadowMap.autoUpdate=originalShadowUpdate;R.setRenderTarget(originalTarget);R.setViewport(viewport);R.setScissor(scissor);R.setScissorTest(originalScissorTest);updateSceneryVisibility(CAM);
  }
 }
 window.ArcadeMirror={draw,setEnabled,toggle:()=>setEnabled(!enabled),camera,getState:()=>({enabled,frames,resolution:target?[target.width,target.height]:null,position:camera.position.toArray()}),get target(){return target}};
})();
