import { Show, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    return (
        <>
            <header>
                <nav aria-label="Navegação administrativa">
                    <Link href="/admin">Painel</Link>
                    {' | '}
                    <Link href="/admin/noticias">Notícias</Link>
                </nav>
                <Show when="signed-in">
                    <SignOutButton redirectUrl="/admin/login">
                        <button type="button">Sair</button>
                    </SignOutButton>
                </Show>
            </header>
            {children}
        </>
    );
}
