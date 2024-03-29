import { Injectable } from '@nestjs/common';

import { DBService } from '../db/db.service';
import { MoviePostData, MovieUpdateData } from './movies.types';

@Injectable()
export class MoviesService {
  constructor(private readonly dbService: DBService) {}

  async getMovie(id: number) {
    try {
      const result = await this.dbService.query(`
        SELECT movie_id as id,
                title,
                description,
                is_premiere as isPremiere,
                duration,
                genre,
                age,
                short_description as shortDescription,
                img,
                rating
        FROM movies
        WHERE movie_id = ${id}
      `);

      if (Array.isArray(result) && result.length > 0) {
        return result[0];
      }
    } catch (err) {
      return null;
    }
  }

  async getMovies(sortBy = 'movie_id') {
    try {
      const result = await this.dbService.query(`
      SELECT  movie_id as id,
              title,
              description,
              is_premiere as isPremiere,
              duration,
              genre,
              age,
              short_description as shortDescription,
              img,
              rating
      FROM movies
      ORDER BY ${sortBy}
      `);

      if (Array.isArray(result) && result.length > 0) {
        return result;
      }

      return null;
    } catch (err) {
      return null;
    }
  }

  async createMovie(moviePostData: MoviePostData) {
    try {
      const {
        title,
        description,
        isPremiere,
        duration,
        genre,
        age,
        img,
        rating,
      } = moviePostData;

      const result = await this.dbService.query(`
        INSERT
        INTO 
            movies 
                (
                  title,
                  description,
                  short_description,
                  is_premiere,
                  duration,
                  genre,
                  age,
                  img,
                  rating
                )
        VALUES
            ('${title}', '${description}', '${description.slice(
        0,
        100,
      )}', ${isPremiere}, '${duration}', '{${genre}}', '${age}', '${img}', ${rating})
        RETURNING movie_id as id
      `);

      const ratingArray = [rating];

      await this.dbService.query(`
        INSERT
        INTO
            ratings
                (movie_id, rating, user_id)
        VALUES
            (${result[0].id}, '{${ratingArray}}', '{}')
      `);

      const updatedMovies = await this.dbService.query(`
          SELECT  movie_id as id,
                  title,
                  description,
                  is_premiere as isPremiere,
                  duration,
                  genre,
                  age,
                  short_description as shortDescription,
                  img,
                  rating
          FROM movies
          ORDER BY movie_id
      `);

      return {
        data: updatedMovies,
        isError: false,
      };
    } catch (err) {
      return {
        data: err,
        isError: true,
      };
    }
  }

  async updateMovie(id: number, movieUpdateData: MovieUpdateData) {
    try {
      const { title, description, img, age } = movieUpdateData;

      const result = await this.dbService.query(`
        UPDATE
            movies
        SET
            title = ${title ? `'${title}'` : 'title'},
            description = ${description ? `'${description}'` : 'description'},
            short_description = ${
              description
                ? `'${description.slice(0, 100)}'`
                : 'short_description'
            },
            img = ${img ? `'${img}'` : 'genre'},
            age = ${age ? `'${age}'` : 'age'}
        WHERE
            movie_id = ${id}
      `);

      const updatedMovies = await this.dbService.query(`
        SELECT  movie_id as id,
                title,
                description,
                is_premiere as isPremiere,
                duration,
                genre,
                age,
                short_description as shortDescription,
                img,
                rating
        FROM movies
        ORDER BY movie_id
      `);

      return {
        data: updatedMovies,
        isError: false,
      };
    } catch (err) {
      return {
        data: err,
        isError: true,
      };
    }
  }

  async deleteMovie(id: number) {
    try {
      const showings = await this.dbService.query(`
        SELECT
            *
        FROM
            showings
        WHERE
            movie_id = ${id}
      `);

      if (showings.length) {
        await this.dbService.query(`
          DELETE
          FROM
              showings
          WHERE
              movie_id = ${id}
        `);
      }

      const wishlist = await this.dbService.query(`
        SELECT
            *
        FROM
            wishlist
        WHERE
            movie_id = ${id}
      `);

      if (wishlist.length) {
        await this.dbService.query(`
          DELETE
          FROM
              wishlist
          WHERE
              movie_id = ${id}
        `);
      }

      const ratings = await this.dbService.query(`
        SELECT
            *
        FROM
            ratings
        WHERE
            movie_id = ${id}
      `);

      if (ratings.length) {
        await this.dbService.query(`
          DELETE
          FROM
              ratings
          WHERE
              movie_id = ${id}
        `);
      }

      const result = await this.dbService.query(`
        DELETE
        FROM
            movies
        WHERE
            movie_id = ${id}
      `);

      const updatedMovies = await this.dbService.query(`
        SELECT  movie_id as id,
              title,
              description,
              is_premiere as isPremiere,
              duration,
              genre,
              age,
              short_description as shortDescription,
              img,
              rating
        FROM movies
        ORDER BY movie_id
      `);

      return {
        data: updatedMovies,
        isError: false,
      };
    } catch (err) {
      return {
        data: err,
        isError: true,
      };
    }
  }
}
