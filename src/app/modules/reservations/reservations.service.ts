import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly dbService: DBService) {}

  async createReservation(
    showing_id: number,
    seats: string[],
    user_id: number,
    ticket_no: number,
    blik_code: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    total_price: number,
    newsletter: boolean,
  ) {
    try {
      const checkIfEmailExists = await this.dbService.query(`
          SELECT
              *
          FROM
              newsletter
          WHERE
              email = '${email}'
      `);

      if (checkIfEmailExists.length === 0 && newsletter) {
        await this.dbService.query(`
            INSERT
            INTO
                newsletter
                    (
                        email
                    )
            VALUES
                (
                    '${email}'
                )
        `);
      }

      const result = await this.dbService.query(`
          INSERT
          INTO
              reservations
          (
              showing_id,
              seats,
              user_id,
              ticket_no,
              blik_code,
              first_name,
              last_name,
              phone_number,
              email,
              total_price
          )
          VALUES
              (
                ${showing_id},
                '{${seats}}',
                ${user_id},
                ${ticket_no},
                '${blik_code}',
                '${first_name}',
                '${last_name}',
                '${phone_number}',
                '${email}',
                ${total_price}
              )
          RETURNING
              ticket_no as ticketNo
      `);

      await this.dbService.query(`
          UPDATE
              showings
          SET
              paid_seats = paid_seats || '{${seats}}'
          WHERE
              showing_id = ${showing_id}
      `);

      return {
        data: result[0],
        isError: false,
      };
    } catch (err) {
      return {
        data: err,
        isError: true,
      };
    }
  }

  async getAllReservations() {
    try {
      const result = await this.dbService.query(`
          SELECT
              reservations.seats,
              reservations.ticket_no,
              reservations.first_name,
              reservations.last_name,
              reservations.email,
              reservations.phone_number,
              reservations.blik_code,
              reservations.user_id,
              reservations.showing_id,
              reservations.total_price,
              showings.start,
              showings.hall_id,
              movies.title
          FROM
              reservations
                  INNER JOIN showings ON showings.showing_id = reservations.showing_id
                  INNER JOIN movies ON movies.movie_id = showings.movie_id
          ORDER BY
              reservations.reservation_id
      `);
      if (Array.isArray(result) && result.length > 0) {
        return result;
      }

      return null;
    } catch (err) {
      return null;
    }
  }

  async getMyReservations(id: number) {
    try {
      const result = await this.dbService.query(`
          SELECT
              ticket_no as ticketNo,
              movies.title as title,
              showings.start as start,
              halls.hall_no as hallNo,
              seats,
              total_price as totalPrice
          FROM
              reservations
          INNER JOIN showings ON showings.showing_id = reservations.showing_id
          INNER JOIN movies ON movies.movie_id = showings.movie_id
          INNER JOIN halls ON halls.hall_id = showings.hall_id
          WHERE
              user_id = ${id}
          ORDER BY
              reservation_id
      `);
      if (Array.isArray(result) && result.length > 0) {
        return result;
      }

      return null;
    } catch (err) {
      return null;
    }
  }

  async getReservationByTicket(ticketNo: number) {
    try {
      const result = await this.dbService.query(`
          SELECT
              first_name as firstName,
              last_name as lastName,
              email,
              seats,
              total_price as totalPrice,
              phone_number as phoneNumber,
              ticket_no as ticketNo,
              showings.start as start,
              halls.hall_no as hallNo,
              movies.title as title
          FROM
              reservations
          INNER JOIN showings ON showings.showing_id = reservations.showing_id
          INNER JOIN movies ON movies.movie_id = showings.movie_id
          INNER JOIN halls ON halls.hall_id = showings.hall_id
          WHERE
              ticket_no = ${ticketNo}
          ORDER BY
              reservation_id
      `);
      if (Array.isArray(result) && result.length > 0) {
        return result[0];
      }

      return null;
    } catch (err) {
      return null;
    }
  }

  async getReservationByTicketNoAndEmail(ticketNo: number, email: string) {
    try {
      const result = await this.dbService.query(`
        SELECT
            ticket_no
        FROM
            reservations
        WHERE
            ticket_no = ${ticketNo}
        AND
            email = '${email}'
      `);

      return result[0].ticket_no;
    } catch (err) {
      return {
        isError: true,
      };
    }
  }

  async refundReservation(ticketNo: number) {
    try {
      const result = await this.dbService.query(`
          SELECT
              *
          FROM
              reservations
          INNER JOIN showings ON showings.showing_id = reservations.showing_id
          WHERE
              ticket_no = ${ticketNo}
      `);

      if (Array.isArray(result) && result.length > 0) {
        const showingDate = new Date(result[0].start);
        const now = new Date();

        if (showingDate.getTime() - now.getTime() > 86400000) {
          await this.dbService.query(`
              DELETE
              FROM
                  reservations
              WHERE
                  ticket_no = ${ticketNo}
          `);

          const seats = result[0].seats;
          const paidSeats = result[0].paid_seats;
          const paidSeatsWithoutSeats = paidSeats.filter(
            (seat: string) => !seats.includes(seat),
          );

          await this.dbService.query(`
              UPDATE
                  showings
              SET
                  paid_seats = ${
                    seats ? `'{${paidSeatsWithoutSeats}}'` : 'paid_seats'
                  }
              WHERE
                  showing_id = ${result[0].showing_id}
          `);

          return {
            isError: false,
            message: 'Rezerwacja została pomyślnie zwrócona',
          };
        } else {
          return {
            isTimeError: true,
          };
        }
      }

      return {
        isError: true,
      };
    } catch (err) {
      return {
        isError: true,
      };
    }
  }
}
