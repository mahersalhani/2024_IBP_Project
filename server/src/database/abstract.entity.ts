import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;

  @CreateDateColumn()
  @ApiProperty({ example: '2021-09-01T00:00:00.000Z', description: 'Created at' })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
