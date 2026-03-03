export default {
  // O título principal da aplicação na barra superior
  title: "BibleDS Observable",

  // Opções do head HTML: Incluindo Tailwind CDN e Configurações de Design
  head: `
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              brand: {
                primary: '#38bdf8',
                dark: '#0f172a',
                slate: '#1e293b'
              }
            }
          }
        }
      }
    </script>
    <link rel="stylesheet" href="/styles/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  `,

  // Definindo o tema Dark nativo do framework
  theme: ["dark", "slate"],

  // Configurações de layout
  sidebar: false, // Desativa o menu lateral por padrão
  toc: false, // Desativa o Table of Contents para ganhar 100% de largura
  pager: false, // Sem links "próximo/anterior" no rodapé

  // Cabeçalho Premium Customizado (Substituindo o Sidebar)
  header: `
    <nav class="premium-nav">
      <div class="logo">
        <span class="w-2 h-6 bg-sky-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]"></span>
        BibleDS <span class="text-sky-500 italic">Hyper-Analytics</span>
      </div>
      <div class="links">
        <a href="/" class="nav-link">Dashboard</a>
        <a href="/home" class="nav-link">Estudos</a>
        <a href="/curiosidades" class="nav-link">Curiosidades</a>
        <a href="/mapa" class="nav-link">Mapa Histórico</a>
        <a href="/lab" class="nav-link">Laboratório IA</a>
      </div>
      <div class="hidden sm:block text-[0.6rem] font-black text-slate-500 uppercase tracking-widest opacity-50">
        AI-Driven Semantic Engine v2.0
      </div>
    </nav>
    <style>
      .nav-link.active {
        color: #f8fafc !important;
        background-color: rgba(56, 189, 248, 0.1) !important;
        border-bottom: 2px solid #38bdf8 !important;
        font-weight: 800 !important;
      }
    </style>
    <script>
      function updateActiveLink() {
        const links = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href === currentPath || (currentPath === '/index' && href === '/') || currentPath.startsWith(href + '.html')) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
      
      document.addEventListener('DOMContentLoaded', () => {
        updateActiveLink();
        const observer = new MutationObserver(updateActiveLink);
        observer.observe(document.body, { childList: true, subtree: true });
      });
    </script>
  `,

  // Caminho raiz
  root: "src"
};
