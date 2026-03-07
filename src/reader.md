---
title: Leitor e Análise Semântica
theme: [dark, slate]
toc: false
sidebar: false
---

<!-- Reading Progress Bar -->
<div id="reading-progress" class="reading-progress" style="width:0%"></div>

<div class="w-full">
  <header class="page-header animate-reveal">
    <h1>
      <span class="h1-bar"></span>
      Leitor <span style="color:#38bdf8;font-style:italic;">Semântico</span>
    </h1>
    <p class="subtitle">Engine NLP Ativa • Mineração de Dados • TTS Integrado</p>
  </header>

<div class="animate-reveal" style="margin-bottom:1.25rem;">
  <a href="/home" style="color:#38bdf8;text-decoration:none;font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:0.15em;display:inline-flex;align-items:center;gap:0.5rem;padding:0.5rem 1rem;border-radius:0.75rem;border:1px solid rgba(56,189,248,0.2);transition:all 0.2s ease;">
    ← Índice Canônico
  </a>
</div>

```js
// Parâmetros da URL
const params = new URLSearchParams(window.location.search);
const initialBook    = params.get("book")    || "genesis";
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

const currentBookData = await loadBookData(initialBook);
const booksIndex       = await FileAttachment("data/booksIndex.json").json();
const bookMeta         = booksIndex.find(b => b.id === initialBook) || { nome: "Livro Desconhecido", chapters: 1 };
```

```js
const maxChapters  = currentBookData.length;
const chapterInputObj = Inputs.select(
  Array.from({length: maxChapters}, (_, i) => i + 1),
  { value: Math.min(initialChapter, maxChapters), label: "Capítulo" }
);
const selectedChapterNum = Generators.input(chapterInputObj);
const chapterInputView   = chapterInputObj;

const maxVerses = currentBookData[Math.max(1, Math.min(initialChapter, maxChapters)) - 1]?.length || 1;
const verseInputObj = Inputs.select(
  Array.from({length: maxVerses}, (_, i) => i + 1),
  { value: 1, label: "Versículo" }
);
const selectedVerseNum = Generators.input(verseInputObj);
const verseInputView   = verseInputObj;
```

```js
const verses = currentBookData[selectedChapterNum - 1] || [];

// ── Engine NLP: Stop Words expandidas ──
const stopWords = new Set([
  // Artigos
  'a','o','as','os','um','uma','uns','umas',
  // Preposições
  'a','de','do','da','dos','das','no','na','nos','nas','em','com','por','para',
  'pelo','pela','pelos','pelas','ao','aos','à','às','sobre','entre','até',
  'após','ante','perante','desde','sob','sem','contra','versus',
  // Pronomes
  'se','que','me','te','lhe','lhes','nos','vos','ele','ela','eles','elas',
  'eu','tu','você','vocês','nós','vós','meu','teu','seu','nossa','vossa',
  'sua','minha','dele','dela','deles','delas','isto','isso','aquilo',
  'este','esta','estes','estas','esse','essa','esses','essas','aquele',
  // Conjunções
  'e','mas','ou','nem','porém','todavia','entretanto','contudo','logo',
  'porque','pois','quando','se','embora','enquanto','embora','portanto',
  // Verbos auxiliares comuns
  'foi','ser','estar','ter','havia','houve','era','foram','será','são',
  'tem','tinha','têm','fez','fará','disse','falou','também','muito',
  // Advérbios
  'não','sim','já','ainda','logo','mais','menos','sempre','nunca','jamais',
  'ali','aí','aqui','lá','cá','assim','então','também','como','quem',
  'qual','onde','quando','num','numa','nuns','numas','através','sobre'
]);

let totalWords = 0;
const wordsMap = new Map();

verses.forEach(textoVersiculo => {
  const cleanText = textoVersiculo.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '');
  const words = cleanText.split(/\s+/).filter(w => w.length > 2);
  words.forEach(w => {
    totalWords++;
    if (!stopWords.has(w)) wordsMap.set(w, (wordsMap.get(w) || 0) + 1);
  });
});

const uniqueWords  = wordsMap.size;
const hapaxCount   = Array.from(wordsMap.values()).filter(c => c === 1).length;
const richness     = uniqueWords > 0 ? Math.round((hapaxCount / uniqueWords) * 100) : 0;
const sortedWords  = Array.from(wordsMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);

// Detecção de Entidades
const charactersDB = await FileAttachment("data/characters.json").json();
const fullChapterText = verses.join(" ");
const detectedEntities = charactersDB
  .filter(c => fullChapterText.includes(c.nome))
  .map(c => {
    const regex = new RegExp(`\\b${c.nome}\\b`, 'gi');
    const matches = fullChapterText.match(regex);
    return { ...c, count: matches ? matches.length : 0 };
  })
  .filter(c => c.count > 0)
  .sort((a, b) => b.count - a.count);

// Score de Sentimento
const sentimentScore = (() => {
  const pos = ['deus','senhor','amor','paz','alegria','luz','vida','bênção','graça','salvação','glória','fé','esperança','santo','bem'];
  const neg = ['morte','pecado','dor','trevas','mal','inimigo','castigo','fome','destruição','maldição','ira','guerra','sangue'];
  let score = 50;
  verses.forEach(v => {
    const low = v.toLowerCase();
    pos.forEach(p => { if (low.includes(p)) score += 2; });
    neg.forEach(n => { if (low.includes(n)) score -= 2; });
  });
  return Math.max(0, Math.min(100, score));
})();

// Destaca entidades como links
const highlightEntities = (text) => {
  if (!detectedEntities.length) return text;
  const names = detectedEntities.map(e => e.nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`\\b(${names})\\b`, 'gi');
  const parts  = text.split(regex);
  return html`${parts.map((part, i) => {
    if (i % 2 === 1) {
      const entity = detectedEntities.find(e => e.nome.toLowerCase() === part.toLowerCase());
      return html`<a href="/curiosidades?search=${part}" style="color:#38bdf8;font-weight:700;text-decoration:none;border-bottom:1px dotted rgba(56,189,248,0.4);" title="${entity?.desc || ''}">${part}</a>`;
    }
    return part;
  })}`;
};
```

```js
// Atualiza URL para compartilhamento
const newUrl = new URL(window.location.href);
newUrl.searchParams.set("book",    initialBook);
newUrl.searchParams.set("chapter", selectedChapterNum);
window.history.replaceState({}, "", newUrl);
```

```js
// Barra de progresso de leitura
document.addEventListener('scroll', () => {
  const main = document.getElementById('observablehq-main') || document.body;
  const scrolled = window.scrollY;
  const total    = main.scrollHeight - window.innerHeight;
  const pct      = total > 0 ? Math.round((scrolled / total) * 100) : 0;
  const bar = document.getElementById('reading-progress');
  if (bar) bar.style.width = pct + '%';
});
```

```js
const isVT = bookMeta.testamento === "VT";
const accentColor = isVT ? "#f59e0b" : "#38bdf8";

const readerUI = html`<div class="animate-reveal w-full">

  <!-- MAIN READER CARD -->
  <div class="card-premium" style="padding:1.5rem;margin-bottom:1.5rem;">
    
    <!-- Book Title + Controls -->
    <div style="border-bottom:1px solid rgba(51,65,85,0.5);padding-bottom:1.5rem;margin-bottom:1.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;">
        <div>
          <h2 style="font-size:clamp(1.5rem,4vw,2.5rem);font-weight:900;color:#fff;letter-spacing:-0.04em;margin-bottom:0.25rem;">${bookMeta.nome}</h2>
          <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
            <span class="${isVT ? 'badge-vt' : 'badge-nt'}">${bookMeta.testamento || (isVT ? "VT" : "NT")}</span>
            <span style="color:#475569;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Tradução Literária</span>
          </div>
        </div>
        
        <!-- TTS Button -->
        <button id="tts-btn" class="btn-tts" onclick="toggleTTS()" title="Ouvir capítulo">
          <span id="tts-icon">🔊</span>
          <span id="tts-label">Ouvir Capítulo</span>
        </button>
      </div>
      
      <!-- Chapter/Verse Selectors -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div style="background:rgba(0,0,0,0.3);padding:1rem;border-radius:1rem;border:1px solid rgba(51,65,85,0.5);">
          <label style="display:block;font-size:0.65rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:0.5rem;">Selecione o Capítulo</label>
          ${chapterInputView}
        </div>
        <div style="background:rgba(0,0,0,0.3);padding:1rem;border-radius:1rem;border:1px solid rgba(51,65,85,0.5);">
          <label style="display:block;font-size:0.65rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:0.5rem;">Ir ao Versículo</label>
          ${verseInputView}
        </div>
      </div>
    </div>

    <!-- Bible Text -->
    <div class="prose-bible" style="margin-bottom:2rem;">
      ${verses.map((texto, indice) => html`
        <div 
          id="verse-${indice + 1}"
          style="display:flex;align-items:flex-start;gap:1rem;padding:0.75rem;border-radius:0.875rem;margin-bottom:0.5rem;transition:all 0.4s ease;
                 ${selectedVerseNum === indice + 1 
                   ? `background:rgba(${isVT?'245,158,11':'56,189,248'},0.1);border-left:3px solid ${accentColor};padding-left:1rem;` 
                   : 'border-left:3px solid transparent;'}"
        >
          <sup style="color:${accentColor};font-weight:900;font-size:0.75rem;margin-top:0.5rem;flex-shrink:0;width:1.75rem;text-align:right;">${indice + 1}</sup>
          <span style="color:#e2e8f0;letter-spacing:0.02em;line-height:2;">${highlightEntities(texto)}</span>
        </div>
      `)}
    </div>

    <!-- Navigation -->
    <div style="display:flex;flex-direction:column;gap:1rem;border-top:1px solid rgba(51,65,85,0.4);padding-top:1.5rem;align-items:center;">
      <div style="display:flex;gap:1rem;width:100%;flex-wrap:wrap;">
        <a href="?book=${initialBook}&chapter=${selectedChapterNum > 1 ? selectedChapterNum - 1 : 1}" 
           class="btn-nav" style="${selectedChapterNum <= 1 ? 'opacity:0.3;pointer-events:none;' : ''}">
          ← Anterior
        </a>
        <span style="color:#475569;font-weight:700;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.15em;display:flex;align-items:center;flex:1;justify-content:center;">
          Cap. ${selectedChapterNum} / ${bookMeta.chapters}
        </span>
        <a href="?book=${initialBook}&chapter=${selectedChapterNum < bookMeta.chapters ? selectedChapterNum + 1 : bookMeta.chapters}"
           class="btn-nav" style="${selectedChapterNum >= bookMeta.chapters ? 'opacity:0.3;pointer-events:none;' : ''}">
          Próximo →
        </a>
      </div>
    </div>
  </div>

  <!-- NLP ANALYTICS PANELS -->
  <div class="grid-analytics" style="margin-top:0.5rem;">
    
    <!-- Análise do Capítulo -->
    <div class="card-premium animate-reveal" style="padding:1.5rem;">
      <h3 style="font-size:0.7rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:1rem;">Análise do Capítulo</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;margin-bottom:1rem;">
        <div style="background:rgba(15,23,42,0.6);padding:0.875rem;border-radius:1rem;border:1px solid rgba(51,65,85,0.5);">
          <span style="display:block;font-size:1.5rem;font-weight:900;color:#fff;">${totalWords}</span>
          <span style="font-size:0.6rem;color:#475569;text-transform:uppercase;font-weight:700;">Total</span>
        </div>
        <div style="background:rgba(15,23,42,0.6);padding:0.875rem;border-radius:1rem;border:1px solid rgba(51,65,85,0.5);">
          <span style="display:block;font-size:1.5rem;font-weight:900;color:${accentColor};">${uniqueWords}</span>
          <span style="font-size:0.6rem;color:#475569;text-transform:uppercase;font-weight:700;">Únicas</span>
        </div>
        <div style="background:rgba(15,23,42,0.6);padding:0.875rem;border-radius:1rem;border:1px solid rgba(51,65,85,0.5);">
          <span style="display:block;font-size:1.5rem;font-weight:900;color:#818cf8;">${richness}%</span>
          <span style="font-size:0.6rem;color:#475569;text-transform:uppercase;font-weight:700;">Hapax</span>
        </div>
      </div>
      <!-- Sentimento -->
      <div style="background:rgba(15,23,42,0.4);padding:0.75rem;border-radius:0.875rem;border:1px solid rgba(51,65,85,0.4);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
          <span style="font-size:0.6rem;color:#64748b;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;">Sentimento Semântico</span>
          <span style="font-size:0.7rem;font-weight:900;color:${sentimentScore > 50 ? '#10b981' : '#f59e0b'};">${sentimentScore}%</span>
        </div>
        <div style="width:100%;background:#1e293b;height:6px;border-radius:999px;overflow:hidden;">
          <div style="height:100%;width:${sentimentScore}%;background:${sentimentScore > 50 ? 'linear-gradient(90deg,#10b981,#34d399)' : 'linear-gradient(90deg,#f59e0b,#fcd34d)'};border-radius:999px;transition:width 1s ease;"></div>
        </div>
      </div>
    </div>

    <!-- Nuvem de Palavras Top 12 -->
    <div class="card-premium animate-reveal" style="padding:1.5rem;">
      <h3 style="font-size:0.7rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:1rem;">Mineração de Termos (Top 12)</h3>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
        ${sortedWords.map(([word, count], i) => html`
          <div style="display:flex;align-items:center;gap:0.375rem;background:rgba(15,23,42,0.8);border:1px solid rgba(51,65,85,0.6);padding:0.375rem 0.75rem;border-radius:999px;transition:all 0.2s ease;"
               onmouseover="this.style.borderColor='${accentColor}'" onmouseout="this.style.borderColor='rgba(51,65,85,0.6)'">
            <span style="color:#e2e8f0;font-weight:600;font-size:0.8rem;text-transform:capitalize;">${word}</span>
            <span style="background:rgba(56,189,248,0.1);color:${accentColor};font-size:0.6rem;font-weight:900;padding:0.1rem 0.4rem;border-radius:0.375rem;">${count}</span>
          </div>
        `)}
        ${sortedWords.length === 0 ? html`<span style="color:#475569;font-style:italic;font-size:0.8rem;">Nenhum termo encontrado</span>` : ''}
      </div>
    </div>

    <!-- Entidades Detectadas -->
    <div class="card-premium animate-reveal" style="padding:1.5rem;">
      <h3 style="font-size:0.7rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:1rem;">Entidades no Capítulo</h3>
      <div style="width:100%;">
        ${detectedEntities.length > 0 
          ? resize((width) => Plot.plot({
              width, height: 180, marginLeft: 90,
              style: { background: "transparent", color: "white", fontSize: "12px" },
              x: { label: "Frequência", grid: true },
              y: { label: null },
              color: { scheme: "blues" },
              marks: [
                Plot.barX(detectedEntities.slice(0, 6), { 
                  x: "count", y: "nome", 
                  fill: "count", fillOpacity: 0.85,
                  tip: true, rx: 4
                }),
                Plot.text(detectedEntities.slice(0, 6), {
                  x: "count", y: "nome", text: d => `${d.count}×`,
                  dx: 14, fill: "white", fontWeight: "bold", fontSize: 12
                })
              ]
            }))
          : html`<div style="height:120px;display:flex;align-items:center;justify-content:center;color:#334155;font-style:italic;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;border:1px dashed #1e293b;border-radius:1rem;">Nenhuma entidade local</div>`
        }
      </div>
    </div>
  </div>
</div>`;
```

```js
// Scroll para versículo selecionado
if (selectedVerseNum) {
  setTimeout(() => {
    const el = document.getElementById(`verse-${selectedVerseNum}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 200);
}
```

```js
// TTS Engine (Web Speech API — sem custo, nativa do browser)
window._bibleTTS = {
  synth:     window.speechSynthesis,
  utterance: null,
  speaking:  false,
  verses:    [],
  idx:       0
};

window.toggleTTS = function() {
  const tts  = window._bibleTTS;
  const btn   = document.getElementById('tts-btn');
  const icon  = document.getElementById('tts-icon');
  const label = document.getElementById('tts-label');

  if (tts.speaking) {
    tts.synth.cancel();
    tts.speaking = false;
    if (btn)   { btn.classList.remove('speaking'); }
    if (icon)  icon.textContent  = '🔊';
    if (label) label.textContent = 'Ouvir Capítulo';
    return;
  }

  // Busca versículos do DOM
  const verseEls = document.querySelectorAll('[id^="verse-"]');
  const textArr  = Array.from(verseEls).map(el => el.querySelector('span')?.textContent || '');
  
  if (!textArr.length) return;

  tts.verses  = textArr;
  tts.idx     = 0;
  tts.speaking = true;
  if (btn)   btn.classList.add('speaking');
  if (icon)  icon.textContent  = '⏹';
  if (label) label.textContent = 'Pausar';

  function speakNext() {
    if (!tts.speaking || tts.idx >= tts.verses.length) {
      tts.speaking = false;
      if (btn)   btn.classList.remove('speaking');
      if (icon)  icon.textContent  = '🔊';
      if (label) label.textContent = 'Ouvir Capítulo';
      return;
    }

    const utter = new SpeechSynthesisUtterance(tts.verses[tts.idx]);
    utter.lang  = 'pt-BR';
    utter.rate  = 0.92;
    utter.pitch = 1.0;

    // Destaca versículo atual
    const verseEl = document.getElementById(`verse-${tts.idx + 1}`);
    if (verseEl) verseEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    utter.onend = () => {
      tts.idx++;
      speakNext();
    };
    utter.onerror = () => {
      tts.speaking = false;
    };

    tts.utterance = utter;
    tts.synth.speak(utter);
  }

  speakNext();
};

// Para TTS ao trocar de capítulo
window.speechSynthesis?.cancel();
```

${readerUI}

</div>
