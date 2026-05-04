# Feature: reading-list

## Working Backwards
Cuando termine, el usuario podrá guardar libros en listas personalizadas, marcar progreso de lectura, y ver recomendaciones basadas en las listas que ha creado. Sabremos que funciona porque al crear una lista y añadir 3 libros, la página de recomendaciones muestra al menos 5 sugerencias relevantes extraídas de los géneros de esa lista.

## Para Quién
Lectores que quieren organizar su lectura y descubrir libros nuevos — no lectores ocasionales, sino personas que leen 10+ libros al año y pierden tiempo buscando qué leer después.

## Success Criteria (falsables)
- [ ] SC-01: Usuario puede crear una lista con nombre y visibilidad (pública/privada) → se persiste en base de datos y aparece en el dashboard (baseline: 0 listas → target: lista creada visible en <2s)
- [ ] SC-02: Usuario puede añadir libros a una lista buscando por título o autor → search devuelve resultados relevantes en <300ms con al menos 3 resultados para queries de 3+ caracteres
- [ ] SC-03: Usuario puede marcar progreso de lectura (no empezado, leyendo, terminado) por libro → el cambio se refleja en el dashboard sin recargar página
- [ ] SC-04: Página de recomendaciones muestra mínimo 5 libros basados en los géneros de las listas del usuario → al menos 3 de 5 recomendaciones comparten género con algún libro en sus listas

## Out of Scope
- Sistema de reviews y ratings — es una feature separada que no aporta valor al core de organizar lectura
- Importar listas desde Goodreads — complejidad de integración que no valida la hipótesis principal
- Recomendaciones colaborativas (Listas de otros usuarios) — requiere masa crítica de usuarios que no existe aún

## Batches (anti-waterfall)
### Batch 1: Listas y libros
- Implementa: SC-01, SC-02
- Valor: El usuario puede crear listas y añadir libros. Core funcional sin necesitar recomendaciones.

### Batch 2: Progreso y recomendaciones
- Implementa: SC-03, SC-04
- Valor: El usuario puede trackear su lectura y descubrir libros nuevos. Cierra el loop de organizar → descubrir.

## Amendments