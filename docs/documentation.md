# Documentação do Código

## Descrição Geral

O código em análise representa uma API REST simples construída com o framework NestJS. Esta API inclui a funcionalidade básica de criação de usuários, além de um endpoint que retorna uma mensagem de saudação "Hello World!".

A autenticação é realizada através do uso de tokens JWT, que são verificados por um middleware para garantir que apenas usuários autenticados possam acessar certos recursos.

## Parâmetros e tipos

- `bootstrap()`: Função principal que inicia o aplicativo.
- `AppModule`: Módulo principal do aplicativo que importa todos os componentes necessários.
- `AppController`: Controlador principal do aplicativo que define o endpoint para a saudação inicial.
- `getHello()`: Método do serviço do aplicativo que retorna a mensagem de saudação.
- `AuthMiddleware`: Middleware de autenticação que verifica a presença e validade do token JWT.
- `UserService`: Serviço do usuário que interage com o repositório do usuário para criar novos usuários.
- `UserRepository`: Repositório do usuário que interage com a entidade do usuário para realizar operações no banco de dados.
- `User`: Entidade do usuário que representa a tabela de usuário no banco de dados.
- `CreateUserDto`: Objeto de transferência de dados que define a estrutura necessária para criar um novo usuário.
- `UserController`: Controller do usuário que define o endpoint para a criação de usuários.
- `jwtConstants`: Arquivo de configuração que contém a chave secreta usada para verificar tokens JWT.

## Exemplos de uso

Para iniciar o aplicativo, execute o seguinte comando no terminal:

```bash
npm start
```

Para criar um novo usuário, envie uma solicitação POST para o endpoint `/users` com um corpo de solicitação que corresponda à estrutura do CreateUserDto:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe","password":"password123"}' http://localhost:3000/users
```

## Notas importantes

O middleware de autenticação espera que o token JWT seja fornecido no cabeçalho `Authorization` de cada solicitação. Se o token estiver ausente ou for inválido, uma exceção será lançada e o acesso ao recurso será negado.

## Dependências necessárias

Este projeto requer as seguintes dependências:

- `@nestjs/core`: Fornece as funcionalidades principais do NestJS.
- `@nestjs/common`: Fornece funcionalidades comuns do NestJS.
- `express`: Usado para lidar com solicitações HTTP.
- `jsonwebtoken`: Usado para verificar tokens JWT.
- `typeorm`: Usado para interagir com o banco de dados.

Para instalar todas as dependências, execute o seguinte comando no terminal:

```bash
npm install
```