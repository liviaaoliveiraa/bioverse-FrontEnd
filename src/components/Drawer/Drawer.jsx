'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  X,
  Home,
  BookOpen,
  Newspaper,
  Info,
  Briefcase,
  Lightbulb,
  GraduationCap,
  ClipboardCheck,
  Video,
} from 'lucide-react';
import escritaImg from '../../assets/escrita.png';
import styles from './Drawer.module.css';

const LINKS = [
  { href: '/', label: 'Início', Icon: Home },
  { href: '/materias', label: 'Matérias', Icon: BookOpen },
  { href: '/noticias', label: 'Notícias', Icon: Newspaper },
  { href: '/videos', label: 'Vídeos', Icon: Video },
  { href: '/dicas', label: 'Dicas', Icon: Lightbulb },
  { href: '/simulado', label: 'Simulado', Icon: ClipboardCheck },
  { href: '/estagio', label: 'Estágio', Icon: GraduationCap },
  { href: '/carreiras', label: 'Carreiras', Icon: Briefcase },
  { href: '/sobre', label: 'Sobre nós', Icon: Info },
];

export default function Drawer({ isOpen, onClose }) {
  const pathname = usePathname();

  // fecha com ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // trava o scroll da página enquanto está aberto
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // fecha ao trocar de página
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className={styles.drawerTheme}>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        aria-hidden={!isOpen}
      >
        <div className={styles.top}>
          <Image src={escritaImg} alt="Bioverse" className={styles.titleImage} />
          <button
            type="button"
            onClick={onClose}
            className={styles.iconBtn}
            aria-label="Fechar menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.nav}>
          {LINKS.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${active ? styles.active : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={20} aria-hidden="true" />
                <span className={styles.linkLabel}>{label}</span>
              </Link>
            );
          })}
        </nav>

      </aside>
    </div>
  );
}