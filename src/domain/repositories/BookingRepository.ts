import type { Booking, CleaningService, TrendPoint, User } from '../entities';

export interface BookingRepository {
  findCurrentUser(): Promise<User>;
  findUsers(): Promise<User[]>;
  findServices(): Promise<CleaningService[]>;
  findBookings(): Promise<Booking[]>;
  saveBooking(booking: Booking): Promise<Booking>;
  findBookingTrends(): Promise<TrendPoint[]>;
}
