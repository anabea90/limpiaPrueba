export type UserRole = 'client' | 'admin';

export type BookingStatus = 'pending' | 'confirmed' | 'inProgress' | 'completed' | 'cancelled';

export type ServiceCategory = 'home' | 'deep' | 'moving' | 'office';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface CleaningService {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
  durationMinutes: number;
}

export interface BookingExtra {
  id: string;
  name: string;
  price: number;
}

export interface Booking {
  id: string;
  clientId: string;
  serviceId: string;
  scheduledAt: string;
  address: string;
  status: BookingStatus;
  totalPrice: number;
  extras: BookingExtra[];
}

export interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
}

export interface TrendPoint {
  label: string;
  bookings: number;
  revenue: number;
}
