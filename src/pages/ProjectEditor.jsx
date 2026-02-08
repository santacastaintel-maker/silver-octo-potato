import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useProjects } from '../hooks/useProjects';
import { useCategories } from '../hooks/useCategories';
import { useAuth } from '../hooks/useAuth';
import '../styles/AdminDashboard.css';

export default function ProjectEditor() {
    const { id } = useParams(); // Si hay ID, estamos editando
    const isEditing = !!id;
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const { categories } = useCategories();
    const { createProject, updateProject, getProjectById } = useProjects();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        short_description: '',
        full_description: '',
        category_id: '',
        client: '',
        project_url: '',
        repository_url: '',
        is_featured: false,
        is_published: true,
        cover_image_url: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    // Protección de ruta
    useEffect(() => {
        if (!authLoading && !user) navigate('/admin/login');
    }, [user, authLoading, navigate]);

    // Cargar datos si estamos editando
    useEffect(() => {
        if (isEditing) {
            const fetchProject = async () => {
                const data = await getProjectById(id);
                if (data) {
                    setFormData(data);
                    setImagePreview(data.cover_image_url);
                }
            };
            fetchProject();
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Generar slug automáticamente si cambia el título
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
        const filePath = `covers/${fileName}`;

        let { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, imageFile);

        if (uploadError) {
            throw new Error('Error al subir la imagen a Supabase: ' + uploadError.message);
        }

        const { data } = supabase.storage
            .from('project-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const cover_image_url = await uploadImage();

            // Limpiamos los datos para enviar solo lo que la tabla 'projects' acepta
            // Evitamos enviar 'category_name' o 'category_slug' que vienen de la vista
            const { category_name, category_slug, ...cleanData } = formData;
            const finalData = { ...cleanData, cover_image_url };

            let result;
            if (isEditing) {
                result = await updateProject(id, finalData);
            } else {
                result = await createProject(finalData);
            }

            if (result.success) {
                navigate('/admin/dashboard');
            } else {
                throw new Error(result.error || 'Error desconocido al guardar en la base de datos');
            }
        } catch (error) {
            console.error('SERVER_ERROR:', error);
            alert('DETALLE DEL ERROR: ' + error.message);
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
                    <h2 className="admin-title">{isEditing ? 'EDITAR ARCHIVO' : 'NUEVA ENTRADA'}</h2>
                </header>

                <form className="admin-editor fade-in" onSubmit={handleSubmit}>
                    <section className="form-grid">
                        {/* Título */}
                        <div className="form-group--full">
                            <label>TÍTULO_PROYECTO</label>
                            <input
                                type="text" name="title" className="admin-input"
                                required value={formData.title} onChange={handleChange}
                            />
                        </div>

                        {/* Slug */}
                        <div className="form-group">
                            <label>SLUG_URL (IDENTIFICADOR)</label>
                            <input
                                type="text" name="slug" className="admin-input"
                                required value={formData.slug} onChange={handleChange}
                            />
                        </div>

                        {/* Categoría */}
                        <div className="form-group">
                            <label>CATEGORÍA_TÉCNICA</label>
                            <select
                                name="category_id" className="admin-select"
                                required value={formData.category_id} onChange={handleChange}
                            >
                                <option value="">-- SELECCIONAR --</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Descripción Corta */}
                        <div className="form-group--full">
                            <label>RESUMEN_EJECUTIVO (SHORT)</label>
                            <input
                                type="text" name="short_description" className="admin-input"
                                required value={formData.short_description} onChange={handleChange}
                            />
                        </div>

                        {/* Descripción Completa */}
                        <div className="form-group--full">
                            <label>MANIFIESTO_DETALLADO (FULL)</label>
                            <textarea
                                name="full_description" className="admin-textarea"
                                value={formData.full_description} onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* Imagen */}
                        <div className="form-group">
                            <label>SOPORTE_VISUAL (IMAGEN)</label>
                            <div className="image-preview-container">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" />
                                ) : (
                                    <p>[ SIN IMAGEN ]</p>
                                )}
                                <input
                                    type="file" id="image-upload" hidden
                                    accept="image/*" onChange={handleImageChange}
                                />
                                <label htmlFor="image-upload" className="btn-file-label" style={{ marginTop: '1rem' }}>
                                    SUBIR ARCHIVO
                                </label>
                            </div>
                        </div>

                        {/* Checks y Otros */}
                        <div className="form-group">
                            <label>ESTADO_DEL_ARCHIVO</label>
                            <div style={{ padding: '1rem', border: '1px solid #333', background: '#111', height: '100%' }}>
                                <label style={{ display: 'block', marginBottom: '1rem' }}>
                                    <input
                                        type="checkbox" name="is_featured"
                                        checked={formData.is_featured} onChange={handleChange}
                                    /> DESTACAR EN PORTADA
                                </label>
                                <label>
                                    <input
                                        type="checkbox" name="is_published"
                                        checked={formData.is_published} onChange={handleChange}
                                    /> PUBLICAR INMEDIATAMENTE
                                </label>
                            </div>
                        </div>

                    </section>

                    <div style={{ marginTop: '3rem', borderTop: '2px solid #333', paddingTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <button
                            type="submit" className="btn-admin btn-admin--primary"
                            style={{ padding: '1.5rem 3rem', fontSize: '1.2rem' }}
                            disabled={loading}
                        >
                            {loading ? 'SINCRONIZANDO...' : 'GUARDAR CAMBIOS EN EL SISTEMA'}
                        </button>
                        <button
                            type="button" className="btn-admin"
                            onClick={() => navigate('/admin/dashboard')}
                        >
                            CANCELAR
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
