# 🎨 Portafolio Cha Castañeda

**Arte Urbano + Desarrollo Web**

Portafolio profesional que integra creatividad artística con código limpio. Construido con React + Supabase siguiendo principios de diseño constructivista.

---

## 🚀 Configuración Inicial

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Supabase

#### a) Crear Proyecto en Supabase
1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota tu **Project URL** y **anon public key**

#### b) Configurar Variables de Entorno
1. Copia el archivo `.env.example` a `.env`:
   ```bash
   copy .env.example .env
   ```

2. Abre `.env` y configura tus credenciales:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anon_publica_aqui
   ```

#### c) Ejecutar Esquema de Base de Datos
1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Abre el archivo `SUPABASE_SCHEMA.sql` de este proyecto
3. Copia todo el contenido y pégalo en el SQL Editor
4. Haz clic en **Run** para ejecutar el esquema

Esto creará:
- ✅ Tablas: `projects`, `categories`, `technologies`, `project_technologies`, `contact_messages`
- ✅ Índices optimizados
- ✅ Row Level Security (RLS)
- ✅ Datos de ejemplo (categorías y tecnologías)

#### d) Configurar Storage (Opcional - Para imágenes)
1. En Supabase, ve a **Storage**
2. Crea un nuevo bucket llamado `project-images`
3. Configúralo como **público**

---

## 🎯 Ejecutar Proyecto

### Modo Desarrollo
```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:5173`

### Build para Producción
```bash
npm run build
```

### Preview de Producción
```bash
npm run preview
```

---

## 📁 Estructura del Proyecto

```
portafolio-cha/
├── src/
│   ├── components/      # Componentes reutilizables
│   │   └── Notification.jsx  # Sistema de notificaciones
│   ├── pages/          # Páginas de la aplicación
│   ├── hooks/          # Custom hooks
│   │   ├── useProjects.js     # CRUD de proyectos
│   │   ├── useCategories.js   # Gestión de categorías
│   │   └── useContactForm.js  # Formulario de contacto
│   ├── lib/            # Configuraciones
│   │   └── supabaseClient.js  # Cliente de Supabase
│   ├── styles/         # Estilos adicionales
│   ├── utils/          # Funciones auxiliares
│   └── index.css       # Estilos globales CSS puro
├── SUPABASE_SCHEMA.sql # Esquema de base de datos
├── .env.example        # Ejemplo de variables de entorno
└── README.md
```

---

## 🎨 Stack Tecnológico

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool ultrarrápido
- **CSS Puro** - Sin frameworks (Flexbox + CSS Grid)

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Base de datos relacional

### Tipografía
- **Anton** - Títulos principales
- **Bebas Neue** - Subtítulos
- **Playfair Display** - Cuerpo de texto
- **Roboto Mono** - Código/datos

### Diseño
- Estilo **Constructivista**
- Inspiración en periódicos vintage
- Paleta: Rojo (#D32F2F), Crema (#F2E8D5), Negro (#121212)

---

## 📋 Esquema de Base de Datos

### Tablas Principales

#### `projects`
- Información completa de cada proyecto
- Relación con categorías y tecnologías
- Soporte para galería de imágenes
- Sistema de destacados y publicación

#### `categories`
- Clasificación de proyectos (Web, Arte, E-Commerce, etc.)

#### `technologies`
- Tecnologías usadas (React, CSS, Node.js, etc.)

#### `project_technologies`
- Relación many-to-many entre proyectos y tecnologías

#### `contact_messages`
- Mensajes del formulario de contacto

---

## 🔒 Seguridad

- ✅ Row Level Security (RLS) habilitado
- ✅ Variables de entorno para credenciales
- ✅ Validación de formularios
- ✅ Sanitización de inputs

---

## 🎯 Próximos Pasos

1. ✅ Capa de datos (Supabase) configurada
2. 🔄 Componentes visuales (Homepage, Galería, Admin)
3. ⏳ Sistema de autenticación para panel admin
4. ⏳ Subida de imágenes a Storage
5. ⏳ SEO y meta tags dinámicos
6. ⏳ Animaciones y transiciones
7. ⏳ Modo oscuro/claro
8. ⏳ Responsive design completo
9. ⏳ Deploy a producción

---

## 📝 Notas de Desarrollo

### Sin `alert()` ni `confirm()`
Este proyecto usa un sistema de notificaciones personalizado dentro del DOM. Ver `src/components/Notification.jsx`

### CSS Artesanal
No se usan frameworks CSS. Todo está construido con:
- CSS Grid para layouts complejos
- Flexbox para alineación
- Variables CSS para theming
- Animaciones CSS puras

### HTML Semántico
Se usan etiquetas semánticas correctas:
- `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ARIA labels donde sea necesario
- Formularios accesibles

---

## 👤 Autor

**Cha Castañeda**
- Diseñador | Ilustrador | Artista Urbano | Desarrollador

---

## 📄 Licencia

Este es un proyecto personal de portafolio.

---

¿Necesitas ayuda? Revisa el archivo `SUPABASE_SCHEMA.sql` para entender la estructura de datos.
