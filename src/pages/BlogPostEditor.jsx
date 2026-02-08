import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useBlog } from '../hooks/useBlog';
import { useAuth } from '../hooks/useAuth';
import '../styles/AdminDashboard.css';

export default function BlogPostEditor() {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const { createPost, updatePost, getPostById } = useBlog();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        is_published: true,
        cover_image_url: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (!authLoading && !user) navigate('/admin/login');
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (isEditing) {
            const fetchPost = async () => {
                const data = await getPostById(id);
                if (data) {
                    setFormData(data);
                    setImagePreview(data.cover_image_url);
                }
            };
            fetchPost();
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'title' && !isEditing) {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async () => {
        if (!imageFile) return formData.cover_image_url;
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `blog/${fileName}`;

        let { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, imageFile);

        if (uploadError) throw new Error('Error al subir la imagen: ' + uploadError.message);

        const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const cover_image_url = await uploadImage();
            const finalData = { ...formData, cover_image_url };

            let result;
            if (isEditing) {
                result = await updatePost(id, finalData);
            } else {
                result = await createPost(finalData);
            }

            if (result.success) {
                navigate('/admin/dashboard?tab=blog');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            alert('ERROR: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__logo">ADMIN</div>
                <nav className="admin-nav">
                    <button className="admin-nav__link" onClick={() => navigate('/admin/dashboard')}>← VOLVER</button>
                </nav>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h2 className="admin-title">{isEditing ? 'EDITAR ARTÍCULO' : 'NUEVO MANIFIESTO'}</h2>
                </header>

                <form className="admin-editor fade-in" onSubmit={handleSubmit}>
                    <section className="form-grid">
                        <div className="form-group--full">
                            <label>TÍTULO_DEL_ARTÍCULO</label>
                            <input type="text" name="title" className="admin-input" required value={formData.title} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>SLUG_URL</label>
                            <input type="text" name="slug" className="admin-input" required value={formData.slug} onChange={handleChange} />
                        </div>

                        <div className="form-group--full">
                            <label>RESUMEN_EJECUTIVO (EXCERPT)</label>
                            <textarea name="excerpt" className="admin-textarea" style={{ height: '100px' }} value={formData.excerpt} onChange={handleChange}></textarea>
                        </div>

                        <div className="form-group--full">
                            <label>CUERPO_DEL_MANIFIESTO (CONTENT)</label>
                            <textarea name="content" className="admin-textarea" style={{ height: '400px' }} required value={formData.content} onChange={handleChange}></textarea>
                        </div>

                        <div className="form-group">
                            <label>IMAGEN_DE_PORTADA</label>
                            <div className="image-preview-container">
                                {imagePreview ? <img src={imagePreview} alt="Preview" /> : <p>[ SIN IMAGEN ]</p>}
                                <input type="file" id="blog-image" hidden accept="image/*" onChange={handleImageChange} />
                                <label htmlFor="blog-image" className="btn-file-label" style={{ marginTop: '1rem' }}>SUBIR ARCHIVO</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>CONFIGURACIÓN</label>
                            <div style={{ padding: '1rem', border: '1px solid #333', background: '#111' }}>
                                <label>
                                    <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} /> PUBLICAR AHORA
                                </label>
                            </div>
                        </div>
                    </section>

                    <div style={{ marginTop: '3rem', borderTop: '2px solid #333', paddingTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="btn-admin btn-admin--primary" disabled={loading}>
                            {loading ? 'ARCHIVANDO...' : 'GUARDAR MANIFIESTO'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
