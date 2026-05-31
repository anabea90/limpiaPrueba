import { useEffect, useMemo, useState } from 'react';
import { ClipboardList, ShieldCheck, Sparkles } from 'lucide-react';
import { CreateBooking, type CreateBookingInput } from '../application/use-cases/createBooking';
import { GetDashboard } from '../application/use-cases/getDashboard';
import type { Booking, CleaningService, DashboardMetric, TrendPoint, User, UserRole } from '../domain/entities';
import { InMemoryBookingRepository } from '../infrastructure/repositories/InMemoryBookingRepository';
import { AppShell } from './components/AppShell';
import { BookingList } from './components/BookingList';
import { BookingWizard } from './components/BookingWizard';
import { MetricGrid } from './components/MetricGrid';
import { RevenueChart } from './components/RevenueChart';
import { formatDateTime } from './view-models';

interface DashboardState {
  currentUser: User;
  users: User[];
  services: CleaningService[];
  bookings: Booking[];
  allBookings: Booking[];
  trends: TrendPoint[];
  metrics: DashboardMetric[];
}

const repository = new InMemoryBookingRepository();

export function App() {
  const [role, setRole] = useState<UserRole>('client');
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);

  const getDashboard = useMemo(() => new GetDashboard(repository), []);
  const createBooking = useMemo(() => new CreateBooking(repository), []);

  useEffect(() => {
    repository.setRole(role);
    getDashboard.execute().then(setDashboard);
  }, [getDashboard, role]);

  const handleCreateBooking = async (input: CreateBookingInput) => {
    await createBooking.execute(input);
    setDashboard(await getDashboard.execute());
  };

  if (!dashboard) {
    return <div className="loading-screen">Preparando tu panel...</div>;
  }

  const nextBooking = dashboard.bookings.find((booking) => ['pending', 'confirmed', 'inProgress'].includes(booking.status));
  const bookingSource = role === 'admin' ? dashboard.allBookings : dashboard.bookings;

  return (
    <AppShell role={role} onRoleChange={setRole}>
      <section className="hero-panel">
        <div className="hero-panel__content">
          <span className="hero-panel__badge">
            <Sparkles size={16} aria-hidden="true" />
            {role === 'admin' ? 'Operacion activa' : 'Reserva mobile first'}
          </span>
          <h2 className="hero-panel__title">
            {role === 'admin' ? 'Vista diaria del equipo y las reservas.' : 'Casa limpia, reserva clara y sin vueltas.'}
          </h2>
          <p className="hero-panel__text">
            {role === 'admin'
              ? 'Controla demanda, ingresos y estados desde un panel compacto.'
              : 'Elige servicio, fecha, extras y confirma desde el movil en menos de un minuto.'}
          </p>
        </div>
        <div className="next-card">
          <span className="next-card__label">{role === 'admin' ? 'Siguiente servicio' : 'Tu proxima reserva'}</span>
          <strong className="next-card__title">
            {nextBooking ? formatDateTime(nextBooking.scheduledAt) : 'Sin reservas activas'}
          </strong>
          <span className="next-card__text">{nextBooking?.address ?? 'Crea una reserva cuando quieras.'}</span>
        </div>
      </section>

      <MetricGrid metrics={dashboard.metrics} />

      {role === 'client' ? (
        <div className="dashboard-layout">
          <BookingWizard
            clientId={dashboard.currentUser.id}
            services={dashboard.services}
            onCreateBooking={handleCreateBooking}
          />
          <BookingList bookings={dashboard.bookings} services={dashboard.services} users={dashboard.users} />
        </div>
      ) : (
        <div className="dashboard-layout dashboard-layout--admin">
          <RevenueChart trends={dashboard.trends} />
          <section className="ops-panel">
            <div className="section-heading">
              <h2 className="section-heading__title">Prioridades</h2>
              <span className="section-heading__meta">Hoy</span>
            </div>
            <div className="ops-panel__items">
              <article className="ops-item">
                <ClipboardList size={20} aria-hidden="true" />
                <div>
                  <strong>3 reservas pendientes</strong>
                  <span>Revisar direccion y disponibilidad</span>
                </div>
              </article>
              <article className="ops-item">
                <ShieldCheck size={20} aria-hidden="true" />
                <div>
                  <strong>92% puntualidad</strong>
                  <span>Equipo estable esta semana</span>
                </div>
              </article>
            </div>
          </section>
          <BookingList bookings={bookingSource} services={dashboard.services} users={dashboard.users} />
        </div>
      )}
    </AppShell>
  );
}
