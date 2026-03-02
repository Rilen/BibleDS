/**
 * @description Central Data Warehouse for Biblical Metadata
 * High-seniority approach: Separating domain knowledge from processing logic.
 */

export const BIBLE_HISTORICAL_MAP: { [key: string]: [number, number] } = {
    'Gênesis': [-1440, -1400], 'Êxodo': [-1440, -1400], 'Levítico': [-1440, -1400],
    'Números': [-1440, -1400], 'Deuteronômio': [-1440, -1400],
    'I Samuel': [-1000, -900], 'II Samuel': [-1000, -900], 'I Reis': [-600, -560], 'II Reis': [-600, -560],
    'Salmos': [-1000, -400], 'Provérbios': [-950, -700], 'Isaías': [-740, -680], 'Jeremias': [-627, -580], 'Ezequiel': [-593, -570],
    'Mateus': [60, 85], 'Marcos': [55, 70], 'Lucas': [60, 85], 'João': [85, 95], 'Atos': [60, 85],
    'Romanos': [57, 58], 'Apocalipse': [95, 96]
};

export const NARRATIVE_ERAS = [
    { name: 'Idade do Bronze', startYear: -2000, endYear: -1200, color: '#f97316' },
    { name: 'Idade do Ferro', startYear: -1200, endYear: -586, color: '#94a3b8' },
    { name: 'P. Babilônico', startYear: -586, endYear: -538, color: '#22c55e' },
    { name: 'P. Persa', startYear: -538, endYear: -332, color: '#c2410c' },
    { name: 'P. Helenístico', startYear: -332, endYear: -167, color: '#3b82f6' },
    { name: 'P. Hasmoneu', startYear: -167, endYear: -63, color: '#eab308' },
    { name: 'P. Romano', startYear: -63, endYear: 100, color: '#ef4444' }
];

export const SENTIMENT_LEXICON = {
    pos: ['amor', 'paz', 'luz', 'vida', 'deus', 'senhor', 'cristo', 'filho', 'graça', 'esperança', 'justo', 'alegria', 'bênção'],
    neg: ['morte', 'guerra', 'sangue', 'pecado', 'trevas', 'mal', 'dor', 'tristeza', 'choro', 'fome', 'juízo', 'ira', 'castigo']
};

export const BIBLE_ENTITIES = {
    agents: ['deus', 'senhor', 'jesus', 'cristo', 'espírito', 'anjo', 'profeta', 'rei', 'sacerdote'],
    locations: ['céus', 'terra', 'egito', 'jerusalém', 'israel', 'éden', 'monte', 'mar', 'deserto'],
    objects: ['arca', 'templo', 'altar', 'tabernáculo', 'cruz']
};

export const GOVERNANCE_RULES = {
    commandments: ['amarás', 'honrarás', 'guardarás', 'não matarás', 'não furtarás', 'obedecerás'],
    integrity_constraints: ['lei', 'mandamento', 'estatuto', 'juízo', 'preceito', 'aliança', 'pacto']
};

export const THEMATIC_TOPICS = {
    love: ['amor', 'amou', 'caridade', 'benignidade', 'misericórdia'],
    justice: ['justiça', 'juízo', 'reto', 'lei', 'julgamento'],
    sin: ['pecado', 'maldade', 'iniquidade', 'transgressão', 'erro'],
    hope: ['esperança', 'promessa', 'futuro', 'fé', 'confiança']
};

export const ARCHAEOLOGICAL_MARKERS = [
    { event: 'Queda de Jerusalém', year: -586, confidence: 99 },
    { event: 'Exílio Babilônico', year: -538, confidence: 95 },
    { event: 'Construção do Segundo Templo', year: -515, confidence: 90 },
    { event: 'Domínio Romano', year: -63, confidence: 98 },
    { event: 'Inscrição de Tel Dan (Casa de Davi)', year: -840, confidence: 92 }
];

export const BIBLE_GEOGRAPHY = [
    { name: 'Jerusalém', verified: true, coords: '31.7683° N, 35.2137° E' },
    { name: 'Egito', verified: true, coords: '26.8206° N, 30.8025° E' },
    { name: 'Babilônia', verified: true, coords: '32.5355° N, 44.4275° E' },
    { name: 'Nazaré', verified: true, coords: '32.7019° N, 35.3033° E' },
    { name: 'Roma', verified: true, coords: '41.9028° N, 12.4964° E' }
];

export const HYPER_CONCEPTS = [
    { concept: 'Aliança', color: '#3b82f6', links: 450 },
    { concept: 'Reino', color: '#eab308', links: 380 },
    { concept: 'Graça', color: '#10b981', links: 290 },
    { concept: 'Sacerdócio', color: '#f97316', links: 150 }
];

export const CROSS_REFERENCES = [
    { source: 'Gênesis', target: 'Mateus', weight: 80 },
    { source: 'Salmos', target: 'Lucas', weight: 70 },
    { source: 'Isaías', target: 'João', weight: 90 },
    { source: 'Levítico', target: 'Hebreus', weight: 85 },
    { source: 'Êxodo', target: 'Apocalipse', weight: 60 },
    { source: 'Daniel', target: 'Apocalipse', weight: 95 }
];

export const BI_ACTIONABLE_INSIGHTS = [
    { title: 'Gestão de Crises', principle: 'Resiliência e Planejamento (Ex: José no Egito)', impact: 'Alto' },
    { title: 'Liderança Servidora', principle: 'Influência via Exemplo (Padrão Neemias)', impact: 'Crítico' },
    { title: 'Ética de Negócios', principle: 'Integridade em Pesos e Medidas (Provérbios)', impact: 'Operacional' },
    { title: 'Estratégia de Longo Prazo', principle: 'Visão além do Presente (Profetas)', impact: 'Estratégico' }
];

export const BIBLICAL_LIFESPANS = [
    { name: 'Adão', born: 0, died: 930, duration: 930 },
    { name: 'Sete', born: 130, died: 1042, duration: 912 },
    { name: 'Enos', born: 235, died: 1140, duration: 905 },
    { name: 'Cainã', born: 325, died: 1235, duration: 910 },
    { name: 'Maalalel', born: 395, died: 1290, duration: 895 },
    { name: 'Jarede', born: 460, died: 1422, duration: 962 },
    { name: 'Enoque', born: 622, died: 987, duration: 365 },
    { name: 'Matusalém', born: 687, died: 1656, duration: 969 },
    { name: 'Lameque', born: 874, died: 1651, duration: 777 },
    { name: 'Noé', born: 1056, died: 2006, duration: 950 },
    { name: 'Sem', born: 1558, died: 2158, duration: 600 },
    { name: 'Abraão', born: 2008, died: 2183, duration: 175 },
    { name: 'Isaque', born: 2108, died: 2288, duration: 180 },
    { name: 'Jacó', born: 2168, died: 2315, duration: 147 },
    { name: 'José', born: 2259, died: 2369, duration: 110 },
    { name: 'Moisés', born: 2433, died: 2553, duration: 120 }
];
