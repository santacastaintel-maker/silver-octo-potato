import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import '../styles/ProjectDetail.css';

export default function ProjectDetail() {
    const { slug } = useParams();
    const { getProjectBySlug, loading: projectsLoading } = useProjects();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProject() {
            setLoading(true);
            const data = await getProjectBySlug(slug);
            setProject(data);
            setLoading(false);
            // Hacer scroll al inicio al cargar
            window.scrollTo(0, 0);
        }
        fetchProject();
    }, [slug]);

    if (loading) {
        return (
            <div className="container" style={{ padding: '15rem 0', textAlign: 'center' }}>
                <p className="text-mono">ANALIZANDO ARCHIVOS...</p>
                <div className="halftone-pattern" style={{ height: '4px', background: 'var(--color-primary)', width: '200px', margin: '2rem auto' }}></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container" style={{ padding: '15rem 0', textAlign: 'center' }}>
                <h1 className="text-display">404 — OBRA NO ENCONTRADA</h1>
                <p className="text-mono" style={{ marginTop: '2rem' }}>El archivo solicitado no existe en nuestras bases de datos digitales.</p>
                <Link to="/proyectos" className="btn-read-more" style={{ marginTop: '3rem', display: 'inline-block', textDecoration: 'none' }}>
                    VOLVER A LA GALERÍA
                </Link>
            </div>
        );
    }

    return (
        <main className="project-detail fade-in">
            <div className="texture-overlay"></div>

            <div className="container">
                {/* Navegación Mini */}
                <nav style={{ marginBottom: '4rem' }}>
                    <Link to="/proyectos" className="text-mono" style={{ textDecoration: 'none', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="material-icons">arrow_back</span> REGRESAR AL ARCHIVO
                    </Link>
                </nav>

                {/* Header del Proyecto */}
                <header className="project-detail__header">
                    <span className="project-detail__category">{project.category_name}</span>
                    <h1 className="project-detail__title">{project.title}</h1>

                    <div className="project-detail__meta">
                        <div className="meta-item">
                            <label>PUBLICACIÓN</label>
                            <span>{project.published_at ? new Date(project.published_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }) : 'Q1 2026'}</span>
                        </div>
                        <div className="meta-item">
                            <label>CLIENTE / CONTEXTO</label>
                            <span>{project.client || 'EXPLORACIÓN PERSONAL'}</span>
                        </div>
                        <div className="meta-item">
                            <label>ROL</label>
                            <span>ARTISTA & DEVELOPER</span>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                <section className="project-detail__hero">
                    <img
                        src={project.cover_image_url || "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200"}
                        alt={project.title}
                    />
                </section>

                {/* Cuerpo del Contenido */}
                <div className="project-detail__body">
                    <section className="project-detail__description">
                        <p>
                            {project.full_description || project.short_description}
                        </p>

                        {/* Si hay más párrafos simulados o reales, se renderizarían aquí */}
                        {!project.full_description && (
                            <p>
                                Este proyecto representa un hito en la convergencia entre la estética brutalista y la funcionalidad moderna del desarrollo web. A través de un riguroso proceso de experimentación visual, se logró una armonía entre el caos controlado del arte urbano y la estructura lógica del código.
                            </p>
                        )}
                    </section>

                    <aside className="project-sidebar">
                        <div className="sidebar-section">
                            <h3>ESPECIFICACIONES</h3>
                            <div className="tech-tags">
                                {project.technologies && project.technologies.length > 0 ? (
                                    project.technologies.map(tech => (
                                        <span key={tech.id} className="tech-tag" style={{ borderLeft: `4px solid ${tech.color || 'var(--color-primary)'}` }}>
                                            {tech.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="tech-tag">CÓDIGO PURO</span>
                                )}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3>ACCIONES DIGITALES</h3>
                            <div className="project-actions">
                                {project.project_url && (
                                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="btn-project">
                                        VER SITIO EN VIVO
                                        <span className="material-icons">open_in_new</span>
                                    </a>
                                )}
                                {project.repository_url && (
                                    <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="btn-project btn-project--secondary">
                                        REPOSITORIO GITHUB
                                        <span className="material-icons">code</span>
                                    </a>
                                )}
                                <Link to="/contacto" className="btn-project btn-project--secondary">
                                    SOLICITAR INFO
                                    <span className="material-icons">email</span>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Galería Secundaria (si existe) */}
                {project.gallery_images && project.gallery_images.length > 0 && (
                    <section className="project-gallery">
                        <h2 className="text-headline" style={{ gridColumn: '1 / -1', borderBottom: '4px solid var(--color-ink)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                            REGISTRO VISUAL
                        </h2>
                        {project.gallery_images.map((img, idx) => (
                            <div key={idx} className="gallery-item">
                                <img src={img} alt={`Galería ${idx + 1}`} />
                            </div>
                        ))}
                    </section>
                )}
            </div>

            {/* Footer Minimal */}
            <footer style={{ marginTop: '8rem', padding: '10rem 0 4rem', textAlign: 'center', borderTop: '2px solid var(--color-ink)', background: 'var(--color-ink)', color: 'white' }}>
                <p className="text-display" style={{ fontSize: '4rem', marginBottom: '2rem' }}>SIGUIENTE OBRA?</p>
                <Link to="/proyectos" className="text-mono" style={{ color: 'var(--color-primary)', textDecoration: 'none', border: '2px solid white', padding: '1rem 2rem' }}>
                    EXPLORAR ARCHIVO COMPLETO
                </Link>
            </footer>
        </main>
    );
}
