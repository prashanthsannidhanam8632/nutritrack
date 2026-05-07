// CookScreen.jsx — NutriTrack Screen
import { useState, useRef } from 'react';
import { DISHES } from '../data/dishes';
import { INGREDIENTS } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import { MEALS, MEAL_ICONS, GOAL_PRESETS, COLORS as C } from '../data/constants';
import { MacroRow, MacroProgressBar, QuantityModal } from '../components';

export function CookScreen({recipeName,onBack,log,setLog,meal}){
  const recipe=RECIPES[recipeName];
  const [step,setStep]=useState(-1);
  const [done,setDone]=useState(new Set());
  const [modal,setModal]=useState(null);
  if(!recipe)return null;

  const DIFF_C={Easy:C.green,Medium:C.yellow,Hard:C.red};
  const totalIngCal=recipe.ingredients.reduce((s,i)=>s+i.cal,0);
  const totalIngP=recipe.ingredients.reduce((s,i)=>s+i.p,0);
  const totalIngF=recipe.ingredients.reduce((s,i)=>s+i.f,0);
  const totalIngC=recipe.ingredients.reduce((s,i)=>s+i.c,0);

  function handleLogAdd(scaledN,qty){
    setLog(p=>[...p,{id:Date.now()+Math.random(),meal,name:recipeName,srv:qty===1?"1 serving":`${qty} servings`,veg:recipe.veg,n:scaledN}]);
    setModal(null);onBack();
  }

  return(
    <div>
      {modal&&<QtyModal item={modal} onAdd={handleLogAdd} onClose={()=>setModal(null)}/>}
      <div style={{background:"linear-gradient(135deg,#150800,#060810 70%)",padding:"14px 16px",borderBottom:"1px solid "+C.border}}>
        <button onClick={onBack} style={{background:C.card2,border:"1px solid "+C.border,borderRadius:8,padding:"5px 12px",color:C.ml,fontSize:12,cursor:"pointer",marginBottom:10}}>Back</button>
        <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:2}}>{recipeName}</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:10}}>{recipe.desc}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
          <span style={{fontSize:11,color:DIFF_C[recipe.diff],fontWeight:700,background:DIFF_C[recipe.diff]+"18",padding:"3px 10px",borderRadius:8}}>{recipe.diff}</span>
          <span style={{fontSize:11,color:C.muted}}>⏱ {recipe.time}</span>
          <span style={{fontSize:11,color:C.muted}}>👥 Serves {recipe.serves}</span>
          <span style={{fontSize:11}}>{recipe.veg?"🟢 Veg":"🔴 Non-Veg"}</span>
        </div>
        <div style={{display:"flex",gap:0,background:C.card2,borderRadius:12,overflow:"hidden",border:"1px solid "+C.border}}>
          {[["🔥",recipe.cal,"kcal",C.accent],["💪",recipe.p,"P",C.blue],["🌾",recipe.c,"C",C.green],["🫙",recipe.f,"F",C.purple]].map(([ic,v,u,cl])=>(
            <div key={u} style={{flex:1,padding:"8px 4px",textAlign:"center",borderRight:"1px solid "+C.border}}>
              <div style={{fontSize:14,fontWeight:800,color:cl}}>{v}</div>
              <div style={{fontSize:8,color:C.muted}}>{ic}{u}/srv</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 16px"}}>
        {step===-1&&<>
          {/* Ingredients with macros */}
          <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:14,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:800}}>Ingredients</div>
              <div style={{fontSize:10,color:C.muted}}>Tap to check off</div>
            </div>
            {/* Total ingredient macros */}
            <div style={{background:C.card2,borderRadius:10,padding:"8px 10px",marginBottom:10,border:"1px solid "+C.border}}>
              <div style={{fontSize:9,color:C.muted,marginBottom:4}}>TOTAL RAW INGREDIENTS ({recipe.serves} servings)</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {[["Cal",totalIngCal,"kcal",C.accent],["P",totalIngP,"g",C.blue],["C",totalIngC,"g",C.green],["F",totalIngF,"g",C.purple]].map(([l,v,u,cl])=>(
                  <div key={l} style={{textAlign:"center",minWidth:40}}>
                    <div style={{fontSize:12,fontWeight:800,color:cl}}>{Math.round(v)}</div>
                    <div style={{fontSize:8,color:C.muted}}>{l}{u}</div>
                  </div>
                ))}
              </div>
            </div>
            {recipe.ingredients.map((ing,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 0",borderBottom:i<recipe.ingredients.length-1?"1px solid "+C.border+"66":"none"}}>
                <div style={{width:20,height:20,borderRadius:6,background:done.has("i"+i)?C.green:C.card2,border:"1px solid "+(done.has("i"+i)?C.green:C.border),flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginTop:2}}
                  onClick={()=>setDone(d=>{const nd=new Set(d);nd.has("i"+i)?nd.delete("i"+i):nd.add("i"+i);return nd;})}>
                  {done.has("i"+i)&&<span style={{fontSize:10,color:"#fff"}}>✓</span>}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:done.has("i"+i)?C.muted:C.text,textDecoration:done.has("i"+i)?"line-through":"none"}}>{ing.name}</div>
                      <div style={{fontSize:10,color:C.muted}}>{ing.qty}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}>
                      <div style={{fontSize:12,fontWeight:700,color:C.accent}}>{ing.cal} kcal</div>
                      <div style={{fontSize:9,color:C.muted}}>P:{ing.p}g C:{ing.c}g F:{ing.f}g</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Steps overview */}
          <div style={{background:C.card,border:"1px solid "+C.border,borderRadius:14,padding:14,marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:800,marginBottom:10}}>Steps Overview</div>
            {recipe.steps.map((s,i)=>(
              <div key={i} onClick={()=>setStep(i)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 8px",borderRadius:10,marginBottom:4,cursor:"pointer",background:C.card2,border:"1px solid "+C.border}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent+"77"}
                onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{width:28,height:28,borderRadius:8,background:C.accent+"22",border:"1px solid "+C.accent+"44",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:12,fontWeight:800,color:C.accent}}>{i+1}</span>
                </div>
                <div style={{flex:1,fontSize:12,fontWeight:700,color:C.text}}>{s.t}</div>
                <span style={{color:C.muted}}>›</span>
              </div>
            ))}
          </div>

          <button onClick={()=>setStep(0)} style={{width:"100%",background:`linear-gradient(135deg,${C.accent},${C.yellow})`,border:"none",borderRadius:12,padding:14,color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",marginBottom:10}}>
            Start Cooking
          </button>
          <button onClick={()=>setModal({name:recipeName,d:{cal:recipe.cal,p:recipe.p,f:recipe.f,c:recipe.c,fi:recipe.fi,na:recipe.na,srv:"1 serving"},isIng:false})}
            style={{width:"100%",background:C.card,border:"1px solid "+C.green+"44",borderRadius:12,padding:12,color:C.green,fontWeight:700,fontSize:13,cursor:"pointer"}}>
            Log Servings to {meal}
          </button>
        </>}

        {step>=0&&step<recipe.steps.length&&<>
          <div style={{display:"flex",gap:3,marginBottom:14}}>
            {recipe.steps.map((_,i)=>(<div key={i} onClick={()=>setStep(i)} style={{flex:1,height:4,borderRadius:2,cursor:"pointer",background:i<=step?C.accent:C.border,transition:"background .3s"}}/>))}
          </div>
          <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Step {step+1} of {recipe.steps.length}</div>
          <div style={{background:C.card,border:"2px solid "+C.accent+"44",borderRadius:16,padding:20,marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{width:36,height:36,borderRadius:10,background:C.accent+"22",border:"1px solid "+C.accent+"44",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:16,fontWeight:800,color:C.accent}}>{step+1}</span>
              </div>
              <div style={{fontSize:16,fontWeight:800,color:C.text}}>{recipe.steps[step].t}</div>
            </div>
            <div style={{fontSize:14,color:C.ml,lineHeight:1.7}}>{recipe.steps[step].d}</div>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <button onClick={()=>step>0?setStep(step-1):setStep(-1)} style={{flex:1,background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:11,color:C.ml,fontWeight:700,fontSize:12,cursor:"pointer"}}>
              {step===0?"← Overview":"← Back"}
            </button>
            {step<recipe.steps.length-1
              ?<button onClick={()=>setStep(step+1)} style={{flex:2,background:`linear-gradient(135deg,${C.accent},${C.yellow})`,border:"none",borderRadius:10,padding:11,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>Next Step →</button>
              :<button onClick={()=>setModal({name:recipeName,d:{cal:recipe.cal,p:recipe.p,f:recipe.f,c:recipe.c,fi:recipe.fi,na:recipe.na,srv:"1 serving"},isIng:false})}
                style={{flex:2,background:`linear-gradient(135deg,${C.green}cc,${C.teal})`,border:"none",borderRadius:10,padding:11,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>Done! Log Servings</button>
            }
          </div>
          <div style={{background:C.card2,borderRadius:12,padding:12,border:"1px solid "+C.border}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:8,fontWeight:600}}>All Steps</div>
            {recipe.steps.map((s,i)=>(
              <div key={i} onClick={()=>setStep(i)}
                style={{display:"flex",alignItems:"center",gap:8,padding:"5px 6px",borderRadius:7,cursor:"pointer",background:i===step?C.accent+"15":""}}
                onMouseEnter={e=>e.currentTarget.style.background=i===step?C.accent+"15":C.card}
                onMouseLeave={e=>e.currentTarget.style.background=i===step?C.accent+"15":""}>
                <div style={{width:20,height:20,borderRadius:5,background:i<step?C.green+"33":i===step?C.accent+"22":C.card,border:"1px solid "+(i<step?C.green:i===step?C.accent:C.border),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {i<step?<span style={{fontSize:9,color:C.green}}>✓</span>:<span style={{fontSize:9,fontWeight:700,color:i===step?C.accent:C.muted}}>{i+1}</span>}
                </div>
                <span style={{fontSize:11,color:i===step?C.accent:i<step?C.muted:C.ml,fontWeight:i===step?700:400}}>{s.t}</span>
              </div>
            ))}
          </div>
        </>}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const [screen,setScreen]=useState("home");
  const [cookingRecipe,setCookingRecipe]=useState(null);
  const [log,setLog]=useState([]);
  const [goals,setGoals]=useState({cal:2000,p:175,c:240,f:60,fi:35,na:2300});
  const [meal,setMeal]=useState("Lunch");

  function openCook(name){setCookingRecipe(name);setScreen("cook");}
  function closeCook(){setCookingRecipe(null);setScreen("recipes");}

  const totalCal=log.reduce((s,i)=>s+i.n.cal,0);
  const NAV=[{id:"home",ic:"🏠",label:"Home"},{id:"scan",ic:"📸",label:"Scanner"},{id:"recipes",ic:"📖",label:"Recipes"},{id:"cook",ic:"🍳",label:"Cook"}];

  return(
    <div style={{fontFamily:"system-ui,sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:480,margin:"0 auto",paddingBottom:72}}>
      <style>{`*{box-sizing:border-box}button,input{font-family:inherit}input[type=number]::-webkit-inner-spin-button{opacity:.4}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1a2035}body{background:#060810}`}</style>
      <div style={{background:"linear-gradient(180deg,#0e0208,#060810)",padding:"12px 16px 10px",borderBottom:"1px solid "+C.border,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:99}}>
        <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.5px"}}><span style={{color:C.accent}}>Nutri</span><span style={{color:C.text}}>Track</span></div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:13,fontWeight:700,color:totalCal>goals.cal?C.red:C.accent}}>{Math.round(totalCal)}<span style={{fontSize:9,color:C.muted,fontWeight:400}}>/{goals.cal}kcal</span></div>
          <div style={{width:8,height:8,borderRadius:4,background:totalCal>goals.cal?C.red:C.green}}/>
        </div>
      </div>

      {screen==="home"&&<HomeScreen log={log} setLog={setLog} goals={goals} setGoals={setGoals} meal={meal} setMeal={setMeal}/>}
      {screen==="scan"&&<ScannerScreen log={log} setLog={setLog} meal={meal}/>}
      {screen==="recipes"&&<RecipesScreen onCook={openCook}/>}
      {screen==="cook"&&cookingRecipe&&<CookScreen recipeName={cookingRecipe} onBack={closeCook} log={log} setLog={setLog} meal={meal}/>}
      {screen==="cook"&&!cookingRecipe&&<RecipesScreen onCook={openCook}/>}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:C.card,borderTop:"1px solid "+C.border,display:"flex",zIndex:100}}>
        {NAV.map(n=>{
          const active=screen===n.id||(n.id==="cook"&&screen==="cook");
          return(
            <button key={n.id} onClick={()=>{if(n.id==="cook"&&!cookingRecipe){setScreen("recipes");}else{setScreen(n.id);}}}
              style={{flex:1,padding:"10px 0 12px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
              {active&&<div style={{width:20,height:2,borderRadius:1,background:C.accent,position:"absolute",top:0}}/>}
              <div style={{fontSize:22,lineHeight:1,filter:active?"none":"grayscale(0.5) opacity(0.6)"}}>{n.ic}</div>
              <div style={{fontSize:9,fontWeight:active?800:500,color:active?C.accent:C.muted}}>{n.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
