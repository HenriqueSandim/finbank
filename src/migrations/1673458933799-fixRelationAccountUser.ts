import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRelationAccountUser1673458933799 implements MigrationInterface {
    name = 'fixRelationAccountUser1673458933799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transferences" DROP CONSTRAINT "FK_1395cbc87092e375d18e3ab7a7a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "finances" DROP CONSTRAINT "FK_2a97e4910ff8c90cd7910d569df"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "accounts_id_seq" OWNED BY "accounts"."id"`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT nextval('"accounts_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "transferences" ADD CONSTRAINT "FK_1395cbc87092e375d18e3ab7a7a" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "finances" ADD CONSTRAINT "FK_2a97e4910ff8c90cd7910d569df" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "finances" DROP CONSTRAINT "FK_2a97e4910ff8c90cd7910d569df"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "transferences" DROP CONSTRAINT "FK_1395cbc87092e375d18e3ab7a7a"`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "accounts_id_seq"`);
        await queryRunner.query(`ALTER TABLE "finances" ADD CONSTRAINT "FK_2a97e4910ff8c90cd7910d569df" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transferences" ADD CONSTRAINT "FK_1395cbc87092e375d18e3ab7a7a" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
