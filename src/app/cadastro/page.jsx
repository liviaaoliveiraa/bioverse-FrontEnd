import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import CenarioSapo from '../../components/CenarioSapo/CenarioSapo';
import SapoPixel from '../../components/SapoPixel/SapoPixel';
import bioverseClerkAppearance from '../lib/clerkAppearance.js';
import styles from '../login/login.module.css';

export default function CadastroPage() {
    return (
        <main className={styles.loginPage}>
            <CenarioSapo />

            <div className={styles.conteudo}>
                <section className={styles.card}>
                    <div className={styles.sapoContainer}>
                        <SapoPixel />
                    </div>

                    <h1>Crie sua conta no BioVerse!</h1>
                    <p className={styles.subtitulo}>
                        Cadastre-se para continuar explorando
                        <br />o nosso universo!
                    </p>

                    <SignUp
                        routing="hash"
                        signInUrl="/login"
                        forceRedirectUrl="/"
                        appearance={bioverseClerkAppearance}
                    />

                    <p className={styles.cadastro}>
                        Já tem uma conta? <Link href="/login">Entrar</Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
