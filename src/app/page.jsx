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
        </main>
    );
}