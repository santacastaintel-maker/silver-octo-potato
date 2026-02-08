import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import '../styles/Homepage.css';

export default function Homepage() {
    const { projects, loading, getFeaturedProjects } = useProjects();
    const [featuredProject, setFeaturedProject] = useState(null);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Formatear fecha actual al estilo periódico
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = new Date().toLocaleDateString('es-ES', options).toUpperCase();
        setCurrentDate(dateStr);

        // Cargar proyecto destacado
        loadFeaturedProject();
    }, []);

    const loadFeaturedProject = async () => {
        const featured = await getFeaturedProjects();
        if (featured && featured.length > 0) {
            setFeaturedProject(featured[0]);
        }
    };

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark-mode');
    };

    return (
        <div className="homepage">
            {/* Textura de fondo */}
            <div className="texture-overlay"></div>

            {/* HEADER */}
            <header className="header">
                <div className="header__topbar">
                    <div className="container header__topbar-inner">
                        <div className="header__date">
                            No. 402 • VOL. XII • {currentDate}
                        </div>
                        <div className="header__controls">
                            <span className="header__price">Price: Your Attention</span>
                            <button
                                className="btn-theme-toggle"
                                onClick={toggleDarkMode}
                                aria-label="Toggle dark mode"
                            >
                                <span className="material-icons">brightness_6</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* MASTHEAD */}
                <div className="masthead">
                    <div className="container masthead__inner">
                        <div className="masthead__title-area">
                            <h1 className="masthead__title">
                                Creatividad<br />
                                <span>Dispersión</span>
                            </h1>
                        </div>

                        <div className="masthead__bio-box">
                            <div className="masthead__bio-header">
                                <span className="masthead__bio-title">FULL STACK PRINTER</span>
                                <span className="masthead__bio-slash">///</span>
                            </div>
                            <p className="masthead__bio-text">
                                Building robust digital architectures with an artistic soul. Bridging the gap between brutalist design and functional code.
                            </p>
                            <nav className="masthead__nav">
                                <Link to="/proyectos">PROYECTOS</Link>
                                <Link to="/about">ABOUT</Link>
                                <Link to="/contacto">CONTACTO</Link>
                                <Link to="/blog">BLOG</Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* TICKER */}
                <div className="ticker">
                    <div className="ticker__content">
                        +++ BREAKING: NEW REACT COMPONENT RELEASED +++ AVAILABLE FOR FREELANCE +++ CHECK GITHUB FOR UPDATES +++ UI/UX DESIGN TRENDS 2024 +++
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="main-content">
                <div className="container">
                    <div className="content-grid">
                        {/* FEATURED ARTICLE */}
                        <section className="featured">
                            <div className="featured__decoration"></div>

                            <div className="featured__content">
                                <div className="featured__image-wrapper">
                                    <div className="featured__image-border"></div>
                                    <img
                                        src={featuredProject?.cover_image_url || "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800"}
                                        alt={featuredProject?.title || "Profile"}
                                        className="featured__image img-newspaper"
                                    />
                                    <div className="featured__badge">EST. 1995</div>
                                </div>

                                <div className="featured__text">
                                    <div>
                                        <h2 className="featured__heading">
                                            El Arte del <br /><span>TDA</span>
                                        </h2>
                                        <h3 className="featured__subheading">DESIGNER BY DAY, CODER BY NIGHT</h3>
                                        <p className="featured__description">
                                            {loading ? 'Cargando proyecto destacado...' : (
                                                featuredProject?.short_description ||
                                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. I craft digital experiences that defy the ordinary.'
                                            )}
                                        </p>
                                    </div>
                                    <button className="btn-read-more">
                                        Read Biography
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* SIDEBAR */}
                        <aside className="sidebar">
                            {/* Skills */}
                            <div className="sidebar__skills">
                                <h4 className="sidebar__skills-title">
                                    <span className="sidebar__skills-badge">RNDM APP</span>
                                    DVLPR
                                </h4>
                                <div className="sidebar__skills-grid">
                                    <div className="skill-item">
                                        <span className="skill-item__name">React / Next.js</span>
                                        <span className="skill-item__level">98%</span>
                                    </div>
                                    <div className="skill-item">
                                        <span className="skill-item__name">TypeScript</span>
                                        <span className="skill-item__level">95%</span>
                                    </div>
                                    <div className="skill-item">
                                        <span className="skill-item__name">Node.js</span>
                                        <span className="skill-item__level">90%</span>
                                    </div>
                                    <div className="skill-item">
                                        <span className="skill-item__name">CSS Grid</span>
                                        <span className="skill-item__level">100%</span>
                                    </div>
                                    <div className="skill-item">
                                        <span className="skill-item__name">PostgreSQL</span>
                                        <span className="skill-item__level">85%</span>
                                    </div>
                                    <div className="skill-item">
                                        <span className="skill-item__name">Supabase</span>
                                        <span className="skill-item__level">90%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Headlines */}
                            <div className="sidebar__headlines">
                                <div className="sidebar__headlines-banner">
                                    LATEST HEADLINES
                                </div>

                                <ul className="headlines-list">
                                    <li className="headline-item">
                                        <span className="headline-item__date">Oct 12, 2024</span>
                                        <h5 className="headline-item__title">
                                            Why Minimalism is Dead: Return to Complex UI
                                        </h5>
                                        <p className="headline-item__excerpt">
                                            Analyzing the shift from flat design to neo-brutalism and constructivism in web.
                                        </p>
                                    </li>

                                    <li className="headline-divider"></li>

                                    <li className="headline-item">
                                        <span className="headline-item__date">Sep 28, 2024</span>
                                        <h5 className="headline-item__title">
                                            Optimization Strategies for Heavy 3D Scenes
                                        </h5>
                                        <p className="headline-item__excerpt">
                                            How to keep your framerates high while rendering millions of polygons.
                                        </p>
                                    </li>

                                    <li className="headline-divider"></li>

                                    <li className="headline-item">
                                        <span className="headline-item__date">Sep 15, 2024</span>
                                        <h5 className="headline-item__title">
                                            Server Components: The Future or a Fad?
                                        </h5>
                                    </li>
                                </ul>

                                {/* CTA */}
                                <div className="sidebar__cta">
                                    <p className="sidebar__cta-title">LANZA UN MP</p>
                                    <div className="sidebar__cta-icon">
                                        <span className="material-icons">email</span>
                                    </div>
                                    <p className="sidebar__cta-text">Accepting projects for Q1 2026</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
