import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { HttpStatus } from '@nestjs/common';

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
    it('should return success message on successful cancellation', async () => {
      const bookingId = '1';
      const result = { success: true, result: 'Booking cancelled successfully' };
      jest.spyOn(service, 'cancelBooking').mockResolvedValue(result);

      const response = await controller.cancelBooking(bookingId);
      expect(response).toEqual(result);
      expect(response.success).toBe(true);
    });

    it('should return 404 if booking does not exist', async () => {
      const bookingId = '999';
      jest.spyOn(service, 'cancelBooking').mockRejectedValue({ status: HttpStatus.NOT_FOUND, message: 'Booking not found' });

      try {
        await controller.cancelBooking(bookingId);
      } catch (error) {
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe('Booking not found');
      }
    });

    it('should return 400 for invalid booking ID', async () => {
      const bookingId = 'invalid_id';
      try {
        await controller.cancelBooking(bookingId);
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);
        expect(error.message).toBe('Invalid booking ID format');
      }
    });
  });
});