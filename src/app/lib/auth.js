import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ACESSO } from './acesso.js';

export async function requireAdmin() {
    const { userId } = await auth();
    if (!userId) redirect('/admin/login');

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    if (!ACESSO.admin.includes(user.publicMetadata?.role)) {
        redirect('/acesso-negado');
    }

    return userId;
}
