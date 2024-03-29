import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  Headers,
} from '@nestjs/common';
import { Public } from 'src/app/declarations/isPublic';
import ResponseDictionary from 'src/app/dictionaries/Response.dictionary';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Public()
  @Post()
  async createReservation(@Body() body) {
    const { isError, data } = await this.reservationsService.createReservation(
      body.showing_id,
      body.seats,
      body.user_id,
      body.ticket_no,
      body.blik_code,
      body.first_name,
      body.last_name,
      body.phone_number,
      body.email,
      body.total_price,
      body.newsletter,
    );

    console.log(isError, data);

    if (isError) {
      throw new HttpException(
        'Nie można zwrócić rezerwacji, która jest mniej niż 24h przed seansem',
        400,
      );
    }

    return {
      message: data,
    };
  }

  @Public()
  @Get()
  async getAllReservations() {
    const response = await this.reservationsService.getAllReservations();

    if (!response) {
      throw new HttpException(ResponseDictionary.reservationsError, 400);
    }

    return {
      reservations: response,
      count: response.length,
    };
  }

  @Get(':id')
  async getMyReservations(@Param('id') id: number) {
    const response = await this.reservationsService.getMyReservations(id);

    if (!response) {
      throw new HttpException(ResponseDictionary.reservationsError, 400);
    }

    return {
      tickets: response,
      count: response.length,
    };
  }

  @Public()
  @Get('ticket/:id')
  async getReservationByTicket(@Param('id') id: number, @Headers() headers) {
    if (id !== headers.ticket_no) {
      throw new HttpException('Nie masz dostępu do tej strony', 404);
    }
    const response = await this.reservationsService.getReservationByTicket(id);

    if (!response) {
      throw new HttpException(ResponseDictionary.reservationsError, 400);
    }

    return {
      ticket: response,
    };
  }

  @Public()
  @Post('ticket')
  async getReservationByTicketNoAndEmail(@Body() body, @Headers() headers) {
    if (body.ticket_no !== headers.ticket_no) {
      throw new HttpException('Nie masz dostępu do tej strony', 404);
    }
    const response =
      await this.reservationsService.getReservationByTicketNoAndEmail(
        body.ticket_no,
        body.email,
      );

    if (!response) {
      throw new HttpException(ResponseDictionary.reservationsError, 400);
    }

    return {
      ticket_no: response,
    };
  }

  @Public()
  @Patch(':id')
  async refundReservation(@Param('id') id: number) {
    const { isError, isTimeError, message } =
      await this.reservationsService.refundReservation(id);

    if (isError) {
      throw new HttpException(ResponseDictionary.reservationsError, 400);
    }

    if (isTimeError) {
      throw new HttpException(
        'Nie można zwrócić rezerwacji, ponieważ do seansu zostało mniej niż 24h',
        400,
      );
    }

    return {
      message: message,
    };
  }
}
