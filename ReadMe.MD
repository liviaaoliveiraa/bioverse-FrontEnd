# Nome do Projeto
Bioverse
## Sobre o projeto


## Tecnologias utilizadas
- Next.js
- React
- JavaScript
- CSS Modules
- Prisma
- PostgreSQL
- Clerk

## Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd NOME_DO_PROJETO
```

Instale as dependências:

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias, como a conexão com o banco de dados.
Para carregar notícias, configure também a chave da API no servidor. Não use o prefixo `NEXT_PUBLIC_` para essa chave.

Exemplo:

```env
DATABASE_URL="sua_url_do_banco"
API_KEY="sua_chave_fornecida_pelo_backend"
API_URL="https://bioverse-back.onrender.com/api"
```

O `API_KEY` deve ser fornecido/configurado pelo backend. Configure-o também nas variáveis de ambiente do provedor de deploy e reinicie ou faça novo deploy após alterar o valor. Nunca publique a chave no Git nem a envie ao navegador.

## Execução

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Depois, acesse no navegador:

http://localhost:3000

## Scripts disponíveis

- `npm run dev` — inicia o ambiente de desenvolvimento.
- `npm run build` — gera a versão de produção.
- `npm run start` — executa a versão de produção.
- `npm run lint` — verifica possíveis problemas no código.