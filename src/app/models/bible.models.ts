// ============================================================
// Interfaces TypeScript – ABíbliaDigital API
// Base URL: https://www.abibliadigital.com.br/api
// ============================================================

/** Versões disponíveis na ABíbliaDigital */
export type BibleVersionSlug =
    | 'nvi'   // Nova Versão Internacional (próxima da Ave-Maria)
    | 'ra'    // Revista e Atualizada (João Ferreira de Almeida)
    | 'acf'   // Almeida Corrigida e Fiel
    | 'am'    // Ave Maria (Local)
    | 'kjv'   // King James Version (Inglês)
    | 'bbe'   // Bible in Basic English
    | 'rvr'   // Reina-Valera (Espanhol)
    | 'apee'  // Português de Portugal
    | 'bj';   // Bíblia de Jerusalém (slug confirmado)

/** Mapeamento de slugs com labels amigáveis */
export const BIBLE_VERSIONS: { slug: BibleVersionSlug; label: string; tradition: string }[] = [
    { slug: 'nvi', label: 'Nova Versão Internacional', tradition: 'Interconfessional (próx. Ave-Maria)' },
    { slug: 'ra', label: 'Revista e Atualizada', tradition: 'Protestante/Evangélica' },
    { slug: 'acf', label: 'Almeida Corrigida e Fiel', tradition: 'Protestante' },
    { slug: 'am', label: 'Ave Maria (Local)', tradition: 'Católica' },
    { slug: 'apee', label: 'Portuguesa (APEE)', tradition: 'Católica Portugal' },
    { slug: 'bj', label: 'Bíblia de Jerusalém', tradition: 'Católica' },
    { slug: 'kjv', label: 'King James Version', tradition: 'Inglês' },
    { slug: 'bbe', label: 'Bible in Basic English', tradition: 'Inglês' },
    { slug: 'rvr', label: 'Reina-Valera', tradition: 'Espanhol' },
];

// ─── Livro ───────────────────────────────────────────────────
export interface Book {
    abbrev: { pt: string; en: string };
    author: string;
    chapters: number;
    comment: string;
    group: string;
    name: string;
    testament: 'VT' | 'NT';
}

// ─── Versículo ───────────────────────────────────────────────
export interface Verse {
    book: { abbrev: { pt: string; en: string }; name: string; author: string; group: string };
    chapter: number;
    number: number;
    text: string;
    version?: string;
}

// ─── Capítulo ────────────────────────────────────────────────
export interface Chapter {
    book: { abbrev: { pt: string; en: string }; name: string; author: string; group: string };
    chapter: { number: number; verses: number };
    verses: Verse[];
    version?: string;
}

// ─── Busca ───────────────────────────────────────────────────
export interface SearchResult {
    occurrence: number;
    version: string;
    verses: Verse[];
}

// ─── Versão da Bíblia ────────────────────────────────────────
export interface BibleVersion {
    slug: BibleVersionSlug;
    label: string;
    tradition: string;
}

// ─── Requisições e estados de UI ─────────────────────────────
export interface BibleState {
    selectedVersion: BibleVersionSlug;
    selectedBook: Book | null;
    selectedChapter: number;
    books: Book[];
    verses: Verse[];
    searchResults: SearchResult | null;
    loading: boolean;
    error: string | null;
}
