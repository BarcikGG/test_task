import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { ReserveBookingDto } from './dto/reserve-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('reserve')
  @HttpCode(HttpStatus.CREATED)
  async reserve(@Body() dto: ReserveBookingDto) {
    const booking = await this.bookingsService.reserve(dto);
    return { success: true, booking };
  }
}

