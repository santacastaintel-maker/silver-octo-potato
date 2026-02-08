import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import '../styles/ProjectDetail.css'; // Reutilizamos estilos editoriales

export default function PostDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (!error) setPost(data);
            setLoading(false);
        };
        fetchPost();
    }, [slug]);

    if (loading) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>ABRIENDO ARCHIVO...</div>;
    if (!post) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>ERROR 404: ARCHIVO NO ENCONTRADO</div>;

    return (
        <article className="project-detail fade-in">
            <div className="texture-overlay"></div>

            <header className="project-detail__header">
                <div className="container">
                    <Link to="/blog" className="text-mono" style={{ textDecoration: 'none', color: 'var(--color-primary)' }}>
                        ← VOLVER AL ARCHIVO
                    </Link>

                    <div style={{ marginTop: '4rem' }}>
                        <span className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>
                            MANIFESTO // {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <h1 className="text-display" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', lineHeight: 0.8, marginTop: '1rem' }}>
                            {post.title}
                        </h1>
                    </div>
                </div>
            </header>

            <section className="container" style={{ marginTop: '5rem' }}>
                <div style={{ border: '10px solid var(--color-ink)', padding: '1rem', background: 'white', marginBottom: '4rem' }}>
                    <img src={post.cover_image_url} alt={post.title} style={{ width: '100%', filter: 'grayscale(100%)' }} />
                </div>

                <div className="project-detail__grid">
                    <aside className="project-detail__meta">
                        <div className="meta-box">
                            <span className="meta-box__label">AUTOR</span>
                            <span className="meta-box__value">CHA CASTAÑEDA</span>
                        </div>
                        <div className="meta-box">
                            <span className="meta-box__label">TEMA</span>
                            <span className="meta-box__value">TEORÍA VISUAL</span>
                        </div>
                    </aside>

                    <div className="project-detail__description">
                        <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem', lineHeight: 1.8, textAlign: 'justify' }}>
                            {post.content}
                        </div>
                    </div>
                </div>
            </section>

            <footer style={{ marginTop: '10rem', padding: '5rem 0', borderTop: '8px solid var(--color-ink)', background: 'var(--color-ink)', color: 'white', textAlign: 'center' }}>
                <Link to="/blog" className="btn-read-more" style={{ background: 'var(--color-primary)' }}>
                    EXPLORAR MÁS MANIFIESTOS
                </Link>
            </footer>
        </article>
    );
}
