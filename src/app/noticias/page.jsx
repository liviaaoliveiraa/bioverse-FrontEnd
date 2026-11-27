import CardNoticia from '../../components/CardNoticia/CardNoticia';
import { buscarNoticias } from '../lib/noticias.js';
import styles from './noticias.module.css';

export default async function NoticiasPage() {
    const noticias = await buscarNoticias();

    return (
        <main className={styles.pagina}>
            <h1>Notícias</h1>
            <section className={styles.lista} aria-label="Todas as notícias">
                {noticias.map((noticia) => (
                    <CardNoticia
                        key={noticia.id}
                        id={noticia.id}
                        titulo={noticia.titulo}
                        resumo={noticia.resumo}
                        imagem={noticia.img}
                        data={noticia.data}
                    />
                ))}
            </section>
        </main>
    );
}
