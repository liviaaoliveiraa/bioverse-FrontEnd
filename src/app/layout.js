import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer/Footer';

export const metadata = {
    title: 'FrontEnd - Codeverse',
    description: 'Template do Codeverse',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <AntdRegistry>
                    {children}
                    <Footer />
                </AntdRegistry>
                <Toaster />
            </body>
        </html>
    );
}
