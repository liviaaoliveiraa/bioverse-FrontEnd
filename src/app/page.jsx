import Image from 'next/image';
import axoloteImg from '../assets/axolote.png';
import logoBranca from '../assets/escrita-clara.png';
import molduraImg from '../assets/moldura.png';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.page}>
            <section className={styles.container} aria-label="BioVerse">
                <Image
                    src={molduraImg}
                    alt=""
                    fill
                    aria-hidden="true"
                    className={styles.frame}
                    priority
                />
                <Image src={logoBranca} alt="BioVerse" className={styles.logo} />
            </section>
            <div className={styles.axolotl}>
                <div className={styles.sparkles} aria-hidden="true">
                    <span className={`${styles.sparkle} ${styles.sparkleOne}`}>✦</span>
                    <span className={`${styles.sparkle} ${styles.sparkleTwo}`}>✧</span>
                    <span className={`${styles.sparkle} ${styles.sparkleThree}`}>✦</span>
                    <span className={`${styles.sparkle} ${styles.sparkleFour}`}>✧</span>
                    <span className={`${styles.sparkle} ${styles.sparkleFive}`}>✦</span>
                    <span className={`${styles.sparkle} ${styles.sparkleSix}`}>✧</span>
                </div>
                <Image src={axoloteImg} alt="Axolote" className={styles.axolotlImage} />
            </div>
        </main>
    );
}
