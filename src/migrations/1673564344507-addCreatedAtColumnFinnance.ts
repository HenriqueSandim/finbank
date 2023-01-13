import { MigrationInterface, QueryRunner } from "typeorm";

export class addCreatedAtColumnFinnance1673564344507 implements MigrationInterface {
    name = 'addCreatedAtColumnFinnance1673564344507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "finances" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "finances" DROP COLUMN "createdAt"`);
    }

}
