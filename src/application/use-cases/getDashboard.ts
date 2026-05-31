import type { Booking, DashboardMetric } from '../../domain/entities';
import type { BookingRepository } from '../../domain/repositories/BookingRepository';

const eur = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export class GetDashboard {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute() {
    const [currentUser, users, services, bookings, trends] = await Promise.all([
      this.bookingRepository.findCurrentUser(),
      this.bookingRepository.findUsers(),
      this.bookingRepository.findServices(),
      this.bookingRepository.findBookings(),
      this.bookingRepository.findBookingTrends(),
    ]);

    const visibleBookings =
      currentUser.role === 'admin' ? bookings : bookings.filter((booking) => booking.clientId === currentUser.id);

    const metrics = currentUser.role === 'admin'
      ? this.buildAdminMetrics(bookings, users.length)
      : this.buildClientMetrics(visibleBookings);

    return {
      currentUser,
      users,
      services,
      bookings: visibleBookings,
      allBookings: bookings,
      trends,
      metrics,
    };
  }

  private buildAdminMetrics(bookings: Booking[], clientCount: number): DashboardMetric[] {
    const activeBookings = bookings.filter((booking) => !['completed', 'cancelled'].includes(booking.status));
    const revenue = bookings
      .filter((booking) => booking.status === 'completed')
      .reduce((total, booking) => total + booking.totalPrice, 0);

    return [
      { label: 'Reservas hoy', value: '8', trend: '+18%' },
      { label: 'Ingresos mes', value: eur.format(revenue), trend: '+12%' },
      { label: 'Clientes', value: String(clientCount), trend: '+6%' },
      { label: 'Activas', value: String(activeBookings.length), trend: '4 urgentes' },
    ];
  }

  private buildClientMetrics(bookings: Booking[]): DashboardMetric[] {
    const completed = bookings.filter((booking) => booking.status === 'completed');
    const spent = completed.reduce((total, booking) => total + booking.totalPrice, 0);

    return [
      { label: 'Proximas', value: String(bookings.filter((booking) => booking.status === 'confirmed').length), trend: 'esta semana' },
      { label: 'Completadas', value: String(completed.length), trend: '+2 mes' },
      { label: 'Gastado', value: eur.format(spent), trend: 'historico' },
      { label: 'Ahorro', value: '4h', trend: 'estimado' },
    ];
  }
}
