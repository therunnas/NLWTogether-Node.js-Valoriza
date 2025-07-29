import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController {
  async handle(req: Request, res: Response) {
    // pegando o dado do corpo da requisição
    const { name } = req.body;

    // instanciando a classe do nosso service
    const createTagService = new CreateTagService();

    // chamando o método execute da classe e passando name como parâmetro
    const tag = await createTagService.execute(name);

    // se der certo retorna um json
    return res.json(tag);
  }
}

export { CreateTagController };
