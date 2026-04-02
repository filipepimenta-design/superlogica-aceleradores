import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../trpc';
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

const questions = [
  {
    field: 'maturidadeScore',
    title: "1. Maturidade e Market Share",
    question: "Quais são as maiores administradoras na sua região hoje?",
    green: '"Nós somos uma das maiores da região, temos grande market share"',
    red: '"Existem algumas concorrentes maiores que nós no mercado"'
  },
  {
    field: 'riscoTecnologiaScore',
    title: "2. Risco vs. Tecnologia",
    question: "Quando vocês avaliam uma nova ferramenta, o que pesa mais: testar rápido para ganhar eficiência logo ou esperar a ferramenta ter estabilidade total no mercado?",
    green: '"Preferimos testar rápido com alguns clientes de confiança para validar"',
    red: '"Esperamos a ferramenta ter 100% de consolidação no mercado"'
  },
  {
    field: 'posicionamentoComercialScore',
    title: "3. Posicionamento Comercial",
    question: "Como funciona aqui quando vocês decidem implementar uma nova regra comercial ou um novo processo que afeta o condomínio?",
    green: '"A ADM estabelece a regra e novos contratos já nascem no novo modelo"',
    red: '"Depende da aceitação do síndico, mudamos se ele concordar"'
  },
  {
    field: 'escalabilidadeOperacionalScore',
    title: "4. Escalabilidade Operacional",
    question: "Hoje, se a carteira de vocês dobrar de tamanho, vocês conseguiriam crescer sem precisar aumentar o time financeiro na mesma proporção?",
    green: '"Sim, nossos processos já são automatizados e a equipe absorve o volume"',
    red: '"Precisaríamos contratar mais pessoas para manter a qualidade"'
  },
  {
    field: 'perfilDonoScore',
    title: "5. Perfil do Dono",
    question: "Atualmente, o dono (ou diretoria) se envolve mais na rotina operacional financeira ou foca mais na parte estratégica do negócio?",
    green: '"Foca na estratégia, está afastado da rotina operacional"',
    red: '"Centraliza os processos financeiros para garantir que saia certo"'
  },
  {
    field: 'estrategiacrescimentoScore',
    title: "6. Estratégia de Crescimento",
    question: "Como a empresa está planejando a expansão para os próximos anos?",
    green: '"Queremos romper barreiras geográficas e explorar fusões/aquisições"',
    red: '"Focar em crescer a carteira localmente, mantendo o controle"'
  }
];

export function Ferramenta() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  
  // Auth state
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');

  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [notes, setNotes] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});
  
  const navigate = useNavigate();
  const loginMutation = trpc.login.useMutation();
  const registerMutation = trpc.register.useMutation();
  const createMutation = trpc.createQualification.useMutation();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isLoginMode) {
        const res = await loginMutation.mutateAsync({ email: authEmail, password: authPassword });
        localStorage.setItem('token', res.token);
      } else {
        const res = await registerMutation.mutateAsync({ name: authName || 'Usuário', email: authEmail, password: authPassword });
        localStorage.setItem('token', res.token);
      }
      setIsAuthenticated(true);
      window.location.reload();
    } catch (err: any) {
      setAuthError(err.message || 'Erro na autenticação. Verifique os dados.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-md mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 w-full">
          <div className="flex justify-center mb-6">
            <ShieldCheck className="w-16 h-16 text-[#0A192F]" />
          </div>
          <h2 className="text-2xl font-poppins font-bold text-center mb-2">
            {isLoginMode ? 'Bem-vindo de volta' : 'Criar Conta'}
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Faça login para utilizar a ferramenta e salvar no banco de dados.
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
                <div className="relative">
                  <input type="text" value={authName} onChange={e=>setAuthName(e.target.value)} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 outline-none" placeholder="João Silva" />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
              <div className="relative">
                <input type="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 outline-none" placeholder="joao@superlogica.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <input type="password" value={authPassword} onChange={e=>setAuthPassword(e.target.value)} required minLength={6} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 outline-none" placeholder="••••••••" />
              </div>
            </div>

            {authError && <p className="text-red-500 text-sm py-2 font-medium">{authError}</p>}

            <button type="submit" disabled={loginMutation.isLoading || registerMutation.isLoading} className="w-full mt-4 py-4 bg-[#0A192F] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#112a4d] disabled:opacity-50">
              {(loginMutation.isLoading || registerMutation.isLoading) ? <Loader2 className="animate-spin" /> : (isLoginMode ? 'Entrar' : 'Registrar')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => { setIsLoginMode(!isLoginMode); setAuthError(''); }} className="text-sm font-bold text-gray-600 hover:text-[#10B981] transition-colors">
              {isLoginMode ? 'Não possui conta? Criar uma' : 'Já tem conta? Fazer login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAnswer = (field: string, score: number) => {
    setScores(prev => ({ ...prev, [field]: score }));
    setStep(s => s + 1);
  };

  const totalGreen = Object.values(scores).filter(v => v === 1).length;
  const totalRed = Object.values(scores).filter(v => v === 0).length;
  const isAcelerado = totalGreen >= 4;

  const submitQualification = async () => {
    try {
      await createMutation.mutateAsync({
        companyName,
        maturidadeScore: scores['maturidadeScore'] || 0,
        riscoTecnologiaScore: scores['riscoTecnologiaScore'] || 0,
        posicionamentoComercialScore: scores['posicionamentoComercialScore'] || 0,
        escalabilidadeOperacionalScore: scores['escalabilidadeOperacionalScore'] || 0,
        perfilDonoScore: scores['perfilDonoScore'] || 0,
        estrategiacrescimentoScore: scores['estrategiacrescimentoScore'] || 0,
        totalGreenSignals: totalGreen,
        totalRedSignals: totalRed,
        profile: isAcelerado ? 'acelerado' : 'nao_aderente',
        notes
      });
      navigate('/minhas-qualificacoes');
    } catch (e: any) {
      alert("Erro de comunicação com servidor: " + e.message);
    }
  };

  if (step === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-poppins text-2xl font-bold mb-6">Iniciar Qualificação</h2>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome da Empresa Prospect</label>
            <input 
              type="text" 
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#10B981] outline-none transition-all"
              placeholder="Ex: Condomínio XYZ..."
            />
          </div>
          <button 
            disabled={!companyName.trim()}
            onClick={() => setStep(1)}
            className="w-full py-4 bg-[#0A192F] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#112a4d] disabled:opacity-50 transition-colors"
          >
            Começar Qualificação <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (step >= 1 && step <= 6) {
    const q = questions[step - 1];
    const progress = (step / 6) * 100;
    
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
            <span>Pergunta {step} de 6</span>
            <span className="flex gap-4">
              <span className="text-[#10B981]">{totalGreen} Verdes</span>
              <span className="text-red-500">{totalRed} Vermelhos</span>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#0A192F] h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-poppins text-3xl font-bold text-[#0A192F] mb-4">{q.title}</h2>
          <div className="bg-[#F8FAFC] border border-gray-200 p-6 rounded-2xl">
            <p className="text-xl font-medium text-gray-800 leading-snug">"{q.question}"</p>
          </div>
        </div>

        <div className="grid gap-4">
          <button 
            onClick={() => handleAnswer(q.field, 1)}
            className="text-left p-6 bg-white border border-gray-200 rounded-xl hover:border-[#10B981] hover:bg-emerald-50 transition-all font-medium text-lg leading-relaxed shadow-sm hover:shadow-md"
          >
            {q.green}
          </button>
          <button 
            onClick={() => handleAnswer(q.field, 0)}
            className="text-left p-6 bg-white border border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all font-medium text-lg leading-relaxed shadow-sm hover:shadow-md"
          >
            {q.red}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className={`inline-flex items-center justify-center px-8 py-4 rounded-3xl mb-6 shadow-sm border ${isAcelerado ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
         <h1 className={`font-poppins text-4xl font-bold ${isAcelerado ? 'text-emerald-600' : 'text-red-500'}`}>
           {isAcelerado ? '🚀 ACELERADO' : '⚠️ NÃO ADERENTE'}
         </h1>
      </div>
      
      <p className="text-2xl text-gray-800 font-bold mb-8">{companyName}</p>

      <div className="flex justify-center gap-8 mb-8 pb-8 border-b border-gray-200">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#10B981]">{totalGreen}</div>
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Verdes</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-500">{totalRed}</div>
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Vermelhos</div>
        </div>
      </div>

      <div className="text-left mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-2">Notas opcionais da ligação</label>
        <textarea 
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none"
          rows={3}
          placeholder="Algo relevante que cliente mencionou..."
        ></textarea>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={submitQualification}
          disabled={createMutation.isLoading}
          className="flex-1 py-4 bg-[#0A192F] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#112a4d] disabled:opacity-50"
        >
          {createMutation.isLoading ? <Loader2 className="animate-spin" /> : 'Registrar'}
        </button>
        <button 
          onClick={() => { setStep(0); setCompanyName(''); setScores({}); setNotes(''); }}
          className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl flex items-center justify-center hover:bg-gray-50"
        >
          Nova Qualificação
        </button>
      </div>
    </div>
  );
}
