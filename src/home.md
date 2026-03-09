---
title: Estudos Bíblicos
theme: [dark, slate]
toc: false
sidebar: false
---

<div class="w-full">
  <header class="page-header animate-reveal">
    <h1>
      <span class="h1-bar"></span>
      Estudos <span style="color:#38bdf8;font-style:italic;">Canônicos</span>
    </h1>
    <p class="subtitle">Matriz de Navegação Bíblica • Filtros Inteligentes</p>
  </header>

<!-- NAVIGATION MODULES -->
<div class="grid-kpi animate-reveal" style="margin-bottom:2rem;">
  <a href="/curiosidades" style="text-decoration:none;" class="group">
    <div class="card-kpi border-l-4 border-l-sky-400" style="height:100%;transition:all 0.3s ease;">
      <div style="display:flex;flex-direction:column;height:100%;justify-content:space-between;">
        <div>
          <div class="kpi-label" style="font-style:italic;">Módulo Extra</div>
          <div class="kpi-value" style="font-size:1.5rem;">✨ Curiosidades</div>
        </div>
        <div class="kpi-sub">Glossário A-Z • Personagens Históricos</div>
      </div>
    </div>
  </a>

  <a href="/mapa" style="text-decoration:none;" class="group">
    <div class="card-kpi border-l-4 border-l-sky-400" style="height:100%;">
      <div style="display:flex;flex-direction:column;height:100%;justify-content:space-between;">
        <div>
          <div class="kpi-label" style="font-style:italic;">Interativo</div>
          <div class="kpi-value" style="font-size:1.5rem;">🗺️ Mapa Histórico</div>
        </div>
        <div class="kpi-sub">Cartografia • Rotas do Êxodo</div>
      </div>
    </div>
  </a>
  
  <a href="/reader" style="text-decoration:none;" class="group">
    <div class="card-kpi border-l-4 border-l-sky-400" style="height:100%;">
      <div style="display:flex;flex-direction:column;height:100%;justify-content:space-between;">
        <div>
          <div class="kpi-label" style="font-style:italic;">Leitor + TTS</div>
          <div class="kpi-value" style="font-size:1.5rem;">📖 Leitura Bíblica</div>
        </div>
        <div class="kpi-sub">Áudio • Análise Semântica</div>
      </div>
    </div>
  </a>
  
  <a href="/lab" style="text-decoration:none;" class="group">
    <div class="card-kpi border-l-4 border-l-sky-400" style="height:100%;">
      <div style="display:flex;flex-direction:column;height:100%;justify-content:space-between;">
        <div>
          <div class="kpi-label" style="font-style:italic;">Ciência de Dados</div>
          <div class="kpi-value" style="font-size:1.5rem;">🔬 Lab IA</div>
        </div>
        <div class="kpi-sub">Grafos • ML • Visualizações</div>
      </div>
    </div>
  </a>
</div>

```js
const books = FileAttachment("data/booksIndex.json").json();

const semanticThemes = {
  "inicio":     ["genesis", "joao"],
  "amor":       ["i-corintios", "i-sao-joao", "cantico-dos-canticos"],
  "lei":        ["exodo", "levitico", "numeros", "deuteronomio"],
  "sabedoria":  ["proverbios", "eclesiastes", "sabedoria", "jo"],
  "profecia":   ["isaias", "jeremias", "ezequiel", "apocalipse"],
  "fé":         ["hebreus", "romanos", "galatas"],
  "sofrimento": ["jo", "lamentacoes", "i-sao-pedro"],
  "criacao":    ["genesis"],
  "reis":       ["i-reis", "ii-reis", "i-samuel", "ii-samuel"],
  "salmos":     ["salmos"],
  "evangelhos": ["sao-mateus", "sao-marcos", "sao-lucas", "sao-joao"],
};
```

<!-- SEARCH & FILTER CARD -->
<div class="card-premium animate-reveal" style="padding:1.5rem 2rem;margin-bottom:2rem;">
  <div style="display:flex;flex-direction:column;gap:1.25rem;">
    <div>
      <label style="display:block;font-size:0.7rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:0.625rem;">🔍 Motor de Busca Híbrido (Texto + Semântica)</label>
      <div class="search-container">${searchInputView}</div>
    </div>
    <div>
      <label style="display:block;font-size:0.7rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:0.625rem;">Filtrar por Testamento</label>
      <div class="radio-container">${testamentoInputView}</div>
    </div>
    <div style="border-top:1px solid rgba(51,65,85,0.4);padding-top:1rem;">
      <p style="font-size:0.65rem;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.75rem;">🔥 Sugestões Semânticas</p>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
        ${Object.keys(semanticThemes).map(t => html`
          <button onclick=${() => {
            const input = document.querySelector('.search-container input');
            if (input) {
              input.value = t;
              input.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }} style="padding:0.35rem 0.875rem;background:rgba(15,23,42,0.8);border:1px solid rgba(51,65,85,0.6);border-radius:999px;font-size:0.65rem;color:#94a3b8;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;cursor:pointer;transition:all 0.2s ease;"
             onmouseover="this.style.borderColor='#38bdf8';this.style.color='#38bdf8'"
             onmouseout="this.style.borderColor='rgba(51,65,85,0.6)';this.style.color='#94a3b8'">
            #${t}
          </button>
        `)}
      </div>
    </div>
  </div>
</div>

```js
const booksSentiment = await FileAttachment("data/books_sentiment.json").json();

const booksGrid = html`<div class="grid-books">
  ${filteredBooks.map((b, i) => {
    const query = searchInputValue.toLowerCase();
    const isSemanticMatch = query && semanticThemes[query] && semanticThemes[query].includes(b.id);
    const sentiment = booksSentiment[b.id] || 50;
    const isVT = b.testamento === "VT";
    const accentColor = isVT ? "#f59e0b" : "#38bdf8";
    
    return html`
      <a href=${`/reader?book=${b.id}`} style="text-decoration:none;display:block;" class="animate-slide-up">
        <div style="
          position:relative;
          background:rgba(15,23,42,0.65);
          border:1px solid rgba(51,65,85,0.5);
          border-radius:1.25rem;
          padding:1.25rem;
          height:100%;
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          transition:all 0.3s ease;
          overflow:hidden;
          "
          onmouseover="this.style.borderColor='${accentColor}';this.style.transform='translateY(-4px)';this.style.background='rgba(30,41,59,0.7)'"
          onmouseout="this.style.borderColor='rgba(51,65,85,0.5)';this.style.transform='translateY(0)';this.style.background='rgba(15,23,42,0.65)'"
        >
          ${isSemanticMatch ? html`<div style="position:absolute;top:0;right:0;padding:0.25rem 0.75rem;background:#38bdf8;font-size:0.55rem;font-weight:900;color:#0f172a;text-transform:uppercase;letter-spacing:0.1em;border-bottom-left-radius:0.75rem;">Match</div>` : ""}
          
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.875rem;">
              <span style="
                padding:0.2rem 0.6rem;
                border-radius:999px;
                font-size:0.6rem;
                font-weight:800;
                text-transform:uppercase;
                letter-spacing:0.1em;
                background:${isVT ? 'rgba(245,158,11,0.1)' : 'rgba(56,189,248,0.1)'};
                border:1px solid ${isVT ? 'rgba(245,158,11,0.3)' : 'rgba(56,189,248,0.3)'};
                color:${accentColor};
              ">${b.testamento}</span>
              <span style="color:${accentColor};font-size:1rem;opacity:0.7;">→</span>
            </div>
            <h3 style="font-size:1rem;font-weight:700;color:#f1f5f9;margin-bottom:0.25rem;line-height:1.3;">${b.nome}</h3>
            <p style="font-size:0.65rem;color:#475569;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">${b.chapters} cap.</p>
          </div>
          
          <div style="margin-top:1rem;padding-top:0.875rem;border-top:1px solid rgba(51,65,85,0.4);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.375rem;">
              <span style="font-size:0.55rem;color:#475569;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;">Vibe Semântica</span>
              <span style="font-size:0.65rem;font-weight:900;color:${sentiment > 50 ? accentColor : '#f59e0b'};">${sentiment}%</span>
            </div>
            <div style="height:3px;background:#1e293b;border-radius:999px;overflow:hidden;">
              <div style="height:100%;width:${sentiment}%;background:${accentColor};border-radius:999px;"></div>
            </div>
          </div>
        </div>
      </a>
    `;
  })}
</div>`;
```

${booksGrid}

```js
const searchInputObj  = Inputs.text({placeholder: "Pesquisar por nome, tema (#amor, #lei, #profecia)..."});
const searchInputValue = Generators.input(searchInputObj);
const searchInputView  = searchInputObj;
```

```js
const opcoesTestamento  = ["Todos", "VT (Antigo)", "NT (Novo)"];
const testamentoInputObj = Inputs.radio(opcoesTestamento, {value: "Todos", label: "Testamento:"});
const testamentoSelecionado = Generators.input(testamentoInputObj);
const testamentoInputView   = testamentoInputObj;
```

```js
const filteredBooks = books.filter(b => {
  const query = searchInputValue.toLowerCase();
  const textMatch     = b.nome.toLowerCase().includes(query) || b.id.includes(query);
  const semanticMatch = semanticThemes[query] && semanticThemes[query].includes(b.id);
  if (query && !textMatch && !semanticMatch) return false;
  if (testamentoSelecionado === "Todos") return true;
  return b.testamento === (testamentoSelecionado.includes("VT") ? "VT" : "NT");
});
```

</div>
