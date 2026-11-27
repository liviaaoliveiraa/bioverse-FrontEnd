import { requireAdmin } from '../../../lib/auth.js';
import NoticiaForm from '../NoticiaForm.jsx';
import styles from '../../admin.module.css';

export default async function NovaNoticiaPage() {
    await requireAdmin();

    return <>
        <div className={styles.pageHeading}>
            <div>
                <h1>Nova notícia</h1>
                <p>Preencha os dados para publicar uma notícia no BioVerse.</p>
            </div>
        </div>
        <NoticiaForm />
    </>;
}
