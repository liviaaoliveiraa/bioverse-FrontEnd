
'use client';

import { Menu, Moon, Search, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Drawer from '../Drawer/Drawer';
import styles from './Header.module.css';

export default function Header({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <div
      className={`${styles.pageShell} ${isDark ? styles.dark : styles.light}`}
      style={{
        backgroundColor: isDark ? '#858f7f' : '#f7f4e9',
        color: isDark ? '#252a23' : '#2d4233',
        transition: 'background-color 0.3s ease',
      }}
    >
      <header className={`${styles.header} ${isDark ? styles.dark : styles.light}`}>
        <div className={styles.container}>
          <div className={styles.leftGroup}>
            <button
              type="button"
              onClick={openDrawer}
              className={styles.iconBtn}
              aria-label="Abrir menu"
            >
              <Menu size={24} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={styles.iconBtn}
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {isDark ? (
                <Sun size={24} aria-hidden="true" />
              ) : (
                <Moon size={24} aria-hidden="true" />
              )}
            </button>

            <div
              className={`${styles.searchControl} ${isSearchOpen ? styles.searchControlOpen : ''}`}
            >
              <button
                type="button"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className={styles.iconBtn}
                aria-label={isSearchOpen ? 'Fechar pesquisa' : 'Abrir pesquisa'}
                aria-expanded={isSearchOpen}
                aria-controls="header-search"
              >
                <Search size={24} aria-hidden="true" />
              </button>
              <input
                ref={searchInputRef}
                id="header-search"
                type="search"
                className={styles.searchInput}
                placeholder="Pesquisar..."
                aria-label="Pesquisar"
                aria-hidden={!isSearchOpen}
                tabIndex={isSearchOpen ? 0 : -1}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setIsSearchOpen(false);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      {children}
    </div>
  );
}