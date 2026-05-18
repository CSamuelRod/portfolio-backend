import { useState } from 'react';
import { Search, Shield, Database, Code, Cpu, Terminal, Mail, Phone, MapPin, Globe, Layers, Sun, Moon } from 'lucide-react';
import habilidadesData from './habilidades.json';

type Idioma = 'es' | 'en' | 'fr';

interface Habilidad {
  id: number;
  nombre: string;
  categoria: { es: string; en: string; fr: string };
  descripcion: { es: string; en: string; fr: string };
  top: boolean;
  estado: string;
}

const textosInterface = {
  es: {
    disponibilidad: "Disponible para nuevos retos",
    subtitulo: "Software Engineer | Java Spring Boot Specialist",
    heroDesc: "Desarrollador Java con experiencia en producción en sistemas empresariales complejos. Enfocado en la transición hacia arquitecturas modernas, especializándome en el ecosistema Spring Boot, optimización avanzada de bases de datos relacionales y el diseño de microservicios e infraestructuras orientadas a eventos.",
    stackTitulo: "Core Stack & Competencias",
    stackSub: "Filtra por bloques estratégicos o busca términos específicos.",
    placeholder: "Buscar (ej: Kafka, Especialidad, Aprendizaje)...",
    noResultados: "No se encontraron resultados para",
    noResultadosSub: "Intenta buscando términos clave como 'Aprendizaje', 'Framework' o 'Java'.",
    idiomas: "Idiomas & Communication",
    nativo: "Nativo",
    inglesNivel: "Conversacional Alto (Listo para entrevistas)",
    francesNivel: "En Aprendizaje / Principiante",
    esp: "Especialidad",
    apr: "En Aprendizaje",
    todo: "✨ Ver Todo",
    fCore: "Core & Data",
    fArch: "Architecture & DevOps",
    fFront: "Frontend"
  },
  en: {
    disponibilidad: "Available for new opportunities",
    subtitulo: "Software Engineer | Java Spring Boot Specialist",
    heroDesc: "Java Developer with production experience in complex enterprise systems. Focused on transitioning towards modern architectures, specializing in the Spring Boot ecosystem, advanced relational database optimization, and the design of microservices and event-driven infrastructures.",
    stackTitulo: "Core Stack & Skills",
    stackSub: "Filter by strategic blocks or search for specific terms.",
    placeholder: "Search (e.g., Kafka, Specialty, Learning)...",
    noResultados: "No results found for",
    noResultadosSub: "Try searching for key terms like 'Learning', 'Framework', or 'Java'.",
    idiomas: "Languages & Communication",
    nativo: "Native",
    inglesNivel: "Professional Working Proficiency (Interview Ready)",
    francesNivel: "Elementary / Currently Learning",
    esp: "Specialty",
    apr: "Learning",
    todo: "✨ View All",
    fCore: "Core & Data",
    fArch: "Architecture & DevOps",
    fFront: "Frontend"
  },
  fr: {
    disponibilidad: "Disponible pour de nouveaux défis",
    subtitulo: "Software Engineer | Java Spring Boot Specialist",
    heroDesc: "Développeur Java avec de l'expérience en production sur des systèmes d'entreprise complexes. Axé sur la transition vers des architectures modernes, spécialisé dans l'écosystème Spring Boot, l'optimisation avancée de données relationnelles et la conception de microservices et d'infrastructures orientées événements.",
    stackTitulo: "Core Stack & Compétences",
    stackSub: "Filtrez par blocs stratégiques ou recherchez des termes spécifiques.",
    placeholder: "Rechercher (ex: Kafka, Spécialité, Apprentissage)...",
    noResultados: "Aucun résultat trouvé pour",
    noResultadosSub: "Essayez de rechercher des termes clés comme 'Apprentissage', 'Framework' ou 'Java'.",
    idiomas: "Langues & Communication",
    nativo: "Langue Maternelle",
    inglesNivel: "Courant / Professionnel (Prêt pour les entretiens)",
    francesNivel: "Débutant / En cours d'apprentissage",
    esp: "Spécialité",
    apr: "En Apprentissage",
    todo: "✨ Tout Voir",
    fCore: "Core & Data",
    fArch: "Architecture & DevOps",
    fFront: "Frontend"
  }
};

export default function App() {
  const [idioma, setIdioma] = useState<Idioma>('es');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [busqueda, setBusqueda] = useState('');
  const [bloqueActivo, setBloqueActivo] = useState<string>('Todos');
  const [habilidades] = useState<Habilidad[]>(habilidadesData);

  const t = textosInterface[idioma];

  const obtenerBloqueInferencia = (categoriaEs: string): string => {
    if (['Lenguajes', 'Frameworks', 'Bases de Datos'].includes(categoriaEs)) return 'Core & Data';
    if (['Seguridad', 'Eventos & Microservicios', 'Herramientas'].includes(categoriaEs)) return 'Architecture & DevOps';
    if (['Frontend'].includes(categoriaEs)) return 'Frontend';
    return 'Core & Data';
  };

  // --- MAPA CROMÁTICO EXCLUSIVO POR CATEGORÍA ---
  // Define los colores de texto, bordes y fondos de etiquetas según la tecnología
  const obtenerEstiloCategoria = (categoriaEs: string, estado: string, top: boolean) => {
    const esAprendizaje = estado === 'aprendizaje';

    // 1. Lenguajes (Java, SQL...) -> Verde Esmeralda elegante
    if (categoriaEs === 'Lenguajes') {
      if (esAprendizaje) return { text: 'text-emerald-500/60', border: 'border-emerald-900/30', bgBadge: 'bg-emerald-500/5 text-emerald-400/60 border-emerald-500/10', cardBg: 'bg-emerald-950/5' };
      if (top) return { text: 'text-emerald-400 font-bold', border: 'border-emerald-500/40 shadow-emerald-950/30', bgBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30', cardBg: 'bg-[#102a1e]' };
      return { text: 'text-emerald-500', border: 'border-slate-800/80', bgBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', cardBg: 'bg-[#0b111e]/80' };
    }

    // 2. Frameworks (Spring Boot...) -> Celeste claro / Cyan tecnológico
    if (categoriaEs === 'Frameworks') {
      if (esAprendizaje) return { text: 'text-cyan-500/60', border: 'border-cyan-900/30', bgBadge: 'bg-cyan-500/5 text-cyan-400/60 border-cyan-500/10', cardBg: 'bg-cyan-950/5' };
      if (top) return { text: 'text-cyan-400 font-bold', border: 'border-cyan-500/40 shadow-cyan-950/30', bgBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30', cardBg: 'bg-[#0f2936]' };
      return { text: 'text-cyan-500', border: 'border-slate-800/80', bgBadge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', cardBg: 'bg-[#0b111e]/80' };
    }

    // 3. Bases de Datos (PostgreSQL, MySQL...) -> Rosa / Magenta de sistemas de datos
    if (categoriaEs === 'Bases de Datos') {
      if (esAprendizaje) return { text: 'text-pink-500/60', border: 'border-pink-900/30', bgBadge: 'bg-pink-500/5 text-pink-400/60 border-pink-500/10', cardBg: 'bg-pink-950/5' };
      if (top) return { text: 'text-pink-400 font-bold', border: 'border-pink-500/40 shadow-pink-950/30', bgBadge: 'bg-pink-500/20 text-pink-300 border-pink-400/30', cardBg: 'bg-[#2d1222]' };
      return { text: 'text-pink-500', border: 'border-slate-800/80', bgBadge: 'bg-pink-500/10 text-pink-400 border-pink-500/20', cardBg: 'bg-[#0b111e]/80' };
    }

    // 4. Eventos & Microservicios (Kafka, RabbitMQ) -> Mostaza / Oro Viejo premium
    if (categoriaEs === 'Eventos & Microservicios') {
      if (esAprendizaje) return { text: 'text-amber-500/60', border: 'border-amber-900/30', bgBadge: 'bg-amber-500/5 text-amber-400/60 border-amber-500/10', cardBg: 'bg-amber-950/5' };
      if (top) return { text: 'text-amber-400 font-bold', border: 'border-amber-500/40 shadow-amber-950/30', bgBadge: 'bg-amber-500/20 text-amber-300 border-amber-400/30', cardBg: 'bg-[#2a2110]' };
      return { text: 'text-amber-500', border: 'border-slate-800/80', bgBadge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', cardBg: 'bg-[#0b111e]/80' };
    }

    // 5. Seguridad (Spring Security, JWT...) -> Rojo carmín de protección
    if (categoriaEs === 'Seguridad') {
      if (esAprendizaje) return { text: 'text-rose-500/60', border: 'border-rose-900/30', bgBadge: 'bg-rose-500/5 text-rose-400/60 border-rose-500/10', cardBg: 'bg-rose-950/5' };
      if (top) return { text: 'text-rose-400 font-bold', border: 'border-rose-500/40 shadow-rose-950/30', bgBadge: 'bg-rose-500/20 text-rose-300 border-rose-400/30', cardBg: 'bg-[#2d1216]' };
      return { text: 'text-rose-500', border: 'border-slate-800/80', bgBadge: 'bg-rose-500/10 text-rose-400 border-rose-500/20', cardBg: 'bg-[#0b111e]/80' };
    }

    // Por defecto (Herramientas, Frontend o Terminal) -> Indigo/Slate clásico
    if (esAprendizaje) return { text: 'text-indigo-500/60', border: 'border-indigo-900/30', bgBadge: 'bg-indigo-500/5 text-indigo-400/60 border-indigo-500/10', cardBg: 'bg-indigo-950/5' };
    if (top) return { text: 'text-indigo-400 font-bold', border: 'border-indigo-500/40 shadow-indigo-950/30', bgBadge: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30', cardBg: 'bg-[#15122d]' };
    return { text: 'text-indigo-500', border: 'border-slate-800/80', bgBadge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', cardBg: 'bg-[#0b111e]/80' };
  };

  const habilidadesFiltradas = habilidades.filter(hab => {
    const bloqueDeHab = obtenerBloqueInferencia(hab.categoria.es);
    const pasaFiltroBloque = bloqueActivo === 'Todos' || bloqueDeHab === bloqueActivo;

    const término = busqueda.toLowerCase();
    const nombreMatches = hab.nombre.toLowerCase().includes(término);
    const catMatches = hab.categoria[idioma].toLowerCase().includes(término);
    const descMatches = hab.descripcion[idioma].toLowerCase().includes(término);
    
    const estMatches = 
      (hab.estado === 'aprendizaje' && (t.apr.toLowerCase().includes(término) || 'aprendizaje'.includes(término) || 'learning'.includes(término))) ||
      (hab.top && (t.esp.toLowerCase().includes(término) || 'especialidad'.includes(término) || 'specialty'.includes(término)));

    return pasaFiltroBloque && (nombreMatches || catMatches || descMatches || estMatches);
  });

  const getIcono = (categoriaEs: string, clasesColor: string) => {
    switch (categoriaEs) {
      case 'Frameworks': return <Cpu className={clasesColor} size={20} />;
      case 'Bases de Datos': return <Database className={clasesColor} size={20} />;
      case 'Seguridad': return <Shield className={clasesColor} size={20} />;
      case 'Lenguajes': return <Code className={clasesColor} size={20} />;
      case 'Eventos & Microservicios': return <Layers className={clasesColor} size={20} />;
      default: return <Terminal className={clasesColor} size={20} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-amber-500/30 ${
      darkMode ? 'bg-[#0a0f1d] text-slate-200' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* NAVBAR */}
      <nav className={`max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b ${
        darkMode ? 'border-slate-900' : 'border-slate-200'
      }`}>
        <span className={`font-mono text-sm tracking-wider font-bold ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>CSR.DEV</span>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* SELECTOR DE IDIOMA */}
          <div className={`flex items-center rounded-lg p-0.5 border text-xs font-mono font-bold ${
            darkMode ? 'bg-[#0e1626] border-slate-800' : 'bg-slate-200 border-slate-300'
          }`}>
            {(['es', 'en', 'fr'] as Idioma[]).map((idm) => (
              <button
                key={idm}
                onClick={() => setIdioma(idm)}
                className={`px-2.5 py-1 rounded-md transition-all uppercase cursor-pointer ${
                  idioma === idm 
                    ? 'bg-amber-500 text-[#0a0f1d] shadow font-black' 
                    : (darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                {idm}
              </button>
            ))}
          </div>

          {/* BOTÓN MODO CLARO / OSCURO */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              darkMode ? 'bg-[#0e1626] border-slate-800 text-amber-500 hover:bg-slate-900' : 'bg-white border-slate-300 text-amber-600 hover:bg-slate-100'
            }`}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <span className={`hidden sm:inline text-slate-700 ${darkMode ? '' : 'text-slate-300'}`}>|</span>

          {/* INFO EXTRA */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1"><Globe size={12} className="text-amber-500" /> EU Citizen</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> Madrid, ES</span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center md:text-left">
        <div className="space-y-6">
          <span className={`text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full font-bold ${
            darkMode ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-amber-50 text-amber-600 border border-amber-100'
          }`}>
            {t.disponibilidad}
          </span>
          <h1 className={`text-4xl md:text-6xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Carlos Samuel <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Rodríguez Palomino
            </span>
          </h1>
          
          <h2 className={`text-xl md:text-2xl font-mono font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.subtitulo} <span className="text-amber-500">_</span>
          </h2>

          <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.heroDesc}
          </p>

          {/* TARJETAS DE CONTACTO */}
          <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start text-xs font-mono">
            <a href="mailto:samuel.rodpal@gmail.com" className={`flex items-center gap-2 border px-4 py-2.5 rounded-xl transition-all ${
              darkMode ? 'bg-slate-900/60 border-slate-800/60 text-slate-300 hover:border-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}>
              <Mail size={14} className="text-amber-500" /> samuel.rodpal@gmail.com
            </a>
            <a href="tel:+34640084196" className={`flex items-center gap-2 border px-4 py-2.5 rounded-xl transition-all ${
              darkMode ? 'bg-slate-900/60 border-slate-800/60 text-slate-300 hover:border-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}>
              <Phone size={14} className="text-emerald-500" /> 640 084 196
            </a>
            <a 
              href="https://www.linkedin.com/in/carlos-samuel-rodriguez-palomino" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-[#0a0f1d] px-4 py-2.5 rounded-xl transition-all font-bold shadow-md shadow-amber-500/10 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-6 py-4 space-y-6">
        <div className={`border rounded-3xl p-6 md:p-10 shadow-2xl transition-all ${
          darkMode ? 'bg-[#0e1626] border-slate-800/60 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          
          {/* CABECERA BUSCADOR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="space-y-1">
              <h3 className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.stackTitulo}</h3>
              <p className={`text-xs md:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.stackSub}</p>
            </div>

            {/* INPUT DE BÚSQUEDA */}
            <div className="relative w-full lg:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder={t.placeholder}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className={`w-full border rounded-xl pl-10 pr-4 py-2.5 transition-all text-sm font-mono ${
                  darkMode 
                    ? 'bg-[#070b14] border-slate-800 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500' 
                    : 'bg-slate-100 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600'
                }`}
              />
            </div>
          </div>

          {/* BOTONES DE FILTRO POR BLOQUE */}
          <div className="flex flex-wrap gap-2.5 mb-8 border-b pb-6 border-slate-800/40">
            {[
              { id: 'Todos', label: t.todo },
              { id: 'Core & Data', label: t.fCore },
              { id: 'Architecture & DevOps', label: t.fArch },
              { id: 'Frontend', label: t.fFront }
            ].map((bloque) => (
              <button
                key={bloque.id}
                onClick={() => setBloqueActivo(bloque.id)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold border transition-all duration-200 cursor-pointer ${
                  bloqueActivo === bloque.id
                    ? 'bg-amber-500 text-[#0a0f1d] border-amber-500 shadow-md shadow-amber-500/10'
                    : darkMode
                      ? 'bg-transparent text-slate-400 border-slate-800/80 hover:border-amber-500 hover:text-amber-500'
                      : 'bg-transparent text-slate-600 border-slate-200 hover:border-amber-600 hover:text-amber-600'
                }`}
              >
                {bloque.label}
              </button>
            ))}
          </div>

          {/* GRID DE CAPACIDADES CON COLORES IDENTITARIOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habilidadesFiltradas.length > 0 ? (
              habilidadesFiltradas.map((hab) => {
                // Obtenemos dinámicamente las clases del mapa de color
                const estilo = obtenerEstiloCategoria(hab.categoria.es, hab.estado, hab.top);
                
                return (
                  <div 
                    key={hab.id} 
                    className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                      darkMode ? `${estilo.cardBg} ${estilo.border}` : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getIcono(hab.categoria.es, estilo.text.split(' ')[0])}
                          <h4 className={`font-bold tracking-tight text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {hab.nombre}
                          </h4>
                        </div>
                        
                        {/* ETIQUETAS DINÁMICAS AFECTADAS POR EL COLOR */}
                        {hab.estado === 'aprendizaje' ? (
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md uppercase font-semibold tracking-wider whitespace-nowrap ${estilo.bgBadge}`}>
                            {t.apr}
                          </span>
                        ) : hab.top ? (
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md uppercase font-black tracking-wider whitespace-nowrap ${estilo.bgBadge}`}>
                            {t.esp}
                          </span>
                        ) : null}
                      </div>
                      <p className={`text-xs md:text-sm leading-relaxed ${
                        hab.estado === 'aprendizaje' && darkMode ? 'text-slate-500' : darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {hab.descripcion[idioma]}
                      </p>
                    </div>
                    
                    <div className={`mt-4 pt-3 border-t flex justify-between items-center text-[10px] font-mono ${
                      darkMode ? 'border-slate-800/40 text-slate-500' : 'border-slate-100 text-slate-400'
                    }`}>
                      <span className={darkMode ? estilo.text : ''}>{hab.categoria[idioma]}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={`col-span-full text-center py-16 border border-dashed rounded-2xl ${
                darkMode ? 'text-slate-600 border-slate-800 bg-[#070b14]/50' : 'text-slate-400 border-slate-200 bg-slate-50'
              }`}>
                <p className="text-sm font-mono">{t.noResultados} "{busqueda}"</p>
                <p className="text-xs mt-1 text-slate-500">{t.noResultadosSub}</p>
              </div>
            )}
          </div>
        </div>

        {/* SECCIÓN DE IDIOMAS */}
        <div className={`border rounded-2xl p-6 text-sm ${
          darkMode ? 'bg-[#0e1626]/60 border-slate-800/60' : 'bg-white border-slate-200'
        }`}>
          <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">{t.idiomas}</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-0.5">
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Español</span>
              <span className="text-slate-400 font-mono text-xs">{t.nativo}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>English</span>
              <span className="text-amber-500 font-mono text-xs font-semibold">{t.inglesNivel}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Français</span>
              <span className="text-amber-500 font-mono text-xs font-semibold">{t.francesNivel}</span>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={`max-w-5xl mx-auto px-6 py-12 text-center text-[10px] font-mono mt-12 border-t ${
        darkMode ? 'text-slate-600 border-slate-900' : 'text-slate-400 border-slate-200'
      }`}>
        <p>© {new Date().getFullYear()} - Carlos Samuel Rodríguez Palomino. Hecho con React, TypeScript y Tailwind v4.</p>
      </footer>
    </div>
  );
}