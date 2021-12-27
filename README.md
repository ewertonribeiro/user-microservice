# Microserviço de autenticação com Nodejs

Este é um projeto desenvolvido para criaçao e gestao de usuarios! :wink:

Neste projeto criei um **microserviço de autenticação** que sera muito útil no seu dia a dia. :hammer::wrench:

<img width="960" alt="2021-12-27 (1)" src="https://user-images.githubusercontent.com/90481197/147509577-0e43ee7e-12c6-47ff-a30a-9a62e1a12f93.png">

## Composição do nosso projeto

Neste projeto Temos algumas **Rotas** que podem ser extendidos da forma mais adequada para seu contexto. 

São eles:

### Usuários

* GET /users/lisall
* GET /users/:email
* POST /users/create
* PUT /users/:email =>mandando no body da requisição a senha atual e a nova senha para fazer a alteração
* DELETE /users/:id

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NodeJs](https://nodejs.org)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org)
- [Supabase](https://app.supabase.io/)

