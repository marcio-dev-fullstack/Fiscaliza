import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LockClosedIcon, 
  EnvelopeIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // CREDENCIAIS DEFINIDAS POR VOCÊ
    const ADMIN_EMAIL = "marcio@razgo.com.br";
    const ADMIN_PASS = "mamst1ns";

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      navigate("/"); // Redireciona para o Dashboard
    } else {
      alert("Acesso Negado: Credenciais de Administrador incorretas.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      <div className="max-w-md w-full relative">
        {/* Card de Login */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          
          {/* Cabeçalho do Card */}
          <div className="bg-emerald-700 p-8 text-center">
            <div className="inline-flex p-3 bg-emerald-600 rounded-2xl mb-4 border border-emerald-500 shadow-inner">
              <ShieldCheckIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
              SISTEMA FISCALIZA
            </h1>
            <p className="text-emerald-100 text-[10px] mt-2 font-medium uppercase tracking-[0.2em]">
              Gestão e Licenciamento Ambiental
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1 tracking-widest">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                  placeholder="marcio@razgo.com.br"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1 tracking-widest">Senha de Acesso</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-black transition-all active:scale-95"
            >
              Entrar no Sistema
            </button>
          </form>

          {/* Rodapé do Card com Link RAZGO */}
          <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              Desenvolvido por
            </p>
            <a 
              href="https://razgo.com.br/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group transition-all"
            >
              <p className="text-sm font-black text-slate-800 group-hover:text-emerald-700 transition-colors uppercase tracking-tighter">
                RAZGO <span className="text-emerald-600">TECNOLOGIA</span>
              </p>
              <p className="text-[9px] text-slate-400 font-medium group-hover:text-slate-600">
                www.razgo.com.br
              </p>
            </a>
          </div>
        </div>

        {/* Informação Legal de Rodapé */}
        <p className="text-center mt-8 text-slate-500 text-[10px] font-medium uppercase tracking-tighter">
        © 2026 RAZGO TECNOLOGIA. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;