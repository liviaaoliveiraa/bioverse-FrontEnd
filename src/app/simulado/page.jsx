import Link from 'next/link';
import { ArrowDown, ClipboardCheck, Leaf, Sparkles } from 'lucide-react';
import CenarioSakura from '../../components/CenarioSakura/CenarioSakura';
import styles from './simulado.module.css';

const FORMATOS = [
  {
    icon: ClipboardCheck,
    title: 'Simulado completo',
    description: 'Revise os principais conteúdos de biologia.',
  },
  {
    href: '/materias',
    icon: Leaf,
    title: 'Por matéria',
    description: 'Escolha um assunto para praticar.',
  },
  {
    icon: Sparkles,
    title: 'Revisão leve',
    description: 'Aprenda no seu ritmo, uma questão por vez.',
  },
];

export default function SimuladoPage() {
  return (
    <main className={styles.page}>
      <CenarioSakura />

      <div className={styles.content}>
        <section className={styles.intro} aria-labelledby="simulado-title">
          <span className={styles.kicker}>SIMULADO BIOVERSE</span>
          <h1 id="simulado-title">Pronto para praticar?</h1>
          <p>Escolha um formato e teste seus conhecimentos de biologia.</p>
          <Link href="#formatos" className={styles.primaryButton}>
            Ver opções <ArrowDown size={18} aria-hidden="true" />
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
                    <span>{description}</span>
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
