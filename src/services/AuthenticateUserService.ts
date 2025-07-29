import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UserRepositories);

    // verificar se o email existe
    const user = await usersRepositories.findOne({
      email,
    });

    // se não existir email
    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // verificar se a senha esta correta
    // compare(senha que o user passou, senha que veio do BD)
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // gerar token
    const token = sign(
      // payload
      {
        email: user.email,
      },
      // chave secret
      "6425ddbf9cd648e1e4d33c4340d3373d",
      {
        subject: user.id,
        expiresIn: "1d", // expira em 1 dia
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
