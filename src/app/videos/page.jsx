import Image from 'next/image';
import CenarioSapo from '../../components/CenarioSapo/CenarioSapo';
import { chamarApi } from '../lib/api.js';
import styles from './videos.module.css';

export default async function VideosPage() {
  const dados = await chamarApi('/videos', {
    next: { revalidate: 300 },
  });

  if (!dados || !Array.isArray(dados.videos)) {
    throw new Error('A resposta da API de vídeos está em um formato inválido.');
  }

  const videos = dados.videos
    .filter((video) => video?.publicado === true)
    .sort((a, b) => a.ordem - b.ordem);

  if (videos.some((video) => (
    !Number.isFinite(video.id)
    || typeof video.titulo !== 'string'
    || typeof video.descricao !== 'string'
    || typeof video.url !== 'string'
    || !video.url.startsWith('https://')
    || typeof video.thumbnail !== 'string'
    || !video.thumbnail.startsWith('https://')
    || typeof video.disciplina !== 'string'
    || typeof video.duracao !== 'string'
    || !Number.isFinite(video.ordem)
  ))) {
    throw new Error('A API retornou um vídeo publicado com dados inválidos.');
  }

  return (
    <main className={styles.pagina}>
      <div className={styles.fundoCenario}>
        <CenarioSapo preserveAspectRatio="none" />
      </div>
      <div className={styles.conteudo}>
        <h1 className={styles.titulo}>
          <Image
            src="/videos.png"
            alt="Vídeos"
            width={769}
            height={325}
            priority
            className={styles.logoVideos}
          />
        </h1>
        <section className={styles.listaVideos} aria-label="Vídeos de Biologia">
          {videos.length > 0
            ? videos.map((video) => (
              <article className={styles.cardVideo} key={video.id}>
                <div className={styles.areaMiniatura}>
                  <img
                    className={styles.miniatura}
                    src={video.thumbnail}
                    alt={`Miniatura do vídeo: ${video.titulo}`}
                    loading="lazy"
                  />
                  <span className={`${styles.duracao} secondaryText`}>
                    {video.duracao.replace(/:{2,}/g, ':')}
                  </span>
                </div>
                <div className={styles.dadosVideo}>
                  <span className={`${styles.disciplina} secondaryText`}>{video.disciplina}</span>
                  <h2>{video.titulo}</h2>
                  <p>{video.descricao}</p>
                  <a
                    className={styles.linkVideo}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Assistir vídeo
                  </a>
                </div>
              </article>
            ))
            : <p className={styles.semVideos}>Nenhum vídeo publicado no momento.</p>}
        </section>
      </div>
    </main>
  );
}