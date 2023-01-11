import { IUserRequest } from "../../interfaces/users.interfaces"

const mockedUserRequest: IUserRequest = {
    name: "testinho",
    email: "testinho@mail.com",
    password: "Tt123!@#",
    birthdate: "08/17/2002",
    CPF: "391.866.776-67"
}

const mockedUserLogin = {
    email: "testinho@mail.com",
    password: "Tt123!@#"
}

const mockedUserWrongCPF: IUserRequest = {
    name: "testinho2",
    email: "testinho2@mail.com",
    password: "Tt123!@#",
    birthdate: "08/17/2002",
    CPF: "111.222.333-07"
}