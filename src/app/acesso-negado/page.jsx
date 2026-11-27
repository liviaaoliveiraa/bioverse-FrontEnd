import Link from 'next/link';

export default function AcessoNegadoPage() {
    return (
        <main>
            <h1>Acesso negado</h1>
            <p>
                Sua conta não tem permissão para acessar a área administrativa.
            </p>
            <Link href="/admin/login">Voltar ao login administrativo</Link>
        </main>
    );
}
