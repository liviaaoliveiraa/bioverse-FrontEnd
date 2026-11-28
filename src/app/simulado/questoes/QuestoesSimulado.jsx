'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './questoes.module.css';

export default function QuestoesSimulado({ questoes, simuladoId }) {
  const [indice, setIndice] = useState(0);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
  const [respostaConferida, setRespostaConferida] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [finalizando, setFinalizando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState('');
  const questao = questoes[indice];

  function conferirResposta() {
    if (alternativaSelecionada === null || respostaConferida) return;
    if (alternativaSelecionada === questao.respostaCorreta) {
      setAcertos((total) => total + 1);
    }
    setRespostaConferida(true);
  }

  async function salvarResultado() {
    setFinalizando(true);
    setErroSalvar('');

    let resposta;
    try {
      resposta = await fetch('/api/simulado/respostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simuladoId,
          acertos,
          total_questoes: questoes.length,
          percentual: Math.round((acertos / questoes.length) * 100),
        }),
      });
    } catch {
      setErroSalvar('Não foi possível conectar ao servidor para salvar seu resultado. Tente novamente.');
      setFinalizando(false);
      return;
    }

    if (!resposta.ok) {
      setErroSalvar('Não foi possível salvar seu resultado. Tente novamente.');
      setFinalizando(false);
      return;
    }

    setFinalizado(true);
    setFinalizando(false);
  }

  function avancar() {
    if (indice === questoes.length - 1) {
      void salvarResultado();
      return;
    }
    setIndice((atual) => atual + 1);
    setAlternativaSelecionada(null);
    setRespostaConferida(false);
  }

  function reiniciar() {
    setIndice(0);
    setAlternativaSelecionada(null);
    setRespostaConferida(false);
    setAcertos(0);
    setFinalizado(false);
    setErroSalvar('');
  }

  if (finalizado) {
    const percentual = Math.round((acertos / questoes.length) * 100);

    return (
      <div className={styles.result} aria-live="polite">
        <h2>Simulado concluído!</h2>
        <p>Seu resultado foi salvo.</p>
        <p>Você acertou <strong>{acertos} de {questoes.length}</strong> questões.</p>
        <p className={styles.percentage}>{percentual}% de aproveitamento</p>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryButton} onClick={reiniciar}>
            Refazer simulado
          </button>
          <Link href="/simulado" className={styles.secondaryButton}>
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const acertou = alternativaSelecionada === questao.respostaCorreta;
  const progresso = ((indice + 1) / questoes.length) * 100;

  return (
    <div className={styles.quiz}>
      <div className={styles.progressHeader}>
        <span className="secondaryText">Questão {indice + 1} de {questoes.length}</span>
        <progress value={progresso} max="100" aria-label={`Progresso: questão ${indice + 1} de ${questoes.length}`} />
      </div>
      <article className={styles.question}>
        <h2>{questao.enunciado}</h2>
        {questao.imagem && (
          <img
            className={styles.questionImage}
            src={questao.imagem}
            alt={`Imagem da questão ${indice + 1}`}
          />
        )}
        <fieldset className={styles.options} disabled={respostaConferida}>
          <legend className={styles.srOnly}>Escolha uma resposta</legend>
          {questao.alternativas.map((alternativa, index) => (
            <label
              className={`${styles.option} ${
                respostaConferida && index === questao.respostaCorreta ? styles.correct : ''
              } ${
                respostaConferida && index === alternativaSelecionada && !acertou
                  ? styles.incorrect
                  : ''
              }`}
              key={`${questao.id}-${index}`}
            >
              <input
                type="radio"
                name={`questao-${questao.id}`}
                value={index}
                checked={alternativaSelecionada === index}
                onChange={() => setAlternativaSelecionada(index)}
              />
              <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
              <span>{alternativa}</span>
            </label>
          ))}
        </fieldset>
      </article>
      {respostaConferida && (
        <div className={`${styles.feedback} ${acertou ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status">
          <strong>{acertou ? 'Resposta correta!' : 'Não foi dessa vez.'}</strong>
          {!acertou && (
            <p>Resposta certa: {questao.alternativas[questao.respostaCorreta]}</p>
          )}
          {questao.explicacao && <p>{questao.explicacao}</p>}
        </div>
      )}
      {erroSalvar && (
        <p className={styles.saveError} role="alert">
          {erroSalvar}
        </p>
      )}
      <div className={styles.actions}>
        {!respostaConferida ? (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={conferirResposta}
            disabled={alternativaSelecionada === null}
          >
            Conferir resposta
          </button>
        ) : (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={avancar}
            disabled={finalizando}
          >
            {indice === questoes.length - 1
              ? (finalizando ? 'Salvando resultado...' : erroSalvar ? 'Tentar salvar resultado' : 'Finalizar simulado')
              : 'Próxima questão'}
          </button>
        )}
      </div>
    </div>
  );
}
