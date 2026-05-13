import { Link } from 'react-router-dom';
import { Target, BookOpen, MessageSquare, LineChart, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';

export function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Hero Section */}
      <section className="bg-[#050B33] text-white pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-poppins text-5xl md:text-6xl font-bold leading-tight mb-6">
              Identifique <span className="text-[#D6FF00]">Aceleradores</span> de Saldo com Precisão
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed">
              Sistema de treinamento comercial focado na qualificação de prospects com alta propensão à Conta Digital Superlógica. Encontre clientes com movimentação ideal (R$ 4M/mês).
            </p>
            <div className="flex flex-wrap gap-4">
              <Button to="/ferramenta" size="lg" variant="contained" color="primary">
                Iniciar Ferramenta
              </Button>
              <Button to="/roteiro" size="lg" variant="outlined" color="white">
                Conhecer Roteiro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-24 -mt-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModuleCard 
              to="/roteiro"
              icon={<ShieldCheck size={32} className="text-primary" />}
              title="Roteiro de Qualificação"
              description="Aprenda as 6 perguntas-chave para identificar aderência imediata."
            />
            <ModuleCard 
              to="/script"
              icon={<MessageSquare size={32} className="text-primary" />}
              title="Script de Ligação"
              description="Guia prático para iniciar, conduzir e converter em reuniões qualificadas."
            />
            <ModuleCard 
              to="/sinais"
              icon={<Target size={32} className="text-primary" />}
              title="Sinais Acelerados"
              description="Cards rápidos identificando perfil 'Acelerado' vs 'Tradicional'."
            />
            <ModuleCard 
              to="/dash"
              icon={<LineChart size={32} className="text-primary" />}
              title="Dashboard"
              description="Métricas de sucesso dos prospects atritados pelo seu time."
            />
            <ModuleCard 
              to="/minhas-qualificacoes"
              icon={<BookOpen size={32} className="text-primary" />}
              title="Minhas Qualificações"
              description="Seu histórico particular de reuniões testadas na ferramenta."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ModuleCard({ to, icon, title, description }: { to: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <Link to={to} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1">
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-poppins text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed flex-1">{description}</p>
    </Link>
  );
}
