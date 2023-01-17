import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImgColumn1673973917051 implements MigrationInterface {
    name = 'AddImgColumn1673973917051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}
