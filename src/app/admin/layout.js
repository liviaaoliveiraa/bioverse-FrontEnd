import { Show, SignOutButton } from '@clerk/nextjs';

export default function AdminLayout({ children }) {
    return (
        <>
            <Show when="signed-in">
                <nav>
                    <SignOutButton redirectUrl="/admin/login">
                        <button type="button">Sair</button>
                    </SignOutButton>
                </nav>
            </Show>
            {children}
        </>
    );
}
