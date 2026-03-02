import { Injectable } from '@angular/core';

export interface BibleFact {
    title: string;
    description: string;
    stat: string;
    icon: string;
}

@Injectable({ providedIn: 'root' })
export class BibleInsightService {
    private facts: BibleFact[] = [
        {
            title: 'Extensão de Salmos',
            description: 'Salmos é o livro mais longo da Bíblia, contendo 150 capítulos e a maior diversidade de vocabulário.',
            stat: '150 Cap.',
            icon: 'stats-chart-outline'
        },
        {
            title: 'Breve Mensagem',
            description: '2 João é o livro mais curto da Bíblia (em número de versículos), uma carta pessoal focada no amor e verdade.',
            stat: '13 Vers.',
            icon: 'mail-outline'
        },
        {
            title: 'O Centro da Bíblia',
            description: 'Estatisticamente, o Salmo 118:8 é frequentemente citado como o centro matemático da Bíblia King James.',
            stat: 'Centro',
            icon: 'locate-outline'
        },
        {
            title: 'Riqueza de Lucas',
            description: 'O Evangelho de Lucas possui o vocabulário grego mais rico e técnico entre os Evangelhos, indicando sua formação médica.',
            stat: 'Médico',
            icon: 'medical-outline'
        },
        {
            title: 'A Gênese dos Dados',
            description: 'Gênesis descreve as origens e contém as linhagens genealógicas mais extensas, um prato cheio para análise de redes.',
            stat: 'Origens',
            icon: 'git-branch-outline'
        }
    ];

    getRandomFact(): BibleFact {
        const index = Math.floor(Math.random() * this.facts.length);
        return this.facts[index];
    }
}
