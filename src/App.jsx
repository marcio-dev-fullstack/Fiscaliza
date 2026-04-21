import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÕES TÉCNICAS (ENGENHARIA) ---
// DATA_INSTALACAO em 20/04/2026 fará o contador mostrar 90 DIAS hoje.
const DATA_INSTALACAO = new Date("2026-04-20"); 
const DIAS_TRIAL_TOTAL = 90; 
const MESES_VALIDADE_LICENCA = 60; 

// --- UTILITÁRIOS DE SEGURANÇA ---
const gerarChaveCriptografada = () => {
  // CONFIGURAÇÃO: Expira em exatos 5 MINUTOS
  const expiraEm = Date.now() + (5 * 60 * 1000); 
  return btoa(`FISCALIZA-${expiraEm}`).trim();
};

const validarChave = (chave) => {
  try {
    const decodificada = atob(chave.trim());
    const partes = decodificada.split('-');
    const timestampExpira = parseInt(partes[1]);
    return partes[0] === "FISCALIZA" && Date.now() < timestampExpira;
  } catch (e) {
    return false;
  }
};

// --- COMPONENTE DASHBOARD ---
const Dashboard = ({ user, onLogout, trialRestante, expirado, isTokenValid }) => {
  const [aba, setAba] = useState('processos');
  const [certidaoAberta, setCertidaoAberta] = useState(null);
  const [chaveGerada, setChaveGerada] = useState("");

  const calcularVencimentoLicenca = () => {
    const data = new Date();
    data.setMonth(data.getMonth() + MESES_VALIDADE_LICENCA);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* MODAL DE CERTIDÃO */}
      {certidaoAberta && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl p-12 shadow-2xl relative border-t-8 border-green-700">
            <button onClick={() => setCertidaoAberta(null)} className="absolute top-4 right-4 text-slate-400 font-black print:hidden">✕</button>
            <h2 className="text-xl font-black text-center mb-8 uppercase text-slate-800 tracking-tighter">Licenciamento Ambiental CDA</h2>
            <div className="bg-green-50 p-8 rounded-3xl border border-green-100 text-center mb-6">
              <p className="text-[10px] font-black text-green-600 uppercase mb-2">Validade da Licença (60 Meses)</p>
              <p className="text-3xl font-black text-green-800 uppercase italic">Vence em: {calcularVencimentoLicenca()}</p>
            </div>
            <button onClick={() => window.print()} className="w-full py-4 bg-slate-900 text-white font-black rounded-xl uppercase text-xs tracking-widest">Imprimir via oficial</button>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-white border-b px-10 py-5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-6">
          <div className="bg-slate-900 text-white px-3 py-1 rounded font-black text-xs uppercase">Fiscaliza</div>
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button onClick={() => setAba('processos')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase ${aba === 'processos' ? 'bg-white shadow-sm text-green-700' : 'text-slate-400'}`}>Processos</button>
            {user.role === 'admin' && (
              <button onClick={() => setAba('admin')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase ${aba === 'admin' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-400'}`}>Gerar Chave</button>
            )}
          </div>
        </div>
        <button onClick={onLogout} className="text-[10px] font-black text-red-500 uppercase px-4 py-2 hover:bg-red-50 rounded-lg transition-all tracking-widest leading-none">Sair</button>
      </nav>

      <main className="flex-grow p-10 max-w-4xl mx-auto w-full text-center">
        {aba === 'admin' ? (
          <div className="bg-white p-12 rounded-[3rem] border-2 border-dashed border-blue-200 text-center animate-in zoom-in duration-300">
            <h3 className="font-black text-slate-800 uppercase mb-2 text-sm tracking-widest">Token de Emergência (5 min)</h3>
            <p className="text-red-500 text-[10px] font-black mb-8 uppercase tracking-widest">⚠️ O sistema será bloqueado após 5 minutos do uso</p>
            {chaveGerada && (
              <div className="bg-slate-900 p-6 rounded-2xl mb-8 border border-blue-500/30">
                <code className="text-blue-400 text-[10px] break-all block font-mono">{chaveGerada}</code>
              </div>
            )}
            <button onClick={() => setChaveGerada(gerarChaveCriptografada())} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase hover:bg-blue-500 shadow-xl transition-all">Gerar Nova Chave</button>
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[3rem] shadow-sm border border-slate-200">
             <button onClick={() => setCertidaoAberta(true)} className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 shadow-lg">Emitir Licença Ambiental</button>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white/40 px-10 py-4 flex justify-between text-[9px] font-black tracking-[0.2em]">
        <span>© 2026 RAZGO TECNOLOGIA</span>
        <span className={(expirado && !isTokenValid) ? "text-red-500" : "text-green-500"}>
          LICENÇA: {(expirado && !isTokenValid) ? "BLOQUEADA" : (isTokenValid ? "TOKEN 5 MIN" : `${trialRestante} DIAS`)}
        </span>
      </footer>
    </div>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [user, setUser] = useState(null);
  const [chaveInput, setChaveInput] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [diasRestantes, setDiasRestantes] = useState(90);
  const [expirado, setExpirado] = useState(false);

  useEffect(() => {
    const calcularTrial = () => {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataInst = new Date(DATA_INSTALACAO);
      dataInst.setHours(0, 0, 0, 0);

      const diffTime = hoje.getTime() - dataInst.getTime();
      const diasPassados = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      const calculo = DIAS_TRIAL_TOTAL - diasPassados;
      const final = calculo > 0 ? calculo : 0;
      
      setDiasRestantes(final);
      setExpirado(final <= 0);
    };

    calcularTrial();
  }, []);

  const handleValidar = () => {
    if (validarChave(chaveInput)) {
      setIsTokenValid(true);
      alert("SISTEMA LIBERADO POR 5 MINUTOS!");
    } else {
      alert("TOKEN INVÁLIDO OU EXPIRADO!");
    }
  };

  if (!user) {
    return (
      <main className="relative min-h-screen flex items-center justify-center bg-slate-950 font-sans p-6 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000')] bg-cover opacity-20" />
        
        <div className="relative z-10 w-full max-w-md p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl">
          <div className="mb-6 flex flex-col items-center">
            <img src="/logo.jpg" alt="Logo" className="w-28 h-auto mb-4 drop-shadow-2xl rounded-lg" onError={(e) => { e.target.style.display = 'none'; }} />
            {/* NOME FISCALIZA: NÃO-ITÁLICO E COR VERDE */}
            <h1 className="text-4xl font-black text-green-500 uppercase tracking-tighter border-t border-white/10 pt-6 w-full">
              Fiscaliza
            </h1>
          </div>
          
          <div className="flex flex-col gap-4 mb-10">
            <button 
              disabled={expirado && !isTokenValid}
              onClick={() => setUser({name: 'Analista Ambiental', role: 'gestor'})}
              className={`w-full py-5 bg-green-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-green-900/20 transition-all ${expirado && !isTokenValid ? 'opacity-20 bg-slate-800 cursor-not-allowed' : 'hover:bg-green-500'}`}
            >
              Analista Ambiental
            </button>

            <button onClick={() => setUser({name: 'Márcio Rodrigues', role: 'admin'})} 
              className="w-full py-5 font-black rounded-2xl text-xs uppercase border-2 border-white/10 text-white hover:bg-white/10 tracking-widest transition-all">
              RAZGO TECNOLOGIA
            </button>
          </div>

          <div className={`p-6 rounded-[2rem] border transition-all duration-500 ${expirado && !isTokenValid ? 'border-red-600/50 bg-red-600/5' : 'border-green-600/20 bg-green-600/5'}`}>
            <div className="flex justify-between items-center text-center w-full">
               <p className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none">Validade do Sistema</p>
               <p className={`text-sm font-black leading-none ${expirado && !isTokenValid ? 'text-red-500' : 'text-green-400'}`}>
                {expirado && !isTokenValid ? "EXPIRADO" : `${diasRestantes} DIAS`}
              </p>
            </div>
            
            {expirado && !isTokenValid && (
              <div className="mt-4 space-y-3">
                <input 
                  type="text" 
                  placeholder="Token de 5 min" 
                  className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-[9px] text-white text-center font-mono outline-none"
                  value={chaveInput}
                  onChange={(e) => setChaveInput(e.target.value)}
                />
                <button onClick={handleValidar} className="w-full text-[9px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300">Ativar Acesso</button>
              </div>
            )}
            
            {isTokenValid && (
              <p className="text-green-500 text-[8px] font-black uppercase animate-pulse mt-2 tracking-widest text-center">Token Ativo (5 min)</p>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <Dashboard 
      user={user} 
      onLogout={() => setUser(null)} 
      trialRestante={diasRestantes} 
      expirado={expirado} 
      isTokenValid={isTokenValid}
    />
  );
}