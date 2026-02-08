import { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../hooks/useProjects';
import { useBlog } from '../hooks/useBlog';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
    const { user, signOut, loading: authLoading } = useAuth();
    const { projects, loading: projectsLoading, deleteProject } = useProjects();
    const { posts, loading: blogLoading, deletePost } = useBlog();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Determinar qué pestaña mostrar
    const activeTab = searchParams.get('tab') || 'proyectos';

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/admin/login');
        }
    }, [user, authLoading, navigate]);

    const handleLogout = async () => {
        await signOut();
        navigate('/admin/login');
    };

    const handleDeleteProject = async (id, title) => {
        if (window.confirm(`¿Seguro que quieres eliminar "${title}"?`)) {
            await deleteProject(id);
        }
    };

    const handleDeletePost = async (id, title) => {
        if (window.confirm(`¿Seguro que quieres eliminar el artículo "${title}"?`)) {
            await deletePost(id);
        }
    };

    if (authLoading || (activeTab === 'proyectos' && projectsLoading) || (activeTab === 'blog' && blogLoading)) {
        return <div className="admin-layout" style={{ justifyContent: 'center', alignItems: 'center' }}>SISTEMA CARGANDO...</div>;
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__logo">ADMIN</div>
                <nav className="admin-nav">
                    <button
                        className={`admin-nav__link ${activeTab === 'proyectos' ? 'admin-nav__link--active' : ''}`}
                        onClick={() => navigate('/admin/dashboard?tab=proyectos')}
                    >PROYECTOS</button>
                    <button
                        className={`admin-nav__link ${activeTab === 'blog' ? 'admin-nav__link--active' : ''}`}
                        onClick={() => navigate('/admin/dashboard?tab=blog')}
                    >BLOG</button>
                    <Link to="/admin/mensajes" className="admin-nav__link">MENSAJES</Link>
                    <Link to="/" className="admin-nav__link">VER SITIO PÚBLICO</Link>
                </nav>
                <div className="admin-sidebar__footer">
                    <button className="btn-admin btn-admin--danger" style={{ width: '100%' }} onClick={handleLogout}>
                        CERRAR SESIÓN
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h2 className="admin-title">
                        {activeTab === 'proyectos' ? 'Gestión de Obra' : 'Archivo de Manifiestos'}
                    </h2>
                    {activeTab === 'proyectos' ? (
                        <button className="btn-admin btn-admin--primary" onClick={() => navigate('/admin/proyecto/nuevo')}>
                            + NUEVA OBRA
                        </button>
                    ) : (
                        <button className="btn-admin btn-admin--primary" onClick={() => navigate('/admin/blog/nuevo')}>
                            + NUEVO ARTÍCULO
                        </button>
                    )}
                </header>

                <section className="admin-card">
                    <table className="admin-table">
                        <thead>
                            {activeTab === 'proyectos' ? (
                                <tr>
                                    <th>ESTADO</th>
                                    <th>TÍTULO</th>
                                    <th>FECHA</th>
                                    <th>ACCIONES</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th>ESTADO</th>
                                    <th>ARTÍCULO</th>
                                    <th>PUBLICADO</th>
                                    <th>ACCIONES</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {activeTab === 'proyectos' ? (
                                projects.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.is_published ? <span className="badge badge--success">PÚBLICO</span> : <span className="badge badge--warning">BORRADOR</span>}</td>
                                        <td style={{ fontWeight: 'bold' }}>{p.title}</td>
                                        <td>{new Date(p.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="btn-admin" onClick={() => navigate(`/admin/proyecto/editar/${p.id}`)}>EDITAR</button>
                                                <button className="btn-admin btn-admin--danger" onClick={() => handleDeleteProject(p.id, p.title)}>DEL</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.is_published ? <span className="badge badge--success">PÚBLICO</span> : <span className="badge badge--warning">BORRADOR</span>}</td>
                                        <td style={{ fontWeight: 'bold' }}>{post.title}</td>
                                        <td>{new Date(post.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="btn-admin" onClick={() => navigate(`/admin/blog/editar/${post.id}`)}>EDITAR</button>
                                                <button className="btn-admin btn-admin--danger" onClick={() => handleDeletePost(post.id, post.title)}>DEL</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
