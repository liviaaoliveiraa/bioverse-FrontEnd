'use client';

import { Children, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './CardNoticia.module.css';

export default function CarrosselNoticias({ titulo, ariaLabel, children }) {
    const trilhoRef = useRef(null);
    const quadroRef = useRef(null);
    const [podeVoltar, setPodeVoltar] = useState(false);
    const [podeAvancar, setPodeAvancar] = useState(false);
    const quantidadeItens = Children.count(children);

    useEffect(() => {
        const trilho = trilhoRef.current;
        if (!trilho) {
            return undefined;
        }

        const atualizarSetas = () => {
            setPodeVoltar(trilho.scrollLeft > 1);
            setPodeAvancar(trilho.scrollLeft + trilho.clientWidth < trilho.scrollWidth - 1);
        };

        const cancelarAnimacao = () => {
            if (quadroRef.current !== null) {
                cancelAnimationFrame(quadroRef.current);
                quadroRef.current = null;
            }
        };

        atualizarSetas();
        trilho.addEventListener('scroll', atualizarSetas, { passive: true });
        trilho.addEventListener('wheel', cancelarAnimacao, { passive: true });
        trilho.addEventListener('touchstart', cancelarAnimacao, { passive: true });
        trilho.addEventListener('pointerdown', cancelarAnimacao);
        window.addEventListener('resize', atualizarSetas);

        return () => {
            cancelarAnimacao();
            trilho.removeEventListener('scroll', atualizarSetas);
            trilho.removeEventListener('wheel', cancelarAnimacao);
            trilho.removeEventListener('touchstart', cancelarAnimacao);
            trilho.removeEventListener('pointerdown', cancelarAnimacao);
            window.removeEventListener('resize', atualizarSetas);
        };
    }, [quantidadeItens]);

    const rolar = (direcao) => {
        const trilho = trilhoRef.current;
        const primeiroCard = trilho?.firstElementChild;

        if (!trilho || !primeiroCard) {
            return;
        }

        if (quadroRef.current !== null) {
            cancelAnimationFrame(quadroRef.current);
        }

        const espacamento = Number.parseFloat(window.getComputedStyle(trilho).columnGap) || 0;
        const destino = Math.max(
            0,
            Math.min(
                trilho.scrollWidth - trilho.clientWidth,
                trilho.scrollLeft + direcao * (primeiroCard.getBoundingClientRect().width + espacamento),
            ),
        );
        const inicio = trilho.scrollLeft;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(destino - inicio) < 1) {
            trilho.scrollLeft = destino;
            quadroRef.current = null;
            return;
        }

        const comecouEm = performance.now();
        const duracao = 650;
        const animar = (agora) => {
            const progresso = Math.min((agora - comecouEm) / duracao, 1);
            const suavizado = progresso < 0.5
                ? 4 * progresso ** 3
                : 1 - ((-2 * progresso + 2) ** 3) / 2;

            trilho.scrollLeft = inicio + (destino - inicio) * suavizado;

            if (progresso < 1) {
                quadroRef.current = requestAnimationFrame(animar);
            } else {
                quadroRef.current = null;
            }
        };

        quadroRef.current = requestAnimationFrame(animar);
    };

    return (
        <div className={styles.carrosselNoticias}>
            <header className={styles.cabecalhoCarrossel}>
                <h2 className={styles.tituloNoticias}>{titulo}</h2>
            </header>

            <div className={styles.areaTrilho}>
                <button
                    type="button"
                    className={`${styles.setaCarrossel} ${styles.setaAnterior}`}
                    aria-label="Notícias anteriores"
                    onClick={() => rolar(-1)}
                    disabled={!podeVoltar}
                >
                    <ChevronLeft size={36} aria-hidden="true" />
                </button>
                <div
                    ref={trilhoRef}
                    className={styles.trilhoNoticias}
                    role="region"
                    aria-label={ariaLabel}
                    tabIndex={0}
                >
                    {children}
                </div>
                <button
                    type="button"
                    className={`${styles.setaCarrossel} ${styles.setaProxima}`}
                    aria-label="Próximas notícias"
                    onClick={() => rolar(1)}
                    disabled={!podeAvancar}
                >
                    <ChevronRight size={36} aria-hidden="true" />
                </button>
            </div>

            <Link href="/noticias" className={styles.linkTodasNoticias}>
                Acesse aqui todas as notícias →
            </Link>
        </div>
    );
}
