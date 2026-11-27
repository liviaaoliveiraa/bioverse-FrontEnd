import Link from 'next/link';

export default function AcessoNegadoPage() {
    return (
        <main>
            <h1>Acesso negado</h1>
            <p>Você não tem permissão para acessar esta área.</p>
            <Link href="/">Voltar ao início</Link>
        </main>
    );
}