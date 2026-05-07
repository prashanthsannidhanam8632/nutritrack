// RecipesScreen.jsx — NutriTrack Screen
import { useState, useRef } from 'react';
import { DISHES } from '../data/dishes';
import { INGREDIENTS } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import { MEALS, MEAL_ICONS, GOAL_PRESETS, COLORS as C } from '../data/constants';
import { MacroRow, QuantityModal } from '../components';

export function RecipesScreen({onCook}){
  const [cat,setCat]=useState("All");
  const [veg,setVeg]=useState("all");
  const [srch,setSrch]=useState("");
  const DIFF_C={Easy:C.green,Medium:C.yellow,Hard:C.red};

  const filtered=Object.entries(RECIPES).filter(([n,r])=>{
    if(cat!=="All"&&r.cat!==cat)return false;
    if(veg==="veg"&&!r.veg)return false;
    if(veg==="nonveg"&&r.veg)return false;
    if(srch&&!n.toLowerCase().includes(srch.toLowerCase()))return false;
    return true;
  });

  return(
    <div style={{padding:"16px"}}>
      <div style={{fontSize:18,fontWeight:800,marginBottom:4}}>👨‍🍳 Recipes</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:14}}>Tap any recipe for step-by-step cooking guide with full ingredient macros.</div>
      <input value={srch} onChange={e=>setSrch(e.target.value)} placeholder="Search recipes..."
        style={{width:"100%",background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:"9px 12px",color:C.text,fontSize:12,outline:"none",marginBottom:8}}/>
      <div style={{display:"flex",gap:3,overflowX:"auto",marginBottom:6}}>
        {RCP_CATS.map(c=>(<button key={c} onClick={()=>setCat(c)} style={{whiteSpace:"nowrap",padding:"4px 10px",borderRadius:10,border:"none",fontSize:10,cursor:"pointer",fontWeight:600,background:cat===c?C.accent+"33":C.card,color:cat===c?C.accent:C.muted}}>{c}</button>))}
      </div>
      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {[["all","All"],["veg","Veg"],["nonveg","Non-Veg"]].map(([v,l])=>(
          <button key={v} onClick={()=>setVeg(v)} style={{padding:"4px 10px",borderRadius:10,border:"none",fontSize:10,cursor:"pointer",fontWeight:600,background:veg===v?C.accent+"33":C.card,color:veg===v?C.accent:C.muted}}>{l}</button>
        ))}
      </div>
      {filtered.map(([name,r])=>(
        <div key={name} onClick={()=>onCook(name)}
          style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:"14px 14px",marginBottom:10,cursor:"pointer",transition:"border-color .2s"}}
          onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent+"77"}
          onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
            <div style={{flex:1,marginRight:8}}>
              <div style={{fontSize:14,fontWeight:800,color:C.text}}>{name}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{r.desc}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:20,fontWeight:800,color:C.accent}}>{r.cal}</div>
              <div style={{fontSize:8,color:C.muted}}>kcal/srv</div>
            </div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:10,color:DIFF_C[r.diff],fontWeight:700,background:DIFF_C[r.diff]+"18",padding:"2px 8px",borderRadius:6}}>{r.diff}</span>
            <span style={{fontSize:10,color:C.muted}}>⏱ {r.time}</span>
            <span style={{fontSize:10,color:C.muted}}>👥 Serves {r.serves}</span>
            <span style={{fontSize:10}}>{r.veg?"🟢":"🔴"}</span>
            <span style={{marginLeft:"auto",fontSize:11,color:C.accent,fontWeight:700}}>View →</span>
          </div>
          <div style={{display:"flex",gap:6,marginTop:8}}>
            {[["P",r.p,C.blue],["C",r.c,C.green],["F",r.f,C.purple],["Fi",r.fi,"#86efac"]].map(([l,v,cl])=>(<span key={l} style={{fontSize:10,color:cl,fontWeight:600}}>{l}:{v}g</span>))}
            <span style={{fontSize:10,color:C.muted,marginLeft:4}}>per serving</span>
          </div>
        </div>
      ))}
      {filtered.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:C.muted,fontSize:13}}>No recipes found.</div>}
    </div>
  );
}

// ─── COOK SCREEN ─────────────────────────────────────────────────────────────
