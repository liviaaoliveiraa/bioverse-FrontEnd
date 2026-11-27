import Image from 'next/image';
import { BookOpen, Briefcase, ClipboardCheck, Info } from 'lucide-react';
import logoBranca from '../assets/escrita-clara.png';
import CenarioSakura from '../components/CenarioSakura/CenarioSakura';
import CardMateria from '../components/CardMateria/CardMateria';
import styles from './page.module.css';

const acessos = [
    {
        icone: <BookOpen size={24} aria-hidden="true" />,
        titulo: 'Matérias',
        descricao: 'Explore conteúdos de Biologia para o ensino médio e vestibulares.',
        link: '/materias',
    },
    {
        icone: <ClipboardCheck size={24} aria-hidden="true" />,
        titulo: 'Simulado',
        descricao: 'Teste seus conhecimentos e treine para as provas.',
        link: '/simulado',
    },
    {
        icone: <Briefcase size={24} aria-hidden="true" />,
        titulo: 'Carreiras',
        descricao: 'Descubra caminhos profissionais ligados à Biologia.',
        link: '/carreiras',
    },
    {
        icone: <Info size={24} aria-hidden="true" />,
        titulo: 'Sobre nós',
        descricao: 'Conheça o projeto e a equipe por trás do BioVerse.',
        link: '/sobre',
    },
];

export default function Home() {
    return (
        <>
            <main className={styles.page}>
                <CenarioSakura />

                <div className={styles.conteudo}>
                    <Image
                        src={logoBranca}
                        alt="BioVerse"
                        className={styles.logo}
                        priority
                    />
                </div>

                <aside className={styles.apresentacao} aria-label="Apresentação do BioVerse">
                    <Image
                        src="/axoloti.gif"
                        alt="Axolote animado apresentando o site"
                        width={1000}
                        height={637}
                        unoptimized
                        className={styles.axolote}
                    />
                    <div className={styles.balao}>
                        <p>
                            Esse site nasceu para transformar os seus estudos em Biologia. Reunimos conteúdos
                            essenciais do ensino médio e vestibulares de um jeito simples, acolhedor e
                            direto ao ponto. Da menor célula aos maiores ecossistemas.
                        </p>
                    </div>
                </aside>
            </main>

            <section className={styles.acessos} aria-label="Acessos principais">
                <aside className={styles.apresentacaoSapo} aria-label="Orientação do sapo">
                    <div className={`${styles.balao} ${styles.balaoSapo}`}>
                        <p>
                            Acesse os cards abaixo para explorar os conteúdos e comece agora a sua jornada rumo à aprovação!
                        </p>
                    </div>
                    <Image
                        src="/frog.gif"
                        alt="Sapo animado indicando os cards de conteúdo"
                        width={300}
                        height={225}
                        unoptimized
                        className={styles.sapo}
                    />
                </aside>

                <div className={styles.gradeAcessos}>
                    {acessos.map((acesso) => (
                        <CardMateria key={acesso.link} {...acesso} />
                    ))}
                </div>
            </section>
        </>
    );
}