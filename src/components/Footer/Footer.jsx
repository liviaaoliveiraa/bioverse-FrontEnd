import styles from './Footer.module.css';
import Image from 'next/image';
import escritaImg from '../../assets/escrita-clara.png';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const imageSrc = 'https://i.pinimg.com/originals/0f/4d/17/0f4d17eae37409fcb841ed0322de29ae.gif';

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <a className={styles.logo} href="/">
                        <Image
                            className={styles.logoImg}
                            src={escritaImg}
                            alt="Bioverse"
                        />
                    </a>
                    <p>
                        Explore conteúdos e descubra mais sobre o universo da
                        biologia.
                    </p>
                </div>
                <div className={styles.imageContainer}>
                    {imageSrc ? (
                        <img
                            className={styles.image}
                            src={imageSrc}
                            alt="Imagem do Bioverse"
                        />
                    ) : (
                        <div className={styles.imagePlaceholder}>
                            Sua imagem aqui
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.bottom}>
                <p>© {currentYear} Bioverse. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}