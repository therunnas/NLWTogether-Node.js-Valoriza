import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddPassword1647523535076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users", // tabela
      // nova coluna
      new TableColumn({
        name: "password",
        type: "varchar",
        // permitindo que os valores sejam nulos para os registros que já existem no BD
        isNullable: true, 
      })
    );
  }

  // await queryRunner.dropColumn("tabela", "coluna");
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "password");
  }
}
