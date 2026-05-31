import type { Booking, BookingExtra, CleaningService, TrendPoint, User } from '../../domain/entities';
import type { BookingRepository } from '../../domain/repositories/BookingRepository';

const extras: BookingExtra[] = [
  { id: 'windows', name: 'Ventanas', price: 24 },
  { id: 'fridge', name: 'Nevera', price: 18 },
  { id: 'oven', name: 'Horno', price: 16 },
  { id: 'closets', name: 'Armarios', price: 22 },
];

const users: User[] = [
  { id: 'u-ana', name: 'Ana Martin', email: 'ana@limpia.test', role: 'client' },
  { id: 'u-luis', name: 'Luis Herrera', email: 'luis@limpia.test', role: 'client' },
  { id: 'u-admin', name: 'Marta Admin', email: 'admin@limpia.test', role: 'admin' },
];

const services: CleaningService[] = [
  {
    id: 'basic',
    name: 'Limpieza basica',
    description: 'Mantenimiento semanal para hogares ordenados.',
    category: 'home',
    basePrice: 54,
    durationMinutes: 120,
  },
  {
    id: 'deep',
    name: 'Limpieza profunda',
    description: 'Cocina, bano, polvo dificil y zonas olvidadas.',
    category: 'deep',
    basePrice: 96,
    durationMinutes: 210,
  },
  {
    id: 'moving',
    name: 'Mudanza',
    description: 'Entrada o salida de vivienda con acabado intenso.',
    category: 'moving',
    basePrice: 128,
    durationMinutes: 270,
  },
  {
    id: 'office',
    name: 'Oficina',
    description: 'Puestos, salas, zonas comunes y cristales interiores.',
    category: 'office',
    basePrice: 82,
    durationMinutes: 180,
  },
];

const bookings: Booking[] = [
  {
    id: 'b-1',
    clientId: 'u-ana',
    serviceId: 'deep',
    scheduledAt: '2026-06-04T10:00:00',
    address: 'Calle Atocha 25, Madrid',
    status: 'confirmed',
    totalPrice: 138,
    extras: [extras[0], extras[1]],
  },
  {
    id: 'b-2',
    clientId: 'u-ana',
    serviceId: 'basic',
    scheduledAt: '2026-05-28T09:30:00',
    address: 'Calle Atocha 25, Madrid',
    status: 'completed',
    totalPrice: 54,
    extras: [],
  },
  {
    id: 'b-3',
    clientId: 'u-luis',
    serviceId: 'office',
    scheduledAt: '2026-06-01T18:00:00',
    address: 'Paseo de la Castellana 112, Madrid',
    status: 'pending',
    totalPrice: 120,
    extras: [extras[0], extras[3]],
  },
  {
    id: 'b-4',
    clientId: 'u-luis',
    serviceId: 'moving',
    scheduledAt: '2026-06-03T08:00:00',
    address: 'Calle Valencia 40, Barcelona',
    status: 'inProgress',
    totalPrice: 166,
    extras: [extras[1], extras[3]],
  },
];

export class InMemoryBookingRepository implements BookingRepository {
  private selectedRole: User['role'] = 'client';
  private bookings = [...bookings];

  setRole(role: User['role']) {
    this.selectedRole = role;
  }

  async findCurrentUser(): Promise<User> {
    return users.find((user) => user.role === this.selectedRole) ?? users[0];
  }

  async findUsers(): Promise<User[]> {
    return [...users];
  }

  async findServices(): Promise<CleaningService[]> {
    return [...services];
  }

  async findBookings(): Promise<Booking[]> {
    return [...this.bookings].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
  }

  async saveBooking(booking: Booking): Promise<Booking> {
    this.bookings = [booking, ...this.bookings];
    return booking;
  }

  async findBookingTrends(): Promise<TrendPoint[]> {
    return [
      { label: 'Ene', bookings: 42, revenue: 3600 },
      { label: 'Feb', bookings: 54, revenue: 4200 },
      { label: 'Mar', bookings: 49, revenue: 3900 },
      { label: 'Abr', bookings: 62, revenue: 5100 },
      { label: 'May', bookings: 74, revenue: 6400 },
      { label: 'Jun', bookings: 68, revenue: 5900 },
    ];
  }
}

export const availableExtras = extras;
