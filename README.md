# Fiscaliza Ambiental

> **Sistema Integrado de Gestão e Monitoramento de Licenciamento Ambiental Municipal.**

---

![Versão](https://img.shields.io/badge/versão-1.0.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange?style=for-the-badge)
![PDF-Engine](https://img.shields.io/badge/PDF-ReportLab%20%7C%20WeasyPrint-red?style=for-the-badge)
![License](https://img.shields.io/badge/licença-trial%20180%20dias-green?style=for-the-badge)

O **Fiscaliza Ambiental** é uma solução de alta integridade técnica desenvolvida para automatizar o fluxo de licenciamento em Secretarias Municipais de Meio Ambiente. O sistema assegura a **imputabilidade** e a **segurança jurídica**, eliminando erros manuais em prazos regulatórios e garantindo a transparência na gestão pública.

---

## Módulos de Geração de PDF (Documentos Oficiais)
O sistema conta com um motor de geração de documentos dinâmicos para automatizar a emissão de:

* **Gestão de Servidores:** Geração de fichas cadastrais detalhadas e relatórios de produtividade/atividades dos fiscais municipais.
* **Cadastro de Empresas:** Emissão de comprovantes de registo, histórico de vistorias e situação cadastral ambiental.
* **Licenciamento Automatizado:** Emissão de **LP (Prévia)**, **LI (Instalação)** e **LO (Operação)** com suporte a marcas de água e QR Code de autenticidade.
* **Relatórios de Fiscalização:** Consolidação de dados para auditorias, monitoramento de prazos e relatórios de transparência para o portal municipal.

---

## Stack Tecnológica

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend** | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi) ![Django](https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django) | APIs de alta performance e robustez administrativa com Python. |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript) | Interface SPA (Single Page Application) moderna, responsiva e otimizada. |
| **PDF Engine** | ![Python](https://img.shields.io/badge/ReportLab-3776AB?style=flat-square&logo=python) | Geração de PDFs complexos com suporte a tabelas, imagens e lógica dinâmica. |
| **Banco de Dados** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql) | Persistência de dados relacional com alta integridade e segurança. |
| **Automação** | ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright) | Web scraping e automação de processos de consulta a portais governamentais. |

---

## Objetivos e Funcionalidades
* **Automação Regulatória:** Cálculo nativo de prazos de validade para licenças.
* **Integridade de Dados:** Bloqueio de edição em campos críticos após a emissão e logs imutáveis de auditoria vinculados ao ID do utilizador.
* **Gestão RBAC:** Controle de acesso baseado em funções (Administrador, Analista, Fiscal e Empresa).
* **Soberania Local:** Arquitetura otimizada para funcionamento em intranets privadas com sincronização em nuvem.

---

## Como Rodar o Projeto

### 1. Pré-requisitos
* Python 3.10+
* Node.js & NPM
* PostgreSQL

### 2. Instalação e Configuração
```bash
# Clonar o repositório
git clone https://github.com/marcio-dev-fullstack/Fiscaliza.git

# Criar e ativar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Instalar dependências de Backend e Motores de PDF
pip install -r requirements.txt
pip install reportlab weasyprint


---

## 👤 Desenvolvedor

<table border="0">
  <tr>
    <td>
      <img src="https://github.com/marcio-dev-fullstack.png" width="120px;" alt="Márcio Rodrigues de Oliveira"/>
    </td>
    <td>
      <strong>Márcio Rodrigues de Oliveira</strong><br>
      🚀 <em>Engenheiro de Software | Engenheiro Civil | Seg. do Trabalho</em><br>
      <br>
      <a href="https://github.com/marcio-dev-fullstack">
        <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
      </a>
      <a href="https://www.linkedin.com/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
      </a>
    </td>
  </tr>
</table>

---

## Licenciamento e Uso

> [!IMPORTANT]
> **Modelo de Licenciamento Comercial (Trial Ativo)**

| Condição | Prazo | Funcionalidade |
| :--- | :--- | :--- |
| **Período de Trial** | `180 Dias` | Acesso total a todos os módulos e emissões. |
| **Após o Prazo** | `Bloqueio` | Necessária renovação para emissão de novos documentos. |

**Nota Técnica:** Este software é protegido e projetado para garantir a segurança jurídica municipal. Após o vencimento dos 180 dias de avaliação gratuita, o motor de geração de PDFs e a autenticação de licenças entrarão em modo de "Apenas Leitura" até que a licença comercial seja validada.

---

<p align="center">
  Desenvolvido: por Márcio Rodrigues de Oliveira - Engenharia de Software
</p>