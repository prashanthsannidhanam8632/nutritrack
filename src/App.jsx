import { useState, useRef, useEffect } from "react";

const INGREDIENTS = {
  "Toor Dal (Arhar)":{ cal:343,p:22.3,f:1.5,c:62,fi:15,s:0.5,na:14,unit:"g" },
  "Moong Dal (Yellow Split)":{ cal:347,p:24.0,f:1.2,c:60,fi:16,s:2.0,na:16,unit:"g" },
  "Masoor Dal (Red Lentil)":{ cal:352,p:24.6,f:1.1,c:60,fi:11,s:2.5,na:15,unit:"g" },
  "Chana Dal (Split Chickpea)":{ cal:364,p:20.4,f:5.6,c:60,fi:11,s:1.8,na:15,unit:"g" },
  "Urad Dal (Black Lentil)":{ cal:341,p:25.2,f:1.6,c:59,fi:18,s:1.4,na:38,unit:"g" },
  "Whole Moong (Green Gram)":{ cal:347,p:24.0,f:1.2,c:63,fi:16,s:2.0,na:15,unit:"g" },
  "Rajma (Kidney Beans)":{ cal:333,p:23.6,f:0.8,c:60,fi:25,s:2.0,na:22,unit:"g" },
  "Chole (Chickpeas dry)":{ cal:364,p:19.3,f:6.0,c:61,fi:17,s:7.8,na:24,unit:"g" },
  "Black-eyed Peas":{ cal:336,p:23.5,f:1.3,c:60,fi:11,s:3.2,na:22,unit:"g" },
  "Moth Beans":{ cal:343,p:23.0,f:1.6,c:60,fi:10,s:1.8,na:28,unit:"g" },
  "Basmati Rice (raw)":{ cal:356,p:7.9,f:0.7,c:78,fi:0.5,s:0,na:1,unit:"g" },
  "Brown Rice (raw)":{ cal:370,p:7.5,f:2.7,c:77,fi:3.5,s:0.7,na:5,unit:"g" },
  "Wheat Flour (Atta)":{ cal:341,p:12.1,f:1.7,c:72,fi:10,s:0.4,na:2,unit:"g" },
  "Maida (All-purpose flour)":{ cal:364,p:10.3,f:1.0,c:76,fi:2.7,s:0.3,na:2,unit:"g" },
  "Semolina (Sooji/Rava)":{ cal:360,p:12.7,f:1.1,c:73,fi:3.9,s:0.6,na:1,unit:"g" },
  "Poha (Flattened Rice)":{ cal:369,p:6.6,f:0.5,c:80,fi:1.8,s:0.5,na:5,unit:"g" },
  "Besan (Chickpea flour)":{ cal:387,p:22.4,f:6.7,c:58,fi:11,s:5.6,na:64,unit:"g" },
  "Oats (Rolled)":{ cal:389,p:17.0,f:6.9,c:66,fi:10,s:0,na:2,unit:"g" },
  "Quinoa (raw)":{ cal:368,p:14.1,f:6.1,c:64,fi:7,s:1.6,na:5,unit:"g" },
  "Mustard Oil":{ cal:884,p:0,f:100,c:0,fi:0,s:0,na:0,unit:"ml" },
  "Coconut Oil":{ cal:862,p:0,f:100,c:0,fi:0,s:0,na:0,unit:"ml" },
  "Sunflower Oil":{ cal:884,p:0,f:100,c:0,fi:0,s:0,na:0,unit:"ml" },
  "Groundnut Oil":{ cal:884,p:0,f:100,c:0,fi:0,s:0,na:0,unit:"ml" },
  "Olive Oil":{ cal:884,p:0,f:100,c:0,fi:0,s:0,na:0,unit:"ml" },
  "Sesame Oil":{ cal:884,p:0,f:100,c:0,fi:0,s:0,na:0,unit:"ml" },
  "Rice Bran Oil":{ cal:884,p:0,f:100,c:0,fi:0,s:0,na:0,unit:"ml" },
  "Ghee":{ cal:900,p:0,f:100,c:0,fi:0,s:0,na:0,unit:"g" },
  "Butter (salted)":{ cal:717,p:0.9,f:81,c:0.1,fi:0,s:0.1,na:643,unit:"g" },
  "Dalda (Vanaspati)":{ cal:900,p:0,f:100,c:0,fi:0,s:0,na:0,unit:"g" },
  "Onion":{ cal:40,p:1.1,f:0.1,c:9,fi:1.7,s:4.2,na:4,unit:"g" },
  "Tomato":{ cal:18,p:0.9,f:0.2,c:3.9,fi:1.2,s:2.6,na:5,unit:"g" },
  "Garlic":{ cal:149,p:6.4,f:0.5,c:33,fi:2.1,s:1.0,na:17,unit:"g" },
  "Ginger":{ cal:80,p:1.8,f:0.8,c:18,fi:2.0,s:1.7,na:13,unit:"g" },
  "Green Chilli":{ cal:40,p:2.0,f:0.4,c:9,fi:1.5,s:5.0,na:7,unit:"g" },
  "Potato":{ cal:77,p:2.0,f:0.1,c:17,fi:2.2,s:0.8,na:6,unit:"g" },
  "Spinach (Palak)":{ cal:23,p:2.9,f:0.4,c:3.6,fi:2.2,s:0.4,na:79,unit:"g" },
  "Fenugreek leaves (Methi)":{ cal:49,p:4.4,f:0.9,c:6,fi:3.9,s:1.5,na:67,unit:"g" },
  "Coriander leaves":{ cal:23,p:2.1,f:0.5,c:3.7,fi:2.8,s:0.9,na:46,unit:"g" },
  "Eggplant (Brinjal)":{ cal:25,p:1.0,f:0.2,c:6,fi:3.0,s:3.5,na:2,unit:"g" },
  "Cauliflower":{ cal:25,p:1.9,f:0.3,c:5,fi:2.0,s:1.9,na:30,unit:"g" },
  "Green Peas":{ cal:81,p:5.4,f:0.4,c:14,fi:5.1,s:5.7,na:5,unit:"g" },
  "Capsicum":{ cal:31,p:1.0,f:0.3,c:6,fi:2.1,s:4.2,na:4,unit:"g" },
  "Carrot":{ cal:41,p:0.9,f:0.2,c:10,fi:2.8,s:4.7,na:69,unit:"g" },
  "Bottle Gourd (Lauki)":{ cal:15,p:0.6,f:0.1,c:3.4,fi:0.5,s:1.8,na:2,unit:"g" },
  "Bitter Gourd (Karela)":{ cal:34,p:3.6,f:0.2,c:7,fi:2.8,s:1.7,na:5,unit:"g" },
  "Drumstick (Moringa)":{ cal:37,p:2.1,f:0.2,c:8.5,fi:3.2,s:3.2,na:42,unit:"g" },
  "Broccoli":{ cal:34,p:2.8,f:0.4,c:7,fi:2.6,s:1.7,na:33,unit:"g" },
  "Mushroom":{ cal:22,p:3.1,f:0.3,c:3.3,fi:1.0,s:2.0,na:5,unit:"g" },
  "Sweet Corn":{ cal:86,p:3.2,f:1.2,c:19,fi:2.7,s:3.2,na:15,unit:"g" },
  "Beetroot":{ cal:43,p:1.6,f:0.2,c:10,fi:2.8,s:6.8,na:78,unit:"g" },
  "Paneer":{ cal:265,p:18.3,f:20.8,c:3.4,fi:0,s:0.8,na:40,unit:"g" },
  "Curd (Dahi)":{ cal:98,p:5.7,f:4.3,c:7.8,fi:0,s:7.8,na:65,unit:"g" },
  "Milk (Full fat)":{ cal:61,p:3.2,f:3.3,c:4.8,fi:0,s:4.8,na:43,unit:"ml" },
  "Milk (Toned)":{ cal:44,p:3.5,f:1.5,c:4.9,fi:0,s:4.9,na:46,unit:"ml" },
  "Cream":{ cal:340,p:2.0,f:36,c:2.8,fi:0,s:2.8,na:27,unit:"ml" },
  "Buttermilk":{ cal:40,p:3.2,f:1.2,c:4.0,fi:0,s:3.8,na:320,unit:"ml" },
  "Coconut Milk":{ cal:197,p:2.0,f:21,c:2.8,fi:0,s:1.5,na:13,unit:"ml" },
  "Khoya (Mawa)":{ cal:421,p:20.4,f:26,c:28,fi:0,s:28,na:350,unit:"g" },
  "Cumin Seeds (Jeera)":{ cal:375,p:17.8,f:22,c:44,fi:11,s:2.3,na:168,unit:"g" },
  "Mustard Seeds (Rai)":{ cal:508,p:26,f:36,c:28,fi:12,s:6.8,na:13,unit:"g" },
  "Fenugreek Seeds (Methi)":{ cal:323,p:23,f:6.4,c:58,fi:25,s:0,na:67,unit:"g" },
  "Coriander Seeds":{ cal:298,p:12.4,f:17,c:55,fi:42,s:0,na:35,unit:"g" },
  "Turmeric Powder":{ cal:312,p:9.7,f:3.3,c:68,fi:22,s:3.2,na:38,unit:"g" },
  "Red Chilli Powder":{ cal:282,p:13,f:14,c:56,fi:27,s:10,na:30,unit:"g" },
  "Garam Masala":{ cal:380,p:14,f:15,c:52,fi:14,s:4.2,na:51,unit:"g" },
  "Cardamom (Elaichi)":{ cal:311,p:11,f:6.7,c:68,fi:28,s:1.2,na:18,unit:"g" },
  "Cinnamon (Dalchini)":{ cal:247,p:4.0,f:1.2,c:81,fi:53,s:2.2,na:10,unit:"g" },
  "Cloves (Laung)":{ cal:274,p:6.0,f:13,c:65,fi:34,s:0,na:277,unit:"g" },
  "Bay Leaf (Tej Patta)":{ cal:313,p:7.6,f:8.4,c:75,fi:26,s:0,na:23,unit:"g" },
  "Asafoetida (Hing)":{ cal:297,p:4.0,f:1.1,c:68,fi:4,s:0,na:97,unit:"g" },
  "Dry Red Chilli":{ cal:282,p:13,f:14,c:56,fi:27,s:10,na:30,unit:"g" },
  "Kasuri Methi":{ cal:323,p:23,f:6.4,c:58,fi:25,s:0,na:67,unit:"g" },
  "Salt":{ cal:0,p:0,f:0,c:0,fi:0,s:0,na:38758,unit:"g" },
  "Sugar":{ cal:387,p:0,f:0,c:100,fi:0,s:100,na:1,unit:"g" },
  "Jaggery (Gur)":{ cal:383,p:0.4,f:0.1,c:97,fi:0,s:97,na:30,unit:"g" },
  "Tamarind":{ cal:239,p:2.8,f:0.6,c:63,fi:5.1,s:38,na:28,unit:"g" },
  "Lemon Juice":{ cal:22,p:0.4,f:0.2,c:7,fi:0.3,s:2.5,na:1,unit:"ml" },
  "Cashews (Kaju)":{ cal:553,p:18.2,f:43.9,c:30,fi:3.3,s:5.9,na:12,unit:"g" },
  "Almonds (Badam)":{ cal:579,p:21.2,f:49.9,c:22,fi:12,s:4.4,na:1,unit:"g" },
  "Raisins (Kishmish)":{ cal:299,p:3.1,f:0.5,c:79,fi:3.7,s:59,na:11,unit:"g" },
  "Peanuts (Moongphali)":{ cal:567,p:25.8,f:49,c:16,fi:8.5,s:4.7,na:18,unit:"g" },
  "Sesame Seeds (Til)":{ cal:573,p:17.7,f:49.7,c:23,fi:11,s:0.3,na:11,unit:"g" },
  "Poppy Seeds (Khus Khus)":{ cal:525,p:17.9,f:41.6,c:28,fi:20,s:2.0,na:26,unit:"g" },
  "Chicken (boneless raw)":{ cal:165,p:31,f:3.6,c:0,fi:0,s:0,na:74,unit:"g" },
  "Chicken (bone-in raw)":{ cal:119,p:18.3,f:4.7,c:0,fi:0,s:0,na:70,unit:"g" },
  "Mutton (raw)":{ cal:294,p:16.6,f:24.8,c:0,fi:0,s:0,na:72,unit:"g" },
  "Fish (Rohu raw)":{ cal:97,p:16.6,f:2.7,c:0,fi:0,s:0,na:68,unit:"g" },
  "Prawns (raw)":{ cal:85,p:18.3,f:0.9,c:0.9,fi:0,s:0,na:119,unit:"g" },
  "Egg":{ cal:72,p:6.3,f:5.0,c:0.4,fi:0,s:0.4,na:71,unit:"piece" },
  "Water":{ cal:0,p:0,f:0,c:0,fi:0,s:0,na:0,unit:"ml" },
};

const UNIT_OPT = {
  g:{ label:"grams (g)", factor:1 },
  kg:{ label:"kg", factor:1000 },
  ml:{ label:"ml", factor:1 },
  L:{ label:"litres (L)", factor:1000 },
  tsp:{ label:"tsp (~5g)", factor:5 },
  tbsp:{ label:"tbsp (~15g)", factor:15 },
  cup:{ label:"cup (~240ml)", factor:240 },
  oz:{ label:"oz (28g)", factor:28.35 },
  piece:{ label:"piece", factor:60 },
};

const CATS = {
  "🌾 Lentils & Grains":["Toor Dal","Moong Dal","Masoor Dal","Chana Dal","Urad Dal","Whole Moong","Rajma","Chole","Black-eyed Peas","Moth Beans","Basmati Rice","Brown Rice","Wheat Flour","Maida","Semolina","Poha","Besan","Oats","Quinoa"],
  "🫙 Oils & Fats":["Mustard Oil","Coconut Oil","Sunflower Oil","Groundnut Oil","Olive Oil","Sesame Oil","Rice Bran Oil","Ghee","Butter","Dalda"],
  "🥦 Vegetables":["Onion","Tomato","Garlic","Ginger","Green Chilli","Potato","Spinach","Fenugreek leaves","Coriander leaves","Eggplant","Cauliflower","Green Peas","Capsicum","Carrot","Bottle Gourd","Bitter Gourd","Drumstick","Broccoli","Mushroom","Sweet Corn","Beetroot"],
  "🥛 Dairy":["Paneer","Curd (Dahi)","Milk (Full fat)","Milk (Toned)","Cream","Buttermilk","Coconut Milk","Khoya (Mawa)"],
  "🧂 Spices":["Cumin Seeds","Mustard Seeds","Fenugreek Seeds","Coriander Seeds","Turmeric Powder","Red Chilli Powder","Garam Masala","Cardamom","Cinnamon","Cloves","Bay Leaf","Asafoetida","Dry Red Chilli","Kasuri Methi","Salt","Sugar","Jaggery","Tamarind","Lemon Juice"],
  "🥜 Nuts":["Cashews","Almonds","Raisins","Peanuts","Sesame Seeds","Poppy Seeds"],
  "🍗 Meat & Eggs":["Chicken (boneless raw)","Chicken (bone-in raw)","Mutton (raw)","Fish (Rohu raw)","Prawns (raw)","Egg"],
  "💧 Other":["Water"],
};

const C = {
  bg:"#0a0b0f",card:"#131520",card2:"#1a1d2e",border:"#252840",
  accent:"#ff6b2b",accent2:"#ff8c42",green:"#22d45e",
  blue:"#38c5f8",purple:"#b47aff",yellow:"#ffc842",red:"#ff5555",
  text:"#f0eeea",muted:"#6b7280",
};

function calcN(name,amount,unit){
  const d=INGREDIENTS[name]; if(!d) return null;
  const f=(amount*(UNIT_OPT[unit]?.factor||1))/100;
  return { cal:+(d.cal*f).toFixed(1),p:+(d.p*f).toFixed(1),f:+(d.f*f).toFixed(1),c:+(d.c*f).toFixed(1),fi:+(d.fi*f).toFixed(1),s:+(d.s*f).toFixed(1),na:+(d.na*f).toFixed(0) };
}

function sumN(items){
  return items.reduce((a,it)=>{
    const n=calcN(it.name,it.amount,it.unit); if(!n) return a;
    return {cal:a.cal+n.cal,p:a.p+n.p,f:a.f+n.f,c:a.c+n.c,fi:a.fi+n.fi,s:a.s+n.s,na:a.na+n.na};
  },{cal:0,p:0,f:0,c:0,fi:0,s:0,na:0});
}

function Pill({label,value,unit,color}){
  return(
    <div style={{background:C.card2,borderRadius:10,padding:"8px 10px",textAlign:"center",minWidth:58}}>
      <div style={{fontSize:10,color:C.muted,marginBottom:1}}>{label}</div>
      <div style={{fontSize:14,fontWeight:700,color}}>{value}<span style={{fontSize:9,fontWeight:400,marginLeft:1}}>{unit}</span></div>
    </div>
  );
}

// ─── RECIPE BUILDER ──────────────────────────────────────────────────────────
function RecipeBuilder({onSave,onCancel}){
  const [name,setName]=useState("");
  const [servings,setServings]=useState(4);
  const [ings,setIngs]=useState([]);
  const [search,setSearch]=useState("");
  const [activeCat,setActiveCat]=useState("🌾 Lentils & Grains");
  const [aiQuery,setAiQuery]=useState("");
  const [aiLoading,setAiLoading]=useState(false);
  const [aiSugg,setAiSugg]=useState(null);

  const ingNames=Object.keys(INGREDIENTS);
  const filtered=ingNames.filter(n=>search?n.toLowerCase().includes(search.toLowerCase()):
    Object.entries(CATS).find(([cat])=>cat===activeCat)?.[1]?.some(k=>n.includes(k.split(" ")[0].replace("(","")))
  );

  function addIng(n){ setIngs(p=>[...p,{id:Date.now()+Math.random(),name:n,amount:50,unit:INGREDIENTS[n].unit}]); setSearch(""); }
  function remIng(id){ setIngs(p=>p.filter(i=>i.id!==id)); }
  function updIng(id,field,val){ setIngs(p=>p.map(i=>i.id===id?{...i,[field]:field==="amount"?+val:val}:i)); }

  const total=sumN(ings);
  const perSrv={cal:+(total.cal/servings).toFixed(1),p:+(total.p/servings).toFixed(1),f:+(total.f/servings).toFixed(1),c:+(total.c/servings).toFixed(1),fi:+(total.fi/servings).toFixed(1),s:+(total.s/servings).toFixed(1),na:+(total.na/servings).toFixed(0)};

  async function aiAutofill(){
    if(!aiQuery.trim()) return;
    setAiLoading(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:`Give accurate standard home recipe ingredient list for "${aiQuery}" for ${servings} servings.
Return ONLY a JSON array, no markdown:
[{"name":"ingredient","amount":50,"unit":"g"}]
Map names to these known ones: ${Object.keys(INGREDIENTS).join(", ")}
Use exact names from list where possible. Units: g, ml, tsp, tbsp, cup, piece.`}]})
      });
      const d=await r.json();
      const txt=d.content?.[0]?.text||"[]";
      setAiSugg(JSON.parse(txt.replace(/```json|```/g,"").trim()));
    }catch{} setAiLoading(false);
  }

  function applyAi(){
    if(!aiSugg) return;
    const mapped=aiSugg.map(s=>{
      const match=Object.keys(INGREDIENTS).find(k=>k.toLowerCase().startsWith(s.name.toLowerCase().split(" ")[0]));
      return match?{id:Date.now()+Math.random(),name:match,amount:s.amount,unit:s.unit in UNIT_OPT?s.unit:INGREDIENTS[match].unit}:null;
    }).filter(Boolean);
    setIngs(p=>[...p,...mapped]);
    if(!name) setName(aiQuery);
    setAiSugg(null); setAiQuery("");
  }

  return(
    <div style={{background:C.bg,minHeight:"100%"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderBottom:`1px solid ${C.border}`,background:C.bg,position:"sticky",top:0,zIndex:10}}>
        <button onClick={onCancel} style={{background:C.card,border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:13}}>← Back</button>
        <span style={{fontSize:16,fontWeight:800,color:C.text}}>🍳 Recipe Builder</span>
      </div>
      <div style={{padding:"14px 16px"}}>
        {/* Name + Servings */}
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Recipe name (e.g. Dal Tadka)"
            style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:14,outline:"none"}}/>
          <div style={{display:"flex",alignItems:"center",gap:6,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"6px 12px"}}>
            <span style={{fontSize:11,color:C.muted}}>Srv</span>
            <input type="number" min={1} value={servings} onChange={e=>setServings(+e.target.value)}
              style={{width:34,background:"transparent",border:"none",color:C.text,fontSize:14,outline:"none"}}/>
          </div>
        </div>

        {/* AI Autofill */}
        <div style={{background:C.card,border:`1px dashed ${C.accent}55`,borderRadius:12,padding:12,marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:C.accent,marginBottom:8}}>🤖 AI Auto-fill — type dish name</div>
          <div style={{display:"flex",gap:8}}>
            <input value={aiQuery} onChange={e=>setAiQuery(e.target.value)} placeholder="e.g. Dal Tadka, Chicken Biryani..."
              style={{flex:1,background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",color:C.text,fontSize:13,outline:"none"}}
              onKeyDown={e=>e.key==="Enter"&&aiAutofill()}/>
            <button onClick={aiAutofill} disabled={aiLoading} style={{background:C.accent,color:"#fff",border:"none",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontWeight:700,fontSize:13}}>
              {aiLoading?"⏳":"Fill"}
            </button>
          </div>
          {aiSugg&&(
            <div style={{marginTop:10,background:C.bg,borderRadius:8,padding:10}}>
              <div style={{fontSize:12,color:C.muted,marginBottom:6}}>Matched {aiSugg.length} ingredients:</div>
              <div style={{maxHeight:120,overflowY:"auto"}}>
                {aiSugg.map((s,i)=><div key={i} style={{fontSize:12,color:C.text,padding:"2px 0"}}>• {s.name} — {s.amount} {s.unit}</div>)}
              </div>
              <button onClick={applyAi} style={{marginTop:8,background:C.green+"22",color:C.green,border:`1px solid ${C.green}44`,borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:600}}>✓ Add All</button>
            </div>
          )}
        </div>

        {/* Category tabs */}
        {!search&&(
          <div style={{display:"flex",gap:5,overflowX:"auto",marginBottom:8,paddingBottom:4}}>
            {Object.keys(CATS).map(c=>(
              <button key={c} onClick={()=>setActiveCat(c)} style={{whiteSpace:"nowrap",padding:"5px 10px",borderRadius:14,border:"none",fontSize:11,cursor:"pointer",fontWeight:500,
                background:activeCat===c?C.accent+"33":C.card,color:activeCat===c?C.accent:C.muted,
                outline:activeCat===c?`1px solid ${C.accent}44`:""}}>{c}</button>
            ))}
          </div>
        )}

        {/* Search */}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search any ingredient..."
          style={{width:"100%",boxSizing:"border-box",background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 14px",color:C.text,fontSize:13,outline:"none",marginBottom:8}}/>

        {/* Ingredient list */}
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,maxHeight:200,overflowY:"auto",marginBottom:12}}>
          {filtered.slice(0,40).map(n=>(
            <div key={n} onClick={()=>addIng(n)}
              style={{padding:"9px 14px",cursor:"pointer",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.card2}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <span style={{fontSize:13,color:C.text}}>{n}</span>
              <span style={{fontSize:11,color:C.muted}}>{INGREDIENTS[n].cal} kcal/100{INGREDIENTS[n].unit} <span style={{color:C.accent,fontWeight:700}}>＋</span></span>
            </div>
          ))}
          {filtered.length===0&&<div style={{padding:14,textAlign:"center",color:C.muted,fontSize:13}}>No ingredient found</div>}
        </div>

        {/* Added ingredients */}
        {ings.length>0&&(
          <div style={{marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:8}}>📝 Recipe Ingredients ({ings.length})</div>
            {ings.map(ing=>{
              const n=calcN(ing.name,ing.amount,ing.unit);
              return(
                <div key={ing.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",marginBottom:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <span style={{fontSize:13,fontWeight:600,color:C.text,flex:1}}>{ing.name}</span>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      {n&&<span style={{fontSize:11,color:C.accent,fontWeight:600}}>{n.cal} kcal</span>}
                      <button onClick={()=>remIng(ing.id)} style={{background:"transparent",border:"none",color:C.red,cursor:"pointer",fontSize:16,padding:0,lineHeight:1}}>✕</button>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <input type="number" min={0.1} step={0.5} value={ing.amount} onChange={e=>updIng(ing.id,"amount",e.target.value)}
                      style={{width:72,background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 8px",color:C.text,fontSize:13,outline:"none"}}/>
                    <select value={ing.unit} onChange={e=>updIng(ing.id,"unit",e.target.value)}
                      style={{flex:1,background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 8px",color:C.text,fontSize:13,outline:"none"}}>
                      {Object.entries(UNIT_OPT).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                  {n&&(
                    <div style={{display:"flex",gap:8,marginTop:5,flexWrap:"wrap"}}>
                      {[["P",n.p,"g",C.blue],["F",n.f,"g",C.purple],["C",n.c,"g",C.green],["Na",n.na,"mg",C.red]].map(([l,v,u,col])=>(
                        <span key={l} style={{fontSize:11,color:col}}>{l}:{v}{u}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Totals */}
        {ings.length>0&&(
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:13,fontWeight:700,color:C.text}}>Whole Recipe</span>
              <span style={{fontSize:11,color:C.muted}}>{servings} servings</span>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
              <Pill label="Calories" value={total.cal.toFixed(0)} unit="kcal" color={C.accent}/>
              <Pill label="Protein" value={total.p.toFixed(1)} unit="g" color={C.blue}/>
              <Pill label="Fat" value={total.f.toFixed(1)} unit="g" color={C.purple}/>
              <Pill label="Carbs" value={total.c.toFixed(1)} unit="g" color={C.green}/>
              <Pill label="Fiber" value={total.fi.toFixed(1)} unit="g" color="#86efac"/>
              <Pill label="Sodium" value={total.na.toFixed(0)} unit="mg" color={C.red}/>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Per 1 Serving</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                <Pill label="Calories" value={perSrv.cal} unit="kcal" color={C.accent}/>
                <Pill label="Protein" value={perSrv.p} unit="g" color={C.blue}/>
                <Pill label="Fat" value={perSrv.f} unit="g" color={C.purple}/>
                <Pill label="Carbs" value={perSrv.c} unit="g" color={C.green}/>
              </div>
            </div>
          </div>
        )}

        {ings.length>0&&name&&(
          <button onClick={()=>onSave({name,servings,ings,total,perSrv})}
            style={{width:"100%",background:`linear-gradient(135deg,${C.accent},${C.accent2})`,color:"#fff",border:"none",borderRadius:12,padding:14,fontWeight:800,fontSize:15,cursor:"pointer",letterSpacing:"0.2px"}}>
            💾 Save Recipe & Add to Log
          </button>
        )}
        {ings.length>0&&!name&&<div style={{textAlign:"center",fontSize:12,color:C.muted,marginTop:8}}>Enter a recipe name to save</div>}
      </div>
    </div>
  );
}

// ─── PLATE SCANNER ───────────────────────────────────────────────────────────
function PlateScanner({onAdd,onCancel}){
  const [mode,setMode]=useState("choose");
  const [imgData,setImgData]=useState(null);
  const [results,setResults]=useState(null);
  const [selected,setSelected]=useState([]);
  const [bInput,setBInput]=useState("");
  const [bResult,setBResult]=useState(null);
  const [loading,setLoading]=useState(false);
  const vidRef=useRef(); canRef=useRef(); fileRef=useRef();
  const streamRef=useRef();

  async function startCam(){
    setMode("camera");
    try{
      const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:false});
      streamRef.current=s;
      if(vidRef.current) vidRef.current.srcObject=s;
    }catch{ alert("Camera unavailable or permission denied"); setMode("choose"); }
  }
  function stopCam(){ streamRef.current?.getTracks().forEach(t=>t.stop()); }
  function capture(){
    const v=vidRef.current,cv=canRef.current; if(!v||!cv) return;
    cv.width=v.videoWidth; cv.height=v.videoHeight;
    cv.getContext("2d").drawImage(v,0,0);
    setImgData(cv.toDataURL("image/jpeg",0.85));
    stopCam(); setMode("preview");
  }
  function onFile(e){
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader();
    r.onload=ev=>{ setImgData(ev.target.result); setMode("preview"); };
    r.readAsDataURL(f);
  }

  async function analyzeImg(){
    setMode("scanning"); setLoading(true);
    try{
      const b64=imgData.split(",")[1];
      const resp=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,messages:[{role:"user",content:[
          {type:"image",source:{type:"base64",media_type:"image/jpeg",data:b64}},
          {type:"text",text:`Analyse this food photo carefully. Identify every food item you can see — main dishes, sides, garnishes, sauces, drinks, everything.

Return ONLY a valid JSON array, no markdown, no explanation:
[{"name":"specific food name","estimated_amount":150,"unit":"g","calories":200,"protein":8.5,"fat":6.2,"carbs":28,"fiber":2.1,"sugar":3.4,"sodium":320,"confidence":"high","cuisine":"Indian","type":"veg","description":"brief visual description"}]

Rules:
- Be specific: "Toor Dal Tadka" not "dal", "Basmati Rice" not "rice"
- Realistic portion sizes based on plate/bowl context
- Include ALL visible items including small ones
- For Indian thali plates, list each item separately
- confidence: high/medium/low based on how clearly visible the food is`}
        ]}]})
      });
      const d=await resp.json();
      const txt=d.content?.[0]?.text||"[]";
      const json=JSON.parse(txt.replace(/```json|```/g,"").trim());
      setResults(json);
      setSelected(json.map((_,i)=>i));
    }catch{ setResults([]); }
    setLoading(false); setMode("result");
  }

  async function lookupBarcode(){
    if(!bInput.trim()) return;
    setLoading(true);
    try{
      const resp=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:`Nutrition lookup for: "${bInput}" (barcode or product name).
If it's a known Indian packaged food product, provide actual values. Otherwise provide accurate estimates.
Return ONLY JSON (no markdown):
{"name":"product name","brand":"brand if known","calories":0,"protein":0,"fat":0,"carbs":0,"fiber":0,"sugar":0,"sodium":0,"serving_size":100,"serving_unit":"g","type":"veg or non-veg","note":"any clarification"}`}]})
      });
      const d=await resp.json();
      const txt=d.content?.[0]?.text||"{}";
      setBResult(JSON.parse(txt.replace(/```json|```/g,"").trim()));
    }catch{}
    setLoading(false);
  }

  function addSelected(){
    if(!results) return;
    results.filter((_,i)=>selected.includes(i)).forEach(item=>onAdd({
      name:item.name, amount:item.estimated_amount, unit:item.unit,
      nutrition:{calories:item.calories,protein:item.protein,fat:item.fat,carbs:item.carbs,fiber:item.fiber,sugar:item.sugar,sodium:item.sodium},
      type:item.type, category:item.cuisine, source:"scan"
    }));
    onCancel();
  }

  const canRef=useRef();

  return(
    <div style={{background:C.bg,minHeight:"100%"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderBottom:`1px solid ${C.border}`,background:C.bg,position:"sticky",top:0,zIndex:10}}>
        <button onClick={()=>{stopCam();onCancel();}} style={{background:C.card,border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:13}}>← Back</button>
        <span style={{fontSize:16,fontWeight:800,color:C.text}}>
          {mode==="barcode"?"📊 Barcode Scanner":"📸 Plate Scanner"}
        </span>
      </div>

      <div style={{padding:"16px"}}>
        {mode==="choose"&&(
          <div>
            <div style={{textAlign:"center",padding:"8px 0 20px"}}>
              <div style={{fontSize:48,marginBottom:10}}>🍽️</div>
              <div style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:4}}>Scan Your Food</div>
              <div style={{fontSize:13,color:C.muted}}>AI identifies every item on your plate</div>
            </div>
            {[
              {icon:"📷",title:"Take a Photo",sub:"Use camera to photograph your meal",action:startCam,border:C.blue,bg:"#0a1520"},
              {icon:"🖼️",title:"Upload from Gallery",sub:"Choose an existing food photo",action:()=>fileRef.current?.click(),border:C.green,bg:"#0a1a0a"},
              {icon:"📊",title:"Enter Barcode / Product",sub:"Packaged food barcode or name",action:()=>setMode("barcode"),border:C.purple,bg:"#130a1a"},
            ].map(({icon,title,sub,action,border,bg})=>(
              <button key={title} onClick={action} style={{width:"100%",background:bg,border:`1px solid ${border}33`,borderRadius:16,padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:16,marginBottom:10,textAlign:"left"}}>
                <span style={{fontSize:30}}>{icon}</span>
                <div><div style={{fontSize:14,fontWeight:700,color:C.text}}>{title}</div><div style={{fontSize:12,color:C.muted,marginTop:2}}>{sub}</div></div>
              </button>
            ))}
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{display:"none"}}/>
          </div>
        )}

        {mode==="camera"&&(
          <div style={{textAlign:"center"}}>
            <div style={{position:"relative",borderRadius:16,overflow:"hidden",marginBottom:14}}>
              <video ref={vidRef} autoPlay playsInline muted style={{width:"100%",display:"block",maxHeight:360,objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,border:`2px dashed ${C.accent}77`,borderRadius:16,pointerEvents:"none"}}/>
              <div style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,0.65)",borderRadius:8,padding:"4px 10px",fontSize:11,color:C.text}}>Center your plate in frame</div>
            </div>
            <canvas ref={canRef} style={{display:"none"}}/>
            <button onClick={capture} style={{background:`radial-gradient(circle,${C.accent},${C.accent2})`,color:"#fff",border:"none",borderRadius:50,width:68,height:68,fontSize:26,cursor:"pointer",boxShadow:`0 0 30px ${C.accent}55`}}>📸</button>
          </div>
        )}

        {mode==="preview"&&(
          <div>
            <img src={imgData} alt="Preview" style={{width:"100%",borderRadius:16,marginBottom:14,maxHeight:320,objectFit:"cover"}}/>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{setImgData(null);setMode("choose");}} style={{flex:1,background:C.card,color:C.muted,border:`1px solid ${C.border}`,borderRadius:12,padding:12,cursor:"pointer",fontWeight:600}}>Retake</button>
              <button onClick={analyzeImg} style={{flex:2,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,color:"#fff",border:"none",borderRadius:12,padding:12,cursor:"pointer",fontWeight:800,fontSize:15}}>🔍 Analyse Plate</button>
            </div>
          </div>
        )}

        {mode==="scanning"&&(
          <div style={{textAlign:"center",padding:"50px 20px"}}>
            <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.08)}}@keyframes dot{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
            <div style={{fontSize:54,animation:"pulse 1.5s ease infinite",marginBottom:16}}>🔍</div>
            <div style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:8}}>Analysing Your Plate...</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:24}}>AI is identifying foods & nutrition</div>
            <div style={{display:"flex",justifyContent:"center",gap:8}}>
              {[0,1,2].map(i=><div key={i} style={{width:10,height:10,borderRadius:5,background:C.accent,animation:`dot 1s ease ${i*0.25}s infinite`}}/>)}
            </div>
          </div>
        )}

        {mode==="result"&&results&&(
          <div>
            {imgData&&<img src={imgData} alt="" style={{width:"100%",borderRadius:12,marginBottom:12,maxHeight:200,objectFit:"cover"}}/>}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:800,color:C.text}}>🎯 Found {results.length} item{results.length!==1?"s":""}</div>
              <button onClick={()=>setSelected(results.map((_,i)=>i))} style={{fontSize:11,color:C.accent,background:"transparent",border:"none",cursor:"pointer"}}>Select All</button>
            </div>
            {results.length===0&&<div style={{textAlign:"center",color:C.muted,padding:24}}>No food detected. Try a clearer photo.</div>}
            {results.map((item,i)=>(
              <div key={i} onClick={()=>setSelected(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i])}
                style={{background:selected.includes(i)?C.accent+"18":C.card,border:`1px solid ${selected.includes(i)?C.accent:C.border}`,borderRadius:12,padding:12,marginBottom:8,cursor:"pointer",transition:"all 0.2s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
                    <div style={{width:22,height:22,borderRadius:6,background:selected.includes(i)?C.accent:C.card2,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>
                      {selected.includes(i)?"✓":""}
                    </div>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:13,fontWeight:700,color:C.text}}>{item.name}</span>
                        <span style={{fontSize:10}}>{item.type==="veg"?"🟢":"🔴"}</span>
                        <span style={{fontSize:10,color:item.confidence==="high"?C.green:item.confidence==="medium"?C.yellow:C.red,background:C.card2,padding:"1px 5px",borderRadius:4}}>{item.confidence}</span>
                      </div>
                      <div style={{fontSize:11,color:C.muted,marginTop:1}}>~{item.estimated_amount}{item.unit} · {item.cuisine}</div>
                      {item.description&&<div style={{fontSize:11,color:C.muted,marginTop:1,fontStyle:"italic"}}>{item.description}</div>}
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:16,fontWeight:700,color:C.accent}}>{item.calories}</div>
                    <div style={{fontSize:10,color:C.muted}}>kcal</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:10,marginLeft:30,marginTop:6,flexWrap:"wrap"}}>
                  {[["P",item.protein,"g",C.blue],["F",item.fat,"g",C.purple],["C",item.carbs,"g",C.green],["Na",item.sodium,"mg",C.red]].map(([l,v,u,col])=>(
                    <span key={l} style={{fontSize:11,color:col}}>{l}:{v}{u}</span>
                  ))}
                </div>
              </div>
            ))}
            {results.length>0&&(
              <button onClick={addSelected} disabled={selected.length===0}
                style={{width:"100%",marginTop:4,background:selected.length>0?`linear-gradient(135deg,${C.accent},${C.accent2})`:"#222",color:"#fff",border:"none",borderRadius:12,padding:14,fontWeight:800,fontSize:15,cursor:selected.length>0?"pointer":"not-allowed"}}>
                ＋ Add {selected.length} item{selected.length!==1?"s":""} to Log
              </button>
            )}
          </div>
        )}

        {mode==="barcode"&&(
          <div>
            <div style={{textAlign:"center",marginBottom:20,paddingTop:8}}>
              <div style={{fontSize:44,marginBottom:8}}>📊</div>
              <div style={{fontSize:15,fontWeight:700,color:C.text}}>Barcode / Product Lookup</div>
              <div style={{fontSize:12,color:C.muted,marginTop:4}}>Enter barcode number or product name</div>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <input value={bInput} onChange={e=>setBInput(e.target.value)} placeholder="8901058859501 or 'Maggi 2-Minute Noodles'"
                style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 14px",color:C.text,fontSize:14,outline:"none"}}
                onKeyDown={e=>e.key==="Enter"&&lookupBarcode()}/>
              <button onClick={lookupBarcode} disabled={loading} style={{background:C.purple,color:"#fff",border:"none",borderRadius:10,padding:"11px 16px",cursor:"pointer",fontWeight:700,fontSize:14}}>
                {loading?"⏳":"Search"}
              </button>
            </div>
            {bResult&&(
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16}}>
                <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:2}}>{bResult.name}</div>
                {bResult.brand&&<div style={{fontSize:12,color:C.muted,marginBottom:2}}>🏷️ {bResult.brand}</div>}
                <div style={{fontSize:11,color:bResult.type==="veg"?C.green:C.red,marginBottom:10}}>{bResult.type==="veg"?"🟢 Vegetarian":"🔴 Non-Vegetarian"}</div>
                {bResult.note&&<div style={{fontSize:11,color:C.yellow,background:C.yellow+"11",padding:"6px 10px",borderRadius:6,marginBottom:10}}>{bResult.note}</div>}
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                  <Pill label="Calories" value={bResult.calories} unit="kcal" color={C.accent}/>
                  <Pill label="Protein" value={bResult.protein} unit="g" color={C.blue}/>
                  <Pill label="Fat" value={bResult.fat} unit="g" color={C.purple}/>
                  <Pill label="Carbs" value={bResult.carbs} unit="g" color={C.green}/>
                  <Pill label="Fiber" value={bResult.fiber} unit="g" color="#86efac"/>
                  <Pill label="Sugar" value={bResult.sugar} unit="g" color={C.yellow}/>
                  <Pill label="Sodium" value={bResult.sodium} unit="mg" color={C.red}/>
                </div>
                <div style={{fontSize:11,color:C.muted,marginBottom:12}}>Per {bResult.serving_size}{bResult.serving_unit}</div>
                <button onClick={()=>{
                  onAdd({name:bResult.name,amount:bResult.serving_size,unit:bResult.serving_unit,
                    nutrition:{calories:bResult.calories,protein:bResult.protein,fat:bResult.fat,carbs:bResult.carbs,fiber:bResult.fiber||0,sugar:bResult.sugar||0,sodium:bResult.sodium},
                    type:bResult.type,category:"Packaged",source:"barcode"});
                  onCancel();
                }} style={{width:"100%",background:`linear-gradient(135deg,${C.purple},#9333ea)`,color:"#fff",border:"none",borderRadius:10,padding:12,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                  ＋ Add to Food Log
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RING ────────────────────────────────────────────────────────────────────
function Ring({cal,protein,fat,carbs,goal}){
  const pct=Math.min((cal/goal)*100,100),r=52,circ=2*Math.PI*r,dash=(circ*pct)/100;
  const rem=goal-Math.round(cal);
  return(
    <div style={{display:"flex",alignItems:"center",gap:16}}>
      <svg width={120} height={120}>
        <circle cx={60} cy={60} r={r} fill="none" stroke={C.border} strokeWidth={9}/>
        <circle cx={60} cy={60} r={r} fill="none" stroke={C.accent} strokeWidth={9}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 60 60)"
          style={{transition:"stroke-dasharray 0.6s"}}/>
        <text x={60} y={55} textAnchor="middle" fill={C.text} fontSize={19} fontWeight="800">{Math.round(cal)}</text>
        <text x={60} y={70} textAnchor="middle" fill={C.muted} fontSize={10}>/ {goal}</text>
      </svg>
      <div style={{flex:1}}>
        <div style={{fontSize:12,color:C.muted}}>{rem>=0?"Remaining":"Over by"}</div>
        <div style={{fontSize:24,fontWeight:800,color:rem>=0?C.green:C.red}}>{Math.abs(rem)}<span style={{fontSize:13,fontWeight:500}}> kcal</span></div>
        <div style={{display:"flex",gap:14,marginTop:8}}>
          {[["Protein",protein,C.blue],["Fat",fat,C.purple],["Carbs",carbs,C.green]].map(([l,v,c])=>(
            <div key={l}><div style={{fontSize:10,color:C.muted}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:c}}>{Math.round(v)}g</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BAR ─────────────────────────────────────────────────────────────────────
function Bar({label,value,max,color,unit="g"}){
  const pct=Math.min((value/max)*100,100);
  return(
    <div style={{marginBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
        <span style={{color:C.muted}}>{label}</span>
        <span style={{color:C.text,fontWeight:600}}>{value}{unit}</span>
      </div>
      <div style={{height:6,background:C.border,borderRadius:3,overflow:"hidden"}}>
        <div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:3,transition:"width 0.5s"}}/>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function App(){
  const [view,setView]=useState("home");
  const [log,setLog]=useState([]);
  const [meal,setMeal]=useState("Lunch");
  const [tab,setTab]=useState("log");
  const [goal,setGoal]=useState(2000);

  const T=log.reduce((a,it)=>({
    calories:a.calories+(it.nutrition?.calories||0),protein:a.protein+(it.nutrition?.protein||0),
    fat:a.fat+(it.nutrition?.fat||0),carbs:a.carbs+(it.nutrition?.carbs||0),
    fiber:a.fiber+(it.nutrition?.fiber||0),sugar:a.sugar+(it.nutrition?.sugar||0),sodium:a.sodium+(it.nutrition?.sodium||0),
  }),{calories:0,protein:0,fat:0,carbs:0,fiber:0,sugar:0,sodium:0});

  function saveRecipe(r){
    setLog(p=>[...p,{id:Date.now(),name:r.name,meal,amount:1,unit:"serving",
      nutrition:{calories:r.perSrv.cal,protein:r.perSrv.p,fat:r.perSrv.f,carbs:r.perSrv.c,fiber:r.perSrv.fi,sugar:r.perSrv.s,sodium:r.perSrv.na},
      type:"homemade",category:"Recipe",detail:`${r.ings.length} ingredients`,source:"recipe"}]);
    setView("home"); setTab("log");
  }
  function addScan(item){ setLog(p=>[...p,{id:Date.now(),meal,...item}]); }

  if(view==="recipe") return <RecipeBuilder onSave={saveRecipe} onCancel={()=>setView("home")}/>;
  if(view==="scan")   return <PlateScanner  onAdd={addScan}     onCancel={()=>setView("home")}/>;

  const meals=["Breakfast","Lunch","Dinner","Snack"];
  const byMeal=meals.reduce((a,m)=>({...a,[m]:log.filter(i=>i.meal===m)}),{});

  return(
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,maxWidth:480,margin:"0 auto",paddingBottom:90}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}`}</style>

      {/* HEADER */}
      <div style={{background:"linear-gradient(160deg,#180800,#0a0b0f 55%)",borderBottom:`1px solid ${C.border}`,padding:"18px 18px 14px",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:25,fontWeight:800,letterSpacing:"-0.5px"}}><span style={{color:C.accent}}>Nutri</span>Track</div>
            <div style={{fontSize:11,color:C.muted}}>{new Date().toLocaleDateString("en-IN",{weekday:"long",month:"short",day:"numeric"})}</div>
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"8px 12px",textAlign:"right"}}>
            <div style={{fontSize:10,color:C.muted}}>Daily Goal</div>
            <div style={{display:"flex",alignItems:"center",gap:4}}>
              <input type="number" value={goal} onChange={e=>setGoal(+e.target.value)}
                style={{width:58,background:"transparent",border:"none",color:C.accent,fontSize:16,fontWeight:700,outline:"none",textAlign:"right"}}/>
              <span style={{fontSize:10,color:C.muted}}>kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* MEAL TABS */}
      <div style={{padding:"12px 16px 0",display:"flex",gap:6}}>
        {meals.map(m=>(
          <button key={m} onClick={()=>setMeal(m)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",fontSize:11,cursor:"pointer",fontWeight:600,
            background:meal===m?C.accent:C.card,color:meal===m?"#fff":C.muted,transition:"all 0.2s"}}>
            {m==="Breakfast"?"☀️":m==="Lunch"?"🌤️":m==="Dinner"?"🌙":"🍎"}&nbsp;{m}
          </button>
        ))}
      </div>

      {/* ACTION CARDS */}
      <div style={{padding:"12px 16px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {[
          {icon:"🍳",title:"Recipe Builder",sub:"Add ingredients",action:()=>setView("recipe"),border:C.accent,bg:"#180800"},
          {icon:"📸",title:"Scan Plate",sub:"AI photo scan",action:()=>setView("scan"),border:C.blue,bg:"#00101a"},
          {icon:"📊",title:"Barcode",sub:"Packaged food",action:()=>setView("scan"),border:C.purple,bg:"#100018"},
        ].map(({icon,title,sub,action,border,bg})=>(
          <button key={title} onClick={action} style={{background:bg,border:`1px solid ${border}44`,borderRadius:14,padding:"14px 8px",cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:26,marginBottom:4}}>{icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.text,marginBottom:2}}>{title}</div>
            <div style={{fontSize:10,color:C.muted}}>{sub}</div>
          </button>
        ))}
      </div>

      {/* TABS */}
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,margin:"0 16px"}}>
        {[["log",`📋 Log (${log.length})`],["summary","📊 Summary"]].map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 0",fontSize:13,fontWeight:600,border:"none",cursor:"pointer",background:"transparent",
            color:tab===t?C.accent:C.muted,borderBottom:tab===t?`2px solid ${C.accent}`:"2px solid transparent"}}>
            {l}
          </button>
        ))}
      </div>

      <div style={{padding:"14px 16px"}}>
        {tab==="log"&&(
          <>
            {log.length===0&&(
              <div style={{textAlign:"center",padding:"44px 20px"}}>
                <div style={{fontSize:44,marginBottom:12}}>🍽️</div>
                <div style={{fontSize:15,fontWeight:700,color:C.text}}>Nothing logged yet</div>
                <div style={{fontSize:12,color:C.muted,marginTop:6}}>Use Recipe Builder to add home-cooked meals,<br/>or scan your plate with the AI camera</div>
              </div>
            )}
            {meals.map(m=>{
              const items=byMeal[m]; if(!items.length) return null;
              const mCal=items.reduce((s,i)=>s+(i.nutrition?.calories||0),0);
              return(
                <div key={m} style={{marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontSize:12,fontWeight:700,color:C.accent}}>{m}</span>
                    <span style={{fontSize:12,color:C.muted}}>{Math.round(mCal)} kcal</span>
                  </div>
                  {items.map(item=>(
                    <div key={item.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 12px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                          <span style={{fontSize:12}}>{item.source==="recipe"?"🍳":item.source==="scan"?"📸":item.source==="barcode"?"📊":"🍽️"}</span>
                          <span style={{fontSize:13,fontWeight:700}}>{item.name}</span>
                        </div>
                        <div style={{fontSize:11,color:C.muted}}>
                          {item.amount} {item.unit}
                          {item.detail?` · ${item.detail}`:` · P:${+(item.nutrition?.protein||0).toFixed(1)}g F:${+(item.nutrition?.fat||0).toFixed(1)}g C:${+(item.nutrition?.carbs||0).toFixed(1)}g`}
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontSize:15,fontWeight:700,color:C.accent}}>{Math.round(item.nutrition?.calories||0)}</div>
                          <div style={{fontSize:10,color:C.muted}}>kcal</div>
                        </div>
                        <button onClick={()=>setLog(p=>p.filter(i=>i.id!==item.id))} style={{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:16}}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            {log.length>0&&<button onClick={()=>setLog([])} style={{width:"100%",background:C.card,color:C.red,border:`1px solid ${C.red}33`,borderRadius:10,padding:10,cursor:"pointer",fontSize:13,fontWeight:600}}>Clear All Entries</button>}
          </>
        )}

        {tab==="summary"&&(
          <>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:14}}>
              <Ring cal={T.calories} protein={T.protein} fat={T.fat} carbs={T.carbs} goal={goal}/>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:10}}>Daily Nutrition</div>
              <Bar label="Protein" value={+T.protein.toFixed(1)} max={200} color={C.blue}/>
              <Bar label="Carbohydrates" value={+T.carbs.toFixed(1)} max={300} color={C.green}/>
              <Bar label="Fat" value={+T.fat.toFixed(1)} max={80} color={C.purple}/>
              <Bar label="Fiber" value={+T.fiber.toFixed(1)} max={38} color="#86efac"/>
              <Bar label="Sugar" value={+T.sugar.toFixed(1)} max={50} color={C.yellow}/>
              <Bar label="Sodium" value={+T.sodium.toFixed(0)} max={2300} color={C.red} unit="mg"/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              {[["🔥",Math.round(T.calories),"kcal","Calories",C.accent],["💪",+T.protein.toFixed(1),"g","Protein",C.blue],["🫙",+T.fat.toFixed(1),"g","Fat",C.purple],["🌾",+T.carbs.toFixed(1),"g","Carbs",C.green],["🌿",+T.fiber.toFixed(1),"g","Fiber","#86efac"],["🧂",Math.round(T.sodium),"mg","Sodium",C.red]].map(([ic,v,u,l,c])=>(
                <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
                  <div style={{fontSize:18,marginBottom:2}}>{ic}</div>
                  <div style={{fontSize:16,fontWeight:800,color:c}}>{v}</div>
                  <div style={{fontSize:10,color:C.muted}}>{u} {l}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:10}}>Entry Sources</div>
              {[["🍳 Recipe Builder",log.filter(i=>i.source==="recipe").length,"Home-cooked meals built ingredient by ingredient"],["📸 Plate Scan",log.filter(i=>i.source==="scan").length,"AI-identified from photos"],["📊 Barcode",log.filter(i=>i.source==="barcode").length,"Packaged food lookup"],["🍽️ Other",log.filter(i=>!["recipe","scan","barcode"].includes(i.source)).length,"Manually added items"]].map(([l,n,sub])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div><div style={{fontSize:13,color:C.text}}>{l}</div><div style={{fontSize:11,color:C.muted}}>{sub}</div></div>
                  <span style={{fontSize:13,fontWeight:700,color:n>0?C.accent:C.muted}}>{n}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
