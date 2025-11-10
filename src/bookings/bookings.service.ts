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
      const lockResult = await manager.query(
        'SELECT pg_try_advisory_xact_lock($1) as locked',
        [lockId],
      );

      if (!lockResult[0]?.locked) {
        throw new BadRequestException('Слишком много одновременных запросов. Попробуйте позже.');
      }

      const event = await manager.findOne(Event, {
        where: { id: bookingData.event_id },
      });

      if (!event) {
        throw new NotFoundException('Событие не найдено');
      }

      const existingBooking = await manager.findOne(Booking, {
        where: {
          eventId: bookingData.event_id,
          userId: bookingData.user_id,
        },
      });

      if (existingBooking) {
        throw new ConflictException('Вы уже забронировали место на это событие');
      }

      const bookedCount = await manager.count(Booking, {
        where: { eventId: bookingData.event_id },
      });

      if (bookedCount >= event.totalSeats) {
        throw new BadRequestException('Все места на это событие уже забронированы');
      }

      const booking = manager.create(Booking, {
        eventId: bookingData.event_id,
        userId: bookingData.user_id,
      });

      return await manager.save(Booking, booking);
    });
  }
}