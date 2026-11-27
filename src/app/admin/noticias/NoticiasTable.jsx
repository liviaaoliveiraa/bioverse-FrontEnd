'use client';

import { useMemo, useState, useTransition } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { excluirNoticia } from './actions.js';
import styles from '../admin.module.css';

function publicada(noticia) {
    return Boolean(noticia.publicado ?? noticia.publicada ?? noticia.status === 'publicada');
}

function dataLegivel(data) {
    if (!data || !Number.isFinite(Date.parse(data))) return '—';
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(data));
}

export default function NoticiasTable({ noticias }) {
    const router = useRouter();
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('todas');
    const [excluindo, iniciarTransicao] = useTransition();

    const filtradas = useMemo(() => noticias.filter((noticia) => {
        const correspondeTitulo = (noticia.titulo || '').toLocaleLowerCase('pt-BR').includes(busca.toLocaleLowerCase('pt-BR'));
        const correspondeStatus = filtro === 'todas' || publicada(noticia) === (filtro === 'publicadas');
        return correspondeTitulo && correspondeStatus;
    }), [noticias, busca, filtro]);

    function excluir(id, titulo) {
        if (!window.confirm(`Tem certeza que deseja excluir "${titulo}"? Essa ação não pode ser desfeita.`)) return;
        iniciarTransicao(async () => {
            try {
                await excluirNoticia(id);
                toast.success('Notícia excluída.');
                router.refresh();
            } catch (erro) {
                toast.error(erro instanceof Error ? erro.message : 'Não foi possível excluir a notícia.');
            }
        });
    }

    return (
        <section className={styles.panel}>
            <div className={styles.toolbar}>
                <input
                    className={styles.searchInput}
                    type="search"
                    placeholder="Buscar por título..."
                    aria-label="Buscar notícias por título"
                    value={busca}
                    onChange={(evento) => setBusca(evento.target.value)}
                />
                <select className={styles.filterSelect} aria-label="Filtrar por status" value={filtro} onChange={(evento) => setFiltro(evento.target.value)}>
                    <option value="todas">Todos os status</option>
                    <option value="publicadas">Publicadas</option>
                    <option value="rascunhos">Rascunhos</option>
                </select>
                <Link href="/admin/noticias/nova" className={styles.primaryButton} style={{ marginLeft: 'auto' }}>
                    <Plus size={17} /> Cadastrar notícia
                </Link>
            </div>
            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Notícia</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th aria-label="Ações" />
                        </tr>
                    </thead>
                    <tbody>
                        {filtradas.map((noticia) => (
                            <tr key={noticia.id}>
                                <td>
                                    <div className={styles.tableTitle}>
                                        {noticia.img
                                            ? <img className={styles.newsThumb} src={noticia.img} alt="" />
                                            : <span className={styles.newsThumb} aria-hidden="true" />}
                                        <span>{noticia.titulo}</span>
                                    </div>
                                </td>
                                <td>{dataLegivel(noticia.data)}</td>
                                <td><span className={`${styles.statusBadge} ${!publicada(noticia) ? styles.statusDraft : ''}`}>{publicada(noticia) ? 'Publicada' : 'Rascunho'}</span></td>
                                <td>
                                    <div className={styles.actions}>
                                        <Link href={`/admin/noticias/${noticia.id}`} className={styles.iconAction} aria-label={`Editar ${noticia.titulo}`} title="Editar">
                                            <Pencil size={16} />
                                        </Link>
                                        <button className={styles.iconAction} type="button" disabled={excluindo} onClick={() => excluir(noticia.id, noticia.titulo)} aria-label={`Excluir ${noticia.titulo}`} title="Excluir">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtradas.length === 0 && <p className={styles.emptyState}>{noticias.length ? 'Nenhuma notícia corresponde à busca ou ao filtro.' : 'Ainda não há notícias cadastradas.'}</p>}
            </div>
        </section>
    );
}
