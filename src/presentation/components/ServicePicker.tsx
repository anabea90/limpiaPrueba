import type { CleaningService } from '../../domain/entities';
import { formatMoney } from '../view-models';

interface ServicePickerProps {
  services: CleaningService[];
  selectedServiceId: string;
  onSelectService: (serviceId: string) => void;
}

export function ServicePicker({ services, selectedServiceId, onSelectService }: ServicePickerProps) {
  return (
    <div className="service-picker">
      {services.map((service) => (
        <button
          className={`service-picker__item ${service.id === selectedServiceId ? 'service-picker__item--active' : ''}`}
          key={service.id}
          type="button"
          onClick={() => onSelectService(service.id)}
        >
          <span className="service-picker__name">{service.name}</span>
          <span className="service-picker__description">{service.description}</span>
          <strong className="service-picker__price">{formatMoney(service.basePrice)}</strong>
        </button>
      ))}
    </div>
  );
}
