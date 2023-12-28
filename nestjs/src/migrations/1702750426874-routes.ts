import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Routes1702750426874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'routes',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'source',
            type: 'json',
          },
          {
            name: 'destination',
            type: 'json',
          },
          {
            name: 'distance',
            type: 'float',
          },
          {
            name: 'duration',
            type: 'float',
          },
          {
            name: 'directions',
            type: 'json',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('routes');
  }
}
