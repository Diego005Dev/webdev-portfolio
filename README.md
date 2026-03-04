# 🚀 Portafolio Web Profesional — Diego Ramírez

Este repositorio contiene mi portafolio web personal, diseñado para mostrar experiencia técnica, proyectos reales y mi enfoque de desarrollo orientado a producto.

El objetivo de este sitio es funcionar como carta de presentación técnica para reclutadores, empresas y clientes potenciales.

## 🌐 Demo

- Sitio: [webdevdiegor005.com](https://webdevdiegor005.com)

## 👨‍💻 Perfil

Desarrollador Web Full Stack enfocado en construir productos modernos, escalables y con buena experiencia de usuario. Este portafolio está pensado para comunicar no solo **qué** desarrollé, sino también **cómo** y **por qué** tomé decisiones técnicas.

## ✨ Qué encontrarás en este proyecto

- Arquitectura moderna con **Next.js 14 (App Router)**
- Código tipado con **TypeScript**
- UI componetizada con **React + Tailwind CSS**
- Sistema de componentes con **shadcn/ui + Radix UI**
- Portafolio bilingüe (**Español / Inglés**) con detección automática de idioma
- Soporte de tema oscuro/claro y estilos visuales por era (**8-bit, 16-bit, 32-bit**)
- Secciones de perfil profesional, proyectos, servicios y contacto

## 🧠 Cómo fue construido este portafolio

Este portafolio se diseñó con un enfoque híbrido: branding personal + buenas prácticas de ingeniería.

### 1) Base técnica

- Se inició sobre **Next.js** para aprovechar renderizado eficiente, rutas modernas y optimización de producción.
- Se adoptó **TypeScript** para robustez de código y mantenimiento a largo plazo.
- Se estructuró bajo `app/` (App Router), separando layouts, páginas por idioma y componentes reutilizables.

### 2) Sistema visual

- Se implementó **Tailwind CSS** para iteración rápida y consistencia en diseño.
- Se incorporó **shadcn/ui (Radix UI)** para componentes accesibles y extensibles.
- Se agregó soporte de **temas y estilos retro por era**, para reforzar identidad visual y diferenciación.

### 3) Internacionalización (i18n)

- Se creó una capa de diccionarios en `i18n/` (`en.json` y `es.json`).
- Se implementó `middleware.ts` para detectar idioma del navegador y redirigir automáticamente a `/en` o `/es`.

### 4) Presentación orientada a negocio

- Secciones enfocadas en comunicar propuesta de valor, experiencia y resultados.
- Proyectos desplegados con enlaces directos para validación técnica rápida.
- Página de contacto lista para facilitar conversación comercial o de reclutamiento.

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 14**
- **React 18**
- **TypeScript 5**
- **Tailwind CSS 3**
- **Framer Motion**
- **lucide-react**

### UI / UX

- **shadcn/ui**
- **Radix UI**
- **next-themes**

### Formularios y validación

- **react-hook-form**
- **zod**

### Utilidades

- **clsx**
- **class-variance-authority**
- **tailwind-merge**

## 📁 Estructura principal

```bash
app/
  [lang]/
    about/
    contact/
    projects/
    services/
    retro/
components/
  ui/
i18n/
data/
lib/
```

## ⚙️ Instalación y ejecución local

### Requisitos

- Node.js 18+
- pnpm (recomendado)

### Pasos

```bash
# 1) Clonar repositorio
git clone https://github.com/Diego005Dev/webdev-portfolio.git

# 2) Entrar al proyecto
cd webdev-portfolio/web-portfolio

# 3) Instalar dependencias
pnpm install

# 4) Levantar en desarrollo
pnpm dev
```

La app quedará disponible en `http://localhost:3000`.

## 📜 Scripts disponibles

```bash
pnpm dev      # entorno local
pnpm build    # build de producción
pnpm start    # correr build
pnpm lint     # análisis de código
```

## 🔍 Decisiones técnicas destacadas

- Uso de **App Router** para estructura escalable por páginas y layouts.
- **i18n por diccionarios locales** para control total del contenido y bajo costo de mantenimiento.
- **Composición por componentes reutilizables** para acelerar iteración y consistencia visual.
- **Separación de presentación y contenido** mediante `data/` e `i18n/`.

## 📬 Contacto profesional

- Email: **metallica3999@gmail.com**
- LinkedIn: [diego-ramírez-67b227238](https://linkedin.com/in/diego-ramírez-67b227238)
- GitHub: [@Diego005Dev](https://github.com/Diego005Dev)

---

Si estás evaluando este perfil para una vacante o colaboración freelance, estaré encantado de conversar sobre cómo puedo aportar valor en tu equipo o proyecto.
