---
title: Laboratório de IA & Visualizações Avançadas
theme: [dark, slate]
toc: false
sidebar: false
---

```js
// ── BLOCO 1: Estado, Input e Lógica da IA ────────────────────────────────────
// Campo para inserir a chave em tempo de execução (não fica salva no repositório público)
const apiKeyInput = Inputs.password({
  label: "🔑 Google Gemini API Key",
  placeholder: "Cole sua chave (AIzaSy...) aqui",
});

// Input widget de pergunta
const aiInput = Inputs.text({
  placeholder: "Pergunte algo (ex: Quem é Jesus?, Livros com mais capítulos...)",
});

// Estado mutável
const aiState = Mutable({ loading: false, response: null });

// Função que chama Gemini
async function callGemini(query) {
  if (!query || query.trim().length < 3) return;
  aiState.value = { loading: true, response: null };

  const API_KEY = apiKeyInput.value?.trim();
  if (!API_KEY) {
    aiState.value = { loading: false, response: { text: "⚠️ Chave de API não informada! Por favor, insira a sua API Key do Google Gemini no campo próprio acima." } };
    return;
  }

  try {
    const prompt = `Você é um assistente analítico especializado na Bíblia e Ciência de Dados.
Responda em PORTUGUÊS de forma concisa e clara.
Se a pergunta sugerir dados comparativos (frequência, distribuição, ranking), inclua ao final um bloco JSON neste formato exato:
---JSON---
{"type":"chart","chartType":"bar","title":"Titulo","data":[{"label":"Nome","value":42}]}
---
Pergunta: ${query}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    
    const json = await res.json();
    
    if (!res.ok) {
        throw new Error(json.error?.message || "Erro desconhecido da API");
    }

    const raw = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sem resposta da IA.";
    let text = raw;
    let chart = null;

    // Busca qualquer coisa entre ---JSON--- e --- ou até o fim da string
    const m = raw.match(/---JSON---([\s\S]*?)(?:---|$)/);
    if (m) {
      try { 
        // Pega o conteúdo, mas garante que tá pegando só o JSON válido (de { até })
        let jsonStr = m[1].trim();
        const startIdx = jsonStr.indexOf('{');
        const endIdx = jsonStr.lastIndexOf('}');
        if (startIdx !== -1 && endIdx !== -1) {
            jsonStr = jsonStr.substring(startIdx, endIdx + 1);
            chart = JSON.parse(jsonStr); 
        }
        text = raw.replace(/---JSON---[\s\S]*$/, "").trim(); // Remove do texto a parte do JSON pra baixo
      } catch (err) {
        console.error("Erro ao parsear JSON:", err);
      }
    }
    aiState.value = { loading: false, response: { text, chart } };
  } catch (e) {
    aiState.value = { loading: false, response: { text: `Erro ao consultar a IA: ${e.message}` } };
  }
}

// Ouve Enter no input
const enterQuery = Generators.observe((notify) => {
  const input = aiInput.querySelector("input");
  const handler = (e) => { if (e.key === "Enter") notify(input.value); };
  if (input) input.addEventListener("keydown", handler);
  return () => { if (input) input.removeEventListener("keydown", handler); };
});
```

```js
// ── BLOCO 2 (Reativo): dispara callGemini quando Enter é pressionado ─────────
callGemini(enterQuery);
```

```js
// ── BLOCO 3: Leituras de estado e componentes de visualização ────────────────
const aiLoading = aiState.loading;
const aiResponse = aiState.response;

function renderAIChart(cfg) {
  return resize((width) =>
    Plot.plot({
      width, height: 260, title: cfg.title,
      x: { label: null, tickRotate: cfg.data.length > 6 ? -40 : 0 },
      y: { grid: true },
      marks: [
        cfg.chartType === "bar"
          ? Plot.barY(cfg.data, { x: "label", y: "value", fill: "#38bdf8", rx: 4, tip: true })
          : Plot.dot(cfg.data, { x: "label", y: "value", fill: "#38bdf8", r: 6, tip: true })
      ]
    })
  );
}

// ── Datasets dos gráficos existentes ─────────────────────────────────────────
const mockupCorrelation = [
  { x: "Volume", y: "Volume", value: 1.0 }, { x: "Volume", y: "Densidade", value: 0.65 }, { x: "Volume", y: "Sentimento", value: -0.12 },
  { x: "Densidade", y: "Volume", value: 0.65 }, { x: "Densidade", y: "Densidade", value: 1.0 }, { x: "Densidade", y: "Sentimento", value: 0.05 },
  { x: "Sentimento", y: "Volume", value: -0.12 }, { x: "Sentimento", y: "Densidade", value: 0.05 }, { x: "Sentimento", y: "Sentimento", value: 1.0 }
];
const distributionData = [
  ...Array.from({length: 40}, () => ({ testamento: "VT", valor: 25 + Math.random() * 15 })),
  ...Array.from({length: 27}, () => ({ testamento: "NT", valor: 18 + Math.random() * 10 }))
];
const mockupEras = [
  { era: "Pré-História Bíblica", inicio: -4000, fim: -2000, cor: "#0c4a6e" },
  { era: "Patriarcas", inicio: -2000, fim: -1500, cor: "#075985" },
  { era: "Êxodo e Conquista", inicio: -1500, fim: -1050, cor: "#0369a1" },
  { era: "Monarquia Unida", inicio: -1050, fim: -930, cor: "#0284c7" },
  { era: "Reinos Divididos", inicio: -930, fim: -586, cor: "#0ea5e9" },
  { era: "Exílio Babilônico", inicio: -586, fim: -538, cor: "#38bdf8" },
  { era: "Retorno (Período Persa)", inicio: -538, fim: -332, cor: "#7dd3fc" },
  { era: "Período Helenístico", inicio: -332, fim: -63, cor: "#bae6fd" },
  { era: "Império Romano (NT)", inicio: -63, fim: 100, cor: "#f0f9ff" }
];
const mockupLDA = [
  { topico: "Aliança e Promessa", peso: 0.85 },
  { topico: "Lei e Julgamento", peso: 0.62 },
  { topico: "Redenção e Graça", peso: 0.91 },
  { topico: "Sabedoria e Conduta", peso: 0.54 },
  { topico: "Escatologia", peso: 0.43 }
];
const mockupOutliers = [
  { id: "Matusalém", longevidade: 969, nlp_score: 0.2, tipo: "Neutro", bubble_size: 10 },
  { id: "Adão", longevidade: 930, nlp_score: -0.5, tipo: "Queda", bubble_size: 50 },
  { id: "Noé", longevidade: 950, nlp_score: 0.8, tipo: "Aliança", bubble_size: 45 },
  { id: "Enoque", longevidade: 365, nlp_score: 0.95, tipo: "Sem. Bayesian", bubble_size: 25 },
  { id: "Abraão", longevidade: 175, nlp_score: 0.9, tipo: "Patriarca", bubble_size: 60 },
  { id: "José", longevidade: 110, nlp_score: 0.85, tipo: "Patriarca", bubble_size: 55 },
  { id: "Jesus", longevidade: 33, nlp_score: 1.0, tipo: "XGBoost Max", bubble_size: 100 }
];
const mockupNetwork = {
  nodes: [
    { id: "Deus", grupo: "Divino", label: "Criador" }, { id: "AdaoeEva", grupo: "Origens", label: "Adão e Eva" },
    { id: "Noe", grupo: "Origens", label: "Noé" }, { id: "Abraao", grupo: "Patriarcas", label: "Abraão" },
    { id: "Isaac", grupo: "Patriarcas", label: "Isaac" }, { id: "Jaco", grupo: "Patriarcas", label: "Jacó" },
    { id: "Juda", grupo: "Patriarcas", label: "Judá" }, { id: "Davi", grupo: "Realeza", label: "Rei Davi" },
    { id: "JoaquimAna", grupo: "NovoTestamento", label: "Joaquim e Ana" }, { id: "Maria", grupo: "NovoTestamento", label: "Virgem Maria" },
    { id: "Jesus", grupo: "Messias", label: "JESUS CRISTO" }, { id: "Pedro", grupo: "NovoTestamento", label: "S. Pedro" }
  ],
  links: [
    { source: "Deus", target: "AdaoeEva" }, { source: "AdaoeEva", target: "Noe" }, { source: "Noe", target: "Abraao" },
    { source: "Abraao", target: "Isaac" }, { source: "Isaac", target: "Jaco" }, { source: "Jaco", target: "Juda" },
    { source: "Juda", target: "Davi" }, { source: "Davi", target: "JoaquimAna" }, { source: "JoaquimAna", target: "Maria" },
    { source: "Maria", target: "Jesus" }, { source: "Jesus", target: "Pedro" }
  ]
};

// ── Views dos gráficos ────────────────────────────────────────────────────────
const booksSentimentDB = await FileAttachment("data/books_sentiment.json").json();
const booksIndexDB = await FileAttachment("data/booksIndex.json").json();
const calculatedSentiment = (() => {
  const vt = Object.entries(booksSentimentDB).filter(([id]) => booksIndexDB.find(b => b.id === id)?.testamento === "VT");
  const nt = Object.entries(booksSentimentDB).filter(([id]) => booksIndexDB.find(b => b.id === id)?.testamento === "NT");
  return [
    { testamento: "Velho Testamento", valor: d3.mean(vt, d => d[1]) },
    { testamento: "Novo Testamento", valor: d3.mean(nt, d => d[1]) }
  ];
})();

const heatmapView = resize((width) => Plot.plot({
  width, height: 300, padding: 0.05, x: { label: null }, y: { label: null },
  color: { type: "linear", range: ["#0f172a", "#38bdf8"] },
  marks: [
    Plot.cell(mockupCorrelation, { x: "x", y: "y", fill: "value" }),
    Plot.text(mockupCorrelation, { x: "x", y: "y", text: d => d.value.toFixed(2), fill: d => d.value > 0.5 ? "black" : "white" })
  ]
}));

const boxplotView = resize((width) => Plot.plot({
  width, height: 300,
  x: { label: "Palavras/Versículo", grid: true },
  marks: [ Plot.boxX(distributionData, { x: "valor", y: "testamento", fill: "#1e293b", stroke: "#38bdf8" }) ]
}));

const sentimentVolumeView = resize((width) => Plot.plot({
  width, height: 160, marginLeft: 120, x: { grid: true },
  marks: [
    Plot.barX(calculatedSentiment, { x: "valor", y: "testamento", fill: "valor", tip: true }),
    Plot.text(calculatedSentiment, { x: "valor", y: "testamento", text: d => `${d.valor?.toFixed(1)}%`, dx: 15, fill: "white", fontWeight: "bold" })
  ]
}));

const timelineErasView = resize((width) => Plot.plot({
  width, height: 350, marginLeft: 140,
  marks: [ Plot.barX(mockupEras, { x1: "inicio", x2: "fim", y: "era", fill: "cor", rx: 4, tip: true }) ]
}));

const topicosIAView = resize((width) => Plot.plot({
  width, height: 250, marginLeft: 130,
  marks: [ Plot.barX(mockupLDA, { x: "peso", y: "topico", fill: "peso", tip: true }) ]
}));

const outliersView = resize((width) => Plot.plot({
  width, height: 450, grid: true,
  x: { label: "Longevidade (Anos) →", domain: [0, 1000] },
  y: { label: "↑ Impacto Semântico (NLP)", domain: [-0.8, 1.2] },
  color: { domain: ["Queda","Neutro","Aliança","Sem. Bayesian","Patriarca","XGBoost Max"], range: ["#0c4a6e","#0284c7","#0ea5e9","#7dd3fc","#bae6fd","#ffffff"] },
  marks: [
    Plot.ruleY([0], { stroke: "#334155", strokeDasharray: "4,4" }),
    Plot.linearRegressionY(mockupOutliers, { x: "longevidade", y: "nlp_score", stroke: "#38bdf8", strokeWidth: 2, strokeDasharray: "5,5" }),
    Plot.dot(mockupOutliers, { x: "longevidade", y: "nlp_score", r: d => d.bubble_size / 2, fill: "tipo", stroke: "#0f172a", strokeWidth: 3, tip: true }),
    Plot.text(mockupOutliers, { x: "longevidade", y: "nlp_score", text: "id", dy: d => -(d.bubble_size/4 + 12), fill: "#f8fafc", fontSize: 13, fontWeight: "900" })
  ]
}));

const relacionalView = resize((width) => {
  const nodes = mockupNetwork.nodes.map(d => ({...d}));
  const links = mockupNetwork.links.map(d => ({...d}));
  const sim = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(80))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, 250)).stop();
  for (let i = 0; i < 300; ++i) sim.tick();
  return Plot.plot({ width, height: 500, axis: null, inset: 60, marks: [
    Plot.link(links, { x1: d => d.source.x, y1: d => d.source.y, x2: d => d.target.x, y2: d => d.target.y, stroke: "#334155" }),
    Plot.dot(nodes, { x: "x", y: "y", r: 12, fill: "grupo", tip: true }),
    Plot.text(nodes, { x: "x", y: "y", text: "label", fill: "#f8fafc", dy: -20, fontSize: 12, fontWeight: 700 })
  ]});
});
```

<div class="w-full">

<header class="mb-12 animate-reveal">
  <h1 class="text-4xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
    <span class="w-3 h-10 bg-sky-500 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)]"></span>
    Laboratório de IA & <span class="text-sky-500 italic">Visualizações</span>
  </h1>
  <p class="text-slate-400 font-medium tracking-widest uppercase text-xs opacity-60">Análises Preditivas • Modelagem de Tópicos • Grafos Relacionais</p>
</header>

<!-- ASSISTENTE IA PREMIUM -->
<div class="card-premium p-8 mb-12 animate-reveal shadow-[0_0_50px_rgba(56,189,248,0.1)] relative overflow-hidden group">
  <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-15 transition-opacity">
    <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" class="text-sky-500"><path d="M12 2a10 10 0 1 0 10 10H12V2Z"/><path d="M12 12L2.1 14.9a10 10 0 0 0 9.9 7.1V12Z"/><path d="m12 12 7.9-7.9a10 10 0 0 0-7.9-2.1V12Z"/></svg>
  </div>
  <div class="relative z-10">
    <h2 class="text-xl font-black text-white mb-6 flex items-center gap-3">
      <span class="relative flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
      Assistente Analítico <span class="text-sky-500 italic">IA</span>
    </h2>
    <div class="flex flex-col gap-4">
      <div class="relative max-w-md w-full mb-1">
        ${apiKeyInput}
      </div>
      <div class="relative">
        ${aiInput}
        <div class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          ${aiLoading ? html`<div class="animate-spin h-4 w-4 border-2 border-sky-500 border-t-transparent rounded-full"></div>` : ""}
          <span class="text-[0.6rem] font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">Enter para enviar</span>
        </div>
      </div>
      ${aiResponse ? html`
        <div class="animate-reveal p-6 bg-slate-950/60 rounded-2xl border border-slate-800/60 backdrop-blur-xl">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400 mt-1">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="flex-grow">
              <p class="text-slate-200 leading-relaxed text-base mb-4 whitespace-pre-wrap">${aiResponse.text}</p>
              ${aiResponse.chart ? html`
                <div class="mt-6 pt-6 border-t border-slate-800/50">
                  <div class="text-[0.6rem] font-black text-sky-600 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                    Visualização Gerada por IA
                  </div>
                  <div class="w-full bg-slate-900/40 rounded-xl p-4 overflow-hidden">
                    ${renderAIChart(aiResponse.chart)}
                  </div>
                </div>` : ""}
            </div>
          </div>
        </div>` : ""}
    </div>
  </div>
</div>

<!-- 1. ANÁLISE EXPLORATÓRIA -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
  <div class="card-premium p-6 sm:p-8">
    <h2 class="text-sm font-black text-slate-300 mb-1 flex items-center gap-2"><span class="w-2 h-5 bg-sky-500 rounded-full"></span>Matriz de Correlação</h2>
    <p class="text-slate-500 text-xs mb-4 uppercase tracking-widest italic">Interação entre variáveis críticas</p>
    <div class="w-full">${heatmapView}</div>
  </div>
  <div class="card-premium p-6 sm:p-8">
    <h2 class="text-sm font-black text-slate-300 mb-1 flex items-center gap-2"><span class="w-2 h-5 bg-sky-500 rounded-full"></span>Distribuição (Boxplot)</h2>
    <p class="text-slate-500 text-xs mb-4 uppercase tracking-widest italic">Outliers e quartis: palavras por versículo</p>
    <div class="w-full">${boxplotView}</div>
  </div>
</div>

<!-- 2. TÓPICOS & SENTIMENTO -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  <div class="card-premium p-6 sm:p-8">
    <h2 class="text-sm font-black text-slate-300 mb-1 flex items-center gap-2"><span class="w-2 h-5 bg-sky-500 rounded-full"></span>Modelagem de Tópicos (LDA)</h2>
    <div class="w-full">${topicosIAView}</div>
  </div>
  <div class="card-premium p-6 sm:p-8">
    <h2 class="text-sm font-black text-slate-300 mb-1 flex items-center gap-2"><span class="w-2 h-5 bg-sky-500 rounded-full"></span>Análise de Sentimento (NLP)</h2>
    <div class="w-full">${sentimentVolumeView}</div>
  </div>
</div>

<!-- 3. TIMELINE ERAS -->
<div class="card-premium p-6 sm:p-8 mt-6">
  <h2 class="text-sm font-black text-slate-300 mb-1 flex items-center gap-2"><span class="w-2 h-5 bg-sky-500 rounded-full"></span>Escalonamento Temporal das Eras Bíblicas</h2>
  <div class="w-full">${timelineErasView}</div>
</div>

<!-- 4. GRAFO RELACIONAL -->
<div class="card-premium p-6 sm:p-8 bg-slate-900 mt-6">
  <h2 class="text-sm font-black text-slate-300 mb-1 flex items-center gap-2"><span class="w-2 h-5 bg-sky-500 rounded-full"></span>Grafos Relacionais — Linhagem Mesiânica</h2>
  <div class="w-full bg-slate-950/20 rounded-3xl overflow-hidden">${relacionalView}</div>
</div>

<!-- 5. OUTLIERS ESPIRITUAIS -->
<div class="card-premium p-6 sm:p-8 bg-slate-900 mt-6 mb-12">
  <h2 class="text-sm font-black text-slate-300 mb-1 flex items-center gap-2"><span class="w-2 h-5 bg-sky-500 rounded-full"></span>Mapeamento de Outliers Espirituais</h2>
  <p class="text-slate-500 text-xs mb-6 uppercase tracking-widest italic">Longevidade vs. Impacto e Sentimento Analítico</p>
  <div class="w-full bg-slate-950/40 rounded-[2rem] p-4 border border-slate-800">${outliersView}</div>
</div>

</div>
