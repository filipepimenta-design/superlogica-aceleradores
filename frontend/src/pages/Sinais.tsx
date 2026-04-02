import { Zap, AlertTriangle } from 'lucide-react';

export function Sinais() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-poppins text-4xl font-bold text-[#1822E5] mb-4">Sinais Verdes & Vermelhos</h1>
        <p className="text-lg text-gray-600">Aprenda a reconhecer imediatamente o padrão comportamental do seu prospect.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Acelerado */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-emerald-100 flex flex-col">
          <div className="bg-[#D6FF00] p-8 text-[#1822E5] flex items-center justify-between">
            <div>
              <h2 className="font-poppins text-3xl font-bold mb-2">Perfil Acelerado</h2>
              <p className="text-emerald-50 text-lg font-medium">O Estrategista</p>
            </div>
            <Zap className="w-16 h-16 opacity-80" />
          </div>
          
          <div className="p-8">
            <ul className="space-y-6">
              <SignalItem text="Impositivo e focado em escala. Quer fazer a empresa crescer sem barreiras." isGreen />
              <SignalItem text="Define a Conta Digital Superlógica como condição obrigatória para novos negócios." isGreen />
              <SignalItem text="Alta tolerância a risco tecnológico, prefere validar rodando rápido do que esperar perfeição." isGreen />
              <SignalItem text="O dono foca exclusivamente em diretrizes estratégicas e governança, longe do operacional." isGreen />
            </ul>
          </div>
        </div>

        {/* Não Aderente */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-red-100 flex flex-col">
          <div className="bg-[#EF4444] p-8 text-white flex items-center justify-between">
            <div>
              <h2 className="font-poppins text-3xl font-bold mb-2">Não Aderente</h2>
              <p className="text-red-50 text-lg font-medium">O Tradicional</p>
            </div>
            <AlertTriangle className="w-16 h-16 opacity-80" />
          </div>
          
          <div className="p-8">
            <ul className="space-y-6">
              <SignalItem text="Passivo e focado em agradar o cliente/síndico atual em vez de ditar regras." />
              <SignalItem text="Condiciona a mudança de processos à aprovação de cada síndico ou carteira." />
              <SignalItem text="Baixíssima tolerância a risco, espera a tecnologia madurar 100% no mercado." />
              <SignalItem text="Dono ou diretoria centraliza o operacional financeiro 'para garantir que não tenha erro'." />
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

function SignalItem({ text, isGreen = false }: { text: string, isGreen?: boolean }) {
  return (
    <li className="flex items-start gap-4">
      <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isGreen ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
        {isGreen ? '+' : '-'}
      </div>
      <p className="text-gray-700 text-lg leading-relaxed">{text}</p>
    </li>
  );
}
