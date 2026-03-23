import { useState } from "react";

// ── MASCOTA BIT ────────────────────────────────────────────────────
function BitOwl({ size = 80, animate = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={animate ? { animation: "float 3s ease-in-out infinite" } : {}}>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}} @keyframes blink{0%,90%,100%{scaleY:1}95%{transform:scaleY(0.1)}}`}</style>
      {/* Body */}
      <ellipse cx="50" cy="62" rx="28" ry="30" fill="#23213a" stroke="#7F77DD" strokeWidth="1.5"/>
      {/* Wings */}
      <ellipse cx="22" cy="70" rx="12" ry="18" fill="#1a1828" stroke="#534AB7" strokeWidth="1" transform="rotate(-15 22 70)"/>
      <ellipse cx="78" cy="70" rx="12" ry="18" fill="#1a1828" stroke="#534AB7" strokeWidth="1" transform="rotate(15 78 70)"/>
      {/* Head */}
      <circle cx="50" cy="36" r="22" fill="#23213a" stroke="#7F77DD" strokeWidth="1.5"/>
      {/* Ears */}
      <polygon points="32,18 28,6 38,14" fill="#23213a" stroke="#7F77DD" strokeWidth="1"/>
      <polygon points="68,18 72,6 62,14" fill="#23213a" stroke="#7F77DD" strokeWidth="1"/>
      {/* Face bg */}
      <ellipse cx="50" cy="38" rx="16" ry="14" fill="#16151d"/>
      {/* Eyes */}
      <circle cx="42" cy="34" r="8" fill="#0f0f13" stroke="#7F77DD" strokeWidth="1.5"/>
      <circle cx="58" cy="34" r="8" fill="#0f0f13" stroke="#7F77DD" strokeWidth="1.5"/>
      <circle cx="42" cy="34" r="5" fill="#7F77DD"/>
      <circle cx="58" cy="34" r="5" fill="#7F77DD"/>
      <circle cx="43.5" cy="32.5" r="1.5" fill="#fff"/>
      <circle cx="59.5" cy="32.5" r="1.5" fill="#fff"/>
      {/* Glasses */}
      <rect x="32" y="27" width="16" height="14" rx="4" fill="none" stroke="#c5bfff" strokeWidth="1.2"/>
      <rect x="51" y="27" width="16" height="14" rx="4" fill="none" stroke="#c5bfff" strokeWidth="1.2"/>
      <line x1="48" y1="33" x2="51" y2="33" stroke="#c5bfff" strokeWidth="1.2"/>
      {/* Beak */}
      <polygon points="47,42 53,42 50,47" fill="#BA7517"/>
      {/* Belly pattern */}
      <ellipse cx="50" cy="68" rx="16" ry="18" fill="#1a1828" stroke="#534AB7" strokeWidth="0.8"/>
      <ellipse cx="50" cy="72" rx="9" ry="10" fill="#16151d"/>
      {/* Feet */}
      <ellipse cx="42" cy="91" rx="7" ry="3" fill="#534AB7"/>
      <ellipse cx="58" cy="91" rx="7" ry="3" fill="#534AB7"/>
      {/* Tech dot */}
      <circle cx="50" cy="58" r="3" fill="#7F77DD" opacity="0.7"/>
      <circle cx="50" cy="58" r="1.5" fill="#c5bfff"/>
    </svg>
  );
}

// ── DATA ───────────────────────────────────────────────────────────
const MACRO_CLASSES = [
  { id: "c1", title: "Introducción a las macros en Excel", type: "text", content: "<h3>¿Qué es una macro?</h3><p>Una <strong>macro</strong> es una secuencia de instrucciones que automatiza tareas repetitivas en Excel. Se programan en <em>Visual Basic for Applications (VBA)</em>.</p><h4>¿Para qué sirven?</h4><ul><li>Automatizar reportes contables</li><li>Aplicar formatos masivos</li><li>Procesar grandes volúmenes de datos financieros</li></ul><p>En contaduría, las macros permiten generar estados financieros, conciliaciones y análisis de costos de forma automática.</p>", notebookUrl: "https://colab.research.google.com" },
  { id: "c2", title: "Grabadora de macros", type: "video", content: "https://www.youtube.com/embed/V9l8eM7RO6Q", notebookUrl: "https://colab.research.google.com", description: "Aprende a usar la grabadora de macros de Excel para registrar acciones y generar código VBA automáticamente." },
  { id: "c3", title: "Editor VBA — Estructura básica", type: "text", content: "<h3>El Editor de Visual Basic (VBE)</h3><p>Se accede con <strong>Alt + F11</strong>. Contiene:</p><ul><li><strong>Módulos:</strong> donde se escribe el código</li><li><strong>Objetos:</strong> hojas y libros</li><li><strong>Referencias:</strong> librerías externas</li></ul><h4>Estructura de un procedimiento:</h4><pre style='background:#0f0f13;padding:12px;border-radius:6px;font-size:12px;color:#c5bfff;overflow:auto'>Sub MiPrimeraMacro()\n  ' Esto es un comentario\n  Range(\"A1\").Value = \"Hola Contaduría\"\n  MsgBox \"¡Macro ejecutada!\"\nEnd Sub</pre><p>El prefijo <code>Sub</code> define el inicio y <code>End Sub</code> el cierre del procedimiento.</p>", notebookUrl: "https://colab.research.google.com" },
  { id: "c4", title: "Macros con formularios y botones", type: "slides", content: "https://docs.google.com/presentation/d/e/2PACX-1vSample/embed?start=false&loop=false", notebookUrl: "https://colab.research.google.com", description: "Cómo asignar macros a botones y crear formularios de usuario (UserForms) en Excel para interfaces más amigables." },
  { id: "c5", title: "Protección de hojas y libros", type: "text", content: "<h3>Proteger información en Excel</h3><p>Excel ofrece varios niveles de protección para resguardar datos financieros sensibles:</p><table style='width:100%;border-collapse:collapse;font-size:13px'><tr style='background:#23213a'><th style='padding:8px;text-align:left;color:#c5bfff'>Nivel</th><th style='padding:8px;text-align:left;color:#c5bfff'>Qué protege</th><th style='padding:8px;text-align:left;color:#c5bfff'>Cómo activar</th></tr><tr style='border-bottom:1px solid #2a2840'><td style='padding:8px;color:#b0adc4'>Hoja</td><td style='padding:8px;color:#b0adc4'>Celdas, fórmulas, estructura</td><td style='padding:8px;color:#b0adc4'>Revisar → Proteger hoja</td></tr><tr style='border-bottom:1px solid #2a2840'><td style='padding:8px;color:#b0adc4'>Libro</td><td style='padding:8px;color:#b0adc4'>Estructura de hojas</td><td style='padding:8px;color:#b0adc4'>Revisar → Proteger libro</td></tr><tr><td style='padding:8px;color:#b0adc4'>Archivo</td><td style='padding:8px;color:#b0adc4'>Apertura y escritura</td><td style='padding:8px;color:#b0adc4'>Guardar como → Herramientas → Contraseña</td></tr></table><p style='margin-top:12px'>Desde VBA: <code>ActiveSheet.Protect Password:=\"miClave123\"</code></p>", notebookUrl: "https://colab.research.google.com" },
  { id: "c6", title: "Seguridad y firma digital en Excel", type: "text", content: "<h3>Seguridad avanzada en Excel</h3><p>Para entornos profesionales en contaduría es fundamental garantizar la <strong>integridad y autenticidad</strong> de los archivos.</p><h4>Niveles de seguridad de macros</h4><ul><li><strong>Deshabilitar todas las macros:</strong> máxima seguridad</li><li><strong>Deshabilitar con notificación:</strong> el usuario decide</li><li><strong>Habilitar macros firmadas digitalmente</strong></li></ul><h4>Firma digital</h4><p>Una <em>firma digital</em> certifica que el código no ha sido alterado. Se obtiene con un certificado de una autoridad certificadora (CA) o mediante <strong>SelfCert.exe</strong> incluido en Office.</p><p>Ruta: <code>Archivo → Opciones → Centro de confianza → Configuración del Centro de confianza → Macros</code></p>", notebookUrl: "https://colab.research.google.com" },
];

const INITIAL_DATA = {
  users: [
    { id: 1, role: "admin", name: "Administrador ITM", email: "admin@itm.edu.co", password: "admin123" },
    { id: 2, role: "teacher", name: "Prof. Jorge Salazar", email: "j.salazar@itm.edu.co", password: "profe123" },
    { id: 3, role: "student", name: "Carlos Pérez", email: "carlos.perez@correo.itm.edu.co", password: "est123" },
    { id: 4, role: "student", name: "María Gómez", email: "maria.gomez@correo.itm.edu.co", password: "est123" },
    { id: 5, role: "student", name: "Luis Herrera", email: "luis.herrera@correo.itm.edu.co", password: "est123" },
    { id: 6, role: "student", name: "Ana Martínez", email: "ana.martinez@correo.itm.edu.co", password: "est123" },
    { id: 7, role: "student", name: "Santiago López", email: "santiago.lopez@correo.itm.edu.co", password: "est123" },
    { id: 8, role: "student", name: "Valentina Torres", email: "valentina.torres@correo.itm.edu.co", password: "est123" },
  ],
  courses: [{
    id: 1, name: "Informática para la Gestión",
    program: "Tecnología en Análisis de Costos y Presupuestos",
    credits: 3, teacher: "Prof. Jorge Salazar",
    competence: "Gestiona información operativa y financiera en un entorno empresarial mediante el uso de las tecnologías de la información para la toma de decisiones.",
    modules: [
      { id: 1, name: "Hoja de Cálculo", color: "#7F77DD", notebookUrl: "https://colab.research.google.com",
        topics: ["Fórmulas y funciones","Análisis de datos","Análisis estadístico","Gráficos y tendencias","Aplicaciones financieras"],
        classes: [
          { id: "hc1", title: "Fórmulas y funciones básicas", type: "text", content: "<h3>Fórmulas esenciales</h3><p>Excel usa <strong>fórmulas</strong> para calcular valores automáticamente. Toda fórmula inicia con <code>=</code>.</p><h4>Funciones financieras clave:</h4><ul><li><strong>SUMA, PROMEDIO, MAX, MIN</strong></li><li><strong>SI, SUMAR.SI, CONTAR.SI</strong></li><li><strong>BUSCARV / BUSCARX</strong> — búsquedas en tablas</li><li><strong>VNA, TIR</strong> — análisis de inversiones</li></ul><p>Ejemplo de función anidada: <code>=SI(A1>100, \"Alto\", \"Bajo\")</code></p>" },
          { id: "hc2", title: "Tablas dinámicas y filtros", type: "video", content: "https://www.youtube.com/embed/UGvQEuTKgNM", description: "Aprende a crear tablas dinámicas para analizar datos financieros de forma interactiva." },
        ],
        materials: [{ id: 101, type: "pdf", name: "Guía de fórmulas Excel.pdf", url: "#", uploadedBy: "Prof. Jorge Salazar", date: "2026-02-10" }]
      },
      { id: 2, name: "Bases de Datos", color: "#1D9E75", notebookUrl: "https://colab.research.google.com",
        topics: ["Modelo relacional","Técnicas de obtención de datos","Modificación de datos"],
        classes: [
          { id: "bd1", title: "Modelo relacional", type: "text", content: "<h3>Bases de datos relacionales</h3><p>Un modelo relacional organiza datos en <strong>tablas</strong> relacionadas entre sí mediante <em>llaves primarias y foráneas</em>.</p><p>Conceptos clave: tabla, registro, campo, llave primaria (PK), llave foránea (FK), relación 1:N, N:M.</p>" },
        ],
        materials: []
      },
      { id: 3, name: "Sistema ERP", color: "#D85A30", notebookUrl: "https://colab.research.google.com",
        topics: ["Componentes del sistema ERP","Transacciones","Nómina e inventarios","Reportes"],
        classes: [],
        materials: []
      },
      { id: 4, name: "Macros y Seguridad", color: "#378ADD", notebookUrl: "https://colab.research.google.com",
        topics: ["Introducción a macros","Grabadora de macros","Editor VBA","Formularios y botones","Protección de hojas","Firma digital"],
        classes: MACRO_CLASSES,
        materials: []
      },
    ],
    assessments: [
      { id: 1, name: "Taller – Análisis de datos", pct: 15, week: 3, module: "Hoja de Cálculo" },
      { id: 2, name: "Taller – Aplicaciones financieras y estadísticas", pct: 10, week: 5, module: "Hoja de Cálculo" },
      { id: 3, name: "Taller – Programación de macros y seguridad", pct: 15, week: 8, module: "Macros y Seguridad" },
      { id: 4, name: "Taller – Bases de datos", pct: 20, week: 12, module: "Bases de Datos" },
      { id: 5, name: "Taller – Gestión de recursos", pct: 20, week: 15, module: "Sistema ERP" },
      { id: 6, name: "Proyecto de curso", pct: 20, week: 16, module: "Todos" },
    ]
  }],
  groups: [
    { id: 1, name: "Grupo A", courseId: 1, moduleIds: [1,2,3,4], studentIds: [3,4,5,6] },
    { id: 2, name: "Grupo B", courseId: 1, moduleIds: [1,2,3,4], studentIds: [7,8] },
  ],
  grades: { 3:{1:4.2,2:3.8}, 4:{1:4.8,2:4.5,3:4.0}, 5:{1:3.5}, 6:{1:4.0,2:4.2,3:3.9,4:4.5}, 7:{1:3.9,2:3.6}, 8:{1:4.7,2:4.3,3:4.8,4:4.6} }
};

const MOD_COLORS = { "Hoja de Cálculo":"#7F77DD","Bases de Datos":"#1D9E75","Sistema ERP":"#D85A30","Macros y Seguridad":"#378ADD","Todos":"#888780" };
const TYPE_ICONS = { text:"📝", video:"▶", slides:"📊", pdf:"📄", link:"🔗" };

// ── STYLES ─────────────────────────────────────────────────────────
const S = {
  wrap: { display:"flex", height:"100vh", background:"#0f0f13", color:"#e8e6f0", fontFamily:"system-ui,sans-serif", fontSize:14, overflow:"hidden" },
  side: (open) => ({ width: open?210:54, background:"#16151d", borderRight:"1px solid #2a2840", transition:"width .2s", display:"flex", flexDirection:"column", flexShrink:0 }),
  navItem: (a) => ({ display:"flex", alignItems:"center", gap:10, padding:"9px 14px", cursor:"pointer", background:a?"#23213a":"transparent", borderLeft:a?"2px solid #7F77DD":"2px solid transparent", color:a?"#c5bfff":"#9897a9" }),
  card: { background:"#1e1d28", border:"1px solid #2a2840", borderRadius:10, padding:"16px 18px", marginBottom:14 },
  badge: (c) => ({ background:c+"22", color:c, fontSize:11, padding:"2px 8px", borderRadius:20, display:"inline-block" }),
  btn: (v="def") => ({ padding:"7px 14px", borderRadius:7, border:"none", cursor:"pointer", fontSize:13, fontWeight:500,
    background: v==="pri"?"#7F77DD":v==="danger"?"#993C1D22":v==="ghost"?"transparent":v==="green"?"#0F6E5622":"#2a2840",
    color: v==="pri"?"#fff":v==="danger"?"#f0997b":v==="ghost"?"#9897a9":v==="green"?"#1D9E75":"#c8c4e0" }),
  input: { width:"100%", background:"#0f0f13", border:"1px solid #2a2840", borderRadius:7, color:"#e8e6f0", padding:"8px 12px", fontSize:13, boxSizing:"border-box", marginBottom:10 },
  overlay: { position:"fixed", inset:0, background:"#000b", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" },
  modal: { background:"#1e1d28", border:"1px solid #3a3860", borderRadius:12, padding:24, width:460, maxHeight:"88vh", overflow:"auto" },
  label: { display:"block", color:"#9897a9", fontSize:12, marginBottom:4 },
  tag: { background:"#23213a", color:"#9897a9", fontSize:11, padding:"2px 8px", borderRadius:20, display:"inline-block", margin:"2px 3px" },
  metric: { background:"#16151d", border:"1px solid #2a2840", borderRadius:10, padding:"14px 18px", flex:1, minWidth:100 },
  row: { display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" },
};

export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [session, setSession] = useState(null); // { userId, role }
  const [loginForm, setLoginForm] = useState({ email:"", password:"", error:"" });
  const [view, setView] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [activeCourseId, setActiveCourseId] = useState(1);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [activeClassId, setActiveClassId] = useState(null);

  const user = session ? data.users.find(u=>u.id===session.userId) : null;
  const course = data.courses.find(c=>c.id===activeCourseId) || data.courses[0];
  const activeModule = activeModuleId ? course?.modules.find(m=>m.id===activeModuleId) : null;
  const activeClass = activeClassId && activeModule ? activeModule.classes.find(c=>c.id===activeClassId) : null;

  function openModal(type, item=null) { setModal(type); setEditId(item?.id||null); setForm(item?{...item}:{}); }
  function closeModal() { setModal(null); setForm({}); setEditId(null); }

  // ── LOGIN ────────────────────────────────────────────────────────
  function doLogin() {
    const u = data.users.find(x => x.email===loginForm.email && x.password===loginForm.password);
    if (!u) { setLoginForm({...loginForm, error:"Correo o contraseña incorrectos"}); return; }
    setSession({ userId: u.id, role: u.role });
    setView(u.role==="student" ? "micurso" : "dashboard");
    setLoginForm({ email:"", password:"", error:"" });
  }
  function logout() { setSession(null); setView("dashboard"); setActiveModuleId(null); setActiveClassId(null); }

  // ── HELPERS ──────────────────────────────────────────────────────
  const studentGroup = user?.role==="student" ? data.groups.find(g=>g.studentIds.includes(user.id)) : null;
  const studentCourse = studentGroup ? data.courses.find(c=>c.id===studentGroup.courseId) : null;
  const studentModules = studentGroup && studentCourse ? studentCourse.modules.filter(m=>studentGroup.moduleIds.includes(m.id)) : [];

  function calcAvg(uid) {
    const g = data.grades[uid]||{}; const c = course;
    if (!c) return "—";
    let total=0, w=0;
    c.assessments.forEach(a=>{ if(g[a.id]!==undefined){total+=g[a.id]*a.pct; w+=a.pct;} });
    return w>0?(total/w).toFixed(1):"—";
  }

  function validateStudentEmail(email) { return /^[^@]+@correo\.itm\.edu\.co$/.test(email); }

  // ── CRUD ─────────────────────────────────────────────────────────
  function saveUser() {
    const u={...data};
    if (form.role==="student" && !validateStudentEmail(form.email)) {
      alert("El correo del estudiante debe ser @correo.itm.edu.co"); return;
    }
    if (editId) { const i=u.users.findIndex(x=>x.id===editId); u.users[i]={...u.users[i],...form}; }
    else u.users.push({id:Date.now(),...form});
    setData(u); closeModal();
  }
  function deleteUser(id) { const u={...data}; u.users=u.users.filter(x=>x.id!==id); setData(u); }

  function saveGroup() {
    const u={...data};
    const mids=(form.moduleIds||[]).map(Number);
    const sids=(form.studentIdsRaw||"").split(",").map(s=>Number(s.trim())).filter(Boolean);
    if (editId) { const i=u.groups.findIndex(g=>g.id===editId); u.groups[i]={...u.groups[i],name:form.name,courseId:Number(form.courseId||1),moduleIds:mids,studentIds:sids}; }
    else u.groups.push({id:Date.now(),name:form.name,courseId:Number(form.courseId||1),moduleIds:mids,studentIds:sids});
    setData(u); closeModal();
  }
  function deleteGroup(id) { const u={...data}; u.groups=u.groups.filter(g=>g.id!==id); setData(u); }

  function saveModule() {
    const u={...data}; const c=u.courses.find(x=>x.id===activeCourseId);
    const topics=(form.topicsRaw||"").split("\n").map(s=>s.trim()).filter(Boolean);
    const colors=["#7F77DD","#1D9E75","#D85A30","#378ADD","#BA7517","#D4537E"];
    if (editId) { const i=c.modules.findIndex(m=>m.id===editId); c.modules[i]={...c.modules[i],name:form.name,topics,notebookUrl:form.notebookUrl||""}; }
    else c.modules.push({id:Date.now(),name:form.name,topics,color:colors[c.modules.length%colors.length],notebookUrl:form.notebookUrl||"",classes:[],materials:[]});
    setData(u); closeModal();
  }
  function deleteModule(id) { const u={...data}; const c=u.courses.find(x=>x.id===activeCourseId); c.modules=c.modules.filter(m=>m.id!==id); setData(u); }

  function saveClass() {
    const u={...data}; const mod=u.courses.find(x=>x.id===activeCourseId)?.modules.find(m=>m.id===activeModuleId);
    if (!mod) return;
    if (editId) { const i=mod.classes.findIndex(c=>c.id===editId); mod.classes[i]={...mod.classes[i],...form}; }
    else mod.classes.push({id:"cls_"+Date.now(),...form});
    setData(u); closeModal();
  }
  function deleteClass(id) {
    const u={...data}; const mod=u.courses.find(x=>x.id===activeCourseId)?.modules.find(m=>m.id===activeModuleId);
    mod.classes=mod.classes.filter(c=>c.id!==id); setData(u);
  }

  function saveCourse() {
    const u={...data};
    if (editId) { const i=u.courses.findIndex(c=>c.id===editId); u.courses[i]={...u.courses[i],...form,credits:Number(form.credits)}; }
    else u.courses.push({id:Date.now(),...form,credits:Number(form.credits)||3,modules:[],assessments:[]});
    setData(u); closeModal();
  }
  function deleteCourse(id) { const u={...data}; u.courses=u.courses.filter(c=>c.id!==id); setData(u); }

  // ── NAV CONFIG ───────────────────────────────────────────────────
  const navAdmin = [
    {id:"dashboard",label:"Dashboard",icon:"◈"},
    {id:"courses",label:"Cursos",icon:"📘"},
    {id:"modules",label:"Módulos",icon:"⊞"},
    {id:"groups",label:"Grupos",icon:"◎"},
    {id:"users",label:"Usuarios",icon:"⊙"},
    {id:"reports",label:"Reportes",icon:"▦"},
  ];
  const navTeacher = [
    {id:"dashboard",label:"Dashboard",icon:"◈"},
    {id:"modules",label:"Módulos",icon:"⊞"},
    {id:"assessments",label:"Evaluaciones",icon:"✓"},
    {id:"groups",label:"Grupos",icon:"◎"},
  ];
  const navStudent = [
    {id:"micurso",label:"Mi Curso",icon:"◈"},
    {id:"modulos",label:"Módulos",icon:"⊞"},
    {id:"evaluaciones",label:"Evaluaciones",icon:"✓"},
    {id:"misnotas",label:"Mis Notas",icon:"◎"},
  ];
  const nav = user?.role==="admin" ? navAdmin : user?.role==="teacher" ? navTeacher : navStudent;

  const roleColor = user?.role==="admin"?"#D85A30":user?.role==="teacher"?"#7F77DD":"#1D9E75";
  const roleLabel = user?.role==="admin"?"Admin":user?.role==="teacher"?"Docente":"Estudiante";

  // ── CONTENT RENDERER ─────────────────────────────────────────────
  function renderContent(cls, mod) {
    if (!cls) return null;
    if (cls.type==="video") return (
      <div>
        {cls.description && <p style={{color:"#b0adc4",marginBottom:16,lineHeight:1.7}}>{cls.description}</p>}
        <div style={{position:"relative",paddingBottom:"56.25%",height:0,overflow:"hidden",borderRadius:10,background:"#0f0f13"}}>
          <iframe src={cls.content} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none",borderRadius:10}} allowFullScreen title={cls.title}/>
        </div>
      </div>
    );
    if (cls.type==="slides") return (
      <div>
        {cls.description && <p style={{color:"#b0adc4",marginBottom:16,lineHeight:1.7}}>{cls.description}</p>}
        <div style={{position:"relative",paddingBottom:"56.25%",height:0,borderRadius:10,background:"#23213a",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
            <span style={{fontSize:40}}>📊</span>
            <span style={{color:"#9897a9",fontSize:13}}>Presentación</span>
            <a href={cls.content} target="_blank" rel="noreferrer" style={{...S.btn("pri"),textDecoration:"none",fontSize:12}}>Abrir presentación ↗</a>
          </div>
        </div>
      </div>
    );
    // text
    return <div style={{lineHeight:1.8,color:"#c8c4e0",fontSize:14}} dangerouslySetInnerHTML={{__html: cls.content}}/>;
  }

  // ── LOGIN SCREEN ─────────────────────────────────────────────────
  if (!session) return (
    <div style={{...S.wrap, alignItems:"center", justifyContent:"center", flexDirection:"column", background:"#0f0f13"}}>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        input{outline:none;} input:focus{border-color:#7F77DD!important;}
        a{color:#7F77DD}
      `}</style>
      <div style={{textAlign:"center",marginBottom:24}}>
        <BitOwl size={90} animate={true}/>
        <h1 style={{margin:"12px 0 4px",fontSize:24,fontWeight:500,color:"#c5bfff"}}>EduApp ITM</h1>
        <p style={{margin:0,color:"#9897a9",fontSize:13}}>Informática para la Gestión</p>
      </div>
      <div style={{background:"#1e1d28",border:"1px solid #3a3860",borderRadius:14,padding:28,width:320}}>
        <label style={S.label}>Correo institucional</label>
        <input style={S.input} value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})} placeholder="usuario@correo.itm.edu.co" onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
        <label style={S.label}>Contraseña</label>
        <input style={S.input} type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
        {loginForm.error && <p style={{color:"#f0997b",fontSize:12,margin:"0 0 10px"}}>{loginForm.error}</p>}
        <button style={{...S.btn("pri"),width:"100%",padding:"10px"}} onClick={doLogin}>Ingresar</button>
        <div style={{marginTop:18,borderTop:"1px solid #2a2840",paddingTop:14}}>
          <p style={{color:"#9897a9",fontSize:11,margin:"0 0 8px"}}>Accesos de prueba:</p>
          {[
            {label:"Admin",email:"admin@itm.edu.co",pwd:"admin123",c:"#D85A30"},
            {label:"Docente",email:"j.salazar@itm.edu.co",pwd:"profe123",c:"#7F77DD"},
            {label:"Estudiante",email:"carlos.perez@correo.itm.edu.co",pwd:"est123",c:"#1D9E75"},
          ].map(q=>(
            <div key={q.label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,cursor:"pointer"}} onClick={()=>setLoginForm({email:q.email,password:q.pwd,error:""})}>
              <span style={{...S.badge(q.c),cursor:"pointer"}}>{q.label}</span>
              <span style={{color:"#555",fontSize:11}}>{q.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── MAIN APP ─────────────────────────────────────────────────────
  return (
    <div style={S.wrap}>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        ::-webkit-scrollbar{width:5px;height:5px} ::-webkit-scrollbar-track{background:#0f0f13} ::-webkit-scrollbar-thumb{background:#2a2840;border-radius:3px}
        input,select,textarea{outline:none;} input:focus,select:focus,textarea:focus{border-color:#7F77DD!important;}
        .cls-item:hover{background:#23213a!important}
        pre{white-space:pre-wrap} code{background:#23213a;padding:2px 6px;border-radius:4px;font-size:12px;color:#c5bfff}
      `}</style>

      {/* SIDEBAR */}
      <div style={S.side(sideOpen)}>
        <div style={{padding:"14px 12px 10px",borderBottom:"1px solid #2a2840",display:"flex",alignItems:"center",gap:8}}>
          <BitOwl size={32}/>
          {sideOpen && <div><div style={{fontWeight:500,fontSize:14,color:"#c5bfff",lineHeight:1}}>EduApp</div><div style={{fontSize:10,color:"#534AB7"}}>by Bit 🦉</div></div>}
        </div>
        <nav style={{padding:"8px 0",flex:1,overflow:"auto"}}>
          {nav.map(n=>(
            <div key={n.id} style={S.navItem(view===n.id)} onClick={()=>{setView(n.id);setActiveModuleId(null);setActiveClassId(null);}}>
              <span style={{fontSize:14,flexShrink:0,width:22,textAlign:"center"}}>{n.icon}</span>
              {sideOpen && <span style={{fontSize:13}}>{n.label}</span>}
            </div>
          ))}
        </nav>
        <div style={{padding:"8px 0",borderTop:"1px solid #2a2840"}}>
          <div style={S.navItem(false)} onClick={()=>setSideOpen(!sideOpen)}>
            <span style={{fontSize:13,width:22,textAlign:"center"}}>{sideOpen?"◁":"▷"}</span>
            {sideOpen && <span style={{fontSize:12}}>Colapsar</span>}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* TOPBAR */}
        <div style={{background:"#16151d",borderBottom:"1px solid #2a2840",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:"#7F77DD",fontWeight:500,fontSize:14}}>{nav.find(n=>n.id===view)?.label||view}</span>
            {activeModule && <span style={{color:"#444",fontSize:12}}>/ {activeModule.name}</span>}
            {activeClass && <span style={{color:"#444",fontSize:12}}>/ {activeClass.title}</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={S.badge(roleColor)}>{roleLabel}</span>
            <span style={{color:"#9897a9",fontSize:12}}>{user?.name}</span>
            <button style={{...S.btn("ghost"),padding:"4px 10px",fontSize:12}} onClick={logout}>Salir</button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{flex:1,overflow:"auto",padding:20}}>

          {/* ── DASHBOARD ─────────────────────────────────────── */}
          {view==="dashboard" && (
            <div>
              <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
                <BitOwl size={56} animate/>
                <div>
                  <div style={{fontSize:18,fontWeight:500,color:"#c5bfff"}}>Bienvenido, {user?.name.split(" ")[0]} 👋</div>
                  <div style={{color:"#9897a9",fontSize:13}}>Panel de control — {roleLabel}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
                {user?.role==="admin"&&[
                  {label:"Cursos",val:data.courses.length,c:"#7F77DD"},
                  {label:"Usuarios",val:data.users.length,c:"#1D9E75"},
                  {label:"Grupos",val:data.groups.length,c:"#D85A30"},
                  {label:"Módulos",val:data.courses.reduce((s,c)=>s+c.modules.length,0),c:"#378ADD"},
                ].map(m=><div key={m.label} style={S.metric}><div style={{fontSize:24,fontWeight:500,color:m.c}}>{m.val}</div><div style={{fontSize:12,color:"#9897a9",marginTop:2}}>{m.label}</div></div>)}
                {user?.role==="teacher"&&[
                  {label:"Módulos",val:course?.modules.length,c:"#7F77DD"},
                  {label:"Clases",val:course?.modules.reduce((s,m)=>s+m.classes.length,0),c:"#1D9E75"},
                  {label:"Evaluaciones",val:course?.assessments.length,c:"#D85A30"},
                  {label:"Grupos",val:data.groups.filter(g=>g.courseId===course?.id).length,c:"#378ADD"},
                ].map(m=><div key={m.label} style={S.metric}><div style={{fontSize:24,fontWeight:500,color:m.c}}>{m.val}</div><div style={{fontSize:12,color:"#9897a9",marginTop:2}}>{m.label}</div></div>)}
              </div>
              {(user?.role==="admin"||user?.role==="teacher")&&course&&(
                <div style={S.card}>
                  <div style={{fontWeight:500,color:"#c5bfff",marginBottom:12}}>Módulos — {course.name}</div>
                  {course.modules.map(m=>(
                    <div key={m.id} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10,cursor:"pointer",padding:"8px 0",borderBottom:"1px solid #2a2840"}}
                      onClick={()=>{setView("modules");setActiveModuleId(m.id);}}>
                      <div style={{width:10,height:10,borderRadius:"50%",background:m.color,flexShrink:0}}/>
                      <span style={{flex:1,color:"#c5bfff"}}>{m.name}</span>
                      <span style={S.badge(m.color)}>{m.classes.length} clases</span>
                      <span style={{color:"#555",fontSize:12}}>Ver →</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── ADMIN: COURSES ────────────────────────────────── */}
          {view==="courses" && user?.role==="admin" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                <span style={{color:"#9897a9",fontSize:13}}>{data.courses.length} curso(s)</span>
                <button style={S.btn("pri")} onClick={()=>openModal("course")}>+ Nuevo curso</button>
              </div>
              {data.courses.map(c=>(
                <div key={c.id} style={S.card}>
                  <div style={S.row}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,color:"#c5bfff",marginBottom:4}}>{c.name}</div>
                      <div style={{color:"#9897a9",fontSize:12,marginBottom:6}}>{c.program}</div>
                      <div style={S.row}><span style={S.badge("#7F77DD")}>{c.credits} créditos</span><span style={S.badge("#1D9E75")}>{c.modules.length} módulos</span><span style={S.badge("#378ADD")}>Docente: {c.teacher}</span></div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button style={S.btn()} onClick={()=>{setActiveCourseId(c.id);setView("modules");}}>Módulos</button>
                      <button style={S.btn()} onClick={()=>openModal("course",{...c})}>Editar</button>
                      <button style={S.btn("danger")} onClick={()=>deleteCourse(c.id)}>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── MODULES (admin + teacher) ─────────────────────── */}
          {view==="modules" && (user?.role==="admin"||user?.role==="teacher") && (()=>{
            if (activeClass && activeModule) return (
              <div>
                <button style={{...S.btn("ghost"),marginBottom:16,paddingLeft:0}} onClick={()=>setActiveClassId(null)}>← {activeModule.name}</button>
                <div style={{...S.card,borderLeft:`3px solid ${activeModule.color}`,marginBottom:20}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                    <div style={{fontWeight:500,color:"#c5bfff",fontSize:16}}>{activeClass.title}</div>
                    <span style={S.badge(activeModule.color)}>{TYPE_ICONS[activeClass.type]} {activeClass.type}</span>
                  </div>
                  <div style={{marginTop:16}}>{renderContent(activeClass,activeModule)}</div>
                  {(activeModule.notebookUrl||activeClass.notebookUrl) && (
                    <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid #2a2840"}}>
                      <a href={activeClass.notebookUrl||activeModule.notebookUrl} target="_blank" rel="noreferrer"
                        style={{...S.btn("green"),textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6}}>
                        🗒️ Abrir Notebook ↗
                      </a>
                    </div>
                  )}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <span style={{color:"#9897a9",fontSize:13}}>Otras clases del módulo</span>
                </div>
                {activeModule.classes.filter(c=>c.id!==activeClassId).map(c=>(
                  <div key={c.id} className="cls-item" style={{...S.card,cursor:"pointer",padding:"12px 16px",marginBottom:8,background:"#1a1928"}} onClick={()=>setActiveClassId(c.id)}>
                    <span style={{color:"#9897a9",marginRight:8}}>{TYPE_ICONS[c.type]}</span>
                    <span style={{color:"#c5bfff"}}>{c.title}</span>
                  </div>
                ))}
              </div>
            );
            if (activeModule) return (
              <div>
                <button style={{...S.btn("ghost"),marginBottom:16,paddingLeft:0}} onClick={()=>{setActiveModuleId(null);setActiveClassId(null);}}>← Todos los módulos</button>
                <div style={{...S.card,borderLeft:`3px solid ${activeModule.color}`,marginBottom:20}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,color:"#c5bfff",fontSize:16,marginBottom:8}}>{activeModule.name}</div>
                      <div style={{marginBottom:8}}>{activeModule.topics.map(t=><span key={t} style={S.tag}>{t}</span>)}</div>
                      {activeModule.notebookUrl && <div style={{fontSize:12,color:"#9897a9"}}>Notebook: <a href={activeModule.notebookUrl} target="_blank" rel="noreferrer" style={{color:"#1D9E75"}}>{activeModule.notebookUrl}</a></div>}
                    </div>
                    <button style={S.btn()} onClick={()=>openModal("module",{...activeModule,topicsRaw:activeModule.topics.join("\n")})}>Editar módulo</button>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <span style={{fontWeight:500,color:"#c5bfff"}}>Clases ({activeModule.classes.length})</span>
                  <button style={S.btn("pri")} onClick={()=>openModal("class")}>+ Nueva clase</button>
                </div>
                {activeModule.classes.length===0 && <div style={{...S.card,color:"#9897a9",textAlign:"center",padding:32}}>Sin clases aún. Agrega la primera.</div>}
                {activeModule.classes.map((cls,i)=>(
                  <div key={cls.id} style={{...S.card,display:"flex",alignItems:"center",gap:12,marginBottom:8,padding:"12px 16px"}}>
                    <span style={{color:"#534AB7",fontSize:12,width:20,textAlign:"center"}}>{i+1}</span>
                    <span style={{fontSize:16}}>{TYPE_ICONS[cls.type]}</span>
                    <span style={{flex:1,color:"#c5bfff",cursor:"pointer"}} onClick={()=>setActiveClassId(cls.id)}>{cls.title}</span>
                    <span style={S.badge(activeModule.color)}>{cls.type}</span>
                    <button style={S.btn()} onClick={()=>openModal("class",cls)}>Editar</button>
                    <button style={S.btn("danger")} onClick={()=>deleteClass(cls.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            );
            return (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                  <span style={{color:"#9897a9",fontSize:13}}>{course?.modules.length} módulo(s) — {course?.name}</span>
                  {user?.role==="admin" && <button style={S.btn("pri")} onClick={()=>openModal("module")}>+ Nuevo módulo</button>}
                </div>
                {course?.modules.map(m=>(
                  <div key={m.id} style={{...S.card,borderLeft:`3px solid ${m.color}`}}>
                    <div style={S.row}>
                      <div style={{flex:1,cursor:"pointer"}} onClick={()=>setActiveModuleId(m.id)}>
                        <div style={{fontWeight:500,color:"#c5bfff",marginBottom:8}}>{m.name}</div>
                        <div style={S.row}>{m.topics.map(t=><span key={t} style={S.tag}>{t}</span>)}<span style={{...S.badge(m.color),marginLeft:4}}>{m.classes.length} clases</span></div>
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        <button style={S.btn()} onClick={()=>setActiveModuleId(m.id)}>Ver clases</button>
                        {user?.role==="admin" && <><button style={S.btn()} onClick={()=>openModal("module",{...m,topicsRaw:m.topics.join("\n")})}>Editar</button><button style={S.btn("danger")} onClick={()=>deleteModule(m.id)}>Eliminar</button></>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* ── ASSESSMENTS (teacher) ─────────────────────────── */}
          {view==="assessments" && user?.role==="teacher" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <span style={{color:course?.assessments.reduce((s,a)=>s+a.pct,0)===100?"#1D9E75":"#D85A30",fontSize:13}}>
                  Total: {course?.assessments.reduce((s,a)=>s+a.pct,0)}%
                </span>
                <button style={S.btn("pri")} onClick={()=>openModal("assessment")}>+ Nueva</button>
              </div>
              {course?.assessments.sort((a,b)=>a.week-b.week).map(a=>(
                <div key={a.id} style={{...S.card,borderLeft:`3px solid ${MOD_COLORS[a.module]||"#7F77DD"}`}}>
                  <div style={S.row}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,color:"#c5bfff",marginBottom:6}}>{a.name}</div>
                      <div style={S.row}><span style={S.badge(MOD_COLORS[a.module]||"#7F77DD")}>{a.module}</span><span style={S.badge("#378ADD")}>Sem. {a.week}</span><span style={S.badge("#BA7517")}>{a.pct}%</span></div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button style={S.btn()} onClick={()=>openModal("assessment",a)}>Editar</button>
                      <button style={S.btn("danger")} onClick={()=>{const u={...data};u.courses.find(c=>c.id===activeCourseId).assessments=u.courses.find(c=>c.id===activeCourseId).assessments.filter(x=>x.id!==a.id);setData(u);}}>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── GROUPS (admin + teacher) ──────────────────────── */}
          {view==="groups" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                <span style={{color:"#9897a9",fontSize:13}}>{data.groups.length} grupo(s)</span>
                {user?.role==="admin" && <button style={S.btn("pri")} onClick={()=>openModal("group")}>+ Nuevo grupo</button>}
              </div>
              {data.groups.map(g=>{
                const gc=data.courses.find(c=>c.id===g.courseId);
                const mods=gc?gc.modules.filter(m=>g.moduleIds.includes(m.id)):[];
                const students=data.users.filter(u=>g.studentIds.includes(u.id));
                return (
                  <div key={g.id} style={S.card}>
                    <div style={S.row}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:500,color:"#c5bfff",marginBottom:4}}>{g.name}</div>
                        <div style={{color:"#9897a9",fontSize:12,marginBottom:8}}>{gc?.name} · {students.length} estudiantes</div>
                        <div style={{marginBottom:8}}>{mods.map(m=><span key={m.id} style={{...S.badge(m.color),marginRight:4}}>{m.name}</span>)}</div>
                        <div>{students.map(s=><span key={s.id} style={S.tag}>{s.name}</span>)}</div>
                      </div>
                      {user?.role==="admin" && <div style={{display:"flex",gap:8,marginTop:8}}>
                        <button style={S.btn()} onClick={()=>openModal("group",{...g,studentIdsRaw:g.studentIds.join(",")})}>Editar</button>
                        <button style={S.btn("danger")} onClick={()=>deleteGroup(g.id)}>Eliminar</button>
                      </div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── USERS (admin) ─────────────────────────────────── */}
          {view==="users" && user?.role==="admin" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                <span style={{color:"#9897a9",fontSize:13}}>{data.users.length} usuario(s)</span>
                <button style={S.btn("pri")} onClick={()=>openModal("user")}>+ Nuevo usuario</button>
              </div>
              {["admin","teacher","student"].map(r=>(
                <div key={r} style={{marginBottom:20}}>
                  <div style={{color:"#9897a9",fontSize:12,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>{r==="admin"?"Administradores":r==="teacher"?"Docentes":"Estudiantes"}</div>
                  {data.users.filter(u=>u.role===r).map(u=>(
                    <div key={u.id} style={{...S.card,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:36,height:36,borderRadius:"50%",background:r==="admin"?"#D85A3022":r==="teacher"?"#7F77DD22":"#1D9E7522",display:"flex",alignItems:"center",justifyContent:"center",color:r==="admin"?"#D85A30":r==="teacher"?"#7F77DD":"#1D9E75",fontSize:12,fontWeight:500,flexShrink:0}}>
                        {u.name.split(" ").filter(w=>!["Prof.","Dr.","Mg."].includes(w)).map(w=>w[0]).join("").slice(0,2)}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{color:"#c5bfff",fontWeight:500}}>{u.name}</div>
                        <div style={{color:"#9897a9",fontSize:12}}>{u.email}</div>
                      </div>
                      <span style={S.badge(r==="admin"?"#D85A30":r==="teacher"?"#7F77DD":"#1D9E75")}>{r}</span>
                      <button style={S.btn()} onClick={()=>openModal("user",u)}>Editar</button>
                      {u.id!==session.userId && <button style={S.btn("danger")} onClick={()=>deleteUser(u.id)}>Eliminar</button>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ── REPORTS (admin) ───────────────────────────────── */}
          {view==="reports" && user?.role==="admin" && (
            <div>
              <div style={{fontWeight:500,color:"#c5bfff",marginBottom:16,fontSize:16}}>Reporte global de estudiantes</div>
              {data.courses.map(c=>(
                <div key={c.id} style={{...S.card,marginBottom:20}}>
                  <div style={{fontWeight:500,color:"#c5bfff",marginBottom:12}}>{c.name}</div>
                  {data.users.filter(u=>u.role==="student").map(st=>{
                    const g=data.grades[st.id]||{};
                    const notasReg=c.assessments.filter(a=>g[a.id]!==undefined).length;
                    let avg="—",total=0,w=0;
                    c.assessments.forEach(a=>{ if(g[a.id]!==undefined){total+=g[a.id]*a.pct;w+=a.pct;} });
                    if(w>0) avg=(total/w).toFixed(1);
                    const avgN=parseFloat(avg);
                    const grp=data.groups.find(gr=>gr.studentIds.includes(st.id)&&gr.courseId===c.id);
                    return (
                      <div key={st.id} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:"1px solid #2a2840"}}>
                        <span style={{flex:2,color:"#c5bfff",fontSize:13}}>{st.name}</span>
                        <span style={{flex:1,color:"#9897a9",fontSize:12}}>{grp?.name||"Sin grupo"}</span>
                        <span style={{width:70,fontSize:12,color:"#9897a9"}}>{notasReg}/{c.assessments.length} notas</span>
                        <span style={{width:50,fontWeight:500,color:avgN>=3?"#1D9E75":avgN>0?"#D85A30":"#555"}}>{avg}</span>
                        <div style={{width:80,background:"#0f0f13",borderRadius:3,height:5}}>
                          {avgN>0&&<div style={{width:`${(avgN/5)*100}%`,background:avgN>=3?"#1D9E75":"#D85A30",height:5,borderRadius:3}}/>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* ── STUDENT VIEWS ─────────────────────────────────── */}
          {view==="micurso" && user?.role==="student" && studentCourse && (
            <div>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                <BitOwl size={52} animate/>
                <div>
                  <div style={{fontSize:16,fontWeight:500,color:"#c5bfff"}}>¡Hola, {user.name.split(" ")[0]}!</div>
                  <div style={{color:"#9897a9",fontSize:13}}>Bit te acompaña en tu aprendizaje 🦉</div>
                </div>
              </div>
              <div style={{...S.card,borderLeft:"3px solid #7F77DD",marginBottom:20}}>
                <div style={{fontWeight:500,color:"#c5bfff",fontSize:15,marginBottom:4}}>{studentCourse.name}</div>
                <div style={{color:"#9897a9",fontSize:12,marginBottom:8}}>{studentCourse.program}</div>
                <div style={S.row}>
                  <span style={S.badge("#7F77DD")}>Docente: {studentCourse.teacher}</span>
                  <span style={S.badge("#1D9E75")}>{studentGroup?.name||"Sin grupo"}</span>
                  <span style={S.badge("#378ADD")}>{studentCourse.credits} créditos</span>
                </div>
              </div>
              <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
                {[
                  {label:"Promedio",val:calcAvg(user.id),c:"#7F77DD"},
                  {label:"Módulos",val:studentModules.length,c:"#1D9E75"},
                  {label:"Evaluaciones",val:studentCourse.assessments.length,c:"#D85A30"},
                ].map(m=><div key={m.label} style={S.metric}><div style={{fontSize:22,fontWeight:500,color:m.c}}>{m.val}</div><div style={{fontSize:12,color:"#9897a9",marginTop:2}}>{m.label}</div></div>)}
              </div>
              {studentModules.map(m=>(
                <div key={m.id} style={{...S.card,borderLeft:`3px solid ${m.color}`,cursor:"pointer"}} onClick={()=>{setView("modulos");setActiveModuleId(m.id);}}>
                  <div style={S.row}>
                    <div style={{flex:1}}><span style={{fontWeight:500,color:"#c5bfff"}}>{m.name}</span><span style={{...S.badge(m.color),marginLeft:10}}>{m.classes.length} clases</span></div>
                    <span style={{color:"#555",fontSize:12}}>Ver →</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view==="modulos" && user?.role==="student" && (()=>{
            const mod = activeModuleId ? studentCourse?.modules.find(m=>m.id===activeModuleId) : null;
            const cls = activeClassId && mod ? mod.classes.find(c=>c.id===activeClassId) : null;
            if (cls && mod) return (
              <div>
                <button style={{...S.btn("ghost"),marginBottom:16,paddingLeft:0}} onClick={()=>setActiveClassId(null)}>← {mod.name}</button>
                <div style={{...S.card,borderLeft:`3px solid ${mod.color}`,marginBottom:20}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div style={{fontWeight:500,color:"#c5bfff",fontSize:16}}>{cls.title}</div>
                    <span style={S.badge(mod.color)}>{TYPE_ICONS[cls.type]} {cls.type}</span>
                  </div>
                  <div style={{marginTop:16}}>{renderContent(cls,mod)}</div>
                  {(mod.notebookUrl||cls.notebookUrl) && (
                    <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid #2a2840"}}>
                      <a href={cls.notebookUrl||mod.notebookUrl} target="_blank" rel="noreferrer"
                        style={{...S.btn("green"),textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6}}>
                        🗒️ Abrir Notebook ↗
                      </a>
                    </div>
                  )}
                </div>
                <div style={{color:"#9897a9",fontSize:13,marginBottom:8}}>Más clases de este módulo:</div>
                {mod.classes.filter(c=>c.id!==activeClassId).map(c=>(
                  <div key={c.id} className="cls-item" style={{...S.card,cursor:"pointer",padding:"10px 16px",marginBottom:8,background:"#1a1928"}} onClick={()=>setActiveClassId(c.id)}>
                    <span style={{color:"#9897a9",marginRight:8}}>{TYPE_ICONS[c.type]}</span>
                    <span style={{color:"#c5bfff"}}>{c.title}</span>
                  </div>
                ))}
              </div>
            );
            if (mod) return (
              <div>
                <button style={{...S.btn("ghost"),marginBottom:16,paddingLeft:0}} onClick={()=>{setActiveModuleId(null);setActiveClassId(null);}}>← Módulos</button>
                <div style={{...S.card,borderLeft:`3px solid ${mod.color}`,marginBottom:20}}>
                  <div style={{fontWeight:500,color:"#c5bfff",fontSize:16,marginBottom:8}}>{mod.name}</div>
                  <div>{mod.topics.map(t=><span key={t} style={S.tag}>{t}</span>)}</div>
                </div>
                <div style={{fontWeight:500,color:"#c5bfff",marginBottom:12}}>Clases ({mod.classes.length})</div>
                {mod.classes.length===0&&<div style={{...S.card,color:"#9897a9",textAlign:"center",padding:32}}>El docente aún no ha publicado clases.</div>}
                {mod.classes.map((cls,i)=>(
                  <div key={cls.id} className="cls-item" style={{...S.card,display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:8,padding:"12px 16px",background:"#1a1928"}} onClick={()=>setActiveClassId(cls.id)}>
                    <span style={{color:"#534AB7",fontSize:12,width:20}}>{i+1}</span>
                    <span style={{fontSize:16}}>{TYPE_ICONS[cls.type]}</span>
                    <span style={{flex:1,color:"#c5bfff"}}>{cls.title}</span>
                    <span style={S.badge(mod.color)}>{cls.type}</span>
                  </div>
                ))}
              </div>
            );
            return (
              <div>
                {studentModules.map(m=>(
                  <div key={m.id} style={{...S.card,borderLeft:`3px solid ${m.color}`,cursor:"pointer"}} onClick={()=>setActiveModuleId(m.id)}>
                    <div style={S.row}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:500,color:"#c5bfff",marginBottom:6}}>{m.name}</div>
                        <div>{m.topics.map(t=><span key={t} style={S.tag}>{t}</span>)}</div>
                      </div>
                      <span style={S.badge(m.color)}>{m.classes.length} clases</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {view==="evaluaciones" && user?.role==="student" && (
            <div>
              {studentCourse?.assessments.sort((a,b)=>a.week-b.week).map(a=>{
                const nota=(data.grades[user.id]||{})[a.id];
                return (
                  <div key={a.id} style={{...S.card,borderLeft:`3px solid ${MOD_COLORS[a.module]||"#7F77DD"}`}}>
                    <div style={S.row}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:500,color:"#c5bfff",marginBottom:6}}>{a.name}</div>
                        <div style={S.row}><span style={S.badge(MOD_COLORS[a.module]||"#7F77DD")}>{a.module}</span><span style={S.badge("#378ADD")}>Semana {a.week}</span><span style={S.badge("#BA7517")}>{a.pct}%</span></div>
                      </div>
                      {nota!==undefined?<div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:500,color:nota>=3?"#1D9E75":"#D85A30"}}>{nota}</div><div style={{fontSize:11,color:"#9897a9"}}>/5.0</div></div>:<span style={S.badge("#444")}>Pendiente</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {view==="misnotas" && user?.role==="student" && (
            <div>
              <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
                <div style={S.metric}><div style={{fontSize:26,fontWeight:500,color:parseFloat(calcAvg(user.id))>=3?"#1D9E75":"#D85A30"}}>{calcAvg(user.id)}</div><div style={{fontSize:12,color:"#9897a9",marginTop:2}}>Promedio ponderado</div></div>
                <div style={S.metric}><div style={{fontSize:26,fontWeight:500,color:"#7F77DD"}}>{Object.keys(data.grades[user.id]||{}).length}/{studentCourse?.assessments.length||0}</div><div style={{fontSize:12,color:"#9897a9",marginTop:2}}>Notas registradas</div></div>
              </div>
              {studentCourse?.assessments.map(a=>{
                const nota=(data.grades[user.id]||{})[a.id];
                return (
                  <div key={a.id} style={{...S.card,display:"flex",alignItems:"center",gap:12}}>
                    <div style={{flex:1}}><div style={{fontWeight:500,color:"#c5bfff",fontSize:13}}>{a.name}</div><div style={{color:"#9897a9",fontSize:12}}>Peso: {a.pct}% · Semana {a.week}</div></div>
                    {nota!==undefined?<div style={{textAlign:"center",minWidth:50}}><div style={{fontSize:18,fontWeight:500,color:nota>=3?"#1D9E75":"#D85A30"}}>{nota}</div><div style={{fontSize:10,color:"#9897a9"}}>/5.0</div></div>:<span style={S.badge("#444")}>Pendiente</span>}
                    <div style={{width:70,background:"#0f0f13",borderRadius:3,height:5}}>{nota&&<div style={{width:`${(nota/5)*100}%`,height:5,borderRadius:3,background:nota>=3?"#1D9E75":"#D85A30"}}/>}</div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* ── MODALS ────────────────────────────────────────────────── */}
      {modal && (
        <div style={S.overlay} onClick={e=>e.target===e.currentTarget&&closeModal()}>
          <div style={S.modal}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <span style={{fontSize:16,fontWeight:500,color:"#c5bfff"}}>
                {{user:"Usuario",group:"Grupo",module:"Módulo",class:"Clase",course:"Curso",assessment:"Evaluación"}[modal]} — {editId?"Editar":"Nuevo"}
              </span>
              <button onClick={closeModal} style={{background:"none",border:"none",color:"#9897a9",cursor:"pointer",fontSize:20}}>×</button>
            </div>

            {modal==="user" && <>
              <label style={S.label}>Nombre completo</label>
              <input style={S.input} value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Nombre Apellido"/>
              <label style={S.label}>Correo</label>
              <input style={S.input} value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})} placeholder="usuario@correo.itm.edu.co"/>
              {form.role==="student"&&<p style={{color:"#9897a9",fontSize:11,margin:"-6px 0 8px"}}>✓ Debe ser @correo.itm.edu.co para estudiantes</p>}
              <label style={S.label}>Contraseña</label>
              <input style={S.input} type="password" value={form.password||""} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••"/>
              <label style={S.label}>Rol</label>
              <select style={S.input} value={form.role||"student"} onChange={e=>setForm({...form,role:e.target.value})}>
                <option value="student">Estudiante</option>
                <option value="teacher">Docente</option>
                <option value="admin">Administrador</option>
              </select>
            </>}

            {modal==="group" && <>
              <label style={S.label}>Nombre del grupo</label>
              <input style={S.input} value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="ej. Grupo C"/>
              <label style={S.label}>Curso</label>
              <select style={S.input} value={form.courseId||1} onChange={e=>setForm({...form,courseId:e.target.value})}>
                {data.courses.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <label style={S.label}>Módulos asignados</label>
              <div style={{marginBottom:10}}>
                {(data.courses.find(c=>c.id===Number(form.courseId||1))||data.courses[0])?.modules.map(m=>(
                  <label key={m.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,cursor:"pointer"}}>
                    <input type="checkbox" checked={(form.moduleIds||[]).map(Number).includes(m.id)}
                      onChange={e=>{const ids=(form.moduleIds||[]).map(Number);setForm({...form,moduleIds:e.target.checked?[...ids,m.id]:ids.filter(x=>x!==m.id)});}}/>
                    <span style={{color:"#c5bfff",fontSize:13}}>{m.name}</span>
                  </label>
                ))}
              </div>
              <label style={S.label}>IDs de estudiantes (separados por coma)</label>
              <input style={S.input} value={form.studentIdsRaw||""} onChange={e=>setForm({...form,studentIdsRaw:e.target.value})} placeholder="3,4,5,6"/>
              <div style={{marginBottom:10}}>
                {data.users.filter(u=>u.role==="student").map(u=><span key={u.id} style={{...S.tag,cursor:"pointer"}} onClick={()=>{const cur=(form.studentIdsRaw||"").split(",").map(s=>s.trim()).filter(Boolean);const has=cur.includes(String(u.id));setForm({...form,studentIdsRaw:has?cur.filter(x=>x!==String(u.id)).join(","):[...cur,u.id].join(",")});}}>
                  {(form.studentIdsRaw||"").includes(String(u.id))?"✓ ":""}{u.name} ({u.id})
                </span>)}
              </div>
            </>}

            {modal==="module" && <>
              <label style={S.label}>Nombre del módulo</label>
              <input style={S.input} value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="ej. Hoja de Cálculo"/>
              <label style={S.label}>Temas (uno por línea)</label>
              <textarea style={{...S.input,height:100,resize:"vertical"}} value={form.topicsRaw||""} onChange={e=>setForm({...form,topicsRaw:e.target.value})} placeholder={"Fórmulas\nAnálisis de datos\n..."}/>
              <label style={S.label}>URL del Notebook (configurable)</label>
              <input style={S.input} value={form.notebookUrl||""} onChange={e=>setForm({...form,notebookUrl:e.target.value})} placeholder="https://colab.research.google.com/..."/>
            </>}

            {modal==="class" && <>
              <label style={S.label}>Título de la clase</label>
              <input style={S.input} value={form.title||""} onChange={e=>setForm({...form,title:e.target.value})} placeholder="ej. Introducción a macros"/>
              <label style={S.label}>Tipo de contenido</label>
              <select style={S.input} value={form.type||"text"} onChange={e=>setForm({...form,type:e.target.value})}>
                <option value="text">📝 Texto formateado</option>
                <option value="video">▶ Video (YouTube embed)</option>
                <option value="slides">📊 Presentación (Google Slides / PowerPoint)</option>
                <option value="pdf">📄 PDF / Documento</option>
              </select>
              {(form.type==="text"||!form.type)&&<>
                <label style={S.label}>Contenido HTML</label>
                <textarea style={{...S.input,height:160,resize:"vertical",fontFamily:"monospace",fontSize:12}} value={form.content||""} onChange={e=>setForm({...form,content:e.target.value})} placeholder="<h3>Título</h3><p>Contenido <strong>formateado</strong></p><ul><li>Punto 1</li></ul>"/>
              </>}
              {(form.type==="video"||form.type==="slides"||form.type==="pdf")&&<>
                <label style={S.label}>URL / Embed URL</label>
                <input style={S.input} value={form.content||""} onChange={e=>setForm({...form,content:e.target.value})} placeholder="https://www.youtube.com/embed/..."/>
                <label style={S.label}>Descripción breve</label>
                <input style={S.input} value={form.description||""} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe de qué trata este recurso"/>
              </>}
              <label style={S.label}>URL Notebook (opcional, sobreescribe la del módulo)</label>
              <input style={S.input} value={form.notebookUrl||""} onChange={e=>setForm({...form,notebookUrl:e.target.value})} placeholder="https://colab.research.google.com/..."/>
            </>}

            {modal==="course" && <>
              <label style={S.label}>Nombre del curso</label>
              <input style={S.input} value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="ej. Contabilidad General"/>
              <label style={S.label}>Programa académico</label>
              <input style={S.input} value={form.program||""} onChange={e=>setForm({...form,program:e.target.value})} placeholder="ej. Tecnología en Análisis..."/>
              <label style={S.label}>Créditos</label>
              <input type="number" style={S.input} value={form.credits||""} onChange={e=>setForm({...form,credits:e.target.value})} placeholder="3"/>
              <label style={S.label}>Docente</label>
              <select style={S.input} value={form.teacher||""} onChange={e=>setForm({...form,teacher:e.target.value})}>
                <option value="">Sin asignar</option>
                {data.users.filter(u=>u.role==="teacher").map(u=><option key={u.id}>{u.name}</option>)}
              </select>
              <label style={S.label}>Competencia</label>
              <textarea style={{...S.input,height:80,resize:"vertical"}} value={form.competence||""} onChange={e=>setForm({...form,competence:e.target.value})}/>
            </>}

            {modal==="assessment" && <>
              <label style={S.label}>Nombre</label>
              <input style={S.input} value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="ej. Taller – Bases de datos"/>
              <label style={S.label}>Módulo</label>
              <select style={S.input} value={form.module||""} onChange={e=>setForm({...form,module:e.target.value})}>
                <option value="">Seleccionar…</option>
                {course?.modules.map(m=><option key={m.id}>{m.name}</option>)}
                <option value="Todos">Todos</option>
              </select>
              <div style={{display:"flex",gap:10}}>
                <div style={{flex:1}}><label style={S.label}>Porcentaje (%)</label><input type="number" style={S.input} value={form.pct||""} onChange={e=>setForm({...form,pct:e.target.value})} placeholder="20"/></div>
                <div style={{flex:1}}><label style={S.label}>Semana</label><input type="number" style={S.input} value={form.week||""} onChange={e=>setForm({...form,week:e.target.value})} placeholder="8"/></div>
              </div>
            </>}

            <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:18}}>
              <button style={S.btn()} onClick={closeModal}>Cancelar</button>
              <button style={S.btn("pri")} onClick={modal==="user"?saveUser:modal==="group"?saveGroup:modal==="module"?saveModule:modal==="class"?saveClass:modal==="course"?saveCourse:()=>{
                const u={...data};const list=u.courses.find(c=>c.id===activeCourseId).assessments;
                if(editId){const i=list.findIndex(a=>a.id===editId);list[i]={...list[i],...form,pct:Number(form.pct),week:Number(form.week)};}
                else list.push({id:Date.now(),...form,pct:Number(form.pct),week:Number(form.week)});
                setData(u);closeModal();
              }}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
