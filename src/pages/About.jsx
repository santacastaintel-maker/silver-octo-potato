import { Link } from 'react-router-dom';
import '../styles/About.css';

export default function About() {
    return (
        <main className="about-page fade-in">
            <div className="texture-overlay"></div>

            <div className="container">
                {/* Navegación Mini */}
                <nav style={{ marginBottom: '4rem' }}>
                    <Link to="/" className="text-mono" style={{ textDecoration: 'none', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="material-icons">arrow_back</span> REGRESAR AL ESTUDIO
                    </Link>
                </nav>

                {/* Header Hero */}
                <header className="about-header">
                    <div className="about-header__grid">
                        <h1 className="about-title">
                            UNA BIO<br />
                            <span>GRÁFICA</span>
                        </h1>
                        <div className="halftone-pattern" style={{ height: '300px', width: '100%', opacity: 0.1, border: '4px solid var(--color-ink)' }}></div>
                    </div>
                </header>

                {/* El Manifiesto */}
                <section className="about-statement">
                    "El código es el nuevo aerosol; el navegador, mi lienzo de concreto digital. Mi obra no busca el silencio, sino la conversación entre la estructura técnica y la libertad del arte urbano."
                </section>

                {/* Contenido Principal */}
                <div className="about-content">
                    <section className="about-bio">
                        <h2 className="text-display" style={{ fontSize: '3rem', marginBottom: '2.5rem' }}>EL ARTISTA DETRÁS DEL CÓDIGO</h2>
                        <p>
                            Me llamo <strong>Cha Castañeda</strong>, y mi trabajo habita en la frontera invisible donde el diseño gráfico, la ilustración y el desarrollo web se encuentran con la energía cruda del arte de calle.
                        </p>
                        <p>
                            Con más de dos décadas explorando formas y colores, he aprendido que el orden del código no es el enemigo de la creatividad, sino su esqueleto. Como <strong>desarrollador web </strong>, construyo arquitecturas digitales robustas; como artista, las subvierto con texturas, contrastes y una estética constructivista que rinde homenaje a la vanguardia rusa y el urbanismo contemporáneo.
                        </p>
                        <p>
                            Mi enfoque es la <strong>articulación digital artesanal</strong>: cada sitio que construyo es una obra única, huyendo de los frameworks genéricos para buscar una identidad visual que grite por sí misma.
                        </p>

                        <img
                            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800"
                            alt="Work in progress"
                            className="img-newspaper"
                            style={{ width: '100%', marginTop: '3rem', border: '4px solid var(--color-ink)' }}
                        />
                    </section>

                    <aside className="about-sidebar">
                        <div className="skill-group">
                            <h3>ARS_TECHNICA</h3>
                            <ul className="skill-list">
                                <li className="skill-item"><span>FRONTEND</span><span>REACT / VITE / CSS3</span></li>
                                <li className="skill-item"><span>BACKEND</span><span>SUPABASE / NODE.JS</span></li>
                                <li className="skill-item"><span>DATABASE</span><span>POSTGRESQL</span></li>
                                <li className="skill-item"><span>ARCH_UI</span><span>DESIGN SYSTEMS</span></li>
                            </ul>
                        </div>

                        <div className="skill-group">
                            <h3>VISUAL_TOOLS</h3>
                            <ul className="skill-list">
                                <li className="skill-item"><span>GRAFFITI</span><span>SPRAY & MARTA</span></li>
                                <li className="skill-item"><span>ILLUSTRATION</span><span>PROCREATE / VECTOR</span></li>
                                <li className="skill-item"><span>MOTION</span><span>INTERACTIVE WEB</span></li>
                            </ul>
                        </div>

                        <div className="halftone-pattern" style={{ height: '100px', opacity: 0.2 }}></div>
                    </aside>
                </div>

                {/* Línea de Tiempo / Expediciones */}
                <section className="timeline">
                    <h2 className="timeline-title">EXPEDICIONES_</h2>
                    <div className="timeline-grid">
                        <article className="timeline-item">
                            <div className="timeline-item__year">2026_</div>
                            <div className="timeline-item__role">ESTUDIO INDEPENDIENTE</div>
                            <p className="text-mono" style={{ fontSize: '0.8rem' }}>Lanzamiento de Portafolio Editorial y colaboraciones internacionales en WebArt.</p>
                        </article>

                        <article className="timeline-item">
                            <div className="timeline-item__year">2023-25_</div>
                            <div className="timeline-item__role">FRONTEND LEAD</div>
                            <p className="text-mono" style={{ fontSize: '0.8rem' }}>Desarrollando experiencias inmersivas para agencias de diseño en CDMX.</p>
                        </article>

                        <article className="timeline-item">
                            <div className="timeline-item__year">2018-22_</div>
                            <div className="timeline-item__role">URBAN ARTIST</div>
                            <p className="text-mono" style={{ fontSize: '0.8rem' }}>Muralismo e intervención en espacios públicos, explorando el constructivismo.</p>
                        </article>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ marginTop: '10rem', textAlign: 'center', padding: '6rem', border: '8px solid var(--color-primary)', background: 'var(--color-ink)', color: 'white' }}>
                    <h2 className="text-display" style={{ fontSize: '5rem', lineHeight: 0.9, marginBottom: '2rem' }}>¿EMPEZAMOS UNA<br /><span style={{ color: 'var(--color-primary)' }}>REVOLUCIÓN VISUAL?</span></h2>
                    <Link to="/contacto" className="btn-read-more" style={{ display: 'inline-block', fontSize: '1.5rem', padding: '1.5rem 3rem' }}>
                        HABLEMOS DEL PROYECTO
                    </Link>
                </section>
            </div>

            <footer style={{ marginTop: '5rem', padding: '4rem 0', textAlign: 'center', opacity: 0.2 }}>
                <p className="text-mono" style={{ fontSize: '0.7rem' }}>CHA CASTAÑEDA © ARCHIVO DIGITAL 2026</p>
            </footer>
        </main>
    );
}
