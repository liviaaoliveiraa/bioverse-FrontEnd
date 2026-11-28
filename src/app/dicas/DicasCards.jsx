'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './dicas.module.css';

const DICAS = [
    {
        titulo: 'Estude tentando lembrar, não só relendo',
        resumo: 'Feche o material e tente explicar o assunto com suas próprias palavras.',
        conteudo: [
            'Depois de estudar um tema, feche o livro ou as anotações e escreva tudo o que conseguir lembrar. Esse esforço de recuperar a informação ajuda a perceber o que você já entendeu e o que ainda precisa revisar.',
            'Em seguida, confira o material e complete o que faltou. Você também pode explicar o conteúdo em voz alta, como se estivesse ensinando alguém.',
        ],
    },
    {
        titulo: 'Revise em intervalos',
        resumo: 'Faça revisões curtas em dias diferentes para fortalecer a memória.',
        conteudo: [
            'Em vez de tentar revisar tudo de uma vez, retorne ao conteúdo em sessões curtas e espaçadas. Por exemplo, revise no dia seguinte, alguns dias depois e novamente na semana seguinte.',
            'Use perguntas ou cartões de estudo para testar o que lembra antes de consultar as respostas. Ajuste os intervalos conforme os assuntos que achar mais difíceis.',
        ],
    },
    {
        titulo: 'Desenhe processos e estruturas',
        resumo: 'Transforme etapas e estruturas da Biologia em esquemas com legendas.',
        conteudo: [
            'Desenhe estruturas como células e organelas ou processos como divisão celular e ciclos biogeoquímicos. O desenho não precisa ser artístico: o objetivo é organizar as relações e as etapas.',
            'Depois, tente refazer o esquema sem consultar suas anotações e acrescente legendas. Isso ajuda a identificar onde cada parte se encaixa no processo.',
        ],
    },
    {
        titulo: 'Compare conceitos parecidos',
        resumo: 'Use tabelas para distinguir termos que costumam ser confundidos.',
        conteudo: [
            'Monte uma tabela para comparar conceitos como mitose e meiose, células procariontes e eucariontes ou cadeia e teia alimentar.',
            'Escolha critérios claros para a comparação — função, etapas, resultado e exemplos — e escreva as diferenças com suas próprias palavras.',
        ],
    },
    {
        titulo: 'Conecte a matéria ao cotidiano',
        resumo: 'Relacione os conceitos biológicos a exemplos que você observa no dia a dia.',
        conteudo: [
            'Procure exemplos concretos para os temas estudados: fermentação na produção de alimentos, seleção natural em populações ou relações ecológicas em um jardim.',
            'Ao encontrar um exemplo, explique qual conceito ele representa e por quê. Fazer essa conexão torna mais fácil compreender e aplicar o conteúdo em questões novas.',
        ],
    },
    {
        titulo: 'Aprenda com as questões',
        resumo: 'Ao corrigir exercícios, descubra por que cada alternativa está certa ou errada.',
        conteudo: [
            'Depois de resolver uma questão, não pare ao conferir o gabarito. Explique por que a resposta correta faz sentido e identifique o erro de raciocínio nas alternativas incorretas.',
            'Anote os assuntos que precisam de revisão e volte a eles antes de tentar questões semelhantes. Assim, cada exercício vira uma oportunidade de entender melhor a matéria.',
        ],
    },
];

export default function DicasCards() {
    const [dicaAberta, setDicaAberta] = useState(null);
    const [popoutFechando, setPopoutFechando] = useState(false);
    const botaoFecharRef = useRef(null);
    const timerFechamentoRef = useRef(null);

    const fecharPopout = useCallback(() => {
        if (timerFechamentoRef.current !== null) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setDicaAberta(null);
            return;
        }

        setPopoutFechando(true);
        timerFechamentoRef.current = window.setTimeout(() => {
            timerFechamentoRef.current = null;
            setDicaAberta(null);
            setPopoutFechando(false);
        }, 180);
    }, []);

    useEffect(() => {
        if (!dicaAberta) return undefined;

        const elementoAnterior = document.activeElement;
        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        botaoFecharRef.current?.focus();

        const fecharComEscape = (event) => {
            if (event.key === 'Escape') fecharPopout();
        };
        window.addEventListener('keydown', fecharComEscape);

        return () => {
            document.body.style.overflow = overflowAnterior;
            window.removeEventListener('keydown', fecharComEscape);
            if (elementoAnterior instanceof HTMLElement) elementoAnterior.focus();
        };
    }, [dicaAberta, fecharPopout]);

    useEffect(() => () => {
        if (timerFechamentoRef.current !== null) {
            window.clearTimeout(timerFechamentoRef.current);
        }
    }, []);

    const popout = dicaAberta && createPortal(
        <div
            className={`${styles.popoutBackdrop} ${popoutFechando ? styles.popoutBackdropFechando : ''}`}
            onClick={(event) => {
                if (event.target === event.currentTarget) fecharPopout();
            }}
        >
            <section
                className={`${styles.popout} ${popoutFechando ? styles.popoutFechando : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dica-titulo"
                onKeyDown={(event) => {
                    if (event.key === 'Tab') {
                        event.preventDefault();
                        botaoFecharRef.current?.focus();
                    }
                }}
            >
                <button
                    ref={botaoFecharRef}
                    className={styles.botaoFechar}
                    type="button"
                    onClick={fecharPopout}
                    aria-label="Fechar dica"
                >
                    ×
                </button>
                <h2 id="dica-titulo">{dicaAberta.titulo}</h2>
                {dicaAberta.conteudo.map((paragrafo) => (
                    <p key={paragrafo}>{paragrafo}</p>
                ))}
            </section>
        </div>,
        document.body,
    );

    return (
        <>
            <section className={styles.gradeDicas} aria-label="Dicas de estudo">
                {DICAS.map((dica) => (
                    <article className={styles.cardDica} key={dica.titulo}>
                        <h2>{dica.titulo}</h2>
                        <p>{dica.resumo}</p>
                        <button
                            type="button"
                            className={styles.botaoDica}
                            onClick={() => {
                                setPopoutFechando(false);
                                setDicaAberta(dica);
                            }}
                        >
                            Ver dica
                        </button>
                    </article>
                ))}
            </section>
            {popout}
        </>
    );
}
