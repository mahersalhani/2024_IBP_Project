import { HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { Product, User } from '@/database';
import { DataSource } from 'typeorm';
import { OkRes } from '@/common';
import { catchingError, skuNanoid } from '@/utils';

import { ProductDto, QueryUsersDto } from './dtos';

@Injectable()
export class AdminService {
  constructor(private readonly dataSource: DataSource) {}

  async createProduct(data: ProductDto) {
    return this.dataSource.transaction(async (manager) => {
      try {
        const { coverImage, description, isPublished, name, price, quantity } = data;

        const product = new Product({});

        const slug =
          slugify(name, { lower: true, strict: true, replacement: '-' }) +
          `-${skuNanoid(Math.floor(Math.random() * 6) + 5)}`;

        product.coverImage = coverImage;
        product.description = description;
        product.isPublished = isPublished;
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        product.slug = slug;

        await manager.save(product);

        return new OkRes('Product created successfully', HttpStatus.CREATED);
      } catch (error) {
        catchingError(error);
      }
    });
  }

  async updateProduct(id: number, data: ProductDto) {
    return this.dataSource.transaction(async (manager) => {
      try {
        const product = await manager.createQueryBuilder(Product, 'product').where('product.id = :id', { id }).getOne();

        if (!product) return new OkRes('Product not found', HttpStatus.NOT_FOUND);

        const { coverImage, description, isPublished, name, price, quantity } = data;

        const slug =
          slugify(name, { lower: true, strict: true, replacement: '-' }) +
          `-${skuNanoid(Math.floor(Math.random() * 6) + 5)}`;

        product.coverImage = coverImage;
        product.description = description;
        product.isPublished = isPublished;
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        if (product.name !== name) product.slug = slug;

        await manager.save(product);

        return new OkRes('Product updated successfully', HttpStatus.OK);
      } catch (error) {
        catchingError(error);
      }
    });
  }

  async deleteProduct(id: number) {
    return this.dataSource.transaction(async (manager) => {
      try {
        const product = await manager.createQueryBuilder(Product, 'product').where('product.id = :id', { id }).getOne();

        if (!product) return new OkRes('Product not found', HttpStatus.NOT_FOUND);

        product.isDeleted = true;

        await manager.save(product);

        return new OkRes('Product deleted successfully', HttpStatus.OK);
      } catch (error) {
        catchingError(error);
      }
    });
  }

  async getUsers(data: QueryUsersDto) {
    try {
      const { limit, page, role, search, sort, order } = data;

      const query = this.dataSource.getRepository(User).createQueryBuilder('user');

      if (role) query.andWhere('user.role = :role', { role });
      if (search) query.andWhere('user.username LIKE :search', { search: `%${search}%` });

      const [users, total] = await query
        .orderBy(`user.${sort || 'createdAt'}`, order || 'DESC') // Default sort by createdAt DESC
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return { users, total };
    } catch (error) {
      catchingError(error);
    }
  }
}
