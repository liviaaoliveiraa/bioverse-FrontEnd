'use client';


import { Menu, Search, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Drawer from '../Drawer/Drawer';
import styles from './Header.module.css';


export default function Header({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');


  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);


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
      {!isAdminRoute && <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : styles.top}`}
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
          <Link href="/login" className={styles.iconBtn} aria-label="Entrar">
            <UserRound size={24} aria-hidden="true" />
          </Link>
        </div>
      </header>}
      <div className={styles.pageShell}>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
        />
        {children}
      </div>
    </>
  );
}