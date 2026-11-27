import CenarioSapo from '../../components/CenarioSapo/CenarioSapo';
import styles from './materias.module.css';

export default function MateriasPage() {
    return (
        <main className={styles.materiasPage}>
            <CenarioSapo />
            <div className={styles.conteudo}></div>
        </main>
    );
}
