import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  Get,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { ReserveBookingDto } from "./dto/reserve-booking.dto";
import { GetTopParams } from "./dto/get-top.params";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post("reserve")
  @HttpCode(HttpStatus.CREATED)
  async reserve(@Body() dto: ReserveBookingDto) {
    const booking = await this.bookingsService.reserve(dto);
    return { success: true, booking };
  }

  @Get("get-top")
  @HttpCode(HttpStatus.OK)
  async getTop(@Query() params: GetTopParams) {
    return this.bookingsService.getTop(params);
  }
}
