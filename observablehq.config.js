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
  toc: true, // Table of contents
  pager: false, // Sem links "próximo/anterior" no rodapé

  // Caminho raiz
  root: "src",

  // Menu de navegação lateral
  pages: [
    {
      name: "Hyper-Analysis",
      pages: [
        { name: "Executive Dashboard", path: "/index" },
        { name: "Canonical Index", path: "/home" },
        { name: "Semantic Reader", path: "/reader" }
      ]
    }
  ]
};
