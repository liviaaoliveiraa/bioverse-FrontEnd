import Link from 'next/link';
import { requireAdmin } from '../../lib/auth.js';

export default async function AdminNoticiasPage() {
    await requireAdmin();

    return (
        <main>
            <h1>Gerenciar notícias</h1>
            <Link href="/admin/noticias/nova">Cadastrar notícia</Link>
        </main>
    );
}
