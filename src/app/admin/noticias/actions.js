'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../../lib/auth.js';

async function chamarApi(caminho, opcoes = {}) {
    await requireAdmin();

    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}${caminho}`, {
        ...opcoes,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Erro na API (${res.status})`);
    }

    return res.status === 204 ? null : res.json();
}

export async function listarNoticiasAdmin() {
    return chamarApi('/admin/noticias');
}

export async function criarNoticia(dados) {
    const noticia = await chamarApi('/noticias', {
        method: 'POST',
        body: JSON.stringify(dados),
    });
    revalidatePath('/admin/noticias');
    return noticia;
}

export async function editarNoticia(id, dados) {
    const noticia = await chamarApi(`/noticias/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    });
    revalidatePath('/admin/noticias');
    return noticia;
}

export async function excluirNoticia(id) {
    await chamarApi(`/noticias/${id}`, { method: 'DELETE' });
    revalidatePath('/admin/noticias');
}