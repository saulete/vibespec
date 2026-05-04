# VibeSpec

[English](README.md) | **Español**

Framework de desarrollo de producto riguroso para vibe coders y equipos pequeños. 4 skills, 1 hook, 0 burocracia.

*Spec first. Vibe right.*

---

## Por qué existe esto

VibeSpec nace de un artículo: [Cómo unimos producto e ingeniería con agentes en Mercadona Tech](https://www.gemba.es/p/como-unimos-producto-e-ingenieria), escrito por [José Ramón Pérez Agüera](https://www.gemba.es) en [Gemba](https://www.gemba.es). Su pipeline GSD → Mercadona User Story Toolkit → Superpowers demostró que los agentes pueden mecanizar el rigor sin mecanizar la burocracia — para equipos de 5-12 personas con roles de PM e Ingeniería separados.

Pero para vibe coders y equipos pequeños, la ceremonia es un muro: 79 comandos, 22 skills, 34 agents, 12 hooks, 8+ archivos de planificación, y 250-500k tokens por feature media.

**VibeSpec es una versión simplificada de ese pipeline:** misma disciplina (Working Backwards, TDD, spec drift detection, anti-waterfall batches), menos ceremonia (1 spec en lugar de 8 archivos, 4 skills en lugar de 79 comandos, 0 bridges que sincronizar). Diseñado para vibe coders y equipos pequeños que quieren rigor sin overhead. Sin José y sin Gemba, este framework no existiría.

---

## Los 7 principios de rigor (innegociables)

Estos principios vienen del artículo original y del Working Backwards de Amazon. No se eliminan, se simplifican.

| Principio | En el pipeline Mercadona | En VibeSpec |
|---|---|---|
| **Working Backwards** | PROJECT.md + REQUIREMENTS.md + ROADMAP.md + SPEC.md + PLAN.md | 2-3 frases en SPEC.md |
| **Acceptance Criteria Falsable** | 6D Scoring (0-10) + quality gate ≥7 | "¿Puedes escribir un test para esto?" |
| **TDD** | Superpowers test-driven-development skill | Igual — rojo → verde → refactor |
| **Anti-Waterfall** | 5-lens priorización ponderada + batches | Batches que entregan valor independiente |
| **Verification** | gsd-verify-work + gsd-bridge + VERIFICATION.md | verify skill + VERIFICATION.md |
| **Traceability** | REQ-IDs en commits + gsd-bridge sync | SC-IDs en commits + hook auto-sync |
| **Spec Drift Detection** | gsd-bridge amend + SPEC-AMENDMENTS.md | Amendments en SPEC.md sin sobrescribir |

---

## Qué se elimina y por qué

### Burocracia que solo tiene sentido cuando PM y Eng son roles separados

| Elemento | Existe para | Por qué sobra en equipos pequeños |
|---|---|---|
| PRD formal con GAP detection | PM → Eng handoff | Tú eres ambos |
| Mom Test interviews + field notes | Research cuantitativo/cualitativo | Hablas con usuarios directamente o eres el usuario |
| JTBD con 3 motivaciones + Wendel Checklist | PM metodológico | El "job" se captura en 1-2 frases |
| 6D Scoring (0-10) | Quality gate entre roles | Confías en tu juicio + tests |
| 5-lens Prioritization ponderada | Backlog con 20+ stories compitiendo | Priorizas por valor+learning |
| gsd-bridge.py (438 líneas) | Sincronizar GSD ↔ Superpowers | Una sola herramienta, no hay gap |
| 65 commands / 33 agents / 12 hooks | Coordinación multi-rol | Overkill total |
| `.planning/` con 8+ ficheros | Audit trail entre departamentos | SPEC.md + context.md basta |
| PRDs con Farola/Penumbra | PM que necesita evidencia formal | Tienes el contexto en la cabeza |

### Cómo se mantiene la disciplina sin la ceremonia

- **El quality gate no es un score.** Es una pregunta: *"¿Puedes escribir un test que verifique este criterion?"* Si la respuesta es no, el criterion se reescribe. Más directo, igual de riguroso.
- **La priorización no es 5 lentes.** Es ordenar features por valor que entregan al usuario, y entregar en batches que funcionan solos. Si un batch no entrega valor sin el siguiente, está mal dividido.
- **El roadmap no es ROADMAP.md.** Es una lista ordenada en `context.md` que reordenas cuando aprendes algo nuevo. Un `???` es tan válido como una feature definida — significa "tengo intuición, necesito ver qué pasa."
- **El bridge no es 438 líneas de Python.** Es un hook que marca SC-IDs como completados en SPEC.md cuando los detecta en commits. Fuente única de verdad, sin sincronización.

---

## Estructura del proyecto

```
mi-proyecto/
├── .vibespec/
│   ├── context.md              ← ESTABLE: producto, stack, convenciones, features list
│   ├── archive/                ← Features completadas
│   │   └── 001-reading-list/
│   │       ├── SPEC.md
│   │       └── VERIFICATION.md
│   └── PLAN.md                 ← Auto-generado por /build
├── SPEC.md                     ← Feature activa (siempre en raíz)
└── src/                        ← Tu código
```

### context.md — Lo que no cambia

```markdown
# Proyecto: ReadTrack

## Qué es
App de listas de lectura personal donde los usuarios organizan libros, trackean progreso y descubren nuevas lecturas.

## Stack
- Frontend: Next.js 15 + React 19 + Tailwind CSS
- Backend: Next.js API routes
- Base de datos: PostgreSQL via Drizzle ORM
- Testing: Vitest

## Features (ordenadas por prioridad)
1. reading-list — Crear listas, añadir libros, marcar progreso, ver recomendaciones
2. ???

## Convenciones
- Commits: Conventional Commits con SC-ID
- TDD obligatorio en código de producción
- p95 < 500ms en endpoints de API
```

Se escribe una vez. Se actualiza cuando:
- Aprendes algo que cambia la prioridad de features
- El stack cambia
- Se añade una convención nueva

### SPEC.md — La feature activa

```markdown
# Feature: reading-list

## Working Backwards
Cuando termine, el usuario podrá guardar libros en listas personalizadas, marcar
progreso de lectura, y ver recomendaciones basadas en sus listas. Sabremos que
funciona porque al crear una lista y añadir 3 libros, la página de recomendaciones
muestra al menos 5 sugerencias relevantes.

## Para Quién
Lectores que leen 10+ libros al año y pierden tiempo buscando qué leer después.

## Success Criteria (falsables)
- [ ] SC-01: Usuario puede crear lista con nombre y visibilidad (pública/privada)
- [ ] SC-02: Search devuelve resultados en <300ms con 3+ resultados para queries ≥3 caracteres
- [ ] SC-03: Progreso de lectura se marca sin recargar página (no empezado, leyendo, terminado)
- [ ] SC-04: Recomendaciones muestran mínimo 5 libros, 3+ comparten género con listas del usuario

## Out of Scope
- Reviews y ratings — feature separada
- Importar listas desde Goodreads — no valida la hipótesis principal

## Batches (anti-waterfall)
### Batch 1: Listas y libros
- Implementa: SC-01, SC-02
- Valor: El usuario puede crear listas y añadir libros
### Batch 2: Progreso y recomendaciones
- Implementa: SC-03, SC-04
- Valor: El usuario trackea lectura y descubre libros nuevos

## Amendments
- AMEND-01: [abc123f] SC-02 requiere mínimo 3 caracteres para activar búsqueda,
  1-2 chars devuelven ruido — 2026-05-04
```

**Los Amendments son la trace de spec drift.** Nunca se sobrescribe el Success Criteria original — se añade un amendment que explica qué cambió y por qué. Preserva el trail, como SPEC-AMENDMENTS.md en el pipeline original.

---

## Los 4 skills

### `/spec` — Piensa antes de codificar

Reemplaza: GSD new-project + discuss-phase + plan-phase + MUST prd-quality-guard + from-gsd + research

1. Si no hay `context.md` → pregunta y lo crea (producto, stack, convenciones, features list)
2. Si hay `context.md` sin SPEC.md → sugiere la siguiente feature de la lista
3. Pregunta Working Backwards hasta entender la idea
4. **Fuerza Success Criteria falsables** — se niega a aceptar "mejorar UX" o "hacerlo más rápido"
5. Propone batches anti-waterfall y verifica que cada batch entrega valor independiente
6. Escribe SPEC.md en la raíz

### `/build` — Construye con TDD

Reemplaza: Superpowers writing-plans + subagent-driven-development + test-driven-development + GSD execute-phase

1. Lee SPEC.md + context.md
2. Descompone el batch actual en tareas atómicas (2-5 min cada una)
3. Cada tarea: **test rojo → implementación mínima → test verde → refactor**
4. Commits con SC-ID: `feat: implement SC-01 ambiguity classifier`
5. Al terminar el batch, invoca `/verify` automáticamente

**Reglas de hierro:**
- NO production code without a failing test first
- NO completion claims without fresh verification evidence
- Delete code written before tests

### `/verify` — Demuestra que funciona

Reemplaza: GSD verify-work + gsd-bridge + MUST quality validation

1. Ejecuta tests → ¿verdes?
2. Verifica cada Success Criteria → PASS/FAIL
3. Compara código vs SPEC.md → detecta drift
4. Si hay divergencia → añade Amendments a SPEC.md (nunca sobrescribe)
5. Genera `.vibespec/VERIFICATION.md`

### `/iterate` — Siguiente batch, siguiente feature

Reemplaza: GSD complete-milestone + new-milestone + next + MUST prioritize

1. Muestra estado: batches completados, SCs hechos, qué queda
2. Si quedan batches en la feature activa → siguiente batch
3. Si la feature está completa → archiva SPEC.md + VERIFICATION.md en `.vibespec/archive/`
4. Lee `context.md` → "Siguiente feature: carrito-compra. ¿Continuas o reordenas?"
5. Si reordenas → actualiza la lista de features en context.md

---

## El hook

### `vibespec-sync` (PostSessionEnd)

Reemplaza: gsd-bridge sync

- Si SPEC.md existe → escanea commits desde la última verificación
- Extrae SC-IDs de commit messages
- Marca Success Criteria como `[x]` en SPEC.md
- Si todos los SCs de un batch están done → marca batch como completo
- Añade Amendments si detecta cambios que no están reflejados en el spec

---

## Comparación con el pipeline original

| Aspecto | Pipeline Mercadona | VibeSpec |
|---|---|---|
| Documentos de definición | 8+ en `.planning/` | SPEC.md + context.md |
| Comandos | 65 + 11 + 3 = 79 | 4 |
| Skills | 0 + 8 + 14 = 22 | 4 |
| Agents | 33 + 1 = 34 | 2 |
| Hooks | 12 | 1 |
| Herramientas que coordinar | 3 (GSD ↔ MUST ↔ Superpowers) | 1 |
| Bridge | gsd-bridge.py (438 líneas) | Hook integrado |
| Tokens por feature media | 250-500k | ~80-150k (estimado) |
| Curva de aprendizaje | Alta (3 metodologías) | Baja (1 flujo) |
| Para equipos de | 5-12 personas | 1-3 personas |
| Working Backwards | ✓ | ✓ (2-3 frases) |
| Acceptance Falsable | ✓ (6D scoring) | ✓ ("¿puedes testearlo?") |
| TDD | ✓ | ✓ (igual) |
| Anti-Waterfall | ✓ (5 lentes) | ✓ (batches por valor) |
| Verification | ✓ | ✓ |
| Traceability | ✓ (REQ-IDs) | ✓ (SC-IDs) |
| Drift Detection | ✓ (bridge + amendments) | ✓ (verify + amendments) |

---

## Flujo visual

```
/spec
  │
  ▼
context.md + SPEC.md (Working Backwards + Success Criteria + Batches)
  │
  ▼
/build (lee SPEC.md, batch activo)
  │
  ├── TDD: test rojo → verde → refactor (por SC-ID)
  ├── Commits: feat: implement SC-01...
  └── Auto-verify al final del batch
  │
  ▼
/verify
  │
  ├── Tests → ¿verdes?
  ├── SCs → ¿PASS?
  ├── Drift → ¿código ≠ spec? → Amendments
  └── VERIFICATION.md
  │
  ▼
/iterate → siguiente batch o siguiente feature → /build
```

---

## Filosofía

**Modo copiloto, no piloto automático.** (Del Mercadona User Story Toolkit — lo mantenemos.)

El framework te guía, te obliga a pensar, bloquea lo vago. Pero no inventa por ti. Si falta una métrica, el skill te lo dice y te pide que la definas. Si un Success Criteria no es falsable, te hace reescribirlo. Si un batch no entrega valor solo, te hace reorganizar.

**La disciplina está en las preguntas, no en los formularios.**

---

## Inspiración

- [Cómo unimos producto e ingeniería con agentes en Mercadona Tech](https://www.gemba.es/p/como-unimos-producto-e-ingenieria) — José Ramón Pérez Agüera
- [Get Shit Done](https://github.com/gsd-build/get-shit-done) — Tâches
- [Superpowers](https://github.com/obra/superpowers) — Jesse Vincent
- [Mercadona User Story Toolkit](https://github.com/josemerca/mercadona-user-story-toolkit) — José Ramón Pérez Agüera
- *Working Backwards* — Bill Carr, Colin Bryar (Amazon, 2021)
- *The Mom Test* — Rob Fitzpatrick

---

## Instalación

Ver [install.md](install.md) para instrucciones completas (manual y con install.sh).

---

## Licencia

MIT — ver [LICENSE](LICENSE) para detalles completos incluyendo atribución.