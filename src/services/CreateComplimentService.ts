import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UserRepositories);

    // o user não pode dar elogios a ele mesmo
    if (user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver");
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    // vendo se o user existe
    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists!");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;

  }
}

export { CreateComplimentService };
