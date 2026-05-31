import type { BookingStatus } from '../domain/entities';

export const statusLabels: Record<BookingStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  inProgress: 'En curso',
  completed: 'Completada',
  cancelled: 'Cancelada',
};

export const formatDateTime = (isoDate: string) =>
  new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
