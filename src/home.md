---
title: Estudos Bíblicos
theme: [dark, slate]
toc: false
sidebar: false
---

<div class="px-4 py-8">
  <header class="mb-12 animate-reveal">
    <h1 class="text-4xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
      <span class="w-2 h-10 bg-sky-500 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)]"></span>
      Estudos <span class="text-sky-500 italic">Canônico</span>
    </h1>
    <p class="text-slate-400 font-medium tracking-widest uppercase text-xs opacity-60">Matriz de Navegação Bíblica • Filtros Inteligentes</p>
  </header>

```js
const books = FileAttachment("data/booksIndex.json").json();

// Simulação de Camada Semântica (Dicionário de Conceitos)
const semanticThemes = {
  "inicio": ["genesis", "joao"],
  "amor": ["i-corintios", "i-sao-joao", "cantico-dos-canticos"],
  "lei": ["exodo", "levitico", "numeros", "deuteronomio"],
  "sabedoria": ["proverbios", "eclesiastes", "sabedoria", "jo"],
  "profecia": ["isaias", "jeremias", "ezequiel", "apocalipse"],
  "fe": ["hebreus", "romanos", "galatas"],
  "sofrimento": ["jo", "lamentacoes", "i-sao-pedro"]
};
```

<div class="card-premium p-6 flex flex-col gap-6 mb-12 animate-reveal">
  <div class="flex flex-col sm:flex-row gap-6">
    <div class="flex-1">
      <label class="text-[0.6rem] font-black text-slate-500 uppercase tracking-widest mb-2 block italic">Motor de Busca Híbrido (Texto + Semântica)</label>
      <div class="search-container">${searchInputView}</div>
    </div>
    <div class="flex-1">
      <label class="text-[0.6rem] font-black text-slate-500 uppercase tracking-widest mb-2 block">Filtrar Testamento</label>
      <div class="radio-container text-xs">${testamentoInputView}</div>
    </div>
  </div>
  
  <div class="pt-4 border-t border-slate-800">
    <p class="text-[0.6rem] font-bold text-slate-600 uppercase mb-3 tracking-tighter">Sugestões Semânticas 🔥</p>
    <div class="flex flex-wrap gap-2">
      ${Object.keys(semanticThemes).map(t => html`
        <button onclick=${() => {
          const input = document.querySelector('.search-container input');
          if (input) {
            input.value = t;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }} class="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[0.6rem] text-slate-400 font-black uppercase tracking-widest hover:border-sky-500 hover:text-sky-400 transition-all cursor-pointer">
          #${t}
        </button>
      `)}
    </div>
  </div>
</div>

```js
const booksGrid = html`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
  ${filteredBooks.map(b => {
    // Check if it was a semantic match
    const query = searchInputValue.toLowerCase();
    const isSemanticMatch = query && semanticThemes[query] && semanticThemes[query].includes(b.id);
    
    return html`
      <a href=${`/reader?book=${b.id}`} class="group block no-underline animate-slide-up">
        <div class="card-premium p-6 hover:scale-105 hover:border-sky-500/50 group-hover:bg-slate-800/80 relative overflow-hidden h-full flex flex-col justify-between">
          ${isSemanticMatch ? html`<div class="absolute top-0 right-0 px-3 py-1 bg-sky-500 text-[0.5rem] font-black text-white uppercase tracking-widest rounded-bl-lg shadow-lg animate-pulse">Match Semântico</div>` : ""}
          
          <div>
            <div class="flex justify-between items-start mb-4">
              <span class="px-2 py-1 bg-slate-950 text-[0.6rem] font-black text-slate-500 rounded-md border border-slate-800 group-hover:border-sky-500/30 group-hover:text-sky-400 transition-colors uppercase">${b.testamento}</span>
              <span class="text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 leading-tight group-hover:text-sky-300 transition-colors">${b.nome}</h3>
          </div>
          <p class="text-[0.6rem] text-slate-600 font-bold uppercase tracking-tighter mt-4">Analisar Semântica &rarr;</p>
        </div>
      </a>
    `;
  })}
</div>`;
```

${booksGrid}

```js
const searchInputObj = Inputs.text({placeholder: "Pesquisar por nome, tema (#amor, #lei) ou conceito..."});
const searchInputValue = Generators.input(searchInputObj);
const searchInputView = searchInputObj;
```

```js
const opcoesTestamento = ["Todos", "VT (Antigo)", "NT (Novo)"];
const testamentoInputObj = Inputs.radio(opcoesTestamento, {value: "Todos", label: "Testamento:"});
const testamentoSelecionado = Generators.input(testamentoInputObj);
const testamentoInputView = testamentoInputObj;
```

```js
const filteredBooks = books.filter(b => {
  // 1. Filtro de Busca (Texto + Semântica)
  const query = searchInputValue.toLowerCase();
  const textMatch = b.nome.toLowerCase().includes(query) || b.id.includes(query);
  const semanticMatch = semanticThemes[query] && semanticThemes[query].includes(b.id);
  
  if (query && !textMatch && !semanticMatch) return false;

  // 2. Filtro de Testamento
  if (testamentoSelecionado === "Todos") return true;
  const isVT = testamentoSelecionado.includes("VT");
  return b.testamento === (isVT ? "VT" : "NT");
});
```

</div>
