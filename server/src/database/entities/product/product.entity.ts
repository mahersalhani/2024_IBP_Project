import { AfterLoad, Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/database/abstract.entity';

import { addImageURL } from '@/utils';

@Entity({ name: 'products' })
export class Product extends AbstractEntity<Product> {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  coverImage: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'float', scale: 2, precision: 10 })
  price: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ default: 0 })
  quantity: number;

  @AfterLoad()
  addImageURL() {
    this.coverImage = addImageURL(this.coverImage);
  }
}
