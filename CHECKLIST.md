# ✅ CHECKLIST - CONFIGURACIÓN DEL PORTAFOLIO

Usa este checklist para configurar tu portafolio paso a paso.

---

## 🎯 CONFIGURACIÓN INICIAL

### Supabase (Base de Datos)

- [ ] **1.1** Ir a [https://supabase.com/dashboard](https://supabase.com/dashboard)
- [ ] **1.2** Abrir mi proyecto de Supabase
- [ ] **1.3** Ir a Settings → API
- [ ] **1.4** Copiar mi **Project URL**
- [ ] **1.5** Copiar mi **anon public key**
- [ ] **1.6** Abrir archivo `.env` en el proyecto
- [ ] **1.7** Pegar URL en `VITE_SUPABASE_URL`
- [ ] **1.8** Pegar key en `VITE_SUPABASE_ANON_KEY`
- [ ] **1.9** Guardar archivo `.env`

### Crear Tablas en Supabase

- [ ] **2.1** Ir a SQL Editor en Supabase
- [ ] **2.2** Abrir archivo `SUPABASE_SCHEMA.sql` del proyecto
- [ ] **2.3** Copiar TODO el contenido del archivo
- [ ] **2.4** Pegar en SQL Editor de Supabase
- [ ] **2.5** Hacer clic en **Run**
- [ ] **2.6** Verificar mensaje: "Success. No rows returned" ✅

### Verificar Tablas Creadas

- [ ] **3.1** Ir a Table Editor en Supabase
- [ ] **3.2** Ver tabla `categories` (debe tener 4 filas)
- [ ] **3.3** Ver tabla `technologies` (debe tener 8 filas)
- [ ] **3.4** Ver tabla `projects` (vacía por ahora)
- [ ] **3.5** Ver tabla `contact_messages` (vacía por ahora)

---

## 🚀 EJECUTAR EL PROYECTO

### Primera Ejecución

- [ ] **4.1** Abrir terminal en carpeta `portafolio-cha`
- [ ] **4.2** Ejecutar: `npm install` (si no se hizo automáticamente)
- [ ] **4.3** Ejecutar: `npm run dev`
- [ ] **4.4** Abrir navegador en `http://localhost:5173`
- [ ] **4.5** Ver Homepage con diseño constructivista ✅

### Verificar Conexión a Supabase

- [ ] **5.1** Abrir consola del navegador (F12)
- [ ] **5.2** NO ver errores de Supabase
- [ ] **5.3** Ver la sección "Latest Headlines" sin errores
- [ ] **5.4** La página carga completamente

---

## 🎨 CREAR PRIMER PROYECTO (OPCIONAL)

### Proyecto Destacado de Prueba

- [ ] **6.1** Ir a SQL Editor en Supabase
- [ ] **6.2** Copiar y pegar este código:

```sql
WITH cat AS (
  SELECT id FROM categories WHERE slug = 'desarrollo-web' LIMIT 1
)
INSERT INTO projects (
  title, slug, short_description, category_id,
  cover_image_url, is_featured, is_published
)
SELECT 
  'Mi Portafolio Construc Sistema de notificaciones personalizadas',
  cat.id,
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  true, true
FROM cat;
```

- [ ] **6.3** Hacer clic en **Run**
- [ ] **6.4** Recargar `http://localhost:5173`
- [ ] **6.5** Ver mi proyecto en la sección "Featured" ✅

---

## 📖 LEER DOCUMENTACIÓN

### Archivos Importantes

- [ ] **7.1** Leer `INICIO_RAPIDO.md` (este archivo)
- [ ] **7.2** Leer `README.md` (documentación completa)
- [ ] **7.3** Revisar `ARQUITECTURA.md` (entender la estructura)
- [ ] **7.4** Revisar `RESUMEN_CONSTRUCCION.md` (qué está hecho)
- [ ] **7.5** Guardar `SETUP_SUPABASE.md` como referencia

---

## 🔥 PRÓXIMOS PASOS (Después de configurar)

### Personalización Básica

- [ ] **8.1** Cambiar textos del Homepage (en `src/pages/Homepage.jsx`)
- [ ] **8.2** Actualizar nombre/bio en el Masthead
- [ ] **8.3** Modificar skills en el Sidebar
- [ ] **8.4** Personalizar colores en `src/index.css` (variables)
- [ ] **8.5** Agregar mis propios proyectos desde Supabase

### Desarrollo (Si sabes programar)

- [ ] **9.1** Crear página de Galería de Proyectos
- [ ] **9.2** Implementar Panel de Administración (CRUD)
- [ ] **9.3** Añadir formulario de Contacto funcional
- [ ] **9.4** Configurar autenticación para admin
- [ ] **9.5** Implementar subida de imágenes a Supabase Storage

### Deploy a Producción

- [ ] **10.1** Crear cuenta en [Vercel](https://vercel.com) o [Netlify](https://netlify.com)
- [ ] **10.2** Conectar repositorio de GitHub
- [ ] **10.3** Configurar variables de entorno en la plataforma
- [ ] **10.4** Hacer deploy
- [ ] **10.5** Probar la versión en producción

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Si algo no funciona:

1. [ ] Verificar que el servidor esté corriendo (`npm run dev`)
2. [ ] Verificar que no haya errores en consola del navegador (F12)
3. [ ] Verificar que las credenciales en `.env` sean correctas
4. [ ] Reiniciar el servidor (Ctrl+C y `npm run dev` nuevamente)
5. [ ] Revisar `SETUP_SUPABASE.md` para pasos detallados

### Errores Comunes:

- **"Invalid API key"**
  - [ ] Verificar que copiaste la clave **anon public** (no service_role)
  - [ ] Verificar que no haya espacios antes/después en `.env`

- **"relation does not exist"**
  - [ ] Ejecutar `SUPABASE_SCHEMA.sql` en SQL Editor de Supabase

- **"VITE_SUPABASE_URL is not defined"**
  - [ ] Verificar que `.env` exista en la raíz del proyecto
  - [ ] Reiniciar el servidor después de crear/modificar `.env`

- **Proyecto no carga**
  - [ ] Verificar que estés en la carpeta correcta (`portafolio-cha`)
  - [ ] Ejecutar `npm install` para instalar dependencias
  - [ ] Verificar que el puerto 5173 no esté ocupado

---

## 🎉 ¡TODO LISTO!

Si completaste todos los checkboxes de "Configuración Inicial" y "Ejecutar el Proyecto", ¡tu portafolio está funcionando!

**URL Local:** http://localhost:5173

**Próximo paso:** Personalizar contenido y agregar tus proyectos reales.

---

## 📞 AYUDA ADICIONAL

- **Documentación React:** [https://react.dev](https://react.dev)
- **Documentación Supabase:** [https://supabase.com/docs](https://supabase.com/docs)
- **CSS Grid Guide:** [https://css-tricks.com/snippets/css/complete-guide-grid/](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**Última actualización:** 2026-02-07  
**Versión:** 1.0 (MVP - Mínimo Producto Viable)  
**Estado:** ✅ Listo para usar
