import Image from 'next/image';
import CenarioSapo from '../../components/CenarioSapo/CenarioSapo';
import DicasCards from './DicasCards';
import styles from './dicas.module.css';

export default function DicasPage() {
  return (
    <main className={styles.pagina}>
      <CenarioSapo />
      <div className={styles.conteudo}>
        <h1 className={styles.titulo}>
          <Image
            src="/dicas.png"
            alt="Dicas"
            width={764}
            height={327}
            priority
            className={styles.logoDicas}
          />
        </h1>
        <DicasCards />
      </div>
    </main>
  );
}