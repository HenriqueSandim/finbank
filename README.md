# FinBank 💱
O FinBank é um MVP de banco digital que tem a intenção de facilitar seu dia-a-dia, centralizando suas finanças em um só local. 

Aqui é possível criar/editar/deletar finanças (despesas e receitas) e criar transferências de dinheiro entre contas FinBank, gerando um arquivo pdf de comprovante.

## Tópicos de conteúdo
- [Visão geral](#1-visão-geral)
    - [Técnologias utilizadas](#11-técnologias-utilizadas)
    - [Diagrama ER](#12-diagrama-er)
- [Iniciando no projeto](#2-iniciando-no-projeto)
    - [Clonando o projeto](#21-clonando-o-projeto)
    - [Instalando depêndencias](#22-instalando-depêndencias)
    - [Criando váriaveis de ambiente](#23-criando-váriaveis-de-ambiente)
    - [Migrations](#24-migrations)

## 1. Visão geral
### 1.1 Técnologias utilizadas
Neste projeto utilizamos diversas librarys para ajudar no desenvolvimento e utilização da aplicação, aqui estão algumas das utilizadas!  
- [Node JS](https://nodejs.org/en/docs/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Express](https://expressjs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Uuid](https://www.npmjs.com/package/uuid)
- [Cross-env](https://www.npmjs.com/package/cross-env)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Yup](https://www.npmjs.com/package/yup)
- [TS-jest](https://www.npmjs.com/package/ts-jest)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Sqlite3](https://www.npmjs.com/package/sqlite3)
- [Jest](https://jestjs.io/pt-BR/)
- [Reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- [Pg](https://www.npmjs.com/package/pg)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [CPF-CNPJ-validator](https://www.npmjs.com/package/cpf-cnpj-validator)

A URL base da aplicação é:
https://finbank-api.onrender.com
---

### 1.2 Diagrama ER
![DER](DER.png)
---

## 2. Iniciando no projeto
[Tópicos de conteúdo](#tópicos-de-conteúdo)

### 2.1. Clonando o projeto
Primeiramente é necessário clonar o projeto em sua maquina, copie a URL ou a chave SSH do projeto e utilize o comando: 
```
git clone {HTML / Chave SSH}
```

### 2.2. Instalando depêndencias
Após clonar, é preciso instalar as dependencias do projeto: 
```
yarn 
```

### 2.3. Criando váriaveis de ambiente
E também é preciso configurar as váriaveis de ambiente, crie um arquivo **.env** com base no **.env.example**:
```
cp .env.example .env
```

E então configure da forma que quiser suas váriaveis.

### 2.4. Migrations
Execute as migrations para a montagem das tabelas com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

Lembrando que é necessário configurar suas váriaveis de ambiente antes de realizar este passo.

## 3. EndPoints
[Tópicos de conteúdo](#tópicos-de-conteúdo)
### Índice
- [Usuários](#1-usuários)
    - []()

 

## 1. Usuários
Usuários tem as seguintes informações dentro da DataBase:
| Campo        | Tipo    | Descrição                                       |
| -------------|---------|-------------------------------------------------|
| id           | string  | Identificador único do usuário                  |
| name         | string  | O nome do usuário.                              |
| email        | string  | O e-mail do usuário.                            |
| password     | string  | A senha de acesso do usuário                    |
| birthdate    | date    | Data de nascimento do usuário.                  |
| CPF          | string  | Documento de identificação do usuário.          |
| isActive     | boolean | Status de ativo ou não do usuário.              |
| isAdmin      | boolean | Nível de permissão do usuário.                  |
| createdAt    | date    | Data indicando quando a conta foi criada.       |
| updatedAt    | date    | Data indicando a última atualização da conta.   |
| deletedAt    | date    | Data indicando a deleção da conta.              |
| accountId    | string  | Identificador ligado a account do usuário.      |

### EndPoints
| Método   | Rota              | Descrição                               |
|----------|-------------------|-----------------------------------------|
| POST     | /users            | Criação de um usuário.                  |
| PATCH    | /users/:user_id   | Atualiza os dados de um usuário.        |
| DELETE   | /users/:user_id   | Deleta um usuário.                      |
| GET      | /users/:user_id   | Pega as informações do usuário.         |

### 1.1. Criação de usuários - ("/users") - POST

  Dados de envio
```
  {
    "name": "Maria José",
    "email": "mariajose@gmail.com",
    "password": "Senha123!",
    "birthdate": "1980/05/15",
    "cpf": "904.245.020-70"
  }
```

  - Resposta (sucesso) - status: 201

```
  {
    "account": {
      "money": 0,
      "id": 2
    },
    "updatedAt": "Mon Jan 16 2023 21:25:19 GMT-0300 (Horário Padrão de Brasília)",
    "createdAt": "Mon Jan 16 2023 21:25:19 GMT-0300 (Horário Padrão de Brasília)",
    "isAdmin": false,
    "isActive": false,
    "birthdate": "1980/05/15",
    "email": "mariajose@gmail.com",
    "name": "Maria José",
    "id": "deede2cb-6d14-4140-92a1-dcfbc560a04e"
  }
```



  - Resposta (Conflito) - status 409 - no caso de o e-mail ou o CPF já existirem, exemplo:
```
  {
    "message": "Email already exists"
  }
```


   - Resposta (Dados incorretos) - status 400 - no caso dos dados enviados não serem válidos, exemplo:

 ```
  {
    "message": [
      "Must have at least 1 uppercase letter",
      "Must have at least 1 number",
      "Must have at least 1 special character",
      "Must be at least 8 digits long",
      "Date format is invalid, format is yyyy/mm/dd",
      "date must be after year 1900",
      "CPF number is not valid"
    ]
  }
```
  
#####  Ativação de novos usuários ("users/active/:id") - GET

  - Após a criação do usuário, será enviado um email para ativação da conta 📩
  - Porém é possível ativar a conta através dessa rota
  
  - Resposta (Sucesso) - status 200 

 ```
{
	"message": "User actived"
}
```
  
  
##### Edição de usuários - ("/users/:id") - PATCH - autenticada 🔐
Dados de envio
```
  {
    "name": "Maria José Silva",
    "email": "mariajosesilva@gmail.com",
    "password": "Senha123!@"
  }
```

  - Resposta (sucesso) - status: 201

```
  {
	"account": {
		"money": 0,
		"id": 2
	},
	"updatedAt": "Mon Jan 16 2023 21:45:28 GMT-0300 (Horário Padrão de Brasília)",
	"createdAt": "Mon Jan 16 2023 21:25:19 GMT-0300 (Horário Padrão de Brasília)",
	"isAdmin": false,
	"isActive": true,
	"birthdate": "1980-05-15",
	"email": "mariajosesilva@gmail.com",
	"name": "Maria José Silva",
	"id": "deede2cb-6d14-4140-92a1-dcfbc560a04e"
  }
```

 - Resposta (Dados incorretos) - status 400 - no caso de nenhum campo editável ser enviado:
```
  {
    "birthdate": "1980/05/15",
    "cpf": "904.245.020-70"
  }
```


   - Resposta (Dados incorretos) - status 400 - no caso dos dados enviados não serem válidos, exemplo:

 ```
{
	"message": "No filed allowed to be updated sent"
}
```

   - Resposta (Proibido) - status 403 - no caso de tentar editar um usuário que não seja você, ou você não seja admin, exemplo:

 ```
{
	"message": "Requires Admin or Owner permission"
}
```
##### Deleção de usuários - ("/users/:id") - DELETE - autenticada 🔐

  - Resposta (Sucesso) - status 204 - no caso de sucesso nenhum corpo é retornado

  - Resposta (Proibido) - status 403 - no caso de tentar deletar um usuário que não seja você, ou você não seja admin, exemplo:

 ```
{
	"message": "Requires Admin or Owner permission"
}
```

##### Mostrar usuário logado - ("/users") - GET - autenticada 🔐

  - Resposta (sucesso) - status: 201

```
  {
	"account": {
		"money": 0,
		"id": 2
	},
	"updatedAt": "Mon Jan 16 2023 21:45:28 GMT-0300 (Horário Padrão de Brasília)",
	"createdAt": "Mon Jan 16 2023 21:25:19 GMT-0300 (Horário Padrão de Brasília)",
	"isAdmin": false,
	"isActive": true,
	"birthdate": "1980-05-15",
	"email": "mariajosesilva@gmail.com",
	"name": "Maria José Silva",
	"id": "deede2cb-6d14-4140-92a1-dcfbc560a04e"
  }
```

#### Login ("/login")
##### Login de usuários - ("/login") - POST
Dados de envio
```
  {
    "email": "mandacosta94@gmail.com",
    "password": "Senha123!"
  }
```

  - Resposta (sucesso) - status: 201

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoxLCJhZG0iO..."
}
```

  - Resposta (Proibido) - status: 403 - no caso de usuário e/ou senha incorretos

```
{
	"message": "Incorrect user"
}
```


