import { SignIn } from '@clerk/nextjs';

export default function AdminLoginPage() {
    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                padding: '3rem 1rem',
            }}
        >
            <h1>Login administrativo</h1>
            <SignIn
                routing="hash"
                signUpUrl="/admin/login"
                forceRedirectUrl="/admin"
                appearance={{ elements: { footerAction: { display: 'none' } } }}
            />
        </main>
    );
}
