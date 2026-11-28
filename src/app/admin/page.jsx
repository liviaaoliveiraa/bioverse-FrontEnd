import { ArrowRight, BookOpen, FileText, Newspaper, Users } from 'lucide-react';
import Link from 'next/link';
import { requireAdmin } from '../lib/auth.js';
import { listarNoticiasAdmin } from './noticias/actions.js';
import styles from './admin.module.css';

function extrairNoticias(resposta) {
    if (Array.isArray(resposta)) return resposta;
    if (Array.isArray(resposta?.noticias)) return resposta.noticias;
    throw new Error('A API retornou uma lista de notícias em formato inválido.');
}

function formatarData(valor) {
    if (!valor || !Number.isFinite(Date.parse(valor))) return 'Data indisponível';
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(valor));
}

function publicado(noticia) {
    return Boolean(noticia.publicado ?? noticia.publicada ?? noticia.status === 'publicada');
}

export default async function AdminPage() {
    await requireAdmin();

    let noticias = [];
    let erroNoticias = '';
    try {
        noticias = extrairNoticias(await listarNoticiasAdmin());
    } catch (erro) {
        erroNoticias = erro instanceof Error ? erro.message : 'Não foi possível carregar as notícias.';
    }

    const recentes = [...noticias]
        .sort((a, b) => Date.parse(b.data || 0) - Date.parse(a.data || 0))
        .slice(0, 5);
    const estatisticas = [
        { label: 'Notícias cadastradas', value: erroNoticias ? '—' : noticias.length, Icon: Newspaper, note: 'Total registrado no portal' },
        { label: 'Matérias', value: '—', Icon: BookOpen, note: 'Aguardando endpoint da API' },
        { label: 'Conteúdos publicados', value: '—', Icon: FileText, note: 'Aguardando endpoint da API' },
        { label: 'Usuários cadastrados', value: '—', Icon: Users, note: 'Cadastro de alunos não integrado' },
    ];

    return (
        <>
            <div className={styles.pageHeading}>
                <div>
                    <h1>Visão geral</h1>
                    <p>Acompanhe os principais indicadores do BioVerse.</p>
                </div>
                <Link className={styles.primaryButton} href="/admin/noticias/nova">Cadastrar notícia <ArrowRight size={16} /></Link>
            </div>

            {erroNoticias && <div className={styles.errorState} role="alert">Não foi possível carregar os dados das notícias. {erroNoticias}</div>}

            <section className={styles.statsGrid} aria-label="Resumo do portal">
                {estatisticas.map(({ label, value, Icon, note }) => (
                    <article className={styles.statCard} key={label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#648170' }}>
                            <span className={styles.statLabel}>{label}</span>
                            <Icon size={18} aria-hidden="true" />
                        </div>
                        <div className={styles.statValue}>{value}</div>
                        <div className={styles.statFootnote}>{note}</div>
                    </article>
                ))}
            </section>

            <section className={styles.panel}>
                <div className={styles.panelHeading}>
                    <h2>Notícias recentes</h2>
                    <Link className={styles.textLink} href="/admin/noticias">Ver todas <ArrowRight size={14} /></Link>
                </div>
                {recentes.length ? recentes.map((noticia) => (
                    <div className={styles.recentRow} key={noticia.id}>
                        <span className={styles.recentTitle}>{noticia.titulo}</span>
                        <span className={styles.mutedText}>{formatarData(noticia.data)}</span>
                        <span className={`${styles.statusBadge} ${!publicado(noticia) ? styles.statusDraft : ''}`}>{publicado(noticia) ? 'Publicada' : 'Rascunho'}</span>
                    </div>
                )) : !erroNoticias && <p className={styles.emptyState}>Cadastre a primeira notícia do portal para começar.</p>}
            </section>
        </>
    );
}
