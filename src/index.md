---
title: BibleDS Hyper-Analytics
theme: [dark, slate]
toc: false
sidebar: false
---

<div class="w-full">

<!-- PAGE HEADER -->
<header class="page-header animate-reveal">
  <h1>
    <span class="h1-bar"></span>
    BibleDS <span class="text-sky-400 italic">Hyper-Analytics</span>
  </h1>
  <p class="subtitle">Observable Framework • AI-Driven Semantic Engine v2.0</p>
</header>

```js
const processed = FileAttachment("data/processData.json").json();
```

```js
// KPIs dinâmicos calculados dos dados reais
const totalBooks   = processed.books.length;
const totalWords   = processed.summary?.totalWords ?? processed.books.reduce((s, b) => s + b.rawWords, 0);
const totalVerses  = processed.summary?.totalVerses ?? processed.books.reduce((s, b) => s + b.totalVerses, 0);
const avgDensity   = (processed.books.reduce((s, b) => s + b.density, 0) / totalBooks).toFixed(1);
const vtBooks      = processed.books.filter(b => b.testamento === "VT").length;
const ntBooks      = processed.books.filter(b => b.testamento === "NT").length;
const integridade  = processed.summary?.integridade ?? 100;
```

```js
const opcoesTestamento = ["Todos", "VT (Antigo Testamento)", "NT (Novo Testamento)"];
const testamentoInputView = Inputs.radio(opcoesTestamento, {value: "Todos", label: "Filtrar:"});
const testamentoSelecionado = Generators.input(testamentoInputView);
const testamentoInput = testamentoInputView;
```

```js
const filteredBooks = testamentoSelecionado === "Todos" 
  ? processed.books 
  : processed.books.filter(b => b.testamento === (testamentoSelecionado.includes("VT") ? "VT" : "NT"));
```

<!-- BI EXECUTIVE DASHBOARD KPIs -->
<div class="grid-kpi animate-reveal" style="margin-bottom:2rem;">
  <div class="card-kpi border-l-4 border-l-sky-400 animate-reveal">
    <div class="flex flex-col h-full justify-between">
      <div>
        <div class="kpi-label">Volume Total</div>
        <div class="kpi-value">${totalWords.toLocaleString("pt-BR")}</div>
      </div>
      <div class="kpi-sub">Palavras Processadas</div>
    </div>
  </div>

  <div class="card-kpi border-l-4 border-l-sky-400 animate-reveal">
    <div class="flex flex-col h-full justify-between">
      <div>
        <div class="kpi-label">Total de Versículos</div>
        <div class="kpi-value">${totalVerses.toLocaleString("pt-BR")}</div>
      </div>
      <div class="kpi-sub">Média: ${(totalWords / totalVerses).toFixed(1)} plv/versículo</div>
    </div>
  </div>

  <div class="card-kpi border-l-4 border-l-sky-400 animate-reveal">
    <div class="flex flex-col h-full justify-between">
      <div>
        <div class="kpi-label">Densidade Média</div>
        <div class="kpi-value">${avgDensity}<span style="font-size:1rem;color:#64748b;font-weight:500">%</span></div>
      </div>
      <div class="kpi-sub">Riqueza Lexical Global</div>
    </div>
  </div>

  <div class="card-kpi border-l-4 border-l-sky-400 animate-reveal">
    <div class="flex flex-col h-full justify-between">
      <div>
        <div class="kpi-label">Cobertura Canônica</div>
        <div class="kpi-value">${totalBooks} <span style="font-size:1rem;color:#64748b;font-weight:500">livros</span></div>
      </div>
      <div class="kpi-sub" style="display:flex;gap:.5rem;flex-wrap:wrap;">
        <span class="badge-vt">VT: ${vtBooks}</span>
        <span class="badge-nt">NT: ${ntBooks}</span>
      </div>
    </div>
  </div>
</div>

<!-- CHART 1: DENSIDADE LEXICAL -->
<div class="card-premium animate-reveal" style="padding:1.5rem 2rem;margin-bottom:1.5rem;">
  <h2 class="section-title">
    <span class="section-title-bar"></span>
    Densidade Lexical por Livro (Evolução Canônica)
  </h2>
  <div style="margin-bottom:1.25rem;" class="radio-container">
    ${testamentoInput}
  </div>
  <div class="w-full" style="height:380px;">
    ${resize((width) => Plot.plot({
      width,
      height: 340,
      marginLeft: 55,
      marginTop: 20,
      marginBottom: 30,
      grid: true,
      style: { background: "transparent", color: "white", fontSize: "13px" },
      x: { label: "Progressão Canônica (Livros) →", tickFormat: "" },
      y: { label: "Densidade Lexical (%)", domain: [0, 100] },
      marks: [
        Plot.areaY(filteredBooks, { x: (d, i) => i, y: "density", fill: "url(#grad-density)", curve: "natural", opacity: 0.25 }),
        Plot.lineY(filteredBooks, { 
          x: (d, i) => i, y: "density", 
          stroke: (d) => d.testamento === "VT" ? "#f59e0b" : "#38bdf8",
          strokeWidth: 2.5, curve: "natural",
          tip: { fill: "#0f172a", stroke: "#38bdf8", strokeWidth: 1 },
          title: (d) => `${d.nome} (${d.testamento})\nDensidade: ${d.density}%\nPalavras: ${d.rawWords.toLocaleString("pt-BR")}`
        })
      ]
    }))}
  </div>
</div>

<!-- CHARTS ROW 2 -->
<div class="grid-charts animate-reveal" style="margin-bottom:1.5rem;">
  <!-- Volume Absoluto -->
  <div class="card-premium" style="padding:1.5rem 2rem;">
    <h2 class="section-title">
      <span class="section-title-bar"></span>
      Volume Absoluto por Livro
    </h2>
    <div class="overflow-x-auto w-full custom-scrollbar" style="padding-bottom:0.75rem;">
      ${resize((width) => Plot.plot({
        width: Math.max(width || 800, 1600),
        height: 360,
        marginLeft: 50,
        marginBottom: 95,
        style: { background: "transparent", color: "white", fontSize: "12px" },
        x: { label: null, tickRotate: -45 },
        y: { label: "Palavras Totais" },
        color: { legend: true, domain: ["VT", "NT"], range: ["#f59e0b", "#38bdf8"] },
        marks: [
          Plot.barY(filteredBooks, { 
            x: "nome", y: "rawWords", fill: "testamento",
            tip: { fill: "#0f172a", stroke: "#38bdf8" },
            title: (d) => `${d.nome}\n${d.rawWords.toLocaleString("pt-BR")} palavras`
          }),
          Plot.ruleY([0])
        ]
      }))}
    </div>
  </div>

  <!-- Densidade por Versículo -->
  <div class="card-premium" style="padding:1.5rem 2rem;">
    <h2 class="section-title">
      <span class="section-title-bar"></span>
      Índice de Densidade (Palavras/Versículo)
    </h2>
    <div class="overflow-x-auto w-full custom-scrollbar" style="padding-bottom:0.75rem;">
      ${resize((width) => Plot.plot({
        width: Math.max(width || 800, 1600),
        height: 360,
        marginLeft: 45,
        marginBottom: 95,
        grid: true,
        style: { background: "transparent", color: "white", fontSize: "12px" },
        x: { label: null, tickRotate: -45 },
        y: { label: "Palavras por Versículo" },
        color: { legend: true, domain: ["VT", "NT"], range: ["#f59e0b", "#38bdf8"] },
        marks: [
          Plot.dot(filteredBooks, { 
            x: "nome", y: "wordsPerVerse", r: 6, fill: "testamento", fillOpacity: 0.85,
            stroke: "none",
            tip: { fill: "#0f172a", stroke: "#38bdf8" },
            title: (d) => `${d.nome} (${d.testamento})\n${d.wordsPerVerse} plv/versículo\nTotal: ${d.totalVerses} versículos`
          }),
          Plot.ruleY([0])
        ]
      }))}
    </div>
  </div>
</div>

${html`<svg style="height:0;width:0;position:absolute;"><defs>
  <linearGradient id="grad-density" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0%" stop-color="#38bdf8"/>
    <stop offset="100%" stop-color="#1e293b" stop-opacity="0"/>
  </linearGradient>
</defs></svg>`}

</div>
