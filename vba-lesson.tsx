import { useState, useRef } from "react";

// ── MASCOTA BIT ────────────────────────────────────────────────────
function Bit({ size=60, mood="normal" }) {
  const eyeColor = mood==="happy"?"#1D9E75":mood==="think"?"#BA7517":"#7F77DD";
  const mouthPath = mood==="happy"?"M44,46 Q50,52 56,46":mood==="think"?"M44,48 Q50,48 56,48":"M44,47 Q50,50 56,47";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="62" rx="28" ry="30" fill="#23213a" stroke="#7F77DD" strokeWidth="1.5"/>
      <ellipse cx="22" cy="70" rx="12" ry="18" fill="#1a1828" stroke="#534AB7" strokeWidth="1" transform="rotate(-15 22 70)"/>
      <ellipse cx="78" cy="70" rx="12" ry="18" fill="#1a1828" stroke="#534AB7" strokeWidth="1" transform="rotate(15 78 70)"/>
      <circle cx="50" cy="36" r="22" fill="#23213a" stroke="#7F77DD" strokeWidth="1.5"/>
      <polygon points="32,18 28,6 38,14" fill="#23213a" stroke="#7F77DD" strokeWidth="1"/>
      <polygon points="68,18 72,6 62,14" fill="#23213a" stroke="#7F77DD" strokeWidth="1"/>
      <ellipse cx="50" cy="38" rx="16" ry="14" fill="#16151d"/>
      <circle cx="42" cy="34" r="8" fill="#0f0f13" stroke={eyeColor} strokeWidth="1.5"/>
      <circle cx="58" cy="34" r="8" fill="#0f0f13" stroke={eyeColor} strokeWidth="1.5"/>
      <circle cx="42" cy="34" r="5" fill={eyeColor}/>
      <circle cx="58" cy="34" r="5" fill={eyeColor}/>
      <circle cx="43.5" cy="32.5" r="1.5" fill="#fff"/>
      <circle cx="59.5" cy="32.5" r="1.5" fill="#fff"/>
      <rect x="32" y="27" width="16" height="14" rx="4" fill="none" stroke="#c5bfff" strokeWidth="1.2"/>
      <rect x="51" y="27" width="16" height="14" rx="4" fill="none" stroke="#c5bfff" strokeWidth="1.2"/>
      <line x1="48" y1="33" x2="51" y2="33" stroke="#c5bfff" strokeWidth="1.2"/>
      <path d={mouthPath} stroke="#c5bfff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <polygon points="47,42 53,42 50,47" fill="#BA7517"/>
      <ellipse cx="50" cy="68" rx="16" ry="18" fill="#1a1828" stroke="#534AB7" strokeWidth="0.8"/>
      <ellipse cx="42" cy="91" rx="7" ry="3" fill="#534AB7"/>
      <ellipse cx="58" cy="91" rx="7" ry="3" fill="#534AB7"/>
    </svg>
  );
}

// ── DATOS ──────────────────────────────────────────────────────────
const VBA_BLOCKS = [
  { id:"b1", code:"Sub NuevaFactura()", color:"#7F77DD", label:"Inicio del procedimiento", hint:"Todo procedimiento VBA empieza con Sub y un nombre." },
  { id:"b2", code:"  Dim numFactura As Integer", color:"#1D9E75", label:"Declarar variable", hint:"Dim crea una variable. As Integer significa que guardará números enteros." },
  { id:"b3", code:'  numFactura = Range("B2").Value', color:"#378ADD", label:"Leer valor de celda", hint:"Range(\"B2\") accede a la celda B2. .Value lee su contenido." },
  { id:"b4", code:"  numFactura = numFactura + 1", color:"#BA7517", label:"Incrementar en 1", hint:"Sumamos 1 al número actual para generar el siguiente consecutivo." },
  { id:"b5", code:'  Range("B2").Value = numFactura', color:"#D85A30", label:"Escribir nuevo valor", hint:"Guardamos el nuevo número de regreso en la celda B2." },
  { id:"b6", code:'  MsgBox "Factura #" & numFactura & " creada"', color:"#D4537E", label:"Mostrar mensaje", hint:"MsgBox muestra una ventana emergente con el número de factura." },
  { id:"b7", code:"End Sub", color:"#7F77DD", label:"Fin del procedimiento", hint:"End Sub cierra el procedimiento. ¡Sin esto el código no funciona!" },
];

const CORRECT_ORDER = ["b1","b2","b3","b4","b5","b6","b7"];

const INVOICE_FIELDS = [
  { id:"f1", label:"Número de factura", placeholder:"001", type:"number", correct:"001" },
  { id:"f2", label:"Fecha de emisión", placeholder:"22/03/2026", type:"text", correct:"22/03/2026" },
  { id:"f3", label:"Nombre del cliente", placeholder:"Empresa ABC S.A.S", type:"text", correct:"Empresa ABC S.A.S" },
  { id:"f4", label:"NIT del cliente", placeholder:"900.123.456-7", type:"text", correct:"900.123.456-7" },
  { id:"f5", label:"Descripción del servicio", placeholder:"Consultoría contable", type:"text", correct:"Consultoría contable" },
  { id:"f6", label:"Valor antes de IVA ($)", placeholder:"1000000", type:"number", correct:"1000000" },
  { id:"f7", label:"IVA (19%)", placeholder:"190000", type:"number", correct:"190000" },
  { id:"f8", label:"Total a pagar ($)", placeholder:"1190000", type:"number", correct:"1190000" },
];

const STEPS = [
  { id:0, title:"¿Qué es VBA?", icon:"🧠" },
  { id:1, title:"Bloques de código", icon:"🧩" },
  { id:2, title:"Arma el procedimiento", icon:"⚙️" },
  { id:3, title:"Simulador de factura", icon:"🧾" },
  { id:4, title:"¡Practica en Excel!", icon:"📊" },
];

const MESSAGES = {
  normal: ["¡Hola! Soy Bit. Hoy aprenderás VBA desde cero 🦉","Te guío paso a paso. ¡Sin código previo necesitas!"],
  think: ["Lee cada bloque con calma...","Piensa en el orden lógico: primero empezar, luego declarar..."],
  happy: ["¡Excelente! ¡Lo lograste! 🎉","¡Eres un crack de VBA! 🚀","¡Perfecto! Bit está muy orgulloso de ti 🦉✨"],
  error: ["¡Casi! Revisa el orden de los pasos...","Piensa: ¿qué debe pasar primero?","¡Sigue intentando, tú puedes! 💪"],
};

export default function App() {
  const [step, setStep] = useState(0);
  const [dragBlocks, setDragBlocks] = useState([...VBA_BLOCKS].sort(()=>Math.random()-0.5));
  const [dropZone, setDropZone] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [invoiceDone, setInvoiceDone] = useState(false);
  const [bitMood, setBitMood] = useState("normal");
  const [bitMsg, setBitMsg] = useState(0);
  const [progress, setProgress] = useState([true,false,false,false,false]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [animCelebrate, setAnimCelebrate] = useState(false);

  function msg() { return MESSAGES[bitMood][bitMsg % MESSAGES[bitMood].length]; }

  function goStep(s) {
    setStep(s);
    const p=[...progress]; p[s]=true; setProgress(p);
    setBitMood("normal"); setBitMsg(0); setChecked(false);
  }

  // ── DRAG ──────────────────────────────────────────────────────
  function onDragStart(e, block, from) {
    setDragging({block, from});
    e.dataTransfer.effectAllowed="move";
  }
  function onDragOverZone(e, target) { e.preventDefault(); setDragOver(target); }
  function onDrop(e, target) {
    e.preventDefault(); setDragOver(null);
    if (!dragging) return;
    const {block, from} = dragging;
    if (from==="palette" && target==="drop") {
      setDragBlocks(prev=>prev.filter(b=>b.id!==block.id));
      setDropZone(prev=>[...prev, block]);
    } else if (from==="drop" && target==="palette") {
      setDropZone(prev=>prev.filter(b=>b.id!==block.id));
      setDragBlocks(prev=>[...prev, block]);
    } else if (from==="drop" && typeof target==="number") {
      // reorder in drop zone
      setDropZone(prev=>{
        const arr=[...prev].filter(b=>b.id!==block.id);
        arr.splice(target,0,block);
        return arr;
      });
    }
    setDragging(null);
  }
  function onDropReorder(e, idx) {
    e.preventDefault(); setDragOver(null);
    if (!dragging || dragging.from!=="drop") return;
    const {block} = dragging;
    setDropZone(prev=>{
      const arr=prev.filter(b=>b.id!==block.id);
      arr.splice(idx,0,block);
      return arr;
    });
    setDragging(null);
  }

  function checkOrder() {
    setChecked(true);
    const isCorrect = dropZone.length===7 && dropZone.every((b,i)=>b.id===CORRECT_ORDER[i]);
    setCorrect(isCorrect);
    if (isCorrect) {
      setBitMood("happy"); setBitMsg(0);
      setAnimCelebrate(true);
      setTimeout(()=>setAnimCelebrate(false),2000);
      const p=[...progress]; p[2]=true; setProgress(p);
    } else {
      setBitMood("error"); setBitMsg(0);
    }
  }

  function resetDrag() {
    setDragBlocks([...VBA_BLOCKS].sort(()=>Math.random()-0.5));
    setDropZone([]); setChecked(false); setCorrect(false); setBitMood("think");
  }

  function checkInvoice() {
    let ok=0;
    INVOICE_FIELDS.forEach(f=>{ if((invoiceData[f.id]||"").toString().trim()) ok++; });
    if (ok>=6) {
      setInvoiceDone(true); setBitMood("happy"); setBitMsg(1);
      setAnimCelebrate(true); setTimeout(()=>setAnimCelebrate(false),2500);
      const p=[...progress]; p[3]=true; setProgress(p);
    }
  }

  const pct = Math.round((progress.filter(Boolean).length/5)*100);

  const S = {
    wrap: { background:"#0f0f13", color:"#e8e6f0", fontFamily:"system-ui,sans-serif", fontSize:14, minHeight:"100vh", padding:0 },
    card: { background:"#1e1d28", border:"1px solid #2a2840", borderRadius:10, padding:"16px 18px", marginBottom:14 },
    btn: (v="def") => ({ padding:"8px 18px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:500,
      background:v==="pri"?"#7F77DD":v==="green"?"#1D9E75":v==="ghost"?"transparent":"#2a2840",
      color:v==="pri"||v==="green"?"#fff":v==="ghost"?"#9897a9":"#c8c4e0" }),
    badge: (c) => ({ background:c+"22", color:c, fontSize:11, padding:"3px 10px", borderRadius:20, display:"inline-block" }),
    input: { width:"100%", background:"#0f0f13", border:"1px solid #2a2840", borderRadius:7, color:"#e8e6f0", padding:"8px 12px", fontSize:13, boxSizing:"border-box" },
  };

  return (
    <div style={S.wrap}>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes celebrate{0%{transform:scale(1)}30%{transform:scale(1.3) rotate(-10deg)}60%{transform:scale(1.2) rotate(8deg)}100%{transform:scale(1)}}
        @keyframes pop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}}
        @keyframes confetti{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(60px) rotate(360deg);opacity:0}}
        .blk{transition:transform .15s;} .blk:hover{transform:translateY(-2px);}
        .step-btn{transition:all .15s;} .step-btn:hover{background:#23213a!important;}
        input:focus,textarea:focus{outline:none;border-color:#7F77DD!important;}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#2a2840;border-radius:2px}
      `}</style>

      {/* HEADER */}
      <div style={{background:"#16151d",borderBottom:"1px solid #2a2840",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Bit size={36}/>
          <div>
            <div style={{fontWeight:500,color:"#c5bfff",fontSize:15}}>Fundamentos de VBA</div>
            <div style={{color:"#9897a9",fontSize:11}}>Módulo: Macros y Seguridad · Clase 3</div>
          </div>
        </div>
        {/* PROGRESS BAR */}
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:120,background:"#0f0f13",borderRadius:6,height:8}}>
            <div style={{width:`${pct}%`,height:8,borderRadius:6,background:"#7F77DD",transition:"width .4s"}}/>
          </div>
          <span style={{color:"#7F77DD",fontSize:13,fontWeight:500}}>{pct}%</span>
        </div>
      </div>

      {/* STEP NAV */}
      <div style={{display:"flex",gap:4,padding:"12px 20px",background:"#16151d",borderBottom:"1px solid #2a2840",overflowX:"auto"}}>
        {STEPS.map((st,i)=>(
          <button key={st.id} className="step-btn" onClick={()=>goStep(i)}
            style={{...S.btn(step===i?"pri":"def"), padding:"6px 14px", fontSize:12, display:"flex", alignItems:"center", gap:6,
              opacity: progress[i]||i===0||progress[i-1]?1:0.4,
              border: step===i?"none":"1px solid #2a2840",
            }}>
            <span>{st.icon}</span>
            <span>{st.title}</span>
            {progress[i] && i>0 && <span style={{color:step===i?"#fff":"#1D9E75"}}>✓</span>}
          </button>
        ))}
      </div>

      <div style={{padding:"20px", maxWidth:860, margin:"0 auto"}}>

        {/* BIT MESSAGE */}
        <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:20,...S.card,background:"#1a1828",border:`1px solid ${bitMood==="happy"?"#1D9E75":bitMood==="error"?"#D85A30":"#2a2840"}`}}>
          <div style={{animation:animCelebrate?"celebrate 0.6s ease":"float 3s ease-in-out infinite",flexShrink:0}}>
            <Bit size={52} mood={bitMood}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:500,color:bitMood==="happy"?"#1D9E75":bitMood==="error"?"#D85A30":"#c5bfff",fontSize:14,marginBottom:4}}>
              {bitMood==="happy"?"¡Bit está feliz!":bitMood==="error"?"¡Bit te anima!":"Bit dice..."}
            </div>
            <div style={{color:"#b0adc4",lineHeight:1.7}}>{msg()}</div>
            {animCelebrate && (
              <div style={{display:"flex",gap:6,marginTop:8}}>
                {["🎉","⭐","🚀","✨","🦉"].map((e,i)=>(
                  <span key={i} style={{fontSize:20,animation:`confetti 1s ease ${i*0.15}s both`}}>{e}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── PASO 0: ¿QUÉ ES VBA? ────────────────────────────────── */}
        {step===0 && (
          <div>
            <div style={{...S.card,borderLeft:"3px solid #7F77DD"}}>
              <h2 style={{margin:"0 0 12px",color:"#c5bfff",fontSize:18,fontWeight:500}}>¿Qué es Visual Basic for Applications?</h2>
              <p style={{color:"#b0adc4",lineHeight:1.8,margin:"0 0 16px"}}>
                <strong style={{color:"#c5bfff"}}>VBA</strong> es el lenguaje de programación de Excel. Permite automatizar tareas repetitivas como generar facturas, crear reportes o formatear datos con un solo clic.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:16}}>
                {[
                  {icon:"🤖",title:"Automatiza",desc:"Tareas que haces a mano, VBA las hace en segundos"},
                  {icon:"📋",title:"Registra",desc:"Guarda la grabadora de macros para generar código automático"},
                  {icon:"🧮",title:"Calcula",desc:"Procesa cientos de datos financieros sin errores"},
                  {icon:"🧾",title:"Genera",desc:"Crea facturas, informes y reportes automáticamente"},
                ].map(c=>(
                  <div key={c.title} style={{background:"#23213a",borderRadius:10,padding:"14px",textAlign:"center"}}>
                    <div style={{fontSize:28,marginBottom:8}}>{c.icon}</div>
                    <div style={{fontWeight:500,color:"#c5bfff",marginBottom:4,fontSize:13}}>{c.title}</div>
                    <div style={{color:"#9897a9",fontSize:12,lineHeight:1.5}}>{c.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{background:"#0f0f13",borderRadius:8,padding:"14px 18px",marginBottom:16}}>
                <div style={{color:"#9897a9",fontSize:12,marginBottom:8}}>Así luce un procedimiento VBA:</div>
                <pre style={{margin:0,color:"#c5bfff",fontSize:13,lineHeight:1.8}}>
{`Sub NuevaFactura()
  Dim numFactura As Integer
  numFactura = Range("B2").Value
  numFactura = numFactura + 1
  Range("B2").Value = numFactura
  MsgBox "Factura #" & numFactura
End Sub`}
                </pre>
              </div>
              <div style={{background:"#7F77DD22",borderRadius:8,padding:"12px 16px",borderLeft:"3px solid #7F77DD"}}>
                <strong style={{color:"#c5bfff"}}>¿Y esto qué hace?</strong>
                <p style={{color:"#b0adc4",margin:"6px 0 0",fontSize:13,lineHeight:1.7}}>
                  Lee el número de la última factura de la celda B2, le suma 1 y lo guarda de vuelta. ¡En 5 líneas tienes un contador automático de facturas!
                </p>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <button style={S.btn("pri")} onClick={()=>{goStep(1);setBitMood("think");setBitMsg(0);}}>Siguiente: Ver los bloques →</button>
            </div>
          </div>
        )}

        {/* ── PASO 1: BLOQUES ──────────────────────────────────────── */}
        {step===1 && (
          <div>
            <div style={{...S.card,marginBottom:20}}>
              <h3 style={{margin:"0 0 4px",color:"#c5bfff",fontWeight:500}}>Conoce cada bloque de código</h3>
              <p style={{margin:"0 0 16px",color:"#9897a9",fontSize:13}}>Haz clic en cada bloque para ver qué hace. Luego los usarás para armar el procedimiento completo.</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {VBA_BLOCKS.map((b,i)=>(
                  <div key={b.id} className="blk" onClick={()=>setSelectedBlock(selectedBlock===b.id?null:b.id)}
                    style={{borderRadius:9,overflow:"hidden",cursor:"pointer",border:`1.5px solid ${selectedBlock===b.id?b.color:"#2a2840"}`,transition:"border .2s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:selectedBlock===b.id?b.color+"22":"#16151d"}}>
                      <span style={{...S.badge(b.color),minWidth:22,textAlign:"center",fontWeight:700}}>{i+1}</span>
                      <code style={{flex:1,color:b.color,fontSize:13,fontFamily:"monospace"}}>{b.code}</code>
                      <span style={{color:"#9897a9",fontSize:12}}>{b.label}</span>
                      <span style={{color:selectedBlock===b.id?b.color:"#555",fontSize:12}}>{selectedBlock===b.id?"▲":"▼"}</span>
                    </div>
                    {selectedBlock===b.id && (
                      <div style={{padding:"12px 14px",background:"#1a1828",borderTop:`1px solid ${b.color}44`,animation:"pop .2s ease"}}>
                        <div style={{color:"#b0adc4",fontSize:13,lineHeight:1.7}}>💡 {b.hint}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <button style={S.btn()} onClick={()=>goStep(0)}>← Anterior</button>
              <button style={S.btn("pri")} onClick={()=>{goStep(2);setBitMood("think");}}>¡Listo! Voy a armar el código →</button>
            </div>
          </div>
        )}

        {/* ── PASO 2: DRAG & DROP ───────────────────────────────────── */}
        {step===2 && (
          <div>
            <div style={{...S.card,marginBottom:16}}>
              <h3 style={{margin:"0 0 4px",color:"#c5bfff",fontWeight:500}}>⚙️ Arma el procedimiento</h3>
              <p style={{margin:0,color:"#9897a9",fontSize:13}}>Arrastra los bloques desde la paleta hacia la zona de código, en el orden correcto.</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              {/* PALETTE */}
              <div>
                <div style={{color:"#9897a9",fontSize:12,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>📦 Bloques disponibles</div>
                <div style={{background:"#16151d",borderRadius:10,padding:12,minHeight:200,border:`2px dashed ${dragOver==="palette"?"#7F77DD":"#2a2840"}`,transition:"border .2s"}}
                  onDragOver={e=>onDragOverZone(e,"palette")} onDrop={e=>onDrop(e,"palette")} onDragLeave={()=>setDragOver(null)}>
                  {dragBlocks.length===0 && <div style={{color:"#444",textAlign:"center",padding:30,fontSize:12}}>Todos los bloques están en el código ✓</div>}
                  {dragBlocks.map(b=>(
                    <div key={b.id} className="blk" draggable onDragStart={e=>onDragStart(e,b,"palette")}
                      style={{padding:"8px 12px",borderRadius:8,marginBottom:8,cursor:"grab",background:b.color+"22",border:`1.5px solid ${b.color}44`,display:"flex",alignItems:"center",gap:8,userSelect:"none"}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:b.color,flexShrink:0}}/>
                      <code style={{fontSize:12,color:b.color,fontFamily:"monospace",flex:1}}>{b.code}</code>
                      <span style={{fontSize:10,color:"#555"}}>⠿</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* DROP ZONE */}
              <div>
                <div style={{color:"#9897a9",fontSize:12,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>💻 Tu procedimiento</div>
                <div style={{background:"#0f0f13",borderRadius:10,padding:12,minHeight:200,border:`2px dashed ${dragOver==="drop"?"#7F77DD":"#2a2840"}`,transition:"border .2s",fontFamily:"monospace"}}
                  onDragOver={e=>onDragOverZone(e,"drop")} onDrop={e=>onDrop(e,"drop")} onDragLeave={()=>setDragOver(null)}>
                  {dropZone.length===0 && <div style={{color:"#333",textAlign:"center",padding:30,fontSize:12}}>Arrastra los bloques aquí →</div>}
                  {dropZone.map((b,i)=>{
                    const isWrong = checked && !correct && b.id!==CORRECT_ORDER[i];
                    const isRight = checked && correct;
                    return (
                      <div key={b.id} draggable onDragStart={e=>onDragStart(e,b,"drop")}
                        onDragOver={e=>{e.preventDefault();setDragOver("drop_"+i);}}
                        onDrop={e=>onDropReorder(e,i)}
                        style={{padding:"7px 12px",borderRadius:7,marginBottom:6,cursor:"grab",
                          background:isRight?"#1D9E7522":isWrong?"#D85A3022":b.color+"18",
                          border:`1.5px solid ${isRight?"#1D9E75":isWrong?"#D85A30":b.color+"55"}`,
                          display:"flex",alignItems:"center",gap:8,userSelect:"none",transition:"all .2s"}}>
                        <span style={{color:"#444",fontSize:11,width:16,textAlign:"center"}}>{i+1}</span>
                        <code style={{fontSize:12,color:isRight?"#1D9E75":isWrong?"#f0997b":b.color,flex:1,fontFamily:"monospace"}}>{b.code}</code>
                        {isWrong && <span style={{fontSize:11,color:"#D85A30"}}>✗</span>}
                        {isRight && <span style={{fontSize:11,color:"#1D9E75"}}>✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* FEEDBACK */}
            {checked && (
              <div style={{...S.card,background:correct?"#1D9E7511":"#D85A3011",borderColor:correct?"#1D9E75":"#D85A30",marginBottom:16,animation:"pop .3s ease"}}>
                <div style={{fontWeight:500,color:correct?"#1D9E75":"#D85A30",marginBottom:4}}>
                  {correct?"🎉 ¡Perfecto! El orden es correcto":"❌ El orden no es correcto. ¡Inténtalo de nuevo!"}
                </div>
                {correct && <p style={{margin:0,color:"#b0adc4",fontSize:13}}>Lograste armar el procedimiento VBA para asignar números de factura. ¡Ahora practícalo en Excel!</p>}
              </div>
            )}
            <div style={{display:"flex",gap:10,justifyContent:"space-between",flexWrap:"wrap"}}>
              <div style={{display:"flex",gap:8}}>
                <button style={S.btn()} onClick={()=>goStep(1)}>← Anterior</button>
                <button style={S.btn()} onClick={resetDrag}>🔄 Reiniciar</button>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={{...S.btn("pri"),opacity:dropZone.length<7?0.5:1}} onClick={checkOrder} disabled={dropZone.length<7}>
                  ✓ Verificar orden
                </button>
                {correct && <button style={S.btn("green")} onClick={()=>goStep(3)}>Siguiente: Factura →</button>}
              </div>
            </div>
          </div>
        )}

        {/* ── PASO 3: SIMULADOR DE FACTURA ─────────────────────────── */}
        {step===3 && (
          <div>
            <div style={{...S.card,marginBottom:16}}>
              <h3 style={{margin:"0 0 4px",color:"#c5bfff",fontWeight:500}}>🧾 Simulador de Factura</h3>
              <p style={{margin:0,color:"#9897a9",fontSize:13}}>Completa todos los campos como si fueras a registrar una factura real. Así entenderás qué datos automatiza tu macro VBA.</p>
            </div>
            {/* FACTURA VISUAL */}
            <div style={{background:"#fff",borderRadius:12,padding:"24px 28px",marginBottom:16,color:"#1a1a2e",boxShadow:"0 4px 24px #0006"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,borderBottom:"2px solid #7F77DD",paddingBottom:16}}>
                <div>
                  <div style={{fontSize:22,fontWeight:700,color:"#534AB7"}}>FACTURA DE VENTA</div>
                  <div style={{fontSize:12,color:"#666",marginTop:2}}>ITM — Institución Universitaria</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:12,color:"#666"}}>No. de Factura</div>
                  <input style={{...S.input,background:"#f5f4ff",border:"2px solid #7F77DD",color:"#534AB7",fontWeight:700,fontSize:18,width:100,textAlign:"center",borderRadius:8}}
                    value={invoiceData["f1"]||""} onChange={e=>setInvoiceData({...invoiceData,f1:e.target.value})} placeholder="001"/>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                {INVOICE_FIELDS.slice(1,4).map(f=>(
                  <div key={f.id}>
                    <div style={{fontSize:11,color:"#888",marginBottom:4,fontWeight:500}}>{f.label.toUpperCase()}</div>
                    <input style={{...S.input,background:"#f8f8ff",border:"1.5px solid #ddd",color:"#333",borderRadius:6,fontSize:13}}
                      value={invoiceData[f.id]||""} onChange={e=>setInvoiceData({...invoiceData,[f.id]:e.target.value})} placeholder={f.placeholder}/>
                  </div>
                ))}
              </div>
              <div style={{background:"#f8f8ff",borderRadius:8,overflow:"hidden",marginBottom:16}}>
                <div style={{display:"grid",gridTemplateColumns:"3fr 1fr 1fr 1fr",background:"#534AB7",color:"#fff",padding:"8px 12px",fontSize:12,fontWeight:500,gap:8}}>
                  <span>Descripción</span><span style={{textAlign:"right"}}>Cantidad</span><span style={{textAlign:"right"}}>Precio</span><span style={{textAlign:"right"}}>Total</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"3fr 1fr 1fr 1fr",padding:"10px 12px",gap:8,alignItems:"center"}}>
                  <input style={{...S.input,background:"transparent",border:"1.5px solid #ddd",color:"#333",borderRadius:6,fontSize:13}}
                    value={invoiceData["f5"]||""} onChange={e=>setInvoiceData({...invoiceData,f5:e.target.value})} placeholder="Descripción del servicio"/>
                  <input style={{...S.input,background:"transparent",border:"1.5px solid #ddd",color:"#333",borderRadius:6,fontSize:13,textAlign:"right"}}
                    value="1" readOnly/>
                  <input style={{...S.input,background:"transparent",border:"1.5px solid #ddd",color:"#333",borderRadius:6,fontSize:13,textAlign:"right"}}
                    value={invoiceData["f6"]||""} onChange={e=>setInvoiceData({...invoiceData,f6:e.target.value})} placeholder="1000000"/>
                  <input style={{...S.input,background:"transparent",border:"1.5px solid #ddd",color:"#333",borderRadius:6,fontSize:13,textAlign:"right"}}
                    value={invoiceData["f6"]||""} readOnly/>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"flex-end"}}>
                <div style={{width:220}}>
                  {[["Subtotal",invoiceData["f6"]||"—"],["IVA 19%",invoiceData["f7"]||"—"],["TOTAL",invoiceData["f8"]||"—"]].map(([l,v],i)=>(
                    <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<2?"1px solid #eee":"none",fontWeight:i===2?700:400,fontSize:i===2?15:13}}>
                      <span style={{color:"#666"}}>{l}</span>
                      {i<2?<span style={{color:"#333"}}>{v?`$${Number(v).toLocaleString()}`:"—"}</span>:
                        <input style={{...S.input,width:120,textAlign:"right",background:"transparent",border:"2px solid #534AB7",color:"#534AB7",fontWeight:700,fontSize:14,borderRadius:6}}
                          value={invoiceData["f8"]||""} onChange={e=>setInvoiceData({...invoiceData,f8:e.target.value})} placeholder="1190000"/>}
                    </div>
                  ))}
                </div>
              </div>
              {invoiceDone && (
                <div style={{background:"#1D9E7522",border:"1.5px solid #1D9E75",borderRadius:8,padding:"10px 14px",marginTop:16,animation:"pop .3s ease",textAlign:"center"}}>
                  <span style={{color:"#1D9E75",fontWeight:500}}>✅ ¡Factura completada! Bit registró tu progreso 🦉</span>
                </div>
              )}
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"space-between",flexWrap:"wrap"}}>
              <button style={S.btn()} onClick={()=>goStep(2)}>← Anterior</button>
              <div style={{display:"flex",gap:8}}>
                {!invoiceDone && <button style={S.btn("pri")} onClick={checkInvoice}>✓ Registrar factura</button>}
                {invoiceDone && <button style={S.btn("green")} onClick={()=>goStep(4)}>¡Practicar en Excel! →</button>}
              </div>
            </div>
          </div>
        )}

        {/* ── PASO 4: IR A EXCEL ───────────────────────────────────── */}
        {step===4 && (
          <div>
            <div style={{...S.card,borderLeft:"3px solid #1D9E75",marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
                <div style={{animation:"celebrate 0.6s ease"}}><Bit size={60} mood="happy"/></div>
                <div>
                  <h3 style={{margin:"0 0 4px",color:"#1D9E75",fontWeight:500,fontSize:18}}>🎉 ¡Completaste la lección!</h3>
                  <p style={{margin:0,color:"#b0adc4",fontSize:13}}>Bit está muy orgulloso de ti. Ahora es momento de practicarlo en Excel real.</p>
                </div>
              </div>
              {/* LOGROS */}
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
                {[
                  {icon:"🧠",label:"VBA entendido",c:"#7F77DD"},
                  {icon:"🧩",label:"Bloques aprendidos",c:"#1D9E75"},
                  {icon:"⚙️",label:"Código armado",c:"#378ADD"},
                  {icon:"🧾",label:"Factura simulada",c:"#BA7517"},
                ].map(l=>(
                  <div key={l.label} style={{background:l.c+"22",border:`1px solid ${l.c}44`,borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:18}}>{l.icon}</span>
                    <span style={{color:l.c,fontSize:12,fontWeight:500}}>{l.label}</span>
                    <span style={{color:l.c}}>✓</span>
                  </div>
                ))}
              </div>
            </div>
            {/* INSTRUCCIONES EXCEL */}
            <div style={S.card}>
              <h4 style={{margin:"0 0 12px",color:"#c5bfff",fontWeight:500}}>📋 Instrucciones para Excel</h4>
              {[
                "Abre Excel y crea un nuevo libro",
                'En la celda B1 escribe "Número de Factura" y en B2 escribe 1',
                "Presiona Alt + F11 para abrir el Editor de Visual Basic",
                "Ve a Insertar → Módulo",
                "Copia y pega el siguiente código:",
                "Cierra el editor y presiona Alt + F8, selecciona NuevaFactura y haz clic en Ejecutar",
                "¡Observa cómo B2 cambia de número automáticamente!",
              ].map((inst,i)=>(
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"8px 0",borderBottom:i<6?"1px solid #2a2840":"none"}}>
                  <span style={{...S.badge("#7F77DD"),minWidth:22,textAlign:"center",flexShrink:0,fontWeight:700}}>{i+1}</span>
                  <span style={{color:"#b0adc4",fontSize:13,lineHeight:1.6}}>{inst}</span>
                </div>
              ))}
              <div style={{background:"#0f0f13",borderRadius:8,padding:"14px 18px",marginTop:14}}>
                <div style={{color:"#534AB7",fontSize:11,marginBottom:6,fontWeight:500}}>CÓDIGO VBA — Copia esto:</div>
                <pre style={{margin:0,color:"#c5bfff",fontSize:13,lineHeight:1.8,fontFamily:"monospace"}}>
{`Sub NuevaFactura()
  Dim numFactura As Integer
  numFactura = Range("B2").Value
  numFactura = numFactura + 1
  Range("B2").Value = numFactura
  MsgBox "Factura #" & numFactura & " creada"
End Sub`}
                </pre>
              </div>
            </div>
            {/* REGISTRO */}
            <div style={{...S.card,background:"#1a1828",border:"1px solid #7F77DD44",textAlign:"center"}}>
              <div style={{marginBottom:8}}><Bit size={48} mood="happy"/></div>
              <div style={{fontWeight:500,color:"#c5bfff",marginBottom:4}}>Registro de progreso — carlos.perez@correo.itm.edu.co</div>
              <div style={{color:"#9897a9",fontSize:12,marginBottom:12}}>Lección completada el {new Date().toLocaleDateString("es-CO")} · Módulo: Macros y Seguridad</div>
              <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap",marginBottom:16}}>
                {STEPS.map((st,i)=>(
                  <span key={i} style={{...S.badge(progress[i]?"#1D9E75":"#444"),fontSize:12}}>
                    {progress[i]?"✓ ":""}{st.title}
                  </span>
                ))}
              </div>
              <div style={{background:"#0f0f13",borderRadius:8,padding:"10px",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center"}}>
                  <div style={{flex:1,maxWidth:300,background:"#2a2840",borderRadius:6,height:10}}>
                    <div style={{width:`${pct}%`,height:10,borderRadius:6,background:"#7F77DD",transition:"width .5s"}}/>
                  </div>
                  <span style={{color:"#7F77DD",fontWeight:500}}>{pct}% completado</span>
                </div>
              </div>
              <a href="https://www.microsoft.com/es-es/microsoft-365/excel" target="_blank" rel="noreferrer"
                style={{...S.btn("green"),textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8,fontSize:14,padding:"10px 24px"}}>
                📊 Abrir Excel y practicar ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
