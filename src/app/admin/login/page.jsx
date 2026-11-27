import { SignIn } from '@clerk/nextjs';
import styles from '../admin.module.css';

export default function AdminLoginPage() {
    return (
        <main className={styles.loginPanel}>
            <div>
                <h1>Entrar no BioVerse</h1>
                <p>Acesse sua conta administrativa para continuar.</p>
            </div>
            <SignIn
                routing="hash"
                forceRedirectUrl="/admin"
                appearance={{
                    elements: {
                        rootBox: { width: '100%' },
                        card: { boxShadow: 'none', border: '0', width: '100%' },
                        footerAction: { display: 'none' },
                    },
                }}
            />
        </main>
    );
}
