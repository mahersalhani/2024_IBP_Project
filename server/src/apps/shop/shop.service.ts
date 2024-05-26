import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { OkRes } from '@/common';
import { Product } from '@/database';
import { catchingError } from '@/utils';

import { QueryProductDto } from './dtos';

@Injectable()
export class ShopService {
  constructor(private readonly dataSource: DataSource) {}

  async getProduct(slug: string) {
    return this.dataSource.transaction(async (manager) => {
      try {
        const product = await manager
          .createQueryBuilder(Product, 'product')
          .where('product.slug = :slug', { slug })
          .getOne();

        if (!product) return new OkRes('Product not found', HttpStatus.NOT_FOUND);

        return product;
      } catch (error) {
        catchingError(error);
      }
    });
  }

  async getProducts(data: QueryProductDto) {
    return this.dataSource.transaction(async (manager) => {
      try {
        const { isPublished, limit, page, search } = data;

        const query = manager
          .createQueryBuilder(Product, 'product')
          .where('product.isDeleted = :isDeleted', { isDeleted: false });

        if (isPublished !== undefined) query.andWhere('product.isPublished = :isPublished', { isPublished });
        if (search) query.andWhere('product.name OR product.description LIKE :search', { search: `%${search}%` });

        const [products, total] = await query
          .skip((page - 1) * limit)
          .take(limit)
          .getManyAndCount();

        return {
          total,
          products,
        };
      } catch (error) {
        catchingError(error);
      }
    });
  }
}
