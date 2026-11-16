'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, BookOpen, Newspaper, Info, Moon, Sun } from 'lucide-react';
import styles from './Drawer.module.css';

// troque pelas rotas reais do site
const LINKS = [
  { href: '/', label: 'Início', Icon: Home },
  { href: '/materias', label: 'Matérias', Icon: BookOpen },
  { href: '/noticias', label: 'Notícias', Icon: Newspaper },
  { href: '/sobre', label: 'Sobre nós', Icon: Info },
];

export default function Drawer({ isOpen, onClose, isDark, onToggleTheme }) {
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
    <div className={isDark ? styles.dark : styles.light}>
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
          <span className={styles.title}>Bioverse</span>
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
                <Icon size={22} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>

        <button type="button" onClick={onToggleTheme} className={styles.themeBtn}>
          {isDark ? (
            <Sun size={22} aria-hidden="true" />
          ) : (
            <Moon size={22} aria-hidden="true" />
          )}
          {isDark ? 'Modo claro' : 'Modo escuro'}
        </button>
      </aside>
    </div>
  );
}