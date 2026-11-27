import { clerkClient, clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { ACESSO } from './app/lib/acesso.js';

export default clerkMiddleware(async (auth, req) => {
    const pathname = req.nextUrl.pathname;
    const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');
    const isAdminApi =
        pathname === '/api/admin' || pathname.startsWith('/api/admin/');

    if ((!isAdminPage && !isAdminApi) || pathname === '/admin/login') return;

    const { userId } = await auth();

    if (!userId) {
        if (isAdminApi) {
            return NextResponse.json(
                { error: 'Não autenticado' },
                { status: 401 },
            );
        }

        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    if (!ACESSO.admin.includes(user.publicMetadata?.role)) {
        if (isAdminApi) {
            return NextResponse.json(
                { error: 'Acesso não autorizado' },
                { status: 403 },
            );
        }

        return NextResponse.redirect(new URL('/acesso-negado', req.url));
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
