import { trpc } from '../trpc';
import { Loader2, TrendingUp, Users, Target } from 'lucide-react';

export function Dashboard() {
  const { data, isLoading } = trpc.dashboardStats.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#10B981] w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-poppins text-4xl font-bold text-[#0A192F] mb-4">Dashboard Executivo</h1>
        <p className="text-lg text-gray-600">Visão geral do pipeline de qualificações do time comercial em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard title="Total Qualificados" value={data?.total || 0} icon={<Users size={24} />} color="blue" />
        <StatCard title="Acelerados" value={data?.acelerados || 0} icon={<TrendingUp size={24} />} color="emerald" />
        <StatCard title="Não Aderentes" value={data?.naoAderentes || 0} icon={<Target size={24} />} color="red" />
      </div>

       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="font-poppins text-2xl font-bold text-[#0A192F] mb-6">Ranking de Vendedores</h2>
          <div className="space-y-4">
             {data?.ranking.map((r: any, idx: number) => (
               <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                 <span className="font-medium text-gray-800">{r.name}</span>
                 <span className="font-bold text-[#10B981]">{r.count} qualificações</span>
               </div>
             ))}
             {!data?.ranking?.length && <p className="text-gray-500">Nenhum dado registrado.</p>}
          </div>
       </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    red: 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 font-medium mb-2">{title}</p>
        <h3 className="font-poppins text-4xl font-bold text-[#0A192F]">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl ${colorMap[color]}`}>
        {icon}
      </div>
    </div>
  );
}
