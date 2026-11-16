import './globals.css';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export const metadata = {
    title: 'FrontEnd - Codeverse',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <Header>
                    <div style={{ flex: 1 }}>{children}</div>
                    <Footer />
                </Header>
                <Toaster />
            </body>
        </html>
    );
}