<h1 align="center" style="font-weight: bold;">Footbal Leaderboard</h1>

<p align="center">
    <b>O Footbal Leaderboard é um site informativo sobre partidas e classificações de futebol! ⚽️</b>
</p>
<p align="center">
    Nesse projeto, fiquei responsável por construir um back-end(utilizando o método TDD) dockerizado utilizando modelagem de dados através do Sequelize. O desenvolvimento deve respeitou regras de negócio providas no projeto e a API é ser capaz de ser consumida por um front-end já provido nesse projeto. 
</p>

 ![Exemplo app front](assets/front-example.png)

<h2 id="technologies">💻 Technologies</h2>

- Docker
- Sequelize
- Express
- Typescript
- NodeJS
- Bcrypt
- JWT(JSON web Token)

 <b> Para desenvolver os testes: </b>
 
- Mocha
- Sinon
- Chai

<h2 id="started">🚀 Getting started</h2>

<h3>Cloning</h3>

Após usar o comando acessar a pasta do projeto para fazer os próximos passos

```bash
git clone your-project-url-in-github
```

<h3>Instalação</h3>

- Ao rodar o comando npm install na pasta raiz do projeto você estará instalando somente as dependências para rodar os requisitos do projeto;

```bash
npm install
```

- Cada diretório (frontend e backend) possui suas próprias dependências - você pode instalá-las de forma rápida rodando o comando na pasta raiz do projeto

```bash
npm run install:apps
```
- Utilizando o comando para executar os containers docker através do docker compose

```bash
npm run compose:up
```
  
- O front se comunica com serviço de back-end pela url http://localhost:3001 através dos endpoints. Basta acessar no seu computador para ver a aplicação rodando.
- Para acessar o front-end basta acessar a url http://localhost:3000/



