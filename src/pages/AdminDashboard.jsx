import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../hooks/useProjects';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
    const { user, signOut, loading: authLoading } = useAuth();
    const { projects, loading: projectsLoading, deleteProject } = useProjects();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/admin/login');
        }
    }, [user, authLoading, navigate]);

    const handleLogout = async () => {
        await signOut();
        navigate('/admin/login');
    };

    const handleDelete = async (id, title) => {
        if (window.confirm(`¿Seguro que quieres eliminar "${title}"? Esta acción no se puede deshacer.`)) {
            await deleteProject(id);
        }
    };

    if (authLoading || projectsLoading) {
        return <div className="admin-layout" style={{ justifyContent: 'center', alignItems: 'center' }}>SISTEMA CARGANDO...</div>;
    }

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar__logo">ADMIN</div>
                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className="admin-nav__link admin-nav__link--active">PROYECTOS</Link>
                    <Link to="/admin/mensajes" className="admin-nav__link">MENSAJES</Link>
                    <Link to="/" className="admin-nav__link">VER SITIO PÚBLICO</Link>
                </nav>
                <div className="admin-sidebar__footer">
                    <button className="btn-admin btn-admin--danger" style={{ width: '100%' }} onClick={handleLogout}>
                        CERRAR SESIÓN
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h2 className="admin-title">Gestión de Obra</h2>
                    <button className="btn-admin btn-admin--primary" onClick={() => navigate('/admin/proyecto/nuevo')}>
                        + NUEVA OBRA
                    </button>
                </header>

                <section className="admin-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ESTADO</th>
                                <th>TÍTULO</th>
                                <th>CATEGORÍA</th>
                                <th>FECHA</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        {p.is_published ?
                                            <span className="badge badge--success">PÚBLICO</span> :
                                            <span className="badge badge--warning">BORRADOR</span>
                                        }
                                    </td>
                                    <td style={{ fontWeight: 'bold' }}>{p.title}</td>
                                    <td>{p.category_name}</td>
                                    <td>{new Date(p.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn-admin" onClick={() => navigate(`/admin/proyecto/editar/${p.id}`)}>EDITAR</button>
                                            <button className="btn-admin btn-admin--danger" onClick={() => handleDelete(p.id, p.title)}>DEL</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
