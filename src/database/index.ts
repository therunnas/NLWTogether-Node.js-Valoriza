import { createConnection } from "typeorm";

// criando a conexão com o bando de dados
createConnection();

// COMANDO BD
/**
 * yarn typeorm -help
 * yarn typeorm migration:create -n CreateUsers
 * yarn typeorm migration:run (roda as migrations)
 * yarn typeorm migration:revert (reverte a última migration rodada)
 * yarn typeorm entity:create -n User (criando entidade User)
 * yarn typeorm migration:create -n CreateTags (Criando migration de Tags)
 */
