# Polls

Este projeto é uma aplicação de enquetes, onde os usuários podem criar enquetes, votar em opções de enquetes e visualizar os resultados das enquetes.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Fastify
- Prisma
- Redis
- Docker
- Zod
- ESLint

## Detalhes do Projeto

O projeto é composto por várias rotas HTTP que permitem aos usuários interagir com as enquetes. Aqui estão algumas das principais rotas e suas funções:

- `POST /polls`: Esta rota permite aos usuários criar uma nova enquete. O corpo da solicitação deve incluir o título da enquete e uma lista de opções de enquete.
- `GET /polls/:pollId`: Esta rota permite aos usuários obter detalhes de uma enquete específica, incluindo todas as opções de enquete e a contagem de votos para cada opção.
- `POST /polls/:pollId/votes`: Esta rota permite aos usuários votar em uma opção específica em uma enquete. O corpo da solicitação deve incluir o ID da opção de enquete em que o usuário deseja votar.

O projeto usa Prisma para interagir com o banco de dados PostgreSQL e Redis para armazenar a contagem de votos em tempo real. O projeto também inclui um sistema de publicação/assinatura que permite atualizar a contagem de votos em tempo real.

## Como Executar o Projeto

1. Clone o repositório.
2. Instale as dependências com `yarn install` ou `npm install`.
3. Inicie o banco de dados PostgreSQL e o servidor Redis com Docker usando `docker-compose up`.
4. Execute as migrações do banco de dados com `npx prisma migrate dev`.
5. Inicie o servidor com `yarn dev` ou `npm run dev`.

## Como Contribuir

Se você deseja contribuir para este projeto, pode fazer um fork do repositório, fazer suas alterações e, em seguida, abrir um pull request. Certifique-se de que suas alterações estão de acordo com as regras do ESLint do projeto.

## Licença

Este projeto está licenciado sob a licença ISC.