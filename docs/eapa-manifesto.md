# Manifiesto EAPA

| Campo | Valor |
| --- | --- |
| Nombre | EAPA — nombre de trabajo |
| Naturaleza | Manifiesto no normativo |
| Estado | Working Draft |
| Madurez de evidencia | H1 — pendiente de validación |
| Primera implementación | Plataforma de ingeniería de Ernesto Vázquez |

> **La arquitectura no se decreta: se gana con evidencia.**
>
> *Architecture is not decreed: it is earned through evidence.*

EAPA es una metodología y arquitectura de referencia para plataformas de ingeniería centradas en conocimiento y habilitadas por IA.

La IA ayuda. No gobierna el sistema.

EAPA también es un medio, no el producto. Si no facilita construir mejor software, producir mejores decisiones o demostrar aprendizaje con evidencia, debe simplificarse o descartarse.

## Por qué existe

Muchos productos de IA comienzan por el modelo, los agentes o la base vectorial y adaptan después el dominio a esas herramientas. Así, los prompts se vuelven fuente de verdad, aparecen agentes y memoria sin necesidad demostrada, el proveedor condiciona el diseño y el feedback se confunde con conocimiento.

EAPA invierte esa dependencia: el problema define las capabilities, las capabilities consumen conocimiento, la IA es una implementación posible y la evaluación decide qué aprendimos.

## Principios irrenunciables

1. **El problema precede a la solución.** Una tecnología no justifica una capability.
2. **El conocimiento es el activo central.** Modelos y frameworks son reemplazables.
3. **Las capabilities preceden a los agentes.** Primero se define el resultado observable.
4. **Lo determinístico precede a lo probabilístico.** La IA debe demostrar valor adicional.
5. **La evaluación precede al aprendizaje.** Nada modifica conocimiento canónico sin evidencia y aprobación.
6. **La infraestructura depende hacia adentro.** Dominio y contratos no dependen de proveedores.
7. **La arquitectura evoluciona mediante hipótesis trazables.** Toda afirmación relevante conserva provenance, alcance y evidencia.

## Anti-principios

- No abstraer antes de tener evidencia.
- No introducir IA cuando una regla determinística resuelve el problema.
- No crear un agente para reemplazar una función o workflow suficiente.
- No incorporar memoria persistente sin caso de uso, lifecycle y privacidad definidos.
- No filtrar detalles de proveedores hacia el dominio o los contratos de capabilities.
- No convertir una hipótesis en arquitectura estable sin replicación y gobernanza aceptada.
- No promover feedback u outputs de modelos directamente a conocimiento canónico.

## Cómo evoluciona EAPA

```text
Problema
  → Hipótesis falsable
  → Decisión
  → Implementación
  → Evaluación
  → Aprendizaje candidato
  → Conocimiento validado
  → Nueva hipótesis
```

La madurez se expresa como H0 Idea, H1 Hipótesis, H2 Respaldada localmente y H3 Replicada. Tres repeticiones disparan una revisión, no una abstracción automática.

El proceso operativo, sus rutas proporcionales y sus gates están definidos en [RFC-001 — Engineering Loop](rfcs/RFC-001-engineering-loop.md).

## Qué es y qué no es

EAPA es una metodología basada en decisiones falsables y una arquitectura de referencia para plataformas de conocimiento de ingeniería. Separa conocimiento, capabilities, evaluación e infraestructura.

No es una arquitectura universal, un framework de agentes, un wrapper de proveedores ni un sistema que se auto-modifica. La plataforma de Ernesto es su primera implementación y un espacio de validación, no una prueba de aplicabilidad universal.

## Diferencia frente a un framework de agentes

Un framework de agentes ayuda a ejecutar modelos, herramientas y workflows. EAPA pregunta antes qué problema existe, qué conocimiento es autoritativo, qué capability ofrece un resultado verificable, si hacen falta IA o autonomía y cómo se evaluará la decisión.

EAPA puede adoptar un framework de agentes como infraestructura futura. Ninguno define su núcleo.

## Gobernanza

Este manifiesto orienta; no crea contratos. Las decisiones normativas viven en RFCs aceptadas. EAPA solo se considerará estable cuando sus principios relevantes alcancen H3, existan reglas de conformidad y otra implementación independiente revele invariantes y variaciones.

## Hipótesis de este manifiesto

- **Claim:** una declaración breve reduce drift sin reemplazar las RFCs.
- **Prediction:** un lector podrá explicar por qué existe EAPA y diferenciarla de un framework de agentes.
- **Falsifier:** duplica decisiones, adelanta componentes o no permite explicar esa diferencia.
- **Evaluation:** utilizarlo al revisar RFC-000 y comprobar comprensión antes de superar H1.
