import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { instanceToPlain } from "class-transformer";

class ListUserService {
  async execute() {
    const userRepositories = getCustomRepository(UserRepositories);

    const users = await userRepositories.find();

    return instanceToPlain(users);
  }
}

export { ListUserService };
