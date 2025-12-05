import { BaseApiService } from './BaseApiService';
import { Booking } from '../models/booking.interface';

export class BookingService extends BaseApiService {
  async createBooking(data: Booking): Promise<Booking> {
    const response = await this.api.post('/booking', data);
    return response.data;
  }

  async getBooking(bookingid: number): Promise<Booking> {
    const response = await this.api.get(`/booking/${bookingid}`);
    return response.data;
  }

  async updateBooking(bookingid: number, data: Partial<Booking>): Promise<Booking> {
    const response = await this.api.put(`/booking/${bookingid}`, data);
    return response.data;
  }

  async deleteBooking(bookingid: number): Promise<void> {
    await this.api.delete(`/booking/${bookingid}`);
  }
}
