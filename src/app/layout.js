import './globals.css';
import { ptBR } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header/Header';
import SiteFooter from '../components/Footer/SiteFooter.jsx';

export const metadata = {
    title: 'FrontEnd - Codeverse',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <ClerkProvider
                    localization={ptBR}
                    signInUrl="/admin/login"
                    signInFallbackRedirectUrl="/admin"
                >
                    <Header>
                        <div style={{ flex: 1 }}>{children}</div>
                        <SiteFooter />
                    </Header>
                    <Toaster />
                </ClerkProvider>
            </body>
        </html>
    );
}
