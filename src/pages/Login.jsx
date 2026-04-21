import React, { useState } from 'react';

// --- VISÃO DE LOGIN (RESTAURADA COM OS 3 TIPOS) ---
const LoginView = ({ onLogin }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-105" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl text-center">
        <div className="mb-8">
          <div className="inline-block p-4 rounded-2xl bg-green-500/20 mb-4 animate-pulse">
             <span className="text-4xl">🌳</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-1 tracking-tight uppercase">Fiscaliza</h1>
          <p className="text-green-300 font-bold text-[10px] tracking-[0.3em] uppercase">Conceição do Araguaia • PA</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin({ name: 'Márcio Rodrigues', role: 'admin' })}
            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl shadow-lg cursor-pointer transition-all active:scale-95"
          >
            ENTRAR COMO ADMINISTRADOR
          </button>
          
          <button 
            onClick={() => onLogin({ name: 'Gestor SEMMA', role: 'gestor' })}
            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold rounded-xl cursor-pointer transition-all"
          >
            ENTRAR COMO GESTOR
          </button>

          <button 
            onClick={() => onLogin({ name: 'Equipe Fiscal', role: 'fiscal' })}
            className="w-full py-4 bg-transparent hover:bg-white/5 text-white/80 text-sm font-medium rounded-xl transition-all cursor-pointer"
          >
            ACESSO MODO FISCAL (LEITURA)
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-bold">RAZGO Tecnologia • 2026</p>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD PRINCIPAL ---
const Dashboard = ({ user, onLogout }) => {
  const [detalheAberto, setDetalheAberto] = useState(null);
  
  const [processos] = useState([
    { id: "2026-001", empresa: "MazzSys Tecnologia", impacto: "Baixo", status: "Pago", lat: "-8.2575", lng: "-49.2616", cnpj: "00.111.222/0001-33" },
    { id: "2026-002", empresa: "Cerâmica Industrial CDA", impacto: "Alto", status: "Pendente", lat: "-8.2610", lng: "-49.2720", cnpj: "44.555.666/0001-77" },
    { id: "2026-003", empresa: "Posto de Combustível Rio", impacto: "Médio", status: "Pago", lat: "-8.2530", lng: "-49.2550", cnpj: "77.888.999/0001-00" },
  ]);

  const calcularTaxa = (impacto) => {
    if (impacto === 'Alto') return 'R$ 2.500,00';
    if (impacto === 'Médio') return 'R$ 1.200,00';
    return 'R$ 450,00';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* MODAL DE AUDITORIA */}
      {detalheAberto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md">
          <div className="bg-white w-full max-w-xl p-10 rounded-3xl shadow-2xl relative border-t-8 border-green-600">
            <button onClick={() => setDetalheAberto(null)} className="absolute top-4 right-4 text-slate-400 font-black">✕</button>
            <h3 className="text-2xl font-black text-slate-800 uppercase mb-1">{detalheAberto.empresa}</h3>
            <p className="text-[10px] text-slate-400 font-mono mb-8">{detalheAberto.cnpj}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-[9px] font-black text-slate-400 uppercase">Taxa</p>
                <p className="text-lg font-black text-green-700">{calcularTaxa(detalheAberto.impacto)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-[9px] font-black text-slate-400 uppercase">Status</p>
                <p className={`text-lg font-black ${detalheAberto.status === 'Pago' ? 'text-blue-600' : 'text-red-600'}`}>{detalheAberto.status}</p>
              </div>
            </div>

            <div className="space-y-4">
              <a href={`https://www.google.com/maps?q=${detalheAberto.lat},${detalheAberto.lng}`} target="_blank" rel="noreferrer" 
                className="block w-full py-4 bg-slate-800 text-white text-center font-black rounded-xl hover:bg-slate-700">📍 LOCALIZAÇÃO GEOGRÁFICA</a>
              
              {/* Só Admin ou Gestor podem emitir a certidão final */}
              {(user.role === 'admin' || user.role === 'gestor') && detalheAberto.status === 'Pago' ? (
                <button className="w-full py-4 bg-green-600 text-white font-black rounded-xl hover:bg-green-700">GERAR CERTIDÃO DIGITAL</button>
              ) : (
                <div className="p-4 bg-red-50 text-red-500 text-center text-[10px] font-black rounded-xl">
                  {detalheAberto.status !== 'Pago' ? 'PAGAMENTO PENDENTE' : 'ACESSO RESTRITO PARA EMISSÃO'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 px-10 py-5 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-green-700 text-white px-3 py-1 rounded font-black">SEMMA</div>
          <h1 className="text-xl font-black tracking-tighter">FISCALIZA <span className="text-green-600">CDA</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase">{user.role}</span>
          <button onClick={onLogout} className="text-[10px] font-black text-slate-400 hover:text-red-600 uppercase transition-all">Sair</button>
        </div>
      </nav>

      {/* LISTAGEM */}
      <div className="max-w-7xl mx-auto p-10">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-800">Painel de Controle</h2>
          <p className="text-slate-400 font-bold text-xs uppercase">Secretaria Municipal de Meio Ambiente</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <tr><th className="px-8 py-5">Contribuinte</th><th className="px-8 py-5">Risco</th><th className="px-8 py-5">Taxa</th><th className="px-8 py-5 text-center">Gestão</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {processos.map(p => (
                <tr key={p.id} className="hover:bg-green-50/20 transition-all">
                  <td className="px-8 py-6">
                    <p className="font-black text-slate-800 text-xs uppercase">{p.empresa}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{p.cnpj}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded text-[9px] font-black border ${p.impacto === 'Alto' ? 'border-red-100 text-red-600' : 'border-green-100 text-green-600'}`}>{p.impacto}</span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-600">{calcularTaxa(p.impacto)}</td>
                  <td className="px-8 py-6 text-center">
                    <button onClick={() => setDetalheAberto(p)} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black hover:bg-slate-800 hover:text-white transition-all uppercase">Auditoria</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  return <main>{user ? <Dashboard user={user} onLogout={() => setUser(null)} /> : <LoginView onLogin={setUser} />}</main>;
}