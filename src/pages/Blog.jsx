import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import '../styles/ProjectsGallery.css'; // Reutilizamos estilos base de galería

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false });

            if (!error) setPosts(data || []);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>CARGANDO ARCHIVO...</div>;

    return (
        <div className="gallery-page fade-in">
            <div className="texture-overlay"></div>
            <div className="container">
                <nav style={{ marginBottom: '2rem' }}>
                    <Link to="/" className="text-mono" style={{ textDecoration: 'none', color: 'var(--color-primary)' }}>
                        ← VOLVER AL ESTUDIO
                    </Link>
                </nav>

                <header className="gallery-header" style={{ marginBottom: '4rem' }}>
                    <h1 className="gallery-header__title" style={{ fontSize: '10vw' }}>
                        EL BLOG<br /><span>MANIFESTO</span>
                    </h1>
                    <p className="text-mono" style={{ marginTop: '1rem', color: 'var(--color-primary)' }}>
                        /// PENSAMIENTOS, PROCESOS Y TEORÍA VISUAL
                    </p>
                </header>

                <main style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <article key={post.id} style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '2rem',
                                borderBottom: '2px solid var(--color-ink)',
                                paddingBottom: '3rem'
                            }}>
                                <div style={{ border: '4px solid var(--color-ink)', padding: '0.5rem', background: 'white' }}>
                                    <img
                                        src={post.cover_image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800"}
                                        alt={post.title}
                                        style={{ width: '100%', height: '300px', objectFit: 'cover', filter: 'grayscale(100%) contrast(120%)' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <span className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>
                                        EXPEDIENTE #{index + 1} — {new Date(post.created_at).toLocaleDateString()}
                                    </span>
                                    <h2 className="text-display" style={{ fontSize: '3rem', margin: '1rem 0', lineHeight: 0.9 }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', textAlign: 'justify' }}>
                                        {post.excerpt}
                                    </p>
                                    <Link to={`/blog/${post.slug}`} className="btn-read-more" style={{ textDecoration: 'none', textAlign: 'center' }}>
                                        LEER MANIFIESTO →
                                    </Link>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div style={{ padding: '5rem', textAlign: 'center', border: '2px dashed var(--color-ink)' }}>
                            <p className="text-display" style={{ fontSize: '2rem', opacity: 0.3 }}>ARCHIVO VACÍO</p>
                            <p className="text-mono">El artista aún no ha publicado reflexiones.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
