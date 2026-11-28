import Link from 'next/link';
import { ArrowRight, Lightbulb, Newspaper, Video } from 'lucide-react';
import CenarioSakura from '../../components/CenarioSakura/CenarioSakura';
import styles from './simulado.module.css';

const FORMATOS = [
  {
    href: '/dicas',
    icon: Lightbulb,
    title: 'Dicas',
    description: 'Confira dicas para estudar Biologia.',
  },
  {
    href: '/videos',
    icon: Video,
    title: 'Vídeos',
    description: 'Assista a vídeos sobre Biologia.',
  },
  {
    href: '/noticias',
    icon: Newspaper,
    title: 'Notícias',
    description: 'Acompanhe as novidades da Biologia.',
  },
];

export default function SimuladoPage() {
  return (
    <main className={styles.page}>
      <CenarioSakura />

      <div className={styles.content}>
        <section className={styles.intro} aria-labelledby="simulado-title">
          <span className={`${styles.kicker} secondaryText`}>SIMULADO BIOVERSE</span>
          <h1 id="simulado-title">Pronto para praticar?</h1>
          <p>Responda às perguntas e teste seus conhecimentos de biologia.</p>
          <Link href="/simulado/questoes" className={styles.primaryButton}>
            Começar simulado <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>

        <section className={styles.formats} id="formatos" aria-labelledby="formatos-title">
          <h2 id="formatos-title">Como você quer estudar?</h2>
          <div className={styles.formatList}>
            {FORMATOS.map(({ href, icon: Icon, title, description }) => {
              const content = (
                <>
                  <span className={styles.formatIcon}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className={styles.formatText}>
                    <strong>{title}</strong>
                    <span className="secondaryText">{description}</span>
                  </span>
                </>
              );

              return href ? (
                <Link href={href} key={title} className={styles.formatItem}>
                  {content}
                </Link>
              ) : (
                <article key={title} className={styles.formatItem}>
                  {content}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
