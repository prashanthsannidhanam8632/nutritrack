// ScannerScreen.jsx — NutriTrack Screen
import { useState, useRef } from 'react';
import { DISHES } from '../data/dishes';
import { INGREDIENTS } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import { MEALS, MEAL_ICONS, GOAL_PRESETS, COLORS as C } from '../data/constants';
import { MacroRow, QuantityModal } from '../components';

export function ScannerScreen({log,setLog,meal}){
  const [mode,setMode]=useState("menu"); // menu | requesting | granted | denied | scanning | result
  const [scanType,setScanType]=useState(null);
  const [result,setResult]=useState(null);
  const [manual,setManual]=useState("");
  const [modal,setModal]=useState(null);
  const [stream,setStream]=useState(null);
  const [scanning,setScanning]=useState(false);
  const vRef=useRef(null);

  function stopCamera(s){
    const st=s||stream;
    if(st){st.getTracks().forEach(t=>t.stop());setStream(null);}
  }

  async function requestCamera(type){
    setScanType(type);
    setMode("requesting");
    try{
      const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:false});
      setStream(s);
      setMode("granted");
      setTimeout(()=>{
        if(vRef.current){vRef.current.srcObject=s;vRef.current.play().catch(()=>{});}
      },100);
    }catch(err){
      if(err.name==="NotAllowedError"||err.name==="PermissionDeniedError"){
        setMode("denied");
      } else if(err.name==="NotFoundError"){
        setMode("nocamera");
      } else {
        setMode("denied");
      }
    }
  }

  function doScan(){
    setScanning(true);
    setTimeout(()=>{
      setScanning(false);
      stopCamera(stream);
      const mockResults={
        camera:[
          {name:"Butter Chicken",cal:320,p:26,f:18,c:12,fi:1,na:590,srv:"1 cup"},
          {name:"Chicken Biryani",cal:370,p:27,f:13,c:38,fi:2,na:610,srv:"1 cup"},
          {name:"Scrambled Eggs",cal:148,p:10,f:11,c:2,fi:0,na:160,srv:"2 eggs"},
        ],
        barcode:[
          {name:"Protein Bar",cal:210,p:21,f:7,c:22,fi:4,na:190,srv:"1 bar"},
          {name:"Oats Rolled",cal:389,p:17,f:7,c:66,fi:10,na:2,srv:"100g dry"},
          {name:"Whole Milk",cal:149,p:8,f:8,c:12,fi:0,na:105,srv:"1 cup"},
        ],
        label:[
          {name:"Greek Yogurt",cal:100,p:17,f:0,c:6,fi:0,na:65,srv:"100g"},
          {name:"Bagel Plain",cal:270,p:10,f:1,c:53,fi:2,na:450,srv:"1 bagel"},
          {name:"Granola",cal:471,p:10,f:21,c:64,fi:5,na:30,srv:"1/2 cup"},
        ],
      };
      const opts=mockResults[scanType]||mockResults.camera;
      setResult(opts[Math.floor(Math.random()*opts.length)]);
      setMode("result");
    },2200);
  }

  function resetScanner(){
    stopCamera(stream);
    setMode("menu");
    setScanType(null);
    setResult(null);
    setScanning(false);
  }

  function openAddModal(r){
    setModal({name:r.name,d:{cal:r.cal,p:r.p,f:r.f,c:r.c,fi:r.fi,na:r.na,srv:r.srv},isIng:true});
  }
  function handleAdd(scaledN,qty){
    if(!modal)return;
    setLog(p=>[...p,{id:Date.now()+Math.random(),meal,name:modal.name,srv:qty===1?modal.d.srv:`${qty}x ${modal.d.srv}`,veg:null,n:scaledN}]);
    setModal(null);resetScanner();
  }

  const SCAN_ITEMS=[
    {ic:"📷",title:"Scan Food / Plate",sub:"Take a photo of your meal to identify it",key:"camera",color:C.accent},
    {ic:"🔢",title:"Scan Barcode",sub:"Scan any packaged product barcode",key:"barcode",color:C.blue},
    {ic:"🏷️",title:"Scan Nutrition Label",sub:"Point at nutrition facts label to extract data",key:"label",color:C.green},
  ];
  const curScan=SCAN_ITEMS.find(s=>s.key===scanType);

  return(
    <div style={{padding:"16px"}}>
      {modal&&<QtyModal item={modal} onAdd={handleAdd} onClose={()=>setModal(null)}/>}
      <div style={{fontSize:18,fontWeight:800,marginBottom:4}}>📸 Scanner</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:16}}>Scan food, barcode, or nutrition label</div>

      {/* ── MENU ── */}
      {mode==="menu"&&<>
        {SCAN_ITEMS.map(item=>(
          <div key={item.key} onClick={()=>requestCamera(item.key)}
            style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:"18px 16px",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"border-color .2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=item.color}
            onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            <div style={{width:52,height:52,borderRadius:14,background:item.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{item.ic}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:C.text}}>{item.title}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:3}}>{item.sub}</div>
            </div>
            <div style={{color:C.muted,fontSize:18}}>›</div>
          </div>
        ))}
        <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:16,marginTop:6}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>🔍 Manual Lookup</div>
          <div style={{display:"flex",gap:8}}>
            <input value={manual} onChange={e=>setManual(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"){const q=manual.toLowerCase();const match=Object.entries(DISHES).find(([n])=>n.toLowerCase().includes(q))||Object.entries(INGREDIENTS).find(([n])=>n.toLowerCase().includes(q));if(match){const[name,d]=match;setResult({name,...d});setMode("result");}else alert("Not found. Try another name.");}}}
              placeholder="e.g. Bagel, Pizza, Ramen..."
              style={{flex:1,background:C.card2,border:"1px solid "+C.border,borderRadius:9,padding:"9px 12px",color:C.text,fontSize:12,outline:"none"}}/>
            <button onClick={()=>{
              const q=manual.toLowerCase();
              const match=Object.entries(DISHES).find(([n])=>n.toLowerCase().includes(q))||Object.entries(INGREDIENTS).find(([n])=>n.toLowerCase().includes(q));
              if(match){const[name,d]=match;setResult({name,...d});setMode("result");}
              else alert("Not found. Try another name.");
            }} style={{background:C.accent,border:"none",borderRadius:9,padding:"9px 14px",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>Search</button>
          </div>
        </div>
      </>}

      {/* ── REQUESTING PERMISSION ── */}
      {mode==="requesting"&&(
        <div style={{textAlign:"center",padding:"48px 16px"}}>
          <div style={{fontSize:52,marginBottom:16}}>📷</div>
          <div style={{fontSize:16,fontWeight:800,marginBottom:8}}>Requesting Camera Access</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:24,lineHeight:1.6}}>
            A permission prompt will appear.<br/>Please tap <strong style={{color:C.green}}>Allow</strong> to enable scanning.
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:24}}>
            {[0,1,2].map(i=>(
              <div key={i} style={{width:8,height:8,borderRadius:4,background:C.accent,
                animation:"dotpulse 1s ease-in-out infinite",
                animationDelay:`${i*0.3}s`,opacity:0.8}}/>
            ))}
          </div>
          <style>{`@keyframes dotpulse{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.5);opacity:1}}`}</style>
          <button onClick={resetScanner} style={{background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:"10px 24px",color:C.ml,fontWeight:600,fontSize:12,cursor:"pointer"}}>Cancel</button>
        </div>
      )}

      {/* ── CAMERA LIVE VIEW ── */}
      {mode==="granted"&&(
        <div>
          <div style={{position:"relative",borderRadius:16,overflow:"hidden",background:"#000",marginBottom:12,border:"2px solid "+(curScan?curScan.color:C.accent)+"88"}}>
            <video ref={vRef} autoPlay playsInline muted style={{width:"100%",display:"block",maxHeight:320,objectFit:"cover"}}/>
            {/* Scan overlay */}
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
              <div style={{width:200,height:200,border:"2px solid "+(curScan?curScan.color:"#fff"),borderRadius:16,boxShadow:"0 0 0 9999px rgba(0,0,0,0.45)"}}>
                {/* Corner markers */}
                {[["0 auto auto 0","top left"],["0 0 auto auto","top right"],["auto auto 0 0","bottom left"],["auto 0 0 auto","bottom right"]].map(([inset,label])=>(
                  <div key={label} style={{position:"absolute",width:20,height:20,borderColor:curScan?curScan.color:"#fff",borderStyle:"solid",borderWidth:0,
                    ...(label.includes("top")&&label.includes("left")?{borderTopWidth:3,borderLeftWidth:3,top:-1,left:-1,borderRadius:"4px 0 0 0"}:{}),
                    ...(label.includes("top")&&label.includes("right")?{borderTopWidth:3,borderRightWidth:3,top:-1,right:-1,borderRadius:"0 4px 0 0"}:{}),
                    ...(label.includes("bottom")&&label.includes("left")?{borderBottomWidth:3,borderLeftWidth:3,bottom:-1,left:-1,borderRadius:"0 0 0 4px"}:{}),
                    ...(label.includes("bottom")&&label.includes("right")?{borderBottomWidth:3,borderRightWidth:3,bottom:-1,right:-1,borderRadius:"0 0 4px 0"}:{})
                  }}/>
                ))}
                {/* Scan line animation */}
                <div style={{position:"absolute",left:4,right:4,height:2,background:curScan?curScan.color:"#fff",opacity:0.8,top:"50%",animation:"scanline 2s ease-in-out infinite"}}/>
                <style>{`@keyframes scanline{0%{top:10%}50%{top:90%}100%{top:10%}}`}</style>
              </div>
            </div>
            {scanning&&(
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
                <div style={{fontSize:32}}>⚡</div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>Analyzing...</div>
                <div style={{fontSize:11,color:C.ml}}>Identifying nutrition data</div>
              </div>
            )}
          </div>

          <div style={{textAlign:"center",marginBottom:12}}>
            <div style={{fontSize:12,color:C.muted,marginBottom:4}}>
              {curScan&&<span style={{color:curScan.color,fontWeight:700}}>{curScan.ic} {curScan.title}</span>}
            </div>
            <div style={{fontSize:11,color:C.muted}}>
              {scanType==="barcode"?"Align the barcode within the frame":
               scanType==="label"?"Point at the nutrition facts label":
               "Position your food within the frame"}
            </div>
          </div>

          <button onClick={doScan} disabled={scanning}
            style={{width:"100%",background:scanning?"#333":`linear-gradient(135deg,${curScan?curScan.color:C.accent},${C.yellow})`,border:"none",borderRadius:12,padding:14,color:"#fff",fontWeight:800,fontSize:15,cursor:scanning?"not-allowed":"pointer",marginBottom:8,opacity:scanning?0.7:1}}>
            {scanning?"⚡ Scanning...":"📸 Capture & Scan"}
          </button>
          <button onClick={resetScanner} style={{width:"100%",background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:10,color:C.ml,fontWeight:600,fontSize:12,cursor:"pointer"}}>✕ Cancel</button>
        </div>
      )}

      {/* ── PERMISSION DENIED ── */}
      {(mode==="denied"||mode==="nocamera")&&(
        <div style={{textAlign:"center",padding:"32px 16px"}}>
          <div style={{fontSize:52,marginBottom:16}}>{mode==="nocamera"?"📵":"🚫"}</div>
          <div style={{fontSize:16,fontWeight:800,color:C.red,marginBottom:8}}>
            {mode==="nocamera"?"No Camera Found":"Camera Access Denied"}
          </div>
          <div style={{fontSize:13,color:C.muted,lineHeight:1.7,marginBottom:20}}>
            {mode==="nocamera"
              ?"No camera was detected on this device. Please use a device with a camera to scan food."
              :"Camera permission was denied. To enable scanning, please allow camera access in your browser settings."}
          </div>
          {mode==="denied"&&(
            <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:12,padding:14,marginBottom:16,textAlign:"left"}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:8,color:C.yellow}}>How to enable camera:</div>
              {[
                "Tap the 🔒 lock icon in your browser address bar",
                "Find Camera permission and set it to Allow",
                "Refresh the page and try again",
              ].map((s,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                  <div style={{width:20,height:20,borderRadius:10,background:C.accent+"22",border:"1px solid "+C.accent+"44",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.accent}}>{i+1}</div>
                  <div style={{fontSize:12,color:C.ml,lineHeight:1.5}}>{s}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{display:"flex",gap:8}}>
            <button onClick={resetScanner} style={{flex:1,background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:11,color:C.ml,fontWeight:600,fontSize:12,cursor:"pointer"}}>← Back</button>
            {mode==="denied"&&<button onClick={()=>requestCamera(scanType)} style={{flex:2,background:C.accent,border:"none",borderRadius:10,padding:11,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>Try Again</button>}
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {mode==="result"&&result&&(
        <div>
          <div style={{background:C.card,border:"2px solid "+C.green+"55",borderRadius:16,padding:16,marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:32,height:32,borderRadius:10,background:C.green+"22",border:"1px solid "+C.green+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>✓</div>
              <div>
                <div style={{fontSize:11,color:C.green,fontWeight:700}}>SCAN SUCCESSFUL</div>
                <div style={{fontSize:10,color:C.muted}}>via {curScan?curScan.title:"Scanner"}</div>
              </div>
            </div>
            <div style={{fontSize:17,fontWeight:800,color:C.text,marginBottom:2}}>{result.name}</div>
            <div style={{fontSize:11,color:C.muted,marginBottom:12}}>{result.srv}</div>
            <MacroRow cal={result.cal} p={result.p} f={result.f} c={result.c} fi={result.fi}/>
            <div style={{fontSize:10,color:C.muted,marginTop:6}}>🧂 Sodium: {result.na}mg</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={resetScanner} style={{flex:1,background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:11,color:C.ml,fontWeight:700,fontSize:12,cursor:"pointer"}}>← Scan Again</button>
            <button onClick={()=>openAddModal(result)} style={{flex:2,background:`linear-gradient(135deg,${C.accent},${C.yellow})`,border:"none",borderRadius:10,padding:11,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>
              Set Qty + Add to {meal}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RECIPES SCREEN ──────────────────────────────────────────────────────────
