'use client';

import { useState, useTransition } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { criarNoticia, editarNoticia } from './actions.js';
import styles from '../admin.module.css';

const valoresIniciais = {
    titulo: '',
    resumo: '',
    conteudo: '',
    img: '',
    categoria: '',
    autor: '',
    data: new Date().toISOString().slice(0, 10),
    publicado: false,
};

function textoData(valor) {
    if (!valor || !Number.isFinite(Date.parse(valor))) return '';
    return new Date(valor).toISOString().slice(0, 10);
}

export default function NoticiaForm({ noticia, id }) {
    const router = useRouter();
    const [valores, setValores] = useState({
        ...valoresIniciais,
        ...noticia,
        data: noticia ? textoData(noticia.data) : valoresIniciais.data,
        publicado: Boolean(noticia?.publicado ?? noticia?.publicada),
    });
    const [erro, setErro] = useState('');
    const [salvando, iniciarTransicao] = useTransition();

    function atualizar(evento) {
        const { name, value, type, checked } = evento.target;
        setValores((atuais) => ({ ...atuais, [name]: type === 'checkbox' ? checked : value }));
    }

    function enviar(evento) {
        evento.preventDefault();
        setErro('');

        if (!valores.titulo.trim() || !valores.resumo.trim() || !valores.data) {
            setErro('Preencha título, resumo e data de publicação.');
            return;
        }

        iniciarTransicao(async () => {
            try {
                if (id) {
                    await editarNoticia(id, valores);
                    toast.success('Notícia atualizada com sucesso.');
                } else {
                    await criarNoticia(valores);
                    toast.success('Notícia cadastrada com sucesso.');
                }
                router.push('/admin/noticias');
                router.refresh();
            } catch (falha) {
                const mensagem = falha instanceof Error ? falha.message : 'Não foi possível salvar a notícia.';
                setErro(mensagem);
                toast.error(mensagem);
            }
        });
    }

    return (
        <form className={`${styles.panel} ${styles.formPanel}`} onSubmit={enviar}>
            {erro && <p className={styles.formError} role="alert">{erro}</p>}
            <div className={styles.formGrid}>
                <label className={`${styles.formField} ${styles.formWide}`}>
                    Título *
                    <input className={styles.formInput} name="titulo" value={valores.titulo || ''} onChange={atualizar} required maxLength={180} />
                </label>
                <label className={`${styles.formField} ${styles.formWide}`}>
                    Resumo *
                    <textarea className={styles.formTextarea} name="resumo" value={valores.resumo || ''} onChange={atualizar} required maxLength={500} />
                </label>
                <label className={`${styles.formField} ${styles.formWide}`}>
                    Conteúdo completo
                    <textarea className={styles.formTextarea} name="conteudo" value={valores.conteudo || ''} onChange={atualizar} rows={8} />
                </label>
                <label className={`${styles.formField} ${styles.formWide}`}>
                    URL da imagem
                    <input className={styles.formInput} type="url" name="img" value={valores.img || ''} onChange={atualizar} placeholder="https://..." />
                </label>
                <label className={styles.formField}>
                    Categoria
                    <input className={styles.formInput} name="categoria" value={valores.categoria || ''} onChange={atualizar} />
                </label>
                <label className={styles.formField}>
                    Autor
                    <input className={styles.formInput} name="autor" value={valores.autor || ''} onChange={atualizar} />
                </label>
                <label className={styles.formField}>
                    Data de publicação *
                    <input className={styles.formInput} type="date" name="data" value={valores.data || ''} onChange={atualizar} required />
                </label>
                <label className={styles.formField}>
                    Status
                    <span>
                        <input type="checkbox" name="publicado" checked={Boolean(valores.publicado)} onChange={atualizar} /> Publicar notícia
                    </span>
                </label>
            </div>
            <div className={styles.formActions}>
                <button className={styles.primaryButton} type="submit" disabled={salvando}>
                    {salvando ? 'Salvando...' : 'Salvar notícia'}
                </button>
                <Link className={styles.secondaryButton} href="/admin/noticias">Cancelar</Link>
            </div>
        </form>
    );
}
