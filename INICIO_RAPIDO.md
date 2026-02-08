# ⚡ INICIO RÁPIDO - 3 PASOS

## Ya tienes el proyecto funcionando en `http://localhost:5173`

**PERO** para ver datos reales de proyectos, necesitas configurar Supabase:

---

## ✅ PASO 1: Obtener tus credenciales de Supabase

1. Abre tu proyecto en [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Ve a **⚙️ Settings** → **API**
3. Copia:
   - **Project URL** (ejemplo: `https://abcd1234.supabase.co`)
   - **anon public** key (la clave larga que empieza con `eyJ...`)

---

## ✅ PASO 2: Pegar credenciales en `.env`

1. Abre el archivo `.env` en la raíz del proyecto (`portafolio-cha/.env`)

2. Reemplaza `TU_PROYECTO_AQUI` y `TU_CLAVE_ANON_AQUI` con tus datos reales:

```env
VITE_SUPABASE_URL=https://abcd1234.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tu-clave-real-aqui...
```

3. **Guarda el archivo**

---

## ✅ PASO 3: Crear las tablas en Supabase

1. En Supabase, ve a **SQL Editor**

2. Abre el archivo `SUPABASE_SCHEMA.sql` de este proyecto

3. Copia **TODO** el contenido

4. Pégalo en el SQL Editor de Supabase

5. Presiona **Run** (o Ctrl+Enter)

6. Deberías ver: ✅ **Success. No rows returned**

---

## 🎉 ¡LISTO!

Reinicia el servidor:

```bash
# Detén el servidor actual (Ctrl+C)
# Luego reinicia:
npm run dev
```

Ahora tu portafolio está **100% conectado** a Supabase y listo para usar!

---

## 🧪 PROBAR QUE FUNCIONA

### Crear un proyecto de prueba:

1. En Supabase, ve a **SQL Editor**

2. Ejecuta este comando para crear un proyecto destacado:

```sql
-- Obtener el ID de una categoría
WITH cat AS (
  SELECT id FROM categories WHERE slug = 'desarrollo-web' LIMIT 1
)
INSERT INTO projects (
  title,
  slug,
  short_description,
  full_description,
  category_id,
  cover_image_url,
  is_featured,
  is_published
)
SELECT 
  'Mi Primer Proyecto',
  'mi-primer-proyecto',
  'Un proyecto increíble construido con React y Supabase',
  'Descripción completa del proyecto con todos los detalles técnicos y creativos.',
  cat.id,
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  true,
  true
FROM cat;
```

3. Recarga tu página en `http://localhost:5173`

4. ¡Deberías ver tu proyecto en la sección Featured! 🎨

---

## 📚 ¿Necesitas más ayuda?

- **Setup detallado:** Lee `SETUP_SUPABASE.md`
- **Arquitectura:** Lee `ARQUITECTURA.md`
- **Documentación completa:** Lee `README.md`
- **Resumen del proyecto:** Lee `RESUMEN_CONSTRUCCION.md`

---

## 🚨 PROBLEMAS COMUNES

### "Invalid API key"
→ Verificaste que copiaste la clave **anon public** (no service_role)

### "relation does not exist"
→ No ejecutaste el archivo `SUPABASE_SCHEMA.sql`

### Los cambios en `.env` no se reflejan
→ Reinicia el servidor (`Ctrl+C` y luego `npm run dev`)

---

**¡A construir tu portafolio! 🎨🚀**
