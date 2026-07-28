import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryDescription1785243710054 implements MigrationInterface {
    name = 'AddCategoryDescription1785243710054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`description\``);
    }

}
