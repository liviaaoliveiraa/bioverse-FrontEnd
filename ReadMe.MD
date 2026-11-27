This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Autenticação administrativa

1. Crie uma aplicação no [Clerk Dashboard](https://dashboard.clerk.com/) e habilite o provedor de login desejado.
2. Crie `.env.local` na raiz e preencha `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` e `CLERK_SECRET_KEY` com as chaves da aplicação Clerk.
3. Habilite o cadastro público no Clerk para permitir a criação de contas de estudantes em `/cadastro`.
4. Novas contas não recebem acesso administrativo. Para autorizar uma conta administrativa, abra o usuário no Dashboard e defina os metadados públicos como `{"role":"admin"}`. Usuários sem esse papel não acessam `/admin`.
5. Para testes no Cypress, crie uma conta de teste dedicada no Clerk, defina o mesmo metadado `role` como `admin` e injete e-mail/senha via variáveis de ambiente do Cypress. Não salve credenciais no repositório.

As páginas administrativas e qualquer rota local criada sob `/api/admin` são verificadas pelo proxy do Next.js; páginas protegidas também repetem a verificação no servidor. Atualmente este projeto não contém endpoints de notícias. A integração não cria nem protege um backend externo: qualquer serviço/API fora deste projeto ainda precisa validar a autorização administrativa por conta própria. O cadastro e edição de notícias permanecem dependentes da API de notícias.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
