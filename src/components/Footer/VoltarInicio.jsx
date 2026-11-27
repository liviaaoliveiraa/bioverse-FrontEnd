'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function VoltarInicio() {
    const pathname = usePathname();

    if (pathname === '/') {
        return (
            <button
                type="button"
                className={styles.homeButton}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                Voltar para o início
            </button>
        );
    }

    return (
        <Link href="/#top" className={styles.homeButton}>
            Voltar para o início
        </Link>
    );
}
