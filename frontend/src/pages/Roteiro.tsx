import { useState } from 'react';
import { ChevronDown, CheckCircle2, XCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    title: "1. Maturidade e Market Share",
    question: '"Quais são as maiores administradoras na sua região hoje?"',
    green: '"Nós somos uma das maiores da região, temos grande market share"',
    red: '"Existem algumas concorrentes maiores que nós no mercado"'
  },
  {
    id: 2,
    title: "2. Risco vs. Tecnologia",
    question: '"Quando vocês avaliam uma nova ferramenta, o que pesa mais: testar rápido para ganhar eficiência logo ou esperar a ferramenta ter estabilidade total no mercado?"',
    green: '"Preferimos testar rápido com alguns clientes de confiança para validar"',
    red: '"Esperamos a ferramenta ter 100% de consolidação no mercado"'
  },
  {
    id: 3,
    title: "3. Posicionamento Comercial",
    question: '"Como funciona aqui quando vocês decidem implementar uma nova regra comercial ou um novo processo que afeta o condomínio?"',
    green: '"A ADM estabelece a regra e novos contratos já nascem no novo modelo"',
    red: '"Depende da aceitação do síndico, mudamos se ele concordar"'
  },
  {
    id: 4,
    title: "4. Escalabilidade Operacional",
    question: '"Hoje, se a carteira de vocês dobrar de tamanho, vocês conseguem crescer sem precisar aumentar o time financeiro na mesma proporção?"',
    green: '"Sim, nossos processos já são automatizados e a equipe absorve o volume"',
    red: '"Precisaríamos contratar mais pessoas para manter a qualidade"'
  },
  {
    id: 5,
    title: "5. Perfil do Dono",
    question: '"Atualmente, o dono (ou diretoria) se envolve mais na rotina operacional financeira ou foca mais na parte estratégica do negócio?"',
    green: '"Foca na estratégia, está afastado da rotina operacional"',
    red: '"Centraliza os processos financeiros para garantir que saia certo"'
  },
  {
    id: 6,
    title: "6. Estratégia de Crescimento",
    question: '"Como a empresa está planejando a expansão para os próximos anos?"',
    green: '"Queremos romper barreiras geográficas e explorar fusões/aquisições"',
    red: '"Focar em crescer a carteira localmente, mantendo o controle"'
  }
];

export function Roteiro() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-poppins text-4xl font-bold text-[#0A192F] mb-4">Roteiro de Qualificação</h1>
        <p className="text-lg text-gray-600">Aprenda a aplicar as 6 perguntas-chave para identificar um perfil Acelerado.</p>
      </div>

      <div className="flex flex-col gap-4">
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
}

function QuestionCard({ question }: { question: typeof questions[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 text-left transition-colors"
      >
        <span className="font-poppins font-semibold text-lg text-[#0A192F]">{question.title}</span>
        <ChevronDown className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-6 pt-0 border-t border-gray-100 bg-gray-50/50">
          
          {/* A Pergunta */}
          <div className="mt-6 p-5 bg-white rounded-xl shadow-sm border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#0A192F]"></div>
            <h4 className="font-bold text-[#0A192F] mb-2 text-sm uppercase tracking-wider">A Pergunta-Chave</h4>
            <p className="text-gray-800 font-semibold text-lg">{question.question}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Green Signal */}
            <div className="bg-white border border-emerald-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-emerald-900 mb-2">Sinal Verde (Acelerado)</h4>
                  <p className="text-emerald-800 text-sm font-medium italic leading-relaxed">{question.green}</p>
                </div>
              </div>
            </div>

            {/* Red Signal */}
            <div className="bg-white border border-red-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
              <div className="flex items-start gap-4">
                <XCircle className="text-red-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Sinal Vermelho (Não Aderente)</h4>
                  <p className="text-red-800 text-sm font-medium italic leading-relaxed">{question.red}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
