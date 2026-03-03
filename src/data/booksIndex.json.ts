import { readFileSync } from "fs";
import { join } from "path";

// Caminho para o índice de livros original
const INDEX_FILE = join(process.cwd(), "public/data/books_index.json");

function readBookIndex(): any[] {
    const rawData = readFileSync(INDEX_FILE, "utf-8");
    const books = JSON.parse(rawData);

    return books.map((b: any) => ({
        id: b.slug,
        nome: b.name,
        testamento: b.testament,
        chapters: b.chapters
    }));
}

process.stdout.write(JSON.stringify(readBookIndex()));
