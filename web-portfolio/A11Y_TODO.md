A11Y - Pending Tasks
====================

1. Run a11y scans (pa11y + axe) in CI and collect reports (pa11y-report.html, axe-report.json).
2. Fix critical findings from reports (contrast, missing aria, focus order, labels).
3. Audit remaining components (cards, modals, custom inputs) and apply Radix/shadcn replacements where needed.
4. Add documentation examples for accessible patterns (forms, menus, dialogs).

Notes:
- The TypeScript build error in components/ui/calendar.tsx was patched minimally to unblock builds. Consider a typed refactor later.
