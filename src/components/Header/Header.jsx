'use client';


import { Menu, Moon, Search, Sun, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import desenhoImg from '../../assets/desenho.png';
import escritaImg from '../../assets/escrita.png';
import Link from 'next/link';
import Drawer from '../Drawer/Drawer';
import styles from './Header.module.css';


export default function Header({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };


    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <header
        className={`${styles.header} ${isDark ? styles.dark : styles.light} ${
          isScrolled ? styles.scrolled : styles.top
        }`}
      >
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
          <Link href="/" className={styles.logoWrapper}>
            <Image src={escritaImg} alt="Bioverse" className={styles.escritaImg} />

            <div className={styles.desenhoContainer}>
              <div className={styles.sparklesLayer} aria-hidden="true">
                <span className={`${styles.sparkle} ${styles.s1}`}>✦</span>
                <span className={`${styles.sparkle} ${styles.s2}`}>✧</span>
                <span className={`${styles.sparkle} ${styles.s3}`}>✦</span>
                <span className={`${styles.sparkle} ${styles.s4}`}>★</span>
                <span className={`${styles.sparkle} ${styles.s5}`}>✧</span>
              </div>


              <div className={styles.logoFrame}>
                <Image src={desenhoImg} alt="Logo Bioverse" className={styles.desenhoImg} />
              </div>
            </div>
          </Link>

          <Link href="/login" className={styles.iconBtn} aria-label="Entrar">
            <UserRound size={24} aria-hidden="true" />
          </Link>
        </div>
      </header>
      <div
        className={`${styles.pageShell} ${isDark ? styles.dark : styles.light}`}
        style={{
          backgroundColor: isDark ? '#858f7f' : '#f7f4e9',
          color: isDark ? '#252a23' : '#2d4233',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
        {children}
      </div>
    </>
  );
}