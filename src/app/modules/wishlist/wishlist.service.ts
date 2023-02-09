import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private readonly dbService: DBService) {}

  async createWishList(createWishlistDto: CreateWishlistDto) {
    try {
      const { user_id, movie_id } = createWishlistDto;

      const check = await this.dbService.query(`
        SELECT
            *
        FROM
            wishlist
        WHERE
            user_id = ${user_id} AND movie_id = ${movie_id}
      `);

      if (Array.isArray(check) && check.length > 0) {
        return {
          message: 'Film jest już w ulubionych',
        };
      }

      const result = await this.dbService.query(`
        INSERT INTO 
            wishlist 
                (user_id, movie_id)
        VALUES
            (${user_id}, ${movie_id})
      `);

      return {
        message: 'Dodano film do ulubionych',
      };
    } catch (error) {
      return {
        isError: true,
      };
    }
  }

  findAll() {
    return `This action returns all wishlist`;
  }

  async getUserWishList(id: string) {
    try {
      const result = await this.dbService.query(`
        SELECT
            wishlist.id,
            wishlist.user_id,
            wishlist.movie_id,
            movies.title,
            movies.poster_path,
            movies.release_date,
            movies.vote_average
        FROM
            wishlist
        LEFT JOIN movies ON wishlist.movie_id = movies.id
        WHERE
            wishlist.user_id = ${id}
      `);

      return result;
    } catch (error) {
      return {
        isError: true,
      };
    }
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
