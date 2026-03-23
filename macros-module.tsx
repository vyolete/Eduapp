import { useState, useRef } from "react";

// ─── PALETA ────────────────────────────────────────────────────────
const P = {
  bg:"#0d0d11", card:"#17161f", side:"#121118", brd:"#252336",
  txt:"#e2e0f0", mut:"#7a7890", acc:"#7c6af7",
  green:"#1db87a", amber:"#e09b2d", red:"#e05555", blue:"#3a8fe8",
  pink:"#c45cbd", teal:"#1aa8a0",
};
const b = (v="d") => ({
  padding:"7px 16px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:500,
  background: v==="p"?"#7c6af7":v==="g"?"#1db87a":v==="a"?"#e09b2d22":v==="r"?"#e0555522":v==="gh"?"transparent":"#252336",
  color: v==="p"||v==="g"?"#fff":v==="a"?"#e09b2d":v==="r"?"#e05555":v==="gh"?P.mut:P.txt,
});
const card = (extra={}) => ({background:P.card, border:`1px solid ${P.brd}`, borderRadius:12, padding:"16px 18px", marginBottom:14, ...extra});
const bdg = (c) => ({background:c+"22", color:c, fontSize:11, padding:"2px 9px", borderRadius:20, display:"inline-block"});
const inp = {width:"100%", background:"#0a0a0e", border:`1px solid ${P.brd}`, borderRadius:8, color:P.txt, padding:"9px 13px", fontSize:13, boxSizing:"border-box"};

// ─── ESTUDIANTES BASE ──────────────────────────────────────────────
const BASE_STUDENTS = [
  "martaaguirre240769","camiloalvarez1113235","stephaniebedoya1112925","dahyanabetancur256450",
  "anabetancur322263","yeisonbetancur287384","angiecastiblanco1119536","mariacence1118229",
  "valentinagallego289627","camilogarcia322028","paulagiraldo309673","greidyguzman287095",
  "ronalhiguita324078","juanibarra1117960","elianalondono115428","saralopez324649",
  "juanmarin302989","carolinamarin310299","marianamarin301084","juanmarulanda213577",
  "felipemiranda1115301","yesicamoreno327534","juanochoa215760","valentinaosorio251677",
  "isabellapatino310332","thomasperez329008","juanpestana257167","karlapulgarin190055",
  "marianaquinones330413","dannysalgar224608","fabiolasanchez321359","juansanchez329527",
  "ximenasuarez281714","silvanatorrado272356","marleyuribe329968","anavalderrama1119086",
  "eduardvargas275509","paulavergara1113983","manuelvilla130387"
].map(u => ({ id:u, email:`${u}@correo.itm.edu.co`, name:u.replace(/[0-9]/g,"").replace(/^./,c=>c.toUpperCase()) }));

const MODULES = ["Hoja de Cálculo","Bases de Datos","Sistema ERP","Macros y Seguridad"];
const TOPICS = ["Tipos de datos","Funciones y control","Grabadora de macros","Editor VBA"];

// ─── TEMA 1: TIPOS DE DATOS ────────────────────────────────────────
const DATA_TYPES = [
  {id:"int",  name:"Integer",  color:P.acc,   icon:"🔢", desc:"Números enteros entre -32,768 y 32,767", ex:"Dim cantidad As Integer\ncantidad = 150", uses:["Contadores","Cantidades","Consecutivos"]},
  {id:"lng",  name:"Long",     color:P.blue,  icon:"🔢", desc:"Enteros grandes hasta 2,147,483,647. Ideal para NIT y facturas", ex:"Dim factura As Long\nfactura = 1000001", uses:["NIT","N° Factura","Cuentas contables"]},
  {id:"dbl",  name:"Double",   color:P.teal,  icon:"💰", desc:"Números decimales de alta precisión. Para valores monetarios", ex:"Dim precio As Double\nprecio = 15750.50", uses:["Precios","IVA","Totales"]},
  {id:"str",  name:"String",   color:P.green, icon:"📝", desc:"Texto de cualquier longitud. Para nombres, descripciones", ex:'Dim empresa As String\nempresa = "Mi Empresa S.A.S"', uses:["Nombres","Descripciones","NIT texto"]},
  {id:"bool", name:"Boolean",  color:P.amber, icon:"✅", desc:"Solo True o False. Para condiciones y estados", ex:"Dim pagado As Boolean\npagado = True", uses:["Estado pago","Activo/Inactivo","Validaciones"]},
  {id:"date", name:"Date",     color:P.pink,  icon:"📅", desc:"Fechas y horas. Fundamental en contabilidad", ex:"Dim fecha As Date\nfecha = Now()", uses:["Fecha factura","Vencimientos","Períodos"]},
  {id:"cur",  name:"Currency", color:"#e09b2d",icon:"💲",desc:"Diseñado específicamente para valores monetarios con 4 decimales", ex:"Dim total As Currency\ntotal = 1250000.75", uses:["Totales","Subtotales","Impuestos"]},
  {id:"var",  name:"Variant",  color:P.mut,   icon:"❓", desc:"Acepta cualquier tipo. Flexible pero usa más memoria", ex:"Dim dato As Variant\ndato = 42 ' o texto', o fecha", uses:["Uso general","Flexibilidad","Precaución"]},
];

const CLASSIFY_ITEMS = [
  {id:"c1", text:'nombre = "Carlos Pérez"',     correct:"str",  label:"String"},
  {id:"c2", text:"factNum = 1001",              correct:"lng",  label:"Long"},
  {id:"c3", text:"iva = 0.19",                  correct:"dbl",  label:"Double"},
  {id:"c4", text:"pagado = True",               correct:"bool", label:"Boolean"},
  {id:"c5", text:"fecha = #2026-03-22#",         correct:"date", label:"Date"},
  {id:"c6", text:"stock = 250",                 correct:"int",  label:"Integer"},
  {id:"c7", text:"total = 1250000.75",          correct:"cur",  label:"Currency"},
  {id:"c8", text:'ciudad = "Medellín"',          correct:"str",  label:"String"},
];

// ─── TEMA 2: FUNCIONES Y ESTRUCTURAS ──────────────────────────────
const STRUCTURES = [
  {id:"if",  name:"If / Then / Else",  color:P.amber, icon:"🔀",
   desc:"Toma decisiones según una condición.",
   template:`If [condición] Then\n  [acción si True]\nElse\n  [acción si False]\nEnd If`,
   example:`If totalVenta > 1000000 Then\n  descuento = totalVenta * 0.05\nElse\n  descuento = 0\nEnd If`,
   hint:"Si la venta supera $1.000.000 aplica 5% de descuento, si no, descuento = 0"},
  {id:"for",  name:"For / Next",       color:P.blue,  icon:"🔄",
   desc:"Repite un bloque un número fijo de veces.",
   template:`For i = [inicio] To [fin]\n  [acción]\nNext i`,
   example:`For i = 2 To UltimaFila\n  totalGeneral = totalGeneral + Cells(i, 6).Value\nNext i`,
   hint:"Recorre todas las filas de facturas sumando el total"},
  {id:"while",name:"Do While / Loop",  color:P.teal,  icon:"🌀",
   desc:"Repite mientras se cumpla una condición.",
   template:`Do While [condición]\n  [acción]\nLoop`,
   example:`Do While Cells(fila, 1).Value <> ""\n  fila = fila + 1\nLoop`,
   hint:"Baja filas hasta encontrar una celda vacía — busca la última fila con datos"},
  {id:"sel",  name:"Select Case",      color:P.pink,  icon:"📋",
   desc:"Evalúa múltiples casos sobre una variable.",
   template:`Select Case [variable]\n  Case [val1]: [acción]\n  Case [val2]: [acción]\n  Case Else: [acción]\nEnd Select`,
   example:`Select Case tipoDoc\n  Case "FV": tipo = "Factura Venta"\n  Case "FC": tipo = "Factura Compra"\n  Case Else: tipo = "Desconocido"\nEnd Select`,
   hint:"Clasifica documentos contables según su código"},
];

const IF_EXERCISE = { venta:1500000, threshold:1000000 };

// ─── TEMA 3: GRABADORA ─────────────────────────────────────────────
const RECORDER_STEPS = [
  {id:0, action:"Abrir Excel y el libro",      icon:"📗", detail:"Abre Excel. Crea o abre el libro donde quieres grabar la macro.", code:null},
  {id:1, action:"Ir a Vista → Macros",          icon:"👁️", detail:"Pestaña Vista → botón Macros → Grabar macro...", code:null},
  {id:2, action:"Nombrar la macro",             icon:"✏️", detail:"Nombre sin espacios: NuevaFactura\nAtajo: Ctrl+Shift+F\nGuardar en: Este libro", code:null},
  {id:3, action:"Hacer las acciones",           icon:"⏺️", detail:"Excel graba CADA acción que hagas. Haz exactamente lo que quieres automatizar.", code:null},
  {id:4, action:"Detener grabación",            icon:"⏹️", detail:"Vista → Macros → Detener grabación. Ya tienes el código VBA generado.", code:null},
  {id:5, action:"Ver el código generado",       icon:"🔍", detail:"Alt+F11 abre el Editor VBA. Verás el código que Excel generó automáticamente.", code:`Sub NuevaFactura()\n    Range("B2").Select\n    ActiveCell.FormulaR1C1 = "1001"\n    Range("B3").Select\nEnd Sub`},
  {id:6, action:"Limpiar y mejorar el código", icon:"✨", detail:"El código grabado tiene redundancias. Lo mejoramos eliminando .Select innecesarios.", code:`Sub NuevaFactura()\n    ' Versión mejorada\n    Dim num As Long\n    num = Range("B2").Value + 1\n    Range("B2").Value = num\nEnd Sub`},
];

// ─── TEMA 4: EDITOR VBA ────────────────────────────────────────────
const VBA_CONCEPTS = [
  {id:"sub",   cat:"Estructura",   color:P.acc,   icon:"📦", name:"Sub / End Sub",      desc:"Bloque principal. Todo procedimiento VBA vive aquí.", ex:"Sub MiProcedimiento()\n  ' código\nEnd Sub"},
  {id:"func",  cat:"Estructura",   color:P.blue,  icon:"🔧", name:"Function",           desc:"Igual que Sub pero devuelve un valor.", ex:"Function Calcular(n As Double) As Double\n  Calcular = n * 1.19\nEnd Function"},
  {id:"dim",   cat:"Variable",     color:P.green, icon:"📦", name:"Dim",                desc:"Declara una variable. Siempre al inicio del Sub.", ex:"Dim nombre As String\nDim valor As Currency"},
  {id:"set",   cat:"Objeto",       color:P.teal,  icon:"🔗", name:"Set",                desc:"Asigna un objeto (hoja, rango) a una variable.", ex:'Set ws = Worksheets("Facturas")'},
  {id:"range", cat:"Excel",        color:P.amber, icon:"🎯", name:"Range / Cells",      desc:"Accede a celdas. Range por dirección, Cells por fila/columna.", ex:'Range("A1").Value = "Hola"\nCells(1, 1).Value = "Hola"'},
  {id:"with",  cat:"Optimización", color:P.pink,  icon:"⚡", name:"With / End With",    desc:"Evita repetir el objeto en múltiples propiedades.", ex:'With Range("A1")\n  .Value = "ITM"\n  .Font.Bold = True\n  .Interior.Color = RGB(200,200,255)\nEnd With'},
  {id:"err",   cat:"Control",      color:P.red,   icon:"🛡️", name:"On Error",           desc:"Maneja errores para que la macro no se detenga abruptamente.", ex:"On Error GoTo ManejadorError\n  ' código riesgoso\nExit Sub\nManejadorError:\n  MsgBox Err.Description"},
  {id:"msg",   cat:"UI",           color:"#c45cbd",icon:"💬", name:"MsgBox / InputBox", desc:"MsgBox muestra mensajes. InputBox pide datos al usuario.", ex:'nombre = InputBox("¿Nombre del cliente?")\nMsgBox "Factura para: " & nombre'},
];

const EDITOR_AREAS = ["Project Explorer","Properties","Code Window","Immediate Window"];

// ─── BIT ───────────────────────────────────────────────────────────
function Bit({size=48,mood="n",animate=false}){
  const ec=mood==="h"?P.green:mood==="t"?P.amber:P.acc;
  const mp=mood==="h"?"M43,46 Q50,54 57,46":mood==="t"?"M43,49 Q50,49 57,49":"M43,47 Q50,51 57,47";
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" style={animate?{animation:"flt 2.5s ease-in-out infinite"}:{}}>
      <ellipse cx="50" cy="62" rx="28" ry="30" fill="#23213a" stroke={P.acc} strokeWidth="1.5"/>
      <ellipse cx="22" cy="70" rx="12" ry="18" fill="#1a1828" stroke="#534AB7" strokeWidth="1" transform="rotate(-15 22 70)"/>
      <ellipse cx="78" cy="70" rx="12" ry="18" fill="#1a1828" stroke="#534AB7" strokeWidth="1" transform="rotate(15 78 70)"/>
      <circle cx="50" cy="36" r="22" fill="#23213a" stroke={P.acc} strokeWidth="1.5"/>
      <polygon points="32,18 28,6 38,14" fill="#23213a" stroke={P.acc} strokeWidth="1"/>
      <polygon points="68,18 72,6 62,14" fill="#23213a" stroke={P.acc} strokeWidth="1"/>
      <ellipse cx="50" cy="38" rx="16" ry="14" fill="#16151d"/>
      <circle cx="42" cy="34" r="8" fill="#0f0f13" stroke={ec} strokeWidth="1.5"/>
      <circle cx="58" cy="34" r="8" fill="#0f0f13" stroke={ec} strokeWidth="1.5"/>
      <circle cx="42" cy="34" r="5" fill={ec}/><circle cx="58" cy="34" r="5" fill={ec}/>
      <circle cx="43.5" cy="32.5" r="1.5" fill="#fff"/><circle cx="59.5" cy="32.5" r="1.5" fill="#fff"/>
      <rect x="32" y="27" width="16" height="14" rx="4" fill="none" stroke="#c5bfff" strokeWidth="1.2"/>
      <rect x="51" y="27" width="16" height="14" rx="4" fill="none" stroke="#c5bfff" strokeWidth="1.2"/>
      <line x1="48" y1="33" x2="51" y2="33" stroke="#c5bfff" strokeWidth="1.2"/>
      <path d={mp} stroke="#c5bfff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <polygon points="47,42 53,42 50,47" fill="#BA7517"/>
      <ellipse cx="50" cy="68" rx="16" ry="18" fill="#1a1828" stroke="#534AB7" strokeWidth="0.8"/>
      <ellipse cx="42" cy="91" rx="7" ry="3" fill="#534AB7"/>
      <ellipse cx="58" cy="91" rx="7" ry="3" fill="#534AB7"/>
    </svg>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────
function ProgBar({val,max,color=P.acc,height=7}){
  const pct=Math.min(100,Math.round((val/max)*100));
  return(
    <div style={{background:"#0a0a0e",borderRadius:height,height,overflow:"hidden"}}>
      <div style={{width:`${pct}%`,height,background:color,borderRadius:height,transition:"width .5s"}}/>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────────
export default function App(){
  // auth
  const [screen,setScreen]=useState("login");
  const [loginInput,setLoginInput]=useState("");
  const [loginErr,setLoginErr]=useState("");
  const [user,setUser]=useState(null);
  // semester mgmt
  const [semesters,setSemesters]=useState([{id:"2026-1",name:"2026-1",students:BASE_STUDENTS,groups:["Herramientas 2026"]}]);
  const [activeSem,setActiveSem]=useState("2026-1");
  const [pasteInput,setPasteInput]=useState("");
  const [newSemName,setNewSemName]=useState("");
  const [adminTab,setAdminTab]=useState("progress");
  // grades
  const [grades,setGrades]=useState({});
  const [editGrade,setEditGrade]=useState(null);
  // topic progress
  const [topicProgress,setTopicProgress]=useState({});
  // active topic
  const [activeTopic,setActiveTopic]=useState(0);
  const [topicStep,setTopicStep]=useState(0);
  // T1 state
  const [selectedType,setSelectedType]=useState(null);
  const [classifyAnswers,setClassifyAnswers]=useState({});
  const [classifyChecked,setClassifyChecked]=useState(false);
  const [t1done,setT1done]=useState(false);
  // T2 state
  const [selectedStruct,setSelectedStruct]=useState(0);
  const [ifVenta,setIfVenta]=useState(1500000);
  const [t2done,setT2done]=useState(false);
  // T3 state
  const [recStep,setRecStep]=useState(-1);
  const [recDone,setRecDone]=useState(false);
  // T4 state
  const [selectedConcept,setSelectedConcept]=useState(null);
  const [editorContent,setEditorContent]=useState(`Sub MiPrimeraMacro()\n  ' Escribe tu código aquí\n  \nEnd Sub`);
  const [runOutput,setRunOutput]=useState("");
  const [t4done,setT4done]=useState(false);

  const sem = semesters.find(s=>s.id===activeSem)||semesters[0];

  function login(){
    const email=loginInput.trim().toLowerCase();
    if(email==="j.salazar@itm.edu.co"||email==="admin@itm.edu.co"||email==="profe123"){
      setUser({email:"j.salazar@itm.edu.co",name:"Prof. Jorge Salazar",role:"teacher"});
      setScreen("admin"); return;
    }
    const st=sem.students.find(x=>x.email===email);
    if(!st){setLoginErr("Correo no encontrado en el grupo activo.");return;}
    setUser({...st,role:"student"});
    setScreen("topics");
  }

  function markTopicDone(tid,pts){
    const uid=user?.id||"anon";
    const prev=topicProgress[uid]||{};
    if(prev[tid]) return;
    const updated={...topicProgress,[uid]:{...prev,[tid]:{done:true,pts,date:new Date().toLocaleDateString("es-CO")}}};
    setTopicProgress(updated);
  }

  function getStudentPts(uid){
    const p=topicProgress[uid]||{};
    return Object.values(p).reduce((s,t)=>s+(t.pts||0),0);
  }
  function getStudentTopics(uid){
    return topicProgress[uid]||{};
  }

  // Parse pasted student list
  function parsePaste(){
    const emails=pasteInput.split(/[\n,;\s]+/).map(e=>e.trim().toLowerCase()).filter(e=>e.includes("@"));
    const newStudents=emails.map(email=>{
      const id=email.split("@")[0];
      return{id,email,name:id.replace(/[0-9]/g,"").replace(/^./,c=>c.toUpperCase())};
    });
    if(!newSemName.trim()){alert("Escribe un nombre para el semestre");return;}
    const newSem={id:newSemName,name:newSemName,students:newStudents,groups:[newSemName]};
    setSemesters(p=>[...p,newSem]);
    setActiveSem(newSemName);
    setPasteInput("");setNewSemName("");
    alert(`✓ ${newStudents.length} estudiantes registrados en ${newSemName}`);
  }

  function saveGrade(uid,mod,val){
    const v=parseFloat(val);
    if(isNaN(v)||v<0||v>5){alert("Nota entre 0.0 y 5.0");return;}
    setGrades(g=>({...g,[uid]:{...(g[uid]||{}),[mod]:v}}));
    setEditGrade(null);
  }

  function getAvg(uid){
    const g=grades[uid]||{};
    const vals=MODULES.map(m=>g[m]).filter(v=>v!==undefined);
    return vals.length?( vals.reduce((a,v)=>a+v,0)/vals.length).toFixed(1):"—";
  }

  function printReport(){
    const rows=sem.students.map(st=>{
      const g=grades[st.id]||{};
      const avg=getAvg(st.id);
      const mods=MODULES.map(m=>g[m]!==undefined?g[m].toFixed(1):"—").join("\t");
      return `${st.name}\t${st.email}\t${mods}\t${avg}`;
    }).join("\n");
    const header=`Estudiante\tCorreo\t${MODULES.join("\t")}\tPromedio`;
    const content=`REPORTE DE NOTAS — ${sem.name}\nFecha: ${new Date().toLocaleDateString("es-CO")}\n\n${header}\n${rows}`;
    const blob=new Blob([content],{type:"text/plain"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);
    a.download=`notas_${sem.name}.txt`;a.click();
  }

  const totalPts=user?.id?getStudentPts(user.id):0;
  const maxPts=100;
  const topicsDone=user?.id?Object.keys(topicProgress[user.id]||{}).length:0;

  // ── LOGIN ────────────────────────────────────────────────────────
  if(screen==="login") return(
    <div style={{...{background:P.bg,color:P.txt,fontFamily:"system-ui,sans-serif",fontSize:14,minHeight:"100vh"},display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:18}}>
      <style>{`@keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}} input:focus{outline:none;border-color:#7c6af7!important;} *{box-sizing:border-box}`}</style>
      <Bit size={80} animate/>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:21,fontWeight:600,color:"#c5bfff",letterSpacing:-.3}}>Macros y Seguridad</div>
        <div style={{color:P.mut,fontSize:12,marginTop:3}}>Herramientas de Gestión de la Información · ITM 2026</div>
      </div>
      <div style={card({width:310,padding:24})}>
        <label style={{display:"block",color:P.mut,fontSize:12,marginBottom:5}}>Correo institucional</label>
        <input style={{...inp,marginBottom:8}} value={loginInput} onChange={e=>{setLoginInput(e.target.value);setLoginErr("");}} placeholder="usuario@correo.itm.edu.co" onKeyDown={e=>e.key==="Enter"&&login()}/>
        {loginErr&&<p style={{color:P.red,fontSize:12,margin:"0 0 8px"}}>{loginErr}</p>}
        <button style={{...b("p"),width:"100%",padding:"10px"}} onClick={login}>Entrar</button>
        <div style={{marginTop:12,borderTop:`1px solid ${P.brd}`,paddingTop:10,fontSize:11,color:"#333"}}>
          <div style={{cursor:"pointer",color:P.mut,marginBottom:3}} onClick={()=>setLoginInput("j.salazar@itm.edu.co")}>👨‍🏫 Docente/Admin: j.salazar@itm.edu.co (profe123)</div>
          <div style={{cursor:"pointer",color:"#3a3a5a"}} onClick={()=>setLoginInput("martaaguirre240769@correo.itm.edu.co")}>👩‍🎓 Ej: martaaguirre240769@correo.itm.edu.co</div>
        </div>
      </div>
    </div>
  );

  // ── ADMIN ────────────────────────────────────────────────────────
  if(screen==="admin") return(
    <div style={{background:P.bg,color:P.txt,fontFamily:"system-ui,sans-serif",fontSize:14,minHeight:"100vh"}}>
      <style>{`input:focus,textarea:focus{outline:none;border-color:#7c6af7!important;} *{box-sizing:border-box} ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#252336;border-radius:2px} .hr:hover{background:#1e1d2a!important} td,th{padding:7px 10px}`}</style>
      {/* TOPBAR */}
      <div style={{background:P.side,borderBottom:`1px solid ${P.brd}`,padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Bit size={32}/>
          <div>
            <div style={{fontWeight:600,color:"#c5bfff",fontSize:14}}>Panel Admin — Macros y Seguridad</div>
            <div style={{color:P.mut,fontSize:11}}>{sem.name} · {sem.students.length} estudiantes</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <select style={{...inp,width:"auto",padding:"5px 10px",fontSize:12}} value={activeSem} onChange={e=>setActiveSem(e.target.value)}>
            {semesters.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <button style={b("g")} onClick={printReport}>⬇ Exportar notas</button>
          <button style={b()} onClick={()=>setScreen("login")}>← Salir</button>
        </div>
      </div>
      {/* TABS */}
      <div style={{display:"flex",gap:4,padding:"10px 20px",background:P.side,borderBottom:`1px solid ${P.brd}`}}>
        {[["progress","📊 Progreso temas"],["grades","📝 Notas por módulo"],["students","👥 Estudiantes"],["semester","➕ Nuevo semestre"]].map(([id,label])=>(
          <button key={id} onClick={()=>setAdminTab(id)} style={{...b(adminTab===id?"p":"d"),fontSize:12,padding:"5px 14px",border:adminTab===id?"none":`1px solid ${P.brd}`}}>{label}</button>
        ))}
      </div>

      <div style={{padding:20,maxWidth:1100,margin:"0 auto"}}>
        {/* STATS */}
        <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
          {[
            {l:"Estudiantes",v:sem.students.length,c:P.acc},
            {l:"Con avance",v:sem.students.filter(s=>getStudentPts(s.id)>0).length,c:P.green},
            {l:"Completaron todo",v:sem.students.filter(s=>Object.keys(topicProgress[s.id]||{}).length>=4).length,c:P.amber},
            {l:"Promedio notas",v:(()=>{const ns=sem.students.map(s=>getAvg(s.id)).filter(v=>v!=="—").map(Number);return ns.length?(ns.reduce((a,v)=>a+v,0)/ns.length).toFixed(1):"—";})(),c:P.blue},
          ].map(m=>(
            <div key={m.l} style={card({flex:1,minWidth:110,textAlign:"center",padding:"12px",marginBottom:0})}>
              <div style={{fontSize:22,fontWeight:600,color:m.c}}>{m.v}</div>
              <div style={{fontSize:11,color:P.mut,marginTop:2}}>{m.l}</div>
            </div>
          ))}
        </div>

        {/* TAB: PROGRESO TEMAS */}
        {adminTab==="progress"&&(
          <div style={card()}>
            <div style={{fontWeight:500,color:"#c5bfff",marginBottom:14,fontSize:15}}>Progreso por tema — {sem.name}</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{background:"#1e1d2a"}}>
                  {["Estudiante","T1 Tipos","T2 Funciones","T3 Grabadora","T4 Editor VBA","Pts","% avance"].map(h=>(
                    <th key={h} style={{textAlign:"left",color:P.mut,fontWeight:500,borderBottom:`1px solid ${P.brd}`,whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {sem.students.map(st=>{
                    const tp=topicProgress[st.id]||{};
                    const pts=getStudentPts(st.id);
                    const pct=Math.round((pts/maxPts)*100);
                    return(
                      <tr key={st.id} className="hr" style={{borderBottom:`1px solid ${P.brd}22`,transition:"background .15s"}}>
                        <td style={{color:"#c5bfff",whiteSpace:"nowrap"}}>{st.name}</td>
                        {[0,1,2,3].map(i=>(
                          <td key={i} style={{textAlign:"center"}}>
                            {tp[i]?<span style={{color:P.green}}>✓</span>:<span style={{color:"#252336"}}>○</span>}
                          </td>
                        ))}
                        <td><span style={{color:P.acc,fontWeight:500}}>{pts}</span></td>
                        <td style={{width:120}}>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <ProgBar val={pts} max={maxPts} color={pct>=80?P.green:pct>=40?P.amber:P.acc} height={5}/>
                            <span style={{color:P.mut,fontSize:10,flexShrink:0}}>{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: NOTAS */}
        {adminTab==="grades"&&(
          <div style={card()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:500,color:"#c5bfff",fontSize:15}}>Notas por módulo — {sem.name}</div>
              <button style={b("g")} onClick={printReport}>⬇ Exportar</button>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{background:"#1e1d2a"}}>
                  <th style={{textAlign:"left",color:P.mut,fontWeight:500,borderBottom:`1px solid ${P.brd}`}}>Estudiante</th>
                  {MODULES.map(m=><th key={m} style={{textAlign:"center",color:P.mut,fontWeight:500,borderBottom:`1px solid ${P.brd}`,whiteSpace:"nowrap",minWidth:80}}>{m}</th>)}
                  <th style={{textAlign:"center",color:P.mut,fontWeight:500,borderBottom:`1px solid ${P.brd}`}}>Promedio</th>
                </tr></thead>
                <tbody>
                  {sem.students.map(st=>{
                    const g=grades[st.id]||{};
                    const avg=getAvg(st.id);
                    return(
                      <tr key={st.id} className="hr" style={{borderBottom:`1px solid ${P.brd}22`}}>
                        <td style={{color:"#c5bfff",whiteSpace:"nowrap"}}>{st.name}</td>
                        {MODULES.map(m=>(
                          <td key={m} style={{textAlign:"center"}}>
                            {editGrade===`${st.id}-${m}`?(
                              <input autoFocus type="number" min="0" max="5" step="0.1"
                                defaultValue={g[m]||""} style={{...inp,width:55,padding:"3px 6px",textAlign:"center",fontSize:12}}
                                onBlur={e=>saveGrade(st.id,m,e.target.value)}
                                onKeyDown={e=>{if(e.key==="Enter")saveGrade(st.id,m,e.target.value);if(e.key==="Escape")setEditGrade(null);}}/>
                            ):(
                              <span onClick={()=>setEditGrade(`${st.id}-${m}`)}
                                style={{cursor:"pointer",color:g[m]!==undefined?(g[m]>=3?P.green:P.red):"#333",fontWeight:g[m]!==undefined?500:400,padding:"2px 8px",borderRadius:5,
                                  background:g[m]!==undefined?(g[m]>=3?P.green+"18":P.red+"18"):"transparent"}}>
                                {g[m]!==undefined?g[m].toFixed(1):"—"}
              </span>
                            )}
                          </td>
                        ))}
                        <td style={{textAlign:"center",fontWeight:600,color:avg!=="—"?(parseFloat(avg)>=3?P.green:P.red):P.mut}}>{avg}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p style={{color:P.mut,fontSize:11,marginTop:8}}>💡 Haz clic en cualquier nota para editarla. Enter para guardar, Esc para cancelar.</p>
            </div>
          </div>
        )}

        {/* TAB: ESTUDIANTES */}
        {adminTab==="students"&&(
          <div style={card()}>
            <div style={{fontWeight:500,color:"#c5bfff",marginBottom:12,fontSize:15}}>Estudiantes — {sem.name} ({sem.students.length})</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:8}}>
              {sem.students.map(st=>{
                const pts=getStudentPts(st.id);
                const tp=topicProgress[st.id]||{};
                return(
                  <div key={st.id} style={{background:P.side,borderRadius:9,padding:"10px 12px",border:`1px solid ${P.brd}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                      <div style={{width:30,height:30,borderRadius:"50%",background:P.acc+"22",display:"flex",alignItems:"center",justifyContent:"center",color:P.acc,fontSize:11,fontWeight:600,flexShrink:0}}>
                        {st.name.slice(0,2).toUpperCase()}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{color:"#c5bfff",fontSize:12,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{st.name}</div>
                        <div style={{color:P.mut,fontSize:10,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{st.email}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:4,marginBottom:5}}>
                      {[0,1,2,3].map(i=><span key={i} style={{...bdg(tp[i]?P.green:"#252336"),fontSize:9}}>T{i+1}{tp[i]?"✓":"○"}</span>)}
                    </div>
                    <ProgBar val={pts} max={maxPts} color={pts>=80?P.green:pts>=40?P.amber:P.acc}/>
                    <div style={{textAlign:"right",fontSize:10,color:P.mut,marginTop:3}}>{pts}/100 pts</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: NUEVO SEMESTRE */}
        {adminTab==="semester"&&(
          <div style={card()}>
            <div style={{fontWeight:500,color:"#c5bfff",marginBottom:4,fontSize:15}}>➕ Agregar nuevo semestre</div>
            <p style={{color:P.mut,fontSize:13,margin:"0 0 16px"}}>Pega la lista de correos de los estudiantes del nuevo semestre. Acepta separados por salto de línea, coma o espacio.</p>
            <label style={{display:"block",color:P.mut,fontSize:12,marginBottom:4}}>Nombre del semestre / grupo</label>
            <input style={{...inp,marginBottom:12}} value={newSemName} onChange={e=>setNewSemName(e.target.value)} placeholder="ej. 2026-2 o Herramientas Nocturna 2026"/>
            <label style={{display:"block",color:P.mut,fontSize:12,marginBottom:4}}>Lista de correos (pegar aquí)</label>
            <textarea style={{...inp,height:180,resize:"vertical",marginBottom:12,fontFamily:"monospace",fontSize:12}}
              value={pasteInput} onChange={e=>setPasteInput(e.target.value)}
              placeholder={"martaaguirre240769@correo.itm.edu.co\ncamiloalvarez1113235@correo.itm.edu.co\n..."}/>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button style={{...b("p"),padding:"9px 20px"}} onClick={parsePaste}>✓ Registrar semestre</button>
              {pasteInput&&<span style={{color:P.mut,fontSize:12}}>{pasteInput.split(/[\n,;\s]+/).filter(e=>e.includes("@")).length} correos detectados</span>}
            </div>
            <div style={{marginTop:20,borderTop:`1px solid ${P.brd}`,paddingTop:14}}>
              <div style={{fontWeight:500,color:"#c5bfff",marginBottom:8}}>Semestres registrados:</div>
              {semesters.map(s=>(
                <div key={s.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:P.side,borderRadius:8,marginBottom:6,border:`1px solid ${s.id===activeSem?P.acc:P.brd}`}}>
                  <div>
                    <span style={{color:"#c5bfff",fontWeight:500,fontSize:13}}>{s.name}</span>
                    <span style={{color:P.mut,fontSize:11,marginLeft:8}}>{s.students.length} estudiantes</span>
                  </div>
                  <button style={{...b(s.id===activeSem?"p":"d"),fontSize:11,padding:"4px 12px"}} onClick={()=>setActiveSem(s.id)}>
                    {s.id===activeSem?"Activo":"Seleccionar"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── TOPICS VIEW ──────────────────────────────────────────────────
  const topicColors=[P.acc,P.blue,P.green,P.amber];
  const topicIcons=["🔢","🔀","⏺️","🖥️"];
  const topicNames=["Tipos de datos y variables","Funciones y estructuras de control","Grabadora de macros","Editor VBA"];
  const uid=user?.id||"anon";
  const tp=topicProgress[uid]||{};

  return(
    <div style={{background:P.bg,color:P.txt,fontFamily:"system-ui,sans-serif",fontSize:14,minHeight:"100vh"}}>
      <style>{`
        @keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes pop{0%{transform:scale(0.88);opacity:0}100%{transform:scale(1);opacity:1}}
        @keyframes sli{0%{transform:translateX(18px);opacity:0}100%{transform:translateX(0);opacity:1}}
        @keyframes cel{0%{transform:scale(1)}40%{transform:scale(1.28) rotate(-7deg)}70%{transform:scale(1.14) rotate(5deg)}100%{transform:scale(1)}}
        @keyframes cnf{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(48px) rotate(360deg);opacity:0}}
        input:focus,textarea:focus{outline:none;border-color:#7c6af7!important;}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px;height:4px} ::-webkit-scrollbar-thumb{background:#252336;border-radius:2px}
        .blk:hover{transform:translateY(-2px);transition:transform .15s}
        pre{white-space:pre-wrap;font-family:'Courier New',monospace;margin:0;line-height:1.7}
        .shd:hover{background:#1e1d2a!important}
        code{background:#1a1828;padding:1px 5px;border-radius:4px;font-family:'Courier New',monospace;font-size:12px;color:#c5bfff}
      `}</style>

      {/* HEADER */}
      <div style={{background:P.side,borderBottom:`1px solid ${P.brd}`,padding:"9px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Bit size={30}/>
          <div>
            <div style={{fontWeight:600,color:"#c5bfff",fontSize:13}}>Macros y Seguridad · {topicNames[activeTopic]}</div>
            <div style={{color:P.mut,fontSize:11}}>{user?.name} · {user?.email}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:80,background:"#0a0a0e",borderRadius:4,height:6}}>
            <div style={{width:`${Math.round((totalPts/maxPts)*100)}%`,height:6,borderRadius:4,background:P.acc,transition:"width .5s"}}/>
          </div>
          <span style={{color:P.acc,fontSize:12,fontWeight:600}}>{totalPts}/100</span>
          <button style={{...b("gh"),fontSize:11}} onClick={()=>setScreen("login")}>Salir</button>
        </div>
      </div>

      {/* TOPIC SELECTOR */}
      <div style={{display:"flex",gap:0,padding:"0",background:P.side,borderBottom:`1px solid ${P.brd}`,overflowX:"auto"}}>
        {topicNames.map((tn,i)=>(
          <button key={i} onClick={()=>{setActiveTopic(i);setTopicStep(0);}}
            style={{...b(activeTopic===i?"p":"d"),borderRadius:0,padding:"10px 16px",fontSize:12,display:"flex",alignItems:"center",gap:6,
              borderRight:`1px solid ${P.brd}`,borderBottom:activeTopic===i?`2px solid ${P.acc}`:"2px solid transparent",
              background:activeTopic===i?P.acc+"22":"transparent",color:activeTopic===i?"#c5bfff":P.mut}}>
            <span>{topicIcons[i]}</span>
            <span style={{whiteSpace:"nowrap"}}>{tn}</span>
            {tp[i]&&<span style={{color:P.green,fontSize:10}}>✓</span>}
          </button>
        ))}
      </div>

      <div style={{padding:16,maxWidth:960,margin:"0 auto"}}>

        {/* BIT PANEL */}
        <div style={card({background:"#14131c",border:`1px solid ${tp[activeTopic]?P.green:P.brd}`,display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:"12px 16px"})}>
          <div style={{animation:tp[activeTopic]?"cel .7s ease":"flt 2.5s ease-in-out infinite",flexShrink:0}}>
            <Bit size={44} mood={tp[activeTopic]?"h":activeTopic===2?"t":"n"}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:500,color:tp[activeTopic]?P.green:"#c5bfff",fontSize:13,marginBottom:2}}>
              {tp[activeTopic]?`¡Tema ${activeTopic+1} completado! 🎉`:`Tema ${activeTopic+1} de 4`}
            </div>
            <div style={{color:"#a0a0c0",fontSize:12,lineHeight:1.6}}>
              {tp[activeTopic]?"Excelente trabajo. Puedes repasar o avanzar al siguiente tema.":
               activeTopic===0?"Aprende los tipos de datos de VBA y cuándo usar cada uno en sistemas contables.":
               activeTopic===1?"Domina If/Then, For/Next, Do While y Select Case con ejemplos de facturación.":
               activeTopic===2?"Aprende a grabar macros y entender el código que Excel genera automáticamente.":
               "Explora el Editor VBA: sus áreas, conceptos clave y escribe tu primer procedimiento."}
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{...bdg(topicColors[activeTopic]),fontSize:12,marginBottom:4}}>{topicIcons[activeTopic]} Tema {activeTopic+1}</div>
            <div style={{color:P.mut,fontSize:11}}>{tp[activeTopic]?`+${[25,25,25,25][activeTopic]} pts`:""}</div>
          </div>
        </div>

        {/* ── TEMA 1: TIPOS DE DATOS ──────────────────────────── */}
        {activeTopic===0&&(
          <div>
            <div style={card()}>
              <h3 style={{margin:"0 0 4px",color:"#c5bfff",fontWeight:500,fontSize:16}}>🔢 Tipos de datos en VBA</h3>
              <p style={{margin:"0 0 14px",color:"#a0a0c0",fontSize:13,lineHeight:1.7}}>Declarar el tipo correcto de variable hace tu código más eficiente y evita errores en cálculos contables. Haz clic en cada tipo para explorar.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8,marginBottom:16}}>
                {DATA_TYPES.map(dt=>(
                  <div key={dt.id} onClick={()=>setSelectedType(selectedType===dt.id?null:dt.id)}
                    style={{background:selectedType===dt.id?dt.color+"22":P.side,border:`2px solid ${selectedType===dt.id?dt.color:P.brd}`,
                      borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"center",transition:"all .2s"}}>
                    <div style={{fontSize:20,marginBottom:4}}>{dt.icon}</div>
                    <div style={{fontWeight:600,color:dt.color,fontSize:13}}>{dt.name}</div>
                    <div style={{color:P.mut,fontSize:10,marginTop:2,lineHeight:1.4}}>{dt.uses[0]}</div>
                  </div>
                ))}
              </div>
              {selectedType&&(()=>{
                const dt=DATA_TYPES.find(d=>d.id===selectedType);
                return(
                  <div style={{background:"#0d0d11",borderRadius:10,padding:16,marginBottom:14,borderLeft:`3px solid ${dt.color}`,animation:"pop .25s ease"}}>
                    <div style={{display:"flex",gap:12,marginBottom:10,flexWrap:"wrap"}}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:600,color:dt.color,fontSize:15,marginBottom:4}}>{dt.icon} {dt.name}</div>
                        <p style={{color:"#a0a0c0",fontSize:13,margin:"0 0 8px",lineHeight:1.6}}>{dt.desc}</p>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                          {dt.uses.map(u=><span key={u} style={bdg(dt.color)}>{u}</span>)}
                        </div>
                      </div>
                      <div style={{background:"#16151f",borderRadius:8,padding:"10px 14px",minWidth:220}}>
                        <div style={{color:P.mut,fontSize:10,marginBottom:6}}>EJEMPLO VBA</div>
                        <pre style={{color:"#c5bfff",fontSize:12}}>{dt.ex}</pre>
                      </div>
                    </div>
                  </div>
                );
              })()}
              {/* CLASIFICACIÓN */}
              <div style={{background:"#0d0d11",borderRadius:10,padding:14,marginBottom:14,border:`1px solid ${P.acc}33`}}>
                <div style={{color:P.acc,fontSize:13,fontWeight:500,marginBottom:10}}>🎯 Ejercicio: ¿Qué tipo de dato es cada variable?</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {CLASSIFY_ITEMS.map(ci=>(
                    <div key={ci.id} style={{background:P.side,borderRadius:8,padding:"8px 12px"}}>
                      <code style={{display:"block",marginBottom:6,fontSize:12}}>{ci.text}</code>
                      <select style={{...inp,padding:"5px 8px",fontSize:12}}
                        value={classifyAnswers[ci.id]||""}
                        onChange={e=>setClassifyAnswers(a=>({...a,[ci.id]:e.target.value}))}>
                        <option value="">Seleccionar tipo...</option>
                        {DATA_TYPES.map(dt=><option key={dt.id} value={dt.id}>{dt.name}</option>)}
                      </select>
                      {classifyChecked&&(
                        <div style={{fontSize:11,marginTop:4,color:classifyAnswers[ci.id]===ci.correct?P.green:P.red}}>
                          {classifyAnswers[ci.id]===ci.correct?"✓ Correcto":"✗ Era: "+DATA_TYPES.find(d=>d.id===ci.correct)?.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:8,marginTop:12}}>
                  <button style={b()} onClick={()=>{setClassifyAnswers({});setClassifyChecked(false);}}>🔄 Limpiar</button>
                  <button style={{...b("p"),flex:1,opacity:Object.keys(classifyAnswers).length<4?0.5:1}}
                    onClick={()=>{
                      setClassifyChecked(true);
                      const correct=CLASSIFY_ITEMS.filter(ci=>classifyAnswers[ci.id]===ci.correct).length;
                      if(correct>=6&&!tp[0]){markTopicDone(0,25);setT1done(true);}
                    }} disabled={Object.keys(classifyAnswers).length<4}>
                    ✓ Verificar respuestas
                  </button>
                </div>
                {classifyChecked&&(
                  <div style={{marginTop:10,padding:"8px 12px",borderRadius:8,background:CLASSIFY_ITEMS.filter(ci=>classifyAnswers[ci.id]===ci.correct).length>=6?P.green+"18":P.amber+"18",animation:"pop .3s ease"}}>
                    <span style={{color:CLASSIFY_ITEMS.filter(ci=>classifyAnswers[ci.id]===ci.correct).length>=6?P.green:P.amber,fontWeight:500}}>
                      {CLASSIFY_ITEMS.filter(ci=>classifyAnswers[ci.id]===ci.correct).length>=6
                        ?"🎉 ¡Excelente! Dominas los tipos de datos (+25 pts)"
                        :`${CLASSIFY_ITEMS.filter(ci=>classifyAnswers[ci.id]===ci.correct).length}/8 correctas. Necesitas 6 para avanzar.`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TEMA 2: FUNCIONES Y ESTRUCTURAS ─────────────────── */}
        {activeTopic===1&&(
          <div>
            <div style={card()}>
              <h3 style={{margin:"0 0 4px",color:"#c5bfff",fontWeight:500,fontSize:16}}>🔀 Funciones y estructuras de control</h3>
              <p style={{margin:"0 0 12px",color:"#a0a0c0",fontSize:13,lineHeight:1.7}}>Las estructuras de control permiten que tu macro tome decisiones y repita acciones. Son el motor lógico de cualquier sistema contable.</p>
              <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                {STRUCTURES.map((st,i)=>(
                  <button key={st.id} onClick={()=>setSelectedStruct(i)}
                    style={{...b(selectedStruct===i?"p":"d"),fontSize:12,padding:"6px 14px",border:selectedStruct===i?"none":`1px solid ${st.color}44`,background:selectedStruct===i?st.color:st.color+"18",color:selectedStruct===i?"#fff":st.color}}>
                    {st.icon} {st.name}
                  </button>
                ))}
              </div>
              {(()=>{
                const st=STRUCTURES[selectedStruct];
                return(
                  <div style={{animation:"sli .3s ease"}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
                      <div style={{background:"#0d0d11",borderRadius:10,padding:14,borderLeft:`3px solid ${st.color}`}}>
                        <div style={{color:P.mut,fontSize:11,marginBottom:6}}>PLANTILLA</div>
                        <pre style={{color:"#7a78a0",fontSize:12}}>{st.template}</pre>
                      </div>
                      <div style={{background:"#0d0d11",borderRadius:10,padding:14,borderLeft:`3px solid ${st.color}`}}>
                        <div style={{color:P.mut,fontSize:11,marginBottom:6}}>EJEMPLO CONTABLE</div>
                        <pre style={{color:"#c5bfff",fontSize:12}}>{st.example}</pre>
                      </div>
                    </div>
                    <div style={{background:st.color+"15",borderRadius:8,padding:"10px 14px",marginBottom:14,border:`1px solid ${st.color}33`}}>
                      <span style={{color:st.color,fontSize:13}}>💡 {st.hint}</span>
                    </div>
                    {/* IF INTERACTIVO */}
                    {st.id==="if"&&(
                      <div style={{background:"#0d0d11",borderRadius:10,padding:14,marginBottom:14,border:`1px solid ${P.amber}33`}}>
                        <div style={{color:P.amber,fontSize:13,fontWeight:500,marginBottom:10}}>🎮 Simulador If/Then</div>
                        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
                          <div>
                            <label style={{color:P.mut,fontSize:12,display:"block",marginBottom:4}}>Total venta: ${ifVenta.toLocaleString()}</label>
                            <input type="range" min="0" max="3000000" step="50000" value={ifVenta} onChange={e=>setIfVenta(Number(e.target.value))} style={{width:200}}/>
                          </div>
                          <div style={{background:P.side,borderRadius:8,padding:"10px 14px",flex:1,minWidth:200}}>
                            <pre style={{color:"#c5bfff",fontSize:12,margin:0}}>{`If ${ifVenta.toLocaleString()} > 1.000.000 Then\n  descuento = ${ifVenta>1000000?(ifVenta*0.05).toLocaleString():0}\nElse\n  descuento = 0\nEnd If`}</pre>
                          </div>
                          <div style={{textAlign:"center",minWidth:100}}>
                            <div style={{fontSize:13,color:P.mut,marginBottom:4}}>Resultado:</div>
                            <div style={{fontSize:20,fontWeight:700,color:ifVenta>1000000?P.green:P.red}}>
                              ${ifVenta>1000000?(ifVenta*0.05).toLocaleString():"0"}
                            </div>
                            <div style={{fontSize:11,color:P.mut}}>descuento</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
              {!tp[1]&&<button style={{...b("p"),width:"100%",padding:10}} onClick={()=>{markTopicDone(1,25);setT2done(true);}}>✓ Entendí las estructuras de control (+25 pts)</button>}
            </div>
          </div>
        )}

        {/* ── TEMA 3: GRABADORA ────────────────────────────────── */}
        {activeTopic===2&&(
          <div>
            <div style={card()}>
              <h3 style={{margin:"0 0 4px",color:"#c5bfff",fontWeight:500,fontSize:16}}>⏺️ Grabadora de macros</h3>
              <p style={{margin:"0 0 14px",color:"#a0a0c0",fontSize:13,lineHeight:1.7}}>La grabadora convierte tus acciones en Excel en código VBA automáticamente. Es el punto de partida más fácil para aprender VBA.</p>
              {/* STEPPER */}
              <div style={{display:"flex",gap:0,marginBottom:16,overflowX:"auto"}}>
                {RECORDER_STEPS.map((rs,i)=>(
                  <div key={rs.id} onClick={()=>setRecStep(i)} style={{flex:1,minWidth:80,textAlign:"center",padding:"8px 6px",cursor:"pointer",
                    background:recStep>=i?"#7c6af722":P.side,borderBottom:recStep===i?`2px solid ${P.acc}`:"2px solid transparent",transition:"all .2s"}}>
                    <div style={{fontSize:16,marginBottom:3}}>{recStep>i?"✅":rs.icon}</div>
                    <div style={{fontSize:9,color:recStep>=i?"#c5bfff":P.mut,lineHeight:1.3}}>{rs.action}</div>
                  </div>
                ))}
              </div>
              {recStep>=0&&(()=>{
                const rs=RECORDER_STEPS[recStep];
                return(
                  <div style={{background:"#0d0d11",borderRadius:10,padding:16,marginBottom:14,borderLeft:`3px solid ${P.acc}`,animation:"sli .3s ease"}}>
                    <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                      <span style={{fontSize:28}}>{rs.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:500,color:"#c5bfff",fontSize:15,marginBottom:6}}>{rs.action}</div>
                        <pre style={{color:"#a0a0c0",fontSize:13,whiteSpace:"pre-wrap",lineHeight:1.7}}>{rs.detail}</pre>
                        {rs.code&&(
                          <div style={{marginTop:12}}>
                            <div style={{color:P.mut,fontSize:11,marginBottom:6}}>CÓDIGO GENERADO / MEJORADO</div>
                            <div style={{background:"#0a0a0e",borderRadius:8,padding:12,borderLeft:`3px solid ${recStep===6?P.green:P.amber}`}}>
                              <pre style={{color:"#c5bfff",fontSize:12}}>{rs.code}</pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                <button style={b()} onClick={()=>setRecStep(Math.max(-1,recStep-1))}>← Anterior</button>
                <button style={{...b("p"),flex:1}} onClick={()=>{
                  const next=recStep+1;
                  if(next<RECORDER_STEPS.length){setRecStep(next);}
                  else if(!tp[2]){markTopicDone(2,25);setRecDone(true);}
                }}>
                  {recStep<0?"▶ Comenzar":recStep<RECORDER_STEPS.length-1?"▶ Siguiente paso":"✓ Completar tema (+25 pts)"}
                </button>
              </div>
              {/* COMPARACIÓN GRABADO VS LIMPIO */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{background:"#0d0d11",borderRadius:8,padding:12,border:`1px solid ${P.amber}33`}}>
                  <div style={{...bdg(P.amber),marginBottom:8,fontSize:11}}>⚠ Código grabado (con redundancias)</div>
                  <pre style={{color:"#a07840",fontSize:11}}>{`Sub Macro1()\n    Range("B2").Select\n    Selection.Value = ""\n    Range("B2").Select\n    ActiveCell.FormulaR1C1 = "1001"\n    Range("B3").Select\nEnd Sub`}</pre>
                </div>
                <div style={{background:"#0d0d11",borderRadius:8,padding:12,border:`1px solid ${P.green}33`}}>
                  <div style={{...bdg(P.green),marginBottom:8,fontSize:11}}>✓ Código limpio (profesional)</div>
                  <pre style={{color:"#c5bfff",fontSize:11}}>{`Sub NuevaFactura()\n    Dim num As Long\n    num = Range("B2").Value + 1\n    Range("B2").Value = num\nEnd Sub`}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TEMA 4: EDITOR VBA ───────────────────────────────── */}
        {activeTopic===3&&(
          <div>
            <div style={card()}>
              <h3 style={{margin:"0 0 4px",color:"#c5bfff",fontWeight:500,fontSize:16}}>🖥️ Editor VBA — Áreas y Conceptos</h3>
              <p style={{margin:"0 0 12px",color:"#a0a0c0",fontSize:13,lineHeight:1.7}}>El Editor VBA (Alt+F11) tiene 4 áreas clave. Haz clic en cada concepto para explorar, luego escribe tu primer procedimiento.</p>
              {/* EDITOR VISUAL */}
              <div style={{background:"#f0f0f0",borderRadius:10,overflow:"hidden",marginBottom:14,border:"1px solid #ddd"}}>
                <div style={{background:"#1a1a3a",padding:"5px 12px",display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{color:"#a0a0ff",fontSize:11,fontWeight:500}}>Microsoft Visual Basic for Applications</span>
                  {EDITOR_AREAS.map((area,i)=>(
                    <span key={i} style={{color:"#8080cc",fontSize:10,cursor:"default"}}>{area}</span>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"180px 1fr",minHeight:160}}>
                  <div style={{background:"#f5f5ff",borderRight:"1px solid #ddd",padding:8}}>
                    <div style={{fontSize:10,color:"#666",marginBottom:4,fontWeight:600}}>Project Explorer</div>
                    <div style={{fontSize:11,color:"#333"}}>📁 VBAProject<br/>  📄 Módulo1<br/>  📋 ThisWorkbook<br/>  📋 Hoja1</div>
                  </div>
                  <div style={{background:"#fff",padding:8}}>
                    <div style={{background:"#e8e8ff",padding:"3px 8px",fontSize:10,color:"#444",marginBottom:4,borderRadius:4}}>Módulo1 (Code Window)</div>
                    <pre style={{color:"#1a1a8a",fontSize:12,background:"transparent"}}>{editorContent}</pre>
                  </div>
                </div>
                <div style={{background:"#f0f0ff",borderTop:"1px solid #ddd",padding:"4px 8px"}}>
                  <span style={{fontSize:10,color:"#666"}}>Immediate Window: ?2+2 → Enter → 4</span>
                </div>
              </div>
              {/* CONCEPTOS */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8,marginBottom:14}}>
                {VBA_CONCEPTS.map(vc=>(
                  <div key={vc.id} onClick={()=>setSelectedConcept(selectedConcept===vc.id?null:vc.id)}
                    style={{background:selectedConcept===vc.id?vc.color+"22":P.side,border:`1.5px solid ${selectedConcept===vc.id?vc.color:P.brd}`,
                      borderRadius:9,padding:"10px 12px",cursor:"pointer",transition:"all .2s"}}>
                    <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:16}}>{vc.icon}</span>
                      <span style={{fontWeight:500,color:vc.color,fontSize:12}}>{vc.name}</span>
                    </div>
                    <div style={{...bdg(vc.color),fontSize:9,marginBottom:4}}>{vc.cat}</div>
                    {selectedConcept===vc.id&&(
                      <div style={{marginTop:8,animation:"pop .2s ease"}}>
                        <p style={{color:"#a0a0c0",fontSize:12,margin:"0 0 6px",lineHeight:1.5}}>{vc.desc}</p>
                        <pre style={{background:"#0d0d11",padding:"8px 10px",borderRadius:6,color:"#c5bfff",fontSize:11}}>{vc.ex}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* MINI EDITOR */}
              <div style={{background:"#0d0d11",borderRadius:10,padding:14,border:`1px solid ${P.acc}33`,marginBottom:14}}>
                <div style={{color:P.acc,fontSize:13,fontWeight:500,marginBottom:8}}>✏️ Escribe tu primer procedimiento</div>
                <textarea style={{...inp,height:140,fontFamily:"Courier New,monospace",fontSize:12,lineHeight:1.7,resize:"vertical",marginBottom:10}}
                  value={editorContent} onChange={e=>setEditorContent(e.target.value)}/>
                <div style={{display:"flex",gap:8}}>
                  <button style={b()} onClick={()=>setEditorContent(`Sub MiPrimeraMacro()\n  ' Escribe tu código aquí\n  \nEnd Sub`)}>🔄 Limpiar</button>
                  <button style={{...b("p"),flex:1}} onClick={()=>{
                    const hasSub=editorContent.includes("Sub ")&&editorContent.includes("End Sub");
                    const hasDim=editorContent.toLowerCase().includes("dim ");
                    const hasRange=editorContent.toLowerCase().includes("range(")|| editorContent.toLowerCase().includes("cells(");
                    let out="";
                    if(!hasSub) out="⚠ Falta Sub ... End Sub";
                    else if(!hasDim) out="💡 Bien. Tip: agrega Dim para declarar variables";
                    else if(!hasRange) out="💡 Muy bien. Tip: usa Range() para acceder a celdas";
                    else out=`✅ ¡Excelente! Tu procedimiento tiene estructura correcta:\n✓ Sub/End Sub\n✓ Variables declaradas\n✓ Acceso a celdas`;
                    setRunOutput(out);
                    if(hasSub&&!tp[3]){markTopicDone(3,25);setT4done(true);}
                  }}>▶ Analizar código</button>
                </div>
                {runOutput&&(
                  <div style={{marginTop:10,padding:"10px 14px",borderRadius:8,background:runOutput.startsWith("✅")?P.green+"18":P.amber+"18",
                    border:`1px solid ${runOutput.startsWith("✅")?P.green:P.amber}44`,animation:"pop .3s ease"}}>
                    <pre style={{color:runOutput.startsWith("✅")?P.green:P.amber,fontSize:12,margin:0,whiteSpace:"pre-wrap"}}>{runOutput}</pre>
                  </div>
                )}
              </div>
            </div>

            {/* TODOS LOS TEMAS COMPLETOS */}
            {Object.keys(tp).length>=4&&(
              <div style={card({background:"#14131c",border:`1px solid ${P.acc}44`,textAlign:"center",padding:24})}>
                <div style={{animation:"cel .7s ease",display:"inline-block",marginBottom:8}}><Bit size={56} mood="h"/></div>
                <div style={{fontSize:18,fontWeight:600,color:"#c5bfff",marginBottom:4}}>🎓 ¡Módulo Macros completado! {totalPts}/100 pts</div>
                <div style={{color:P.mut,fontSize:12,marginBottom:14}}>{user?.email} · {new Date().toLocaleDateString("es-CO")}</div>
                <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
                  {topicNames.map((tn,i)=><span key={i} style={{...bdg(P.green),fontSize:11}}>✓ {topicIcons[i]} T{i+1}</span>)}
                </div>
                <button style={{...b("g"),padding:"9px 24px"}} onClick={()=>{
                  const lines=[
                    "════════════════════════════════",
                    "CERTIFICADO — MACROS Y SEGURIDAD",
                    "EduApp ITM","════════════════════════════════","",
                    `Estudiante: ${user.name}`,`Correo: ${user.email}`,
                    `Fecha: ${new Date().toLocaleDateString("es-CO")}`,
                    `Puntos: ${totalPts}/100`,"",
                    "Temas completados:",
                    ...topicNames.map((tn,i)=>`  ✓ T${i+1} — ${tn} (+25 pts)`),"",
                    "Próximo módulo: CRUD Completo de Facturación",
                  ];
                  const blob=new Blob([lines.join("\n")],{type:"text/plain"});
                  const a=document.createElement("a");a.href=URL.createObjectURL(blob);
                  a.download=`certificado_macros_${user.id}.txt`;a.click();
                }}>⬇ Descargar certificado</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
