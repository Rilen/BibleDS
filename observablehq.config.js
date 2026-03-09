export default {
  // O título principal da aplicação na barra superior
  title: "BibleDS Observable",

  // Opções do head HTML
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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  `,

  // Tema Dark nativo do framework
  theme: ["dark", "slate"],

  // Layout
  sidebar: false,
  toc: false,
  pager: false,

  // Cabeçalho Premium com Hambúrguer Mobile
  header: `
    <nav class="premium-nav" id="main-nav">
      <div class="logo">
        <span style="display:inline-block;width:5px;height:1.5rem;background:var(--brand-primary);border-radius:4px;box-shadow:0 0 14px rgba(56,189,248,0.6);flex-shrink:0;"></span>
        BibleDS <span style="color:#38bdf8;font-style:italic;">Hyper</span>
      </div>
      <div class="links" id="nav-links">
        <a href="/" class="nav-link">📊 Dashboard</a>
        <a href="/home" class="nav-link">📚 Estudos</a>
        <a href="/reader" class="nav-link">📖 Leitor</a>
        <a href="/lab" class="nav-link">🔬 Lab IA</a>
        <a href="/curiosidades" class="nav-link">✨ Curiosidades</a>
      </div>
      <button class="nav-hamburger" id="hamburger" aria-label="Abrir menu" onclick="toggleMobileMenu()">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <!-- Mobile menu overlay -->
    <div class="nav-mobile-menu" id="mobile-menu">
      <a href="/" class="nav-link-mobile">📊 Dashboard</a>
      <a href="/home" class="nav-link-mobile">📚 Estudos</a>
      <a href="/reader" class="nav-link-mobile">📖 Leitor</a>
      <a href="/lab" class="nav-link-mobile">🔬 Laboratório IA</a>
      <a href="/curiosidades" class="nav-link-mobile">✨ Curiosidades</a>
    </div>

    <style>
      .nav-link.active, .nav-link-mobile.active {
        color: #f8fafc !important;
        background-color: rgba(56,189,248,0.15) !important;
        border-color: rgba(56,189,248,0.35) !important;
        font-weight: 800 !important;
      }
      .nav-hamburger.open span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
        background: #38bdf8;
      }
      .nav-hamburger.open span:nth-child(2) { opacity: 0; }
      .nav-hamburger.open span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
        background: #38bdf8;
      }
    </style>

    <script>
      function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const btn  = document.getElementById('hamburger');
        const open = menu.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      }

      function updateActiveLink() {
        const path = window.location.pathname.replace(/\\.html$/, '');
        document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
          const href = link.getAttribute('href').replace(/\\.html$/, '');
          const isHome = (path === '/' || path === '/index') && href === '/';
          const isMatch = href !== '/' && path.startsWith(href);
          link.classList.toggle('active', isHome || isMatch);
        });
      }

      document.addEventListener('DOMContentLoaded', () => {
        updateActiveLink();
        // Close menu on link click
        document.querySelectorAll('.nav-link-mobile').forEach(a =>
          a.addEventListener('click', () => {
            document.getElementById('mobile-menu')?.classList.remove('open');
            document.getElementById('hamburger')?.classList.remove('open');
          })
        );
      });
    </script>
  `,

  // Caminho raiz
  root: "src"
};
