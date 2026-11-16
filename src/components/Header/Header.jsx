
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, Moon, Sun } from 'lucide-react';
import styles from './Header.module.css';
import desenhoImg from '../../assets/desenho.png';
import escritaImg from '../../assets/escrita.png';
import Drawer from '../Drawer/Drawer';

export default function Header({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`${styles.pageShell} ${isDark ? styles.dark : styles.light}`}
      style={{
        backgroundColor: isDark ? '#858f7f' : '#f7f4e9',
        color: isDark ? '#252a23' : '#2d4233',
        transition: 'background-color 0.3s ease',
      }}
    >
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
          </div>

          <a href="/" className={styles.logoWrapper}>
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
          </a>
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