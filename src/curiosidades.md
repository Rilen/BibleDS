---
title: Curiosidades Bíblicas
theme: [dark, slate]
toc: false
sidebar: false
---

<div class="px-2 py-4">
  <header class="mb-12 animate-reveal">
    <h1 class="text-4xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
      <span class="w-1.5 h-10 bg-sky-500 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)]"></span>
      Dicionário <span class="text-sky-500 italic">Curiosidades</span>
    </h1>
    <p class="text-slate-400 font-medium tracking-widest uppercase text-xs opacity-60">Glossário A-Z • Personagens Históricos</p>
  </header>

```js
const curiosidadesList = await FileAttachment("data/characters.json").json();
const booksIndex = await FileAttachment("data/booksIndex.json").json();
const alphabets = [...new Set(curiosidadesList.map(c => c.letra))].sort();
// Recupera parametro de busca da URL
const urlSearch = new URLSearchParams(window.location.search).get("search");
const initialLetter = urlSearch ? urlSearch[0].toUpperCase() : "Todos";

const letterInputObj = Inputs.radio(["Todos", ...alphabets], {label: "Filtrar por Letra", value: initialLetter});
const selectedLetter = Generators.input(letterInputObj);
const letterInputView = letterInputObj;

function linkRef(text) {
  // Regex para capturar (Livro 1:1) ou (Livro 1)
  return text.replace(/\(([^0-9]+)\s+([0-9:]+)\)/g, (match, bookName, pos) => {
    const book = booksIndex.find(b => b.nome.toLowerCase() === bookName.trim().toLowerCase());
    if (book) {
      const chapter = pos.split(':')[0];
      return html`<a href="/reader?book=${book.id}&chapter=${chapter}" class="text-sky-500 font-bold hover:underline">(${bookName} ${pos})</a>`;
    }
    return match;
  });
}
```

<div class="card-premium p-6 sm:p-10 mb-12 shadow-2xl backdrop-blur-md">
  <div class="mb-8 p-4 bg-black/40 border border-slate-800 rounded-xl overflow-x-auto text-sm radio-container">
    ${letterInputView}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    ${curiosidadesList.filter(c => selectedLetter === "Todos" || c.letra === selectedLetter).map(c => html`
      <div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-sky-500/50 transition-all group animate-slide-up">
        <h3 class="text-xl font-black text-white mb-2 group-hover:text-sky-400 transition-colors flex items-center gap-3">
            <span class="w-6 h-6 flex items-center justify-center bg-slate-950 border border-slate-700 rounded text-[0.6rem] text-slate-500 font-black">${c.letra}</span> 
            ${c.nome}
        </h3>
        <p class="text-sm text-slate-400 leading-relaxed font-medium">${linkRef(c.desc)}</p>
      </div>
    `)}
  </div>
</div>
</div>
