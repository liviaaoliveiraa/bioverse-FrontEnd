'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import styles from './login.module.css';

function CenarioPixelArt() {
    return (
        <svg
            className={styles.cenario}
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e9e4c9" />
                    <stop offset="100%" stopColor="#f8edcf" />
                </linearGradient>
            </defs>

            <rect width="1600" height="900" fill="url(#ceu)" />

            <g fill="#fff2d2">
                <rect x="35" y="160" width="100" height="35" />
                <rect x="15" y="195" width="210" height="40" />
                <rect x="70" y="130" width="70" height="35" />
                <rect x="1250" y="180" width="130" height="40" />
                <rect x="1320" y="140" width="110" height="40" />
                <rect x="1380" y="180" width="180" height="45" />
                <rect x="1160" y="220" width="120" height="35" />
                <rect x="600" y="190" width="100" height="30" />
                <rect x="640" y="160" width="65" height="30" />
            </g>

            <g fill="#e8e1bf">
                <rect x="0" y="235" width="240" height="20" />
                <rect x="1260" y="225" width="300" height="20" />
                <rect x="580" y="220" width="160" height="15" />
            </g>

            <g>
                <rect x="0" y="570" width="1600" height="220" fill="#91a45d" />
                <rect x="0" y="620" width="1600" height="170" fill="#82984f" />
                <rect x="0" y="680" width="1600" height="110" fill="#718b49" />

                <rect x="0" y="540" width="1600" height="35" fill="#a9b96d" />
                <rect x="0" y="575" width="1600" height="20" fill="#8c9e59" />
            </g>

            <g>
                <rect x="80" y="470" width="90" height="180" fill="#72563d" />
                <rect x="55" y="410" width="150" height="90" fill="#536f40" />
                <rect x="20" y="440" width="220" height="100" fill="#678449" />
                <rect x="80" y="390" width="100" height="50" fill="#789454" />
                <rect x="25" y="490" width="80" height="55" fill="#526e40" />
                <rect x="170" y="475" width="80" height="65" fill="#536f40" />
                <rect x="100" y="430" width="55" height="55" fill="#8ba45c" />

                <rect x="1360" y="470" width="100" height="200" fill="#70543b" />
                <rect x="1280" y="420" width="230" height="100" fill="#536f40" />
                <rect x="1240" y="460" width="310" height="100" fill="#678449" />
                <rect x="1320" y="380" width="180" height="65" fill="#789454" />
                <rect x="1260" y="500" width="90" height="55" fill="#526e40" />
                <rect x="1450" y="500" width="100" height="55" fill="#536f40" />
                <rect x="1370" y="440" width="65" height="55" fill="#8ba45c" />
            </g>

            <g fill="#a0b46a">
                <rect x="250" y="550" width="180" height="80" />
                <rect x="300" y="520" width="100" height="50" />
                <rect x="430" y="575" width="130" height="65" />
                <rect x="1020" y="560" width="170" height="70" />
                <rect x="1080" y="525" width="110" height="45" />
            </g>

            <g fill="#f3e5bd">
                <rect x="245" y="630" width="14" height="14" />
                <rect x="232" y="644" width="14" height="14" />
                <rect x="258" y="644" width="14" height="14" />
                <rect x="245" y="658" width="14" height="14" />
                <rect x="1300" y="650" width="16" height="16" />
                <rect x="1284" y="666" width="16" height="16" />
                <rect x="1316" y="666" width="16" height="16" />
                <rect x="1300" y="682" width="16" height="16" />
            </g>

            <g fill="#e8a9a3">
                <rect x="245" y="610" width="14" height="14" />
            </g>

            <g>
                <rect x="0" y="790" width="1600" height="110" fill="#719b9b" />
                <rect x="0" y="790" width="1600" height="18" fill="#9bc2b9" />
                <rect x="70" y="830" width="180" height="12" fill="#b4d2c8" />
                <rect x="400" y="865" width="220" height="12" fill="#b4d2c8" />
                <rect x="1050" y="825" width="180" height="12" fill="#b4d2c8" />
                <rect x="1370" y="860" width="150" height="12" fill="#b4d2c8" />
            </g>
        </svg>
    );
}

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
            <CenarioPixelArt />

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