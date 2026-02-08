import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useCategories } from '../hooks/useCategories';
import '../styles/ProjectsGallery.css';

export default function ProjectsGallery() {
    const { projects, loading } = useProjects();
    const { categories, loading: loadingCats } = useCategories();
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category_slug === activeFilter));
        }
    }, [activeFilter, projects]);

    if (loading) return (
        <div className="container" style={{ padding: '10rem 0', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
            <div className="halftone-pattern" style={{ height: '2px', background: 'var(--color-ink)', marginBottom: '2rem' }}></div>
            Cargando exhibición...
        </div>
    );

    return (
        <div className="gallery-page fade-in">
            <div className="texture-overlay"></div>

            <div className="container">
                {/* Navegación Mini */}
                <nav style={{ marginBottom: '2rem' }}>
                    <Link to="/" className="text-mono" style={{ textDecoration: 'none', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span className="material-icons" style={{ fontSize: '1rem' }}>arrow_back</span> VOLVER AL ESTUDIO
                    </Link>
                </nav>

                {/* Gallery Header */}
                <header className="gallery-header">
                    <div className="gallery-header__grid">
                        <h1 className="gallery-header__title">
                            GALERÍA<br />
                            <span>EDITORIAL</span>
                        </h1>
                        <div className="gallery-header__meta">
                            Edición #02 — Vol. 2026<br />
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontStyle: 'normal', fontFamily: 'var(--font-mono)' }}>
                /// {projects.length} OBRAS DISPONIBLES
                            </span>
                        </div>
                    </div>
                </header>

                {/* Filtros */}
                <section className="gallery-filters">
                    <button
                        className={`filter-btn ${activeFilter === 'all' ? 'filter-btn--active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        Todas
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${activeFilter === cat.slug ? 'filter-btn--active' : ''}`}
                            onClick={() => setActiveFilter(cat.slug)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </section>

                {/* Grid de Proyectos */}
                <main className="projects-grid">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <article
                                key={project.id}
                                className={`project-card ${project.is_featured ? 'project-card--featured' : ''}`}
                            >
                                <div className="project-card__number">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>

                                <div className="project-card__image-container">
                                    <img
                                        src={project.cover_image_url || "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800"}
                                        alt={project.title}
                                        className="project-card__image"
                                    />
                                </div>

                                <div className="project-card__content">
                                    <span className="project-card__category">{project.category_name}</span>
                                    <h2 className="project-card__title">{project.title}</h2>
                                    <div className="project-card__divider"></div>
                                    <p className="project-card__excerpt">{project.short_description}</p>

                                    <div className="project-card__footer">
                                        <div className="project-card__tech">
                                            {project.technologies?.slice(0, 2).map(t => t.name).join(' / ')}
                                        </div>
                                        <Link to={`/proyecto/${project.slug}`} className="project-card__link">
                                            VER DETALLES →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', border: '2px dashed var(--color-ink)' }}>
                            <p className="text-mono">No se encontraron obras en esta categoría.</p>
                        </div>
                    )}
                </main>
            </div>

            {/* Footer Minimal */}
            <footer style={{ marginTop: '8rem', padding: '4rem 0', borderTop: '4px solid var(--color-ink)', background: 'var(--color-paper-light)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p className="text-display" style={{ fontSize: '3rem', opacity: 0.1 }}>CHA • CASTAÑEDA</p>
                    <p className="text-mono" style={{ fontSize: '0.75rem', marginTop: '1rem' }}>© 2026 DIGITAL ARCHIVE</p>
                </div>
            </footer>
        </div>
    );
}
