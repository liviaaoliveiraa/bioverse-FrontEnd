'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import CenarioSapo from '../../components/CenarioSapo/CenarioSapo';
import styles from './login.module.css';

function SapoPixel() {
    return (
        <svg
            className={styles.sapo}
            viewBox="0 0 220 125"
            role="img"
            aria-label="Sapinho verde em pixel art"
        >
            <g shapeRendering="crispEdges">
                <rect x="45" y="35" width="130" height="65" fill="#466b3d" />
                <rect x="30" y="50" width="160" height="45" fill="#466b3d" />
                <rect x="55" y="20" width="35" height="35" fill="#466b3d" />
                <rect x="130" y="20" width="35" height="35" fill="#466b3d" />

                <rect x="60" y="25" width="25" height="25" fill="#91ad65" />
                <rect x="135" y="25" width="25" height="25" fill="#91ad65" />

                <rect x="45" y="45" width="130" height="45" fill="#789a53" />
                <rect x="60" y="35" width="100" height="45" fill="#86a95d" />
                <rect x="80" y="70" width="60" height="25" fill="#d9d9a9" />

                <rect x="65" y="50" width="12" height="12" fill="#273b2a" />
                <rect x="143" y="50" width="12" height="12" fill="#273b2a" />

                <rect x="30" y="75" width="25" height="20" fill="#466b3d" />
                <rect x="165" y="75" width="25" height="20" fill="#466b3d" />
                <rect x="45" y="90" width="30" height="15" fill="#466b3d" />
                <rect x="145" y="90" width="30" height="15" fill="#466b3d" />

                <rect x="15" y="85" width="20" height="20" fill="#789a53" />
                <rect x="185" y="85" width="20" height="20" fill="#789a53" />
                <rect x="85" y="95" width="50" height="15" fill="#d9d9a9" />
            </g>
        </svg>
    );
}

export default function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <main className={styles.loginPage}>
            <CenarioSapo />

            <div className={styles.conteudo}>
                <section className={styles.card}>
                    <div className={styles.sapoContainer}>
                        <SapoPixel />
                    </div>

                    <h1>Bem-vindo ao BioVerse!</h1>

                    <p className={styles.subtitulo}>
                        Entre na sua conta para continuar explorando
                        <br />
                        o nosso universo!
                    </p>

                    <form
                        className={styles.formulario}
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <label className={styles.campo}>
                            <Mail size={25} />
                            <input
                                type="email"
                                placeholder="E-mail"
                                aria-label="E-mail"
                                required
                            />
                        </label>

                        <label className={styles.campo}>
                            <LockKeyhole size={24} />

                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                placeholder="Senha"
                                aria-label="Senha"
                                required
                            />

                            <button
                                type="button"
                                className={styles.mostrarSenha}
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {mostrarSenha ? <EyeOff size={23} /> : <Eye size={23} />}
                            </button>
                        </label>

                        <button type="submit" className={styles.botaoEntrar}>
                            Entrar
                        </button>
                    </form>

                    <div className={styles.divisor}>
                        <span></span>
                        <p>ou</p>
                        <span></span>
                    </div>

                    <p className={styles.cadastro}>
                        Não tem uma conta?{' '}
                        <Link href="/cadastro">Cadastre-se</Link>
                    </p>
                </section>
            </div>
        </main>
    );
}