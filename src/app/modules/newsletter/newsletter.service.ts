import { Injectable } from '@nestjs/common';
import { DBService } from 'src/app/modules/db/db.service';

@Injectable()
export class NewsletterService {
  constructor(private readonly dbService: DBService) {}
  async getNewsletter() {
    try {
      const result = await this.dbService.query(`
        SELECT
            newsletter_id AS id,
            email
        FROM
            newsletter
       `);

      return {
        isError: false,
        data: result,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  }

  async getNewsletterById(id: number) {
    try {
      const result = await this.dbService.query(`
        SELECT
            newsletter_id AS id,
            email
        FROM
            newsletter
        WHERE
            newsletter_id = ${id}
       `);

      if (!result.length) {
        return {
          isError: true,
          data: null,
        };
      }

      return {
        isError: false,
        data: result[0],
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  }

  async checkIfEmailExists(email: string) {
    try {
      const result = await this.dbService.query(`
        SELECT
            newsletter_id AS id,
            email
        FROM
            newsletter
        WHERE
            email = '${email}'
      `);

      if (result.length === 0) {
        return {
          isError: false,
          data: false,
        };
      }

      return {
        isError: false,
        data: true,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  }

  async updateNewsletter(id: number, email: string) {
    try {
      const result = await this.dbService.query(`
        UPDATE
            newsletter
        SET
            email = '${email}'
        WHERE
            newsletter_id = ${id}
      `);

      const newResult = await this.dbService.query(`
        SELECT
            newsletter_id AS id,
            email
        FROM
            newsletter
      `);

      return {
        isError: false,
        data: newResult,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  }

  async createNewsletter(email: string) {
    try {
      const result = await this.dbService.query(`
        INSERT INTO
            newsletter (email)
        VALUES
            ('${email}')
      `);

      const newResult = await this.dbService.query(`
        SELECT
            newsletter_id AS id,
            email
        FROM
            newsletter
      `);

      return {
        isError: false,
        data: newResult,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  }

  async remove(id: number) {
    try {
      const result = await this.dbService.query(`
        DELETE
        FROM
            newsletter
        WHERE
            newsletter_id = ${id}
      `);

      return {
        isError: false,
        data: result,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  }

  async removeByEmail(email: string) {
    try {
      const result = await this.dbService.query(`
        DELETE
        FROM
            newsletter
        WHERE
            email = '${email}'
      `);

      return {
        isError: false,
        data: result,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  }
}
