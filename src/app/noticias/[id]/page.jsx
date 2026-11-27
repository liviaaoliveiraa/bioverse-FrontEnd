import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buscarNoticias } from '../../lib/noticias.js';
import styles from './noticia.module.css';

export default async function NoticiaPage({ params }) {
    const { id } = await params;
    const noticias = await buscarNoticias();
    const noticia = noticias.find((item) => String(item.id) === id);

    if (!noticia) {
        notFound();
    }

    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(noticia.data));
    const conteudo =
        typeof noticia.conteudo_completo === 'string'
            ? noticia.conteudo_completo
            : noticia.resumo;
    const fonte =
        typeof noticia.fonte === 'string' &&
        /^https?:\/\//i.test(noticia.fonte)
            ? noticia.fonte
            : null;

    return (
        <main className={styles.pagina}>
            <article className={styles.noticia}>
                <Link href="/noticias" className={styles.voltar}>
                    ← Todas as notícias
                </Link>
                <Image
                    src={noticia.img}
                    alt={noticia.titulo}
                    width={1200}
                    height={675}
                    unoptimized
                    className={styles.imagem}
                />
                <p className={styles.data}>{dataFormatada}</p>
                <h1>{noticia.titulo}</h1>
                <p className={styles.conteudo}>{conteudo}</p>
                {fonte && (
                    <section
                        className={styles.fontes}
                        aria-labelledby="fontes-titulo"
                    >
                        <h2 id="fontes-titulo">Fontes</h2>
                        <ul>
                            <li>
                                <a
                                    href={fonte}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {fonte}
                                </a>
                            </li>
                        </ul>
                    </section>
                )}
            </article>
        </main>
    );
}
