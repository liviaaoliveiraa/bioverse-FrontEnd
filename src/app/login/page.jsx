import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import CenarioSapo from '../../components/CenarioSapo/CenarioSapo';
import SapoPixel from '../../components/SapoPixel/SapoPixel';
import bioverseClerkAppearance from '../lib/clerkAppearance.js';
import styles from './login.module.css';

export default function Login() {
    return (
        <main className={styles.loginPage}>
            <CenarioSapo />

            <div className={styles.conteudo}>
                <section className={`${styles.card} ${styles.loginCard}`}>
                    <div className={styles.sapoContainer}>
                        <SapoPixel />
                    </div>

                    <h1>Bem-vindo ao BioVerse!</h1>

                    <p className={styles.subtitulo}>
                        Entre na sua conta para continuar explorando
                        <br />o nosso universo!
                    </p>

                    <SignIn
                        routing="hash"
                        signUpUrl="/cadastro"
                        forceRedirectUrl="/"
                        appearance={bioverseClerkAppearance}
                    />

                    <p className={styles.cadastro}>
                        Não tem uma conta?{' '}
                        <Link href="/cadastro">Cadastre-se</Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
