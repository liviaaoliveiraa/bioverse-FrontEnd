import { requireAdmin } from '../../../lib/auth.js';

export default async function NovaNoticiaPage() {
    await requireAdmin();

    return (
        <main>
            <h1>Nova notícia</h1>
        </main>
    );
}
