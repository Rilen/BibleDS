---
title: BibleDS Hyper-Analytics
theme: [dark, slate]
---


  <header class="mb-12 animate-reveal">
    <h1 class="text-4xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
      <span class="w-3 h-10 bg-sky-500 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)]"></span>
      BibleDS <span class="text-sky-500 italic">Hyper-Analytics</span>
    </h1>
    <p class="text-slate-400 font-medium tracking-widest uppercase text-xs opacity-60">Observable Framework • AI-Driven Semantic Engine</p>
  </header>

<!-- BI EXECUTIVE DASHBOARD KPIs -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-reveal">
  <div class="card-kpi border-l-4 border-l-sky-500">
    <div class="flex flex-col h-full justify-between">
      <div>
        <h2 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Volume Bruto</h2>
        <div class="text-3xl font-black text-white italic">759.798</div>
      </div>
      <p class="text-[0.6rem] text-slate-600 mt-2 uppercase font-bold tracking-tighter">Palavras Processadas</p>
    </div>
  </div>

  <div class="card-kpi border-l-4 border-l-emerald-500">
    <div class="flex flex-col h-full justify-between">
      <div>
        <h2 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Integridade</h2>
        <div class="text-3xl font-black text-emerald-400">100%</div>
      </div>
      <p class="text-[0.6rem] text-slate-600 mt-2 uppercase font-bold tracking-tighter">Pipeline Validado</p>
    </div>
  </div>

  <div class="card-kpi border-l-4 border-l-indigo-500">
    <div class="flex flex-col h-full justify-between">
      <div>
        <h2 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Engine</h2>
        <div class="text-xl font-black text-slate-100 italic leading-tight">Static Set Filtering</div>
      </div>
      <p class="text-[0.6rem] text-slate-600 mt-2 uppercase font-bold tracking-tighter">O(1) Search Latency</p>
    </div>
  </div>

  <div class="card-kpi border-l-4 border-l-pink-500">
    <div class="flex flex-col h-full justify-between">
      <div>
        <h2 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Carga (NT)</h2>
        <div class="text-3xl font-black text-white">27 <span class="text-sm text-slate-500 font-normal">/ 73</span></div>
      </div>
      <p class="text-[0.6rem] text-slate-600 mt-2 uppercase font-bold tracking-tighter">Livros Sincronizados</p>
    </div>
  </div>
</div>

<div class="card-premium p-6 sm:p-10 shadow-2xl mt-8 animate-reveal">
  <h2 class="text-lg font-bold text-slate-100 mb-6 flex items-center gap-3">
    <span class="w-2 h-6 bg-sky-500 rounded-full"></span>
    Densidade Lexical por Livro (Evolução Temporal)
  </h2>
  
  <div class="mb-8 p-4 bg-slate-900/50 rounded-lg border border-slate-800 radio-container">
    ${testamentoInput}
  </div>

  <div class="w-full h-[400px]">
    ${plotView}
  </div>
</div>

```js
const processed = FileAttachment("data/processData.json").json();
```

```js
const opcoesTestamento = ["Todos", "VT (Antigo Testamento)", "NT (Novo Testamento)"];
const testamentoInputView = Inputs.radio(opcoesTestamento, {value: "Todos", label: "Filtrar por Testamento:"});
const testamentoSelecionado = Generators.input(testamentoInputView);
const testamentoInput = testamentoInputView;
```

```js
const filteredBooks = testamentoSelecionado === "Todos" 
  ? processed.books 
  : processed.books.filter(b => b.testamento === (testamentoSelecionado.includes("VT") ? "VT" : "NT"));
```

```js
const plotView = Plot.plot({
  height: 350,
  marginLeft: 50,
  marginTop: 20,
  grid: true,
  style: {
    background: "transparent",
    color: "white"
  },
  x: { label: "Progressão Canônica (Livros) →", tickFormat: "" },
  y: { label: "Densidade Lexical (%)", domain: [0, 100] },
  marks: [
    Plot.areaY(filteredBooks, {
      x: (d, i) => i, 
      y: "density",
      fill: "url(#gradient)",
      curve: "natural", 
      opacity: 0.3
    }),
    Plot.lineY(filteredBooks, {
      x: (d, i) => i,
      y: "density",
      stroke: "#38bdf8",
      strokeWidth: 3,
      curve: "natural",
      tip: { fill: "#0f172a", stroke: "#38bdf8", strokeWidth: 1 },
      title: (d) => `${d.nome} (${d.testamento})\nDensidade: ${d.density}%\nPalavras: ${d.rawWords}`
    }),
    Plot.ruleY([31.0], { stroke: "#ef4444", strokeDasharray: "4,4", opacity: 0.5 }),
    Plot.text([{y: 31.0, text: "Benchmark (Rute 31%)"}], {x: 1, y: "y", text: "text", dy: -5, fill: "#ef4444", textAnchor: "start"})
  ]
});
```



<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 animate-reveal">
  <div class="card-premium p-6">
    <h2 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Volume Absoluto por Livro</h2>
    ${resize((width) => Plot.plot({
      width,
      height: 300,
      marginLeft: 60,
      marginBottom: 80,
      x: { label: null, tickRotate: -45 },
      y: { label: "Palavras Totais" },
      color: { legend: true, domain: ["VT", "NT"], range: ["#38bdf8", "#818cf8"] },
      marks: [
        Plot.barY(filteredBooks, {
          x: "nome",
          y: "rawWords",
          fill: "testamento",
          title: (d) => `${d.nome}\n${d.rawWords.toLocaleString()} Palavras Totais`,
          tip: { fill: "#0f172a", stroke: "#38bdf8" }
        }),
        Plot.ruleY([0])
      ]
    }))}
  </div>
  
  <div class="card-premium p-6">
    <h2 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Índice de Densidade (Palavras/Versículo)</h2>
    ${resize((width) => Plot.plot({
      width,
      height: 300,
      marginLeft: 40,
      marginBottom: 80,
      x: { label: null, tickRotate: -45 },
      y: { label: "Palavras por Versículo" },
      marks: [
        Plot.lineY(filteredBooks, {
          x: "nome",
          y: "wordsPerVerse",
          stroke: "#f472b6",
          strokeWidth: 2,
          curve: "natural",
          tip: { fill: "#0f172a", stroke: "#38bdf8" },
          title: (d) => `${d.nome}\n${d.wordsPerVerse} plv/versículo\nTotal de Versículos: ${d.totalVerses}`
        }),
        Plot.ruleY([0])
      ]
    }))}
  </div>
</div>

<hr class="border-slate-800 my-16" />

<div class="space-y-4 mb-12 px-2">
  <h1 class="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
    <span class="p-3 bg-sky-500 rounded-lg shadow-lg shadow-sky-500/20">🧪</span>
    Laboratório de IA & Visualizações Avançadas
  </h1>
  <p class="text-slate-400 font-medium text-lg leading-relaxed max-w-3xl">
    Exploração profunda de arquitetura UI para análises preditivas, modelagem de tópicos e grafos relacionais.
  </p>
</div>

```js
// --- DATASETS INTELIGENTES (MOCKUPS) ---
const mockupSentiment = [
  { testamento: "Velho Testamento", sentimento: "Positivo", valor: 25 },
  { testamento: "Velho Testamento", sentimento: "Neutro", valor: 45 },
  { testamento: "Velho Testamento", sentimento: "Negativo (Juízo)", valor: 30 },
  { testamento: "Novo Testamento", sentimento: "Positivo", valor: 60 },
  { testamento: "Novo Testamento", sentimento: "Neutro", valor: 30 },
  { testamento: "Novo Testamento", sentimento: "Negativo (Juízo)", valor: 10 }
];
```

```js
const mockupEras = [
  { era: "Pré-História Bíblica", inicio: -4000, fim: -2000, cor: "#cbd5e1" },
  { era: "Patriarcas", inicio: -2000, fim: -1500, cor: "#94a3b8" },
  { era: "Êxodo e Conquista", inicio: -1500, fim: -1050, cor: "#64748b" },
  { era: "Monarquia Unida", inicio: -1050, fim: -930, cor: "#cbd5e1" },
  { era: "Reinos Divididos", inicio: -930, fim: -586, cor: "#94a3b8" },
  { era: "Exílio Babilônico", inicio: -586, fim: -538, cor: "#64748b" },
  { era: "Retorno (Período Persa)", inicio: -538, fim: -332, cor: "#cbd5e1" },
  { era: "Período Helenístico", inicio: -332, fim: -63, cor: "#94a3b8" },
  { era: "Império Romano (NT)", inicio: -63, fim: 100, cor: "#38bdf8" }
];
```

```js
const mockupPatriarchs = [
  { id: "Adão", nascimento_ano: 0, morte_ano: 930, duracao_vida: 930, evento_chave: "Criação e Queda" },
  { id: "Sete", nascimento_ano: 130, morte_ano: 1042, duracao_vida: 912, evento_chave: "Linhagem da promessa" },
  { id: "Matusalém", nascimento_ano: 687, morte_ano: 1656, duracao_vida: 969, evento_chave: "Homem mais longevo" },
  { id: "Noé", nascimento_ano: 1056, morte_ano: 2006, duracao_vida: 950, evento_chave: "O Dilúvio (1656 AM)" },
  { id: "Sem", nascimento_ano: 1558, morte_ano: 2158, duracao_vida: 600, evento_chave: "Sobre vivente / Semita" },
  { id: "Abraão", nascimento_ano: 2008, morte_ano: 2183, duracao_vida: 175, evento_chave: "Chamado e Aliança" },
  { id: "Isaac", nascimento_ano: 2108, morte_ano: 2288, duracao_vida: 180, evento_chave: "Filho da Promessa" },
  { id: "Jacó", nascimento_ano: 2168, morte_ano: 2315, duracao_vida: 147, evento_chave: "Israel / 12 Tribos" },
  { id: "José", nascimento_ano: 2259, morte_ano: 2369, duracao_vida: 110, evento_chave: "Governador do Egito" }
];
```

```js
const mockupLDA = [
  { topico: "Aliança e Promessa", peso: 0.85 },
  { topico: "Lei e Julgamento", peso: 0.62 },
  { topico: "Redenção e Graça", peso: 0.91 },
  { topico: "Sabedoria e Conduta", peso: 0.54 },
  { topico: "Escatologia", peso: 0.43 }
];
```

```js
const mockupEntropy = [
  { livro: "Gênesis", precisaoGeo: 0.85, entropia: 0.40, testamento: "VT" },
  { livro: "Levítico", precisaoGeo: 0.20, entropia: 0.90, testamento: "VT" },
  { livro: "Josué", precisaoGeo: 0.95, entropia: 0.30, testamento: "VT" },
  { livro: "Salmos", precisaoGeo: 0.35, entropia: 0.85, testamento: "VT" },
  { livro: "Lucas", precisaoGeo: 0.90, entropia: 0.25, testamento: "NT" },
  { livro: "Apocalipse", precisaoGeo: 0.15, entropia: 0.95, testamento: "NT" }
];
```

```js
const mockupSazonalidade = [
  { seculo: "-14", volume: 15 }, { seculo: "-13", volume: 10 }, { seculo: "-10", volume: 30 },
  { seculo: "-8", volume: 45 },  { seculo: "-6", volume: 80 },  { seculo: "-5", volume: 60 },
  { seculo: "-4", volume: 20 },  { seculo: "1", volume: 95 }
];
```

```js
const mockupDeutero = {
  nodes: [
    { id: "Matatias", info: "Sacerdote (Linhagem Joarib)", group: "Macabeus" },
    { id: "Judas", info: "Judas Macabeu", group: "Macabeus" },
    { id: "Jonatas", info: "Jônatas", group: "Macabeus" },
    { id: "Simao", info: "Simão", group: "Macabeus" },
    { id: "Tobit", info: "O Pai (Exílio Nínive)", group: "Tobias" },
    { id: "Tobias Filho", info: "O Filho (Esposo de Sara)", group: "Tobias" },
    { id: "Sara", info: "Esposa de Tobias", group: "Tobias" }
  ],
  links: [
    { source: "Matatias", target: "Judas", type: "Pai-Filho" },
    { source: "Matatias", target: "Jonatas", type: "Pai-Filho" },
    { source: "Matatias", target: "Simao", type: "Pai-Filho" },
    { source: "Tobit", target: "Tobias Filho", type: "Pai-Filho" },
    { source: "Tobias Filho", target: "Sara", type: "Casamento" }
  ]
};
```

```js
const mockupTree = [
  "Adão/Sete", "Adão/Sete/Enos", "Adão/Sete/Enos/Cainã", "Adão/Sete/Enos/Cainã/Maalalel",
  "Adão/Sete/Enos/Cainã/Maalalel/Jarede", "Adão/Sete/Enos/Cainã/Maalalel/Jarede/Enoque",
  "Adão/Sete/Enos/Cainã/Maalalel/Jarede/Enoque/Matusalém",
  "Adão/Sete/Enos/Cainã/Maalalel/Jarede/Enoque/Matusalém/Lameque",
  "Adão/Sete/Enos/Cainã/Maalalel/Jarede/Enoque/Matusalém/Lameque/Noé",
  "Adão/Sete/Enos/Cainã/Maalalel/Jarede/Enoque/Matusalém/Lameque/Noé/Sem",
  "Adão/Sete/Enos/Cainã/Maalalel/Jarede/Enoque/Matusalém/Lameque/Noé/Cam",
  "Adão/Sete/Enos/Cainã/Maalalel/Jarede/Enoque/Matusalém/Lameque/Noé/Jafé"
].map(path => ({ path }));
```

```js
const mockupNetwork = {
  nodes: [
    { id: "Deus", grupo: "Divino", label: "Criador" },
    { id: "AdaoeEva", grupo: "Origens", label: "Adão e Eva" },
    { id: "Noe", grupo: "Origens", label: "Noé" },
    { id: "Abraao", grupo: "Patriarcas", label: "Abraão" },
    { id: "Isaac", grupo: "Patriarcas", label: "Isaac" },
    { id: "Jaco", grupo: "Patriarcas", label: "Jacó" },
    { id: "Juda", grupo: "Patriarcas", label: "Judá" },
    { id: "Moises", grupo: "Lideres", label: "Moisés" },
    { id: "BoazRute", grupo: "Realeza", label: "Boaz e Rute" },
    { id: "Davi", grupo: "Realeza", label: "Rei Davi" },
    { id: "Salomao", grupo: "Realeza", label: "Rei Salomão" },
    { id: "Tobit", grupo: "Deuterocanonico", label: "Tobias Pai" },
    { id: "Judite", grupo: "Deuterocanonico", label: "Judite" },
    { id: "Matatias", grupo: "Deuterocanonico", label: "Matatias" },
    { id: "JudasMacabeu", grupo: "Deuterocanonico", label: "Judas Macabeu" },
    { id: "JoaquimAna", grupo: "NovoTestamento", label: "Joaquim e Ana" },
    { id: "Maria", grupo: "NovoTestamento", label: "Virgem Maria" },
    { id: "Jose", grupo: "NovoTestamento", label: "São José" },
    { id: "Jesus", grupo: "Messias", label: "JESUS CRISTO" },
    { id: "Pedro", grupo: "NovoTestamento", label: "S. Pedro" }
  ],
  links: [
    { source: "Deus", target: "AdaoeEva" },
    { source: "AdaoeEva", target: "Noe" },
    { source: "Noe", target: "Abraao" },
    { source: "Abraao", target: "Isaac" },
    { source: "Isaac", target: "Jaco" },
    { source: "Jaco", target: "Juda" },
    { source: "Juda", target: "BoazRute" },
    { source: "BoazRute", target: "Davi" },
    { source: "Davi", target: "Salomao" },
    { source: "Davi", target: "JoaquimAna" },
    { source: "JoaquimAna", target: "Maria" },
    { source: "Maria", target: "Jesus" },
    { source: "Jose", target: "Jesus" },
    { source: "Jesus", target: "Pedro" },
    { source: "Matatias", target: "JudasMacabeu" }
  ]
};

const groupColors = {
  "Divino": "#f8fafc",
  "Origens": "#808080",
  "Patriarcas": "#1E90FF",
  "Lideres": "#ffffff",
  "Realeza": "#FFD700",
  "Deuterocanonico": "#8B4513",
  "NovoTestamento": "#FF69B4",
  "Messias": "#FF4500"
};

const mockupOutliers = [
  { id: "Matusalém", longevidade: 969, nlp_score: 0.2, tipo: "Neutro", bubble_size: 10 },
  { id: "Adão", longevidade: 930, nlp_score: -0.5, tipo: "Queda", bubble_size: 50 },
  { id: "Noé", longevidade: 950, nlp_score: 0.8, tipo: "Aliança", bubble_size: 45 },
  { id: "Enoque", longevidade: 365, nlp_score: 0.95, tipo: "Outlier Positivo", bubble_size: 25 },
  { id: "Abraão", longevidade: 175, nlp_score: 0.9, tipo: "Patriarca", bubble_size: 60 },
  { id: "José", longevidade: 110, nlp_score: 0.85, tipo: "Patriarca", bubble_size: 55 },
  { id: "Jesus", longevidade: 33, nlp_score: 1.0, tipo: "Outlier Máximo", bubble_size: 100 }
];

// --- LÓGICA DE FILTRAGEM REATIVA ---
const ANO_DILUVIO = 1656;
const eraFilterObj = Inputs.select(["Todas", "Pré-Diluviana", "Pós-Diluviana"], {label: "Filtrar Era:", value: "Todas"});
const eraSelecionada = Generators.input(eraFilterObj);
const eraFilterView = eraFilterObj;

const filteredPatriarchs = mockupPatriarchs.filter(d => {
  if (eraSelecionada === "Pré-Diluviana") return d.morte_ano <= ANO_DILUVIO;
  if (eraSelecionada === "Pós-Diluviana") return d.nascimento_ano >= ANO_DILUVIO;
  return true;
});

// --- MOTORES DE SIMULAÇÃO DE GRAFO ---
const simulationData = (() => {
  const nodes = mockupNetwork.nodes.map(d => ({...d}));
  const links = mockupNetwork.links.map(d => ({...d}));
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(400, 200))
      .stop();
  for (let i = 0; i < 300; ++i) simulation.tick();
  return {nodes, links};
})();

const deuteroSim = (() => {
  const nodes = mockupDeutero.nodes.map(d => ({...d}));
  const links = mockupDeutero.links.map(d => ({...d}));
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(400, 150))
      .stop();
  for (let i = 0; i < 300; ++i) simulation.tick();
  return {nodes, links};
})();
```

<div class="grid grid-cols-1 gap-6 px-1 mt-6">
  <!-- 5. Sazonalidade -->
  <div class="card-premium p-5 lg:col-span-12">
    <h2 class="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
      Produção Literária
      <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
    </h2>
    <div class="w-full h-48">
      ${resize((width) => Plot.plot({
        width, height: 180, marginLeft: 40,
        x: { label: null }, y: { label: null, ticks: 0 },
        marks: [
          Plot.areaY(mockupSazonalidade, { x: "seculo", y: "volume", fill: "url(#gradient)", curve: "natural", opacity: 0.5 }),
          Plot.lineY(mockupSazonalidade, { x: "seculo", y: "volume", stroke: "#38bdf8", strokeWidth: 2, curve: "natural" })
        ]
      }))}
    </div>
  </div>

  <!-- 6. Genealogia Tree -->
  <div class="card-premium p-5 lg:col-span-12">
    <h2 class="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mb-4">Genealogia Tree</h2>
    <div class="w-full h-48">
      ${resize((width) => Plot.plot({
        width, height: 180, axis: null,
        marks: [ Plot.tree(mockupTree, { path: "path", stroke: "#475569", fill: "#f8fafc", textLayout: "mirrored", markerScale: 0.4 }) ]
      }))}
    </div>
  </div>
</div>

<div class="grid grid-cols-1 gap-6 px-1 mt-10">
  <!-- 1. Volume & Sentimento por Testamento -->
  <div class="card-premium p-5 lg:col-span-12">
    <h2 class="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mb-4">Sentimento & Volume</h2>
    <div class="w-full h-40">
      ${resize((width) => Plot.plot({
        width, height: 160, marginLeft: 80, x: { label: null }, y: { label: null },
        color: { legend: false, domain: ["Positivo", "Neutro", "Negativo (Juízo)"], range: ["#4ade80", "#94a3b8", "#ef4444"] },
        marks: [ Plot.barX(mockupSentiment, { x: "valor", y: "testamento", fill: "sentimento", tip: true }) ]
      }))}
    </div>
  </div>

  <!-- 1.5 Linha do Tempo da Era Bíblica -->
  <div class="card-premium p-5 lg:col-span-12">
    <h2 class="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mb-4">Timeline Eras</h2>
    <div class="w-full h-40">
      ${resize((width) => Plot.plot({
        width, height: 160, marginLeft: 80, x: { label: null }, y: { label: null },
        marks: [ Plot.barX(mockupEras, { x1: "inicio", x2: "fim", y: "era", fill: "cor", rx: 4, tip: true }) ]
      }))}
    </div>
  </div>

  <!-- 2. Cronologia de Patriarcas -->
  <div class="card-premium p-5 lg:col-span-12">
    <h2 class="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mb-2">Patriarcas Reativos</h2>
    <div class="w-full h-40">
      ${resize((width) => Plot.plot({
        width, height: 140, marginLeft: 60, x: { label: null }, y: { label: null },
        marks: [ Plot.barX(filteredPatriarchs, { x1: "nascimento_ano", x2: "morte_ano", y: "id", fill: "#38bdf8", rx: 4, tip: true }) ]
      }))}
    </div>
  </div>

  <!-- 3. Tópicos LDA -->
  <div class="card-premium p-5 lg:col-span-12">
    <h2 class="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mb-4">Tópicos (IA)</h2>
    <div class="w-full h-40">
      ${resize((width) => Plot.plot({
        width, height: 160, marginLeft: 90, x: { label: null }, y: { label: null },
        marks: [ Plot.barX(mockupLDA, { x: "peso", y: "topico", fill: "peso", tip: true }) ]
      }))}
    </div>
  </div>

  <!-- 4. Duke Hyper-Analytics Lab (Bubble Chart) -->
  <div class="card-premium p-5 lg:col-span-12 mt-4">
    <h2 class="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mb-4 italic">Hyper-Analytics: Entropia vs Precisão Geográfica</h2>
    <div class="w-full h-[300px]">
      ${resize((width) => Plot.plot({
        width, height: 300, marginLeft: 60, marginBottom: 40,
        x: { label: "Precisão Geográfica →" }, y: { label: "Entropia Semântica ↑" },
        color: { domain: ["VT", "NT"], range: ["#38bdf8", "#818cf8"] },
        marks: [
          Plot.dot(mockupEntropy, { x: "precisaoGeo", y: "entropia", fill: "testamento", r: 8, tip: true }),
          Plot.text(mockupEntropy, { x: "precisaoGeo", y: "entropia", text: "livro", dy: -15, fill: "#f8fafc", fontSize: 13, fontWeight: "800" })
        ]
      }))}
    </div>
  </div>

  <!-- 8. Grafo Relacional -->
  <div class="card-premium px-6 py-8 bg-slate-900 lg:col-span-12">
    <h2 class="text-sm font-black text-slate-100 uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
      <span class="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
      Grafo Relacional Bíblico (Interconexões de Linhagem)
    </h2>
    <div class="w-full bg-slate-950/20 rounded-3xl overflow-hidden backdrop-blur-md">
      ${resize((width) => Plot.plot({
        width, height: 500, axis: null,
        marks: [
          Plot.link(simulationData.links, { x1: d => d.source.x, y1: d => d.source.y, x2: d => d.target.x, y2: d => d.target.y, stroke: "#334155", strokeWidth: 1 }),
          Plot.dot(simulationData.nodes, { x: "x", y: "y", r: 10, fill: "grupo", tip: true }),
          Plot.text(simulationData.nodes, { x: "x", y: "y", text: "label", fill: "#f8fafc", dy: -18, fontSize: 12, fontWeight: 500 })
        ]
      }))}
    </div>
  </div>

  <!-- 9. Detalhe Deuterocanônico -->
  <div class="card-premium border-l-4 border-l-orange-500 p-8 bg-slate-900 lg:col-span-12">
    <h2 class="text-xs font-black text-orange-400 uppercase tracking-widest mb-6">Ponte Católica: Matriz Deuterocanônica</h2>
    <div class="w-full bg-orange-950/5 rounded-2xl">
      ${resize((width) => Plot.plot({
        width, height: 300, axis: null,
        marks: [
          Plot.link(deuteroSim.links, { x1: d => d.source.x, y1: d => d.source.y, x2: d => d.target.x, y2: d => d.target.y, stroke: "#475569", strokeWidth: 2 }),
          Plot.dot(deuteroSim.nodes, { x: "x", y: "y", r: 15, fill: "group", tip: true }),
          Plot.text(deuteroSim.nodes, { x: "x", y: "y", text: "id", fill: "#f8fafc", dy: -25, fontSize: 14, fontWeight: "800" })
        ]
      }))}
    </div>
  </div>
</div>

<!-- 10. Mapeamento de Outliers -->
${html`
<div class="card-premium p-6 sm:p-10 bg-slate-900 mt-12 animate-reveal shadow-sky-500/5">
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
    <div class="space-y-2">
      <h2 class="text-xl font-black text-slate-100 uppercase tracking-[0.3em] flex items-center gap-4">
        <span class="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl shadow-inner italic">🎯</span>
        Mapeamento de Outliers Espirituais
      </h2>
      <p class="text-slate-500 text-sm font-medium">Cruzamento de Longevidade (Ano Mundi) vs. Influência e Sentimento Analítico.</p>
    </div>
    <div class="flex gap-2">
      <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[0.6rem] font-bold rounded-full border border-emerald-500/20 uppercase tracking-tighter">Benção</span>
      <span class="px-3 py-1 bg-red-500/10 text-red-400 text-[0.6rem] font-bold rounded-full border border-red-500/20 uppercase tracking-tighter">Juízo</span>
    </div>
  </div>

  <div class="w-full bg-slate-950/40 rounded-[2rem] overflow-hidden border border-slate-800 p-2 sm:p-6 backdrop-blur-xl">
    ${resize((width) => Plot.plot({
      width,
      height: 450,
      grid: true,
      x: { label: "Longevidade Historica (Anos) →", domain: [0, 1000] },
      y: { label: "↑ Impacto / Sentimento (NLP Score)", domain: [-0.8, 1.2], ticks: 5 },
      color: { 
        domain: ["Queda", "Neutro", "Aliança", "Outlier Positivo", "Patriarca", "Outlier Máximo"],
        range: ["#ef4444", "#94a3b8", "#10b981", "#34d399", "#38bdf8", "#f43f5e"]
      },
      marks: [
        Plot.rectY([0], {x1: 0, x2: 1000, y1: 0, y2: 1.2, fill: "#10b981", opacity: 0.03}),
        Plot.rectY([0], {x1: 0, x2: 1000, y1: -0.8, y2: 0, fill: "#ef4444", opacity: 0.03}),
        Plot.ruleY([0], {stroke: "#334155", strokeWidth: 1, strokeDasharray: "4,4"}),
        Plot.dot(mockupOutliers, {
          x: "longevidade",
          y: "nlp_score",
          r: (d) => d.bubble_size / 2,
          fill: "tipo",
          stroke: "#0f172a",
          strokeWidth: 3,
          tip: true,
          title: (d) => \`\${d.id}\\nLongevidade: \${d.longevidade} anos\\nScore NLP: \${d.nlp_score}\\nNatureza: \${d.tipo}\`
        }),
        Plot.text(mockupOutliers, {
          x: "longevidade",
          y: "nlp_score",
          text: "id",
          dy: (d) => -(d.bubble_size / 4 + 12),
          fill: "#f8fafc",
          fontSize: 13,
          fontWeight: "900",
          textShadow: "0 2px 4px rgba(0,0,0,0.8)"
        })
      ]
    }))}
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
    <div class="p-5 bg-slate-950/40 rounded-3xl border border-emerald-500/20 hover:bg-emerald-500/5 transition-all group">
      <h4 class="text-xs font-black text-emerald-400 uppercase mb-3 tracking-widest flex items-center justify-between">
        Intensidade Máxima
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      </h4>
      <p class="text-slate-400 text-[0.7rem] leading-relaxed font-medium">Baixa longevidade com impacto teológico eterno. <span class="text-emerald-300">Destaque: Jesus (33 anos).</span></p>
    </div>
    <div class="p-5 bg-slate-950/40 rounded-3xl border border-sky-500/20 hover:bg-sky-500/5 transition-all">
      <h4 class="text-xs font-black text-sky-400 uppercase mb-3 tracking-widest italic">Transição Patriarcal</h4>
      <p class="text-slate-400 text-[0.7rem] leading-relaxed font-medium">Equilíbrio entre vida biológica e aliança. <span class="text-sky-300">Destaque: Abraão (175 anos).</span></p>
    </div>
    <div class="p-5 bg-slate-950/40 rounded-3xl border border-slate-700/50 hover:bg-slate-800/50 transition-all">
      <h4 class="text-xs font-black text-slate-400 uppercase mb-3 tracking-widest">Estabilidade Prévia</h4>
      <p class="text-slate-400 text-[0.7rem] leading-relaxed font-medium">Grandes ciclos de vida alinhados à preservação da fé. <span class="text-slate-200">Destaque: Noé.</span></p>
    </div>
    <div class="p-5 bg-slate-950/40 rounded-3xl border border-red-500/20 hover:bg-red-500/5 transition-all">
      <h4 class="text-xs font-black text-red-500 uppercase mb-3 tracking-widest">Declínio / Queda</h4>
      <p class="text-slate-400 text-[0.7rem] leading-relaxed font-medium">Alta extensão biológica com score NLP negativo. <span class="text-red-300">Destaque: Adão.</span></p>
    </div>
  </div>
</div>
\`}

${html`<svg style="height: 0; width: 0; position: absolute;"><defs><linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#38bdf8"></stop><stop offset="100%" stop-color="#1e293b" stop-opacity="0"></stop></linearGradient></defs></svg>`}
< / d i v > 
 
 