import { IUserRequest } from "../../interfaces/users.interfaces"

export const mockedUserRequest: IUserRequest = {
    name: "testinho",
    email: "testinho@mail.com",
    password: "Tt123!@#",
    birthdate: "2002/08/17",
    cpf: "391.866.776-67"
}

export const mockedUserRequest2: IUserRequest = {
    ...mockedUserRequest,
    email: "teste10@mail.com",
    cpf: "574.329.370-87"
}

export const mockedUserLogin = {
    email: "testinho@mail.com",
    password: "Tt123!@#"
}

export const mockedUserSameCPF: IUserRequest = {
    name: "testinho2",
    email: "testinho2@mail.com",
    password: "Tt123!@#",
    birthdate: "2002/08/17",
    cpf: "391.866.776-67"
}

export const mockedUserWrongCPF: IUserRequest = {
    name: "testinho2",
    email: "testinho2@mail.com",
    password: "Tt123!@#",
    birthdate: "2002/08/17",
    cpf: "111.222.333-07"
}

export const mockedUserWeakPassword: IUserRequest = {
    name: "testinho3",
    email: "testinho3@mail.com",
    password: "1234abcd",
    birthdate: "2002/08/17",
    cpf: "642.791.000-04"
}

export const mockedUserWrongBirthdate: IUserRequest = {
    name: "testinho3",
    email: "testinho3@mail.com",
    password: "1234abcde@",
    birthdate: "23/08/2002",
    cpf: "642.791.000-04"
}