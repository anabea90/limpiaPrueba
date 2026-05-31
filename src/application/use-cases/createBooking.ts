import type { Booking, BookingExtra, CleaningService } from '../../domain/entities';
import type { BookingRepository } from '../../domain/repositories/BookingRepository';

export interface CreateBookingInput {
  clientId: string;
  service: CleaningService;
  date: string;
  time: string;
  address: string;
  extras: BookingExtra[];
}

export class CreateBooking {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(input: CreateBookingInput): Promise<Booking> {
    const extrasPrice = input.extras.reduce((total, extra) => total + extra.price, 0);
    const booking: Booking = {
      id: crypto.randomUUID(),
      clientId: input.clientId,
      serviceId: input.service.id,
      scheduledAt: `${input.date}T${input.time}:00`,
      address: input.address,
      status: 'pending',
      totalPrice: input.service.basePrice + extrasPrice,
      extras: input.extras,
    };

    return this.bookingRepository.saveBooking(booking);
  }
}
