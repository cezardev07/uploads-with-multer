<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" width="100%"/>

## Configuração do Docker 🐋

Este projeto vem com uma configuração do Docker para implantação fácil. Siga estas etapas:

1. Certifique-se de que o Docker esteja instalado no seu sistema.
2. Execute o seguinte comando para iniciar os contêineres do Docker:

```bash
docker-compose up -d
```

3. Lista todos os contêiners (rodando), use:

```bash
docker ps
```

4. Para acessar o contêiner da API, use:

```bash
docker exec -it <id-api-container> sh
```

5. Execute as migrações do Prisma para configuração do banco de dados:

```bash
npm run deploy
```

6. Saia do contêiner:

```bash
exit
```

## Endpoints

1. `GET /client/all` **: Obtenha todos os clientes**.
2. `GET /client/:name/:password` **: Faça login no cliente**.
3. `POST /client` **: Crie um novo cliente (com upload de avatar)**.
4. `DELETE /client/:id/:name/:password` **: Excluir cliente**.
5. `POST /post` **: Crie um novo post**.

## Esquema do Prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Client {
  id String @unique @id @default(uuid())
  name String @unique
  password String
  avatar String
  posts Post[]

  created_at DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("client")
}

model Post{
  id String @unique @id @default(uuid())
  client Client @relation(fields: [client_id], references: [id])
  client_id String
  message String

  created_at DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("post")
}

```

## Dependências

- `Express.js`: Framework web para Node.js.
- `Cors`: Middleware para habilitar CORS no Express.js.
- `Dotenv`: Módulo para carregar variáveis de ambiente de um arquivo .env.
- `Multer`: Middleware para lidar com multipart/form-data, usado para uploads de arquivos.
- `Marked`: Módulo para analisar markdown em posts.

## Dependências de Desenvolvimento

- `TypeScript`: Superset tipado de JavaScript.
- `Prisma`: ORM para Node.js e TypeScript.
- `tsc`: Compilador TypeScript.
- `tsx`: Transpilador TypeScript e JSX.

## Scripts

1. `npm run dev` : Inicia o servidor de desenvolvimento com o modo de observação do TypeScript.

2. `npm run deploy` : Implanta migrações do Prisma.

**Projeto voltado exclusivamente para fins educacionais e de aprendizado.** 🐋 