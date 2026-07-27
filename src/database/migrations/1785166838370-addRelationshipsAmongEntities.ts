import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipsAmongEntities1785166838370 implements MigrationInterface {
    name = 'AddRelationshipsAmongEntities1785166838370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_99d90c2a483d79f3b627fb1d5e\` ON \`products\` (\`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_ff56834e735fa78a15d0cf2192\` ON \`products\` (\`categoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_99d90c2a483d79f3b627fb1d5e9\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_99d90c2a483d79f3b627fb1d5e9\``);
        await queryRunner.query(`DROP INDEX \`IDX_ff56834e735fa78a15d0cf2192\` ON \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_99d90c2a483d79f3b627fb1d5e\` ON \`products\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`userId\``);
    }

}
