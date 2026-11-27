import { SignedIn, SignOutButton } from '@clerk/nextjs';

export default function AdminLayout({ children }) {
    return (
        <>
            <SignedIn>
                <nav>
                    <SignOutButton redirectUrl="/admin/login">
                        <button>Sair</button>
                    </SignOutButton>
                </nav>
            </SignedIn>
            {children}
        </>
    );
}