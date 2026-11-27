'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer.jsx';

export default function SiteFooter() {
    const pathname = usePathname();
    return pathname.startsWith('/admin') ? null : <Footer />;
}
