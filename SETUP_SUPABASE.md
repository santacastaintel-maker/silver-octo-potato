# 🔧 GUÍA RÁPIDA: Configurar Supabase

Sigue estos pasos para tener la base de datos funcionando en menos de 5 minutos.

---

## Paso 1: Obtener Credenciales de Supabase

1. Ve a tu proyecto en [https://supabase.com/dashboard](https://supabase.com/dashboard)

2. En el panel lateral, haz clic en **⚙️ Settings** (Configuración)

3. Selecciona **API** en el menú

4. Copia estas dos cosas:
   - **Project URL** (algo como: `https://abcdefgh.supabase.co`)
   - **anon public** key (la clave larga que empieza con `eyJ...`)

---

## Paso 2: Configurar Variables de Entorno

1. En la raíz del proyecto (`portafolio-cha/`), crea un archivo llamado `.env`

2. Pega este contenido (reemplaza con tus credenciales):

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Guarda el archivo

---

## Paso 3: Crear Tablas en Supabase

1. En Supabase, ve a **SQL Editor** en el panel lateral

2. Haz clic en **+ New query**

3. Abre el archivo `SUPABASE_SCHEMA.sql` de este proyecto

4. Copia **TODO** el contenido del archivo

5. Pégalo en el editor SQL de Supabase

6. Haz clic en **Run** (o presiona Ctrl+Enter)

7. ✅ Deberías ver: **Success. No rows returned**

---

## Paso 4: Verificar que Funcionó

1. En Supabase, ve a **📊 Table Editor**

2. Deberías ver estas tablas:
   - ✅ `categories`
   - ✅ `technologies`
   - ✅ `projects`
   - ✅ `project_technologies`
   - ✅ `contact_messages`

3. Haz clic en `categories` - deberías ver 4 categorías de ejemplo ya creadas

---

## Paso 5: Probar la Conexión

1. Abre una terminal en la carpeta del proyecto

2. Ejecuta:
```bash
npm run dev
```

3. Si no hay errores relacionados con Supabase, ¡todo está listo! 🎉

---

## ⚠️ Problemas Comunes

### Error: "Invalid API key"
- Verifica que copiaste la clave **anon public** (no la service_role)
- Asegúrate de que no haya espacios antes o después en el archivo `.env`

### Error: "relation does not exist"
- No ejecutaste el archivo `SUPABASE_SCHEMA.sql`
- Vuelve al Paso 3

### Error: "VITE_SUPABASE_URL is not defined"
- El archivo `.env` no existe o está mal nombrado
- Debe estar en la raíz del proyecto: `portafolio-cha/.env`
- Reinicia el servidor de desarrollo después de crear el archivo

---

## 🎯 Siguiente Paso

Una vez que Supabase esté configurado, estará listo para:
- Ver el listado de proyectos (desde la BD)
- Crear nuevos proyectos desde el panel admin
- Recibir mensajes del formulario de contacto

---

## 📸 Capturas de Pantalla de Referencia

### Dónde encontrar las credenciales:
```
Supabase Dashboard
└── Tu Proyecto
    └── Settings (⚙️)
        └── API
            └── Project URL: https://xxx.supabase.co
            └── anon public: eyJhbG...
```

### Dónde ejecutar el SQL:
```
Supabase Dashboard
└── Tu Proyecto
    └── SQL Editor 
        └── + New query
            └── [Pegar SUPABASE_SCHEMA.sql aquí]
            └── RUN ►
```

---

¿Todo listo? Ahora puedes crear tus primeros proyectos desde el panel de administración! 🚀
