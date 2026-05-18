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

// Diccionario de textos de la interfaz optimizado con tu nivel real
const textosInterface = {
  es: {
    disponibilidad: "Disponible para nuevos retos",
    subtitulo: "Software Engineer | Java Spring Boot Specialist",
    heroDesc: "Desarrollador Java con experiencia en producción en sistemas empresariales complejos. Enfocado en la transición hacia arquitecturas modernas, especializándome en el ecosistema Spring Boot, optimización avanzada de bases de datos relacionales y el diseño de microservicios e infraestructuras orientadas a eventos.",
    stackTitulo: "Core Stack & Competencias",
    stackSub: "Filtra dinámicamente mi experiencia por tecnología, herramientas o estado de aprendizaje.",
    placeholder: "Buscar (ej: Kafka, Especialidad, Aprendizaje)...",
    noResultados: "No se encontraron resultados para",
    noResultadosSub: "Intenta buscando términos clave como 'Aprendizaje', 'Framework' o 'Java'.",
    idiomas: "Idiomas & Comunicación",
    nativo: "Nativo",
    inglesNivel: "Conversacional Alto (Listo para entrevistas)",
    francesNivel: "En Aprendizaje / Principiante",
    enfoque: "Enfoque Profesional",
    enfoqueDesc: "Trabajo en equipo bajo metodologías ágiles (Kanban), proactivo, alta capacidad de aprendizaje y adaptabilidad orientada al diseño de sistemas escalables.",
    esp: "Especialidad",
    apr: "En Aprendizaje"
  },
  en: {
    disponibilidad: "Available for new opportunities",
    subtitulo: "Software Engineer | Java Spring Boot Specialist",
    heroDesc: "Java Developer with production experience in complex enterprise systems. Focused on transitioning towards modern architectures, specializing in the Spring Boot ecosystem, advanced relational database optimization, and the design of microservices and event-driven infrastructures.",
    stackTitulo: "Core Stack & Skills",
    stackSub: "Dynamically filter my experience by technology, tools, or learning status.",
    placeholder: "Search (e.g., Kafka, Specialty, Learning)...",
    noResultados: "No results found for",
    noResultadosSub: "Try searching for key terms like 'Learning', 'Framework', or 'Java'.",
    idiomas: "Languages & Communication",
    nativo: "Native",
    inglesNivel: "Professional Working Proficiency (Interview Ready)",
    francesNivel: "Elementary / Currently Learning",
    enfoque: "Professional Focus",
    enfoqueDesc: "Teamwork under Agile methodologies (Kanban), proactive, high learning capacity, and adaptability oriented to the design of scalable systems.",
    esp: "Specialty",
    apr: "Learning"
  },
  fr: {
    disponibilidad: "Disponible pour de nouveaux défis",
    subtitulo: "Software Engineer | Java Spring Boot Specialist",
    heroDesc: "Développeur Java avec de l'expérience en production sur des systèmes d'entreprise complexes. Axé sur la transition vers des architectures modernes, spécialisé dans l'écosystème Spring Boot, l'optimisation avancée de bases de données relationnelles et la conception de microservices et d'infrastructures orientées événements.",
    stackTitulo: "Core Stack & Compétences",
    stackSub: "Filtrez dynamiquement mon expérience par technologie, outils ou statut d'apprentissage.",
    placeholder: "Rechercher (ex: Kafka, Spécialité, Apprentissage)...",
    noResultados: "Aucun résultat trouvé pour",
    noResultadosSub: "Essayez de rechercher des termes clés comme 'Apprentissage', 'Framework' ou 'Java'.",
    idiomas: "Langues & Communication",
    nativo: "Langue Maternelle",
    inglesNivel: "Courant / Professionnel (Prêt pour les entretiens)",
    francesNivel: "Débutant / En cours d'apprentissage",
    enfoque: "Objectif Professionnel",
    enfoqueDesc: "Travail en équipe selon les méthodologies Agiles (Kanban), proactif, grande capacité d'apprentissage et adaptabilité orientée vers la conception de systèmes évolutifs.",
    esp: "Spécialité",
    apr: "En Apprentissage"
  }
};

export default function App() {
  const [idioma, setIdioma] = useState<Idioma>('es');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [busqueda, setBusqueda] = useState('');
  const [habilidades] = useState<Habilidad[]>(habilidadesData);

  const t = textosInterface[idioma];

  // Filtrado reactivo adaptado al multiidioma
  const habilidadesFiltradas = habilidades.filter(hab => {
    const término = busqueda.toLowerCase();
    const nombreMatches = hab.nombre.toLowerCase().includes(término);
    const catMatches = hab.categoria[idioma].toLowerCase().includes(término);
    const descMatches = hab.descripcion[idioma].toLowerCase().includes(término);
    
    // Mapeo manual para que busque por etiquetas traducidas
    const estMatches = 
      (hab.estado === 'aprendizaje' && (t.apr.toLowerCase().includes(término) || 'aprendizaje'.includes(término) || 'learning'.includes(término))) ||
      (hab.top && (t.esp.toLowerCase().includes(término) || 'especialidad'.includes(término) || 'specialty'.includes(término)));

    return nombreMatches || catMatches || descMatches || estMatches;
  });

  const getIcono = (categoriaEs: string) => {
    switch (categoriaEs) {
      case 'Frameworks': return <Cpu className={darkMode ? "text-blue-400" : "text-blue-600"} size={20} />;
      case 'Bases de Datos': return <Database className={darkMode ? "text-emerald-400" : "text-emerald-600"} size={20} />;
      case 'Seguridad': return <Shield className={darkMode ? "text-red-400" : "text-red-600"} size={20} />;
      case 'Lenguajes': return <Code className={darkMode ? "text-purple-400" : "text-purple-600"} size={20} />;
      case 'Eventos & Microservicios': return <Layers className={darkMode ? "text-amber-400" : "text-amber-600"} size={20} />;
      default: return <Terminal className="text-slate-400" size={20} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-blue-500/30 ${
      darkMode ? 'bg-[#0a0f1d] text-slate-200' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* NAVBAR */}
      <nav className={`max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b ${
        darkMode ? 'border-slate-900' : 'border-slate-200'
      }`}>
        <span className={`font-mono text-sm tracking-wider font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>CSR.DEV</span>
        
        {/* CONTROLES: IDIOMA Y TEMA */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* SELECTOR DE IDIOMA */}
          <div className={`flex items-center rounded-lg p-0.5 border text-xs font-mono font-bold ${
            darkMode ? 'bg-[#0e1626] border-slate-800' : 'bg-slate-200 border-slate-300'
          }`}>
            {(['es', 'en', 'fr'] as Idioma[]).map((idm) => (
              <button
                key={idm}
                onClick={() => setIdioma(idm)}
                className={`px-2.5 py-1 rounded-md transition-all uppercase ${
                  idioma === idm 
                    ? (darkMode ? 'bg-blue-600 text-white shadow' : 'bg-blue-600 text-white shadow') 
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
            className={`p-2 rounded-xl border transition-all ${
              darkMode ? 'bg-[#0e1626] border-slate-800 text-amber-400 hover:bg-slate-900' : 'bg-white border-slate-300 text-indigo-600 hover:bg-slate-100'
            }`}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <span className={`hidden sm:inline text-slate-700 ${darkMode ? '' : 'text-slate-300'}`}>|</span>

          {/* INFO EXTRA */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1"><Globe size={12} className="text-emerald-500" /> EU Citizen</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> Madrid, ES</span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center md:text-left">
        <div className="space-y-6">
          <span className={`text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full font-bold ${
            darkMode ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-100'
          }`}>
            {t.disponibilidad}
          </span>
          <h1 className={`text-4xl md:text-6xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Carlos Samuel <br />
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Rodríguez Palomino
            </span>
          </h1>
          
          <h2 className={`text-xl md:text-2xl font-mono font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.subtitulo} <span className="text-blue-500">_</span>
          </h2>

          <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.heroDesc}
          </p>

          {/* TARJETAS DE CONTACTO */}
          <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start text-xs font-mono">
            <a href="mailto:samuel.rodpal@gmail.com" className={`flex items-center gap-2 border px-4 py-2.5 rounded-xl transition-all ${
              darkMode ? 'bg-slate-900/60 border-slate-800/60 text-slate-300 hover:border-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}>
              <Mail size={14} className="text-blue-500" /> samuel.rodpal@gmail.com
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
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition-all font-semibold shadow-md shadow-blue-500/10"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn (English)
            </a>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-6 py-4">
        <div className={`border rounded-3xl p-6 md:p-10 shadow-2xl transition-all ${
          darkMode ? 'bg-[#0e1626] border-slate-800/60 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          
          {/* CABECERA BUSCADOR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="space-y-1">
              <h3 className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.stackTitulo}</h3>
              <p className={`text-xs md:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.stackSub}</p>
            </div>

            {/* INPUT */}
            <div className="relative w-full md:w-80">
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
                    ? 'bg-[#070b14] border-slate-800 text-slate-200 placeholder-slate-600 focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/50' 
                    : 'bg-slate-100 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50'
                }`}
              />
            </div>
          </div>

          {/* GRID DE CAPACIDADES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habilidadesFiltradas.length > 0 ? (
              habilidadesFiltradas.map((hab) => (
                <div 
                  key={hab.id} 
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                    darkMode 
                      ? (hab.top ? 'bg-[#121c30] border-blue-500/20 shadow-lg shadow-blue-950/20' : 'bg-[#0b111e]/80 border-slate-800/80') 
                      : (hab.top ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-white border-slate-200')
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getIcono(hab.categoria.es)}
                        <h4 className={`font-bold tracking-tight text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>{hab.nombre}</h4>
                      </div>
                      
                      {/* ETIQUETAS DINÁMICAS TRADUCIDAS */}
                      {hab.estado === 'aprendizaje' ? (
                        <span className="text-[9px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-md uppercase font-semibold tracking-wider whitespace-nowrap">
                          {t.apr}
                        </span>
                      ) : hab.top ? (
                        <span className="text-[9px] font-mono bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-md uppercase font-semibold tracking-wider whitespace-nowrap">
                          {t.esp}
                        </span>
                      ) : null}
                    </div>
                    <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {hab.descripcion[idioma]}
                    </p>
                  </div>
                  
                  <div className={`mt-4 pt-3 border-t flex justify-between items-center text-[10px] font-mono ${
                    darkMode ? 'border-slate-800/40 text-slate-500' : 'border-slate-100 text-slate-400'
                  }`}>
                    <span>{hab.categoria[idioma]}</span>
                  </div>
                </div>
              ))
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

{/* COMPLEMENTO: IDIOMAS ADAPTADOS */}
          <div className={`border rounded-2xl p-5 text-sm ${
            darkMode ? 'bg-[#0e1626]/60 border-slate-800/60' : 'bg-white border-slate-200'
          }`}>
            <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">{t.idiomas}</h4>
            <div className="flex justify-between items-center py-0.5">
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Español</span>
              <span className="text-slate-400 font-mono text-xs">{t.nativo}</span>
            </div>
            <div className="flex justify-between items-center py-0.5 mt-1">
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>English</span>
              <span className="text-blue-500 font-mono text-xs font-semibold">{t.inglesNivel}</span>
            </div>
            <div className="flex justify-between items-center py-0.5 mt-1">
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Français</span>
              <span className="text-amber-500 font-mono text-xs font-semibold">{t.francesNivel}</span>
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