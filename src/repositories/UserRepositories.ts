import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

// extends = pega os métodos de outras classes etc
@EntityRepository(User)
class UserRepositories extends Repository<User> {}

export { UserRepositories };
