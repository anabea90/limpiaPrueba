import type { TrendPoint } from '../../domain/entities';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface RevenueChartProps {
  trends: TrendPoint[];
}

export function RevenueChart({ trends }: RevenueChartProps) {
  return (
    <section className="chart-panel">
      <div className="section-heading">
        <h2 className="section-heading__title">Ritmo del negocio</h2>
        <span className="section-heading__meta">2026</span>
      </div>
      <div className="chart-panel__area" aria-label="Grafico de ingresos">
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={trends} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.38} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e5eef0" strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#0f766e" fill="url(#revenueGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-panel__area chart-panel__area--compact" aria-label="Grafico de reservas">
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={trends} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="bookings" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
