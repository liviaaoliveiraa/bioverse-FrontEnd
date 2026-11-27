'use server';

import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { chamarApi as chamarApiBioVerse } from '../../lib/api.js';
import { requireAdmin } from '../../lib/auth.js';

function apiBaseUrl() {
    const url = process.env.API_URL;
    if (!url) {
        throw new Error('A variável API_URL não está configurada.');
    }
    return url.replace(/\/+$/, '');
}

async function chamarApi(caminho, metodo = 'GET', dados) {
    await requireAdmin();
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
        throw new Error('Não foi possível obter a sessão de autenticação.');
    }

    try {
        const resposta = await axios({
            url: `${apiBaseUrl()}${caminho}`,
            method: metodo,
            data: dados,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return resposta.data;
    } catch (erro) {
        if (axios.isAxiosError(erro)) {
            const detalhe = erro.response?.data?.message
                || erro.response?.data?.error
                || erro.message;
            throw new Error(`Falha na API (${erro.response?.status || 'sem resposta'}): ${detalhe}`);
        }
        throw erro;
    }
}

function validarNoticia(dados) {
    if (!dados || !dados.titulo?.trim() || !dados.resumo?.trim() || !dados.data) {
        throw new Error('Título, resumo e data de publicação são obrigatórios.');
    }
}

export async function listarNoticiasAdmin() {
    return chamarApi('/admin/noticias');
}

export async function buscarNoticiaAdmin(id) {
    if (!id) throw new Error('Identificador da notícia inválido.');
    return chamarApi(`/noticias/${encodeURIComponent(id)}`);
}

export async function criarNoticia(dados) {
    validarNoticia(dados);
    const noticia = await chamarApi('/noticias', 'POST', dados);
    revalidatePath('/admin');
    revalidatePath('/admin/noticias');
    revalidatePath('/');
    return noticia;
}

export async function editarNoticia(id, dados) {
    if (!id) throw new Error('Identificador da notícia inválido.');
    validarNoticia(dados);
    const noticia = await chamarApi(`/noticias/${encodeURIComponent(id)}`, 'PUT', dados);
    revalidatePath('/admin');
    revalidatePath('/admin/noticias');
    revalidatePath(`/admin/noticias/${id}`);
    revalidatePath('/');
    return noticia;
}

export async function excluirNoticia(id) {
    if (!id) throw new Error('Identificador da notícia inválido.');
    await chamarApi(`/noticias/${encodeURIComponent(id)}`, 'DELETE');
    revalidatePath('/admin');
    revalidatePath('/admin/noticias');
    revalidatePath('/');
}
