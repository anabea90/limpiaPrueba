import { useMemo, useState } from 'react';
import type { BookingExtra, CleaningService } from '../../domain/entities';
import type { CreateBookingInput } from '../../application/use-cases/createBooking';
import { availableExtras } from '../../infrastructure/repositories/InMemoryBookingRepository';
import { formatMoney } from '../view-models';
import { ServicePicker } from './ServicePicker';
import { CalendarPlus, Check } from 'lucide-react';

interface BookingWizardProps {
  clientId: string;
  services: CleaningService[];
  onCreateBooking: (input: CreateBookingInput) => void;
}

export function BookingWizard({ clientId, services, onCreateBooking }: BookingWizardProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id ?? '');
  const [date, setDate] = useState('2026-06-06');
  const [time, setTime] = useState('10:00');
  const [address, setAddress] = useState('Calle Atocha 25, Madrid');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['windows']);

  const selectedService = services.find((service) => service.id === selectedServiceId) ?? services[0];
  const extras = useMemo(
    () => availableExtras.filter((extra) => selectedExtras.includes(extra.id)),
    [selectedExtras],
  );
  const total = (selectedService?.basePrice ?? 0) + extras.reduce((sum, extra) => sum + extra.price, 0);

  const toggleExtra = (extra: BookingExtra) => {
    setSelectedExtras((current) =>
      current.includes(extra.id) ? current.filter((id) => id !== extra.id) : [...current, extra.id],
    );
  };

  const handleSubmit = () => {
    if (!selectedService) return;

    onCreateBooking({
      clientId,
      service: selectedService,
      date,
      time,
      address,
      extras,
    });
  };

  return (
    <section className="booking-wizard">
      <div className="section-heading">
        <h2 className="section-heading__title">Nueva reserva</h2>
        <span className="section-heading__meta">3 pasos</span>
      </div>
      <ServicePicker
        services={services}
        selectedServiceId={selectedServiceId}
        onSelectService={setSelectedServiceId}
      />
      <div className="booking-wizard__grid">
        <label className="field">
          <span className="field__label">Fecha</span>
          <input className="field__input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <label className="field">
          <span className="field__label">Hora</span>
          <input className="field__input" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </label>
      </div>
      <label className="field">
        <span className="field__label">Direccion</span>
        <input className="field__input" value={address} onChange={(event) => setAddress(event.target.value)} />
      </label>
      <div className="extras">
        {availableExtras.map((extra) => (
          <button
            className={`extras__item ${selectedExtras.includes(extra.id) ? 'extras__item--active' : ''}`}
            key={extra.id}
            type="button"
            onClick={() => toggleExtra(extra)}
          >
            {selectedExtras.includes(extra.id) && <Check size={15} aria-hidden="true" />}
            <span>{extra.name}</span>
            <strong>{formatMoney(extra.price)}</strong>
          </button>
        ))}
      </div>
      <div className="booking-summary">
        <div>
          <span className="booking-summary__label">Total estimado</span>
          <strong className="booking-summary__price">{formatMoney(total)}</strong>
        </div>
        <button className="primary-button" type="button" onClick={handleSubmit}>
          <CalendarPlus size={18} aria-hidden="true" />
          Reservar
        </button>
      </div>
    </section>
  );
}
