import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';

describe('BookingsService', () => {
  let service: BookingsService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingsService, {
        provide: DataSource,
        useValue: {
          transaction: jest.fn(),
          findOne: jest.fn(),
          remove: jest.fn(),
        },
      }],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    dataSource = module.get<DataSource>(DataSource);
  });

  describe('cancelBooking', () => {
    it('should successfully cancel a booking', async () => {
      const bookingId = 1;
      const booking = new Booking();
      booking.id = bookingId;

      jest.spyOn(dataSource, 'findOne').mockResolvedValue(booking);
      jest.spyOn(dataSource, 'remove').mockResolvedValue(undefined);

      await service.cancelBooking(bookingId);

      expect(dataSource.findOne).toHaveBeenCalledWith(Booking, { where: { id: bookingId } });
      expect(dataSource.remove).toHaveBeenCalledWith(Booking, booking);
    });

    it('should throw NotFoundException if booking does not exist', async () => {
      const bookingId = 999;
      jest.spyOn(dataSource, 'findOne').mockResolvedValue(null);

      await expect(service.cancelBooking(bookingId)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if bookingId is invalid', async () => {
      const bookingId = 'invalid';
      await expect(service.cancelBooking(bookingId as any)).rejects.toThrow(BadRequestException);
    });
  });
});