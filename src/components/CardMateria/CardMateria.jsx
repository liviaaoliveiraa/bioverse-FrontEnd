
import Link from "next/link";
import styles from "./CardMateria.module.css";

export default function CardMateria({ icone, titulo, descricao, link }) {
    return (
        <div className={styles.card}>
            <span className={styles.icone}>{icone}</span>

            <h3>{titulo}</h3>

            <p>{descricao}</p>

            <Link href={link} className={styles.botao}>
                Acessar conteúdo
            </Link>
        </div>
    );
}
