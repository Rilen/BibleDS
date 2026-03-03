---
title: Leitor e Análise Semântica
theme: [dark, slate]
toc: false
sidebar: false
---

<div class="w-full">
  <header class="mb-12 animate-reveal">
    <h1 class="text-4xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
      <span class="w-3 h-10 bg-sky-500 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)]"></span>
      Leitor <span class="text-sky-500 italic">Semântico</span>
    </h1>
    <p class="text-slate-400 font-medium tracking-widest uppercase text-xs opacity-60">Engine de NLP Ativa • Mineração de Dados</p>
  </header>

<div class="mb-4 animate-reveal">
  <a href="/home" class="text-sky-400 no-underline font-black text-[0.6rem] uppercase tracking-widest hover:text-white transition-colors">&larr; Voltar para o Índice Canônico</a>
</div>

```js
// Pegando parâmetros da URL (ex: ?book=genesis&chapter=1)
const params = new URLSearchParams(window.location.search);
const initialBook = params.get("book") || "genesis";
const initialChapter = parseInt(params.get("chapter")) || 1;
```

```js
function loadBookData(bookId) {
  switch (bookId) {
    case "abdias": return FileAttachment("data/books/abdias.json").json();
    case "ageu": return FileAttachment("data/books/ageu.json").json();
    case "amos": return FileAttachment("data/books/amos.json").json();
    case "apocalipse": return FileAttachment("data/books/apocalipse.json").json();
    case "atos-dos-apostolos": return FileAttachment("data/books/atos-dos-apostolos.json").json();
    case "baruc": return FileAttachment("data/books/baruc.json").json();
    case "cantico-dos-canticos": return FileAttachment("data/books/cantico-dos-canticos.json").json();
    case "colossenses": return FileAttachment("data/books/colossenses.json").json();
    case "daniel": return FileAttachment("data/books/daniel.json").json();
    case "deuteronomio": return FileAttachment("data/books/deuteronomio.json").json();
    case "eclesiastes": return FileAttachment("data/books/eclesiastes.json").json();
    case "eclesiastico": return FileAttachment("data/books/eclesiastico.json").json();
    case "efesios": return FileAttachment("data/books/efesios.json").json();
    case "esdras": return FileAttachment("data/books/esdras.json").json();
    case "ester": return FileAttachment("data/books/ester.json").json();
    case "exodo": return FileAttachment("data/books/exodo.json").json();
    case "ezequiel": return FileAttachment("data/books/ezequiel.json").json();
    case "filemon": return FileAttachment("data/books/filemon.json").json();
    case "filipenses": return FileAttachment("data/books/filipenses.json").json();
    case "galatas": return FileAttachment("data/books/galatas.json").json();
    case "genesis": return FileAttachment("data/books/genesis.json").json();
    case "habacuc": return FileAttachment("data/books/habacuc.json").json();
    case "hebreus": return FileAttachment("data/books/hebreus.json").json();
    case "i-corintios": return FileAttachment("data/books/i-corintios.json").json();
    case "i-cronicas": return FileAttachment("data/books/i-cronicas.json").json();
    case "i-macabeus": return FileAttachment("data/books/i-macabeus.json").json();
    case "i-reis": return FileAttachment("data/books/i-reis.json").json();
    case "i-samuel": return FileAttachment("data/books/i-samuel.json").json();
    case "i-sao-joao": return FileAttachment("data/books/i-sao-joao.json").json();
    case "i-sao-pedro": return FileAttachment("data/books/i-sao-pedro.json").json();
    case "i-tessalonicenses": return FileAttachment("data/books/i-tessalonicenses.json").json();
    case "i-timoteo": return FileAttachment("data/books/i-timoteo.json").json();
    case "ii-corintios": return FileAttachment("data/books/ii-corintios.json").json();
    case "ii-cronicas": return FileAttachment("data/books/ii-cronicas.json").json();
    case "ii-macabeus": return FileAttachment("data/books/ii-macabeus.json").json();
    case "ii-reis": return FileAttachment("data/books/ii-reis.json").json();
    case "ii-samuel": return FileAttachment("data/books/ii-samuel.json").json();
    case "ii-sao-joao": return FileAttachment("data/books/ii-sao-joao.json").json();
    case "ii-sao-pedro": return FileAttachment("data/books/ii-sao-pedro.json").json();
    case "ii-tessalonicenses": return FileAttachment("data/books/ii-tessalonicenses.json").json();
    case "ii-timoteo": return FileAttachment("data/books/ii-timoteo.json").json();
    case "iii-sao-joao": return FileAttachment("data/books/iii-sao-joao.json").json();
    case "isaias": return FileAttachment("data/books/isaias.json").json();
    case "jeremias": return FileAttachment("data/books/jeremias.json").json();
    case "jo": return FileAttachment("data/books/jo.json").json();
    case "joel": return FileAttachment("data/books/joel.json").json();
    case "jonas": return FileAttachment("data/books/jonas.json").json();
    case "josue": return FileAttachment("data/books/josue.json").json();
    case "judite": return FileAttachment("data/books/judite.json").json();
    case "juizes": return FileAttachment("data/books/juizes.json").json();
    case "lamentacoes": return FileAttachment("data/books/lamentacoes.json").json();
    case "levitico": return FileAttachment("data/books/levitico.json").json();
    case "malaquias": return FileAttachment("data/books/malaquias.json").json();
    case "miqueias": return FileAttachment("data/books/miqueias.json").json();
    case "naum": return FileAttachment("data/books/naum.json").json();
    case "neemias": return FileAttachment("data/books/neemias.json").json();
    case "numeros": return FileAttachment("data/books/numeros.json").json();
    case "oseias": return FileAttachment("data/books/oseias.json").json();
    case "proverbios": return FileAttachment("data/books/proverbios.json").json();
    case "romanos": return FileAttachment("data/books/romanos.json").json();
    case "rute": return FileAttachment("data/books/rute.json").json();
    case "sabedoria": return FileAttachment("data/books/sabedoria.json").json();
    case "salmos": return FileAttachment("data/books/salmos.json").json();
    case "sao-joao": return FileAttachment("data/books/sao-joao.json").json();
    case "sao-judas": return FileAttachment("data/books/sao-judas.json").json();
    case "sao-lucas": return FileAttachment("data/books/sao-lucas.json").json();
    case "sao-marcos": return FileAttachment("data/books/sao-marcos.json").json();
    case "sao-mateus": return FileAttachment("data/books/sao-mateus.json").json();
    case "sao-tiago": return FileAttachment("data/books/sao-tiago.json").json();
    case "sofonias": return FileAttachment("data/books/sofonias.json").json();
    case "tito": return FileAttachment("data/books/tito.json").json();
    case "tobias": return FileAttachment("data/books/tobias.json").json();
    case "zacarias": return FileAttachment("data/books/zacarias.json").json();
    default: return FileAttachment("data/books/genesis.json").json();
  }
}

// Carrega APENAS o JSON do livro solicitado
const currentBookData = await loadBookData(initialBook);
const booksIndex = await FileAttachment("data/booksIndex.json").json();
const bookMeta = booksIndex.find(b => b.id === initialBook) || { nome: "Livro Desconhecido" };
```

```js
const maxChapters = currentBookData.length;
const chapterOptions = Array.from({length: maxChapters}, (_, i) => i + 1);
const chapterInputObj = Inputs.select(chapterOptions, {value: Math.min(initialChapter, maxChapters), label: "Capítulo"});
const selectedChapterNum = Generators.input(chapterInputObj);
const chapterInputView = chapterInputObj;

const maxVerses = currentBookData[Math.max(1, Math.min(initialChapter, maxChapters)) - 1]?.length || 1;
const verseOptions = Array.from({length: maxVerses}, (_, i) => i + 1);
const verseInputObj = Inputs.select(verseOptions, {value: 1, label: ""});
const selectedVerseNum = Generators.input(verseInputObj);
const verseInputView = verseInputObj;
```

```js
const verses = currentBookData[selectedChapterNum - 1] || [];

// Engine de Análise Semântica
const stopWords = new Set([
  'a', 'o', 'as', 'os', 'e', 'do', 'da', 'dos', 'das', 'no', 'na', 'nos', 'nas',
  'em', 'um', 'uma', 'uns', 'umas', 'com', 'por', 'para', 'se', 'que', 'muito',
  'pelo', 'pela', 'mais', 'meu', 'teu', 'seu', 'sua', 'isto', 'aquilo', 'este',
  'esta', 'eles', 'elas', 'vós', 'nós', 'lhe', 'lhes', 'dele', 'dela', 'num', 'numa',
  'através', 'então', 'entanto', 'pois', 'nem', 'também', 'porque', 'ele', 'ela', 
  'como', 'quem', 'qual', 'foi', 'ao', 'aos', 'mas', 'não', 'ou', 'são', 'de'
]);

let totalWords = 0;
const wordsMap = new Map();

verses.forEach(textoVersiculo => {
  const cleanText = textoVersiculo.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '');
  const words = cleanText.split(/\s+/).filter(w => w.length > 2);
  words.forEach(w => {
    totalWords++;
    if (!stopWords.has(w)) {
      wordsMap.set(w, (wordsMap.get(w) || 0) + 1);
    }
  });
});

const uniqueWords = wordsMap.size;
const sortedWords = Array.from(wordsMap.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

// --- EXPANSÃO: Detecção de Entidades & Sentiment Alignment ---
const charactersDB = await FileAttachment("data/characters.json").json();
const fullChapterText = verses.join(" ");
const detectedEntities = charactersDB
  .filter(c => fullChapterText.includes(c.nome))
  .map(c => {
    // Conta ocorrências reais
    const regex = new RegExp(`\\b${c.nome}\\b`, 'gi');
    const matches = fullChapterText.match(regex);
    return { ...c, count: matches ? matches.length : 0 };
  })
  .filter(c => c.count > 0)
  .sort((a, b) => b.count - a.count);

// Mockup de Sentimento (Baseado em palavras chave positivas/negativas)
const sentimentScore = (() => {
  const pos = ['deus', 'senhor', 'amor', 'paz', 'alegria', 'luz', 'vida', 'bênção'];
  const neg = ['morte', 'pecado', 'dor', 'trevas', 'mal', 'inimigo', 'castigo', 'fome'];
  let score = 50;
  verses.forEach(v => {
    const low = v.toLowerCase();
    pos.forEach(p => { if(low.includes(p)) score += 2; });
    neg.forEach(n => { if(low.includes(n)) score -= 2; });
  });
  return Math.max(0, Math.min(100, score));
})();
// Função para destacar entidades no texto
const highlightEntities = (text) => {
  if (!detectedEntities.length) return text;
  const names = detectedEntities.map(e => e.nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`\\b(${names})\\b`, 'gi');
  const parts = text.split(regex);
  return html`${parts.map((part, i) => {
    if (i % 2 === 1) {
      const entity = detectedEntities.find(e => e.nome.toLowerCase() === part.toLowerCase());
      return html`<a href="/curiosidades?search=${part}" class="text-sky-400 font-bold hover:underline decoration-sky-500/30 underline-offset-4" title="${entity?.desc || ''}">${part}</a>`;
    }
    return part;
  })}`;
};
```

```js
// Atualiza a URL sem recarregar a página para compartilhamento
const newUrl = new URL(window.location.href);
newUrl.searchParams.set("book", initialBook);
newUrl.searchParams.set("chapter", selectedChapterNum);
window.history.replaceState({}, "", newUrl);
```

```js
const readerUI = html`<div class="grid grid-cols-1 gap-6 px-1 animate-reveal w-full">
  <!-- Main Reader Area - 100% Width -->
  <div class="card-premium p-6 sm:p-10 shadow-2xl backdrop-blur-md w-full">
    <div class="flex flex-col gap-6 mb-10 border-b border-slate-800 pb-8">
      <div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter mb-1">${bookMeta.nome}</h2>
        <p class="text-[0.6rem] text-slate-500 font-black uppercase tracking-[0.2em]">Cânon Bíblico • Tradução Literária</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <div class="bg-black/40 p-4 rounded-2xl border border-slate-800 shadow-inner hover:border-sky-500/50 transition-all w-full sm:w-1/2">
          <label class="text-[0.55rem] font-black text-slate-500 uppercase tracking-widest mb-1 block">Selecione o Capítulo</label>
          ${chapterInputView}
        </div>
        <div class="bg-black/40 p-4 rounded-2xl border border-slate-800 shadow-inner hover:border-sky-500/50 transition-all w-full sm:w-1/2">
          <label class="text-[0.55rem] font-black text-slate-500 uppercase tracking-widest mb-1 block">Escolher Versículo</label>
          ${verseInputView}
        </div>
      </div>
    </div>
    
    <div class="prose-bible mb-12 selection:bg-sky-500/30 text-lg sm:text-xl w-full max-w-none">
      <div class="w-full">
        ${verses.map((texto, indice) => html`
          <div id="verse-${indice + 1}" class="mb-6 flex items-start gap-4 p-3 rounded-xl transition-all duration-500 w-full ${selectedVerseNum === indice + 1 ? 'bg-sky-900/40 border-l-4 border-sky-400 shadow-lg shadow-sky-500/10' : 'hover:bg-slate-700/10'}">
            <sup class="text-sky-500 font-black text-xs sm:text-sm mt-3.5 select-none shrink-0 w-6 text-right">${indice + 1}</sup> 
            <span class="w-full text-slate-200 tracking-wide leading-relaxed">${highlightEntities(texto)}</span>
          </div>
        `)}
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-700/50 pt-8">
      <a href="?book=${initialBook}&chapter=${selectedChapterNum > 1 ? selectedChapterNum - 1 : 1}" 
         class="w-full sm:w-auto btn-nav ${selectedChapterNum <= 1 ? 'opacity-30 pointer-events-none' : ''}">
        ← Capítulo Anterior
      </a>
      <span class="text-slate-500 font-black tracking-widest uppercase text-[0.6rem]">Capítulo ${selectedChapterNum} de ${bookMeta.chapters}</span>
      <a href="?book=${initialBook}&chapter=${selectedChapterNum < bookMeta.chapters ? selectedChapterNum + 1 : bookMeta.chapters}" 
         class="w-full sm:w-auto btn-nav ${selectedChapterNum >= bookMeta.chapters ? 'opacity-30 pointer-events-none' : ''}">
        Próximo Capítulo →
      </a>
    </div>
  </div>

  <!-- NLP Similarity Analysis Panel (Grid Horizontal Inferior) -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
    <div class="card-premium p-6 shadow-xl w-full">
      <h3 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Análise do Capítulo</h3>
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-slate-950/40 p-3 rounded-2xl border border-slate-800">
          <span class="block text-2xl font-black text-white italic transition-all hover:text-sky-400">${totalWords}</span>
          <span class="text-[0.5rem] text-slate-500 uppercase font-bold tracking-tighter">Total</span>
        </div>
        <div class="bg-slate-950/40 p-3 rounded-2xl border border-slate-800">
          <span class="block text-2xl font-black text-sky-400 italic transition-all hover:text-white">${uniqueWords}</span>
          <span class="text-[0.5rem] text-slate-500 uppercase font-bold tracking-tighter">Únicas</span>
        </div>
        <div class="bg-slate-950/40 p-3 rounded-2xl border border-slate-800 flex flex-col justify-center">
          <div class="flex justify-between items-center mb-1">
             <span class="text-[0.45rem] text-slate-500 uppercase font-black tracking-widest leading-none">Vibe</span>
             <span class="text-[0.5rem] ${sentimentScore > 50 ? 'text-emerald-400' : 'text-amber-400'} font-black">${sentimentScore}%</span>
          </div>
          <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
             <div class="h-full ${sentimentScore > 50 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]' : 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]'} transition-all duration-1000" style="width: ${sentimentScore}%"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-premium p-6 shadow-xl w-full">
      <h3 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Nuvem de Mineração (Top 10)</h3>
      <div class="space-y-2">
        <div class="flex flex-wrap gap-2">${sortedWords.map(([word, count]) => html`
           <div class="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full hover:border-sky-500 transition-colors group">
             <span class="text-slate-300 font-bold text-xs capitalize group-hover:text-white">${word}</span>
             <span class="bg-slate-800 text-[0.6rem] px-1.5 py-0.5 rounded-md text-sky-400 font-black">${count}</span>
           </div>
        `)}</div>
      </div>
    </div>

    <!-- Dynamic Entity Recognition -->
    <div class="card-premium p-6 shadow-xl w-full">
      <h3 class="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Mencionado no Capítulo</h3>
      <div class="w-full">
        ${detectedEntities.length > 0 
          ? resize((width) => Plot.plot({
              width, height: 160, marginLeft: 80,
              x: { label: "Frequência", grid: true },
              y: { label: null },
              marks: [
                Plot.barX(detectedEntities.slice(0, 5), { 
                  x: "count", y: "nome", 
                  fill: "count", 
                  fillOpacity: 0.8,
                  tip: true 
                }),
                Plot.text(detectedEntities.slice(0, 5), {
                  x: "count", y: "nome", text: d => `${d.count}x`,
                  dx: 15, fill: "white", fontWeight: "bold"
                })
              ],
              color: { scheme: "blues" }
            }))
          : html`<div class="h-[160px] flex items-center justify-center text-slate-600 italic text-xs uppercase tracking-widest border border-dashed border-slate-800 rounded-xl">Nenhuma entidade identificada</div>`
        }
      </div>
    </div>
  </div>
</div>`;
```

```js
// Scroll dinâmico para o versículo selecionado
if (selectedVerseNum) {
  setTimeout(() => {
    const el = document.getElementById(`verse-${selectedVerseNum}`);
    if(el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 150);
}
```

${readerUI}
</div>
