import type { Booking, CleaningService, User } from '../../domain/entities';
import { Clock, MapPin } from 'lucide-react';
import { formatDateTime, formatMoney, statusLabels } from '../view-models';

interface BookingListProps {
  bookings: Booking[];
  services: CleaningService[];
  users: User[];
}

export function BookingList({ bookings, services, users }: BookingListProps) {
  return (
    <section className="booking-list" aria-label="Reservas">
      <div className="section-heading">
        <h2 className="section-heading__title">Reservas recientes</h2>
        <button className="section-heading__action" type="button">Ver todas</button>
      </div>
      <div className="booking-list__items">
        {bookings.map((booking) => {
          const service = services.find((item) => item.id === booking.serviceId);
          const user = users.find((item) => item.id === booking.clientId);

          return (
            <article className="booking-card" key={booking.id}>
              <div className="booking-card__top">
                <div>
                  <h3 className="booking-card__title">{service?.name ?? 'Servicio'}</h3>
                  <p className="booking-card__client">{user?.name}</p>
                </div>
                <span className={`status-pill status-pill--${booking.status}`}>
                  {statusLabels[booking.status]}
                </span>
              </div>
              <div className="booking-card__meta">
                <span><Clock size={16} aria-hidden="true" />{formatDateTime(booking.scheduledAt)}</span>
                <span><MapPin size={16} aria-hidden="true" />{booking.address}</span>
              </div>
              <div className="booking-card__footer">
                <span>{booking.extras.length ? `${booking.extras.length} extras` : 'Sin extras'}</span>
                <strong>{formatMoney(booking.totalPrice)}</strong>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
