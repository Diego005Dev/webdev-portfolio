Accesibilidad (WCAG) — Resumen de trabajo
======================================

Resumen breve
-------------

He aplicado mejoras de accesibilidad y creado infraestructura para auditorías automáticas. Las acciones realizadas incluyen:

- Añadido enlace "Skip to content" y landmarks.
- Sustitución de menú móvil por Sheet accesible.
- Language switcher reescrito usando DropdownMenu (Radix/shadcn patterns).
- Formulario de contacto mejorado con validación accesible y mensajes de error con role="alert".
- Scripts y workflow de CI añadidos para ejecutar pa11y y axe.

Estado de la To-Do List
----------------------

Tareas completadas:

- Añadir skip link y landmarks.
- Reemplazar menú móvil por Sheet.
- Reescribir language switcher con DropdownMenu.
- Mejorar validación del formulario de contacto.
- Añadir scripts y workflow básico de a11y en CI.

Tareas pendientes:

1. Ejecutar escaneos a11y y revisar reports (pa11y / axe) — pendiente de que la build pase o que CI ejecute los scans.
2. Corregir hallazgos críticos reportados por los escaneos (contraste, aria, orden de foco, labels faltantes).
3. Auditar componentes restantes y documentar patrones de accesibilidad en el repo.

Siguiente paso realizado ahora
-----------------------------

He añadido este documento con el estado y las tareas pendientes. Además, en el código se corrigió un error de tipos en components/ui/calendar.tsx para permitir la build.

Resumen rápido de tareas pendientes: 3
