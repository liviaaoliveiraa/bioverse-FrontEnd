import Link from 'next/link';
import { requireAdmin } from '../lib/auth.js';

export default async function AdminPage() {
    await requireAdmin();
    return (
        <main>
            <h1>Painel administrativo</h1>
            <Link href="/admin/noticias">Gerenciar notícias</Link>
        </main>
    );
}