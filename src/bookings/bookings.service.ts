import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Event } from '../events/entities/event.entity';
import { ReserveBookingDto } from './dto/reserve-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async reserve(bookingData: ReserveBookingDto): Promise<Booking> {
    const lockId = bookingData.event_id;
    
    return await this.dataSource.transaction(async (manager) => {
      await manager.query("SELECT pg_advisory_xact_lock($1)", [lockId]);

      const event = await manager
        .createQueryBuilder(Event, "event")
        .setLock("pessimistic_write")
        .where("event.id = :id", { id: bookingData.event_id })
        .getOne();

      if (!event) {
        throw new NotFoundException("Событие не найдено");
      }

      const existingBooking = await manager.findOne(Booking, {
        where: {
          eventId: bookingData.event_id,
          userId: bookingData.user_id,
        },
      });

      if (existingBooking) {
        throw new ConflictException(
          "Вы уже забронировали место на это событие"
        );
      }

      const bookedCount = await manager
        .createQueryBuilder(Booking, "booking")
        .where("booking.eventId = :eventId", { eventId: bookingData.event_id })
        .getCount();

      if (bookedCount >= event.totalSeats) {
        throw new BadRequestException(
          "Все места на это событие уже забронированы"
        );
      }

      const booking = manager.create(Booking, {
        eventId: bookingData.event_id,
        userId: bookingData.user_id,
      });

      return await manager.save(Booking, booking);
    });
  }
}