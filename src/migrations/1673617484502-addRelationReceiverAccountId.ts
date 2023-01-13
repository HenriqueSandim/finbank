import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelationReceiverAccountId1673617484502 implements MigrationInterface {
    name = 'addRelationReceiverAccountId1673617484502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transferences" ALTER COLUMN "receiverAccountId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transferences" ADD CONSTRAINT "FK_0ae08817631dfa1c1e6c7da2e5d" FOREIGN KEY ("receiverAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transferences" DROP CONSTRAINT "FK_0ae08817631dfa1c1e6c7da2e5d"`);
        await queryRunner.query(`ALTER TABLE "transferences" ALTER COLUMN "receiverAccountId" SET NOT NULL`);
    }

}
