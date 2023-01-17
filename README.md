# FinBank 💱

- O FinBank é um MVP de banco digital que tem a intenção de facilitar seu dia-a-dia, centralizando suas finanças em um só local. 
- Aqui é possível criar/editar/deletar finanças (despesas e receitas) e criar transferências de dinheiro entre contas FinBank, gerando um arquivo pdf de comprovante.

#### Observações:
- Os corpos das requisições devem ser enviados como JSON;
- As rotas autenticadas devem receber um token (jwt) no formato "Bearer token", gerado na rota de login;
- A aplicação está rodando no link: https://finbank-test.onrender.com

### Vamos conhecer as funcionalidades ?

#### Usuários ("/users")
##### Criação de usuários - ("/users") - POST

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


