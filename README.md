# 🏗️ Sistema de Pedidos B2B – Portobello (Desafio Técnico)

Este projeto é um MVP de um sistema interno de pedidos B2B, desenvolvido como parte de um desafio técnico. Ele é dividido em dois microsserviços: 
**backend em Java (Spring Boot + MongoDB)** e **frontend em React com TypeScript**.

## 📦 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot
- MongoDB
- JUnit para Testes Unitarios
- Swagger
- Docker e Docker Compose

### Frontend
- React + TypeScript
- Axios
- CSS customizado

---

## ⚙️ Como Rodar o Projeto

Você pode rodar o projeto **com Docker** (recomendado) ou **localmente sem Docker**.

### ✅ Com Docker (recomendado)

> Requisitos:
> - Docker e Docker Compose instalados

```bash
git clone https://github.com/nelsonkoltz/teste_portobello.git
cd sistema-pedidos-b2b
docker-compose up --build
```

- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- Swagger: http://localhost:8080/swagger-ui.html
- MongoDB: http://localhost:27017 (via container)
- RabbitMQ (simulado): logs no terminal

---

### ✅ Rodando manualmente (sem Docker)

> Requisitos:
> - Node.js (versão 18 ou superior) e npm
> - Java 17 ou mais recente
> - MongoDB instalado localmente

#### 1. Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```
---

## 🚀 Funcionalidades

### Backend (Spring Boot)
- `POST /pedidos`: Criar novo pedido
- `GET /pedidos`: Listar todos os pedidos
- `GET /pedidos/{id}`: Buscar pedido por ID
- Mensageria simulada com logs (`logger.info`)
- Swagger para documentação da API

### Frontend (React)
- Tela de **listagem** de pedidos
- Tela de **criação** de novo pedido
- Tela de **detalhamento** do pedido
- Validação básica de formulário
- Componentes reutilizáveis

---

## 📨 Mensageria (Fake)

Quando um novo pedido é criado, uma mensagem aparece no terminal simulando uma fila de mensageria. Exemplo:

📩 [MENSAGERIA FAKE] Novo pedido criado: 123 - Cliente: Arinelson

---

## 📘 Decisões Técnicas e Melhorias Futuras

**Por que escolhi essas tecnologias?**

**Spring Boot com MongoDB:** Optei por usar o Spring Boot pela sua robustez e facilidade de integração com outras ferramentas. Já o MongoDB foi escolhido por ser simples de configurar e ideal para um MVP como esse, onde a estrutura dos dados pode ser flexível.

**Mensageria simulada:** Como o desafio sugeria simular uma fila como RabbitMQ ou AWS SQS, criei uma lógica fake com logs no console. Isso ajuda a mostrar a intenção sem a complexidade de configurar tudo de verdade. A lógica está isolada e pronta para ser trocada por uma implementação real no futuro.

**React com TypeScript:** Escolhi essa tecnologias frontend por ser moderna, escalável e com boa tipagem, o que ajuda a evitar erros durante o desenvolvimento. Também usei Axios e React Router para facilitar as chamadas HTTP e o controle de rotas.

**Docker e Docker Compose:** Para facilitar a vida de quem for rodar o projeto, principalmente em ambientes diferentes, optei por usar contêineres. Assim, com poucos comandos o projeto está no ar, sem depender de configurações locais.

---

## 🚀 Melhorias Futuras

- Integrar uma mensageria real, como RabbitMQ ou AWS SQS, para comunicação assíncrona entre microsserviços.
- Paginar os pedidos, para melhorar performance quando houver muitos registros.
- Adicionar filtros e paginação nos endpoints de listagem.
- Criar uma interface de administração, com filtros, ordenações e estatísticas dos pedidos.
- Criação de telas de cadastro de itens e clientes – voltadas para o perfil de administrador, permitindo a gestão mais completa do processo de pedidos
- Criação de autenticação com controle de acesso (ex: login de administradores e clientes)

---

## 📌 Autor

Desenvolvido por **Arinelson Koltz**  
🔗 GitHub: [github.com/nelsonkoltz](https://github.com/nelsonkoltz/teste_portobello)