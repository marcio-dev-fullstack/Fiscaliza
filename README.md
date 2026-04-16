# AppAmbiental

> **Sistema Integrado de Gestão e Monitoramento de Licenciamento Ambiental Municipal.**

---

![Versão](https://img.shields.io/badge/versão-1.0.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange?style=for-the-badge)
![License](https://img.shields.io/badge/licença-trial%20180%20dias-green?style=for-the-badge)

O **Fiscaliza Ambiental** é uma solução de alta integridade técnica desenvolvida para automatizar o fluxo de licenciamento em Secretarias Municipais de Meio Ambiente. O sistema assegura a **imputabilidade** e a **segurança jurídica**, eliminando erros manuais em prazos regulatórios.

## Objetivos do Projeto
* **Automação Regulatória:** Cálculo nativo de validade para LP, LI e LO.
* **Integridade de Dados:** Bloqueio de campos críticos e logs imutáveis de auditoria vinculados ao CPF/ID.
* **Soberania Local:** Arquitetura *Local-First* otimizada para intranets privadas com sincronização simultânea.

---

## Stack Tecnológica

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend** | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi) | APIs de alta performance e concorrência. |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react) | Interface SPA com Vite para agilidade no desktop. |
| **Banco de Dados** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql) | Persistência relacional robusta. |
| **Segurança** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens) | Autenticação e controle RBAC (Role Based Access Control). |

---

## Matriz de Acessos (RBAC)
O sistema utiliza quatro perfis distintos para garantir o compliance administrativo:

1.  **Administradores:** Auditoria avançada e controle de parâmetros globais.
2.  **Analistas Ambientais:** Gestão técnica e validação para emissão de licenças.
3.  **Técnicos Ambientais:** Consultores externos realizando protocolos de serviços.
4.  **Empreendimentos:** Acompanhamento transparente do status de regularização.

---

## Como Rodar o Projeto

### Pré-requisitos
* Python 3.10+
* PostgreSQL
* Node.js & NPM/Yarn

### Instalação (Backend)
```bash
# Clonar o repositório
git clone https://github.com/marcio-dev-fullstack/Fiscaliza.git

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -r requirements.txt