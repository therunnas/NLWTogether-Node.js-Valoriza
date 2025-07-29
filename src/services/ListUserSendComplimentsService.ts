import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id,
      },
      // pegando mais dados relacionados na tabela (FKs)
      relations: ["userReceiver", "tag"]
    });

    return compliments;
  }
}

export { ListUserSendComplimentsService };
