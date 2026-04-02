import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Roteiro } from './pages/Roteiro';
import { Script } from './pages/Script';
import { Sinais } from './pages/Sinais';
import { Ferramenta } from './pages/Ferramenta';
import { Dashboard } from './pages/Dashboard';
import { MinhasQualificacoes } from './pages/MinhasQualificacoes';

function Navigation() {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Roteiro de Qualificação', path: '/roteiro' },
    { name: 'Script Abordagem', path: '/script' },
    { name: 'Sinais', path: '/sinais' },
    { name: 'Ferramenta', path: '/ferramenta' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#050B33] text-white shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <img src="/logo-superlogica.png" alt="Superlógica" className="h-8 brightness-0 invert" />
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-white/10 text-emerald-400">
              Aceleradores
            </span>
          </Link>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="w-px h-6 bg-white/20 mx-2"></div>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/ferramenta';
                }}
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
              >
                Sair
              </button>
              <Link
                to="/ferramenta"
                className="ml-2 px-4 py-2 rounded-lg text-sm font-bold bg-[#D6FF00] hover:bg-lime-400 text-[#1822E5] transition-colors shadow-lg shadow-[#D6FF00]/20"
              >
                Qualificar Agora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8FAFC] font-inter">
        <Navigation />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roteiro" element={<Roteiro />} />
            <Route path="/script" element={<Script />} />
            <Route path="/sinais" element={<Sinais />} />
            <Route path="/ferramenta" element={<Ferramenta />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/minhas-qualificacoes" element={<MinhasQualificacoes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
