# BioVerse

Portal educacional voltado ao ensino e à divulgação de conteúdos de Biologia. O projeto oferece matérias, notícias, dicas de estudo, informações sobre carreiras, estágio, simulados e vídeos.

## Objetivo do portal

O BioVerse tem como objetivo tornar o estudo de Biologia mais acessível e organizado. O portal reúne conteúdos relacionados ao ensino médio e vestibulares em uma experiência simples e visual, além de disponibilizar um painel administrativo para a gestão de notícias.

## Tecnologias utilizadas

- **Next.js 16** e **React 19**: interface, navegação e renderização no App Router.
- **JavaScript**: linguagem utilizada no desenvolvimento do front-end.
- **CSS Modules**: estilização isolada dos componentes e páginas.
- **Clerk**: autenticação, cadastro e gerenciamento de usuários.
- **Axios** e **fetch**: comunicação HTTP entre o front-end e os serviços.
- **Ant Design** e **Lucide React**: componentes visuais e ícones.
- **Biome**: análise e formatação do código.

## Pré-requisitos

- Node.js 20 ou superior.
- npm.
- Conta no Clerk para configurar a autenticação.
- URL e chave de acesso da API do BioVerse Back-end.

## Instalação das dependências

Clone o repositório do front-end:

```bash
git clone https://github.com/liviaaoliveiraa/bioverse-FrontEnd.git
cd bioverse-FrontEnd
npm install
```

## Configuração do projeto

Crie um arquivo `.env.local` na raiz do projeto. Não faça commit desse arquivo nem informe valores reais de chaves ou tokens neste README.

Exemplo com nomes das variáveis, sem valores secretos:

```env
# URL pública ou local da API do Back-end
API_URL=

# Chave usada pelo servidor para autenticar requisições à API
API_KEY=

# Credenciais públicas e privadas fornecidas pelo Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Observações:

- `API_URL` deve apontar para a base da API, por exemplo `/api`. O projeto já possui como padrão `https://bioverse-back.onrender.com/api`.
- `API_KEY` é enviada pelo servidor no cabeçalho `x-api-key`.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` e `CLERK_SECRET_KEY` devem ser obtidas no painel do Clerk.
- Para disponibilizar o painel administrativo, o usuário autenticado precisa possuir `role: admin` em `publicMetadata` no Clerk.

## Executando o front-end

No diretório do projeto, execute:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## Scripts disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento.
- `npm run lint` — executa a análise do código com o Biome.
- `npm run format` — formata os arquivos com o Biome.

## Páginas públicas

A navegação pública pode ser acessada pelo menu superior:

- `/` — página inicial.
- `/materias` — matérias de Biologia e suas categorias.
- `/noticias` — notícias sobre Biologia.
- `/videos` — vídeos educacionais.
- `/dicas` — dicas de estudo.
- `/simulado` — simulado.
- `/estagio` — informações sobre estágio.
- `/carreiras` — opções de carreira.
- `/sobre` — informações sobre o projeto.
- `/login` — login de usuários.
- `/cadastro` — cadastro de usuários.

## Login administrativo

Acesse o login administrativo em:

```text
/admin/login
```

A entrada utiliza o Clerk. Apenas usuários com `admin` em `publicMetadata.role` são autorizados a entrar nas áreas administrativas.

## Painel administrativo

Após autenticação autorizada, acesse:

```text
/admin
```

No painel, a opção **Gerenciar notícias** abre a área em `/admin/noticias`. Essa área permite navegar ao formulário de cadastro em `/admin/noticias/nova`.

A conta pode ser encerrada pelo botão **Sair**, presente no layout administrativo. Usuários não autenticados são enviados ao login; usuários autenticados sem perfil administrativo são enviados para `/acesso-negado`.

## Integração com a API do Back-end

O front-end utiliza o módulo `src/app/lib/api.js` para centralizar as requisições ao Back-end. A API padrão é `https://bioverse-back.onrender.com/api`, mas pode ser substituída pela variável `API_URL`.

As requisições realizadas pelo servidor incluem a variável `API_KEY` no cabeçalho `x-api-key`. Nas operações administrativas, o Clerk fornece um token Bearer que também é enviado no cabeçalho `Authorization`.

Exemplos de integração implementada:

- `GET /noticias` — lista as notícias públicas.
- `GET /admin/noticias` — lista as notícias na área administrativa.
- `POST /noticias` — cria uma notícia.
- `PUT /noticias/:id` — atualiza uma notícia.
- `DELETE /noticias/:id` — exclui uma notícia.

## Repositórios

- **Front-end:** https://github.com/liviaaoliveiraa/bioverse-FrontEnd
- **Back-end:** https://github.com/Murilow00/bioverse_back.git

## Projeto publicado

- **Vercel:** https://bioverse.vercel.app