import Image from 'next/image';
import { BookOpen, Briefcase, ClipboardCheck, Info } from 'lucide-react';
import logoBranca from '../assets/escrita-clara.png';
import CenarioSakura from '../components/CenarioSakura/CenarioSakura';
import CardMateria from '../components/CardMateria/CardMateria';
import CardNoticia from '../components/CardNoticia/CardNoticia';
import CarrosselNoticias from '../components/CardNoticia/CarrosselNoticias';
import { buscarNoticias } from './lib/noticias.js';
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

const NOTICIAS_API_URL = 'https://bioverse-back.onrender.com/api/noticias';

async function buscarNoticias() {
    const apiKey = process.env.API_KEY?.trim();
    if (!apiKey) {
        throw new Error('API_KEY não configurada. Defina essa variável no ambiente do servidor.');
    }

    const resposta = await fetch(NOTICIAS_API_URL, {
        headers: {
            'x-api-key': apiKey,
        },
        next: { revalidate: 300 },
    });

    if (!resposta.ok) {
        if (resposta.status === 401) {
            throw new Error('A API recusou a chave (401). Confira o valor de API_KEY no ambiente do servidor.');
        }
        throw new Error(`Falha ao carregar notícias: HTTP ${resposta.status}`);
    }

    const dados = await resposta.json();
    if (!dados || !Array.isArray(dados.noticias)) {
        throw new Error('A resposta da API de notícias está em um formato inválido.');
    }

    const primeirasNoticias = dados.noticias.slice(0, 4);
    const noticiasValidas = primeirasNoticias.every((noticia) => (
        noticia
        && (typeof noticia.id === 'number' || typeof noticia.id === 'string')
        && typeof noticia.titulo === 'string'
        && typeof noticia.resumo === 'string'
        && typeof noticia.img === 'string'
        && typeof noticia.data === 'string'
        && Number.isFinite(Date.parse(noticia.data))
    ));
}

export default async function Home() {
    let noticias = [];
    let erroNoticias = '';
    try {
        noticias = await buscarNoticias();
    } catch (erro) {
        console.error('Não foi possível carregar as notícias do BioVerse:', erro);
        erroNoticias = erro instanceof Error ? erro.message : 'Erro inesperado ao carregar notícias.';
    }

    return (
        <>
            <main id="top" className={styles.page}>
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
                            direto ao ponto. <strong>Da menor célula aos maiores ecossistemas!</strong>
                        </p>
                    </div>
                </aside>
            </main>

            <section className={styles.acessos} aria-label="Acessos principais">
                <div className={styles.gradeAcessos}>
                    {acessos.map((acesso) => (
                        <CardMateria key={acesso.link} {...acesso} />
                    ))}
                </div>

                <aside className={styles.apresentacaoSapo} aria-label="Orientação do sapo">
                    <div className={`${styles.balao} ${styles.balaoSapo}`}>
                        <p>
                            A Biologia não para de evoluir, e o que acontece hoje na ciência pode cair na sua próxima prova! Confira as notícias mais recentes da área e <strong>fique por dentro das principais descobertas.</strong>
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

                <section className={styles.noticias} aria-label="Notícias de Biologia">
                    <CarrosselNoticias
                        ariaLabel="Carrossel de notícias de Biologia"
                    >
                        {erroNoticias
                            ? <p className={styles.erroNoticias} role="alert">{erroNoticias}</p>
                            : noticias.length > 0
                                ? noticias.map((noticia) => (
                                    <CardNoticia
                                        key={noticia.id}
                                        id={noticia.id}
                                        titulo={noticia.titulo}
                                        resumo={noticia.resumo}
                                        imagem={noticia.img}
                                        data={noticia.data}
                                    />
                                ))
                                : <p className={styles.semNoticias}>Nenhuma notícia publicada no momento.</p>
                        }
                    </CarrosselNoticias>
                </section>
            </section>
        </>
    );
}