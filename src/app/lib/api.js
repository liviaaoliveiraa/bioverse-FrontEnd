import 'server-only';

const API_BASE_URL = (
    process.env.API_URL || 'https://bioverse-back.onrender.com/api'
).replace(/\/+$/, '');

export async function chamarApi(caminho, opcoes = {}) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error('A variável de ambiente API_KEY não está configurada.');
    }

    const headers = new Headers(opcoes.headers);
    headers.set('x-api-key', apiKey);

    const resposta = await fetch(`${API_BASE_URL}${caminho}`, {
        ...opcoes,
        headers,
    });

    if (!resposta.ok) {
        throw new Error(`Falha na API do BioVerse: HTTP ${resposta.status}`);
    }

    return resposta.status === 204 ? null : resposta.json();
}
