import { MigrationInterface, QueryRunner } from "typeorm";

export class addTransferTable1673540362229 implements MigrationInterface {
    name = 'addTransferTable1673540362229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transferences" DROP CONSTRAINT "FK_1395cbc87092e375d18e3ab7a7a"`);
        await queryRunner.query(`ALTER TABLE "transferences" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "transferences" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transferences" ADD "receiverAccountId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transferences" ADD "senderAccountId" integer`);
        await queryRunner.query(`ALTER TABLE "transferences" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transferences" ADD CONSTRAINT "FK_9f6bf2bad1b247ba4aea5abae17" FOREIGN KEY ("senderAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transferences" DROP CONSTRAINT "FK_9f6bf2bad1b247ba4aea5abae17"`);
        await queryRunner.query(`ALTER TABLE "transferences" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transferences" DROP COLUMN "senderAccountId"`);
        await queryRunner.query(`ALTER TABLE "transferences" DROP COLUMN "receiverAccountId"`);
        await queryRunner.query(`ALTER TABLE "transferences" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "transferences" ADD "accountId" integer`);
        await queryRunner.query(`ALTER TABLE "transferences" ADD CONSTRAINT "FK_1395cbc87092e375d18e3ab7a7a" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
