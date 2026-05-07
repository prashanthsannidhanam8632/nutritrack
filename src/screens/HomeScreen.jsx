// HomeScreen.jsx — NutriTrack Screen
import { useState, useRef } from 'react';
import { DISHES } from '../data/dishes';
import { INGREDIENTS } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import { MEALS, MEAL_ICONS as MEAL_IC, GOAL_PRESETS, COLORS as C } from '../data/constants';
import { MacroRow, MacroProgressBar, QuantityModal } from '../components';
import { DISHES } from '../data/dishes';
import { INGREDIENTS } from '../data/ingredients';

const DISH_CATS = ['All', ...new Set(Object.values(DISHES).map(d => d.cat))];
const ING_CATS  = ['All', ...new Set(Object.values(INGREDIENTS).map(d => d.cat))];

export function HomeScreen({log,setLog,goals,setGoals,meal,setMeal}){
  const [view,setView]=useState("log");
  const [addMode,setAddMode]=useState("dishes");
  const [dCat,setDCat]=useState("All");
  const [iCat,setICat]=useState("All");
  const [veg,setVeg]=useState("all");
  const [srch,setSrch]=useState("");
  const [exp,setExp]=useState(null);
  const [modal,setModal]=useState(null); // {name,d,isIng}

  const T=log.reduce((a,i)=>({cal:a.cal+i.n.cal,p:a.p+i.n.p,c:a.c+i.n.c,f:a.f+i.n.f,fi:a.fi+i.n.fi,na:a.na+i.n.na}),{cal:0,p:0,c:0,f:0,fi:0,na:0});
  const byMeal=MEALS.reduce((a,m)=>({...a,[m]:log.filter(i=>i.meal===m)}),{});
  const calPct=goals.cal>0?Math.min(T.cal/goals.cal*100,100):0;

  const fDishes=Object.entries(DISHES).filter(([n,d])=>{
    if(dCat!=="All"&&d.cat!==dCat)return false;
    if(veg==="veg"&&!d.veg)return false;
    if(veg==="nonveg"&&d.veg)return false;
    if(srch&&!n.toLowerCase().includes(srch.toLowerCase()))return false;
    return true;
  });
  const fIngs=Object.entries(INGREDIENTS).filter(([n,d])=>{
    if(iCat!=="All"&&d.cat!==iCat)return false;
    if(srch&&!n.toLowerCase().includes(srch.toLowerCase()))return false;
    return true;
  });

  function openModal(name,d,isIng){setModal({name,d,isIng});}
  function handleAdd(scaledN,qty){
    if(!modal)return;
    setLog(p=>[...p,{
      id:Date.now()+Math.random(),meal,name:modal.name,
      srv:qty===1?modal.d.srv:`${qty}x ${modal.d.srv}`,
      veg:modal.isIng?null:modal.d.veg,
      n:scaledN
    }]);
    setModal(null);
    setView("log");
  }

  const GOAL_FIELDS=[
    {k:"cal",l:"Calories",ic:"🔥",u:"kcal",c:C.accent,step:50,min:500,max:6000},
    {k:"p",l:"Protein",ic:"💪",u:"g",c:C.blue,step:5,min:10,max:500},
    {k:"c",l:"Carbs",ic:"🌾",u:"g",c:C.green,step:5,min:10,max:800},
    {k:"f",l:"Fat",ic:"🫙",u:"g",c:C.purple,step:5,min:10,max:350},
    {k:"fi",l:"Fiber",ic:"🌿",u:"g",c:"#86efac",step:1,min:5,max:80},
    {k:"na",l:"Sodium limit",ic:"🧂",u:"mg",c:C.red,step:100,min:500,max:6000},
  ];

  return(
    <div>
      {modal&&<QtyModal item={modal} onAdd={handleAdd} onClose={()=>setModal(null)}/>}

      <div style={{background:"linear-gradient(135deg,#120500,#060810 60%)",padding:"14px 16px 12px",borderBottom:"1px solid "+C.border}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div>
            <div style={{fontSize:11,color:C.muted}}>TODAY</div>
            <div style={{fontSize:26,fontWeight:800,color:T.cal>goals.cal?C.red:C.accent,lineHeight:1,letterSpacing:"-1px"}}>
              {Math.round(T.cal)} <span style={{fontSize:12,color:C.muted,fontWeight:400}}>/ {goals.cal} kcal</span>
            </div>
          </div>
          <div style={{display:"flex",gap:6}}>
            {[["P",T.p,C.blue],["C",T.c,C.green],["F",T.f,C.purple]].map(([l,v,cl])=>(
              <div key={l} style={{textAlign:"center",background:C.card2,borderRadius:8,padding:"5px 8px",minWidth:42}}>
                <div style={{fontSize:13,fontWeight:800,color:cl}}>{Math.round(v)}</div>
                <div style={{fontSize:8,color:C.muted}}>{l}(g)</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{height:4,background:C.card2,borderRadius:2,marginBottom:8}}>
          <div style={{width:calPct+"%",height:"100%",borderRadius:2,transition:"width .5s",background:T.cal>goals.cal?C.red:`linear-gradient(90deg,${C.accent},${C.yellow})`}}/>
        </div>
        <div style={{display:"flex",gap:3,overflowX:"auto"}}>
          {MEALS.map(m=>(
            <button key={m} onClick={()=>setMeal(m)}
              style={{flex:1,padding:"5px 2px",borderRadius:8,border:"none",fontSize:9,cursor:"pointer",fontWeight:700,whiteSpace:"nowrap",minWidth:40,background:meal===m?C.accent:C.card,color:meal===m?"#fff":C.muted,transition:"all .15s"}}>
              {MEAL_IC[m]} {m.split("-")[0]}
            </button>
          ))}
        </div>
      </div>

      <div style={{display:"flex",borderBottom:"1px solid "+C.border,background:C.bg}}>
        {[["log","📋 Log"],["add","➕ Add"],["goals","🎯 Goals"],["summary","📊 Summary"]].map(([v,l])=>(
          <button key={v} onClick={()=>{setView(v);setSrch("");}}
            style={{flex:1,padding:"9px 0",fontSize:10,fontWeight:700,border:"none",background:"transparent",cursor:"pointer",color:view===v?C.accent:C.muted,borderBottom:view===v?"2px solid "+C.accent:"2px solid transparent"}}>
            {l}
          </button>
        ))}
      </div>

      <div style={{padding:"12px 16px"}}>
        {view==="log"&&(log.length===0
          ?<div style={{textAlign:"center",padding:"48px 0"}}>
            <div style={{fontSize:52}}>🍽️</div>
            <div style={{fontSize:16,fontWeight:700,marginTop:12}}>Nothing logged yet</div>
            <div style={{fontSize:12,color:C.muted,marginTop:4}}>Tap + Add to log your meals</div>
            <button onClick={()=>setView("add")} style={{marginTop:14,background:C.accent,color:"#fff",border:"none",borderRadius:10,padding:"10px 24px",fontWeight:700,fontSize:13,cursor:"pointer"}}>Add Food</button>
          </div>
          :<>
            {MEALS.map(m=>{
              const items=byMeal[m];
              if(!items.length)return null;
              const mCal=items.reduce((s,i)=>s+i.n.cal,0);
              return(
                <div key={m} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <span style={{fontSize:13,fontWeight:800,color:C.accent}}>{MEAL_IC[m]} {m}</span>
                    <span style={{fontSize:11,color:C.ml}}>{Math.round(mCal)} kcal</span>
                  </div>
                  {items.map(it=>{
                    const isE=exp===it.id;
                    return(
                      <div key={it.id} style={{background:C.card,border:"1px solid "+C.border,borderRadius:10,marginBottom:4,overflow:"hidden"}}>
                        <div style={{padding:"9px 11px",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setExp(isE?null:it.id)}>
                          <div style={{flex:1}}>
                            <div style={{fontSize:12,fontWeight:700,color:C.text}}>{it.name}{it.veg!==null&&<span style={{fontSize:9,marginLeft:4}}>{it.veg?"🟢":"🔴"}</span>}</div>
                            <div style={{fontSize:10,color:C.muted}}>{it.srv}</div>
                          </div>
                          <div style={{fontSize:15,fontWeight:800,color:C.accent}}>{it.n.cal}<span style={{fontSize:8,color:C.muted,fontWeight:400}}>kcal</span></div>
                          <button onClick={e=>{e.stopPropagation();setLog(p=>p.filter(i=>i.id!==it.id));}} style={{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:15,padding:"0 2px"}}>✕</button>
                        </div>
                        {isE&&<div style={{borderTop:"1px solid "+C.border,padding:"8px 12px"}}>
                          <MacroRow cal={it.n.cal} p={it.n.p} f={it.n.f} c={it.n.c} fi={it.n.fi}/>
                          <div style={{fontSize:10,color:C.muted,marginTop:4}}>Sodium: {it.n.na}mg</div>
                        </div>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <button onClick={()=>setLog([])} style={{width:"100%",background:C.card,color:C.red,border:"1px solid "+C.red+"33",borderRadius:9,padding:9,cursor:"pointer",fontSize:12,fontWeight:600}}>🗑️ Clear All</button>
          </>
        )}

        {view==="add"&&<>
          <div style={{display:"flex",background:C.card2,borderRadius:10,padding:3,marginBottom:10,gap:3}}>
            {[["dishes","🍽️ Dishes"],["ingredients","🥦 Ingredients"]].map(([m,l])=>(
              <button key={m} onClick={()=>{setAddMode(m);setSrch("");}}
                style={{flex:1,padding:"8px 0",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:addMode===m?C.accent:C.card2,color:addMode===m?"#fff":C.muted}}>
                {l}
              </button>
            ))}
          </div>
          <input value={srch} onChange={e=>setSrch(e.target.value)} placeholder={addMode==="dishes"?"Search dishes, bagel, pizza, ramen...":"Search ingredients..."}
            style={{width:"100%",background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:"9px 12px",color:C.text,fontSize:12,outline:"none",marginBottom:8}}/>
          <div style={{fontSize:10,color:C.muted,marginBottom:8}}>Tap any item to set quantity before logging</div>

          {addMode==="dishes"&&<>
            <div style={{display:"flex",gap:3,overflowX:"auto",marginBottom:6}}>
              {DISH_CATS.map(c=>(<button key={c} onClick={()=>setDCat(c)} style={{whiteSpace:"nowrap",padding:"4px 10px",borderRadius:10,border:"none",fontSize:10,cursor:"pointer",fontWeight:600,background:dCat===c?C.accent+"33":C.card,color:dCat===c?C.accent:C.muted}}>{c}</button>))}
            </div>
            <div style={{display:"flex",gap:4,marginBottom:8}}>
              {[["all","All"],["veg","🟢 Veg"],["nonveg","🔴 Non-Veg"]].map(([v,l])=>(
                <button key={v} onClick={()=>setVeg(v)} style={{padding:"4px 10px",borderRadius:10,border:"none",fontSize:10,cursor:"pointer",fontWeight:600,background:veg===v?C.accent+"33":C.card,color:veg===v?C.accent:C.muted}}>{l}</button>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
              {fDishes.slice(0,80).map(([name,d])=>(
                <div key={name} onClick={()=>openModal(name,d,false)}
                  style={{background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:"9px 10px",cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent+"88"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1,marginRight:4}}>
                      <div style={{fontSize:11,fontWeight:600,lineHeight:1.3,color:C.text}}>{name}</div>
                      <div style={{fontSize:9,color:C.muted,marginTop:1}}>{d.veg?"🟢":"🔴"} {d.cat}</div>
                      <div style={{fontSize:9,color:C.muted}}>{d.srv}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:15,fontWeight:800,color:C.accent}}>{d.cal}</div>
                      <div style={{fontSize:8,color:C.muted}}>kcal</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:5,marginTop:4}}>
                    {[["P",d.p,C.blue],["C",d.c,C.green],["F",d.f,C.purple]].map(([l,v,cl])=>(<span key={l} style={{fontSize:9,color:cl,fontWeight:600}}>{l}:{v}g</span>))}
                  </div>
                </div>
              ))}
            </div>
            {fDishes.length>80&&<div style={{textAlign:"center",padding:"8px 0",fontSize:11,color:C.muted}}>Showing 80 of {fDishes.length} items. Use search to narrow down.</div>}
          </>}

          {addMode==="ingredients"&&<>
            <div style={{display:"flex",gap:3,overflowX:"auto",marginBottom:10}}>
              {ING_CATS.map(c=>(<button key={c} onClick={()=>setICat(c)} style={{whiteSpace:"nowrap",padding:"4px 10px",borderRadius:10,border:"none",fontSize:10,cursor:"pointer",fontWeight:600,background:iCat===c?C.accent+"33":C.card,color:iCat===c?C.accent:C.muted}}>{c}</button>))}
            </div>
            {fIngs.map(([name,d])=>(
              <div key={name} onClick={()=>openModal(name,d,true)}
                style={{background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:"10px 12px",marginBottom:5,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent+"88"}
                onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.text}}>{name}</div>
                  <div style={{fontSize:10,color:C.muted,marginTop:1}}>{d.srv} · {d.cat}</div>
                  <div style={{display:"flex",gap:8,marginTop:3}}>
                    {[["P",d.p,C.blue],["C",d.c,C.green],["F",d.f,C.purple]].map(([l,v,cl])=>(<span key={l} style={{fontSize:9,color:cl,fontWeight:600}}>{l}:{v}g</span>))}
                  </div>
                </div>
                <div style={{textAlign:"right",marginLeft:10,flexShrink:0}}>
                  <div style={{fontSize:16,fontWeight:800,color:C.accent}}>{d.cal}</div>
                  <div style={{fontSize:8,color:C.muted}}>kcal</div>
                </div>
              </div>
            ))}
          </>}
        </>}

        {view==="goals"&&<>
          <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:14,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,marginBottom:10}}>Quick Presets</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {PRESETS.map(p=>(
                <button key={p.n} onClick={()=>setGoals({cal:p.cal,p:p.p,c:p.c,f:p.f,fi:p.fi,na:p.na})}
                  style={{background:C.card2,border:"1px solid "+C.border,borderRadius:10,padding:"10px 8px",cursor:"pointer",textAlign:"left"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                  <div style={{fontSize:12,fontWeight:700,color:C.text}}>{p.n}</div>
                  <div style={{fontSize:9,color:C.muted,marginTop:2}}>{p.cal}kcal · P:{p.p} C:{p.c} F:{p.f}g</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{background:C.card,border:"2px solid "+C.accent+"44",borderRadius:14,padding:14}}>
            <div style={{fontSize:13,fontWeight:800,marginBottom:12}}>Manual Entry</div>
            {GOAL_FIELDS.map(({k,l,ic,u,c,step,min,max})=>(
              <div key={k} style={{background:C.card2,borderRadius:12,padding:"10px 14px",marginBottom:8,border:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text}}>{ic} {l}</div>
                <div style={{display:"flex",alignItems:"center",background:C.bg,borderRadius:10,border:"2px solid "+c+"55",overflow:"hidden"}}>
                  <button onClick={()=>setGoals(g=>({...g,[k]:Math.max(min,g[k]-step)}))} style={{background:"transparent",border:"none",color:C.ml,cursor:"pointer",fontSize:18,padding:"5px 10px",lineHeight:1}}>−</button>
                  <input type="number" value={goals[k]} onChange={e=>{const v=parseInt(e.target.value);if(!isNaN(v))setGoals(g=>({...g,[k]:Math.max(min,Math.min(max,v))}));}}
                    style={{width:70,background:"transparent",border:"none",color:c,fontSize:17,fontWeight:800,outline:"none",textAlign:"center",padding:"5px 0"}}/>
                  <button onClick={()=>setGoals(g=>({...g,[k]:Math.min(max,g[k]+step)}))} style={{background:"transparent",border:"none",color:C.ml,cursor:"pointer",fontSize:18,padding:"5px 10px",lineHeight:1}}>+</button>
                  <span style={{fontSize:9,color:C.muted,paddingRight:8}}>{u}</span>
                </div>
              </div>
            ))}
          </div>
        </>}

        {view==="summary"&&<>
          <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:16,marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:800,marginBottom:12}}>Today vs Goals</div>
            <Bar label="Calories" cur={T.cal} goal={goals.cal} color={C.accent} unit=" kcal" icon="🔥"/>
            <Bar label="Protein"  cur={T.p}   goal={goals.p}   color={C.blue}             icon="💪"/>
            <Bar label="Carbs"    cur={T.c}   goal={goals.c}   color={C.green}            icon="🌾"/>
            <Bar label="Fat"      cur={T.f}   goal={goals.f}   color={C.purple}           icon="🫙"/>
            <Bar label="Fiber"    cur={T.fi}  goal={goals.fi}  color="#86efac"            icon="🌿"/>
            <Bar label="Sodium"   cur={T.na}  goal={goals.na}  color={C.red}  unit=" mg"  icon="🧂"/>
          </div>
          <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:14}}>
            <div style={{fontSize:13,fontWeight:800,marginBottom:8}}>By Meal</div>
            {MEALS.map(m=>{
              const items=byMeal[m];
              const mCal=items.reduce((s,i)=>s+i.n.cal,0);
              const pct=T.cal>0?Math.round(mCal/T.cal*100):0;
              return(<div key={m} style={{marginBottom:7}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}>
                  <span style={{color:C.ml}}>{MEAL_IC[m]} {m} ({items.length})</span>
                  <span style={{color:C.text}}>{Math.round(mCal)}kcal <span style={{color:C.muted}}>{pct}%</span></span>
                </div>
                <div style={{height:5,background:C.border,borderRadius:3}}>
                  <div style={{width:pct+"%",height:"100%",background:C.accent,borderRadius:3,transition:"width .4s"}}/>
                </div>
              </div>);
            })}
          </div>
        </>}
      </div>
    </div>
  );
}

// ─── SCANNER SCREEN ──────────────────────────────────────────────────────────
