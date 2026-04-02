import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const phases = [
  {
    id: 'abertura',
    title: 'Abertura',
    time: '1-2 minutos',
    subtitle: 'Estabeleça o contexto e peça permissão para conversar',
    content: (
      <div className="space-y-4">
        <p>"Olá, [Nome do Prospect], tudo bem? Meu nome é [Seu Nome], sou da Superlógica. Estou entrando em contato porque temos observado um movimento interessante no mercado de administradoras, e gostaríamos de entender um pouco mais sobre como vocês estão se posicionando nesse cenário. Você teria uns 5-7 minutos para conversarmos rapidamente?"</p>
        <p className="font-semibold text-emerald-700">Se sim: <span className="font-normal text-gray-700">"Excelente! A ideia é um bate-papo rápido para entender o seu contexto e ver se faz sentido explorarmos algo juntos no futuro."</span></p>
        <p className="font-semibold text-amber-600">Se não: <span className="font-normal text-gray-700">"Sem problemas, [Nome do Prospect]. Qual seria o melhor momento para você?"</span></p>
      </div>
    )
  },
  {
    id: 'conexao',
    title: 'Conexão',
    time: '3-5 min',
    subtitle: 'Explore o contexto atual da empresa e gere empatia',
    content: (
      <p>
        "[Nome do Prospect], nosso mercado está em constante evolução, e notamos que algumas administradoras estão conseguindo resultados muito expressivos com a digitalização de suas operações financeiras. Para entendermos melhor esse cenário e como ele se aplica à sua realidade, gostaria de fazer algumas perguntas rápidas sobre a sua visão e a da sua empresa."
      </p>
    )
  },
  {
    id: 'qualificacao',
    title: 'Qualificação',
    time: '5-7 min',
    subtitle: 'Faça as 6 perguntas-chave de forma natural e fluida',
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-[#0A192F] mb-1">Pergunta 1 (Maturidade)</h4>
          <p className="text-gray-700">"Para começar, [Nome do Prospect], na sua percepção, quais são as maiores administradoras na sua região hoje?"</p>
        </div>
        <div>
          <h4 className="font-bold text-[#0A192F] mb-1">Pergunta 2 (Risco vs. Tecnologia)</h4>
          <p className="text-gray-700">"Quando vocês avaliam uma nova ferramenta ou tecnologia, o que pesa mais na decisão: a agilidade para testar rápido e ganhar eficiência logo, ou a necessidade de esperar a ferramenta ter estabilidade total no mercado?"</p>
        </div>
        <div>
          <h4 className="font-bold text-[#0A192F] mb-1">Pergunta 3 (Posicionamento Comercial)</h4>
          <p className="text-gray-700">"Se a Superlógica lançasse uma nova regra comercial que afeta a forma como vocês interagem com os condomínios, como funciona o processo de vocês para implementar essa mudança?"</p>
        </div>
        <div>
          <h4 className="font-bold text-[#0A192F] mb-1">Pergunta 4 (Escalabilidade Operacional)</h4>
          <p className="text-gray-700">"Pensando no futuro, se a carteira de vocês dobrar de tamanho, vocês conseguiriam crescer sem precisar aumentar o time financeiro na mesma proporção?"</p>
        </div>
        <div>
          <h4 className="font-bold text-[#0A192F] mb-1">Pergunta 5 (Perfil do Dono)</h4>
          <p className="text-gray-700">"E sobre a gestão, [Nome do Prospect], o dono ou a diretoria se envolve mais na rotina operacional financeira ou foca mais na parte estratégica do negócio?"</p>
        </div>
        <div>
          <h4 className="font-bold text-[#0A192F] mb-1">Pergunta 6 (Estratégia de Crescimento)</h4>
          <p className="text-gray-700">"Para finalizar, como a empresa está planejando a expansão para os próximos anos? Há planos de ir além da região atual ou de buscar novos formatos de crescimento?"</p>
        </div>
      </div>
    )
  },
  {
    id: 'fechamento',
    title: 'Fechamento',
    time: '2-3 min',
    subtitle: 'Direcione os próximos passos baseando-se no perfil identificado',
    content: (
      <div className="space-y-8">
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
          <h4 className="font-bold text-emerald-800 mb-2 uppercase tracking-wider text-sm">Cenário A - Prospect Acelerado (Maioria de Verdes)</h4>
          <p className="text-emerald-950">
            "[Nome do Prospect], muito obrigado pelas suas respostas. Foi muito esclarecedor! Pelo que você me contou, percebo que a [Nome da ADM] tem uma visão muito alinhada com o que temos visto de mais inovador no mercado. Acredito que temos uma oportunidade real de gerar um impacto significativo nos seus resultados. Que tal agendarmos uma conversa mais aprofundada com um de nossos especialistas para mostrar como podemos acelerar ainda mais o seu crescimento? Podemos fazer isso na [Data/Hora Sugerida]?"
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
          <h4 className="font-bold text-gray-700 mb-2 uppercase tracking-wider text-sm">Cenário B - Prospect Não Aderente (Maioria Vermelhos)</h4>
          <p className="text-gray-800">
            "[Nome do Prospect], entendi perfeitamente o seu cenário. Agradeço muito o seu tempo e a sua abertura. Continuaremos acompanhando o mercado e, se surgir algo que faça mais sentido para o seu perfil, entraremos em contato. Desejo muito sucesso!"
          </p>
        </div>
      </div>
    )
  }
];

export function Script() {
  const [activeTab, setActiveTab] = useState(phases[0].id);

  const currentPhase = phases.find(p => p.id === activeTab)!;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-poppins text-4xl font-bold text-[#0A192F] mb-4">Script de Abordagem</h1>
        <p className="text-lg text-gray-600">Utilize este guia prático para conduzir a ligação.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 bg-gray-100 p-2 rounded-2xl w-full max-w-4xl mx-auto">
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => setActiveTab(phase.id)}
            className={`flex-1 min-w-[150px] py-3 px-6 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === phase.id
                ? 'bg-white text-[#0A192F] shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            {phase.title}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div 
        key={activeTab} 
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 animate-in fade-in duration-500 max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h2 className="font-poppins text-3xl font-bold text-[#0A192F] mb-2 flex items-baseline gap-3">
            {currentPhase.title} 
            <span className="text-gray-400 text-lg font-medium">({currentPhase.time})</span>
          </h2>
          <p className="text-gray-600 text-lg">{currentPhase.subtitle}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative">
          <MessageCircle className="absolute top-6 left-6 text-[#1822E5]" size={24} />
          <div className="pl-12 text-gray-800 leading-relaxed text-lg font-medium">
            {currentPhase.content}
          </div>
        </div>
      </div>
    </div>
  );
}
