
import Link from "next/link";
import styles from "./CardNoticia.module.css";

export default function CardNoticia({ id, titulo, resumo, imagem, data }) {
    return (
        <div className={styles.card}>
            <img
                src={imagem}
                alt={titulo}
                className={styles.imagem}
            />

            <div className={styles.conteudo}>
                <span className={styles.data}>{data}</span>

                <h3>{titulo}</h3>

                <p>{resumo}</p>

                <Link href={`/noticias/${id}`} className={styles.botao}>
                    Ler notícia
                </Link>
            </div>
        </div>
    );
}
