import Link from 'next/link';
import CenarioSakura from '../../../components/CenarioSakura/CenarioSakura';
import { chamarApi } from '../../lib/api.js';
import QuestoesSimulado from './QuestoesSimulado';
import styles from './questoes.module.css';

function validarQuestoes(questoes) {
  if (questoes.some((questao) => (
    !Number.isFinite(questao.id)
    || !Number.isFinite(questao.simuladoId)
    || typeof questao.enunciado !== 'string'
    || !questao.enunciado.trim()
    || !Array.isArray(questao.alternativas)
    || questao.alternativas.length === 0
    || questao.alternativas.some((alternativa) => typeof alternativa !== 'string')
    || !Number.isInteger(questao.respostaCorreta)
    || questao.respostaCorreta < 0
    || questao.respostaCorreta >= questao.alternativas.length
    || !Number.isFinite(questao.ordem)
    || (questao.explicacao != null && typeof questao.explicacao !== 'string')
    || (questao.imagem != null && typeof questao.imagem !== 'string')
  ))) {
    throw new Error('A API retornou uma questão do simulado com dados inválidos.');
  }
}

export default async function QuestoesPage() {
  const dadosQuestoes = await chamarApi('/questoes-simulados', {
    next: { revalidate: 300 },
  });
  if (!dadosQuestoes || !Array.isArray(dadosQuestoes.questoes)) {
    throw new Error('A resposta da API de questões está em um formato inválido.');
  }

  const questoesDisponiveis = dadosQuestoes.questoes;
  if (questoesDisponiveis.some((questao) => (
    !questao || !Number.isFinite(questao.simuladoId)
  ))) {
    throw new Error('A API retornou uma questão sem identificação de simulado válida.');
  }

  const simulados = await Promise.all(
    [...new Set(questoesDisponiveis.map((questao) => questao.simuladoId))]
      .sort((a, b) => a - b)
      .map((simuladoId) => chamarApi(`/simulados/${simuladoId}`, {
        next: { revalidate: 300 },
      })),
  );

  if (simulados.some((dados) => (
    !dados?.simulado
    || !Number.isFinite(dados.simulado.id)
    || typeof dados.simulado.titulo !== 'string'
    || typeof dados.simulado.publicado !== 'boolean'
  ))) {
    throw new Error('A API retornou um simulado com dados inválidos.');
  }

  const simuladoPublicado = simulados
    .map((dados) => dados.simulado)
    .filter((simulado) => simulado.publicado)
    .sort((a, b) => a.id - b.id)[0];
  const simuladoId = simuladoPublicado?.id;
  const questoes = simuladoId === undefined
    ? []
    : questoesDisponiveis
      .filter((questao) => questao.simuladoId === simuladoId)
      .sort((a, b) => a.ordem - b.ordem || a.id - b.id);

  validarQuestoes(questoes);

  return (
    <main className={styles.page}>
      <CenarioSakura />
      <div className={styles.content}>
        <Link href="/simulado" className={styles.backLink}>
          Voltar ao simulado
        </Link>
        <section className={styles.card} aria-labelledby="questions-title">
          <span className={`${styles.kicker} secondaryText`}>SIMULADO BIOVERSE</span>
          <h1 id="questions-title">{simuladoPublicado?.titulo || 'Simulado de Biologia'}</h1>
          {simuladoPublicado?.descricao && <p className={styles.description}>{simuladoPublicado.descricao}</p>}
          {questoes.length > 0
            ? <QuestoesSimulado questoes={questoes} simuladoId={simuladoId} />
            : (
              <p className={styles.emptyState} role="status">
                Não há questões disponíveis para este simulado no momento.
              </p>
            )}
        </section>
      </div>
    </main>
  );
}
