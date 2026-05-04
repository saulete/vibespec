# Proyecto: ReadTrack

## Qué es
App de listas de lectura personal donde los usuarios organizan libros, trackean progreso y descubren nuevas lecturas basadas en sus gustos.

## Stack
- Frontend: Next.js 15 + React 19 + Tailwind CSS
- Backend: Next.js API routes
- Base de datos: PostgreSQL via Drizzle ORM
- Testing: Vitest

## Features (ordenadas por prioridad)
1. reading-list — Crear listas, añadir libros, marcar progreso, ver recomendaciones
2. ???

## Convenciones
- Commits: Conventional Commits con SC-ID (ej: `feat: implement SC-01 create list`)
- TDD obligatorio en código de producción
- Tests en `src/__tests__/` junto al código fuente
- p95 < 500ms en endpoints de API

## Success Criteria globales
- Cobertura de tests ≥ 80%
- Zero errores 500 en endpoints de API