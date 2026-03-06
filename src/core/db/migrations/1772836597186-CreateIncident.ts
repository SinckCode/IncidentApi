import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIncident1772836597186 implements MigrationInterface {
    name = 'CreateIncident1772836597186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "incident" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "type" integer NOT NULL, CONSTRAINT "PK_5f90b28b0b8238d89ee8edcf96e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "incident"`);
    }

}
