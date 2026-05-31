# LimpiaPrueba

Aplicacion React mobile first para reservar servicios de limpieza con roles de cliente y admin.

## Stack

- React 19 + TypeScript
- Vite
- CSS BEM
- Recharts
- Lucide React
- Arquitectura hexagonal: `domain`, `application`, `infrastructure`, `presentation`

## Arquitectura

```txt
src/
  domain/          Entidades y puertos
  application/     Casos de uso
  infrastructure/  Adaptadores externos o repositorios concretos
  presentation/    React, componentes y estilos BEM
```

## Scripts

```bash
npm install
npm run dev
npm run build
```

El proyecto fija Node `20.20.2` en `.nvmrc`, `.node-version` y como dependencia de desarrollo. Aunque el Node global del sistema sea antiguo, los scripts de npm usan el binario local de `node_modules/.bin/node`.
