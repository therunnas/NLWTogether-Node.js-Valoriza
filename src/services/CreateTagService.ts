import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    // verificando se o campo name está vindo com algo e não vazio
    if (!name) {
      throw new Error("Incorrect name!");
    }

    // buscando no banco se tem alguma tag já com o mesmo nome
    const tagAlreadyExists = await tagsRepositories.findOne({
      name,
    });

    // se já existir a tag ele retorna esse erro
    if (tagAlreadyExists) {
      throw new Error("Tag already exists");
    }

    // se a tag não existir criamos ela
    const tag = tagsRepositories.create({
      name,
    });

    // salvamos ela no BD
    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
