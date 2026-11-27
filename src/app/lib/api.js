export const API_URL = (
    process.env.API_URL ?? 'https://bioverse-back.onrender.com/api'
).replace(/\/$/, '');

export function extrairLista(dados) {
    if (Array.isArray(dados)) return dados;
    if (Array.isArray(dados?.noticias)) return dados.noticias;
    return [];
}

export function extrairNoticia(dados) {
    return dados?.noticia ?? dados ?? null;
}

export function formatarData(data) {
    const valor = new Date(data);
    if (Number.isNaN(valor.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(valor);
}

export async function buscarNoticiasPublicas() {
    const res = await fetch(`${API_URL}/noticias`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Falha ao carregar notícias (${res.status})`);
    return extrairLista(await res.json());
}

export async function buscarNoticiaPublica(id) {
    const res = await fetch(`${API_URL}/noticias/${encodeURIComponent(id)}`, {
        cache: 'no-store',
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Falha ao carregar a notícia (${res.status})`);
    return extrairNoticia(await res.json());
}