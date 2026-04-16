# AppAmbiental

## Sistema de Gestão de Licenciamento

O **Fiscaliza Ambiental** é uma solução corporativa de alta integridade desenvolvida para automatizar e otimizar o fluxo de licenciamento em Secretarias Municipais de Meio Ambiente. O sistema foca em segurança de dados, automação de prazos regulatórios e rastreabilidade total de processos administrativos.

---

## Visão Geral e Governança

Diferente de sistemas de gestão genéricos, o Fiscaliza Ambiental foi projetado para garantir a **imputabilidade** e a **segurança jurídica** no licenciamento ambiental municipal. O software assegura que as normas de validade sejam rigorosamente cumpridas através de automação sistêmica, eliminando erros humanos e edições arbitrárias de prazos.

### Diferenciais Estratégicos

* **Automação Regulatória:** Cálculo nativo de períodos de validade baseado na tipologia da licença (LP, LI, LO), com bloqueio de escrita em campos críticos para garantir a integridade temporal.
* **Arquitetura Intranet (Local-First):** Otimizado para operação em rede local privada, permitindo a sincronização de até 5 estações de trabalho simultâneas sem dependência de nuvem externa.
* **Protocolo de Auditoria Interna:** Registro imutável (logs) de todas as operações críticas, vinculando cada deferimento ou alteração ao CPF/ID do usuário responsável.

---

## Arquitetura Técnica

O projeto utiliza uma stack robusta, focada em performance e baixa manutenção:

* **Backend:** Arquitetura RESTful utilizando Python (FastAPI/Django) ou Node.js, priorizando concorrência e segurança de dados.
* **Frontend:** Interface Web SPA desenvolvida em React.js + Vite, oferecendo experiência de usuário ágil e responsiva para desktop.
* **Persistência:** Banco de Dados Relacional PostgreSQL, configurado para alta disponibilidade em ambiente de rede local.
* **Segurança:** Autenticação via JWT (JSON Web Tokens), criptografia de senhas com algoritmos de Hash (BCrypt) e controle de acesso granular (RBAC).

---

## Matriz de Acessos e Perfis (RBAC)

O sistema opera com quatro níveis distintos de permissão para garantir o fluxo de trabalho correto:

1.  **Administradores (Superusuários):** Gestão de parâmetros globais do sistema, auditoria avançada e controle de usuários.
2.  **Analistas Ambientais (Gestores):** Perfil técnico da Secretaria responsável pela análise, validação e emissão final de licenças.
3.  **Técnicos Ambientais:** Consultores e profissionais externos que realizam o protocolo de serviços e submissão de documentação.
4.  **Empreendimentos/Empresas:** Entidades interessadas que acompanham o status de suas solicitações e regularizações.

---

## Regras de Negócio e Compliance

* **Imutabilidade de Prazos:** Uma vez emitida a licença, o vencimento é calculado automaticamente e o campo é desativado para edição manual. Alterações só são permitidas via processo de renovação ou retificação oficial registrada em log.
* **Gestão de Trial (Licenciamento):** O software inclui um módulo de avaliação de 180 dias. O status da licença é exibido em tempo real na interface de autenticação.
* **Deploy Local:** Configuração simplificada para ambiente de intranet através de IP fixo no servidor central, garantindo soberania de dados para a Secretaria.

---

##  Desenvolvimento

**Márcio Rodrigues de Oliveira** *Engenheiro de Software | Engenheiro Civil | Engenheiro de Segurança do Trabalho* 

Especialista em soluções de automação para engenharia e gestão pública.

---
> *Este software possui um período de licenciamento gratuito por 6 meses. Após este período, a renovação é necessária para manter a operabilidade do cadastro e emissão de novos documentos.*
