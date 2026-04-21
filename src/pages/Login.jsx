import React, { useState } from 'react';

// --- CONFIGURAÇÃO DE SEGURANÇA MESTRE ---
const CPF_MASTER = "633.740.302-97"; // MÁRCIO, INSIRA SEU CPF AQUI
const SENHA_MASTER = "mamst1ns";

export default function Login({ onLogin, usuariosCadastrados, diasRestantes }) {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // MÁSCARA DE CPF EM TEMPO REAL
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setCpf(value);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validação do Superusuário (Márcio)
    if (cpf === CPF_MASTER && password === SENHA_MASTER) {
      onLogin({ 
        id: cpf, 
        nome: "Márcio Rodrigues de Oliveira", 
        role: "ADMIN",
        label: "ADMINISTRADOR MASTER" 
      });
      return;
    }

    // 2. Validação dos Gestores/Analistas Cadastrados
    const usuarioValidado = usuariosCadastrados.find(
      (u) => u.cpf === cpf && u.senha === password
    );

    if (usuarioValidado) {
      onLogin({ 
        id: cpf, 
        nome: usuarioValidado.nome, 
        role: "ANALISTA",
        label: "ANALISTA AMBIENTAL" 
      });
    } else {
      setError("Acesso negado. Verifique o CPF e a senha.");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-slate-950 font-sans p-6 overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000')] bg-cover bg-center opacity-10" />
      
      <div className="relative z-10 w-full max-w-md p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl">
        <div className="mb-10 flex flex-col items-center">
          <div className="bg-white p-3 rounded-2xl shadow-lg mb-4">
             <img src="/logo.jpg" alt="Logo SEMMA" className="w-20 h-auto" />
          </div>
          <h1 className="text-4xl font-black text-green-500 uppercase tracking-tighter pt-4 border-t border-white/10 w-full text-center">
            Fiscaliza
          </h1>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mt-2">
            Sistema de Gestão Ambiental
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-white/40 uppercase ml-2 tracking-widest">
              Acesso por CPF
            </label>
            <input 
              type="text" 
              placeholder="000.000.000-00"
              required 
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-lg text-center font-mono outline-none focus:border-green-500 transition-all shadow-inner"
              value={cpf}
              onChange={handleCpfChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-white/40 uppercase ml-2 tracking-widest">
              Senha de Segurança
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              required 
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white text-lg text-center outline-none focus:border-green-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-[10px] font-black uppercase text-center animate-bounce">
              ⚠️ {error}
            </p>
          )}

          <button 
            type="submit" 
            className="w-full mt-2 py-5 bg-green-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-green-500 shadow-xl shadow-green-900/20 transition-all active:scale-95"
          >
            Validar Identidade
          </button>
        </form>

        <div className="mt-12 p-5 rounded-[2rem] border border-white/5 bg-white/5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Status da Licença</span>
            <span className="text-green-500 font-black text-xs uppercase">Operacional</span>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Expira em</span>
            <span className="text-white/60 font-black text-xs block">{diasRestantes} DIAS</span>
          </div>
        </div>
      </div>
    </main>
  );
}