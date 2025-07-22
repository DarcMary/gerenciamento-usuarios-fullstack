# API de Gerenciamento de Usuários

Este é o backend do projeto individual do curso de Desenvolvimento Full Stack, que consiste em uma API REST para gerenciar usuários, permitindo seu cadastro, listagem, edição e exclusão. O objetivo é colocar em prática os conhecimentos fundamentais de desenvolvimento web.

## ✨ Funcionalidades

A API permite realizar as seguintes operações básicas (CRUD) sobre os usuários:

  * **Cadastro de Usuário**: Inserir informações como nome, e-mail e senha.
  * **Visualização**: Listar todos os usuários cadastrados.
  * **Edição**: Atualizar os dados de um usuário existente.
  * **Exclusão**: Remover um usuário do sistema.

## 🚀 Tecnologias Utilizadas (Backend)

  * **Node.js**
  * **Express.js**
  * **Prisma** como ORM
  * **PostgreSQL** como banco de dados
  * **Docker** e **Docker Compose** para gerenciamento do contêiner do banco de dados

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

  * [Git](https://git-scm.com)
  * [Node.js](https://nodejs.org/en/)
  * [Docker](https://www.docker.com/)

## ⚙️ Como Rodar o Backend

Siga os passos abaixo para executar o backend da aplicação localmente:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/DarcMary/gerenciamento-usuarios-fullstack.git
    ```

2.  **Acesse a pasta do projeto:**

    ```bash
    cd gerenciamento-usuarios-fullstack
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**

      * Crie um arquivo chamado `.env` na raiz do projeto.
      * Copie o conteúdo do arquivo `.env.example` (se houver) ou use o exemplo abaixo e cole no seu `.env`:
        ```env
        # URL de conexão para o banco de dados PostgreSQL no Docker
        DATABASE_URL="postgresql://sammy:your_password@localhost:5432/my-blog?schema=public"
        ```

5.  **Inicie o banco de dados com Docker:**

      * Certifique-se de que o Docker está em execução na sua máquina.
      * Execute o comando abaixo para iniciar o contêiner do PostgreSQL:
        ```bash
        docker-compose up -d
        ```

6.  **Execute as migrações do banco de dados:**

      * Este comando irá criar as tabelas no seu banco de dados PostgreSQL.
        ```bash
        npx prisma migrate dev
        ```

7.  **Inicie o servidor:**

    ```bash
    npm run dev
    ```

    O servidor estará rodando em `http://localhost:3000`.

## 🔀 Rotas da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/usuarios` | Cria um novo usuário. |
| `GET` | `/usuarios` | Lista todos os usuários cadastrados. |
| `PUT` | `/usuarios/:id` | Atualiza um usuário existente pelo seu ID. |
| `DELETE`| `/usuarios/:id` | Deleta um usuário existente pelo seu ID. |

## 👨‍💻 Autor

**Darc Mary**

  * GitHub: [DarcMary](https://www.google.com/search?q=https://github.com/DarcMary)
