import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { user_id } = req;
  console.log("\nUSER ID (ensureAdmin):", user_id);

  const userRepositories = getCustomRepository(UserRepositories);

  // vendo se o id é de algum admin
  const { admin } = await userRepositories.findOne(user_id);

  // se for admin vamos para a próxima função
  if (admin) {
    return next();
  }

  return res.status(401).json({
    error: "Unauthorized - Is not admin",
  });
}
