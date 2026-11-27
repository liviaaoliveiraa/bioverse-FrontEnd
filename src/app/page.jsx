import Image from 'next/image';
import logoBranca from '../assets/escrita-clara.png';
import CenarioSakura from '../components/CenarioSakura/CenarioSakura';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.page}>
            <CenarioSakura />

            <div className={styles.conteudo}>
                <Image
                    src={logoBranca}
                    alt="BioVerse"
                    className={styles.logo}
                    priority
                />
            </div>

            <aside className={styles.apresentacao} aria-label="Apresentação do BioVerse">
                <Image
                    src="/axoloti.gif"
                    alt="Axolote animado apresentando o site"
                    width={1000}
                    height={637}
                    unoptimized
                    className={styles.axolote}
                />
                <div className={styles.balao}>
                    <p>
                        Esse site nasceu para transformar os seus estudos em Biologia. Reunimos conteúdos
                        essenciais do ensino médio e vestibulares de um jeito simples, acolhedor e
                        direto ao ponto. Da menor célula aos maiores ecossistemas.
                    </p>
                </div>
            </aside>
        </main>
    );
}