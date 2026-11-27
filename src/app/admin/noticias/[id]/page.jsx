import { requireAdmin } from '../../../lib/auth.js';

export default async function EditarNoticiaPage() {
    await requireAdmin();

    return (
        <main>
            <h1>Editar notícia</h1>
        </main>
    );
}
