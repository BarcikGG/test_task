import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('BookingsController (integration)', () => {
  let app: INestApplication;
  let bookingsService = { cancelBooking: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [{ provide: BookingsService, useValue: bookingsService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('DELETE /bookings/cancel/:id', () => {
    it('should return 200 and success message on successful cancellation', async () => {
      bookingsService.cancelBooking = jest.fn().mockResolvedValue('Booking cancelled successfully');

      const response = await request(app.getHttpServer())
        .delete('/bookings/cancel/1')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({ success: true, result: 'Booking cancelled successfully' });
    });

    it('should return 404 for non-existent booking', async () => {
      bookingsService.cancelBooking = jest.fn().mockRejectedValue(new Error('Booking not found'));

      const response = await request(app.getHttpServer())
        .delete('/bookings/cancel/999')
        .expect(HttpStatus.NOT_FOUND);

      expect(response.body).toEqual({ statusCode: 404, message: 'Booking not found' });
    });

    it('should return 400 for invalid booking ID', async () => {
      const response = await request(app.getHttpServer())
        .delete('/bookings/cancel/invalid_id')
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body).toEqual({ statusCode: 400, message: 'Invalid booking ID format' });
    });
  });
});