---
title: BibleDS Hyper-Analytics
theme: [dark, slate]
toc: false
sidebar: false
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

  <div class="card-kpi border-l-4 border-l-sky-500">
    <div class="flex flex-col h-full justify-between">
      <div>
        <h2 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Integridade</h2>
        <div class="text-3xl font-black text-white italic">100%</div>
      </div>
      <p class="text-[0.6rem] text-slate-600 mt-2 uppercase font-bold tracking-tighter">Pipeline Validado</p>
    </div>
  </div>

  <div class="card-kpi border-l-4 border-l-sky-500">
    <div class="flex flex-col h-full justify-between">
      <div>
        <h2 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Engine</h2>
        <div class="text-2xl font-black text-white italic leading-tight">Static Set Filtering</div>
      </div>
      <p class="text-[0.6rem] text-slate-600 mt-2 uppercase font-bold tracking-tighter">O(1) Search Latency</p>
    </div>
  </div>

  <div class="card-kpi border-l-4 border-l-sky-500">
    <div class="flex flex-col h-full justify-between">
      <div>
        <h2 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Carga (NT)</h2>
        <div class="text-3xl font-black text-white italic">27 <span class="text-sm text-slate-500 font-normal">/ 73</span></div>
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
    ${resize((width) => Plot.plot({
      width,
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
        })
      ]
    }))}
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





<div class="grid grid-cols-1 gap-6 mt-12 animate-reveal">
  <div class="card-premium p-6 sm:p-10">
    <h2 class="text-lg font-bold text-slate-100 mb-6 flex items-center gap-3">
      <span class="w-2 h-6 bg-sky-500 rounded-full"></span>
      Volume Absoluto por Livro
    </h2>
    <div class="overflow-x-auto w-full custom-scrollbar pb-4">
      ${resize((width) => Plot.plot({
        width: Math.max(width || 1000, 1800),
        height: 380,
        marginLeft: 60,
        marginBottom: 90,
        x: { label: null, tickRotate: -45 },
        y: { label: "Palavras Totais" },
        color: { legend: true, domain: ["VT", "NT"], range: ["#bae6fd", "#38bdf8"] },
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
  </div>

  
  <div class="card-premium p-6 sm:p-10">
    <h2 class="text-lg font-bold text-slate-100 mb-6 flex items-center gap-3">
      <span class="w-2 h-6 bg-sky-500 rounded-full"></span>
      Índice de Densidade (Palavras/Versículo)
    </h2>
    <div class="overflow-x-auto w-full custom-scrollbar pb-4">
      ${resize((width) => Plot.plot({
        width: Math.max(width || 1000, 1800),
        height: 380,
        marginLeft: 40,
        marginBottom: 90,
        grid: true,
        x: { label: null, tickRotate: -45 },
        y: { label: "Palavras por Versículo" },
        color: { legend: true, domain: ["VT", "NT"], range: ["#bae6fd", "#38bdf8"] },
        marks: [
          Plot.dot(filteredBooks, {
            x: "nome",
            y: "wordsPerVerse",
            r: 6,
            fill: "testamento",
            fillOpacity: 0.8,
            stroke: "none",
            tip: { fill: "#0f172a", stroke: "#38bdf8" },
            title: (d) => `${d.nome} (${d.testamento})\n${d.wordsPerVerse} plv/versículo\nTotal de Versículos: ${d.totalVerses}`
          }),
          Plot.ruleY([0])
        ]
      }))}
    </div>
  </div>
</div>

${html`<svg style="height: 0; width: 0; position: absolute;"><defs><linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#38bdf8"></stop><stop offset="100%" stop-color="#1e293b" stop-opacity="0"></stop></linearGradient></defs></svg>`}
</div>
