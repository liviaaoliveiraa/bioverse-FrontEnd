import styles from './CenarioSakura.module.css';

export default function CenarioSakura({ preserveAspectRatio = 'xMidYMid slice' }) {
    return (
        <svg
            className={styles.cenario}
            viewBox="0 0 1600 1000"
            preserveAspectRatio={preserveAspectRatio}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="ceuSakura" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a9ddfa" />
                    <stop offset="65%" stopColor="#d0edfa" />
                    <stop offset="100%" stopColor="#eaf3e5" />
                </linearGradient>
            </defs>

            <rect width="1600" height="1000" fill="url(#ceuSakura)" />

            <g fill="#f5fbff">
                <rect x="110" y="145" width="130" height="35" />
                <rect x="70" y="180" width="220" height="45" />
                <rect x="145" y="110" width="90" height="35" />

                <rect x="1080" y="125" width="150" height="35" />
                <rect x="1035" y="160" width="245" height="45" />
                <rect x="1130" y="90" width="100" height="35" />

                <rect x="650" y="245" width="100" height="30" />
                <rect x="620" y="275" width="170" height="30" />
            </g>

            <g fill="#a5d7df">
                <rect x="0" y="420" width="1600" height="150" />
                <rect x="0" y="480" width="1600" height="100" />
            </g>

            <g fill="#91c4a0">
                <rect x="0" y="475" width="1600" height="180" />
                <rect x="0" y="530" width="1600" height="150" />
            </g>

            <g fill="#6f9d69">
                <rect x="0" y="590" width="1600" height="410" />
                <rect x="0" y="650" width="1600" height="350" />
            </g>

            <g fill="#82ad70">
                <rect x="0" y="620" width="1600" height="55" />
                <rect x="0" y="720" width="1600" height="70" />
            </g>

            <g>
                <rect x="95" y="390" width="85" height="300" fill="#79583f" />
                <rect x="65" y="350" width="145" height="100" fill="#79583f" />

                <rect x="15" y="260" width="210" height="125" fill="#e99fbd" />
                <rect x="55" y="215" width="145" height="95" fill="#f2b6cd" />
                <rect x="0" y="315" width="125" height="95" fill="#d987ad" />
                <rect x="145" y="300" width="130" height="95" fill="#f2b6cd" />
                <rect x="75" y="175" width="110" height="70" fill="#f6c8d9" />
                <rect x="30" y="385" width="95" height="55" fill="#e9a5c0" />
                <rect x="190" y="370" width="80" height="55" fill="#e9a5c0" />
                <rect x="95" y="265" width="70" height="65" fill="#f8d1df" />
                <rect x="25" y="275" width="55" height="55" fill="#f6c8d9" />
                <rect x="175" y="240" width="60" height="60" fill="#d987ad" />
            </g>

            <g>
                <rect x="1370" y="365" width="90" height="335" fill="#79583f" />
                <rect x="1340" y="325" width="150" height="100" fill="#79583f" />

                <rect x="1260" y="230" width="260" height="135" fill="#e99fbd" />
                <rect x="1300" y="180" width="190" height="100" fill="#f2b6cd" />
                <rect x="1210" y="285" width="150" height="105" fill="#d987ad" />
                <rect x="1430" y="285" width="170" height="110" fill="#f2b6cd" />
                <rect x="1340" y="145" width="130" height="65" fill="#f6c8d9" />
                <rect x="1240" y="375" width="110" height="55" fill="#e9a5c0" />
                <rect x="1470" y="370" width="100" height="60" fill="#e9a5c0" />
                <rect x="1320" y="245" width="80" height="70" fill="#f8d1df" />
                <rect x="1460" y="230" width="70" height="65" fill="#d987ad" />
            </g>

            <g>
                <rect x="440" y="475" width="65" height="190" fill="#79583f" />
                <rect x="400" y="420" width="150" height="100" fill="#e99fbd" />
                <rect x="425" y="375" width="105" height="75" fill="#f2b6cd" />
                <rect x="365" y="465" width="100" height="75" fill="#d987ad" />
                <rect x="505" y="460" width="90" height="75" fill="#f6c8d9" />
            </g>

            <g fill="#f7cddd">
                <rect x="300" y="340" width="15" height="15" />
                <rect x="320" y="365" width="12" height="12" />
                <rect x="570" y="290" width="14" height="14" />
                <rect x="920" y="350" width="16" height="16" />
                <rect x="1100" y="300" width="12" height="12" />
                <rect x="1190" y="430" width="15" height="15" />
                <rect x="730" y="400" width="13" height="13" />
                <rect x="820" y="330" width="12" height="12" />
                <rect x="250" y="480" width="13" height="13" />
                <rect x="1050" y="470" width="15" height="15" />
            </g>

            <g fill="#557e4f">
                <rect x="0" y="790" width="1600" height="230" />
                <rect x="0" y="760" width="1600" height="45" />
            </g>

            <g fill="#9bc27c">
                <rect x="280" y="760" width="90" height="25" />
                <rect x="650" y="815" width="120" height="20" />
                <rect x="1000" y="770" width="100" height="25" />
                <rect x="1420" y="820" width="110" height="20" />
                <rect x="80" y="850" width="130" height="20" />
            </g>

            <g>
                <g fill="#f4d7df">
                    <rect x="350" y="725" width="12" height="12" />
                    <rect x="365" y="710" width="12" height="12" />
                    <rect x="380" y="725" width="12" height="12" />
                    <rect x="365" y="740" width="12" height="12" />

                    <rect x="1160" y="760" width="12" height="12" />
                    <rect x="1175" y="745" width="12" height="12" />
                    <rect x="1190" y="760" width="12" height="12" />
                    <rect x="1175" y="775" width="12" height="12" />
                </g>

                <g fill="#fff0b5">
                    <rect x="520" y="790" width="10" height="10" />
                    <rect x="535" y="775" width="10" height="10" />
                    <rect x="550" y="790" width="10" height="10" />
                    <rect x="535" y="805" width="10" height="10" />
                    <rect x="535" y="790" width="10" height="10" />

                    <rect x="900" y="850" width="10" height="10" />
                    <rect x="915" y="835" width="10" height="10" />
                    <rect x="930" y="850" width="10" height="10" />
                    <rect x="915" y="865" width="10" height="10" />
                    <rect x="915" y="850" width="10" height="10" />
                </g>

                <g fill="#f4b6ce">
                    <rect x="180" y="790" width="10" height="10" />
                    <rect x="195" y="775" width="10" height="10" />
                    <rect x="210" y="790" width="10" height="10" />
                    <rect x="195" y="805" width="10" height="10" />
                    <rect x="195" y="790" width="10" height="10" />

                    <rect x="730" y="735" width="10" height="10" />
                    <rect x="745" y="720" width="10" height="10" />
                    <rect x="760" y="735" width="10" height="10" />
                    <rect x="745" y="750" width="10" height="10" />
                    <rect x="745" y="735" width="10" height="10" />

                    <rect x="1320" y="850" width="10" height="10" />
                    <rect x="1335" y="835" width="10" height="10" />
                    <rect x="1350" y="850" width="10" height="10" />
                    <rect x="1335" y="865" width="10" height="10" />
                    <rect x="1335" y="850" width="10" height="10" />
                </g>

                <g fill="#fff7e8">
                    <rect x="430" y="870" width="9" height="9" />
                    <rect x="445" y="855" width="9" height="9" />
                    <rect x="460" y="870" width="9" height="9" />
                    <rect x="445" y="885" width="9" height="9" />
                    <rect x="445" y="870" width="9" height="9" />

                    <rect x="1050" y="790" width="9" height="9" />
                    <rect x="1065" y="775" width="9" height="9" />
                    <rect x="1080" y="790" width="9" height="9" />
                    <rect x="1065" y="805" width="9" height="9" />
                    <rect x="1065" y="790" width="9" height="9" />
                </g>
            </g>
        </svg>
    );
}