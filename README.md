<div align="center">

# 📖 BibleDS · Hyper-Analytics

### AI-Driven Semantic Engine para Análise Textual das Escrituras

**Observable Framework · TypeScript · Tailwind CSS · Firebase**

[![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-Online-FF6F00?style=flat-square&logo=firebase&logoColor=white)](https://bibleds.web.app)
[![Observable Framework](https://img.shields.io/badge/Observable-Framework-8A30F4?style=flat-square&logo=observable&logoColor=white)](https://observablehq.com/framework/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br/>

> **759.798 palavras processadas · Integridade 100% · Latência O(1)**

<br/>

**[🌐 Acessar o App →](https://bibleds.web.app)**

</div>

---

## 📸 Interface

![BibleDS Dashboard](./docs/captura.png)

> Dashboard com KPIs em tempo real, engine *Static Set Filtering*, e análise de Densidade Lexical por livro — filtrável por Antigo e Novo Testamento.

---

## 📌 O que é o BibleDS?

**BibleDS Hyper-Analytics** é uma plataforma de **ciência de dados aplicada ao texto bíblico**, construída sobre o [Observable Framework](https://observablehq.com/framework/). O projeto trata as Escrituras como um corpus linguístico estruturado — processando, indexando e visualizando padrões semânticos e lexicais com precisão analítica.

O sistema não é um leitor de Bíblia. É um **laboratório de análise textual** onde cada versículo é um dado, cada livro é uma dimensão, e cada busca retorna em tempo O(1).

---

## ✨ Módulos

| Módulo | Descrição |
|:---|:---|
| 📊 **Dashboard** | KPIs globais do corpus: volume bruto, integridade do pipeline, engine ativa e livros sincronizados |
| 📚 **Estudos** | Análise de Densidade Lexical por livro com filtro por Testamento (AT / NT / Todos) |
| 🤖 **Laboratório IA** | Motor semântico experimental — busca por conceito, não por palavra-chave |

---

## ⚙️ Engine: Static Set Filtering

O núcleo do BibleDS usa **Static Set Filtering** como estratégia de busca — um índice pré-computado em sets JavaScript que entrega:

- **Latência O(1)** independente do volume do corpus
- **Integridade 100%** — pipeline validado contra o corpus completo
- **759.798 palavras** processadas e indexadas no build
- **Zero dependência de servidor** em tempo de execução — tudo roda no browser

```
corpus (texto bruto)
     ↓
  tokenização + normalização
     ↓
  índice invertido (Map<token, Set<verseId>>)
     ↓
  Static Set → busca O(1) no browser
```

---

## 📊 KPIs do Corpus

| Métrica | Valor |
|:---|:---:|
| Volume bruto processado | **759.798 palavras** |
| Integridade do pipeline | **100%** |
| Engine de busca | **Static Set Filtering** |
| Livros NT sincronizados | **27 / 73** |
| Latência de busca | **O(1)** |

---

## 🛠️ Stack Técnica

| Camada | Tecnologia | Papel |
|:---|:---|:---|
| **Framework** | Observable Framework | Renderização reativa de notebooks/dashboards |
| **Linguagem** | TypeScript | Tipagem estrita do pipeline de dados |
| **Estilo** | Tailwind CSS (CDN) | Design system dark utilitário |
| **Tipografia** | Inter + Merriweather | UI técnica + leitura de texto bíblico |
| **Tema** | Dark / Slate nativo | Observable dark theme customizado |
| **Hosting** | Firebase Hosting | Deploy estático com CDN global |
| **CI/CD** | GitHub Actions | Build e deploy automático em push |

---

## 🗂️ Estrutura do Projeto

```
BibleDS/
│
├── src/                        # Raiz do Observable Framework
│   ├── index.md                # Dashboard principal (KPIs + Engine)
│   ├── home.md                 # Página de Estudos (Densidade Lexical)
│   ├── lab.md                  # Laboratório IA (busca semântica)
│   │
│   ├── components/             # Componentes TypeScript reutilizáveis
│   │   ├── kpi-card.ts         # Cards de métricas globais
│   │   ├── lexical-chart.ts    # Gráfico de Densidade Lexical (D3/Plot)
│   │   └── search-engine.ts    # Static Set Filtering engine
│   │
│   ├── data/                   # Loaders de dados do corpus
│   │   ├── corpus.json.ts      # Pipeline de processamento do texto bíblico
│   │   └── index.json.ts       # Índice invertido pré-computado
│   │
│   └── styles/
│       └── main.css            # Tokens CSS + overrides do tema Observable
│
├── .github/workflows/
│   └── deploy.yml              # CI/CD → Firebase Hosting
│
├── .firebase/                  # Cache de deploy Firebase
├── .firebaserc                 # Projeto ativo: bibleds
├── firebase.json               # Configuração de hosting
├── observablehq.config.ts      # Configuração global do framework
├── package.json                # Scripts e dependências
└── tsconfig.json               # TypeScript strict mode
```

---

## 🚀 Rodando Localmente

### Pré-requisitos

- Node.js ≥ 18
- npm ≥ 9

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/Rilen/BibleDS.git
cd BibleDS

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**

O Observable Framework atualiza automaticamente ao salvar qualquer arquivo `.md` ou `.ts`.

### Scripts

| Comando | Descrição |
|:---|:---|
| `npm run dev` | Servidor de desenvolvimento com live reload |
| `npm run build` | Build estático para produção em `dist/` |
| `npm run preview` | Pré-visualização do build local |
| `npm run deploy` | Build + deploy para Firebase Hosting |

---

## ☁️ Deploy

O projeto usa **GitHub Actions** para deploy automático em cada push na branch `main`:

```bash
# Deploy manual
npm run build
firebase deploy --only hosting
```

| Serviço | URL |
|:---|:---|
| 🌐 Aplicação | https://bibleds.web.app |
| 🖥️ Console Firebase | https://console.firebase.google.com/project/bibleds |

---

## 🔮 Roadmap

- [ ] **NLP Semântico** — embeddings vetoriais para busca por conceito teológico
- [ ] **Análise de Co-ocorrência** — grafo de termos relacionados por livro/capítulo
- [ ] **Comparativo de Traduções** — diff lexical entre versões (ARA, NVI, ACF)
- [ ] **Timeline Histórica** — visualização cronológica dos livros por autoria
- [ ] **Laboratório IA completo** — integração com modelo de linguagem (LLM) para Q&A bíblico
- [ ] **Export de análises** — CSV / JSON do índice e métricas por livro
- [ ] **Sincronização completa NT** — 73/73 livros indexados

---

## 👤 Autor

**Rilen Tavares Lima**  
Data Scientist · Supervisor de Governança de TIC · 25+ anos em infraestrutura crítica

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rilen/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/rilen)
[![Portfólio](https://img.shields.io/badge/Portfólio-000000?style=flat-square&logo=githubpages&logoColor=white)](https://rilen.github.io/portfolio/)

---

<div align="center">

**BibleDS Hyper-Analytics** · AI-Driven Semantic Engine v2.0

*As Escrituras como corpus. Os dados como revelação.*

</div>
