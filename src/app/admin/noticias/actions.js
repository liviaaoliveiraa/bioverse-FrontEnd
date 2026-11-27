'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { chamarApi as chamarApiBioVerse } from '../../lib/api.js';
import { requireAdmin } from '../../lib/auth.js';

function atualizarPaginasNoticias(id) {
    revalidatePath('/admin/noticias');
    revalidatePath('/');
    revalidatePath('/noticias');
    revalidatePath('/noticias/[id]', 'page');

    if (id !== undefined) {
        revalidatePath(`/noticias/${id}`);
    }
}

async function chamarApi(caminho, opcoes = {}) {
    await requireAdmin();

    const { getToken } = await auth();
    const token = await getToken();

    return chamarApiBioVerse(caminho, {
        ...opcoes,
        headers: {
            ...opcoes.headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });
}

export async function listarNoticiasAdmin() {
    return chamarApi('/admin/noticias');
}

export async function criarNoticia(dados) {
    const noticia = await chamarApi('/noticias', {
        method: 'POST',
        body: JSON.stringify(dados),
    });
    atualizarPaginasNoticias();
    return noticia;
}

export async function editarNoticia(id, dados) {
    const noticia = await chamarApi(`/noticias/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    });
    atualizarPaginasNoticias(id);
    return noticia;
}

export async function excluirNoticia(id) {
    await chamarApi(`/noticias/${id}`, { method: 'DELETE' });
    atualizarPaginasNoticias(id);
}