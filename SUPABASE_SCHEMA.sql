-- ============================================
-- ESQUEMA DE BASE DE DATOS PARA PORTAFOLIO
-- ============================================
-- Este archivo contiene el esquema completo para el portafolio
-- Ejecuta estos comandos en el SQL Editor de Supabase

-- 1. TABLA DE CATEGORÍAS
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TABLA DE TECNOLOGÍAS
CREATE TABLE IF NOT EXISTS technologies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon_url TEXT,
  color VARCHAR(7), -- Hex color code
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABLA DE PROYECTOS (Principal)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  short_description TEXT,
  full_description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  cover_image_url TEXT,
  gallery_images JSONB DEFAULT '[]', -- Array de URLs de imágenes
  project_url TEXT,
  repository_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  published_at DATE
);

-- 4. TABLA DE RELACIÓN PROYECTOS-TECNOLOGÍAS (Many-to-Many)
CREATE TABLE IF NOT EXISTS project_technologies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  technology_id UUID REFERENCES technologies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(project_id, technology_id)
);

-- 5. TABLA DE MENSAJES DE CONTACTO
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(300),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- ÍNDICES PARA OPTIMIZAR CONSULTAS
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published) WHERE is_published = TRUE;
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_project_technologies_project ON project_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_project_technologies_tech ON project_technologies(technology_id);

-- ============================================
-- FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) - SEGURIDAD
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Políticas: Lectura pública para el portafolio
CREATE POLICY "Categorías son públicas" ON categories FOR SELECT USING (true);
CREATE POLICY "Tecnologías son públicas" ON technologies FOR SELECT USING (true);
CREATE POLICY "Proyectos publicados son públicos" ON projects 
  FOR SELECT USING (is_published = true);
CREATE POLICY "Relaciones proyecto-tech son públicas" ON project_technologies FOR SELECT USING (true);

-- NOTA: Las políticas de escritura se configurarán más adelante
-- cuando se implemente el sistema de autenticación para el panel de admin

-- ============================================
-- DATOS DE EJEMPLO (SEED DATA)
-- ============================================

-- Insertar categorías de ejemplo
INSERT INTO categories (name, slug, description) VALUES
  ('Desarrollo Web', 'desarrollo-web', 'Aplicaciones web full-stack y frontend'),
  ('Arte Urbano', 'arte-urbano', 'Murales, grafiti y arte callejero'),
  ('E-Commerce', 'e-commerce', 'Tiendas en línea y plataformas de venta'),
  ('Experimental', 'experimental', 'Proyectos de exploración técnica y artística')
ON CONFLICT (slug) DO NOTHING;

-- Insertar tecnologías comunes
INSERT INTO technologies (name, slug, color) VALUES
  ('React', 'react', '#61DAFB'),
  ('JavaScript', 'javascript', '#F7DF1E'),
  ('CSS Grid', 'css-grid', '#1572B6'),
  ('Supabase', 'supabase', '#3ECF8E'),
  ('Node.js', 'nodejs', '#339933'),
  ('Vite', 'vite', '#646CFF'),
  ('HTML5', 'html5', '#E34F26'),
  ('PostgreSQL', 'postgresql', '#4169E1')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista para obtener proyectos con toda su información relacionada
CREATE OR REPLACE VIEW projects_full AS
SELECT 
  p.*,
  c.name as category_name,
  c.slug as category_slug,
  COALESCE(
    json_agg(
      json_build_object(
        'id', t.id,
        'name', t.name,
        'slug', t.slug,
        'color', t.color
      )
    ) FILTER (WHERE t.id IS NOT NULL),
    '[]'
  ) as technologies
FROM projects p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN project_technologies pt ON p.id = pt.project_id
LEFT JOIN technologies t ON pt.technology_id = t.id
GROUP BY p.id, c.name, c.slug;

-- ============================================
-- NOTAS IMPORTANTES
-- ============================================
/*
1. Asegúrate de habilitar Storage en Supabase si planeas subir imágenes
2. Configura un bucket llamado 'project-images' con acceso público para las imágenes
3. Para el panel de administración, necesitarás configurar autenticación
4. Las URLs de ejemplo en gallery_images son JSONB array: ["url1", "url2", ...]
*/
