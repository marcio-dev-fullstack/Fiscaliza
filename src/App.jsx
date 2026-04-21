import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÕES TÉCNICAS (RAZGO) ---
const DATA_INSTALACAO = new Date("2026-04-20T00:00:00"); 
const DIAS_TRIAL_TOTAL = 90; 

const CPF_MASTER = "633.740.302-97"; 
const SENHA_MASTER = "mamst1ns";

export default function App() {
  const [user, setUser] = useState(null);
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [diasRestantes, setDiasRestantes] = useState(0);
  const [sistemaExpirado, setSistemaExpirado] = useState(false);
  const [usuariosCadastrados, setUsuariosCadastrados] = useState([]);

  useEffect(() => {
    const calcularLicenca = () => {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataInst = new Date(DATA_INSTALACAO);
      dataInst.setHours(0, 0, 0, 0);
      const diffTime = hoje.getTime() - dataInst.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const restante = DIAS_TRIAL_TOTAL - diffDays;
      const expirado = restante <= 0;
      setDiasRestantes(restante > 0 ? restante : 0);
      setSistemaExpirado(expirado);
    };
    calcularLicenca();
  }, []);

  const aplicarMascaraCpf = (valor) => {
    let val = valor.replace(/\D/g, ""); 
    if (val.length > 11) val = val.substring(0, 11); 
    val = val.replace(/(\d{3})(\d)/, "$1.$2");
    val = val.replace(/(\d{3})(\d)/, "$1.$2");
    val = val.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return val;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (cpf === CPF_MASTER && password === SENHA_MASTER) {
      setUser({ id: cpf, role: 'ADMIN', nome: 'Márcio Rodrigues de Oliveira' });
      return;
    }
    if (sistemaExpirado) {
      alert("ACESSO BLOQUEADO: Licença expirada.");
      return;
    }
    const analista = usuariosCadastrados.find(u => u.cpf === cpf && u.senha === password);
    if (analista) {
      setUser({ id: cpf, role: 'ANALISTA', nome: analista.nome });
    } else {
      alert("CPF ou Senha incorretos.");
    }
  };

  if (!user) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center font-sans overflow-hidden">
        
        {/* IMAGEM DE FUNDO - FLORESTA TROPICAL */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2500')",
          }}
        >
          {/* Camada de Filtro Suave */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* PAINEL DE LOGIN - EXATAMENTE COMO NO SEU PRINT */}
        <div className="relative z-10 w-full max-w-[420px] p-12 bg-white rounded-[3.5rem] shadow-2xl text-center border-t-[10px] border-green-500">
          <div className="flex justify-center mb-6">
             <img src="/logo.jpg" alt="Logo" className="w-24 h-auto rounded-2xl shadow-sm" />
          </div>
          
          <h1 className="text-4xl font-black text-green-700 uppercase mb-10 tracking-tight">Fiscaliza</h1>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <input 
              type="text" placeholder="633.740.302-97" required 
              className="w-full border border-slate-100 p-5 rounded-2xl text-center font-mono text-slate-700 outline-none focus:border-green-500 bg-slate-50/50" 
              value={cpf} onChange={(e) => setCpf(aplicarMascaraCpf(e.target.value))} 
            />
            <input 
              type="password" placeholder="••••••••" required 
              className="w-full border border-slate-100 p-5 rounded-2xl text-center outline-none focus:border-green-500 bg-slate-50/50" 
              value={password} onChange={(e) => setPassword(e.target.value)} 
            />
            
            <button type="submit" className={`w-full py-5 ${sistemaExpirado ? 'bg-slate-800' : 'bg-green-600'} text-white font-black rounded-2xl uppercase text-xs tracking-widest transition-all hover:bg-green-700 active:scale-95`}>
              {sistemaExpirado ? 'LOGIN ADMINISTRADOR' : 'ENTRAR NO SISTEMA'}
            </button>
          </form>
          
          <div className="mt-10 flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
             <span className="text-slate-300">Validade</span>
             <span className={sistemaExpirado ? "text-red-500" : "text-green-500"}>
               {diasRestantes} Dias
             </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <Dashboard 
      user={user} 
      onLogout={() => {setUser(null); setCpf(""); setPassword("");}} 
      dias={diasRestantes} 
      expirado={sistemaExpirado}
      usuariosCadastrados={usuariosCadastrados} 
      setUsuariosCadastrados={setUsuariosCadastrados} 
      aplicarMascaraCpf={aplicarMascaraCpf} 
    />
  );
}

function Dashboard({ user, onLogout, dias, expirado, usuariosCadastrados, setUsuariosCadastrados, aplicarMascaraCpf }) {
  const isAdmin = user.role === 'ADMIN';
  const [novoNome, setNovoNome] = useState("");
  const [novoCpf, setNovoCpf] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const handleCadastrar = (e) => {
    e.preventDefault();
    setUsuariosCadastrados([...usuariosCadastrados, { nome: novoNome, cpf: novoCpf, senha: novaSenha }]);
    alert("Cadastrado!");
    setNovoNome(""); setNovoCpf(""); setNovaSenha("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="bg-white border-b px-10 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 text-white px-4 py-2 rounded-xl font-black text-sm italic uppercase">FISCALIZA</div>
          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${isAdmin ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
            {isAdmin ? "ADMINISTRADOR" : "ANALISTA"}
          </span>
        </div>
        <div className="flex items-center gap-6">
           <span className="text-[10px] font-black text-green-600 uppercase bg-green-50 px-3 py-1 rounded-lg">
             {dias} DIAS RESTANTES
           </span>
           <button onClick={onLogout} className="text-xs font-black text-red-600 uppercase">SAÍDA</button>
        </div>
      </nav>
      
      <main className="flex-grow p-10 max-w-7xl mx-auto w-full">
        <header className="text-center mb-16">
          <h2 className="font-black uppercase tracking-widest text-lg mb-2 text-slate-700">
            {isAdmin ? "ADMINISTRADOR" : "PAINEL ANALISTA AMBIENTAL"}
          </h2>
          <p className="text-slate-600 text-base uppercase font-bold tracking-widest">
            Bem-vindo, <span className="text-blue-600">{user.nome}</span>
          </p>
        </header>

        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
              <h3 className="font-black text-xs uppercase mb-8 text-blue-600 border-b pb-4 text-center">Cadastrar Novo Usuário</h3>
              <form onSubmit={handleCadastrar} className="space-y-6">
                <input type="text" placeholder="Nome Completo" required className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-[10px] font-bold uppercase outline-none focus:border-blue-600" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
                <input type="text" placeholder="CPF" required className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-[10px] font-mono" value={novoCpf} onChange={(e) => setNovoCpf(aplicarMascaraCpf(e.target.value))} />
                <input type="password" placeholder="Senha" required className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl text-[10px]" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
                <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase shadow-lg">REGISTRAR USUÁRIO</button>
              </form>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
              <h3 className="font-black text-xs uppercase mb-8 text-slate-500 border-b pb-4 text-center">Analistas Ativos ({usuariosCadastrados.length})</h3>
              <div className="space-y-4">
                {usuariosCadastrados.map((u, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-800 uppercase">{u.nome}</span>
                    <span className="text-[10px] font-mono text-slate-500">{u.cpf}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white/40 px-10 py-8 flex justify-between text-[10px] font-black uppercase mt-auto tracking-widest">
        <span>© 2026 RAZGO TECNOLOGIA</span>
        <span>VALIDADE DO SISTEMA: {dias} DIAS</span>
      </footer>
    </div>
  );
}