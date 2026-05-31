import type { ReactNode } from 'react';
import type { UserRole } from '../../domain/entities';
import { BarChart3, CalendarDays, Home, Sparkles, UserRound } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function AppShell({ children, role, onRoleChange }: AppShellProps) {
  const navItems = role === 'admin'
    ? [
      { label: 'Panel', icon: BarChart3 },
      { label: 'Reservas', icon: CalendarDays },
      { label: 'Clientes', icon: UserRound },
    ]
    : [
      { label: 'Inicio', icon: Home },
      { label: 'Reservar', icon: Sparkles },
      { label: 'Perfil', icon: UserRound },
    ];

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div>
          <p className="app-shell__eyebrow">LimpiaPrueba</p>
          <h1 className="app-shell__title">Tu limpieza bajo control</h1>
        </div>
        <div className="role-switch" aria-label="Cambiar rol">
          <button
            className={`role-switch__button ${role === 'client' ? 'role-switch__button--active' : ''}`}
            type="button"
            onClick={() => onRoleChange('client')}
          >
            Cliente
          </button>
          <button
            className={`role-switch__button ${role === 'admin' ? 'role-switch__button--active' : ''}`}
            type="button"
            onClick={() => onRoleChange('admin')}
          >
            Admin
          </button>
        </div>
      </header>
      <main className="app-shell__main">{children}</main>
      <nav className="bottom-nav" aria-label="Navegacion principal">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              className={`bottom-nav__item ${index === 0 ? 'bottom-nav__item--active' : ''}`}
              key={item.label}
              type="button"
            >
              <Icon aria-hidden="true" size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
