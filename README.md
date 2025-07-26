# Gerenciamento de Usuários - Aplicação Full Stack

Uma aplicação web completa para gerenciamento de usuários, construída com React no frontend e Node.js no backend.

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://gerenciamento-usuarios-fullstack.vercel.app/)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-6.x-cyan?style=for-the-badge&logo=prisma)

## 🌐 Demo

Acesse a aplicação em produção: [UserFlow App](https://gerenciamento-usuarios-fullstack.vercel.app/)

## 🚀 Tecnologias Utilizadas

### Frontend
- React com Vite
- TailwindCSS para estilização
- React Icons para ícones
- React Toastify para notificações
- Framer Motion para animações
- ESLint para padronização de código

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Docker para containerização
- Cors para segurança

## 📋 Pré-requisitos

- Node.js (versão 20 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação e Configuração

### Clonando o Repositório

```bash
git clone https://github.com/DarcMary/gerenciamento-usuarios-fullstack.git
cd gerenciamento-usuarios-fullstack
```

### Configurando o Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` baseado no `.env.example`
- Configure as variáveis necessárias, especialmente a conexão com o banco de dados

4. Inicie o container do Docker:
```bash
docker-compose up -d
```

5. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

6. Inicie o servidor:
```bash
npm run dev
```

### Configurando o Frontend

1. Em outro terminal, entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🌟 Funcionalidades

### Gestão de Usuários
- ✅ Cadastro com validações em tempo real
- ✅ Listagem com cards modernos
- ✅ Atualização de dados com feedback
- ✅ Remoção com confirmação
- ✅ Interface responsiva e animada
- ✅ Validações frontend e backend
- ✅ Feedback visual das operações
- ✅ Tratamento de erros amigável

## 🎯 Próximos Passos

- [ ] Implementação de autenticação
- [ ] Adição de foto de perfil
- [ ] Histórico de alterações
- [ ] Testes automatizados
- [ ] Internacionalização

## 🛠️ Estrutura do Projeto

```
gerenciamento-usuarios-fullstack/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   ├── prisma/
│   └── docker-compose.yml
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── App.jsx
    └── public/
```

## 📦 API Endpoints

### Usuários

- `GET /users` - Lista todos os usuários
- `POST /users` - Cria um novo usuário
- `PUT /users/:id` - Atualiza um usuário
- `DELETE /users/:id` - Remove um usuário

## 🚀 Deploy

A aplicação está hospedada na Vercel com as seguintes configurações:

- Frontend: Deploy automático da branch main
- Backend: Serverless Functions
- Banco de dados: PostgreSQL na nuvem

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Autor

Desenvolvido por [DarcMary](https://github.com/DarcMary)

---
