import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  // aqui fazemos um desestruturação dos dados que chegam como base na interface acima
  // se não vier nada na prop admin ela será false
  async execute({ name, email, admin = false, password }: IUserRequest) {
    // instanciando a classe do nosso repo UserRepositories que ja tem algumas funções prontas
    // por usarmos nesta classe um repo do proprio typeorm temos que chamar a função getCustomRpository
    // ja que estamos de certa forma modificando ele, passamos como parâmetro nossa classe normalmente
    const usersRepository = getCustomRepository(UserRepositories);

    // verificamos se o campo email veio com algo
    if (!email) {
      throw new Error("Email incorrect");
    }

    // verificamos se o user já existe
    const usersAlreadyExists = await usersRepository.findOne({
      email,
    });

    // se existir lançamos um erro
    if (usersAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    // passando os dados para criar o user
    const user = usersRepository.create({
      name,
      email,
      admin,
      // aqui passamos o nome do campo + a var que vai ocupar ele, isso serve para quando o campo no BD não tem o mesmo nome que a var
      password: passwordHash,
    });

    // salvando o user que queremos criar
    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
