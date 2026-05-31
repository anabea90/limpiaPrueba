import type { DashboardMetric } from '../../domain/entities';

interface MetricGridProps {
  metrics: DashboardMetric[];
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <section className="metric-grid" aria-label="Metricas principales">
      {metrics.map((metric) => (
        <article className="metric-card" key={metric.label}>
          <span className="metric-card__label">{metric.label}</span>
          <strong className="metric-card__value">{metric.value}</strong>
          <span className="metric-card__trend">{metric.trend}</span>
        </article>
      ))}
    </section>
  );
}
