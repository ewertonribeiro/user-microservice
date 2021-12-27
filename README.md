# Microserviço de autenticação com Nodejs

Este é um projeto desenvolvido para criaçao e gestao de usuarios! :wink:

Neste projeto criei um **microserviço de autenticação** que sera muito útil no seu dia a dia. :hammer::wrench:

## Composição do nosso projeto

Neste projeto Temos algumas **Rotas** que podem ser extendidos da forma mais adequada para seu contexto. 

São eles:

### Usuários

* GET /users/lisall
* GET /users/:email
* POST /users/create
* PUT /users/:email =>mandando no body da requisição a senha atual e a nova senha para fazer a alteração
* DELETE /users/:id



