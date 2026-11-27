'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';
import { LayoutDashboard, LogOut, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

const links = [
    { href: '/admin', label: 'Visão geral', Icon: LayoutDashboard },
    { href: '/admin/noticias', label: 'Notícias', Icon: Newspaper },
];

export default function AdminShell({ children }) {
    const pathname = usePathname();
    const { user, isLoaded } = useUser();

    if (pathname === '/admin/login') {
        return <div className={styles.loginPage}>{children}</div>;
    }

    return (
        <div className={styles.shell}>
            <aside className={styles.sidebar}>
                <Link className={styles.brand} href="/admin" aria-label="BioVerse, painel administrativo">
                    <span className={styles.brandMark}>B</span>
                    <span>BioVerse<span className={styles.brandCaption}>ADMINISTRAÇÃO</span></span>
                </Link>

                <p className={styles.menuCaption}>MENU PRINCIPAL</p>
                <nav className={styles.navigation} aria-label="Navegação administrativa">
                    {links.map(({ href, label, Icon }) => {
                        const selected = href === '/admin'
                            ? pathname === href
                            : pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`${styles.navLink} ${selected ? styles.navLinkActive : ''}`}
                                aria-current={selected ? 'page' : undefined}
                            >
                                <Icon size={19} aria-hidden="true" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.adminAvatar}>
                        {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || 'A'}
                    </div>
                    <div className={styles.adminIdentity}>
                        <strong>{isLoaded ? user?.fullName || 'Administrador' : 'Carregando...'}</strong>
                        <span>Administrador</span>
                    </div>
                    <SignOutButton redirectUrl="/admin/login">
                        <button className={styles.logoutButton} type="button" aria-label="Sair da conta">
                            <LogOut size={18} />
                        </button>
                    </SignOutButton>
                </div>
            </aside>

            <div className={styles.mainColumn}>
                <header className={styles.header}>
                    <div>
                        <span className={styles.headerEyebrow}>PORTAL BIOVERSE</span>
                        <p>Painel administrativo</p>
                    </div>
                    <div className={styles.headerUser}>
                        <span className={styles.statusDot} />
                        {user?.firstName || 'Administrador'}
                    </div>
                </header>
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
}
