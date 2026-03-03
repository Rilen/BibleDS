// src/data/processData.json.ts
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { STOPWORDS_PT } from "./stopwords.js";

// Caminho para a pasta onde estão os JSONs originais importados da arquitetura anterior
const DATA_DIR = join(process.cwd(), "src/data/books");
const INDEX_FILE = join(process.cwd(), "public/data/books_index.json");

/**
 * Tokeniza o texto, remove pontuação e filtra stopwords.
 */
function tokenizarEFiltrar(texto: string): string[] {
    return texto
        .toLowerCase()
        .normalize("NFD") // Remove acentos
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{L}\p{N}\s]/gu, " ") // Troca pontuação por espaço
        .split(/\s+/)
        .filter(token => token.length > 1 && !STOPWORDS_PT.has(token));
}

function readBookData(): any[] {
    const rawIndex = readFileSync(INDEX_FILE, "utf-8");
    const indexData = JSON.parse(rawIndex);
    const indexMap = new Map();
    indexData.forEach((b: any) => indexMap.set(b.slug, b));

    const files = readdirSync(DATA_DIR).filter(f => f.endsWith(".json"));
    const bookMetrics = [];

    let totalRawWords = 0;
    let totalValidTokens = 0;

    for (const filename of files) {
        const slug = filename.replace(".json", "");
        const meta = indexMap.get(slug);

        if (!meta) continue;

        const rawData = readFileSync(join(DATA_DIR, filename), "utf-8");
        // file contains an array of chapters, where each chapter is an array of verse strings.
        const chapters: string[][] = JSON.parse(rawData);

        let allText = "";
        let totalVersesCount = 0;

        // Concatena todos os versículos em uma única string e conta
        for (const chapter of chapters) {
            totalVersesCount += chapter.length;
            for (const verse of chapter) {
                if (typeof verse === "string") {
                    allText += verse + " ";
                }
            }
        }

        // 1. Contagem Bruta (Aproximada por split de espaços)
        const rawWordCount = allText.split(/\s+/).length;
        totalRawWords += rawWordCount;

        // 2. Tokenização e Filtragem (NLP Leve)
        const tokens = tokenizarEFiltrar(allText);
        totalValidTokens += tokens.length;

        // 3. Vocabulário Único (Uso de Set para O(1))
        const uniqueTokens = new Set(tokens);
        const uniqueCount = uniqueTokens.size;

        // 4. Densidade Lexical
        const density = tokens.length > 0 ? (uniqueCount / tokens.length) * 100 : 0;

        // 5. Palavras / Versículo
        const avgWordsPerVerse = totalVersesCount > 0 ? (rawWordCount / totalVersesCount) : 0;

        bookMetrics.push({
            id: slug,
            nome: meta.name,
            testamento: meta.testament,
            rawWords: rawWordCount,
            totalVerses: totalVersesCount,
            wordsPerVerse: Number(avgWordsPerVerse.toFixed(2)),
            validTokens: tokens.length,
            uniqueWords: uniqueCount,
            density: Number(density.toFixed(2))
        });
    }

    return {
        summary: {
            totalBooks: bookMetrics.length,
            totalRawWords,
            totalValidTokens,
            overallDensity: totalValidTokens > 0 ? (bookMetrics.reduce((acc, b) => acc + b.uniqueWords, 0) / totalValidTokens) * 100 : 0
        },
        books: bookMetrics.sort((a, b) => {
            const indexA = indexData.findIndex((meta: any) => meta.slug === a.id);
            const indexB = indexData.findIndex((meta: any) => meta.slug === b.id);
            return indexA - indexB;
        })
    };
}

// Observable Framework Data Loaders exportam a saída enviando pra stdout
process.stdout.write(JSON.stringify(readBookData()));
