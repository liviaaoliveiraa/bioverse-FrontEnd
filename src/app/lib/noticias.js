import { chamarApi } from './api.js';

export async function buscarNoticias() {
    const dados = await chamarApi('/noticias', {
        next: { revalidate: 300 },
    });

    if (!dados || !Array.isArray(dados.noticias)) {
        throw new Error(
            'A resposta da API de notícias está em um formato inválido.',
        );
    }

    return dados.noticias;
}
