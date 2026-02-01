import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BookingsController', () => {
  let controller: BookingsController;
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [{
        provide: BookingsService,
        useValue: {
          cancelBooking: jest.fn(),
        },
      }],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingsService>(BookingsService);
  });

  describe('cancelBooking', () => {
    it('should return success message when booking is canceled', async () => {
      const bookingId = 1;
      jest.spyOn(service, 'cancelBooking').mockResolvedValue({ success: true, message: 'Бронирование отменено' });

      const result = await controller.cancelBooking({ booking_id: bookingId });
      expect(result).toEqual({ success: true, message: 'Бронирование отменено' });
      expect(service.cancelBooking).toHaveBeenCalledWith(bookingId);
    });

    it('should throw NotFoundException when booking does not exist', async () => {
      const bookingId = 999;
      jest.spyOn(service, 'cancelBooking').mockRejectedValue(new NotFoundException('Бронирование не найдено'));

      await expect(controller.cancelBooking({ booking_id: bookingId })).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid booking_id', async () => {
      await expect(controller.cancelBooking({ booking_id: 'invalid' })).rejects.toThrow(BadRequestException);
    });
  });
});