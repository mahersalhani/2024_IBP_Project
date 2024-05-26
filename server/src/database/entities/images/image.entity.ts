import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/database/abstract.entity';

@Entity({ name: 'temp_images' })
export class TempImage extends AbstractEntity<TempImage> {
  @Column({ unique: true })
  key: string;
}
