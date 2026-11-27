import Image from 'next/image';
import CenarioSakura from '../../components/CenarioSakura/CenarioSakura';
import CardNoticia from '../../components/CardNoticia/CardNoticia';
import { buscarNoticias } from '../lib/noticias.js';
import styles from './noticias.module.css';

export default async function NoticiasPage() {
    const noticias = await buscarNoticias();

    return (
        <main className={styles.pagina}>
            <CenarioSakura preserveAspectRatio="xMidYMin meet" />
            <div className={styles.conteudo}>
                <h1 className={styles.titulo}>
                    <Image
                        src="/noticias.png"
                        alt="Notícias"
                        width={1590}
                        height={672}
                        priority
                        className={styles.logoNoticias}
                    />
                </h1>
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
            </div>
        </main>
    );
}
