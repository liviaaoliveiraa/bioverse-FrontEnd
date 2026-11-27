import { requireAdmin } from '../../../lib/auth.js';
import { buscarNoticiaAdmin } from '../actions.js';
import NoticiaForm from '../NoticiaForm.jsx';
import styles from '../../admin.module.css';

export default async function EditarNoticiaPage({ params }) {
    await requireAdmin();
    const { id } = await params;
    let noticia;
    let erro = '';
    try {
        const resposta = await buscarNoticiaAdmin(id);
        noticia = resposta?.noticia || resposta;
        if (!noticia || String(noticia.id) !== String(id)) {
            throw new Error('A notícia solicitada não foi encontrada.');
        }
    } catch (falha) {
        erro = falha instanceof Error ? falha.message : 'Não foi possível carregar a notícia.';
    }

    return <>
        <div className={styles.pageHeading}>
            <div>
                <h1>Editar notícia</h1>
                <p>Atualize as informações da publicação.</p>
            </div>
        </div>
        {erro
            ? <div className={styles.errorState} role="alert">{erro}</div>
            : <NoticiaForm noticia={noticia} id={id} />}
    </>;
}
