---
title: Mapa Histórico Bíblico
theme: [dark, slate]
toc: false
sidebar: false
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="" />

<header class="mb-12 animate-reveal mt-10">
  <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
    <span class="w-3 h-10 bg-sky-500 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)]"></span>
    Geografia Bíblica <span class="text-sky-500 italic">Interativa</span>
  </h1>
  <p class="text-slate-400 font-medium tracking-widest uppercase text-xs opacity-60">OpenBible Geocoding Data • Motor GeoJSON • Leaflet</p>
</header>

<div class="card-premium p-6 sm:p-10 mb-12 animate-slide-up shadow-sky-500/5">
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
    <div class="space-y-2">
      <h2 class="text-lg font-bold text-slate-100 flex items-center gap-3">
        <span class="w-2 h-6 bg-sky-500 rounded-full"></span>
        Rotas e Cidades Históricas
      </h2>
      <p class="text-slate-500 text-sm font-medium mt-2">Selecione o filtro ao lado para visualizar os eventos de diferentes livros e personagens na cronologia bíblica.</p>
    </div>
    <div class="flex gap-2 bg-slate-900/40 border border-slate-800 p-3 rounded-2xl items-center shadow-inner w-full lg:w-auto overflow-hidden">
      <span class="text-[0.6rem] font-bold text-slate-500 uppercase tracking-widest px-2 whitespace-nowrap">Local / Livro:</span>
      <div class="text-sm font-bold w-full overflow-hidden min-w-[200px]">${characterInputView}</div>
    </div>
  </div>

  <!-- Contêiner do Mapa com altura fixa, cantos arredondados, no padrão dark -->
  <div class="w-full h-[600px] bg-slate-950/40 rounded-[2rem] overflow-hidden border border-slate-800 backdrop-blur-xl relative z-0" id="biblical-map">
  </div>
</div>

```js
import L from "npm:leaflet";

const sampleGeoData = [
    // Adão e Eva
    { character: "Adão e Eva (Gênesis)", type: "Feature", geometry: { type: "Point", coordinates: [43.5, 31.5] }, properties: { name: "Jardim do Éden (Aprox.)", category: "Origem", desc: "Região dos grandes rios Tigre e Eufrates na Mesopotâmia." } },

    // Noé
    { character: "Noé (Gênesis)", type: "Feature", geometry: { type: "Point", coordinates: [44.298, 39.702] }, properties: { name: "Monte Ararate", category: "Pós-Dilúvio", desc: "Montanha onde a Arca de Noé repousou após as águas do dilúvio baixarem." } },

    // Jesus
    { character: "Jesus (Evangelhos)", type: "Feature", geometry: { type: "Point", coordinates: [35.2345, 31.7770] }, properties: { name: "Jerusalém", category: "Capital", desc: "Cidade de Davi, centro religioso." } },
    { character: "Jesus (Evangelhos)", type: "Feature", geometry: { type: "Point", coordinates: [35.2982, 32.7019] }, properties: { name: "Nazaré", category: "Cidade", desc: "Lar de infância de Jesus." } },
    { character: "Jesus (Evangelhos)", type: "Feature", geometry: { type: "Point", coordinates: [35.2076, 31.7054] }, properties: { name: "Belém", category: "Cidade", desc: "Local do nascimento de Jesus." } },
    { character: "Jesus (Evangelhos)", type: "Feature", geometry: { type: "Point", coordinates: [35.5684, 32.7963] }, properties: { name: "Mar da Galileia", category: "Lago", desc: "Principal área do ministério de Jesus." } },
    { character: "Jesus (Evangelhos)", type: "Feature", geometry: { type: "Point", coordinates: [35.3216, 31.9059] }, properties: { name: "Jericó", category: "Cidade", desc: "Curou o cego e encontrou Zaqueu." } },
    { character: "Jesus (Evangelhos)", type: "Feature", geometry: { type: "Point", coordinates: [35.546, 31.838] }, properties: { name: "Rio Jordão (Qasr el Yahud)", category: "Batismo", desc: "Local histórico do batismo de Jesus por João Batista." } },
    { character: "Jesus (Evangelhos)", type: "Feature", geometry: { type: "LineString", coordinates: [ [35.2982, 32.7019], [35.5684, 32.7963], [35.3216, 31.9059], [35.546, 31.838], [35.2345, 31.7770] ] }, properties: { name: "Rota Galileia ao Calvário", category: "Rota", desc: "Jornada de Jesus para Jerusalém." } },
    
    // Moisés
    { character: "Moisés (Êxodo)", type: "Feature", geometry: { type: "Point", coordinates: [31.2333, 30.0333] }, properties: { name: "Egito (Mênfis/Gósen)", category: "Opressão", desc: "Local do cativeiro e pragas." } },
    { character: "Moisés (Êxodo)", type: "Feature", geometry: { type: "Point", coordinates: [33.9515, 28.5396] }, properties: { name: "Monte Sinai", category: "Aliança", desc: "Entrega dos 10 Mandamentos." } },
    { character: "Moisés (Êxodo)", type: "Feature", geometry: { type: "Point", coordinates: [35.3333, 32.0000] }, properties: { name: "Rio Jordão (Moabe)", category: "Fronteira", desc: "Visão da Terra Prometida (Monte Nebo)." } },
    { character: "Moisés (Êxodo)", type: "Feature", geometry: { type: "LineString", coordinates: [ [31.2333, 30.0333], [32.5000, 29.5000], [33.9515, 28.5396], [34.5000, 30.0000], [35.3333, 32.0000] ] }, properties: { name: "O Êxodo", category: "Rota", desc: "40 anos no deserto até Canaã." } },

    // Davi
    { character: "Davi (Samuel)", type: "Feature", geometry: { type: "Point", coordinates: [35.2076, 31.7054] }, properties: { name: "Belém", category: "Origem", desc: "Local de nascimento e unção de Davi." } },
    { character: "Davi (Samuel)", type: "Feature", geometry: { type: "Point", coordinates: [34.9814, 31.6917] }, properties: { name: "Vale de Elá (Socó)", category: "Batalha", desc: "Vitória sobre Golias." } },
    { character: "Davi (Samuel)", type: "Feature", geometry: { type: "Point", coordinates: [35.2345, 31.7770] }, properties: { name: "Jerusalém", category: "Capital", desc: "Conquistada dos jebuseus (Cidade de Davi)." } },
    { character: "Davi (Samuel)", type: "Feature", geometry: { type: "LineString", coordinates: [ [35.2076, 31.7054], [34.9814, 31.6917], [35.2345, 31.7770] ] }, properties: { name: "Ascensão ao Trono", category: "Rota", desc: "Rotas de refúgio e vitória nas batalhas de Israel." } },

    // Salomão
    { character: "Salomão (Reis)", type: "Feature", geometry: { type: "Point", coordinates: [35.2345, 31.7770] }, properties: { name: "Jerusalém", category: "Capital", desc: "Construção do Primeiro Templo." } },
    { character: "Salomão (Reis)", type: "Feature", geometry: { type: "Point", coordinates: [34.9667, 32.8833] }, properties: { name: "Fenícia (Tiro)", category: "Comércio", desc: "Madeira de cedro do Líbano enviada por Hirão." } },
    { character: "Salomão (Reis)", type: "Feature", geometry: { type: "Point", coordinates: [34.9500, 29.5500] }, properties: { name: "Eziom-Geber", category: "Porto", desc: "Frota naval de Salomão no Mar Vermelho." } },
    { character: "Salomão (Reis)", type: "Feature", geometry: { type: "LineString", coordinates: [ [35.2345, 31.7770], [34.9667, 32.8833] ] }, properties: { name: "Associação Fenícia", category: "Rota", desc: "Rotas de exportação do Norte." } },
    { character: "Salomão (Reis)", type: "Feature", geometry: { type: "LineString", coordinates: [ [35.2345, 31.7770], [34.9500, 29.5500] ] }, properties: { name: "Rotas Navais (Ofir)", category: "Rota", desc: "Acesso ao Mar Vermelho e comércio marítimo." } },

    // Rainha Ester
    { character: "Rainha Ester (Ester)", type: "Feature", geometry: { type: "Point", coordinates: [48.243, 32.189] }, properties: { name: "Susã (Shushan)", category: "Capital", desc: "Capital do Império Persa, onde a Rainha Ester salvou os judeus de Hamã." } },

    // Abraão
    { character: "Abraão (Gênesis)", type: "Feature", geometry: { type: "Point", coordinates: [46.107, 30.957] }, properties: { name: "Ur dos Caldeus", category: "Origem", desc: "A jornada de fé sai de Ur dos Caldeus para Canaã (a Terra Prometida)." } },
    { character: "Abraão (Gênesis)", type: "Feature", geometry: { type: "Point", coordinates: [35.22, 31.52] }, properties: { name: "Canaã", category: "Promessa", desc: "A Terra Prometida onde ele mostrou obediência total." } },

    // Jacó
    { character: "Jacó (Gênesis)", type: "Feature", geometry: { type: "Point", coordinates: [38.995, 36.87] }, properties: { name: "Harã", category: "Fuga e Retorno", desc: "A jornada de fuga de Jacó para Harã e retorno a Canaã." } },
    { character: "Jacó (Gênesis)", type: "Feature", geometry: { type: "Point", coordinates: [35.73, 32.18] }, properties: { name: "Peniel", category: "Transformação", desc: "Onde lutou com Deus e mudou de nome para Israel." } },

    // José
    { character: "José (Gênesis)", type: "Feature", geometry: { type: "Point", coordinates: [31.2333, 30.0333] }, properties: { name: "Egito", category: "Governador", desc: "Da escravidão no Egito até se tornar governador e provedor." } },

    // Rute
    { character: "Rute (Rute)", type: "Feature", geometry: { type: "Point", coordinates: [35.733, 31.533] }, properties: { name: "Moabe", category: "Origem", desc: "Deixou Moabe para trás." } },
    { character: "Rute (Rute)", type: "Feature", geometry: { type: "Point", coordinates: [35.2076, 31.7054] }, properties: { name: "Belém", category: "Destino", desc: "Seguiu a Deus em Israel com Noemi, integrando-se na linhagem messiânica." } },

    // Jonas
    { character: "Jonas (Jonas)", type: "Feature", geometry: { type: "Point", coordinates: [43.15, 36.36] }, properties: { name: "Nínive", category: "Pregação", desc: "A jornada de desobediência e arrependimento até a grande cidade." } },

    // Maria
    { character: "Maria (Evangelhos)", type: "Feature", geometry: { type: "Point", coordinates: [35.2982, 32.7019] }, properties: { name: "Nazaré", category: "Anunciação", desc: "Ponto de partida da jornada de fé e submissão." } },
    { character: "Maria (Evangelhos)", type: "Feature", geometry: { type: "Point", coordinates: [35.15, 31.65] }, properties: { name: "Ein Karem", category: "Magnificat", desc: "A visita de Maria à sua prima Isabel em Região Montanhosa de Judá." } },

    // Paulo
    { character: "Paulo (Atos)", type: "Feature", geometry: { type: "Point", coordinates: [36.29, 33.51] }, properties: { name: "Damasco", category: "Conversão", desc: "Caminho onde Paulo se encontrou com o Cristo Ressurreto." } },
    { character: "Paulo (Atos)", type: "Feature", geometry: { type: "Point", coordinates: [12.49, 41.90] }, properties: { name: "Roma", category: "Missão Final", desc: "Conclusão das viagens missionárias pelo Império Romano." } },

    // Pedro
    { character: "Pedro (Evangelhos/Atos)", type: "Feature", geometry: { type: "Point", coordinates: [35.5684, 32.7963] }, properties: { name: "Mar da Galileia", category: "Chamado", desc: "O local onde foi pescado para ser pescador de homens." } },
    { character: "Pedro (Evangelhos/Atos)", type: "Feature", geometry: { type: "Point", coordinates: [35.2345, 31.7770] }, properties: { name: "Jerusalém (Pentecostes)", category: "Liderança", desc: "A jornada de superação e liderança na igreja primitiva." } }
];

const characterInputObj = Inputs.select([
  "Todas as Jornadas", "Adão e Eva (Gênesis)", "Noé (Gênesis)", "Abraão (Gênesis)", "Jacó (Gênesis)", "José (Gênesis)", "Moisés (Êxodo)", "Rute (Rute)", "Davi (Samuel)", "Salomão (Reis)", "Rainha Ester (Ester)", "Jonas (Jonas)", "Maria (Evangelhos)", "Jesus (Evangelhos)", "Pedro (Evangelhos/Atos)", "Paulo (Atos)"
], {label: ""});
const selectedCharacter = Generators.input(characterInputObj);
const characterInputView = characterInputObj;
```

```js
const filteredFeatures = selectedCharacter === "Todas as Jornadas" 
  ? sampleGeoData 
  : sampleGeoData.filter(d => d.character === selectedCharacter);

const featureCollection = { type: "FeatureCollection", features: filteredFeatures };

const mapContainer = document.getElementById("biblical-map");

if (mapContainer) {
  if (!mapContainer._leaflet_id) {
    mapContainer.mapInstance = L.map(mapContainer).setView([31.7770, 35.2345], 7);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(mapContainer.mapInstance);
  }
  
  if (mapContainer.geojsonLayer) {
    mapContainer.mapInstance.removeLayer(mapContainer.geojsonLayer);
  }

  mapContainer.geojsonLayer = L.geoJSON(featureCollection, {
    pointToLayer: function (feature, latlng) {
      const isImportant = feature.properties.category === "Capital" || feature.properties.category === "Aliança";
      return L.circleMarker(latlng, {
        radius: isImportant ? 12 : 8,
        fillColor: isImportant ? "#bae6fd" : "#38bdf8",
        color: "#fff", weight: 2, opacity: 1, fillOpacity: 0.8
      });
    },
    style: function(feature) {
      if (feature.geometry.type === "LineString") {
        return { color: "#0ea5e9", weight: 3, dashArray: "5, 10", opacity: 0.7 };
      }
    },
    onEachFeature: function (feature, layer) {
      const popupContent = "<div style=\"font-family: 'Inter', sans-serif; background: #0f172a; color: #f8fafc; margin: -14px; padding: 15px; border-radius: 8px; border: 1px solid #1e293b;\">" +
          "<h3 style=\"margin: 0 0 5px 0; font-weight: 900; color: #38bdf8; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;\">" +
            feature.properties.name +
          "</h3>" +
          "<span style=\"display: inline-block; padding: 2px 6px; background: #0c4a6e; border-radius: 4px; font-size: 0.6rem; font-weight: bold; color: #bae6fd; margin-bottom: 8px;\">" +
            feature.properties.category +
          "</span>" +
          "<p style=\"margin: 0; font-size: 0.8rem; color: #94a3b8; line-height: 1.5;\">" +
            feature.properties.desc +
          "</p>" +
        "</div>";
      layer.bindPopup(popupContent, { className: 'dark-popup', closeButton: false });
    }
  }).addTo(mapContainer.mapInstance);
  
  if (selectedCharacter === "Moisés (Êxodo)") {
      mapContainer.mapInstance.flyTo([30.5, 33.5], 6, { duration: 1.5 });
  } else if (selectedCharacter === "Jesus (Evangelhos)") {
      mapContainer.mapInstance.flyTo([32.0, 35.3], 8, { duration: 1.5 });
  } else if (selectedCharacter === "Adão e Eva (Gênesis)") {
      mapContainer.mapInstance.flyTo([31.5, 43.5], 6, { duration: 1.5 });
  } else if (selectedCharacter === "Noé (Gênesis)") {
      mapContainer.mapInstance.flyTo([39.7, 44.3], 7, { duration: 1.5 });
  } else if (selectedCharacter === "Rainha Ester (Ester)") {
      mapContainer.mapInstance.flyTo([32.1, 48.2], 7, { duration: 1.5 });
  } else if (selectedCharacter === "Abraão (Gênesis)") {
      mapContainer.mapInstance.flyTo([32.5, 40.5], 5, { duration: 1.5 });
  } else if (selectedCharacter === "Jacó (Gênesis)") {
      mapContainer.mapInstance.flyTo([34.5, 37.0], 6, { duration: 1.5 });
  } else if (selectedCharacter === "José (Gênesis)") {
      mapContainer.mapInstance.flyTo([30.0, 31.2], 7, { duration: 1.5 });
  } else if (selectedCharacter === "Rute (Rute)") {
      mapContainer.mapInstance.flyTo([31.6, 35.4], 9, { duration: 1.5 });
  } else if (selectedCharacter === "Jonas (Jonas)") {
      mapContainer.mapInstance.flyTo([36.3, 43.1], 7, { duration: 1.5 });
  } else if (selectedCharacter === "Maria (Evangelhos)") {
      mapContainer.mapInstance.flyTo([32.1, 35.2], 8, { duration: 1.5 });
  } else if (selectedCharacter === "Paulo (Atos)") {
      mapContainer.mapInstance.flyTo([38.0, 25.0], 5, { duration: 1.5 });
  } else if (selectedCharacter === "Pedro (Evangelhos/Atos)") {
      mapContainer.mapInstance.flyTo([32.0, 35.4], 8, { duration: 1.5 });
  } else {
      mapContainer.mapInstance.flyTo([34.0, 39.0], 5, { duration: 1.5 }); // Macro-região geral para visualizar Tudo
  }

  setTimeout(() => mapContainer.mapInstance.invalidateSize(), 150);
}
```

<style>
/* Reset nos Popups do Leaflet que por padrão são brancos */
.leaflet-popup-content-wrapper {
  background: transparent !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
  border-radius: 8px !important;
  padding: 0 !important;
  overflow: hidden;
}
.leaflet-popup-tip {
  background: #0f172a !important;
  border: 1px solid #1e293b;
  border-top: none;
  border-left: none;
}
.leaflet-bar a {
  background-color: #0f172a !important;
  color: #38bdf8 !important;
  border-bottom: 1px solid #1e293b !important;
}
.leaflet-bar a:hover {
  background-color: #1e293b !important;
}
.leaflet-control-attribution {
  background: rgba(15, 23, 42, 0.7) !important;
  color: #64748b !important;
}
.leaflet-control-attribution a {
  color: #38bdf8 !important;
}
</style>
