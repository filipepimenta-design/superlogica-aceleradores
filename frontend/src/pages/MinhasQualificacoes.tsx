import { trpc } from '../trpc';
import { Loader2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MinhasQualificacoes() {
  const { data, isLoading } = trpc.myQualifications.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#10B981] w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="font-poppins text-4xl font-bold text-[#1822E5] mb-2">Minhas Qualificações</h1>
          <p className="text-lg text-gray-600">Histórico de empresas qualificadas por você.</p>
        </div>
        <Link to="/ferramenta" className="px-6 py-3 bg-[#1822E5] text-white font-bold rounded-xl flex items-center gap-2 hover:bg-blue-800 transition-colors shadow-sm">
          <Plus size={20} /> Nova
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {data && data.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Empresa</th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Perfil</th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Sinais (V/V)</th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((q: any) => (
                <tr key={q.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1822E5]">{q.companyName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${q.profile === 'acelerado' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {q.profile === 'acelerado' ? 'Acelerado' : 'Não Aderente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    <span className="text-emerald-500">{q.totalGreenSignals}</span> <span className="text-gray-300 mx-1">/</span> <span className="text-red-500">{q.totalRedSignals}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500">
                    {new Date(q.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-gray-500 font-medium">
            Você ainda não registrou nenhuma qualificação.
          </div>
        )}
      </div>
    </div>
  );
}
