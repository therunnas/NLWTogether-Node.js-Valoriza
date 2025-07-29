import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = req.headers.authorization;
  console.log("\nTOKEN NORMAL (ensureAuthenticate):", authToken);

  // Validar se token está preenchido
  if (!authToken) {
    return res.status(401).end();
  }

  // ajustar o token que recebemos
  // separamos o token em duas partes
  // , = pulamos a primeira parte
  // , token = colocamos a segunda parte do token que separamos na var token
  const [, token] = authToken.split(" ");
  console.log("\nTOKEN TRATADO (ensureAuthenticate):", token);

  // Validar se o token é válido
  try {
    // token tratado + chave secreta
    const decode = verify(token, "6425ddbf9cd648e1e4d33c4340d3373d");
    console.log("\nDECODE (ensureAuthenticate):", decode);

    /* 
      {
        email: 'luigi.belanda.milani@gmail.com',
        iat: 1647610816,
        exp: 1647697216,
        sub: 'afac59e8-933c-44d9-8909-52384ee81743'
      }
    */

    const { sub } = verify(
      token,
      "6425ddbf9cd648e1e4d33c4340d3373d"
    ) as IPayLoad;
    console.log("\nID (ensureAuthenticate):", sub);

    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }

  // Recuperar infos do user
}
