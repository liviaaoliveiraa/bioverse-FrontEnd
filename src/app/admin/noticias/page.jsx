import Link from 'next/link';
import { requireAdmin } from '../../lib/auth.js';
import { listarNoticiasAdmin } from './actions.js';
import NoticiasTable from './NoticiasTable.jsx';
import styles from '../admin.module.css';

export default async function AdminNoticiasPage() {
    await requireAdmin();
    let noticias = [];
    let erro = '';

    try {
        const resposta = await listarNoticiasAdmin();
        noticias = Array.isArray(resposta) ? resposta : resposta?.noticias;
        if (!Array.isArray(noticias)) throw new Error('A API retornou uma lista em formato inválido.');
    } catch (falha) {
        erro = falha instanceof Error ? falha.message : 'Não foi possível carregar as notícias.';
    }

    return <>
        <div className={styles.pageHeading}>
            <div>
                <h1>Notícias</h1>
                <p>Gerencie publicações, rascunhos e atualizações do portal.</p>
            </div>
            <Link className={styles.primaryButton} href="/admin/noticias/nova">Cadastrar notícia</Link>
        </div>
        {erro
            ? <div className={styles.errorState} role="alert">Erro ao carregar notícias: {erro}</div>
            : <NoticiasTable noticias={noticias} />}
    </>;
}
