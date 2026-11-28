import Link from "next/link";
import styles from "./CardNoticia.module.css";

export default function CardNoticia({ id, titulo, resumo, imagem, data }) {
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(data));

    return (
        <div className={styles.card}>
            <img
                src={imagem}
                alt={titulo}
                className={styles.imagem}
            />

            <div className={styles.conteudo}>
                <span className={`${styles.data} secondaryText`}>{dataFormatada}</span>

                <h3>{titulo}</h3>

                <p>{resumo}</p>

                <Link href={`/noticias/${id}`} className={styles.botao}>
                    Ler notícia
                </Link>
            </div>
        </div>
    );
}

export function CardNoticiaPlaceholder() {
    return (
        <article className={`${styles.card} ${styles.cardPlaceholder}`} aria-hidden="true">
            <div className={styles.placeholderImagem} />
            <div className={styles.conteudo}>
                <span className={`${styles.placeholderLinha} ${styles.placeholderData}`} />
                <span className={`${styles.placeholderLinha} ${styles.placeholderTitulo}`} />
                <div className={styles.placeholderResumo}>
                    <span className={styles.placeholderLinha} />
                    <span className={styles.placeholderLinha} />
                    <span className={styles.placeholderLinha} />
                </div>
            </div>
        </article>
    );
}
